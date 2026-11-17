/**
 * pH7 by eLitmus — Frontend Application Controller
 * Full-Stack Interactive Client with Real-Time 5-Axis Radar, Progressive Reveal,
 * Anti-Ghosting Karma Protocol, Safe-Date Concierge & Founder Strategy Studio.
 */

(function () {
  const state = {
    activeTab: "discover",
    currentUserId: "usr_aarav",
    currentUser: null,
    bootstrap: null,
    discoverData: null,
    conversationsData: null,
    selectedConversationId: null,
    whatIfVector: {
      intellectualCuriosity: 92,
      careerAmbitionTempo: 85,
      financialThermostat: 88,
      socialBattery: 70,
      conflictDirectness: 80
    },
    revenueSim: {
      alumniBase: 1000000,
      activationPct: 8.5, // 85,000 active alumni
      paidConversionPct: 9.0, // 7,650 paying subscribers
      monthlyArppu: 349, // ₹349/mo fair-price alumni tier
      monthlyDatePasses: 3200, // offline venue bookings/mo
      venueCommissionRs: 180 // ₹180 B2B2C commission per booking
    }
  };

  // Rich SVG Portrait Generator for Progressive Blur Reveal
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
    const [bg1, bg2, accent, highlight] = palettes[seed] || ["#1e1b4b", "#6366f1", "#ec4899", "#ffffff"];
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
        <!-- Stylized Avatar Silhouette -->
        <circle cx="60" cy="46" r="20" fill="rgba(255,255,255,0.88)" />
        <path d="M26 112 C26 82, 94 82, 94 112 Z" fill="rgba(255,255,255,0.82)" />
        <text x="60" y="52" text-anchor="middle" fill="${bg1}" font-size="14" font-weight="800" font-family="Inter, sans-serif">${initials}</text>
      </svg>
    `;
  }

  // 5-Axis Polygon Radar SVG Generator
  function renderRadarSvg(vecA, vecB, nameA, nameB) {
    const keys = [
      { key: "intellectualCuriosity", label: "Intellectual" },
      { key: "financialThermostat", label: "Financial" },
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
    }, 4200);
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
    // 1. Evaluator Persona Switcher Pills
    const pillsEl = document.getElementById("personaPillsContainer");
    if (pillsEl && state.bootstrap) {
      const featuredIds = ["usr_aarav", "usr_ananya", "usr_meera", "usr_rohan"];
      const accounts = state.bootstrap.demoAccounts.filter((a) =>
        featuredIds.includes(a.id) || a.id === state.currentUserId
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

    // 2. Telemetry Strip
    const u = state.currentUser;
    const stripEl = document.getElementById("userTelemetryStrip");
    if (u && stripEl && state.discoverData) {
      const cloaked = state.discoverData.privacyFirewall.cloakedCount;
      const slotsUsed = state.discoverData.activeSlotsUsed;
      stripEl.innerHTML = `
        <div class="telemetry-pill" title="Verified eLitmus pH Passport">
          🆔 <span><strong>${u.name}</strong> (${u.elitmusPhId} • Batch '${String(u.batchYear).slice(-2)})</span>
        </div>
        <div class="telemetry-pill" title="Cognitive Archetype derived from eLitmus pH Evaluation">
          🧠 <span>Archetype: <strong>${u.cognitiveArchetype}</strong></span>
        </div>
        <div class="telemetry-pill" title="Anti-Ghosting Accountability Karma Score">
          ✨ <span>Karma: <strong style="color:#34d399;">${u.karmaScore}/100</strong> (${u.credits || 30} Cr)</span>
        </div>
        <div class="telemetry-pill" title="Focused Chemistry Cap prevents match hoarding">
          🧪 <span>Active Slots: <strong>${slotsUsed}/3</strong></span>
        </div>
      `;

      const badgeSlots = document.getElementById("badgeSlots");
      if (badgeSlots) badgeSlots.textContent = `${slotsUsed}/3 Slots`;

      const badgeCloaked = document.getElementById("badgeCloaked");
      if (badgeCloaked) badgeCloaked.textContent = `${cloaked} Cloaked`;

      const badgeDiscover = document.getElementById("badgeDiscover");
      if (badgeDiscover) badgeDiscover.textContent = `${state.discoverData.matches.length} Matches`;
    }
  }

  function renderMainWorkspace() {
    const container = document.getElementById("appMainWorkspace");
    if (!container || !state.currentUser) return;

    // Update active tab button classes
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === state.activeTab);
    });

    if (state.activeTab === "discover") {
      container.innerHTML = renderDiscoverTab();
    } else if (state.activeTab === "dilemmas") {
      container.innerHTML = renderDilemmasTab();
    } else if (state.activeTab === "chemistry") {
      container.innerHTML = renderChemistryTab();
    } else if (state.activeTab === "passport") {
      container.innerHTML = renderPassportTab();
    } else if (state.activeTab === "founder") {
      container.innerHTML = renderFounderTab();
    }
  }

  /* ==========================================================================
     TAB 1: WAVELENGTH DISCOVERY FEED (ANTI-SWIPE + PROGRESSIVE REVEAL)
     ========================================================================== */
  function renderDiscoverTab() {
    const { matches, privacyFirewall, activeSlotsUsed, maxActiveSlots } = state.discoverData;
    const u = state.currentUser;

    const cardsHtml = matches
      .map((item) => {
        const { candidate, equilibrium, revealStage, conversationId, conversationStatus } = item;
        const stageLabels = {
          1: "Stage 1 • 65% Wavelength Blur",
          2: "Stage 2 • Half-Unblurred",
          3: "Stage 3 • Crystal Reveal"
        };

        const topAxes = equilibrium.axisBreakdown.slice(0, 4);

        let primaryActionBtn = "";
        if (conversationId && conversationStatus === "active") {
          primaryActionBtn = `
            <button class="btn btn-emerald" style="flex:1;" onclick="window.ph7App.openConversation('${conversationId}')">
              💬 Open Chemistry Lab (Stage ${revealStage}/3)
            </button>
          `;
        } else if (revealStage < 3) {
          primaryActionBtn = `
            <button class="btn btn-primary" onclick="window.ph7App.openAdvanceChemistryModal('${candidate.id}')">
              ⚡ Sync Wavelength & Unblur (Stage ${revealStage} → ${revealStage + 1})
            </button>
          `;
        } else {
          primaryActionBtn = `
            <button class="btn btn-primary" onclick="window.ph7App.openAdvanceChemistryModal('${candidate.id}')">
              💬 Start Chemistry Chat
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
                <div class="candidate-role">${candidate.role} @ <strong>${candidate.company}</strong> • ${candidate.neighborhood}, ${candidate.city}</div>
                <div class="trust-badges-row">
                  <span class="trust-chip emerald">✓ ${candidate.collegeTier}</span>
                  <span class="trust-chip">🧠 ${candidate.cognitiveArchetype}</span>
                  <span class="trust-chip amber">★ ${candidate.karmaScore} Karma</span>
                </div>
              </div>
            </div>

            <div style="font-size: 0.87rem; color: var(--text-secondary);">
              "${candidate.headline}"
            </div>

            <div class="mind-prompt-box">
              <div class="mind-prompt-label">
                <span>🎙️ Voice & Mind Wavelength Prompt</span>
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
              <strong>⚡ Why You Click (${equilibrium.exactDilemmaMatches}/${equilibrium.totalComparedDilemmas} Dilemmas Aligned):</strong>
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
          <h2>⚡ The Anti-Swipe Equilibrium Feed for ${u.name.split(" ")[0]}</h2>
          <p>
            No superficial left/right photo swiping. Profiles start softly blurred (Stage 1) and progressively unblur as you align on
            <strong>5-Axis Cognitive & Life-Architecture Dilemmas</strong>. You can hold at most <strong>${maxActiveSlots} Active Chemistry Slots</strong> (${activeSlotsUsed}/${maxActiveSlots} currently in use) so every conversation gets real presence.
          </p>
        </div>
        <div class="firewall-notice">
          🛡️ <div>
            <strong>Coworker Firewall Active (${u.company})</strong><br/>
            <span>${privacyFirewall.cloakedCount} coworker/batchmate profile${privacyFirewall.cloakedCount === 1 ? "" : "s"} automatically cloaked</span>
          </div>
        </div>
      </div>

      <div class="candidates-grid">
        ${cardsHtml}
      </div>
    `;
  }

  /* ==========================================================================
     TAB 2: LIFE-ARCHITECTURE LAB (5 MICRO-CASE DILEMMAS + WHAT-IF SIMULATOR)
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
                        <div style="font-size:0.74rem; color:var(--text-muted); margin-top:3px;">Archetype Signal: <strong style="color:#a5b4fc;">${opt.archetypeTag}</strong></div>
                      </div>
                      <span class="trust-chip ${isSel ? "emerald" : ""}">${isSel ? "✓ Active Stance" : "Select"}</span>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;
      })
      .join("");

    // Compute live What-If Simulation score against current user
    const uVec = u.wavelengthVector;
    const simVec = state.whatIfVector;
    const simRadar = renderRadarSvg(uVec, simVec, `${u.name.split(" ")[0]} (You)`, "Hypothetical Partner");

    return `
      <div class="philosophy-banner">
        <div>
          <h2>🧩 Life-Architecture Micro-Case Lab & What-If Simulator</h2>
          <p>
            Instead of generic prompts like "I love tacos & Sunday naps", pH7 calibrates compatibility using real trade-offs that 23–28 year-old Indian professionals navigate: career risk, financial compounding, conflict timing, and social battery.
          </p>
        </div>
        <div class="telemetry-pill">
          🧬 Your Live Vector:
          <strong>IC ${uVec.intellectualCuriosity} • FT ${uVec.financialThermostat} • CA ${uVec.careerAmbitionTempo} • CD ${uVec.conflictDirectness} • SB ${uVec.socialBattery}</strong>
        </div>
      </div>

      <div class="section-grid-2" style="margin-bottom: 26px;">
        <div class="panel-card">
          <h3>🎛️ Interactive "What-If" Partner Compatibility Simulator</h3>
          <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:14px;">
            Drag the sliders below to simulate a hypothetical partner's 5-Axis profile and inspect how the pH7 Equilibrium Engine evaluates similarity vs. complementarity in real time:
          </p>
          ${[
            { key: "intellectualCuriosity", label: "Intellectual Wavelength (Similarity-Weighted)" },
            { key: "financialThermostat", label: "Financial Thermostat (Similarity-Weighted)" },
            { key: "careerAmbitionTempo", label: "Ambition & Career Tempo (Similarity-Weighted)" },
            { key: "conflictDirectness", label: "Conflict Directness (Calibrated Balance)" },
            { key: "socialBattery", label: "Social Battery & Lifestyle (Complementary-Friendly)" }
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

      <h3 style="margin-bottom: 14px; font-size: 1.15rem;">⚡ Your 5 Life-Architecture Micro-Cases (Click Any Option to Recalibrate)</h3>
      <div class="section-grid-2">
        ${dilemmaCards}
      </div>
    `;
  }

  /* ==========================================================================
     TAB 3: FOCUSED CHEMISTRY LAB (3-SLOT CAP, CO-OP ICEBREAKERS & SAFE-DATE PASS)
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
              <div style="margin-top:4px;">Unlock a match in the Wavelength Feed to assign this slot.</div>
            </div>
          `;
        }
        const isSel = selectedConv && selectedConv.id === conv.id;
        const p = conv.partner || { name: "Match", role: "", company: "" };
        return `
          <div class="slot-card ${isSel ? "active" : ""}" onclick="window.ph7App.selectConversation('${conv.id}')">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong>Slot #${slotIdx + 1}: ${p.name}</strong>
              <span class="trust-chip emerald">Stage ${conv.stage}/3</span>
            </div>
            <div style="font-size:0.76rem; color:var(--text-secondary); margin-top:3px;">
              ${p.role} @ ${p.company} • <strong>${conv.equilibriumScore}% pH Sync</strong>
            </div>
            ${
              conv.safeDateBooking
                ? `<div style="margin-top:6px; font-size:0.72rem; color:#6ee7b7;">🥂 Safe-Date Pass: ${conv.safeDateBooking.passCode}</div>`
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
          <h3>No Active Chemistry Slot Selected</h3>
          <p style="color:var(--text-secondary); max-width:420px; margin:10px 0 20px;">
            Head over to the Wavelength Feed and sync on a Dilemma to open one of your 3 Focused Chemistry Slots!
          </p>
          <button class="btn btn-primary" onclick="window.ph7App.switchTab('discover')">⚡ Explore Wavelength Feed</button>
        </div>
      `;
    } else {
      const p = selectedConv.partner || { name: "Match", role: "", company: "", city: "Bengaluru" };
      const isClosed = selectedConv.status !== "active";

      const messagesHtml = (selectedConv.messages || [])
        .map((m) => {
          if (m.senderId === "system") {
            return `<div class="msg-bubble msg-system">${m.text}</div>`;
          }
          const isMine = m.senderId === state.currentUserId;
          return `
            <div class="msg-bubble ${isMine ? "msg-mine" : "msg-theirs"}">
              ${
                m.icebreakerTitle
                  ? `<div style="font-size:0.7rem; text-transform:uppercase; letter-spacing:0.04em; opacity:0.85; margin-bottom:4px;">🎲 Co-Op Icebreaker: ${m.icebreakerTitle}</div>`
                  : ""
              }
              <div>${m.text}</div>
            </div>
          `;
        })
        .join("");

      const safeDateBanner = selectedConv.safeDateBooking
        ? `
          <div style="background:rgba(16,185,129,0.14); border-bottom:1px solid rgba(16,185,129,0.35); padding:10px 22px; font-size:0.8rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              🥂 <strong>Verified Safe-Date Pass Active (${selectedConv.safeDateBooking.passCode}):</strong>
              ${selectedConv.safeDateBooking.venueName} • ${selectedConv.safeDateBooking.dateTime}
            </div>
            <span class="trust-chip emerald">Ask-for-Angela Safety Protocol Enabled</span>
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
                  ${p.name} <span class="trust-chip emerald">Stage ${selectedConv.stage}/3 Reveal</span>
                </div>
                <div style="font-size:0.78rem; color:var(--text-secondary);">
                  ${p.role} @ ${p.company} • ${p.cognitiveArchetype} • Karma ${p.karmaScore}
                </div>
              </div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-secondary btn-sm" onclick="window.ph7App.openEquilibriumModal('${p.id}')">
                📊 5-Axis Report
              </button>
              ${
                !isClosed
                  ? `
                <button class="btn btn-emerald btn-sm" onclick="window.ph7App.openSafeDateModal('${selectedConv.id}')">
                  🥂 Book Safe-Date Pass
                </button>
                <button class="btn btn-rose btn-sm" onclick="window.ph7App.openGracefulCloseModal('${selectedConv.id}')">
                  🕊️ Graceful Closure (+2 Karma)
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
              <span style="font-size:0.75rem; color:var(--text-muted); align-self:center;">🎲 Launch Co-Op Icebreaker:</span>
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
              <input type="text" id="chatMessageInput" class="chat-input" placeholder="Write a thoughtful reply (sending a message at Stage 2 unlocks Stage 3 Full Crystal Reveal)..." required />
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
          <h2>💬 Focused Chemistry Lab (Max 3 Active Slots + Anti-Ghosting Karma)</h2>
          <p>
            Why do 85% of matches die on Tinder & Bumble? Because users hoard 40+ parallel chats and ghost. On pH7, you hold at most
            <strong>3 Active Chemistry Slots</strong>. To open a 4th, you use our 1-click <strong>Graceful Closure Protocol</strong>—earning Accountability Karma instead of ghosting.
          </p>
        </div>
      </div>

      <div class="chemistry-layout">
        <div class="slots-sidebar">
          <h3 style="font-size:0.95rem;">🧪 Your 3 Focused Chemistry Slots (${activeConvs.length}/3)</h3>
          ${slotsHtml}

          ${
            closedConvs.length > 0
              ? `
            <h4 style="font-size:0.8rem; color:var(--text-muted); margin-top:10px; text-transform:uppercase;">🕊️ Gracefully Closed Archive</h4>
            ${closedConvs
              .map(
                (c) => `
              <div class="slot-card" style="opacity:0.7;" onclick="window.ph7App.selectConversation('${c.id}')">
                <div style="font-size:0.82rem; font-weight:600;">${c.partner ? c.partner.name : "Match"}</div>
                <div style="font-size:0.72rem; color:#6ee7b7;">✓ Closed with kindness (+2 Karma)</div>
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
     TAB 4: TRUST PASSPORT, COWORKER FIREWALL & KARMA MONETIZATION
     ========================================================================== */
  function renderPassportTab() {
    const u = state.currentUser;
    const fw = state.discoverData.privacyFirewall;
    const shield = u.coworkerShield || {};

    return `
      <div class="philosophy-banner">
        <div>
          <h2>🛡️ eLitmus Cryptographic Trust Passport & Coworker Firewall</h2>
          <p>
            The #1 reason young Indian professionals (especially women in tech) avoid dating apps is fear of running into coworkers, managers, or fake profiles.
            pH7 turns eLitmus's verified alumni graph into both a <strong>Zero-Catfish Trust Shield</strong> and an automatic <strong>Employer & Batchmate Cloak</strong>.
          </p>
        </div>
      </div>

      <div class="section-grid-2">
        <!-- Left: eLitmus Trust Passport -->
        <div class="panel-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3>🆔 Verified eLitmus Trust Passport</h3>
            <span class="trust-chip emerald">✓ Cryptographically Verified</span>
          </div>

          <div style="background:linear-gradient(135deg, rgba(49,46,129,0.7), rgba(15,23,42,0.95)); border:1px solid rgba(99,102,241,0.45); border-radius:16px; padding:20px; margin-bottom:18px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <div style="font-size:0.72rem; color:#a5b4fc; text-transform:uppercase; letter-spacing:0.06em;">eLitmus pH Verified Alumni</div>
                <div style="font-size:1.3rem; font-weight:800; margin-top:2px;">${u.name}</div>
                <div style="font-size:0.84rem; color:var(--text-secondary);">${u.role} @ ${u.company}</div>
              </div>
              <div style="text-align:right;">
                <div class="ph-score-badge">${u.elitmusPhId}</div>
                <div style="font-size:0.72rem; color:#6ee7b7; margin-top:6px;">Batch of ${u.batchYear}</div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:16px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.1); font-size:0.8rem;">
              <div>
                <span style="color:var(--text-muted);">Alma Mater:</span><br/>
                <strong>${u.college}</strong>
              </div>
              <div>
                <span style="color:var(--text-muted);">Cognitive Archetype:</span><br/>
                <strong style="color:#c7d2fe;">${u.cognitiveArchetype}</strong>
              </div>
              <div>
                <span style="color:var(--text-muted);">pH Synthesis Signal:</span><br/>
                <strong style="color:#6ee7b7;">${u.archetypeBadge}</strong>
              </div>
              <div>
                <span style="color:var(--text-muted);">Accountability Karma:</span><br/>
                <strong style="color:#fcd34d;">${u.karmaScore}/100 (${u.credits} Karma Credits)</strong>
              </div>
            </div>
          </div>

          <div style="font-size:0.8rem; color:var(--text-secondary); background:rgba(9,11,18,0.6); padding:12px; border-radius:10px; border:1px solid var(--border-subtle);">
            🔒 <strong>Zero-Raw-Score Privacy Guarantee (DPDP Act 2023):</strong> Your raw eLitmus pH test scores and corporate interview records are never exposed to other users or third parties. Only your opt-in positive <em>Cognitive Archetype</em> is minted onto your dating passport.
          </div>
        </div>

        <!-- Right: Interactive Coworker & Batchmate Firewall -->
        <div class="panel-card">
          <h3>🕵️ Coworker & Employer Cloaking Firewall</h3>
          <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:16px;">
            Test this live: Toggle <strong>Block Current Company (${u.companyDomain})</strong> below and see how coworkers (like <em>Vikramaditya Rao @ Razorpay</em> when logged in as Aarav) are automatically cloaked or revealed in your Wavelength Feed!
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
            <label style="font-size:0.8rem; color:var(--text-secondary); font-weight:600;">Custom Blocked Corporate Domains (comma-separated):</label>
            <div style="display:flex; gap:8px; margin-top:6px;">
              <input type="text" id="blockedDomainsInput" class="form-input" value="${(shield.blockedDomains || []).join(", ")}" placeholder="e.g. razorpay.com, infosys.com" />
              <button class="btn btn-secondary" onclick="window.ph7App.saveCustomBlockedDomains()">Update</button>
            </div>
          </div>

          <div style="margin-top:18px; padding:12px 14px; border-radius:12px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); font-size:0.82rem;">
            🛡️ <strong>Live Firewall Status:</strong> Currently cloaking <strong>${fw.cloakedCount}</strong> profile(s) from your feed.
            ${
              fw.cloakedDetails.length > 0
                ? `<div style="margin-top:4px; color:#a7f3d0;">Cloaked: ${fw.cloakedDetails.map((d) => d.reason).join(" • ")}</div>`
                : ""
            }
          </div>
        </div>
      </div>

      <!-- Karma-Backed Fair Pricing & Monetization -->
      <div class="panel-card" style="margin-top: 22px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h3>💎 Fair-Price Alumni Monetization & Karma Rewards</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary);">
              Just like eLitmus prices the pH test lower than CAT/GATE so no deserving talent is priced out, <strong>pH7 never locks basic matching behind ₹2,500/mo predatory paywalls</strong>. High-Karma users can even unlock premium perks using earned Accountability Credits!
            </p>
          </div>
          <span class="ph-score-badge">Current Tier: ${u.subscriptionTier}</span>
        </div>

        <div class="kpi-grid" style="margin-top:18px;">
          <div class="kpi-box">
            <div class="kpi-lbl">Tier 1 • Verified Alumni Core</div>
            <div class="kpi-val">₹0 / forever</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px;">
              3 Focused Chemistry Slots, 5-Axis Matching, Mutual Coworker Firewall, and Karma Credit rewards.
            </div>
          </div>
          <div class="kpi-box" style="border-color: var(--accent-indigo);">
            <div class="kpi-lbl">Tier 2 • pH7 Equilibrium+</div>
            <div class="kpi-val">₹349 / mo <span style="font-size:0.75rem; font-weight:500; color:#6ee7b7;">(or 95+ Karma)</span></div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px;">
              Unlimited Deep 5-Axis Reports, Cross-Metro Relocation Mode (BLR ↔ HYD ↔ NCR), + 20% Partner Venue Safe-Date Perks.
            </div>
            <button class="btn btn-primary btn-sm" style="margin-top:10px; width:100%;" onclick="window.ph7App.upgradeSubscription('pH7 Equilibrium+')">
              ⚡ Activate Equilibrium+
            </button>
          </div>
          <div class="kpi-box">
            <div class="kpi-lbl">Tier 3 • Curated Offline Alumni Mixers</div>
            <div class="kpi-val">₹799 / ticket</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px;">
              Gender-balanced, cognitive-curated 24-person board-game & coffee mixers in Indiranagar, Banjara Hills, and CyberHub.
            </div>
          </div>
          <div class="kpi-box">
            <div class="kpi-lbl">B2B2C • Safe-Date Partner Venues</div>
            <div class="kpi-val">18% Take-Rate</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px;">
              Specialty cafes & experience studios pay pH7 a partner referral fee for high-intent verified alumni date bookings.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     TAB 5: FOUNDER'S PLAYBOOK (GTM, REVENUE SIMULATOR & LEGAL COMPLIANCE)
     ========================================================================== */
  function renderFounderTab() {
    const sim = state.revenueSim;
    const activeUsers = Math.round((sim.alumniBase * sim.activationPct) / 100);
    const payingUsers = Math.round((activeUsers * sim.paidConversionPct) / 100);
    const subMrrRs = payingUsers * sim.monthlyArppu;
    const venueMrrRs = sim.monthlyDatePasses * sim.venueCommissionRs;
    const mixerMrrRs = Math.round(activeUsers * 0.025) * 799; // 2.5% attend curated offline mixers
    const totalMrrRs = subMrrRs + venueMrrRs + mixerMrrRs;
    const arrCrores = ((totalMrrRs * 12) / 10000000).toFixed(2);

    return `
      <div class="philosophy-banner">
        <div>
          <h2>🚀 Startup Founder's Command Center — End-to-End Product Ownership</h2>
          <p>
            Built specifically for the eLitmus evaluation team: Why we rejected a Tinder/Hinge clone, how we acquire users from the 1M+ (2020–2023 batch) database at near-zero CAC, how we monetize ethically, and how we navigate Indian legal & privacy regulations.
          </p>
        </div>
      </div>

      <!-- 1. Landscape Critique & First-Principles Differentiation -->
      <div class="panel-card" style="margin-bottom: 22px;">
        <h3>1️⃣ Observing the Landscape: Why Tinder, Bumble, Hinge & Matrimony Apps Fail the 2020–2023 Cohort</h3>
        <table class="strategy-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Swipe Apps (Tinder / Bumble)</th>
              <th>Matrimony Portals</th>
              <th>pH7 by eLitmus (Our Innovation)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary Signal</strong></td>
              <td>Split-second photo judgment (0.8s per swipe)</td>
              <td>Caste, horoscope, parental income, static bio-data</td>
              <td><strong>5-Axis Cognitive, Financial & Life-Architecture Equilibrium + Progressive Photo Reveal</strong></td>
            </tr>
            <tr>
              <td><strong>Trust & Verification</strong></td>
              <td>Selfie check only; rampant career/education catfishing</td>
              <td>Unverified self-reported salary slips</td>
              <td><strong>Cryptographic eLitmus Alumni Graph (Batch, Alma Mater, Work Domain) + Zero Raw Score Leak</strong></td>
            </tr>
            <tr>
              <td><strong>Workplace Privacy</strong></td>
              <td>High risk of being seen by boss/HR/team; requires paid incognito</td>
              <td>Public family-managed directories</td>
              <td><strong>Free Automatic Coworker & Batchmate Domain Firewall</strong> (blocks <code>@yourcompany.com</code>)</td>
            </tr>
            <tr>
              <td><strong>Conversation Quality</strong></td>
              <td>Hoarding 50+ matches → "Hey wsp" → 85% ghosting</td>
              <td>Awkward formal phone calls</td>
              <td><strong>Max 3 Focused Chemistry Slots + Co-Op Dilemma Icebreakers + Karma-Rewarded Graceful Closure</strong></td>
            </tr>
            <tr>
              <td><strong>Customer Acquisition Cost (CAC)</strong></td>
              <td>₹1,200 – ₹2,400 per install on Meta/Google ads</td>
              <td>₹3,500+ TV & performance marketing</td>
              <td><strong>~₹18 Organic CAC</strong> via eLitmus 1M+ (2020–2023 batch) alumni graph & "pH Archetype Wrapped"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 2. Interactive Revenue & Unit Economics Simulator -->
      <div class="section-grid-2" style="margin-bottom: 22px;">
        <div class="panel-card">
          <h3>2️⃣ Interactive Revenue & Unit Economics Simulator</h3>
          <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:14px;">
            Adjust the sliders to stress-test how eLitmus monetizes the 1,000,000+ (2020–2023 batch) alumni pool across 3 revenue streams (Subscriptions, B2B2C Safe-Date Venues, and Offline Curated Mixers):
          </p>

          <div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>1M Alumni Activation Rate (%)</span>
              <strong>${sim.activationPct}% (${activeUsers.toLocaleString()} MAU)</strong>
            </div>
            <input type="range" min="2" max="25" step="0.5" value="${sim.activationPct}" style="width:100%; accent-color:#6366f1;"
              oninput="window.ph7App.updateRevSlider('activationPct', this.value)" />
          </div>

          <div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>Equilibrium+ Paid Conversion (%)</span>
              <strong>${sim.paidConversionPct}% (${payingUsers.toLocaleString()} Subscribers)</strong>
            </div>
            <input type="range" min="3" max="18" step="0.5" value="${sim.paidConversionPct}" style="width:100%; accent-color:#6366f1;"
              oninput="window.ph7App.updateRevSlider('paidConversionPct', this.value)" />
          </div>

          <div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>Fair-Price Monthly ARPPU (₹)</span>
              <strong>₹${sim.monthlyArppu} / month</strong>
            </div>
            <input type="range" min="199" max="799" step="50" value="${sim.monthlyArppu}" style="width:100%; accent-color:#6366f1;"
              oninput="window.ph7App.updateRevSlider('monthlyArppu', this.value)" />
          </div>

          <div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>Monthly Partner Safe-Date Bookings (B2B2C)</span>
              <strong>${sim.monthlyDatePasses.toLocaleString()} Dates / mo</strong>
            </div>
            <input type="range" min="500" max="15000" step="250" value="${sim.monthlyDatePasses}" style="width:100%; accent-color:#6366f1;"
              oninput="window.ph7App.updateRevSlider('monthlyDatePasses', this.value)" />
          </div>
        </div>

        <div class="panel-card">
          <h3>📈 Live Projected Financial Output</h3>
          <div class="kpi-grid">
            <div class="kpi-box" style="border-color: var(--accent-emerald);">
              <div class="kpi-lbl">Annual Run Rate (ARR)</div>
              <div class="kpi-val" style="color:#34d399;">₹${arrCrores} Cr</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">High-margin recurring + B2B2C</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-lbl">Monthly Revenue (MRR)</div>
              <div class="kpi-val">₹${(totalMrrRs / 100000).toFixed(2)} L</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">Subs + Venues + Offline Mixers</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-lbl">Subscription Stream</div>
              <div class="kpi-val">₹${(subMrrRs / 100000).toFixed(2)} L/mo</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">${payingUsers.toLocaleString()} × ₹${sim.monthlyArppu}</div>
            </div>
            <div class="kpi-box">
              <div class="kpi-lbl">Offline Mixers + Venues</div>
              <div class="kpi-val">₹${((venueMrrRs + mixerMrrRs) / 100000).toFixed(2)} L/mo</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">Zero inventory risk B2B2C</div>
            </div>
          </div>

          <div style="margin-top:16px; padding:14px; background:rgba(15,23,42,0.8); border-radius:12px; font-size:0.82rem; color:var(--text-secondary);">
            💡 <strong>Why This Fits eLitmus's Core DNA:</strong> By generating <strong>₹${arrCrores} Cr ARR</strong> at ~84% gross margin from alumni who graduated 3–6 years ago, eLitmus can subsidize the pH Hiring Test for fresh undergraduate candidates from tier-2/3 colleges—creating a self-reinforcing social & financial flywheel!
          </div>
        </div>
      </div>

      <!-- 3. User Acquisition Playbook & 4. Legal/Regulatory Architecture -->
      <div class="section-grid-2">
        <div class="panel-card">
          <h3>3️⃣ GTM & User Acquisition Strategy (Solving Cold-Start & Gender Ratio)</h3>
          <ul style="padding-left:18px; font-size:0.85rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:10px; margin-top:10px;">
            <li>
              <strong style="color:#fff;">Hook #1: "Your eLitmus pH Cognitive Archetype Wrapped" (Zero-CAC Viral Trigger)</strong><br/>
              Instead of sending a spammy "Join our dating app" email to 1M alumni, we send an interactive <em>"2020–2023 Career & Mindset Archetype Report"</em> unlocking their pH Persona (<em>Systems Architect, Empathetic Strategist, Creative Catalyst</em>). At the bottom: <em>"See which of the 42,000 verified alumni in Bengaluru share your 95%+ pH Equilibrium."</em>
            </li>
            <li>
              <strong style="color:#fff;">Hook #2: Gender-Balanced Batch & Hub Drops (Preventing the 80:20 Male Skew)</strong><br/>
              Traditional dating apps die when the ratio hits 80% men. pH7 uses <strong>Controlled Cohort Unlocks</strong> in Bengaluru, Hyderabad, Pune, and NCR—admitting batches in 50:50 gender-balanced waves and giving women full <strong>Coworker Cloaking + Karma-Gated Inboxes</strong> (only men with ≥90 Accountability Karma can initiate).
            </li>
            <li>
              <strong style="color:#fff;">Hook #3: Corporate Park Offline "Board-Game & Pour-Over" Mixers</strong><br/>
              Partnering with specialty cafes near Indiranagar, Bellandur, Hitec City, and Baner for Thursday evening "No-Small-Talk" alumni table mixers.
            </li>
          </ul>
        </div>

        <div class="panel-card">
          <h3>4️⃣ Legal, Privacy (DPDP Act 2023) & Safety Compliance</h3>
          <ul style="padding-left:18px; font-size:0.85rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:10px; margin-top:10px;">
            <li>
              <strong style="color:#6ee7b7;">DPDP Act 2023 (Digital Personal Data Protection Act) Purpose Limitation Firewall:</strong><br/>
              Candidate data collected for <em>job assessment</em> cannot legally be auto-published onto a dating app without explicit, granular opt-in consent. pH7 operates as a separate data fiduciary module: users explicitly trigger <strong>"Import eLitmus pH ID"</strong> with a cryptographically signed Consent Ledger, and raw pH hiring scores are strictly one-way mapped into non-sensitive Archetype Badges.
            </li>
            <li>
              <strong style="color:#6ee7b7;">POSH Act & Corporate Employer Liability Protection:</strong><br/>
              Because eLitmus has deep B2B corporate relationships, we must never create workplace harassment vectors. Our mandatory-default <strong>Coworker Domain Firewall</strong> prevents intra-company matching by default and blocks corporate recruiters from viewing candidate dating profiles.
            </li>
            <li>
              <strong style="color:#6ee7b7;">IT Rules 2021 Intermediary Guidelines & Physical Date Safety:</strong><br/>
              Built-in 24-hour Grievance Officer escalation, automated anti-harassment detection, and <strong>Ask-for-Angela Verified Safe-Date Venues</strong> where partner cafe staff are trained to assist any user who shows their pH7 Safe-Date Pass.
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     MODALS & INTERACTIVE FLOWS
     ========================================================================== */
  function closeModal() {
    const modal = document.getElementById("modalContainer");
    if (modal) {
      modal.style.display = "none";
      modal.innerHTML = "";
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
                <strong>eLitmus Verified Overlap:</strong><br/>
                ${u.collegeTier} (${u.cognitiveArchetype}) × ${candidate.collegeTier} (${candidate.cognitiveArchetype})
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

  function openAdvanceChemistryModal(candidateId) {
    const matchItem =
      state.discoverData &&
      state.discoverData.matches.find((m) => m.candidate.id === candidateId);
    if (!matchItem) return;
    const { candidate, equilibrium, revealStage } = matchItem;

    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
        <div class="modal-content" style="max-width:540px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3>⚡ Sync Wavelength with ${candidate.name}</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:14px;">
            You and <strong>${candidate.name}</strong> have a <strong>${equilibrium.overallScore}% pH Equilibrium</strong> (${equilibrium.exactDilemmaMatches}/5 Dilemmas Aligned).
            Send a thoughtful Mind-Note referencing her prompt or dilemma stance to advance from <strong>Stage ${revealStage} → Stage ${Math.min(3, revealStage + 1)} Progressive Reveal</strong> and assign 1 of your 3 Focused Chemistry Slots!
          </p>

          <div class="mind-prompt-box" style="margin-bottom:14px;">
            <div class="mind-prompt-label">${candidate.name.split(" ")[0]}'s Green Flag Prompt</div>
            <div>"${candidate.prompts && candidate.prompts[0] ? candidate.prompts[0].answer : candidate.headline}"</div>
          </div>

          <div class="form-group">
            <label>Your Wavelength Opener (No plain "Hey" allowed!):</label>
            <textarea id="advanceNoteTextarea" class="form-input" rows="3">Loved seeing that we both picked the same stance on the Startup ESOP vs. Stability dilemma! As a fellow ${candidate.batchYear} era eLitmus alum, what's the most interesting problem you're tinkering with at ${candidate.company} lately?</textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
            <button class="btn btn-secondary" onclick="window.ph7App.closeModal()">Cancel</button>
            <button class="btn btn-primary" onclick="window.ph7App.submitAdvanceChemistry('${candidate.id}')">
              🧪 Unlock Chemistry Slot & Unblur
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function submitAdvanceChemistry(candidateId) {
    const noteEl = document.getElementById("advanceNoteTextarea");
    const noteText = noteEl ? noteEl.value : "";
    try {
      const res = await apiFetch("/api/chemistry/advance", {
        method: "POST",
        body: JSON.stringify({
          userId: state.currentUserId,
          candidateId,
          noteText
        })
      });
      closeModal();
      showToast(`✨ ${res.message}`);
      state.selectedConversationId = res.conversation.id;
      state.activeTab = "chemistry";
      await loadAllState();
    } catch (err) {
      if (err.code === "SLOTS_FULL") {
        closeModal();
        showToast(`⚠️ ${err.message}`);
        state.activeTab = "chemistry";
        renderMainWorkspace();
      } else {
        showToast(`⚠️ ${err.message}`);
      }
    }
  }

  function openGracefulCloseModal(conversationId) {
    const conv =
      state.conversationsData &&
      state.conversationsData.conversations.find((c) => c.id === conversationId);
    if (!conv) return;
    const pName = conv.partner ? conv.partner.name : "Match";

    const reasons = [
      `Really enjoyed our conversation ${pName.split(" ")[0]}—realized I'm focusing deeply on another match right now and wanted to give you honest closure rather than ever ghosting!`,
      `Loved your perspective on career & life architecture! Our city/relocation timelines look a bit different right now—wishing you the absolute best.`,
      `Work sprint is taking 100% of my bandwidth for the next few weeks—closing my slot respectfully so you aren't left waiting on slow replies!`
    ];

    const modal = document.getElementById("modalContainer");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) window.ph7App.closeModal()">
        <div class="modal-content" style="max-width:540px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3>🕊️ Anti-Ghosting Graceful Closure Protocol</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:14px;">
            Ghosting hurts trust. Sending a kind, clear closure to <strong>${pName}</strong> frees up <strong>1 of your 3 Focused Chemistry Slots</strong> and rewards you with <strong>+2 Accountability Karma & +10 Credits</strong>.
          </p>

          <div class="form-group">
            <label>Choose or customize your kind closure note:</label>
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
              🕊️ Send Kind Closure (+2 Karma)
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
            <h3>🥂 Verified Safe-Date Concierge (B2B2C Alumni Perks)</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
          </div>
          <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:14px;">
            Skip awkward first-date logistics. Pick a curated <strong>pH7 Verified Safe-Zone Venue</strong>—you both get an instant <strong>eLitmus Alumni Privilege Perk</strong>, a fair Split-the-Bill option, and <strong>Ask-for-Angela Staff Safety Verification</strong>.
          </p>

          <div class="form-group">
            <label>Select Partnered Safe-Zone Venue:</label>
            <select id="safeDateVenueSelect" class="form-select">
              ${venues
                .map(
                  (v) =>
                    `<option value="${v.id}">${v.city} — ${v.name} (${v.area}) • ${v.elitmusPerk}</option>`
                )
                .join("")}
            </select>
          </div>

          <div class="form-group">
            <label>Preferred Date & Time Slot:</label>
            <input type="text" id="safeDateTimeInput" class="form-input" value="This Saturday • 5:30 PM (Evening Pour-Over & Board Games)" />
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
            <button class="btn btn-secondary" onclick="window.ph7App.closeModal()">Cancel</button>
            <button class="btn btn-emerald" onclick="window.ph7App.submitSafeDateBooking('${conversationId}')">
              🥂 Mint Verified Safe-Date Pass
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function submitSafeDateBooking(conversationId) {
    const venueId = document.getElementById("safeDateVenueSelect").value;
    const dateTime = document.getElementById("safeDateTimeInput").value;
    try {
      const res = await apiFetch("/api/conversations/book-safe-date", {
        method: "POST",
        body: JSON.stringify({ conversationId, venueId, dateTime })
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
              <h3>🔑 Alumni Login (or Evaluator Credentials)</h3>
              <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
            </div>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px;">
              Use any seeded eLitmus account below (Password for all demo accounts: <code>password123</code>):
              <br/>• <code>aarav@elitmus.com</code> (2022 Batch • SDE-2 @ Razorpay)
              <br/>• <code>ananya@elitmus.com</code> (2021 Batch • PM @ Swiggy)
              <br/>• <code>meera@elitmus.com</code> (2020 Batch • Designer @ Atlassian)
              <br/>• <code>rohan@elitmus.com</code> (2021 Batch • Applied AI @ Microsoft)
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
                  New User? Import eLitmus pH ID →
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
          <div class="modal-content" style="max-width:580px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3>✨ 1-Click eLitmus pH ID Verification & Onboarding</h3>
              <button class="btn btn-secondary btn-sm" onclick="window.ph7App.closeModal()">✕</button>
            </div>
            <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px;">
              Experience how eLitmus converts its 1,000,000+ (2020–2023 batch) database with zero friction. Enter a sample eLitmus pH ID (e.g., <code>EL-2023-10492</code>, <code>EL-2022-66201</code>, or <code>EL-2021-50019</code>) and click <strong>Verify pH Passport</strong> to auto-fill verified credentials!
            </p>

            <div style="display:flex; gap:8px; margin-bottom:16px;">
              <input type="text" id="regPhIdInput" class="form-input" value="EL-2023-10492" placeholder="EL-2023-10492" />
              <button type="button" class="btn btn-emerald" onclick="window.ph7App.verifyElitmusId()">
                ✓ Verify pH ID
              </button>
            </div>

            <form onsubmit="event.preventDefault(); window.ph7App.submitRegistration();">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" id="regName" class="form-input" value="Siddharth Kulkarni" required />
                </div>
                <div class="form-group">
                  <label>Work / Alumni Email</label>
                  <input type="email" id="regEmail" class="form-input" value="siddharth@elitmus.com" required />
                </div>
                <div class="form-group">
                  <label>Graduating Batch (2020–2023)</label>
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
                  <label>Verified Alma Mater</label>
                  <input type="text" id="regCollege" class="form-input" value="VIT Vellore (B.Tech CSE '23)" />
                </div>
                <div class="form-group">
                  <label>Current Company (Auto-Cloaked)</label>
                  <input type="text" id="regCompany" class="form-input" value="PhonePe" />
                </div>
                <div class="form-group">
                  <label>Role</label>
                  <input type="text" id="regRole" class="form-input" value="Software Development Engineer" />
                </div>
                <div class="form-group">
                  <label>City Hub</label>
                  <input type="text" id="regCity" class="form-input" value="Bengaluru" />
                </div>
              </div>

              <div class="form-group">
                <label>Headline / Mind Prompt</label>
                <input type="text" id="regHeadline" class="form-input" value="2023 eLitmus alum building high-throughput systems and hunting for the best filter coffee in Indiranagar." />
              </div>

              <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
                <button type="button" class="btn btn-secondary" onclick="window.ph7App.closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary" style="flex:0 0 auto;">🚀 Mint Trust Passport & Join</button>
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
      document.getElementById("regRole").value = rec.role;
      document.getElementById("regCity").value = rec.city;
      showToast(`✅ Verified ${rec.elitmusPhId}: ${rec.cognitiveArchetype} (${rec.college})`);
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
      batchYear: Number(document.getElementById("regBatch").value),
      gender,
      lookingFor: gender === "Female" ? "Male" : "Female",
      college: document.getElementById("regCollege").value,
      company: document.getElementById("regCompany").value,
      role: document.getElementById("regRole").value,
      city: document.getElementById("regCity").value,
      headline: document.getElementById("regHeadline").value
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

  /* ==========================================================================
     PUBLIC ACTIONS EXPOSED ON window.ph7App
     ========================================================================== */
  window.ph7App = {
    switchTab(tabName) {
      state.activeTab = tabName;
      renderMainWorkspace();
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
          showToast("🎉 Stage 3 Full Crystal Reveal Unlocked! Portrait is now 100% unblurred.");
        }
        await loadAllState();
      } catch (err) {
        showToast(`⚠️ ${err.message}`);
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
        showToast(`🎲 Launched Co-Op Icebreaker: ${ice.title}`);
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

    async upgradeSubscription(planName) {
      try {
        const res = await apiFetch("/api/profile/subscription", {
          method: "POST",
          body: JSON.stringify({
            userId: state.currentUserId,
            planName
          })
        });
        showToast(`💎 ${res.message}`);
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
        } catch (e) {
          // Ignore speech synthesis errors on headless browsers
        }
      }
    },

    async resetDemoData() {
      try {
        const res = await apiFetch("/api/admin/reset", { method: "POST" });
        state.currentUserId = "usr_aarav";
        state.selectedConversationId = null;
        await loadAllState();
        showToast(`↺ ${res.message}`);
      } catch (err) {
        showToast(`⚠️ ${err.message}`);
      }
    },

    openEquilibriumModal,
    openAdvanceChemistryModal,
    submitAdvanceChemistry,
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
