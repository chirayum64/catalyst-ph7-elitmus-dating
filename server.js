/**
 * Catalyst (pH7) by eLitmus — Full-Stack Web Server & REST API
 * Combines:
 * - Weekly Curated Table Drops (4-6 Verified Alumni, ₹0-₹300 Budget Caps, UPI Seat Fee)
 * - Asymmetric 2-Player Duet Puzzle ("The Wow Feature")
 * - Morning-After Mutual Spark Reveal
 * - 5-Axis Equilibrium Radar, Life-Architecture Dilemmas, Focused 3-Slot Cap
 * - Live Chat Scam Shield (Blocks UPI IDs, links, phone numbers in early chat)
 * - Safe-Date Co-Pilot ("I Need Out" SOS & Trusted Contact Share Link)
 * - DPDP Rules (14 Nov 2025 / May 2027) Consent Ledger & Export
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

/**
 * Live Scam Shield Detector (McAfee 2026 India Protection)
 * Blocks UPI IDs, QR requests, 10-digit phone numbers, and external links in early chat.
 */
function inspectScamShield(text) {
  const raw = text || "";
  const upiRegex = /[a-zA-Z0-9.\-_]{2,}@(okaxis|okhdfcbank|okicici|oksbi|ybl|ibl|axl|paytm|upi|apl)/i;
  const linkRegex = /(https?:\/\/|www\.|bit\.ly|t\.me\/)/i;
  const phoneRegex = /(\+91[\-\s]?)?[6-9]\d{9}\b/;
  const moneyAskRegex = /\b(send money|transfer rs|scan qr|urgent cash|crypto|usdt)\b/i;

  if (upiRegex.test(raw)) {
    return {
      blocked: true,
      reason: "UPI ID detected in early chat (e.g., @okaxis / @ybl). Blocked by Catalyst Scam Shield."
    };
  }
  if (linkRegex.test(raw)) {
    return {
      blocked: true,
      reason: "External URL/link detected in early chat. Blocked to prevent phishing & QR scams."
    };
  }
  if (phoneRegex.test(raw)) {
    return {
      blocked: true,
      reason: "Phone number detected in early chat. Keep communication on Catalyst until you've met in person!"
    };
  }
  if (moneyAskRegex.test(raw)) {
    return {
      blocked: true,
      reason: "Financial request keyword detected. Catalyst Scam Shield blocks all money/QR requests."
    };
  }
  return { blocked: false };
}

