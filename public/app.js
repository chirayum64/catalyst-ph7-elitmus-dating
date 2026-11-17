/**
 * Catalyst (pH7) by eLitmus — Frontend Application Controller
 * Fuses:
 * 1. Weekly Curated Small-Group Table Drops (4-6 Relocated Grads, ₹0-₹300 Budget Caps, UPI Seat Fee)
 * 2. Playable 2-Player Asymmetric "Duet Puzzle" (Real-time reasoning warm-up)
 * 3. Judge Mode "Time Machine" (Fast-forward Sunday Drop -> Duet -> Check-In -> Spark Reveal -> Chat)
 * 4. Morning-After Private "Spark Reveal" + Explainable 5-Axis pH Equilibrium Radar
 * 5. Live Chat Scam Shield (Auto-blocks UPI IDs, links, phone numbers) + Safe-Date Co-Pilot ("I Need Out")
 * 6. 4-Rung Trust Ladder + Coworker Domain Firewall + DPDP Rules (Nov 2025 / May 2027) Consent Ledger
 */

(function () {
  const state = {
    activeTab: "tables",
    timeMachineStage: 1, // 1=Sunday Drop, 2=Duet Warm-Up, 3=Venue Check-In, 4=Morning Spark, 5=Mutual Chat
    currentUserId: "usr_aarav",
    currentUser: null,
    bootstrap: null,
    discoverData: null,
    conversationsData: null,
    selectedConversationId: null,
    duetSelectedOption: "seat_2",
    duetSolvedResult: null,
    whatIfVector: {
      intellectualCuriosity: 92,
      careerAmbitionTempo: 85,
      financialThermostat: 88,
      socialBattery: 70,
      conflictDirectness: 80
    },
    revenueSim: {
      alumniBase: 1000000,
      activationPct: 8.5, // 85,000 verified alumni
      tablesPerUserMonthly: 1.4,
      avgSeatFeeRs: 99, // ₹99 UPI outcome-aligned seat fee
      partnerCafesCount: 120,
      cafeMonthlyFeeRs: 12000, // Off-peak footfall B2B partnership
      corporateSocialsMonthly: 35, // Sold to eLitmus's 650+ corporate clients
      corporatePackRs: 45000
    }
  };

  function renderPortraitSvg(user) {
    const seed = (user.photoSvgSeed || user.name || "user").toLowerCase();
    const palettes = {
      aarav: ["#312e81", "#6366f1", "#38bdf8", "#f8fafc"],
      ananya: ["#831843", "#ec4899", "#f43f5e", "#fde047"],
      meera: ["#4c1d95", "#8b5cf6", "#c084fc", "#f9a8d4"],
      kavya: ["#134e4a", "#14b8a6", "#2dd4bf", "#fef08a"],
      diya: ["#78350f", "#f59e0b", "#fb7185", "#fef3c7"],
      shreya: ["#881337", "#f43f5e", "#fb923c", "#fde68a"],
      rohan: ["#0c4a6e", "#0ea5e9", "#6366f1", "#e0f2fe"],
      vikram: ["#064e3b", "#10b981", "#34d399", "#d1fae5"]
    };
    const [bg1, bg2, accent, highlight] = palettes[seed] || [
      "#1e1b4b",
      "#6366f1",
      "#ec4899",
      "#ffffff"
    ];
    const initials = (user.name || "U")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

    return `
      <svg class="portrait-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad_${user.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg1}" />
            <stop offset="60%" stop-color="${bg2}" />
            <stop offset="100%" stop-color="${accent}" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" fill="url(#grad_${user.id})" />
        <circle cx="95" cy="25" r="28" fill="${highlight}" opacity="0.16" />
        <circle cx="20" cy="100" r="36" fill="${accent}" opacity="0.25" />
        <circle cx="60" cy="46" r="20" fill="rgba(255,255,255,0.88)" />
        <path d="M26 112 C26 82, 94 82, 94 112 Z" fill="rgba(255,255,255,0.82)" />
        <text x="60" y="52" text-anchor="middle" fill="${bg1}" font-size="14" font-weight="800" font-family="Inter, sans-serif">${initials}</text>
      </svg>
    `;
  }

  function renderRadarSvg(vecA, vecB, nameA, nameB) {
    const keys = [
      { key: "intellectualCuriosity", label: "Intellectual" },
      { key: "financialThermostat", label: "Budget/Finance" },
      { key: "careerAmbitionTempo", label: "Ambition" },
      { key: "conflictDirectness", label: "Directness" },
      { key: "socialBattery", label: "Social Battery" }
    ];
    const cx = 150;
    const cy = 140;
    const maxR = 92;

    function pointFor(idx, val) {
      const angle = (Math.PI * 2 * idx) / keys.length - Math.PI / 2;
      const r = (Math.max(20, Math.min(100, val)) / 100) * maxR;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }

    const rings = [0.35, 0.68, 1.0].map((scale) => {
      const pts = keys
        .map((_, idx) => {
          const angle = (Math.PI * 2 * idx) / keys.length - Math.PI / 2;
          const x = cx + maxR * scale * Math.cos(angle);
          const y = cy + maxR * scale * Math.sin(angle);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
      return `<polygon points="${pts}" fill="none" stroke="rgba(148,163,184,0.22)" stroke-width="1" />`;
    });

    const axesLines = keys
      .map((item, idx) => {
        const angle = (Math.PI * 2 * idx) / keys.length - Math.PI / 2;
        const x2 = cx + maxR * Math.cos(angle);
        const y2 = cy + maxR * Math.sin(angle);
        const lx = cx + (maxR + 28) * Math.cos(angle);
        const ly = cy + (maxR + 20) * Math.sin(angle);
        return `
          <line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(148,163,184,0.25)" />
          <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">${item.label}</text>
        `;
      })
      .join("");

    const polyA = keys.map((k, idx) => pointFor(idx, vecA[k.key] || 80)).join(" ");
    const polyB = keys.map((k, idx) => pointFor(idx, vecB[k.key] || 80)).join(" ");

    return `
      <svg viewBox="0 0 300 285" width="100%" height="260" style="overflow: visible;">
        ${rings.join("")}
        ${axesLines}
        <polygon points="${polyA}" fill="rgba(99, 102, 241, 0.32)" stroke="#818cf8" stroke-width="2.5" />
        <polygon points="${polyB}" fill="rgba(16, 185, 129, 0.28)" stroke="#34d399" stroke-width="2.5" />
      </svg>
      <div style="display:flex; justify-content:center; gap:18px; font-size:0.78rem; margin-top:4px;">
        <span><strong style="color:#818cf8;">●</strong> ${nameA}</span>
        <span><strong style="color:#34d399;">●</strong> ${nameB}</span>
      </div>
    `;
  }

  function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  async function apiFetch(path, options = {}) {
    const res = await fetch(path, {
      headers: { "Content-Type": "application/json" },
      ...options
    });
    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.error || "API Error");
      err.code = data.code;
      err.payload = data;
      throw err;
    }
    return data;
  }

  async function loadAllState() {
    try {
      const [bootstrap, discoverData, conversationsData] = await Promise.all([
        apiFetch("/api/bootstrap"),
        apiFetch(`/api/discover?userId=${encodeURIComponent(state.currentUserId)}`),
        apiFetch(`/api/conversations?userId=${encodeURIComponent(state.currentUserId)}`)
      ]);

      state.bootstrap = bootstrap;
      state.discoverData = discoverData;
      state.currentUser = discoverData.currentUser;
      state.conversationsData = conversationsData;

      if (
        !state.selectedConversationId &&
        conversationsData.conversations &&
        conversationsData.conversations.length > 0
      ) {
        state.selectedConversationId = conversationsData.conversations[0].id;
      }

      renderTopBars();
      renderMainWorkspace();
    } catch (err) {
      showToast(`⚠️ Error loading state: ${err.message}`);
    }
  }

  function renderTopBars() {
    const pillsEl = document.getElementById("personaPillsContainer");
    if (pillsEl && state.bootstrap) {
      const featuredIds = ["usr_aarav", "usr_ananya", "usr_meera", "usr_rohan"];
      const accounts = state.bootstrap.demoAccounts.filter(
        (a) => featuredIds.includes(a.id) || a.id === state.currentUserId
      );

      pillsEl.innerHTML = accounts
        .map((acc) => {
          const isActive = acc.id === state.currentUserId;
          return `
            <button class="persona-pill ${isActive ? "active" : ""}" onclick="window.ph7App.switchPersona('${acc.id}')">
              ${acc.name.split(" ")[0]} ('${String(acc.batchYear).slice(-2)} • ${acc.company})
            </button>
          `;
        })
        .join("");
    }

    const u = state.currentUser;
    const stripEl = document.getElementById("userTelemetryStrip");
    if (u && stripEl && state.discoverData) {
      const cloaked = state.discoverData.privacyFirewall.cloakedCount;
      const slotsUsed = state.discoverData.activeSlotsUsed;
      const rung = u.trustLadder ? u.trustLadder.level : 4;
      stripEl.innerHTML = `
        <div class="telemetry-pill" title="Verified eLitmus Graduate">
          💍 <span>Trust Ring: <strong style="color:#34d399;">Rung ${rung}/4 Vouched</strong> (${u.elitmusPhId})</span>
        </div>
        <div class="telemetry-pill" title="Relocated Migrant Cohort Context">
          📍 <span><strong>${u.hometown || "Jaipur"} → ${u.city}</strong> ('${String(u.batchYear).slice(-2)} Batch)</span>
        </div>
        <div class="telemetry-pill" title="Reliability & Show-Up Rate">
          ✅ <span>Show-Up: <strong style="color:#34d399;">${u.reliabilityStats ? u.reliabilityStats.showUpRatePct : 100}%</strong> • Karma: <strong>${u.karmaScore}</strong></span>
        </div>
        <div class="telemetry-pill" title="Focused Chemistry Cap">
          🧪 <span>Active Chats: <strong>${slotsUsed}/3</strong></span>
        </div>
      `;

      const badgeSlots = document.getElementById("badgeSlots");
      if (badgeSlots) badgeSlots.textContent = `${slotsUsed}/3 Slots`;

      const badgeCloaked = document.getElementById("badgeCloaked");
      if (badgeCloaked) badgeCloaked.textContent = `Rung ${rung}/4 • ${cloaked} Cloaked`;
    }
  }

  function renderJudgeTimeMachineStrip() {
    const steps = [
      { stage: 1, tab: "tables", label: "1. Sunday Drop (3 Tables)" },
      { stage: 2, tab: "tables", label: "2. 3-Min Duet Puzzle" },
      { stage: 3, tab: "tables", label: "3. Venue Check-In & Co-Pilot" },
      { stage: 4, tab: "discover", label: "4. Morning-After Spark Reveal" },
      { stage: 5, tab: "chemistry", label: "5. Mutual Chat + Scam Shield" }
    ];

    return `
      <div style="background:rgba(30,27,75,0.65); border:1px solid rgba(99,102,241,0.35); border-radius:14px; padding:10px 16px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        <div style="font-size:0.8rem; font-weight:700; color:#c7d2fe;">
          ⏱️ JUDGE MODE "TIME MACHINE" (Fast-Forward Weekly Lifecycle):
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${steps
            .map(
              (s) => `
              <button class="persona-pill ${state.timeMachineStage === s.stage ? "active" : ""}"
                onclick="window.ph7App.jumpTimeMachine(${s.stage}, '${s.tab}')">
                ${s.label}
              </button>
            `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderMainWorkspace() {
    const container = document.getElementById("appMainWorkspace");
    if (!container || !state.currentUser) return;

    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === state.activeTab);
    });

    const timeMachineHtml = renderJudgeTimeMachineStrip();

    if (state.activeTab === "tables") {
      container.innerHTML = timeMachineHtml + renderTablesAndDuetTab();
    } else if (state.activeTab === "discover") {
      container.innerHTML = timeMachineHtml + renderDiscoverTab();
    } else if (state.activeTab === "chemistry") {
      container.innerHTML = timeMachineHtml + renderChemistryTab();
    } else if (state.activeTab === "dilemmas") {
      container.innerHTML = timeMachineHtml + renderDilemmasTab();
    } else if (state.activeTab === "passport") {
      container.innerHTML = timeMachineHtml + renderPassportTab();
    } else if (state.activeTab === "founder") {
      container.innerHTML = timeMachineHtml + renderFounderTab();
    }
  }

  /* ==========================================================================
     TAB 1: SUNDAY WEEKLY DROP (3 CURATED TABLES) + ASYMMETRIC DUET PUZZLE + CO-PILOT
     ========================================================================== */
  function renderTablesAndDuetTab() {
    const tables = (state.bootstrap && state.bootstrap.tables) || [];
    const puzzles = (state.bootstrap && state.bootstrap.duetPuzzles) || [];
    const puzzle = puzzles[0];
    const u = state.currentUser;

    const tablesHtml = tables
      .map((tbl) => {
        const isConfirmed = u.confirmedTableId === tbl.id;
        return `
          <div class="candidate-card" style="border-color:${isConfirmed ? "var(--accent-emerald)" : "var(--border-subtle)"};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
              <div>
                <span class="trust-chip ${isConfirmed ? "emerald" : ""}">${
          isConfirmed ? "✓ Your Confirmed Sunday Table" : "Weekly Sunday Drop Option"
        }</span>
                <h3 style="margin-top:6px; font-size:1.1rem;">${tbl.title}</h3>
              </div>
              <span class="ph-score-badge">₹${tbl.seatFeeRs} UPI Seat</span>
            </div>

            <div style="font-size:0.83rem; color:var(--text-secondary);">
              📍 <strong>${tbl.area} (${tbl.city})</strong><br/>
              🗓️ <strong>${tbl.dayTime}</strong> • 💰 Budget Cap: <strong style="color:#6ee7b7;">${tbl.budgetCap}</strong>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              <span class="trust-chip">🎯 Intent: ${tbl.intentFilter}</span>
              <span class="trust-chip">🥗 ${tbl.dietaryFriendly}</span>
              <span class="trust-chip amber">🗣️ ${tbl.languages}</span>
            </div>

            <div style="background:rgba(15,23,42,0.75); border:1px solid var(--border-subtle); border-radius:12px; padding:12px; font-size:0.8rem;">
              <div style="font-weight:700; color:#a5b4fc; margin-bottom:6px;">
                👥 Verified Relocated Alumni at This Table (${tbl.status}):
              </div>
              ${tbl.seats
                .map(
                  (s) => `
                  <div style="margin-bottom:6px; padding-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.06);">
                    <strong>${s.name}</strong> (${s.batch} • ${s.role} • Rung ${s.trustRung}/4) — <span style="color:#cbd5e1;">${s.hometown}</span>
                    <div style="font-size:0.74rem; color:#6ee7b7; margin-top:2px;">✨ Shared Memory: ${s.sharedMemory}</div>
                  </div>
                `
                )
                .join("")}
            </div>

            <div style="font-size:0.76rem; color:var(--text-muted);">
              🛡️ <strong>Outcome-Aligned Pricing:</strong> ₹${tbl.seatFeeRs} UPI seat fee is 100% auto-refunded if cancelled or under-filled (&lt;4 people).
            </div>

            <div class="card-actions">
              ${
                isConfirmed
                  ? `
                  <button class="btn btn-emerald" onclick="window.ph7App.showVenueCheckInModal('${tbl.id}')">
                    📍 Venue Check-In (${tbl.checkInCode}) & Safe-Date Co-Pilot
                  </button>
                `
                  : `
                  <button class="btn btn-primary" onclick="window.ph7App.openUpiConfirmModal('${tbl.id}')">
                    ⚡ Confirm Seat via UPI (₹${tbl.seatFeeRs})
                  </button>
                `
              }
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="philosophy-banner">
        <div>
          <h2>☕ The Sunday Drop: 3 Curated Tables • ₹0–₹300 Budget Caps • Zero Browsing</h2>
          <p>
            <strong>Why we killed the swipe feed:</strong> 78% of users suffer dating-app burnout (156 hrs/year for 6 connections).
            Every Sunday, Catalyst drops <strong>3 small-group tables (4–6 verified eLitmus grads)</strong> matched by intent (${u.intent}), language, and budget cap.
            Chat stays locked until you meet in public and mutually pick each other the next morning!
          </p>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-rose btn-sm" onclick="window.ph7App.triggerSafeDateSos()">
            🚨 Safe-Date Co-Pilot: Discreet "I Need Out" SOS
          </button>
        </div>
      </div>

      <!-- Weekly Drop 3 Tables Grid -->
      <div class="candidates-grid" style="margin-bottom: 28px;">
        ${tablesHtml}
      </div>

      <!-- Signature Wow Feature: Asymmetric 2-Player Duet Puzzle -->
      <div class="panel-card" style="border-color: rgba(99, 102, 241, 0.55); background: linear-gradient(135deg, rgba(30, 27, 75, 0.82), rgba(15, 23, 42, 0.95));">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span class="ph-score-badge">✨ SIGNATURE WOW FEATURE • PRE-TABLE WARM-UP</span>
            <h3 style="margin-top:8px; font-size:1.22rem;">🧩 ${puzzle.title}</h3>
          </div>
          <span class="trust-chip emerald">Co-Player: Ananya Iyer (2021 Batch • Table #14)</span>
        </div>

        <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:16px;">
          ${puzzle.description} <em>(Impossible to fake with bots or AI text generators—tests how you two actually reason and communicate!)</em>
        </p>

        <div class="section-grid-2" style="margin-bottom:16px;">
          <div style="background:rgba(15,23,42,0.85); border:1px solid rgba(99,102,241,0.4); border-radius:14px; padding:16px;">
            <div style="font-size:0.78rem; font-weight:700; color:#818cf8; text-transform:uppercase; margin-bottom:8px;">
              🔒 Your Screen (Clue Half A — Only You See This)
            </div>
            <ul style="padding-left:18px; font-size:0.84rem; color:#e2e8f0; display:flex; flex-direction:column; gap:6px;">
              ${puzzle.yourClues.map((c) => `<li>${c}</li>`).join("")}
            </ul>
          </div>

          <div style="background:rgba(15,23,42,0.85); border:1px solid rgba(16,185,129,0.4); border-radius:14px; padding:16px;">
            <div style="font-size:0.78rem; font-weight:700; color:#34d399; text-transform:uppercase; margin-bottom:8px;">
              💬 Ananya's Live Clue Relay (Clue Half B)
            </div>
            <ul style="padding-left:18px; font-size:0.84rem; color:#d1fae5; display:flex; flex-direction:column; gap:6px;">
              ${puzzle.partnerClues.map((c) => `<li>${c}</li>`).join("")}
            </ul>
            <div style="margin-top:10px; font-size:0.8rem; color:#a7f3d0; font-style:italic;">
              Ananya says: "Hey ${u.name.split(" ")[0]}! On my screen the Founder is in Seat 4 and Researcher is in Seat 1. What do your clues say about the Designer and Architect?"
            </div>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; background:rgba(9,11,18,0.7); padding:14px 18px; border-radius:12px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <strong style="font-size:0.86rem;">Which seat is the Architect sitting in?</strong>
            <select id="duetAnswerSelect" class="form-select" style="width:auto; min-width:240px;">
              ${puzzle.options
                .map(
                  (opt) =>
                    `<option value="${opt.id}" ${
                      opt.id === state.duetSelectedOption ? "selected" : ""
                    }>${opt.label}</option>`
                )
                .join("")}
            </select>
          </div>
          <button class="btn btn-primary" style="flex:0 0 auto;" onclick="window.ph7App.submitDuetPuzzle('${puzzle.id}')">
            ⚡ Submit Co-Op Solution & Generate Duet Note
          </button>
        </div>

        ${
          state.duetSolvedResult
            ? `
            <div style="margin-top:14px; padding:14px 18px; border-radius:12px; background:rgba(16,185,129,0.14); border:1px solid rgba(16,185,129,0.45); font-size:0.85rem; color:#ecfdf5;">
              <strong>${state.duetSolvedResult.duetNote || state.duetSolvedResult.explanation}</strong>
            </div>
          `
            : ""
        }
      </div>
    `;
  }

  /* ==========================================================================
     TAB 2: MORNING-AFTER SPARK REVEAL & 5-AXIS WAVELENGTH FEED
     ========================================================================== */
  function renderDiscoverTab() {
    const { matches, privacyFirewall } = state.discoverData;
    const u = state.currentUser;
    const mySparkPicks = new Set(u.sparkPicks || []);

    const cardsHtml = matches
      .map((item) => {
        const { candidate, equilibrium, revealStage, conversationId, conversationStatus } = item;
        const isMutualSpark = mySparkPicks.has(candidate.id) && (conversationId || candidate.id === "usr_ananya" || candidate.id === "usr_meera");
        const stageLabels = {
          1: "Pre-Meetup • 65% Blur",
          2: "Table Met • Half-Reveal",
          3: "Mutual Spark • 100% Unblurred"
        };

        const topAxes = equilibrium.axisBreakdown.slice(0, 4);

        let primaryActionBtn = "";
        if (conversationId && conversationStatus === "active") {
          primaryActionBtn = `
            <button class="btn btn-emerald" style="flex:1;" onclick="window.ph7App.openConversation('${conversationId}')">
              💬 Open Mutual Spark Chat
            </button>
          `;
        } else {
          primaryActionBtn = `
            <button class="btn btn-primary" onclick="window.ph7App.submitMorningSparkPick('${candidate.id}')">
              ✨ Morning-After Spark Pick (Private)
            </button>
          `;
        }

        return `
          <div class="candidate-card">
            <div class="candidate-top">
              <div class="portrait-wrapper portrait-stage-${revealStage}" title="${stageLabels[revealStage]}">
                ${renderPortraitSvg(candidate)}
                <div class="reveal-pill">${stageLabels[revealStage]}</div>
              </div>
              <div class="candidate-meta">
                <div class="candidate-name-row">
                  <span class="candidate-name">${candidate.name}, ${candidate.age}</span>
                  <span class="ph-score-badge">pH ${equilibrium.phValue} • ${equilibrium.overallScore}%</span>
                </div>
                <div class="candidate-role">
                  ${candidate.role} @ <strong>${candidate.company}</strong> • ${candidate.hometown || "Metro"} → ${candidate.city}
                </div>
                <div class="trust-badges-row">
                  <span class="trust-chip emerald">💍 Rung ${candidate.trustLadder ? candidate.trustLadder.level : 4}/4 Verified</span>
                  <span class="trust-chip">✅ ${candidate.reliabilityStats ? candidate.reliabilityStats.showUpRatePct : 100}% Show-Up</span>
                  <span class="trust-chip amber">🎯 ${candidate.intent || "Intentional"}</span>
                </div>
              </div>
            </div>

            <div style="font-size:0.8rem; background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.3); padding:8px 12px; border-radius:10px; color:#c7d2fe;">
              🎓 <strong>Shared eLitmus Memory (No Score Ranking):</strong> ${candidate.phTestMemory || "Wrote eLitmus pH Test in 2021-22 & relocated for tech role"}
            </div>

            <div class="mind-prompt-box">
              <div class="mind-prompt-label">
                <span>🎙️ Voice & Mind Wavelength Note</span>
                <button class="voice-play-btn" onclick="window.ph7App.playVoicePrompt('${candidate.name.replace(/'/g, "")}', '${candidate.voiceNoteTranscript.replace(/'/g, "\\'")}')">
                  🔊 Play Audio Note
                </button>
              </div>
              <div style="color: #e2e8f0; font-style: italic;">"${candidate.voiceNoteTranscript}"</div>
            </div>

            <div class="axis-mini-grid">
              ${topAxes
                .map(
                  (ax) => `
                <div class="axis-mini-item">
                  <div class="axis-mini-header">
                    <span>${ax.label}</span>
                    <strong>${ax.compatibilityScore}%</strong>
                  </div>
                  <div class="axis-bar-track">
                    <div class="axis-bar-fill" style="width: ${ax.compatibilityScore}%;"></div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>

            <div class="synergy-callout">
              <strong>⚡ 5-Axis Synergy (${equilibrium.exactDilemmaMatches}/5 Dilemmas Aligned):</strong>
              ${equilibrium.synergySuperpower}
            </div>

            <div class="card-actions">
              <button class="btn btn-secondary" onclick="window.ph7App.openEquilibriumModal('${candidate.id}')">
                📊 5-Axis Radar
              </button>
              ${primaryActionBtn}
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="philosophy-banner">
        <div>
          <h2>✨ Morning-After "Spark Reveal" & 5-Axis Cohort Compatibility</h2>
          <p>
            The morning after your Sunday Table, you privately select up to <strong>2 tablemates</strong> you'd love to see again.
            <strong>A mutual pick unlocks 1:1 Chat + a ₹150–₹220 suggested 1:1 plan.</strong> A non-mutual pick reveals nothing—so there is never a rejection notice!
          </p>
        </div>
        <div class="firewall-notice">
          🛡️ <div>
            <strong>Employer Firewall Active (${u.company})</strong><br/>
            <span>${privacyFirewall.cloakedCount} coworker profile(s) automatically cloaked</span>
          </div>
        </div>
      </div>

      <div class="candidates-grid">
        ${cardsHtml}
      </div>
    `;
  }

  /* ==========================================================================
     TAB 3: SPARK CHAT, LIVE SCAM SHIELD & FOCUSED 3-SLOT CAP
     ========================================================================== */
  function renderChemistryTab() {
    const convs = (state.conversationsData && state.conversationsData.conversations) || [];
    const activeConvs = convs.filter((c) => c.status === "active");
    const closedConvs = convs.filter((c) => c.status !== "active");

    let selectedConv =
      convs.find((c) => c.id === state.selectedConversationId) || activeConvs[0] || convs[0] || null;

    const slotsHtml = [0, 1, 2]
      .map((slotIdx) => {
        const conv = activeConvs[slotIdx];
        if (!conv) {
          return `
            <div class="slot-empty">
              <div>🧪 <strong>Focused Slot #${slotIdx + 1} Open</strong></div>
              <div style="margin-top:4px;">Unlock via a Mutual Table Spark to assign this slot.</div>
            </div>
          `;
        }
        const isSel = selectedConv && selectedConv.id === conv.id;
        const p = conv.partner || { name: "Match", role: "", company: "" };
        return `
          <div class="slot-card ${isSel ? "active" : ""}" onclick="window.ph7App.selectConversation('${conv.id}')">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong>Slot #${slotIdx + 1}: ${p.name}</strong>
              <span class="trust-chip emerald">Mutual Spark</span>
            </div>
            <div style="font-size:0.76rem; color:var(--text-secondary); margin-top:3px;">
              ${p.role} @ ${p.company} • <strong>${conv.equilibriumScore}% pH Sync</strong>
            </div>
            ${
              conv.safeDateBooking
                ? `<div style="margin-top:6px; font-size:0.72rem; color:#6ee7b7;">🥂 Safe-Date Co-Pilot: ${conv.safeDateBooking.passCode}</div>`
                : ""
            }
          </div>
        `;
      })
      .join("");

    let chatPanelHtml = "";
    if (!selectedConv) {
      chatPanelHtml = `
        <div class="chat-panel" style="align-items:center; justify-content:center; padding:40px; text-align:center;">
          <h3>No Active Mutual Spark Chat Selected</h3>
          <p style="color:var(--text-secondary); max-width:420px; margin:10px 0 20px;">
            Pick a mutual Spark in Tab 2 to unlock 1:1 chat!
          </p>
        </div>
      `;
    } else {
      const p = selectedConv.partner || { name: "Match", role: "", company: "", city: "Bengaluru" };
      const isClosed = selectedConv.status !== "active";

      const messagesHtml = (selectedConv.messages || [])
        .map((m) => {
          if (m.senderId === "system") {
            const isScamBlock = m.type === "scam_shield_blocked";
            return `<div class="msg-bubble msg-system" style="${
              isScamBlock
                ? "background:rgba(244,63,94,0.18); border-color:rgba(244,63,94,0.5); color:#fecdd3;"
                : ""
            }">${m.text}</div>`;
          }
          const isMine = m.senderId === state.currentUserId;
          return `
            <div class="msg-bubble ${isMine ? "msg-mine" : "msg-theirs"}">
              ${
                m.icebreakerTitle
                  ? `<div style="font-size:0.7rem; text-transform:uppercase; letter-spacing:0.04em; opacity:0.85; margin-bottom:4px;">🎲 Shared-Memory Icebreaker: ${m.icebreakerTitle}</div>`
                  : ""
              }
              <div>${m.text}</div>
            </div>
          `;
        })
        .join("");

      const safeDateBanner = selectedConv.safeDateBooking
        ? `
          <div style="background:rgba(16,185,129,0.14); border-bottom:1px solid rgba(16,185,129,0.35); padding:10px 22px; font-size:0.79rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              🥂 <strong>1:1 Safe-Date Plan (${selectedConv.safeDateBooking.passCode}):</strong>
              ${selectedConv.safeDateBooking.venueName} • ${selectedConv.safeDateBooking.dateTime}<br/>
              🛰️ <strong>Safe-Date Co-Pilot:</strong> Shared with ${selectedConv.safeDateBooking.trustedContact || "Trusted Contact"}
            </div>
            <button class="btn btn-rose btn-sm" onclick="window.ph7App.triggerSafeDateSos()">
              🚨 Discreet "I Need Out" Alert
            </button>
          </div>
        `
        : "";

      chatPanelHtml = `
        <div class="chat-panel">
          <div class="chat-header">
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="portrait-wrapper portrait-stage-${selectedConv.stage}" style="width:52px; height:52px; border-radius:14px;">
                ${renderPortraitSvg(p)}
              </div>
              <div>
                <div style="font-weight:700; font-size:1.05rem;">
                  ${p.name} <span class="trust-chip emerald">💍 Rung ${p.trustLadder ? p.trustLadder.level : 4}/4 Verified</span>
                </div>
                <div style="font-size:0.76rem; color:var(--text-secondary);">
                  ${selectedConv.origin || "Unlocked after Sunday Table"} • Show-Up Rate: 100%
                </div>
              </div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-secondary btn-sm" onclick="window.ph7App.testScamShield('${selectedConv.id}')">
                🛡️ Test Scam Shield (Simulate UPI Scam)
              </button>
              ${
                !isClosed
                  ? `
                <button class="btn btn-emerald btn-sm" onclick="window.ph7App.openSafeDateModal('${selectedConv.id}')">
                  🥂 Plan ₹190 1:1 Date + Co-Pilot
                </button>
                <button class="btn btn-rose btn-sm" onclick="window.ph7App.openGracefulCloseModal('${selectedConv.id}')">
                  🕊️ "Kind No" Closure (+2 Karma)
                </button>
              `
                  : `<span class="trust-chip amber">Closed Gracefully</span>`
              }
            </div>
          </div>

          ${safeDateBanner}

          <div class="chat-messages" id="chatMessagesScroll">
            ${messagesHtml}
          </div>

          ${
            !isClosed
              ? `
            <div class="chat-toolbar">
              <span style="font-size:0.75rem; color:var(--text-muted); align-self:center;">🎲 Shared-Memory Icebreakers:</span>
              ${(state.bootstrap.icebreakers || [])
                .map(
                  (ice) => `
                  <button class="btn btn-secondary btn-sm" onclick="window.ph7App.sendIcebreaker('${selectedConv.id}', '${ice.id}')">
                    ${ice.title}
                  </button>
                `
                )
                .join("")}
            </div>
            <form class="chat-input-bar" onsubmit="event.preventDefault(); window.ph7App.sendChatMessage('${selectedConv.id}');">
              <input type="text" id="chatMessageInput" class="chat-input" placeholder="Write a message (Try typing a UPI ID like scammer@okaxis or a phone number to see Scam Shield block it!)..." required />
              <button type="submit" class="btn btn-primary" style="flex:0 0 auto;">Send ⚡</button>
            </form>
          `
              : ""
          }
        </div>
      `;
    }

    return `
      <div class="philosophy-banner">
        <div>
          <h2>💬 Mutual Spark Chat + McAfee 2026 Live Scam Shield + "Kind No" Closures</h2>
          <p>
            Chat opens <strong>only after you've met at a table (or synced dilemmas)</strong>. Our <strong>Live Scam Shield</strong> automatically blocks links, phone numbers, QR requests, and UPI IDs in early chat. Plans expire in 48h and <strong>"Kind No" templates</strong> replace ghosting.
          </p>
        </div>
      </div>

      <div class="chemistry-layout">
        <div class="slots-sidebar">
          <h3 style="font-size:0.95rem;">🧪 Focused Chemistry Slots (${activeConvs.length}/3 Max)</h3>
          ${slotsHtml}

          ${
            closedConvs.length > 0
              ? `
            <h4 style="font-size:0.8rem; color:var(--text-muted); margin-top:10px; text-transform:uppercase;">🕊️ "Kind No" Closed Archive</h4>
            ${closedConvs
              .map(
                (c) => `
              <div class="slot-card" style="opacity:0.7;" onclick="window.ph7App.selectConversation('${c.id}')">
                <div style="font-size:0.82rem; font-weight:600;">${c.partner ? c.partner.name : "Match"}</div>
                <div style="font-size:0.72rem; color:#6ee7b7;">✓ Closed with Kind No (+2 Karma)</div>
              </div>
            `
              )
              .join("")}
          `
              : ""
          }
        </div>

        ${chatPanelHtml}
      </div>
    `;
  }

  /* ==========================================================================
     TAB 4: LIFE-ARCHITECTURE LAB (5 MICRO-CASE DILEMMAS + WHAT-IF SIMULATOR)
     ========================================================================== */
  function renderDilemmasTab() {
    const dilemmas = state.bootstrap.dilemmas || [];
    const u = state.currentUser;
    const myAnswers = u.dilemmaAnswers || {};

    const dilemmaCards = dilemmas
      .map((d) => {
        const currentOptionId = myAnswers[d.id];
        return `
          <div class="panel-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span class="trust-chip">${d.category}</span>
              <span style="font-size:0.75rem; color:var(--text-muted);">Recalibrates 5-Axis Vector Live</span>
            </div>
            <h3>${d.title}</h3>
            <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:12px;">${d.scenario}</p>
            <div>
              ${d.options
                .map((opt) => {
                  const isSel = opt.id === currentOptionId;
                  return `
                    <div class="dilemma-option ${isSel ? "selected" : ""}" onclick="window.ph7App.selectDilemmaOption('${d.id}', '${opt.id}')">
                      <div>
                        <div style="font-weight:600; font-size:0.86rem; color:#fff;">${opt.label}</div>
                        <div style="font-size:0.74rem; color:var(--text-muted); margin-top:3px;">Signal: <strong style="color:#a5b4fc;">${opt.archetypeTag}</strong></div>
                      </div>
                      <span class="trust-chip ${isSel ? "emerald" : ""}">${isSel ? "✓ Active" : "Select"}</span>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;
      })
      .join("");

    const uVec = u.wavelengthVector;
    const simVec = state.whatIfVector;
    const simRadar = renderRadarSvg(
      uVec,
      simVec,
      `${u.name.split(" ")[0]} (You)`,
      "Hypothetical Partner"
    );

    return `
      <div class="philosophy-banner">
        <div>
          <h2>🧩 Life-Architecture Micro-Case Lab & What-If Simulator</h2>
          <p>
            No caste filters and no AI-written bios. We match on values, budget philosophy (₹150 coffee walk vs. splurge), career risk appetite, and migrant-in-the-metro life geometry.
          </p>
        </div>
      </div>

      <div class="section-grid-2" style="margin-bottom: 26px;">
        <div class="panel-card">
          <h3>🎛️ Interactive "What-If" Partner Compatibility Simulator</h3>
          ${[
            { key: "intellectualCuriosity", label: "Intellectual Wavelength" },
            { key: "financialThermostat", label: "Budget & Financial Thermostat" },
            { key: "careerAmbitionTempo", label: "Ambition & Career Tempo" },
            { key: "conflictDirectness", label: "Conflict Directness" },
            { key: "socialBattery", label: "Social Battery & Lifestyle" }
          ]
            .map(
              (ax) => `
              <div style="margin-bottom: 11px;">
                <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:3px;">
                  <span>${ax.label}</span>
                  <strong>Partner: ${simVec[ax.key]} vs You: ${uVec[ax.key]}</strong>
                </div>
                <input type="range" min="30" max="99" value="${simVec[ax.key]}" style="width:100%; accent-color:#6366f1;"
                  oninput="window.ph7App.updateWhatIfSlider('${ax.key}', this.value)" />
              </div>
            `
            )
            .join("")}
        </div>

        <div class="panel-card" style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <h3>📐 Live 5-Axis Polygon Overlap</h3>
          ${simRadar}
        </div>
      </div>

      <div class="section-grid-2">
        ${dilemmaCards}
      </div>
    `;
  }

  /* ==========================================================================
     TAB 5: 4-RUNG TRUST LADDER, DPDP (NOV 2025 RULES) LEDGER & COWORKER FIREWALL
     ========================================================================== */
  function renderPassportTab() {
    const u = state.currentUser;
    const fw = state.discoverData.privacyFirewall;
    const shield = u.coworkerShield || {};
    const ladder = u.trustLadder || { level: 4, vouchedBy: ["Ananya I.", "Rohan V."] };
    const dpdp = u.dpdpConsent || { allowSharedPhCityMonthMemory: true };

    return `
      <div class="philosophy-banner">
        <div>
          <h2>🛡️ 4-Rung Verification Trust Ladder, Coworker Firewall & DPDP Ledger</h2>
          <p>
            <strong>78% of Indian women on dating/matrimonial apps report meeting fake profiles.</strong>
            Catalyst uses eLitmus's unfair identity advantage (verified Class 10/12 & degree docs) to guarantee <em>"Every member is a verified real graduate"</em>—while strictly firewalling employer hiring data under the <strong>DPDP Rules (Notified 14 Nov 2025 / Effective 14 May 2027)</strong>.
          </p>
        </div>
      </div>

      <div class="section-grid-2">
        <!-- Left: 4-Rung Trust Ladder + DPDP Consent Ledger -->
        <div class="panel-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3>💍 4-Rung Verification Trust Ladder</h3>
            <span class="ph-score-badge">Trust Ring: Rung ${ladder.level}/4</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:18px;">
            <div style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); padding:10px 14px; border-radius:10px; font-size:0.82rem;">
              ✅ <strong>Rung 1 • Phone OTP & Device Integrity:</strong> Verified (+91-98XXXXXX21)
            </div>
            <div style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); padding:10px 14px; border-radius:10px; font-size:0.82rem;">
              ✅ <strong>Rung 2 • Strict 18+ DOB Gate & Selfie Liveness Check:</strong> Verified Adult (${u.age} yrs • Minors strictly blocked)
            </div>
            <div style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); padding:10px 14px; border-radius:10px; font-size:0.82rem;">
              ✅ <strong>Rung 3 • eLitmus Credential Link (${u.elitmusPhId}):</strong> Class 10/12 & ${u.college} Docs Verified
            </div>
            <div style="background:rgba(99,102,241,0.16); border:1px solid rgba(99,102,241,0.45); padding:10px 14px; border-radius:10px; font-size:0.82rem;">
              🌟 <strong>Rung 4 • In-Person Table Peer Vouches (${ladder.peerVouchesCount || 2} Vouches):</strong> Vouched by ${(ladder.vouchedBy || ["Ananya I.", "Rohan V."]).join(", ")}
            </div>
          </div>

          <h4 style="margin-bottom:8px; font-size:0.95rem;">📜 DPDP Rules (14 Nov 2025 / May 2027) Itemized Consent Ledger</h4>
          <p style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:10px;">
            Purpose Limitation Guarantee: eLitmus job data is never pulled without explicit opt-in. Withdrawal is as easy as giving consent, and breaches have a 72h Data Protection Board SLA.
          </p>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.dpdpAction('toggle_shared_memory')">
              ${dpdp.allowSharedPhCityMonthMemory ? "✓ Shared pH City/Month Icebreaker ON" : "Shared pH Memory OFF"} (Click to Toggle)
            </button>
            <button class="btn btn-emerald btn-sm" onclick="window.ph7App.dpdpAction('export')">
              📦 Export My Data (JSON Portability)
            </button>
          </div>
        </div>

        <!-- Right: Coworker & Batchmate Firewall -->
        <div class="panel-card">
          <h3>🕵️ Employer & Coworker Cloaking Firewall (POSH & Privacy)</h3>
          <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:16px;">
            Dating activity never reaches employers or the eLitmus hiring portal. Toggle <strong>Block Current Company (${u.companyDomain})</strong> below to see coworkers (like <em>Vikramaditya Rao @ Razorpay</em>) automatically cloak or uncloak:
          </p>

          <div class="dilemma-option ${shield.blockCurrentCompany ? "selected" : ""}" onclick="window.ph7App.toggleShieldSetting('blockCurrentCompany')">
            <div>
              <div style="font-weight:700; font-size:0.9rem;">🏢 Auto-Cloak Current Company Coworkers (${u.company})</div>
              <div style="font-size:0.78rem; color:var(--text-secondary);">Mutually hides your profile from anyone verified at <code>${u.companyDomain}</code>.</div>
            </div>
            <span class="trust-chip ${shield.blockCurrentCompany ? "emerald" : ""}">${shield.blockCurrentCompany ? "ON (Protected)" : "OFF"}</span>
          </div>

          <div class="dilemma-option ${shield.blockCollegeBatch ? "selected" : ""}" onclick="window.ph7App.toggleShieldSetting('blockCollegeBatch')">
            <div>
              <div style="font-weight:700; font-size:0.9rem;">🎓 Auto-Cloak Same College Batch (${u.college})</div>
              <div style="font-size:0.78rem; color:var(--text-secondary);">Hides your profile from classmates of the exact same graduating college & year.</div>
            </div>
            <span class="trust-chip ${shield.blockCollegeBatch ? "emerald" : ""}">${shield.blockCollegeBatch ? "ON (Protected)" : "OFF"}</span>
          </div>

          <div style="margin-top:16px;">
            <label style="font-size:0.8rem; color:var(--text-secondary); font-weight:600;">Custom Blocked Corporate Domains:</label>
            <div style="display:flex; gap:8px; margin-top:6px;">
              <input type="text" id="blockedDomainsInput" class="form-input" value="${(shield.blockedDomains || []).join(", ")}" />
              <button class="btn btn-secondary" onclick="window.ph7App.saveCustomBlockedDomains()">Update</button>
            </div>
          </div>

          <div style="margin-top:18px; padding:12px 14px; border-radius:12px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); font-size:0.82rem;">
            🛡️ <strong>Live Firewall Status:</strong> Cloaking <strong>${fw.cloakedCount}</strong> coworker profile(s).
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     TAB 6: FOUNDER'S PLAYBOOK (RESEARCH CITATIONS, WHAT WE KILLED, REVENUE SIMULATOR)
     ========================================================================== */
  function renderFounderTab() {
    const sim = state.revenueSim;
    const activeUsers = Math.round((sim.alumniBase * sim.activationPct) / 100);
    const monthlyPaidTableSeats = Math.round(activeUsers * sim.tablesPerUserMonthly * 0.45);
    const seatRevenueMonthlyRs = monthlyPaidTableSeats * sim.avgSeatFeeRs;
    const cafeB2bMonthlyRs = sim.partnerCafesCount * sim.cafeMonthlyFeeRs;
    const corpSocialsMonthlyRs = sim.corporateSocialsMonthly * sim.corporatePackRs;
    const totalMrrRs = seatRevenueMonthlyRs + cafeB2bMonthlyRs + corpSocialsMonthlyRs;
    const arrCrores = ((totalMrrRs * 12) / 10000000).toFixed(2);
    const pm = state.bootstrap.platformMetrics;

    return `
      <div class="philosophy-banner">
        <div>
          <h2>🚀 Startup Founder's Command Center — Research, Product Restraint & Unit Economics</h2>
          <p>
            <strong>Core Pitch:</strong> Dating apps profit from keeping you swiping. <strong>Catalyst (pH7)</strong> earns only when verified graduates actually meet, in a small group, in public, within a week.
          </p>
        </div>
        <div class="telemetry-pill">
          🧭 North-Star: <strong style="color:#34d399;">${pm.meetupsAttendedPer100Users} Meetups / 100 Users</strong> • Anti-Metric: <strong>${pm.avgTimeInAppMinutesWeekly}m/wk in App</strong>
        </div>
      </div>

      <!-- 1. Market Research & What We Refused to Build -->
      <div class="section-grid-2" style="margin-bottom: 22px;">
        <div class="panel-card">
          <h3>📊 Directional Market Research Driving Our Decisions</h3>
          <ul style="padding-left:18px; font-size:0.83rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:8px; margin-top:10px;">
            <li><strong>Burnout is the Market:</strong> 78% of users report dating-app fatigue; Gen Z spends ~156 hrs/year for ~6 connections. Tinder paying users fell 8% & Bumble's fell 16%, while outcome-focused apps grew 17% <em>(Desiblitz / Implicator)</em>.</li>
            <li><strong>Don't Lead with an AI Matchmaker:</strong> Gen Z is the cohort least impressed by AI matchmaking or AI-generated chat <em>(Implicator)</em>. Instead, we built the human-reasoning <strong>2-Player Duet Puzzle</strong>.</li>
            <li><strong>India's 3 Bottlenecks — Trust, Gender Ratio & Payments:</strong> 78% of Indian women on dating/matrimonial apps report fake profiles <em>(Feminism in India)</em>; 70–80% of users on standard apps are men who right-swipe 77% vs. 7% for women <em>(Outlook Business)</em>; credit-card adoption is low, pointing to <strong>UPI micro-payments (₹49–₹149) & B2B revenue</strong> <em>(Loestro)</em>.</li>
            <li><strong>Lonely Relocated Migrants (Ages 23–30):</strong> The 2020–2023 batches relocated to Bengaluru, Hyderabad, Pune, and Gurugram for tech jobs—driving demand for verified "unstrangering" tables <em>(Deccan Herald)</em>.</li>
          </ul>
        </div>

        <div class="panel-card">
          <h3>🚫 What We Explicitly Refused to Build (And Why)</h3>
          <ul style="padding-left:18px; font-size:0.83rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:8px; margin-top:10px;">
            <li>❌ <strong>No Swiping & No Infinite Browsing Feed:</strong> Eliminates choice overload, photo-bias, and the 156-hour/year scroll trap.</li>
            <li>❌ <strong>No Paid "Profile Boosts":</strong> Boosts exploit lonely men without improving outcomes. We charge only when a real offline table seat is confirmed.</li>
            <li>❌ <strong>No Caste Filter:</strong> Discriminatory, regressive, and risks app-store rejection. We filter on intent, language, city, diet, and values instead.</li>
            <li>❌ <strong>No AI-Written Icebreakers or Chatbots:</strong> Destroys authenticity and fuels romance scams <em>(McAfee 2026)</em>.</li>
            <li>❌ <strong>No pH-Score Leaderboard:</strong> Ranking human beings by test scores in dating is elitist and a privacy hazard. We use pH history strictly for verified identity and shared city/month memories.</li>
          </ul>
        </div>
      </div>

      <!-- 2. Interactive 3-Stream Outcome-Aligned Revenue Simulator -->
      <div class="section-grid-2">
        <div class="panel-card">
          <h3>💰 Outcome-Aligned UPI & B2B Revenue Simulator</h3>
          <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:12px;">
            Designed for Indian willingness-to-pay: UPI micro-tickets + B2B café off-peak footfall + Corporate "Welcome to the City" socials for eLitmus's 650+ enterprise clients:
          </p>

          <div style="margin-bottom:11px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>1M Alumni Activation Rate (%)</span>
              <strong>${sim.activationPct}% (${activeUsers.toLocaleString()} Verified Users)</strong>
            </div>
            <input type="range" min="2" max="20" step="0.5" value="${sim.activationPct}" style="width:100%; accent-color:#6366f1;"
              oninput="window.ph7App.updateRevSlider('activationPct', this.value)" />
          </div>

          <div style="margin-bottom:11px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>UPI Seat Fee per Confirmed Table (₹49–₹149)</span>
              <strong>₹${sim.avgSeatFeeRs} / seat (Auto-refund if cancelled)</strong>
            </div>
            <input type="range" min="49" max="149" step="10" value="${sim.avgSeatFeeRs}" style="width:100%; accent-color:#6366f1;"
              oninput="window.ph7App.updateRevSlider('avgSeatFeeRs', this.value)" />
          </div>

          <div style="margin-bottom:11px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>Partner Cafés Paying for Off-Peak Footfall</span>
              <strong>${sim.partnerCafesCount} Cafés × ₹${sim.cafeMonthlyFeeRs.toLocaleString()}/mo</strong>
            </div>
            <input type="range" min="20" max="300" step="10" value="${sim.partnerCafesCount}" style="width:100%; accent-color:#6366f1;"
              oninput="window.ph7App.updateRevSlider('partnerCafesCount', this.value)" />
          </div>

          <div style="margin-bottom:11px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>Corporate "Welcome to the City" New-Hire Socials (650+ Clients)</span>
              <strong>${sim.corporateSocialsMonthly} Events/mo × ₹45k</strong>
            </div>
            <input type="range" min="5" max="100" step="5" value="${sim.corporateSocialsMonthly}" style="width:100%; accent-color:#6366f1;"
              oninput="window.ph7App.updateRevSlider('corporateSocialsMonthly', this.value)" />
          </div>
        </div>

        <div class="panel-card">
          <h3>📈 Projected Financial Output (No Escrow / Payment-Aggregator Trap)</h3>
          <div class="kpi-grid">
            <div class="kpi-box" style="border-color: var(--accent-emerald);">
              <div class="kpi-lbl">Annual Run Rate (ARR)</div>
              <div class="kpi-val" style="color:#34d399;">₹${arrCrores} Cr</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">Outcome-Aligned + B2B</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-lbl">1. UPI Table Seat Fees</div>
              <div class="kpi-val">₹${(seatRevenueMonthlyRs / 100000).toFixed(2)} L/mo</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">${monthlyPaidTableSeats.toLocaleString()} seats × ₹${sim.avgSeatFeeRs}</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-lbl">2. Partner Café Footfall</div>
              <div class="kpi-val">₹${(cafeB2bMonthlyRs / 100000).toFixed(2)} L/mo</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">Guaranteed Sunday afternoon tables</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-lbl">3. Corporate New-Hire Socials</div>
              <div class="kpi-val">₹${(corpSocialsMonthlyRs / 100000).toFixed(2)} L/mo</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">Friends-mode for relocated hires</div>
            </div>
          </div>

          <div style="margin-top:16px; padding:12px; background:rgba(15,23,42,0.8); border-radius:12px; font-size:0.8rem; color:var(--text-secondary);">
            ⚖️ <strong>RBI Payment-Aggregator Compliance Note:</strong> Catalyst never holds user food/beverage deposits in its own wallet (which would trigger RBI Payment Aggregator licensing). Users pay only the ₹${sim.avgSeatFeeRs} platform seat fee via Razorpay UPI and pay cafés directly for their own ₹150 coffee.
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     MODALS & INTERACTIVE ACTIONS
     ========================================================================== */
  function closeModal() {
    const modal = document.getElementById("modalContainer");
    if (modal) {
      modal.style.display = "none";
      modal.innerHTML = "";
    }
  }

  function openTimeMachineTour() {
    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
        <div class="modal-content" style="max-width:640px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3>⏱️ Judge Mode "Time Machine" — 5-Minute Guided Tour</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕ Close</button>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:16px;">
            So you don't have to wait until Sunday or Monday morning to evaluate our full product lifecycle, use any button below to fast-forward through the 5 stages:
          </p>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div class="dilemma-option" onclick="window.ph7App.jumpTimeMachine(1, 'tables'); window.ph7App.closeModal();">
              <div>
                <strong>Stage 1 • Sunday Weekly Drop (3 Curated Tables, ₹0–₹300 Budget Caps)</strong>
                <div style="font-size:0.78rem; color:var(--text-secondary);">Confirm a seat via simulated Razorpay UPI (₹99) with auto-refund guarantee.</div>
              </div>
              <span class="trust-chip emerald">Go →</span>
            </div>
            <div class="dilemma-option" onclick="window.ph7App.jumpTimeMachine(2, 'tables'); window.ph7App.closeModal();">
              <div>
                <strong>Stage 2 • 3-Minute Asymmetric "Duet Puzzle" Warm-Up (The Wow Feature)</strong>
                <div style="font-size:0.78rem; color:var(--text-secondary);">Solve the 2-player Indiranagar Table Logic puzzle with Ananya where each player sees half the clues.</div>
              </div>
              <span class="trust-chip emerald">Go →</span>
            </div>
            <div class="dilemma-option" onclick="window.ph7App.jumpTimeMachine(3, 'tables'); window.ph7App.closeModal(); window.ph7App.showVenueCheckInModal('tbl_blr_filter_coffee');">
              <div>
                <strong>Stage 3 • Venue Code Check-In & Safe-Date Co-Pilot ("I Need Out" SOS)</strong>
                <div style="font-size:0.78rem; color:var(--text-secondary);">Check in at Cubbon Park / Airlines Lawn with code CAT-BLR-408 & test the discreet SOS button.</div>
              </div>
              <span class="trust-chip emerald">Go →</span>
            </div>
            <div class="dilemma-option" onclick="window.ph7App.jumpTimeMachine(4, 'discover'); window.ph7App.closeModal();">
              <div>
                <strong>Stage 4 • Morning-After Private "Spark Reveal" & 5-Axis Radar</strong>
                <div style="font-size:0.78rem; color:var(--text-secondary);">Privately pick up to 2 tablemates; mutual picks unlock 1:1 chat; non-mutual picks reveal nothing.</div>
              </div>
              <span class="trust-chip emerald">Go →</span>
            </div>
            <div class="dilemma-option" onclick="window.ph7App.jumpTimeMachine(5, 'chemistry'); window.ph7App.closeModal();">
              <div>
                <strong>Stage 5 • Unlocked 1:1 Chat + Live McAfee Scam Shield + "Kind No" Closure</strong>
                <div style="font-size:0.78rem; color:var(--text-secondary);">Test the Scam Shield blocking UPI IDs/phone numbers live, and test the Focused 3-Slot Cap.</div>
              </div>
              <span class="trust-chip emerald">Go →</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function openUpiConfirmModal(tableId) {
    const tbl = (state.bootstrap.tables || []).find((t) => t.id === tableId);
    if (!tbl) return;
    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
        <div class="modal-content" style="max-width:500px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3>⚡ Razorpay / UPI Test Mode — Confirm Table Seat</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
          </div>
          <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:14px;">
            <strong>${tbl.title}</strong><br/>
            📍 ${tbl.area} • ${tbl.dayTime}<br/>
            💰 Venue Budget Cap: <strong>${tbl.budgetCap}</strong> (Paid directly to venue; Catalyst holds zero F&B deposits)
          </p>
          <div style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); padding:12px; border-radius:10px; font-size:0.8rem; margin-bottom:14px;">
            🔒 <strong>Outcome-Aligned Seat Fee: ₹${tbl.seatFeeRs}</strong><br/>
            Automatically 100% refunded if the table is cancelled or under-filled (&lt;4 verified attendees).
          </div>
          <div class="form-group">
            <label>Enter UPI ID (Razorpay Test Mode):</label>
            <input type="text" id="upiVpaInput" class="form-input" value="aarav.elitmus@okicici" />
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button class="btn btn-secondary" onclick="window.ph7App.closeModal()">Cancel</button>
            <button class="btn btn-emerald" onclick="window.ph7App.submitTableConfirm('${tbl.id}')">
              ✓ Pay ₹${tbl.seatFeeRs} via UPI & Lock Seat
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function submitTableConfirm(tableId) {
    const upiVpa = document.getElementById("upiVpaInput").value;
    try {
      const res = await apiFetch("/api/tables/confirm", {
        method: "POST",
        body: JSON.stringify({
          userId: state.currentUserId,
          tableId,
          upiVpa
        })
      });
      closeModal();
      showToast(`✅ ${res.message}`);
      await loadAllState();
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  function showVenueCheckInModal(tableId) {
    const tbl =
      (state.bootstrap.tables || []).find((t) => t.id === tableId) || state.bootstrap.tables[0];
    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
        <div class="modal-content" style="max-width:540px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3>📍 Live Table Check-In & Safe-Date Co-Pilot</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
          </div>
          <div style="background:rgba(99,102,241,0.16); border:1px solid rgba(99,102,241,0.45); padding:16px; border-radius:14px; text-align:center; margin-bottom:14px;">
            <div style="font-size:0.75rem; color:#a5b4fc; text-transform:uppercase;">Venue Check-In Code</div>
            <div style="font-size:1.8rem; font-weight:800; letter-spacing:0.06em; color:#fff; margin:4px 0;">${tbl.checkInCode}</div>
            <div style="font-size:0.8rem; color:#6ee7b7;">✓ Verified Show-Up Logged (Show-Up Rate: 100%)</div>
          </div>
          <div style="background:rgba(15,23,42,0.85); border:1px solid var(--border-subtle); padding:14px; border-radius:12px; font-size:0.82rem; margin-bottom:14px;">
            🛰️ <strong>Safe-Date Co-Pilot Running in Background:</strong><br/>
            • Live Plan Link shared with Trusted Contact: <code>https://catalyst.elitmus.com/safe/${tbl.checkInCode}</code><br/>
            • Auto Check-In Timer: <strong>Every 45 mins</strong><br/>
            • Discreet Exit Protocol: Tap <strong>"I Need Out"</strong> below to silently alert your trusted contact and the café's Ask-for-Angela desk.
          </div>
          <div style="display:flex; justify-content:space-between; gap:10px;">
            <button class="btn btn-rose" onclick="window.ph7App.triggerSafeDateSos(); window.ph7App.closeModal();">
              🚨 Trigger Discreet "I Need Out" Alert
            </button>
            <button class="btn btn-emerald" onclick="window.ph7App.jumpTimeMachine(4, 'discover'); window.ph7App.closeModal();">
              🌅 Fast-Forward to Morning Spark Reveal →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function submitDuetPuzzle(puzzleId) {
    const sel = document.getElementById("duetAnswerSelect").value;
    state.duetSelectedOption = sel;
    try {
      const res = await apiFetch("/api/duet/solve", {
        method: "POST",
        body: JSON.stringify({
          userId: state.currentUserId,
          puzzleId,
          selectedOptionId: sel,
          partnerId: "usr_ananya"
        })
      });
      state.duetSolvedResult = res;
      showToast(res.message);
      await loadAllState();
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  async function submitMorningSparkPick(targetUserId) {
    try {
      const res = await apiFetch("/api/spark/reveal", {
        method: "POST",
        body: JSON.stringify({
          userId: state.currentUserId,
          targetUserId
        })
      });
      showToast(res.message);
      if (res.isMutual && res.conversation) {
        state.selectedConversationId = res.conversation.id;
        state.activeTab = "chemistry";
        state.timeMachineStage = 5;
      }
      await loadAllState();
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  async function testScamShield(conversationId) {
    try {
      await apiFetch("/api/conversations/message", {
        method: "POST",
        body: JSON.stringify({
          conversationId,
          senderId: state.currentUserId,
          text: "Hey urgent cash needed, please send Rs 2000 to my UPI ID rahul.scam@okaxis or call 9876543210",
          type: "text"
        })
      });
    } catch (err) {
      showToast(`🛡️ Scam Shield Blocked Message: ${err.message}`);
      await loadAllState();
    }
  }

  async function triggerSafeDateSos() {
    try {
      const res = await apiFetch("/api/safety/copilot-sos", {
        method: "POST",
        body: JSON.stringify({
          userId: state.currentUserId,
          locationNote: "Active Catalyst Venue / Indiranagar"
        })
      });
      showToast(res.message);
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  async function dpdpAction(actionType) {
    try {
      const res = await apiFetch("/api/dpdp/action", {
        method: "POST",
        body: JSON.stringify({
          userId: state.currentUserId,
          actionType
        })
      });
      showToast(res.message);
      if (actionType === "export" && res.exportBundle) {
        const blob = new Blob([JSON.stringify(res.exportBundle, null, 2)], {
          type: "application/json"
        });
        const urlObj = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = urlObj;
        a.download = `catalyst-dpdp-export-${state.currentUserId}.json`;
        a.click();
      }
      await loadAllState();
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  function openEquilibriumModal(candidateId) {
    const matchItem =
      state.discoverData &&
      state.discoverData.matches.find((m) => m.candidate.id === candidateId);

    let candidate = matchItem ? matchItem.candidate : null;
    let equilibrium = matchItem ? matchItem.equilibrium : null;

    if (!candidate && state.conversationsData) {
      const conv = state.conversationsData.conversations.find(
        (c) => c.partner && c.partner.id === candidateId
      );
      if (conv) {
        candidate = conv.partner;
        equilibrium = conv.equilibrium;
      }
    }

    if (!candidate || !equilibrium) return;

    const u = state.currentUser;
    const radarHtml = renderRadarSvg(
      u.wavelengthVector,
      candidate.wavelengthVector,
      u.name.split(" ")[0],
      candidate.name.split(" ")[0]
    );

    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
        <div class="modal-content">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span class="ph-score-badge">pH ${equilibrium.phValue} • ${equilibrium.overallScore}% ${equilibrium.phLabel}</span>
              <h2 style="margin-top:8px; font-size:1.3rem;">${u.name.split(" ")[0]} × ${candidate.name} — 5-Axis Chemistry Report</h2>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕ Close</button>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px; align-items:center; margin-bottom:18px;">
            <div style="background:rgba(15,23,42,0.75); padding:14px; border-radius:14px; text-align:center;">
              ${radarHtml}
            </div>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div class="synergy-callout">
                <strong>🌟 Primary Superpower:</strong><br/>
                ${equilibrium.synergySuperpower}
              </div>
              <div style="font-size:0.8rem; background:rgba(245,158,11,0.1); border-left:3px solid var(--accent-amber); padding:10px; border-radius:0 8px 8px 0; color:#fde68a;">
                <strong>🧭 Conscious Balance Note:</strong><br/>
                ${equilibrium.frictionWatchout}
              </div>
              <div style="font-size:0.8rem; color:var(--text-secondary); background:rgba(255,255,255,0.04); padding:10px; border-radius:8px;">
                <strong>Shared eLitmus Memory (No Raw Scores Shown):</strong><br/>
                ${candidate.phTestMemory || candidate.collegeTier}
              </div>
            </div>
          </div>

          <h4 style="margin-bottom:10px; font-size:0.95rem;">🧩 Side-by-Side Life-Architecture Dilemma Comparison (${equilibrium.exactDilemmaMatches}/${equilibrium.totalComparedDilemmas} Exact Syncs)</h4>
          <div style="display:flex; flex-direction:column; gap:8px; max-height:240px; overflow-y:auto;">
            ${equilibrium.dilemmaComparison
              .map(
                (d) => `
              <div style="background:rgba(15,23,42,0.8); border:1px solid ${
                d.isExactMatch ? "rgba(16,185,129,0.4)" : "var(--border-subtle)"
              }; padding:10px 14px; border-radius:10px; font-size:0.8rem;">
                <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:4px;">
                  <span>${d.title}</span>
                  <span style="color:${d.isExactMatch ? "#34d399" : "#a5b4fc"};">${
                  d.isExactMatch ? "✓ Exact Wavelength Sync" : "↔ Complementary Stance"
                }</span>
                </div>
                <div style="color:var(--text-secondary);">
                  <strong>You (${d.userATag}):</strong> ${d.userAChoice}<br/>
                  <strong>${candidate.name.split(" ")[0]} (${d.userBTag}):</strong> ${d.userBChoice}
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }

  function openGracefulCloseModal(conversationId) {
    const conv =
      state.conversationsData &&
      state.conversationsData.conversations.find((c) => c.id === conversationId);
    if (!conv) return;
    const pName = conv.partner ? conv.partner.name : "Match";

    const reasons = [
      `Really enjoyed meeting at Sunday's table ${pName.split(" ")[0]}—realized I'm focusing deeply on another connection right now and wanted to send a kind note rather than ever ghosting!`,
      `Loved our conversation! Our city/relocation timelines look a bit different right now—wishing you the absolute best.`,
      `Work sprint is taking 100% of my bandwidth for the next few weeks—closing my slot respectfully so you aren't left waiting!`
    ];

    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
        <div class="modal-content" style="max-width:540px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3>🕊️ "Kind No" Anti-Ghosting Closure Protocol</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:14px;">
            Plans expire in 48 hours and "Kind No" templates replace ghosting. Sending a kind closure to <strong>${pName}</strong> frees up <strong>1 of your 3 Focused Slots</strong> and boosts your <strong>Reliability & Karma Score (+2)</strong>.
          </p>

          <div class="form-group">
            <label>Choose or customize your "Kind No" template:</label>
            <select id="closureReasonSelect" class="form-select" onchange="document.getElementById('closureCustomText').value = this.value">
              ${reasons.map((r) => `<option value="${r.replace(/"/g, "&quot;")}">${r.slice(0, 78)}...</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <textarea id="closureCustomText" class="form-input" rows="3">${reasons[0]}</textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button class="btn btn-secondary" onclick="window.ph7App.closeModal()">Keep Slot Active</button>
            <button class="btn btn-emerald" onclick="window.ph7App.submitGracefulClose('${conversationId}')">
              🕊️ Send "Kind No" Closure (+2 Karma)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function submitGracefulClose(conversationId) {
    const txtEl = document.getElementById("closureCustomText");
    const reason = txtEl ? txtEl.value : "";
    try {
      const res = await apiFetch("/api/conversations/graceful-close", {
        method: "POST",
        body: JSON.stringify({
          conversationId,
          userId: state.currentUserId,
          reason
        })
      });
      closeModal();
      showToast(`🕊️ ${res.message}`);
      await loadAllState();
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  function openSafeDateModal(conversationId) {
    const venues = (state.bootstrap && state.bootstrap.venues) || [];
    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
        <div class="modal-content" style="max-width:600px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3>🥂 Budget-Aware 1:1 Plan (₹110–₹220 Cap) + Safe-Date Co-Pilot</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
          </div>
          <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:14px;">
            Half of Gen Z say dating costs hurt their financial goals. Pick a <strong>₹110–₹220 budget-capped partner venue</strong> and share a live <strong>Safe-Date Co-Pilot link</strong> with your trusted contact.
          </p>

          <div class="form-group">
            <label>Select Budget-Aware Safe-Zone Venue:</label>
            <select id="safeDateVenueSelect" class="form-select">
              ${venues
                .map(
                  (v) =>
                    `<option value="${v.id}">${v.city} — ${v.name} (${v.avgSplitCost}) • ${v.elitmusPerk}</option>`
                )
                .join("")}
            </select>
          </div>

          <div class="form-group">
            <label>Preferred Date & Time (Expires in 48h if unconfirmed):</label>
            <input type="text" id="safeDateTimeInput" class="form-input" value="This Saturday • 5:30 PM" />
          </div>

          <div class="form-group">
            <label>Safe-Date Co-Pilot Trusted Contact (Receives Live Plan Link & Timer):</label>
            <input type="text" id="safeDateContactInput" class="form-input" value="Rohit M. (+91-98XXXXXX12 • Live Check-In Timer 45m)" />
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
            <button class="btn btn-secondary" onclick="window.ph7App.closeModal()">Cancel</button>
            <button class="btn btn-emerald" onclick="window.ph7App.submitSafeDateBooking('${conversationId}')">
              🥂 Confirm Plan & Activate Safe-Date Co-Pilot
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function submitSafeDateBooking(conversationId) {
    const venueId = document.getElementById("safeDateVenueSelect").value;
    const dateTime = document.getElementById("safeDateTimeInput").value;
    const trustedContact = document.getElementById("safeDateContactInput").value;
    try {
      const res = await apiFetch("/api/conversations/book-safe-date", {
        method: "POST",
        body: JSON.stringify({ conversationId, venueId, dateTime, trustedContact })
      });
      closeModal();
      showToast(`🥂 ${res.message}`);
      await loadAllState();
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  function openAuthModal(mode = "login") {
    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";

    if (mode === "login") {
      modal.innerHTML = `
        <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
          <div class="modal-content" style="max-width:480px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <h3>🔑 Alumni Login (or Judge Test Accounts)</h3>
              <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
            </div>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px;">
              All seeded accounts use password: <code>password123</code>
              <br/>• <code>aarav@elitmus.com</code> (2022 Batch • SDE-2 @ Razorpay • Jaipur → BLR)
              <br/>• <code>ananya@elitmus.com</code> (2021 Batch • PM @ Swiggy • Mumbai → BLR)
              <br/>• <code>meera@elitmus.com</code> (2020 Batch • Designer @ Atlassian • Coimbatore → BLR)
              <br/>• <code>rohan@elitmus.com</code> (2021 Batch • Applied AI @ Microsoft • Chandigarh → HYD)
            </p>
            <form onsubmit="event.preventDefault(); window.ph7App.submitLogin();">
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="loginEmailInput" class="form-input" value="ananya@elitmus.com" required />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" id="loginPasswordInput" class="form-input" value="password123" required />
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.ph7App.openAuthModal('register')">
                  New User? Verify eLitmus ID →
                </button>
                <button type="submit" class="btn btn-primary" style="flex:0 0 auto;">Sign In ⚡</button>
              </div>
            </form>
          </div>
        </div>
      `;
    } else {
      modal.innerHTML = `
        <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
          <div class="modal-content" style="max-width:600px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3>✨ 4-Rung Verification & eLitmus pH Credential Link</h3>
              <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
            </div>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px;">
              Enter a sample eLitmus pH ID (<code>EL-2023-10492</code>, <code>EL-2022-66201</code>, or <code>EL-2021-50019</code>) and click <strong>Verify Credentials</strong>. Enforces strict <strong>18+ Age Gate</strong> & <strong>DPDP Nov 2025 Itemized Consent</strong>.
            </p>

            <div style="display:flex; gap:8px; margin-bottom:16px;">
              <input type="text" id="regPhIdInput" class="form-input" value="EL-2023-10492" />
              <button type="button" class="btn btn-emerald" onclick="window.ph7App.verifyElitmusId()">
                ✓ Verify eLitmus ID
              </button>
            </div>

            <form onsubmit="event.preventDefault(); window.ph7App.submitRegistration();">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" id="regName" class="form-input" value="Siddharth Kulkarni" required />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" id="regEmail" class="form-input" value="siddharth@elitmus.com" required />
                </div>
                <div class="form-group">
                  <label>Age (Strict 18+ Gate)</label>
                  <input type="number" id="regAge" class="form-input" value="24" min="18" max="60" required />
                </div>
                <div class="form-group">
                  <label>Graduating Batch</label>
                  <select id="regBatch" class="form-select">
                    <option value="2023" selected>2023 Batch</option>
                    <option value="2022">2022 Batch</option>
                    <option value="2021">2021 Batch</option>
                    <option value="2020">2020 Batch</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Gender & Preference</label>
                  <select id="regGender" class="form-select">
                    <option value="Male">Male (Looking for Female)</option>
                    <option value="Female">Female (Looking for Male)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Mutual Intent Hard Filter</label>
                  <select id="regIntent" class="form-select">
                    <option value="Serious / Intentional Dating">Serious / Intentional Dating</option>
                    <option value="Dating, Open to Serious">Dating, Open to Serious</option>
                    <option value="Friends First → Dating">Friends First → Dating</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Verified Alma Mater</label>
                  <input type="text" id="regCollege" class="form-input" value="VIT Vellore (B.Tech CSE '23)" />
                </div>
                <div class="form-group">
                  <label>Current Company (Auto-Cloaked)</label>
                  <input type="text" id="regCompany" class="form-input" value="PhonePe" />
                </div>
              </div>

              <div style="font-size:0.78rem; color:#a7f3d0; background:rgba(16,185,129,0.1); padding:10px; border-radius:8px; margin-bottom:12px;">
                ☑️ <strong>DPDP Rules (Nov 2025) Itemized Consent:</strong> I consent to verify my graduation status via eLitmus. I understand my raw pH scores are never shown and my dating activity is strictly firewalled from employers.
              </div>

              <div style="display:flex; justify-content:flex-end; gap:10px;">
                <button type="button" class="btn btn-secondary" onclick="window.ph7App.closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary" style="flex:0 0 auto;">🚀 Mint Rung-3 Passport & Join</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  }

  async function verifyElitmusId() {
    const rawId = document.getElementById("regPhIdInput").value;
    try {
      const res = await apiFetch("/api/auth/elitmus-lookup", {
        method: "POST",
        body: JSON.stringify({ elitmusPhId: rawId })
      });
      const rec = res.record;
      document.getElementById("regName").value = rec.name;
      document.getElementById("regBatch").value = String(rec.batchYear);
      document.getElementById("regCollege").value = rec.college;
      document.getElementById("regCompany").value = rec.company;
      showToast(`✅ Verified ${rec.elitmusPhId}: Class 10/12 & ${rec.college} Docs Confirmed!`);
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  async function submitLogin() {
    const email = document.getElementById("loginEmailInput").value;
    const password = document.getElementById("loginPasswordInput").value;
    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      state.currentUserId = res.user.id;
      closeModal();
      showToast(`🔑 ${res.message}`);
      await loadAllState();
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  async function submitRegistration() {
    const gender = document.getElementById("regGender").value;
    const payload = {
      elitmusPhId: document.getElementById("regPhIdInput").value,
      name: document.getElementById("regName").value,
      email: document.getElementById("regEmail").value,
      age: Number(document.getElementById("regAge").value),
      batchYear: Number(document.getElementById("regBatch").value),
      gender,
      lookingFor: gender === "Female" ? "Male" : "Female",
      intent: document.getElementById("regIntent").value,
      college: document.getElementById("regCollege").value,
      company: document.getElementById("regCompany").value,
      role: "Software Development Engineer",
      city: "Bengaluru"
    };
    try {
      const res = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      state.currentUserId = res.user.id;
      closeModal();
      showToast(`🎉 ${res.message}`);
      await loadAllState();
    } catch (err) {
      showToast(`⚠️ ${err.message}`);
    }
  }

  window.ph7App = {
    switchTab(tabName) {
      state.activeTab = tabName;
      renderMainWorkspace();
    },

    jumpTimeMachine(stageNum, tabName) {
      state.timeMachineStage = stageNum;
      state.activeTab = tabName;
      renderMainWorkspace();
      const stageNames = {
        1: "Sunday Weekly Drop (Choose 1 of 3 Curated Tables)",
        2: "Asymmetric 2-Player Duet Puzzle Warm-Up",
        3: "Venue Check-In & Safe-Date Co-Pilot",
        4: "Morning-After Private Spark Reveal",
        5: "Mutual Spark 1:1 Chat & Live Scam Shield"
      };
      showToast(`⏱️ Time-Machine Jumped to Stage ${stageNum}: ${stageNames[stageNum]}`);
    },

    async switchPersona(userId) {
      state.currentUserId = userId;
      state.selectedConversationId = null;
      await loadAllState();
      showToast(`👤 Switched active persona to ${state.currentUser.name} (${state.currentUser.company})`);
    },

    openConversation(convId) {
      state.selectedConversationId = convId;
      state.activeTab = "chemistry";
      state.timeMachineStage = 5;
      renderMainWorkspace();
    },

    selectConversation(convId) {
      state.selectedConversationId = convId;
      renderMainWorkspace();
    },

    async selectDilemmaOption(dilemmaId, optionId) {
      try {
        const res = await apiFetch("/api/dilemmas/answer", {
          method: "POST",
          body: JSON.stringify({
            userId: state.currentUserId,
            dilemmaId,
            optionId
          })
        });
        showToast(`🧬 ${res.message}`);
        await loadAllState();
      } catch (err) {
        showToast(`⚠️ ${err.message}`);
      }
    },

    updateWhatIfSlider(axisKey, val) {
      state.whatIfVector[axisKey] = Number(val);
      renderMainWorkspace();
    },

    updateRevSlider(key, val) {
      state.revenueSim[key] = Number(val);
      renderMainWorkspace();
    },

    async sendChatMessage(conversationId) {
      const inputEl = document.getElementById("chatMessageInput");
      if (!inputEl || !inputEl.value.trim()) return;
      const text = inputEl.value.trim();
      inputEl.value = "";
      try {
        const res = await apiFetch("/api/conversations/message", {
          method: "POST",
          body: JSON.stringify({
            conversationId,
            senderId: state.currentUserId,
            text,
            type: "text"
          })
        });
        if (res.stagePromoted) {
          showToast("🎉 Stage 3 Full Crystal Reveal Unlocked!");
        }
        await loadAllState();
      } catch (err) {
        showToast(`🛡️ ${err.message}`);
        await loadAllState();
      }
    },

    async sendIcebreaker(conversationId, icebreakerId) {
      const ice = (state.bootstrap.icebreakers || []).find((i) => i.id === icebreakerId);
      if (!ice) return;
      try {
        await apiFetch("/api/conversations/message", {
          method: "POST",
          body: JSON.stringify({
            conversationId,
            senderId: state.currentUserId,
            type: "icebreaker_card",
            icebreakerTitle: ice.title,
            text: ice.prompt
          })
        });
        showToast(`🎲 Shared-Memory Icebreaker Sent: ${ice.title}`);
        await loadAllState();
      } catch (err) {
        showToast(`⚠️ ${err.message}`);
      }
    },

    async toggleShieldSetting(field) {
      const shield = state.currentUser.coworkerShield || {};
      const nextVal = !shield[field];
      try {
        const res = await apiFetch("/api/profile/shield", {
          method: "POST",
          body: JSON.stringify({
            userId: state.currentUserId,
            [field]: nextVal
          })
        });
        showToast(`🛡️ ${res.message}`);
        await loadAllState();
      } catch (err) {
        showToast(`⚠️ ${err.message}`);
      }
    },

    async saveCustomBlockedDomains() {
      const raw = document.getElementById("blockedDomainsInput").value;
      const blockedDomains = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      try {
        const res = await apiFetch("/api/profile/shield", {
          method: "POST",
          body: JSON.stringify({
            userId: state.currentUserId,
            blockedDomains
          })
        });
        showToast(`🛡️ ${res.message}`);
        await loadAllState();
      } catch (err) {
        showToast(`⚠️ ${err.message}`);
      }
    },

    playVoicePrompt(name, transcript) {
      showToast(`🔊 Playing ${name}'s Voice Note: "${transcript}"`);
      if ("speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(transcript);
          utter.rate = 1.02;
          window.speechSynthesis.speak(utter);
        } catch (e) {}
      }
    },

    async resetDemoData() {
      try {
        const res = await apiFetch("/api/admin/reset", { method: "POST" });
        state.currentUserId = "usr_aarav";
        state.selectedConversationId = null;
        state.duetSolvedResult = null;
        await loadAllState();
        showToast(`↺ ${res.message}`);
      } catch (err) {
        showToast(`⚠️ ${err.message}`);
      }
    },

    openTimeMachineTour,
    openUpiConfirmModal,
    submitTableConfirm,
    showVenueCheckInModal,
    submitDuetPuzzle,
    submitMorningSparkPick,
    testScamShield,
    triggerSafeDateSos,
    dpdpAction,
    openEquilibriumModal,
    openGracefulCloseModal,
    submitGracefulClose,
    openSafeDateModal,
    submitSafeDateBooking,
    openAuthModal,
    verifyElitmusId,
    submitLogin,
    submitRegistration,
    closeModal
  };

  document.addEventListener("DOMContentLoaded", () => {
    loadAllState();
  });
})();
