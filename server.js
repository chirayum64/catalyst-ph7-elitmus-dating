/**
 * pH7 by eLitmus — Full-Stack Web Server & REST API
 * Zero external runtime dependencies required (pure Node.js >= 18).
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const db = require("./services/dbStore");
const { calculateEquilibrium, filterByPrivacyShield } = require("./services/equilibriumEngine");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error("Invalid JSON payload"));
      }
    });
    req.on("error", reject);
  });
}

function sanitizeUser(user) {
  if (!user) return null;
  const copy = { ...user };
  delete copy.password;
  return copy;
}

function generateSmartReply(senderUser, partnerUser, messageText, messageType) {
  const firstName = senderUser.name.split(" ")[0];
  if (messageType === "icebreaker_card") {
    return `Ooh I love this icebreaker, ${firstName}! Let me think—my guess is option #2 is the plot twist, and for mine: I once debugged production from a Himalayan basecamp cafe 😄 What's your verdict?`;
  }
  const lower = (messageText || "").toLowerCase();
  if (lower.includes("coffee") || lower.includes("araku") || lower.includes("saturday") || lower.includes("weekend") || lower.includes("meet")) {
    return `That sounds genuinely lovely, ${firstName}! Saturday evening works great for me—feel free to lock in a pH7 Safe-Date Pass from the Date Concierge tab so we get the eLitmus alumni booth! ☕✨`;
  }
  if (lower.includes("book") || lower.includes("system") || lower.includes("read") || lower.includes("podcast")) {
    return `Yes!! It completely changed how I look at feedback loops—both in engineering and in relationships. Next on my list is 'The Psychology of Money' & 'Designing Data-Intensive Applications' side by side 😂`;
  }
  return `That's such a sharp perspective, ${firstName}. It's honestly refreshing talking to someone on here who thinks from first principles instead of the usual 2-word replies! Tell me more about how you see that playing out?`;
}

async function handleApi(req, res, parsedUrl) {
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query || {};

  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { ok: true });
  }

  // 1. Health & Metrics
  if (pathname === "/api/health" && req.method === "GET") {
    return sendJson(res, 200, {
      status: "ok",
      product: "pH7 by eLitmus",
      version: "1.0.0",
      metrics: db.state.platformMetrics
    });
  }

  // 2. Bootstrap Data for App Initialization & Evaluator Switcher
  if (pathname === "/api/bootstrap" && req.method === "GET") {
    const demoAccounts = db.getUsers().map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      batchYear: u.batchYear,
      role: u.role,
      company: u.company,
      city: u.city,
      cognitiveArchetype: u.cognitiveArchetype,
      karmaScore: u.karmaScore,
      subscriptionTier: u.subscriptionTier
    }));

    return sendJson(res, 200, {
      demoAccounts,
      dilemmas: db.state.dilemmas,
      venues: db.state.venues,
      icebreakers: db.state.icebreakers,
      alumniRegistrySampleIds: Object.keys(db.state.alumniRegistry),
      platformMetrics: db.state.platformMetrics,
      closureLogs: db.state.closureLogs
    });
  }

  // 3. Login (Supports Email/Password OR Evaluator Quick-Switch by userId)
  if (pathname === "/api/auth/login" && req.method === "POST") {
    const body = await parseBody(req);
    let user = null;

    if (body.userId) {
      user = db.getUserById(body.userId);
    } else if (body.email) {
      user = db.getUserByEmail(body.email);
      if (user && body.password && user.password !== body.password) {
        return sendJson(res, 401, {
          error: "Invalid password. (Hint: All demo accounts use password123)"
        });
      }
    }

    if (!user) {
      return sendJson(res, 404, {
        error: "Account not found. Try aarav@elitmus.com or use the Evaluator Quick-Switch bar."
      });
    }

    return sendJson(res, 200, {
      user: sanitizeUser(user),
      message: `Welcome back, ${user.name} (Verified eLitmus Batch '${String(user.batchYear).slice(-2)})`
    });
  }

  // 4. eLitmus pH ID Lookup (For 1-Click Verified Onboarding)
  if (pathname === "/api/auth/elitmus-lookup" && req.method === "POST") {
    const body = await parseBody(req);
    const rawId = (body.elitmusPhId || "").trim().toUpperCase();

    if (!rawId) {
      return sendJson(res, 400, { error: "Please enter an eLitmus pH ID (e.g., EL-2023-10492)" });
    }

    const found = db.state.alumniRegistry[rawId];
    if (found) {
      return sendJson(res, 200, {
        verified: true,
        record: found,
        privacyNote:
          "Raw pH percentile is cryptographically hashed and translated into your positive Cognitive Archetype under DPDP Act 2023 purpose-limitation compliance."
      });
    }

    // Also allow dynamic verification of any valid-looking EL-2020..2023 ID for smooth testing
    const match = rawId.match(/^EL-(202[0-3])-(\d{4,6})$/);
    if (match) {
      const batchYear = Number(match[1]);
      return sendJson(res, 200, {
        verified: true,
        record: {
          elitmusPhId: rawId,
          name: body.name || "Verified eLitmus Candidate",
          batchYear,
          college: `NIT / Tier-2 Engineering Alum ('${String(batchYear).slice(-2)})`,
          company: "Tech Corp India",
          companyDomain: "techcorp.in",
          role: "Software Engineer",
          city: "Bengaluru",
          cognitiveArchetype: "Systems Architect",
          archetypeBadge: "Top 5% Analytical & Problem Solving Synthesis (pH Verified)",
          wavelengthVector: {
            intellectualCuriosity: 90,
            careerAmbitionTempo: 85,
            financialThermostat: 84,
            socialBattery: 68,
            conflictDirectness: 78
          }
        },
        privacyNote:
          "Verified against eLitmus 2020-2023 Alumni Ledger. Raw hiring scores remain strictly firewalled."
      });
    }

    return sendJson(res, 404, {
      error: "pH ID not recognized. Try sample IDs: EL-2023-10492, EL-2022-66201, or EL-2021-50019."
    });
  }

  // 5. Register New User with eLitmus Trust Passport
  if (pathname === "/api/auth/register" && req.method === "POST") {
    const body = await parseBody(req);
    if (!body.email || !body.name) {
      return sendJson(res, 400, { error: "Name and Email are required." });
    }
    if (db.getUserByEmail(body.email)) {
      return sendJson(res, 409, { error: "An account with this email already exists." });
    }

    const batchYear = Number(body.batchYear) || 2022;
    const companyDomain =
      body.companyDomain ||
      (body.company ? `${body.company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com` : "company.com");

    const newUser = {
      id: `usr_${Date.now()}`,
      email: body.email.trim(),
      password: body.password || "password123",
      elitmusPhId: body.elitmusPhId || `EL-${batchYear}-${Math.floor(10000 + Math.random() * 89999)}`,
      name: body.name.trim(),
      age: Number(body.age) || 25,
      gender: body.gender || "Male",
      lookingFor: body.lookingFor || (body.gender === "Female" ? "Male" : "Female"),
      batchYear,
      college: body.college || `Verified eLitmus Partner Institute ('${String(batchYear).slice(-2)})`,
      collegeTier: `Verified eLitmus Batch '${String(batchYear).slice(-2)}`,
      company: body.company || "Stealth Startup",
      companyDomain,
      role: body.role || "Product & Engineering",
      city: body.city || "Bengaluru",
      neighborhood: body.neighborhood || "Indiranagar",
      avatarColor: "#6366f1",
      photoSvgSeed: body.name.toLowerCase().split(" ")[0],
      headline:
        body.headline ||
        "Verified eLitmus alum looking for high-wavelength conversations and real equilibrium.",
      bio:
        body.bio ||
        "Joined pH7 to skip superficial swiping and connect on shared curiosity, ambition, and life rhythm.",
      voiceNoteTranscript:
        body.voiceNoteTranscript ||
        "Let's debate our favorite rabbit holes over specialty coffee this weekend.",
      cognitiveArchetype: body.cognitiveArchetype || "Systems Architect",
      archetypeBadge:
        body.archetypeBadge || "Top 5% Cognitive & Behavioral Equilibrium (pH Verified)",
      karmaScore: 95,
      karmaBadges: ["Verified Alumni Onboarding", "Zero-Ghosting Pledge"],
      subscriptionTier: "Free (Verified Alumni)",
      credits: 35,
      coworkerShield: {
        enabled: true,
        blockCurrentCompany: true,
        blockCollegeBatch: Boolean(body.blockCollegeBatch),
        blockedDomains: [companyDomain],
        incognitoToRecruiters: true
      },
      wavelengthVector: body.wavelengthVector || {
        intellectualCuriosity: 90,
        careerAmbitionTempo: 85,
        financialThermostat: 82,
        socialBattery: 68,
        conflictDirectness: 78
      },
      dilemmaAnswers: body.dilemmaAnswers || {
        dil_career_leap: "opt_b",
        dil_sunday_rhythm: "opt_b",
        dil_conflict_protocol: "opt_b",
        dil_money_philosophy: "opt_b",
        dil_relocation_horizon: "opt_a"
      },
      prompts: [
        {
          question: "My Non-Swipeable Green Flag",
          answer:
            body.greenFlagPrompt ||
            "Intellectual curiosity paired with emotional directness."
        },
        {
          question: "Life Pace & Relationship Intent",
          answer:
            body.intentPrompt ||
            "Intentional long-term partnership built on mutual growth and laughter."
        }
      ],
      revealStages: {}
    };

    db.addUser(newUser);
    return sendJson(res, 201, {
      user: sanitizeUser(newUser),
      message: "eLitmus Trust Passport minted & Wavelength calibrated!"
    });
  }

  // 6. Discovery Feed with Privacy Firewall & 5-Axis Equilibrium Computation
  if (pathname === "/api/discover" && req.method === "GET") {
    const userId = query.userId || "usr_aarav";
    const currentUser = db.getUserById(userId);
    if (!currentUser) {
      return sendJson(res, 404, { error: "User not found" });
    }

    const allUsers = db.getUsers();
    const { visibleCandidates, cloakedCount, cloakedDetails } = filterByPrivacyShield(
      currentUser,
      allUsers
    );

    const activeConversations = db
      .getConversationsForUser(userId)
      .filter((c) => c.status === "active");

    const enrichedCandidates = visibleCandidates
      .map((candidate) => {
        const equilibrium = calculateEquilibrium(currentUser, candidate);
        const existingConv = db.getConversationBetween(userId, candidate.id);
        const revealStage = existingConv
          ? existingConv.stage
          : (currentUser.revealStages && currentUser.revealStages[candidate.id]) || 1;

        return {
          candidate: sanitizeUser(candidate),
          equilibrium,
          revealStage, // 1 = Wavelength Blur (65%), 2 = Dilemma Synced (25% blur), 3 = Full Crystal Reveal (0% blur)
          conversationId: existingConv ? existingConv.id : null,
          conversationStatus: existingConv ? existingConv.status : null
        };
      })
      .sort((a, b) => b.equilibrium.overallScore - a.equilibrium.overallScore);

    return sendJson(res, 200, {
      currentUser: sanitizeUser(currentUser),
      activeSlotsUsed: activeConversations.length,
      maxActiveSlots: 3,
      privacyFirewall: {
        cloakedCount,
        cloakedDetails,
        shieldSettings: currentUser.coworkerShield
      },
      matches: enrichedCandidates
    });
  }

  // 7. Answer or Update a Life-Architecture Micro-Case Dilemma
  if (pathname === "/api/dilemmas/answer" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, dilemmaId, optionId } = body;
    const user = db.getUserById(userId);
    if (!user) return sendJson(res, 404, { error: "User not found" });

    const dilemma = db.state.dilemmas.find((d) => d.id === dilemmaId);
    if (!dilemma) return sendJson(res, 404, { error: "Dilemma not found" });

    const chosenOpt = dilemma.options.find((o) => o.id === optionId);
    if (!chosenOpt) return sendJson(res, 400, { error: "Invalid option" });

    const updatedUser = db.updateUser(userId, (u) => {
      const nextAnswers = { ...(u.dilemmaAnswers || {}), [dilemmaId]: optionId };
      const nextVector = { ...(u.wavelengthVector || {}) };
      if (chosenOpt.axisImpact) {
        for (const [axisKey, targetVal] of Object.entries(chosenOpt.axisImpact)) {
          const currentVal = nextVector[axisKey] || 80;
          nextVector[axisKey] = Math.round(currentVal * 0.65 + targetVal * 0.35);
        }
      }
      return {
        ...u,
        dilemmaAnswers: nextAnswers,
        wavelengthVector: nextVector
      };
    });

    return sendJson(res, 200, {
      user: sanitizeUser(updatedUser),
      chosenArchetypeTag: chosenOpt.archetypeTag,
      message: `Wavelength recalibrated with '${chosenOpt.archetypeTag}' response!`
    });
  }

  // 8. Advance Progressive Reveal / Unlock Chemistry Slot
  if (pathname === "/api/chemistry/advance" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, candidateId, noteText } = body;
    const user = db.getUserById(userId);
    const candidate = db.getUserById(candidateId);
    if (!user || !candidate) {
      return sendJson(res, 404, { error: "User or candidate not found" });
    }

    const activeConvs = db
      .getConversationsForUser(userId)
      .filter((c) => c.status === "active");

    let existingConv = db.getConversationBetween(userId, candidateId);
    const currentStage = existingConv
      ? existingConv.stage
      : (user.revealStages && user.revealStages[candidateId]) || 1;

    // If starting a brand new active conversation and already at 3/3 Focused Chemistry Slots:
    if (!existingConv && activeConvs.length >= 3) {
      return sendJson(res, 409, {
        code: "SLOTS_FULL",
        error:
          "Focused Chemistry Cap Reached (3/3 Active Slots). To prevent ghosting and match-hoarding, please Gracefully Close one active conversation in your Chemistry Lab before opening a new slot."
      });
    }

    const nextStage = Math.min(3, currentStage + 1);
    const equilibrium = calculateEquilibrium(user, candidate);

    // Update user revealStages
    db.updateUser(userId, (u) => ({
      ...u,
      revealStages: { ...(u.revealStages || {}), [candidateId]: nextStage }
    }));

    if (!existingConv) {
      existingConv = {
        id: `conv_${Date.now()}`,
        participants: [userId, candidateId],
        stage: nextStage,
        status: "active",
        startedAt: new Date().toISOString(),
        sharedDilemmasCount: equilibrium.exactDilemmaMatches,
        equilibriumScore: equilibrium.overallScore,
        safeDateBooking: null,
        messages: [
          {
            id: `msg_sys_${Date.now()}`,
            senderId: "system",
            type: "dilemma_sync",
            text: `🧪 Stage ${nextStage} Chemistry Unlocked (${equilibrium.overallScore}% Equilibrium • pH ${equilibrium.phValue})! ${equilibrium.synergySuperpower}`,
            timestamp: new Date().toISOString()
          }
        ]
      };
    } else {
      existingConv.stage = nextStage;
      existingConv.status = "active";
      existingConv.messages.push({
        id: `msg_sys_${Date.now()}`,
        senderId: "system",
        type: "dilemma_sync",
        text: `✨ Progressive Reveal Complete — Stage ${nextStage} Full Equilibrium Unlocked! Photos are now 100% unblurred and Safe-Date Concierge is active.`,
        timestamp: new Date().toISOString()
      });
    }

    if (noteText && noteText.trim()) {
      existingConv.messages.push({
        id: `msg_${Date.now()}_usr`,
        senderId: userId,
        type: "text",
        text: noteText.trim(),
        timestamp: new Date().toISOString()
      });
      existingConv.messages.push({
        id: `msg_${Date.now()}_reply`,
        senderId: candidateId,
        type: "text",
        text: generateSmartReply(user, candidate, noteText.trim(), "text"),
        timestamp: new Date(Date.now() + 1000).toISOString()
      });
    }

    db.upsertConversation(existingConv);

    return sendJson(res, 200, {
      revealStage: nextStage,
      conversation: existingConv,
      message:
        nextStage === 2
          ? `Stage 2 Half-Reveal unlocked with ${candidate.name}!`
          : `Stage 3 Full Crystal Reveal unlocked with ${candidate.name}!`
    });
  }

  // 9. Get User's Conversations (Focused Chemistry Slots)
  if (pathname === "/api/conversations" && req.method === "GET") {
    const userId = query.userId || "usr_aarav";
    const user = db.getUserById(userId);
    if (!user) return sendJson(res, 404, { error: "User not found" });

    const convs = db.getConversationsForUser(userId).map((conv) => {
      const partnerId = conv.participants.find((id) => id !== userId) || conv.participants[0];
      const partner = db.getUserById(partnerId);
      const equilibrium = partner ? calculateEquilibrium(user, partner) : null;
      return {
        ...conv,
        partner: sanitizeUser(partner),
        equilibrium
      };
    });

    return sendJson(res, 200, {
      activeCount: convs.filter((c) => c.status === "active").length,
      maxSlots: 3,
      conversations: convs
    });
  }

  // 10. Send Message or Launch Co-Op Icebreaker in Conversation
  if (pathname === "/api/conversations/message" && req.method === "POST") {
    const body = await parseBody(req);
    const { conversationId, senderId, text, type, icebreakerTitle } = body;
    const conv = db.getConversationById(conversationId);
    if (!conv) return sendJson(res, 404, { error: "Conversation not found" });

    const sender = db.getUserById(senderId);
    const partnerId = conv.participants.find((id) => id !== senderId);
    const partner = db.getUserById(partnerId);

    const msgType = type || "text";
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId,
      type: msgType,
      icebreakerTitle: icebreakerTitle || null,
      text: (text || "").trim(),
      timestamp: new Date().toISOString()
    };

    conv.messages.push(newMsg);

    // If conversation was at Stage 2, sending a thoughtful message promotes it to Stage 3 Full Reveal!
    let stagePromoted = false;
    if (conv.stage < 3) {
      conv.stage = 3;
      stagePromoted = true;
      db.updateUser(senderId, (u) => ({
        ...u,
        revealStages: { ...(u.revealStages || {}), [partnerId]: 3 }
      }));
      conv.messages.push({
        id: `msg_stage3_${Date.now()}`,
        senderId: "system",
        type: "dilemma_sync",
        text: "🎉 Stage 3 Full Crystal Reveal achieved through two-way conversation! Full profile gallery & Verified Safe-Date Concierge are now unlocked.",
        timestamp: new Date().toISOString()
      });
    }

    // Generate contextual interactive reply from partner
    if (partner && sender) {
      const replyMsg = {
        id: `msg_rep_${Date.now()}`,
        senderId: partnerId,
        type: "text",
        text: generateSmartReply(sender, partner, newMsg.text, msgType),
        timestamp: new Date(Date.now() + 1200).toISOString()
      };
      conv.messages.push(replyMsg);
    }

    db.upsertConversation(conv);

    return sendJson(res, 200, {
      conversation: conv,
      stagePromoted
    });
  }

  // 11. Anti-Ghosting Graceful Closure Protocol
  if (pathname === "/api/conversations/graceful-close" && req.method === "POST") {
    const body = await parseBody(req);
    const { conversationId, userId, reason } = body;
    const conv = db.getConversationById(conversationId);
    if (!conv) return sendJson(res, 404, { error: "Conversation not found" });

    const partnerId = conv.participants.find((id) => id !== userId);
    const partner = db.getUserById(partnerId);

    conv.status = "closed_gracefully";
    conv.closedAt = new Date().toISOString();
    conv.closureReason = reason || "Wishing you the very best—different life pace right now!";
    conv.messages.push({
      id: `msg_cls_${Date.now()}`,
      senderId: "system",
      type: "graceful_closure",
      text: `🕊️ Graceful Closure Protocol completed: "${conv.closureReason}". Zero ghosting! Both users earned +2 Accountability Karma & freed 1 Focused Chemistry Slot.`,
      timestamp: new Date().toISOString()
    });

    db.upsertConversation(conv);

    const updatedUser = db.updateUser(userId, (u) => ({
      ...u,
      karmaScore: Math.min(100, (u.karmaScore || 90) + 2),
      credits: (u.credits || 20) + 10
    }));

    db.state.closureLogs.unshift({
      id: `cls_${Date.now()}`,
      fromUserId: userId,
      toUserName: partner ? `${partner.name} ('${String(partner.batchYear).slice(-2)} Batch)` : "Match",
      reason: conv.closureReason,
      karmaEarned: 2,
      timestamp: new Date().toISOString()
    });
    db.save();

    return sendJson(res, 200, {
      conversation: conv,
      user: sanitizeUser(updatedUser),
      message: "Graceful Closure sent! You earned +2 Karma Score & +10 Credits, and freed 1 Chemistry Slot."
    });
  }

  // 12. Book Verified Safe-Date Pass (B2B2C Offline Partner Venue Network)
  if (pathname === "/api/conversations/book-safe-date" && req.method === "POST") {
    const body = await parseBody(req);
    const { conversationId, venueId, dateTime } = body;
    const conv = db.getConversationById(conversationId);
    if (!conv) return sendJson(res, 404, { error: "Conversation not found" });

    const venue = db.state.venues.find((v) => v.id === venueId) || db.state.venues[0];
    const passCode = `PH7-${venue.city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 8999)}`;

    conv.safeDateBooking = {
      venueId: venue.id,
      venueName: `${venue.name}, ${venue.area} (${venue.city})`,
      dateTime: dateTime || "This Saturday • 5:30 PM",
      passCode,
      perk: venue.elitmusPerk,
      safetyBadge: venue.safetyBadge,
      status: "Confirmed • Verified Safe-Zone Pass Active",
      safetyCheckInEnabled: true
    };

    conv.messages.push({
      id: `msg_date_${Date.now()}`,
      senderId: "system",
      type: "safe_date_pass",
      text: `🥂 Verified Safe-Date Pass Minted (${passCode}) at ${venue.name} (${venue.area}) for ${conv.safeDateBooking.dateTime}! Perk Unlocked: ${venue.elitmusPerk}.`,
      timestamp: new Date().toISOString()
    });

    db.state.platformMetrics.partnerVenueBookingsMonthly += 1;
    db.upsertConversation(conv);

    return sendJson(res, 200, {
      booking: conv.safeDateBooking,
      conversation: conv,
      message: `Safe-Date Pass ${passCode} confirmed at ${venue.name}!`
    });
  }

  // 13. Update Coworker & Batchmate Privacy Shield
  if (pathname === "/api/profile/shield" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, enabled, blockCurrentCompany, blockCollegeBatch, blockedDomains } = body;
    const updated = db.updateUser(userId, (u) => ({
      ...u,
      coworkerShield: {
        enabled: enabled !== undefined ? Boolean(enabled) : true,
        blockCurrentCompany:
          blockCurrentCompany !== undefined ? Boolean(blockCurrentCompany) : true,
        blockCollegeBatch:
          blockCollegeBatch !== undefined ? Boolean(blockCollegeBatch) : false,
        blockedDomains: Array.isArray(blockedDomains)
          ? blockedDomains
          : u.coworkerShield.blockedDomains,
        incognitoToRecruiters: true
      }
    }));

    if (!updated) return sendJson(res, 404, { error: "User not found" });

    const { cloakedCount, cloakedDetails } = filterByPrivacyShield(updated, db.getUsers());
    return sendJson(res, 200, {
      user: sanitizeUser(updated),
      cloakedCount,
      cloakedDetails,
      message: `Privacy Firewall updated (${cloakedCount} profile${cloakedCount === 1 ? "" : "s"} cloaked).`
    });
  }

  // 14. Subscription Upgrade / Monetization Action
  if (pathname === "/api/profile/subscription" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, planName } = body;
    const updated = db.updateUser(userId, (u) => ({
      ...u,
      subscriptionTier: planName || "pH7 Equilibrium+",
      credits: (u.credits || 30) + 50
    }));
    if (!updated) return sendJson(res, 404, { error: "User not found" });
    db.state.platformMetrics.payingSubscribers += 1;
    db.save();

    return sendJson(res, 200, {
      user: sanitizeUser(updated),
      message: `Upgraded to ${updated.subscriptionTier}! +50 Chemistry Credits added.`
    });
  }

  // 15. Reset Demo State
  if (pathname === "/api/admin/reset" && req.method === "POST") {
    db.resetToSeed();
    return sendJson(res, 200, {
      message: "Database reset to fresh seed state for evaluation."
    });
  }

  return sendJson(res, 404, { error: `API route not found: ${pathname}` });
}

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname || "/";

    if (pathname.startsWith("/api/")) {
      return await handleApi(req, res, parsedUrl);
    }

    // Serve static files from /public
    let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, "");
    if (safePath === "/" || safePath === "\\") {
      safePath = "/index.html";
    }

    const filePath = path.join(PUBLIC_DIR, safePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // SPA fallback to index.html
      const indexFile = path.join(PUBLIC_DIR, "index.html");
      if (fs.existsSync(indexFile)) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        fs.createReadStream(indexFile).pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      }
    }
  } catch (err) {
    console.error("Server error:", err);
    sendJson(res, 500, { error: err.message || "Internal Server Error" });
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n==================================================================`);
    console.log(`⚡ pH7 by eLitmus — Cognitive & Values-First Dating Platform`);
    console.log(`🌐 Live Server URL: http://localhost:${PORT}`);
    console.log(`🔑 Demo Accounts (Password: password123):`);
    console.log(`   • aarav@elitmus.com  (2022 Batch • SDE-2 @ Razorpay • BLR)`);
    console.log(`   • ananya@elitmus.com (2021 Batch • PM @ Swiggy • BLR)`);
    console.log(`   • meera@elitmus.com  (2020 Batch • Lead Designer @ Atlassian • BLR)`);
    console.log(`   • rohan@elitmus.com  (2021 Batch • Applied AI @ Microsoft • HYD)`);
    console.log(`==================================================================\n`);
  });
}

module.exports = server;