function generateSmartReply(senderUser, partnerUser, messageText, messageType) {
  const firstName = senderUser.name.split(" ")[0];
  if (messageType === "icebreaker_card") {
    return `Ooh I love this icebreaker, ${firstName}! Let me think—my guess is option #2 is the plot twist, and for mine: my first week in Bengaluru I accidentally boarded an Outer Ring Road bus going the opposite direction in pouring rain 😄 What about you?`;
  }
  const lower = (messageText || "").toLowerCase();
  if (
    lower.includes("coffee") ||
    lower.includes("araku") ||
    lower.includes("saturday") ||
    lower.includes("weekend") ||
    lower.includes("meet") ||
    lower.includes("blossoms")
  ) {
    return `That sounds genuinely lovely, ${firstName}! A ₹190 budget-capped pour-over or bookstore walk works great for me—let's lock in a Safe-Date Pass so my Safe-Date Co-Pilot link is active too! ☕✨`;
  }
  if (
    lower.includes("book") ||
    lower.includes("system") ||
    lower.includes("read") ||
    lower.includes("podcast")
  ) {
    return `Yes!! It completely changed how I look at feedback loops—both in engineering and in relationships. Next on my list is 'Thinking in Systems' over filter coffee!`;
  }
  return `That's such a sharp perspective, ${firstName}. Meeting at the Sunday table first made this conversation 10x more natural than swiping! Tell me more about how you see that playing out?`;
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
      codename: "Catalyst (pH7) by eLitmus",
      version: "2.0.0",
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
      hometown: u.hometown,
      role: u.role,
      company: u.company,
      city: u.city,
      cognitiveArchetype: u.cognitiveArchetype,
      karmaScore: u.karmaScore,
      trustLadder: u.trustLadder,
      subscriptionTier: u.subscriptionTier
    }));

    return sendJson(res, 200, {
      demoAccounts,
      tables: db.state.tables,
      duetPuzzles: db.state.duetPuzzles,
      dilemmas: db.state.dilemmas,
      venues: db.state.venues,
      icebreakers: db.state.icebreakers,
      alumniRegistrySampleIds: Object.keys(db.state.alumniRegistry),
      platformMetrics: db.state.platformMetrics,
      scamShieldLogs: db.state.scamShieldLogs,
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
          "Class 10/12 & Degree Docs Verified via eLitmus. Raw pH test scores are never shown or ranked (DPDP Rules Nov 2025 Purpose-Limitation Firewall)."
      });
    }

    const match = rawId.match(/^EL-(202[0-3])-(\d{4,6})$/);
    if (match) {
      const batchYear = Number(match[1]);
      return sendJson(res, 200, {
        verified: true,
        record: {
          elitmusPhId: rawId,
          name: body.name || "Verified eLitmus Graduate",
          batchYear,
          hometown: "Pune",
          phTestMemory: `Wrote pH Test in ${batchYear} • Class 10/12 & Degree Docs Verified`,
          college: `NIT / Tier-2 Engineering Alum ('${String(batchYear).slice(-2)})`,
          company: "Tech Corp India",
          companyDomain: "techcorp.in",
          role: "Software Engineer",
          city: "Bengaluru",
          cognitiveArchetype: "Systems Architect",
          archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
          wavelengthVector: {
            intellectualCuriosity: 90,
            careerAmbitionTempo: 85,
            financialThermostat: 88,
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

  // 5. Register New User with 4-Rung Trust Ladder & 18+ Age Gate
  if (pathname === "/api/auth/register" && req.method === "POST") {
    const body = await parseBody(req);
    if (!body.email || !body.name) {
      return sendJson(res, 400, { error: "Name and Email are required." });
    }
    const age = Number(body.age) || 25;
    if (age < 18) {
      return sendJson(res, 403, {
        error: "18+ Strict Age Gate: Catalyst is strictly restricted to verified adults aged 18+."
      });
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
      age,
      gender: body.gender || "Male",
      lookingFor: body.lookingFor || (body.gender === "Female" ? "Male" : "Female"),
      batchYear,
      hometown: body.hometown || "Nagpur",
      relocatedYear: batchYear,
      phTestMemory: `Wrote pH Test in ${batchYear} • Class 10/12 & Degree Docs Verified`,
      college: body.college || `Verified eLitmus Partner Institute ('${String(batchYear).slice(-2)})`,
      collegeTier: `Verified eLitmus Batch '${String(batchYear).slice(-2)}`,
      company: body.company || "PhonePe",
      companyDomain,
      role: body.role || "Software Development Engineer",
      city: body.city || "Bengaluru",
      neighborhood: body.neighborhood || "Indiranagar",
      intent: body.intent || "Serious / Intentional Dating",
      freeEvenings: ["Sat Evening", "Sun 4:30 PM"],
      diet: body.diet || "Vegetarian",
      languages: ["English", "Hindi"],
      trustLadder: {
        level: 3,
        maxLevel: 4,
        phoneOtp: true,
        age18AndSelfieLiveness: true,
        elitmusCredentialDocs: true,
        peerVouchesCount: 0,
        vouchedBy: []
      },
      reliabilityStats: {
        showUpRatePct: 100,
        tablesAttended: 0,
        kindClosuresSent: 0,
        zeroGhostStreakWeeks: 1
      },
      avatarColor: "#6366f1",
      photoSvgSeed: body.name.toLowerCase().split(" ")[0],
      headline:
        body.headline ||
        "Verified eLitmus alum looking for small-group tables and high-wavelength conversations.",
      bio:
        body.bio ||
        "Joined Catalyst (pH7) to skip superficial swiping and meet verified alumni at curated Sunday tables.",
      voiceNoteTranscript:
        body.voiceNoteTranscript ||
        "Let's solve the 3-minute Duet puzzle and grab ₹150 filter coffee at Sunday's table!",
      cognitiveArchetype: body.cognitiveArchetype || "Systems Architect",
      archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
      karmaScore: 95,
      karmaBadges: ["Verified Alumni Onboarding", "18+ Liveness Verified"],
      subscriptionTier: "Free (Pay-Per-Table)",
      credits: 35,
      confirmedTableId: "tbl_blr_filter_coffee",
      duetCompletedWith: [],
      sparkPicks: [],
      coworkerShield: {
        enabled: true,
        blockCurrentCompany: true,
        blockCollegeBatch: Boolean(body.blockCollegeBatch),
        blockedDomains: [companyDomain],
        incognitoToRecruiters: true
      },
      dpdpConsent: {
        consentedAt: new Date().toISOString(),
        rulesVersion: "DPDP Rules (Notified 14 Nov 2025 / Effective May 2027 Ready)",
        allowIdentityVerification: true,
        allowSharedPhCityMonthMemory: true,
        employerFirewallGuaranteed: true
      },
      wavelengthVector: body.wavelengthVector || {
        intellectualCuriosity: 90,
        careerAmbitionTempo: 85,
        financialThermostat: 88,
        socialBattery: 68,
        conflictDirectness: 78
      },
      dilemmaAnswers: body.dilemmaAnswers || {
        dil_career_leap: "opt_b",
        dil_sunday_rhythm: "opt_b",
        dil_conflict_protocol: "opt_b",
        dil_money_philosophy: "opt_a",
        dil_relocation_horizon: "opt_a"
      },
      prompts: [
        {
          question: "My Non-Swipeable Green Flag",
          answer: body.greenFlagPrompt || "Intellectual curiosity paired with emotional directness."
        }
      ],
      revealStages: {}
    };

    db.addUser(newUser);
    return sendJson(res, 201, {
      user: sanitizeUser(newUser),
      message: "eLitmus Trust Passport (Rung 3/4) minted & DPDP Consent Ledger recorded!"
    });
  }

  // 6. Confirm Weekly Drop Table Seat via UPI Test Mode (₹49 - ₹99 Seat Fee)
  if (pathname === "/api/tables/confirm" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, tableId, upiVpa } = body;
    const user = db.getUserById(userId);
    const table = db.state.tables.find((t) => t.id === tableId);
    if (!user || !table) {
      return sendJson(res, 404, { error: "User or Table not found" });
    }

    const alreadySeated = table.seats.some((s) => s.userId === userId);
    if (!alreadySeated) {
      table.seats.push({
        userId: user.id,
        name: `${user.name.split(" ")[0]} ${user.name.split(" ")[1] ? user.name.split(" ")[1][0] + "." : ""}`,
        batch: `${user.batchYear} Batch`,
        hometown: `${user.hometown || "Metro"} → Relocated to ${user.city}`,
        role: user.role,
        trustRung: user.trustLadder ? user.trustLadder.level : 4,
        sharedMemory: `Both verified via eLitmus pH Test & relocated to ${user.city}`
      });
    }

    const updatedUser = db.updateUser(userId, (u) => ({
      ...u,
      confirmedTableId: tableId
    }));

    db.state.platformMetrics.payingTableSeatsMonthly += 1;
    db.save();

    return sendJson(res, 200, {
      table,
      user: sanitizeUser(updatedUser),
      receipt: {
        txnId: `RZP_UPI_TEST_${Date.now()}`,
        amountRs: table.seatFeeRs,
        upiVpa: upiVpa || "alumni@okicici",
        refundGuarantee:
          "100% Auto-Refunded via Razorpay Test Mode if table is cancelled or under-filled (<4 people)."
      },
      message: `Seat confirmed at ${table.title} via UPI (₹${table.seatFeeRs})! Check-In Code: ${table.checkInCode}`
    });
  }

  // 7. Solve Asymmetric 2-Player Duet Puzzle ("The Wow Feature")
  if (pathname === "/api/duet/solve" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, puzzleId, selectedOptionId, partnerId } = body;
    const puzzle = db.state.duetPuzzles.find((p) => p.id === puzzleId) || db.state.duetPuzzles[0];
    const isCorrect = selectedOptionId === puzzle.correctOptionId;

    if (!isCorrect) {
      return sendJson(res, 200, {
        solved: false,
        explanation:
          "Not quite! Combine Your Clue A2 (Designer is immediately left of Founder) with Ananya's Clue B1 (Founder is in Seat 4) -> Designer is in Seat 3! Since Clue B2 puts Researcher in Seat 1, where must the Architect sit?",
        message: "Hint unlocked — check how your clues interlock!"
      });
    }

    const updatedUser = db.updateUser(userId, (u) => {
      const list = new Set(u.duetCompletedWith || []);
      if (partnerId) list.add(partnerId);
      return {
        ...u,
        duetCompletedWith: Array.from(list),
        karmaScore: Math.min(100, (u.karmaScore || 95) + 1)
      };
    });

    return sendJson(res, 200, {
      solved: true,
      explanation: puzzle.explanation,
      duetNote: puzzle.generatedDuetNote,
      user: sanitizeUser(updatedUser),
      message: "🎉 Duet Puzzle Solved! Collaboration Note added to your Sunday Table profile."
    });
  }

  // 8. Morning-After Private "Spark Reveal" (Pick up to 2 tablemates; mutual pick unlocks 1:1 Chat)
  if (pathname === "/api/spark/reveal" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, targetUserId } = body;
    const user = db.getUserById(userId);
    const target = db.getUserById(targetUserId);
    if (!user || !target) {
      return sendJson(res, 404, { error: "User not found" });
    }

    const updatedUser = db.updateUser(userId, (u) => {
      const picks = new Set(u.sparkPicks || []);
      picks.add(targetUserId);
      return {
        ...u,
        sparkPicks: Array.from(picks),
        revealStages: { ...(u.revealStages || {}), [targetUserId]: 3 }
      };
    });

    // Check if target also picked user (or simulate mutual spark for demo candidates Ananya & Meera)
    const theirPicks = new Set(target.sparkPicks || []);
    const isMutual =
      theirPicks.has(userId) || targetUserId === "usr_ananya" || targetUserId === "usr_meera";

    let conv = db.getConversationBetween(userId, targetUserId);
    if (isMutual) {
      const equilibrium = calculateEquilibrium(updatedUser, target);
      if (!conv) {
        conv = {
          id: `conv_${Date.now()}`,
          participants: [userId, targetUserId],
          stage: 3,
          status: "active",
          origin: "Mutual Morning-After Spark from Table #14",
          startedAt: new Date().toISOString(),
          sharedDilemmasCount: equilibrium.exactDilemmaMatches,
          equilibriumScore: equilibrium.overallScore,
          safeDateBooking: null,
          messages: [
            {
              id: `msg_spk_${Date.now()}`,
              senderId: "system",
              type: "dilemma_sync",
              text: `✨ Mutual Morning-After Spark! You and ${target.name} both privately selected each other after Sunday's Table! 1:1 Chat is now unlocked + Suggested 1:1 Plan: ₹150 Filter Coffee & Bookstore Walk at Church Street.`,
              timestamp: new Date().toISOString()
            }
          ]
        };
      } else {
        conv.stage = 3;
        conv.status = "active";
      }
      db.upsertConversation(conv);
    }

    return sendJson(res, 200, {
      isMutual,
      conversation: conv,
      user: sanitizeUser(updatedUser),
      message: isMutual
        ? `⚡ Mutual Spark with ${target.name}! 1:1 Chat + Suggested ₹150 1:1 Plan unlocked!`
        : `🔒 Saved privately! If ${target.name} also picks you, chat will unlock. Non-mutual picks are never revealed (zero rejection notice).`
    });
  }

  // 9. Discovery / Cohort Compatibility Feed with Privacy Firewall & 5-Axis Equilibrium
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
          revealStage,
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

  // 10. Answer or Update a Life-Architecture Micro-Case Dilemma
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

  // 11. Advance Progressive Reveal / Unlock Chemistry Slot
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

    if (!existingConv && activeConvs.length >= 3) {
      return sendJson(res, 409, {
        code: "SLOTS_FULL",
        error:
          "Focused Chemistry Cap Reached (3/3 Active Slots). To prevent ghosting and match-hoarding, please Gracefully Close one active conversation in your Chemistry Lab before opening a new slot."
      });
    }

    const nextStage = Math.min(3, currentStage + 1);
    const equilibrium = calculateEquilibrium(user, candidate);

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
        text: `✨ Progressive Reveal Complete — Stage ${nextStage} Full Equilibrium Unlocked! Photos are now 100% unblurred and Safe-Date Co-Pilot is active.`,
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

  // 12. Get User's Conversations (Focused Chemistry Slots)
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

  // 13. Send Message or Launch Co-Op Icebreaker (WITH LIVE SCAM SHIELD INTERCEPTION)
  if (pathname === "/api/conversations/message" && req.method === "POST") {
    const body = await parseBody(req);
    const { conversationId, senderId, text, type, icebreakerTitle } = body;
    const conv = db.getConversationById(conversationId);
    if (!conv) return sendJson(res, 404, { error: "Conversation not found" });

    // Run Live Scam Shield check
    const shieldCheck = inspectScamShield(text);
    if (shieldCheck.blocked) {
      db.state.scamShieldLogs.unshift({
        id: `scam_${Date.now()}`,
        blockedPattern: shieldCheck.reason,
        timestamp: new Date().toISOString(),
        action: "Blocked in Chat"
      });
      conv.messages.push({
        id: `msg_scam_${Date.now()}`,
        senderId: "system",
        type: "scam_shield_blocked",
        text: `🛡️ SCAM SHIELD INTERCEPTED MESSAGE: ${shieldCheck.reason} (McAfee 2026 India Protection: Never share UPI IDs, QR codes, links, or phone numbers in early chat.)`,
        timestamp: new Date().toISOString()
      });
      db.upsertConversation(conv);
      return sendJson(res, 422, {
        code: "SCAM_SHIELD_BLOCKED",
        error: shieldCheck.reason,
        conversation: conv
      });
    }

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
        text: "🎉 Stage 3 Full Crystal Reveal achieved through two-way conversation! Full profile gallery & Verified Safe-Date Co-Pilot are now unlocked.",
        timestamp: new Date().toISOString()
      });
    }

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

  // 14. Anti-Ghosting Graceful Closure Protocol ("Kind No" Templates)
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
      text: `🕊️ 'Kind No' Graceful Closure completed: "${conv.closureReason}". Zero ghosting! Reliability Badge & Accountability Karma (+2) updated.`,
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
      toUserName: partner
        ? `${partner.name} ('${String(partner.batchYear).slice(-2)} Batch)`
        : "Match",
      reason: conv.closureReason,
      karmaEarned: 2,
      timestamp: new Date().toISOString()
    });
    db.save();

    return sendJson(res, 200, {
      conversation: conv,
      user: sanitizeUser(updatedUser),
      message:
        "Graceful Closure sent! You earned +2 Karma Score & +10 Credits, and freed 1 Chemistry Slot."
    });
  }

  // 15. Book Verified Safe-Date Pass + Safe-Date Co-Pilot Link
  if (pathname === "/api/conversations/book-safe-date" && req.method === "POST") {
    const body = await parseBody(req);
    const { conversationId, venueId, dateTime, trustedContact } = body;
    const conv = db.getConversationById(conversationId);
    if (!conv) return sendJson(res, 404, { error: "Conversation not found" });

    const venue = db.state.venues.find((v) => v.id === venueId) || db.state.venues[0];
    const passCode = `CAT-${venue.city.slice(0, 3).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 8999
    )}`;

    conv.safeDateBooking = {
      venueId: venue.id,
      venueName: `${venue.name}, ${venue.area} (${venue.city})`,
      dateTime: dateTime || "This Saturday • 5:30 PM",
      passCode,
      perk: venue.elitmusPerk,
      safetyBadge: venue.safetyBadge,
      trustedContact: trustedContact || "Trusted Contact (+91-98XXXXXX12 • Live GPS & Timer Shared)",
      status: "Confirmed • Safe-Date Co-Pilot Active",
      safetyCheckInEnabled: true
    };

    conv.messages.push({
      id: `msg_date_${Date.now()}`,
      senderId: "system",
      type: "safe_date_pass",
      text: `🥂 Verified Safe-Date Pass Minted (${passCode}) at ${venue.name} (${venue.area}, Avg Split: ${venue.avgSplitCost}) for ${conv.safeDateBooking.dateTime}! Safe-Date Co-Pilot live link shared with ${conv.safeDateBooking.trustedContact}.`,
      timestamp: new Date().toISOString()
    });

    db.state.platformMetrics.meetupsAttendedPer100Users = Number(
      (db.state.platformMetrics.meetupsAttendedPer100Users + 0.2).toFixed(1)
    );
    db.upsertConversation(conv);

    return sendJson(res, 200, {
      booking: conv.safeDateBooking,
      conversation: conv,
      message: `Safe-Date Pass ${passCode} & Co-Pilot Timer confirmed at ${venue.name}!`
    });
  }

  // 16. Safe-Date Co-Pilot Discreet "I Need Out" SOS Trigger
  if (pathname === "/api/safety/copilot-sos" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, locationNote } = body;
    const report = {
      id: `sos_${Date.now()}`,
      userId,
      locationNote: locationNote || "Table #14 / Indiranagar Partner Venue",
      action:
        "Discreet 'I Need Out' Alert dispatched to Trusted Contact with live check-in link + Venue Manager notified for discreet exit.",
      timestamp: new Date().toISOString()
    };
    db.state.safetyReports.unshift(report);
    db.save();
    return sendJson(res, 200, {
      report,
      message:
        "🛡️ Safe-Date Co-Pilot: Discreet 'I Need Out' alert sent to your Trusted Contact & Venue Safe-Zone Desk."
    });
  }

  // 17. Update Coworker & Batchmate Privacy Shield
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
      message: `Privacy Firewall updated (${cloakedCount} profile${
        cloakedCount === 1 ? "" : "s"
      } cloaked).`
    });
  }

  // 18. Subscription Upgrade / Monetization Action
  if (pathname === "/api/profile/subscription" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, planName } = body;
    const updated = db.updateUser(userId, (u) => ({
      ...u,
      subscriptionTier: planName || "pH7 Equilibrium+",
      credits: (u.credits || 30) + 50
    }));
    if (!updated) return sendJson(res, 404, { error: "User not found" });
    db.save();

    return sendJson(res, 200, {
      user: sanitizeUser(updated),
      message: `Upgraded to ${updated.subscriptionTier}! +50 Chemistry Credits added.`
    });
  }

  // 19. DPDP Rules (14 Nov 2025 / May 2027) Consent Withdrawal & Data Export
  if (pathname === "/api/dpdp/action" && req.method === "POST") {
    const body = await parseBody(req);
    const { userId, actionType } = body;
    const user = db.getUserById(userId);
    if (!user) return sendJson(res, 404, { error: "User not found" });

    if (actionType === "export") {
      return sendJson(res, 200, {
        exportBundle: {
          exportedAt: new Date().toISOString(),
          regulation: "Digital Personal Data Protection (DPDP) Rules 2025",
          userProfile: sanitizeUser(user),
          consentLedger: user.dpdpConsent
        },
        message: "📦 DPDP Data Portability Export generated (JSON bundle ready)."
      });
    }

    if (actionType === "toggle_shared_memory") {
      const updated = db.updateUser(userId, (u) => ({
        ...u,
        dpdpConsent: {
          ...(u.dpdpConsent || {}),
          allowSharedPhCityMonthMemory: !(
            u.dpdpConsent && u.dpdpConsent.allowSharedPhCityMonthMemory
          ),
          updatedAt: new Date().toISOString()
        }
      }));
      return sendJson(res, 200, {
        user: sanitizeUser(updated),
        message: "🔒 DPDP Itemized Consent Ledger updated immediately."
      });
    }

    return sendJson(res, 200, {
      message: "DPDP Consent action recorded."
    });
  }

  // 20. Reset Demo State
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
    console.log(`⚡ Catalyst (pH7) by eLitmus — The App That Wants You To Leave`);
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
