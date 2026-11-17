/**
 * Builds public/localApiFallback.js and root static files so the application runs
 * both as a full Node.js server (node server.js) AND 100% interactively on GitHub Pages!
 */

const fs = require("fs");
const path = require("path");
const seedData = require("./data/seedData");

const fallbackSource = `/**
 * Auto-generated Browser API Fallback Engine for Static/GitHub Pages Hosting
 * Automatically activates when the Node.js /api/* server is not reachable (e.g., on GitHub Pages).
 */
(function() {
  const SEED = ${JSON.stringify(seedData, null, 2)};

  function createFreshState() {
    return {
      users: JSON.parse(JSON.stringify(SEED.USERS)),
      tables: JSON.parse(JSON.stringify(SEED.WEEKLY_DROP_TABLES)),
      duetPuzzles: JSON.parse(JSON.stringify(SEED.DUET_PUZZLES)),
      conversations: JSON.parse(JSON.stringify(SEED.INITIAL_CONVERSATIONS)),
      dilemmas: JSON.parse(JSON.stringify(SEED.DILEMMA_BANK)),
      venues: JSON.parse(JSON.stringify(SEED.SAFE_DATE_VENUES)),
      icebreakers: JSON.parse(JSON.stringify(SEED.COOP_ICEBREAKERS)),
      alumniRegistry: JSON.parse(JSON.stringify(SEED.ELITMUS_ALUMNI_REGISTRY)),
      safetyReports: [],
      scamShieldLogs: [],
      closureLogs: [],
      platformMetrics: {
        totalVerifiedAlumniPool: 1042800,
        activatedWaitlistUsers: 68400,
        monthlyActiveUsers: 24500,
        meetupsAttendedPer100Users: 64.8,
        avgTimeInAppMinutesWeekly: 14.2,
        payingTableSeatsMonthly: 8420,
        corporateWelcomeSocialsBooked: 42,
        avgShowUpRatePct: 96.4,
        ghostingReductionPct: 84.5,
        coworkerCloaksActive: 19400
      }
    };
  }

  let dbState = null;
  try {
    const saved = localStorage.getItem("catalyst_ph7_db_v2");
    dbState = saved ? JSON.parse(saved) : createFreshState();
  } catch (e) {
    dbState = createFreshState();
  }

  function saveDb() {
    try {
      localStorage.setItem("catalyst_ph7_db_v2", JSON.stringify(dbState));
    } catch (e) {}
  }

  function sanitizeUser(u) {
    if (!u) return null;
    const copy = Object.assign({}, u);
    delete copy.password;
    return copy;
  }

  function calculateEquilibrium(userA, userB) {
    const vecA = userA.wavelengthVector || {};
    const vecB = userB.wavelengthVector || {};
    const axes = [
      { key: "intellectualCuriosity", label: "Intellectual Wavelength", weight: 0.28, mode: "similarity", highNote: "Both of you crave rabbit-hole conversations and first-principles thinking.", midNote: "Healthy overlap in curiosity with distinct domain interests." },
      { key: "financialThermostat", label: "Financial Thermostat", weight: 0.22, mode: "similarity", highNote: "Aligned philosophy on budget-aware dates & compounding wealth.", midNote: "Complementary money habits—one anchors security, the other sparks experiences." },
      { key: "careerAmbitionTempo", label: "Ambition & Career Tempo", weight: 0.20, mode: "similarity", highNote: "Mutual empathy for high-ownership tech careers and growth sprints.", midNote: "Balanced career pace—one provides steady grounding during crunch weeks." },
      { key: "conflictDirectness", label: "Conflict & Communication", weight: 0.16, mode: "calibrated", highNote: "High psychological safety: you debug disagreements without ego.", midNote: "One brings direct clarity while the other brings reflective diplomacy." },
      { key: "socialBattery", label: "Social Battery & Rhythm", weight: 0.14, mode: "complement", highNote: "Synchronized weekend energy—easy agreement on when to go out vs. stay in.", midNote: "Classic introvert-ambivert synergy that expands both your worlds." }
    ];

    let weightedSum = 0;
    const axisBreakdown = axes.map((axis) => {
      const valA = vecA[axis.key] || 80;
      const valB = vecB[axis.key] || 80;
      const diff = Math.abs(valA - valB);
      let score;
      if (axis.mode === "similarity") score = Math.max(55, Math.round(100 - diff * 1.15));
      else if (axis.mode === "calibrated") score = Math.max(60, Math.round(100 - diff * 0.95));
      else score = diff <= 15 ? Math.round(98 - diff * 0.4) : Math.max(62, Math.round(95 - (diff - 15) * 1.1));
      weightedSum += score * axis.weight;
      return { key: axis.key, label: axis.label, userAValue: valA, userBValue: valB, delta: diff, compatibilityScore: score, insight: score >= 88 ? axis.highNote : axis.midNote };
    });

    const answersA = userA.dilemmaAnswers || {};
    const answersB = userB.dilemmaAnswers || {};
    let exactDilemmaMatches = 0;
    let totalComparedDilemmas = 0;
    const dilemmaComparison = dbState.dilemmas.map((dilemma) => {
      const choiceAId = answersA[dilemma.id];
      const choiceBId = answersB[dilemma.id];
      const optA = dilemma.options.find((o) => o.id === choiceAId) || dilemma.options[0];
      const optB = dilemma.options.find((o) => o.id === choiceBId) || dilemma.options[0];
      const isExactMatch = Boolean(choiceAId && choiceBId && choiceAId === choiceBId);
      if (choiceAId && choiceBId) {
        totalComparedDilemmas++;
        if (isExactMatch) exactDilemmaMatches++;
      }
      return {
        dilemmaId: dilemma.id,
        category: dilemma.category,
        title: dilemma.title,
        scenario: dilemma.scenario,
        userAChoice: optA.label,
        userATag: optA.archetypeTag,
        userBChoice: optB.label,
        userBTag: optB.archetypeTag,
        isExactMatch
      };
    });

    const dilemmaBonus = totalComparedDilemmas > 0 ? (exactDilemmaMatches / totalComparedDilemmas) * 6 : 3;
    const overallScore = Math.min(99, Math.max(68, Math.round(weightedSum + dilemmaBonus)));
    const deviation = ((99 - overallScore) * 0.012).toFixed(2);
    const phValue = (7.0 + (overallScore % 2 === 0 ? 1 : -1) * Number(deviation)).toFixed(2);
    const sortedAxes = axisBreakdown.slice().sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    const bestAxis = sortedAxes[0];
    const watchAxis = sortedAxes[sortedAxes.length - 1];

    return {
      overallScore,
      phValue,
      phLabel: overallScore >= 92 ? "Golden pH7 Equilibrium" : overallScore >= 85 ? "High Cognitive Resonance" : "Complementary Spark",
      exactDilemmaMatches,
      totalComparedDilemmas,
      axisBreakdown,
      dilemmaComparison,
      synergySuperpower: bestAxis.label + " (" + bestAxis.compatibilityScore + "% Sync): " + bestAxis.insight,
      frictionWatchout: watchAxis.label + " (" + watchAxis.delta + " pt delta): Great opportunity for conscious balance."
    };
  }

  function filterByPrivacyShield(currentUser, allUsers) {
    const cloakedCoworkers = [];
    const visibleCandidates = [];
    for (const candidate of allUsers) {
      if (candidate.id === currentUser.id) continue;
      if (currentUser.lookingFor && currentUser.lookingFor !== "Everyone" && candidate.gender !== currentUser.lookingFor) continue;
      const myShield = currentUser.coworkerShield || {};
      const theirShield = candidate.coworkerShield || {};
      const sameCompany = (currentUser.companyDomain && candidate.companyDomain && currentUser.companyDomain.toLowerCase() === candidate.companyDomain.toLowerCase()) ||
                          (currentUser.company && candidate.company && currentUser.company.toLowerCase() === candidate.company.toLowerCase());
      const domainBlockedByMe = Array.isArray(myShield.blockedDomains) && candidate.companyDomain && myShield.blockedDomains.map(d => d.toLowerCase()).includes(candidate.companyDomain.toLowerCase());
      const domainBlockedByThem = Array.isArray(theirShield.blockedDomains) && currentUser.companyDomain && theirShield.blockedDomains.map(d => d.toLowerCase()).includes(currentUser.companyDomain.toLowerCase());
      const sameCollegeBatch = currentUser.college === candidate.college && currentUser.batchYear === candidate.batchYear;

      if ((myShield.enabled && myShield.blockCurrentCompany && sameCompany) || (theirShield.enabled && theirShield.blockCurrentCompany && sameCompany) || domainBlockedByMe || domainBlockedByThem) {
        cloakedCoworkers.push({ reason: "Mutual Coworker Shield (" + candidate.company + ")", company: candidate.company, batchYear: candidate.batchYear });
        continue;
      }
      if ((myShield.enabled && myShield.blockCollegeBatch && sameCollegeBatch) || (theirShield.enabled && theirShield.blockCollegeBatch && sameCollegeBatch)) {
        cloakedCoworkers.push({ reason: "College Batch Shield (" + candidate.college + ")", company: candidate.company, batchYear: candidate.batchYear });
        continue;
      }
      visibleCandidates.push(candidate);
    }
    return { visibleCandidates, cloakedCount: cloakedCoworkers.length, cloakedDetails: cloakedCoworkers };
  }

  function inspectScamShield(text) {
    const raw = text || "";
    const upiRegex = /[a-zA-Z0-9.\\-_]{2,}@(okaxis|okhdfcbank|okicici|oksbi|ybl|ibl|axl|paytm|upi|apl)/i;
    const linkRegex = /(https?:\\/\\/|www\\.|bit\\.ly|t\\.me\\/)/i;
    const phoneRegex = /(\\+91[\\-\\s]?)?[6-9]\\d{9}\\b/;
    const moneyAskRegex = /\\b(send money|transfer rs|scan qr|urgent cash|crypto|usdt)\\b/i;
    if (upiRegex.test(raw)) return { blocked: true, reason: "UPI ID detected in early chat (e.g., @okaxis / @ybl). Blocked by Catalyst Scam Shield." };
    if (linkRegex.test(raw)) return { blocked: true, reason: "External URL/link detected in early chat. Blocked to prevent phishing & QR scams." };
    if (phoneRegex.test(raw)) return { blocked: true, reason: "Phone number detected in early chat. Keep communication on Catalyst until you've met in person!" };
    if (moneyAskRegex.test(raw)) return { blocked: true, reason: "Financial request keyword detected. Catalyst Scam Shield blocks all money/QR requests." };
    return { blocked: false };
  }

  window.ph7LocalApi = {
    async handle(rawPath, options) {
      const uObj = new URL(rawPath, "http://localhost");
      const pathname = uObj.pathname;
      const query = Object.fromEntries(uObj.searchParams.entries());
      const body = options && options.body ? JSON.parse(options.body) : {};

      if (pathname === "/api/bootstrap") {
        return {
          demoAccounts: dbState.users.map(sanitizeUser),
          tables: dbState.tables,
          duetPuzzles: dbState.duetPuzzles,
          dilemmas: dbState.dilemmas,
          venues: dbState.venues,
          icebreakers: dbState.icebreakers,
          alumniRegistrySampleIds: Object.keys(dbState.alumniRegistry),
          platformMetrics: dbState.platformMetrics,
          scamShieldLogs: dbState.scamShieldLogs,
          closureLogs: dbState.closureLogs
        };
      }

      if (pathname === "/api/discover") {
        const userId = query.userId || "usr_aarav";
        const currentUser = dbState.users.find(u => u.id === userId) || dbState.users[0];
        const { visibleCandidates, cloakedCount, cloakedDetails } = filterByPrivacyShield(currentUser, dbState.users);
        const activeConvs = dbState.conversations.filter(c => c.participants.includes(userId) && c.status === "active");
        const matches = visibleCandidates.map(candidate => {
          const equilibrium = calculateEquilibrium(currentUser, candidate);
          const existingConv = dbState.conversations.find(c => c.participants.includes(userId) && c.participants.includes(candidate.id));
          const revealStage = existingConv ? existingConv.stage : ((currentUser.revealStages && currentUser.revealStages[candidate.id]) || 1);
          return {
            candidate: sanitizeUser(candidate),
            equilibrium,
            revealStage,
            conversationId: existingConv ? existingConv.id : null,
            conversationStatus: existingConv ? existingConv.status : null
          };
        }).sort((a, b) => b.equilibrium.overallScore - a.equilibrium.overallScore);

        return {
          currentUser: sanitizeUser(currentUser),
          activeSlotsUsed: activeConvs.length,
          maxActiveSlots: 3,
          privacyFirewall: { cloakedCount, cloakedDetails, shieldSettings: currentUser.coworkerShield },
          matches
        };
      }

      if (pathname === "/api/conversations") {
        const userId = query.userId || "usr_aarav";
        const user = dbState.users.find(u => u.id === userId) || dbState.users[0];
        const convs = dbState.conversations.filter(c => c.participants.includes(userId)).map(conv => {
          const partnerId = conv.participants.find(id => id !== userId) || conv.participants[0];
          const partner = dbState.users.find(u => u.id === partnerId);
          return Object.assign({}, conv, { partner: sanitizeUser(partner), equilibrium: partner ? calculateEquilibrium(user, partner) : null });
        });
        return { activeCount: convs.filter(c => c.status === "active").length, maxSlots: 3, conversations: convs };
      }

      if (pathname === "/api/auth/login") {
        let user = body.userId ? dbState.users.find(u => u.id === body.userId) : dbState.users.find(u => u.email.toLowerCase() === (body.email || "").toLowerCase());
        if (!user) throw new Error("Account not found.");
        return { user: sanitizeUser(user), message: "Welcome back, " + user.name };
      }

      if (pathname === "/api/auth/elitmus-lookup") {
        const rawId = (body.elitmusPhId || "").trim().toUpperCase();
        const found = dbState.alumniRegistry[rawId] || dbState.alumniRegistry["EL-2023-10492"];
        return { verified: true, record: found };
      }

      if (pathname === "/api/auth/register") {
        if (Number(body.age) < 18) throw new Error("18+ Strict Age Gate: Adults 18+ only.");
        const newUser = Object.assign({}, dbState.users[0], {
          id: "usr_" + Date.now(),
          name: body.name,
          email: body.email,
          age: Number(body.age) || 24,
          batchYear: Number(body.batchYear) || 2023,
          gender: body.gender || "Male",
          lookingFor: body.lookingFor || "Female",
          college: body.college || "VIT Vellore",
          company: body.company || "PhonePe",
          companyDomain: (body.company || "phonepe").toLowerCase().replace(/[^a-z0-9]/g, "") + ".com"
        });
        dbState.users.push(newUser);
        saveDb();
        return { user: sanitizeUser(newUser), message: "eLitmus Trust Passport minted!" };
      }

      if (pathname === "/api/tables/confirm") {
        const user = dbState.users.find(u => u.id === body.userId);
        const table = dbState.tables.find(t => t.id === body.tableId) || dbState.tables[0];
        if (user) user.confirmedTableId = table.id;
        saveDb();
        return { table, user: sanitizeUser(user), receipt: { txnId: "RZP_UPI_" + Date.now(), amountRs: table.seatFeeRs }, message: "Seat confirmed at " + table.title + " via UPI (₹" + table.seatFeeRs + ")!" };
      }

      if (pathname === "/api/duet/solve") {
        const puzzle = dbState.duetPuzzles[0];
        const solved = body.selectedOptionId === puzzle.correctOptionId;
        if (!solved) return { solved: false, explanation: "Hint: Combine Your Clue A2 with Ananya's Clue B1 -> Designer is in Seat 3 and Researcher in Seat 1, so Architect is in Seat 2!", message: "Check the clue hint below!" };
        return { solved: true, explanation: puzzle.explanation, duetNote: puzzle.generatedDuetNote, message: "🎉 Duet Puzzle Solved! Collaboration Note generated." };
      }

      if (pathname === "/api/spark/reveal") {
        const user = dbState.users.find(u => u.id === body.userId);
        const target = dbState.users.find(u => u.id === body.targetUserId);
        const isMutual = body.targetUserId === "usr_ananya" || body.targetUserId === "usr_meera";
        let conv = dbState.conversations.find(c => c.participants.includes(body.userId) && c.participants.includes(body.targetUserId));
        if (isMutual && !conv) {
          conv = {
            id: "conv_" + Date.now(),
            participants: [body.userId, body.targetUserId],
            stage: 3,
            status: "active",
            origin: "Mutual Morning-After Spark",
            equilibriumScore: 93,
            messages: [{ id: "m_" + Date.now(), senderId: "system", type: "dilemma_sync", text: "✨ Mutual Morning-After Spark with " + target.name + "! 1:1 Chat unlocked." }]
          };
          dbState.conversations.push(conv);
        }
        saveDb();
        return {
          isMutual,
          conversation: conv,
          user: sanitizeUser(user),
          message: isMutual ? "⚡ Mutual Spark with " + target.name + "! 1:1 Chat unlocked!" : "🔒 Saved privately! Non-mutual picks are never revealed."
        };
      }

      if (pathname === "/api/dilemmas/answer") {
        const user = dbState.users.find(u => u.id === body.userId);
        const dilemma = dbState.dilemmas.find(d => d.id === body.dilemmaId);
        const opt = dilemma.options.find(o => o.id === body.optionId) || dilemma.options[0];
        user.dilemmaAnswers[body.dilemmaId] = body.optionId;
        saveDb();
        return { user: sanitizeUser(user), chosenArchetypeTag: opt.archetypeTag, message: "Wavelength recalibrated with '" + opt.archetypeTag + "'!" };
      }

      if (pathname === "/api/conversations/message") {
        const conv = dbState.conversations.find(c => c.id === body.conversationId);
        const check = inspectScamShield(body.text);
        if (check.blocked) {
          conv.messages.push({ id: "m_scam_" + Date.now(), senderId: "system", type: "scam_shield_blocked", text: "🛡️ SCAM SHIELD INTERCEPTED MESSAGE: " + check.reason });
          saveDb();
          const err = new Error(check.reason);
          err.code = "SCAM_SHIELD_BLOCKED";
          throw err;
        }
        conv.messages.push({ id: "m_" + Date.now(), senderId: body.senderId, type: body.type || "text", icebreakerTitle: body.icebreakerTitle || null, text: body.text });
        const partnerId = conv.participants.find(id => id !== body.senderId);
        conv.messages.push({ id: "m_rep_" + Date.now(), senderId: partnerId, type: "text", text: "That's such a great point! Meeting at Sunday's table first made this conversation 10x more natural ☕✨" });
        const stagePromoted = conv.stage < 3;
        conv.stage = 3;
        saveDb();
        return { conversation: conv, stagePromoted };
      }

      if (pathname === "/api/conversations/graceful-close") {
        const conv = dbState.conversations.find(c => c.id === body.conversationId);
        const user = dbState.users.find(u => u.id === body.userId);
        conv.status = "closed_gracefully";
        conv.messages.push({ id: "m_cls_" + Date.now(), senderId: "system", type: "graceful_closure", text: "🕊️ 'Kind No' Closure sent: " + body.reason });
        user.karmaScore = Math.min(100, user.karmaScore + 2);
        saveDb();
        return { conversation: conv, user: sanitizeUser(user), message: "Kind No Closure sent (+2 Karma & slot freed)!" };
      }

      if (pathname === "/api/conversations/book-safe-date") {
        const conv = dbState.conversations.find(c => c.id === body.conversationId);
        const venue = dbState.venues.find(v => v.id === body.venueId) || dbState.venues[0];
        const passCode = "CAT-BLR-" + Math.floor(1000 + Math.random() * 8999);
        conv.safeDateBooking = { venueId: venue.id, venueName: venue.name + ", " + venue.area, dateTime: body.dateTime, passCode, trustedContact: body.trustedContact };
        conv.messages.push({ id: "m_dt_" + Date.now(), senderId: "system", type: "safe_date_pass", text: "🥂 Safe-Date Plan (" + passCode + ") & Co-Pilot Timer active at " + venue.name + "!" });
        saveDb();
        return { booking: conv.safeDateBooking, conversation: conv, message: "Safe-Date Pass " + passCode + " & Co-Pilot confirmed!" };
      }

      if (pathname === "/api/safety/copilot-sos") {
        return { report: { action: "Discreet 'I Need Out' Alert dispatched" }, message: "🛡️ Safe-Date Co-Pilot: Discreet 'I Need Out' alert sent to your Trusted Contact & Venue Safe-Zone Desk." };
      }

      if (pathname === "/api/profile/shield") {
        const user = dbState.users.find(u => u.id === body.userId);
        if (body.blockCurrentCompany !== undefined) user.coworkerShield.blockCurrentCompany = Boolean(body.blockCurrentCompany);
        if (body.blockCollegeBatch !== undefined) user.coworkerShield.blockCollegeBatch = Boolean(body.blockCollegeBatch);
        if (Array.isArray(body.blockedDomains)) user.coworkerShield.blockedDomains = body.blockedDomains;
        saveDb();
        const { cloakedCount, cloakedDetails } = filterByPrivacyShield(user, dbState.users);
        return { user: sanitizeUser(user), cloakedCount, cloakedDetails, message: "Privacy Firewall updated (" + cloakedCount + " cloaked)." };
      }

      if (pathname === "/api/dpdp/action") {
        const user = dbState.users.find(u => u.id === body.userId);
        if (body.actionType === "export") {
          return { exportBundle: { exportedAt: new Date().toISOString(), regulation: "DPDP Rules 2025", userProfile: sanitizeUser(user) }, message: "📦 DPDP JSON Data Export generated!" };
        }
        user.dpdpConsent.allowSharedPhCityMonthMemory = !user.dpdpConsent.allowSharedPhCityMonthMemory;
        saveDb();
        return { user: sanitizeUser(user), message: "🔒 DPDP Itemized Consent Ledger updated." };
      }

      if (pathname === "/api/admin/reset") {
        dbState = createFreshState();
        saveDb();
        return { message: "Database reset to fresh seed state." };
      }

      return { ok: true };
    }
  };
})();
`;

fs.writeFileSync(path.join(__dirname, "public", "localApiFallback.js"), fallbackSource, "utf8");
for (const file of ["index.html", "styles.css", "app.js", "localApiFallback.js"]) {
  fs.copyFileSync(path.join(__dirname, "public", file), path.join(__dirname, file));
}
console.log("Generated public/localApiFallback.js and synced root static files for GitHub Pages");
