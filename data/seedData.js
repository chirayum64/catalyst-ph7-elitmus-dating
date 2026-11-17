/**
 * Catalyst (pH7) by eLitmus — Seed Database
 * Combines:
 * 1. Curated Weekly Small-Group Tables (4-6 Verified Alumni, ₹0-₹300 Budget Caps)
 * 2. Asymmetric 2-Player "Duet Puzzle" (Real-time reasoning & communication warm-up)
 * 3. Morning-After Mutual "Spark Reveal" (Chat opens only after meeting & mutual pick)
 * 4. 4-Rung Verification Trust Ladder + Coworker Domain Firewall + Shared-Memory pH Icebreakers
 * 5. 5-Axis Life-Architecture Compatibility & Live Scam Shield
 */

const WEEKLY_DROP_TABLES = [
  {
    id: "tbl_blr_filter_coffee",
    title: "Table #14: Sunday Filter Coffee & Unstrangering Walk",
    city: "Bengaluru",
    area: "Cubbon Park Conservatory → Airlines Hotel Lawn",
    dayTime: "This Sunday • 4:30 PM – 6:30 PM",
    budgetCap: "₹120 – ₹220 per person (Pay own bill)",
    seatFeeRs: 99,
    intentFilter: "Serious / Intentional Dating",
    dietaryFriendly: "Veg & Non-Veg Friendly",
    languages: "English, Hindi, Kannada, Tamil",
    venuePartnerPerk: "Reserved Shaded Garden Table + Zero Cover Charge",
    safetyProtocol: "Verified Public Venue • Catalyst Host Check-In • Safe-Date Co-Pilot Active",
    status: "4 of 6 Verified Seats Confirmed (50:50 Gender Balanced)",
    checkInCode: "CAT-BLR-408",
    seats: [
      {
        userId: "usr_aarav",
        name: "Aarav M.",
        batch: "2022 Batch",
        hometown: "Jaipur → Relocated to BLR",
        role: "SDE-2",
        trustRung: 4,
        sharedMemory: "Both wrote the eLitmus pH test in Aug 2022 & moved to Bengaluru for first tech role"
      },
      {
        userId: "usr_ananya",
        name: "Ananya I.",
        batch: "2021 Batch",
        hometown: "Mumbai → Relocated to BLR",
        role: "Product Manager",
        trustRung: 4,
        sharedMemory: "Both wrote the pH test in Western Zone & love strategy board games"
      },
      {
        userId: "usr_meera",
        name: "Meera K.",
        batch: "2020 Batch",
        hometown: "Coimbatore → Relocated to BLR",
        role: "Product Designer",
        trustRung: 4,
        sharedMemory: "Both attended tier-2 engineering colleges & relocated to HSR/Indiranagar"
      },
      {
        userId: "usr_rohan",
        name: "Rohan V.",
        batch: "2021 Batch",
        hometown: "Chandigarh → BLR/HYD",
        role: "Applied AI Eng",
        trustRung: 3,
        sharedMemory: "Both solved the pH analytical section in top percentile (score hidden)"
      },
      {
        userId: "usr_shreya",
        name: "Shreya N.",
        batch: "2021 Batch",
        hometown: "Kochi → Relocated to BLR",
        role: "Brand Strategist",
        trustRung: 4,
        sharedMemory: "Both relocated to Indiranagar in 2022 & host weekend book/board-game nights"
      }
    ]
  },
  {
    id: "tbl_blr_boardgames",
    title: "Table #19: Strategy Board-Game & Masala Chai Mixer",
    city: "Bengaluru",
    area: "The Boardroom Loft, Koramangala 4th Block",
    dayTime: "This Sunday • 6:00 PM – 8:00 PM",
    budgetCap: "₹180 – ₹280 per person",
    seatFeeRs: 99,
    intentFilter: "Dating, Open to Serious",
    dietaryFriendly: "All Diets",
    languages: "English, Hindi",
    venuePartnerPerk: "Free Strategy Game Library Pass + Complimentary Ginger Chai",
    safetyProtocol: "Verified Safe-Zone • Staff Trained in Ask-for-Angela Protocol",
    status: "5 of 6 Verified Seats Confirmed (1 Spot Left)",
    checkInCode: "CAT-KOR-912",
    seats: [
      {
        userId: "usr_kavya",
        name: "Kavya D.",
        batch: "2023 Batch",
        hometown: "Pune → Relocated to BLR",
        role: "Backend Systems Eng",
        trustRung: 4,
        sharedMemory: "Both graduated in 2022-23 cohort & run Sunday morning 5Ks"
      },
      {
        userId: "usr_diya",
        name: "Diya C.",
        batch: "2022 Batch",
        hometown: "Kolkata → Relocated to BLR",
        role: "Applied ML Scientist",
        trustRung: 4,
        sharedMemory: "Both wrote eLitmus pH test in final year & love indie theatre"
      }
    ]
  },
  {
    id: "tbl_blr_bookstore",
    title: "Table #23: Zero-Spend Bookstore Walk & ₹80 Darshini Dosa",
    city: "Bengaluru",
    area: "Blossoms Book House (Church Street) → Indian Coffee House",
    dayTime: "Saturday • 5:00 PM – 7:00 PM",
    budgetCap: "₹0 – ₹150 per person (Ultra Budget-Friendly)",
    seatFeeRs: 49,
    intentFilter: "Friends First → Dating",
    dietaryFriendly: "Pure Veg Venue",
    languages: "English, Hindi, Kannada",
    venuePartnerPerk: "Curated 'Pick-a-Book-for-Your-Partner' Icebreaker Cards",
    safetyProtocol: "High-Footfall Daylight Venue • Safe-Date Co-Pilot Active",
    status: "4 of 6 Verified Seats Confirmed",
    checkInCode: "CAT-CHU-204",
    seats: [
      {
        userId: "usr_meera",
        name: "Meera K.",
        batch: "2020 Batch",
        hometown: "Coimbatore → BLR",
        role: "Product Designer",
        trustRung: 4,
        sharedMemory: "Shared love for systems thinking & indie bookstores"
      }
    ]
  }
];

const DUET_PUZZLES = [
  {
    id: "duet_cafe_seating",
    title: "The Indiranagar Table Logic Duet (3-Min Co-Op Warm-Up)",
    description:
      "You and your table co-player each see ONLY HALF the clues. Share what matters, ask smart questions, and deduce which seat (1 to 4) the Architect sits in!",
    yourClues: [
      "Clue A1 (Only You See This): There are 4 seats in a row (Seat 1, Seat 2, Seat 3, Seat 4).",
      "Clue A2 (Only You See This): The Designer sits immediately to the left of the Founder.",
      "Clue A3 (Only You See This): The Architect does NOT sit at either end (so Architect is in Seat 2 or Seat 3)."
    ],
    partnerClues: [
      "Clue B1 (Ananya's Screen): The Founder is sitting in Seat 4 (the rightmost corner booth).",
      "Clue B2 (Ananya's Screen): The Researcher sits in Seat 1 (nearest the pour-over bar)."
    ],
    options: [
      { id: "seat_1", label: "Seat 1 (Left End)" },
      { id: "seat_2", label: "Seat 2 (Inner Left) — Correct!" },
      { id: "seat_3", label: "Seat 3 (Inner Right)" },
      { id: "seat_4", label: "Seat 4 (Right End)" }
    ],
    correctOptionId: "seat_2",
    explanation:
      "Since Partner Clue B1 puts Founder in Seat 4, and Your Clue A2 puts Designer immediately left of Founder (Seat 3), and Partner Clue B2 puts Researcher in Seat 1, the Architect must be in Seat 2!",
    generatedDuetNote:
      "⚡ Duet Collaboration Note: You and Ananya solved the asymmetric puzzle in 78 seconds! Style: Balanced Turn-Taking (You synthesized structural constraints first; Ananya volunteered exact anchor positions without prompting). Suggested IRL Table Icebreaker: Ask each other about a project where unclear requirements caused chaos!"
  }
];

const DILEMMA_BANK = [
  {
    id: "dil_career_leap",
    category: "Career & Risk Appetite",
    title: "The Startup ESOP vs. Stability Crossroads",
    scenario: "Your partner gets an offer to join a 10-person AI startup at a 25% pay cut with high ESOP upside, right when you both planned to upgrade apartments. What's your instinct?",
    options: [
      {
        id: "opt_a",
        label: "Back the swing — keep fixed rent low for 18 months & bet on asymmetric upside.",
        archetypeTag: "Asymmetric Builder",
        axisImpact: { careerAmbitionTempo: 90, financialThermostat: 75 }
      },
      {
        id: "opt_b",
        label: "Set a 12-month runway cap with clear milestones before touching joint savings.",
        archetypeTag: "Measured Strategist",
        axisImpact: { careerAmbitionTempo: 75, financialThermostat: 92 }
      },
      {
        id: "opt_c",
        label: "Prioritize predictable cashflow & work-life peace over paper equity right now.",
        archetypeTag: "Equilibrium Guardian",
        axisImpact: { careerAmbitionTempo: 55, financialThermostat: 85 }
      }
    ]
  },
  {
    id: "dil_sunday_rhythm",
    category: "Social Battery & Lifestyle",
    title: "The Ideal Sunday 6:00 PM in the City",
    scenario: "After a high-intensity work week, what does a genuinely restorative Sunday evening look like for the two of you?",
    options: [
      {
        id: "opt_a",
        label: "Brewing pour-over coffee, deep rabbit-hole conversation, or co-reading in silence.",
        archetypeTag: "Deep-Dive Introvert",
        axisImpact: { intellectualCuriosity: 92, socialBattery: 35 }
      },
      {
        id: "opt_b",
        label: "Hosting 4 close friends for board games, homemade pasta, and spirited debate.",
        archetypeTag: "Curated Connector",
        axisImpact: { intellectualCuriosity: 84, socialBattery: 72 }
      },
      {
        id: "opt_c",
        label: "Spontaneous live gig, bouldering session, or exploring a new neighborhood food trail.",
        archetypeTag: "Kinetic Explorer",
        axisImpact: { intellectualCuriosity: 78, socialBattery: 92 }
      }
    ]
  },
  {
    id: "dil_conflict_protocol",
    category: "Communication & Conflict",
    title: "When We Disagree at 11:00 PM",
    scenario: "A tense disagreement pops up late at night before a busy workday. How do you prefer to resolve friction?",
    options: [
      {
        id: "opt_a",
        label: "Debug it live with radical candor — I can't sleep with unresolved tension.",
        archetypeTag: "Real-Time Debugger",
        axisImpact: { conflictDirectness: 92, intellectualCuriosity: 82 }
      },
      {
        id: "opt_b",
        label: "Acknowledge we're on the same team, pause for sleep, and talk over morning chai.",
        archetypeTag: "Reflective Diplomat",
        axisImpact: { conflictDirectness: 68, intellectualCuriosity: 85 }
      },
      {
        id: "opt_c",
        label: "Write down our perspectives first so emotions don't hijack the logic.",
        archetypeTag: "Async Communicator",
        axisImpact: { conflictDirectness: 52, intellectualCuriosity: 90 }
      }
    ]
  },
  {
    id: "dil_money_philosophy",
    category: "Financial Thermostat",
    title: "Budget-First Dates vs. Extravagant Dining",
    scenario: "Half of Gen Z & young millennials say dating costs hurt their financial goals. What's your ideal early-dating philosophy?",
    options: [
      {
        id: "opt_a",
        label: "₹150 filter coffee walk or bookstore browse — chemistry doesn't need a ₹3,000 bill.",
        archetypeTag: "Grounded Minimalist",
        axisImpact: { financialThermostat: 95, careerAmbitionTempo: 85 }
      },
      {
        id: "opt_b",
        label: "Curated ₹250–₹400 activity (board games, pottery, food trail) split 50:50 via UPI.",
        archetypeTag: "Balanced Compounder",
        axisImpact: { financialThermostat: 84, socialBattery: 75 }
      },
      {
        id: "opt_c",
        label: "Keep first meetups ₹200 cap, save nicer dinners for celebratory milestones.",
        archetypeTag: "Intentional Planner",
        axisImpact: { financialThermostat: 88, careerAmbitionTempo: 88 }
      }
    ]
  },
  {
    id: "dil_relocation_horizon",
    category: "Life Architecture (Migrant Professional Reality)",
    title: "Relocated in a Metro & Dual-Career Geometry",
    scenario: "Most 2020–2023 grads relocated away from hometowns for work. How do you view roots, parents, and future cities?",
    options: [
      {
        id: "opt_a",
        label: "Build our home base in a tier-1 tech hub (BLR/HYD/NCR) while visiting parents often.",
        archetypeTag: "Metro Builder",
        axisImpact: { careerAmbitionTempo: 90, conflictDirectness: 80 }
      },
      {
        id: "opt_b",
        label: "Open to global or cross-metro moves for the next 4 years, then anchor in one city.",
        archetypeTag: "Relay Explorer",
        axisImpact: { careerAmbitionTempo: 86, financialThermostat: 88 }
      },
      {
        id: "opt_c",
        label: "Transition to remote/hybrid over time to stay closer to family & quieter cities.",
        archetypeTag: "Rooted Equilibrium",
        axisImpact: { intellectualCuriosity: 88, socialBattery: 65 }
      }
    ]
  }
];

const SAFE_DATE_VENUES = [
  {
    id: "venue_blr_1",
    name: "Araku Coffee & Sensory Lab",
    city: "Bengaluru",
    area: "Indiranagar 12th Main",
    vibe: "Specialty Pour-Over • Quiet Acoustics • Budget-Cap Friendly",
    elitmusPerk: "₹190 Catalyst Pour-Over Pass + Reserved Table",
    safetyBadge: "Catalyst Safe-Zone • Staff Trained in Ask-for-Angela Protocol",
    avgSplitCost: "₹190 per person",
    rating: 4.9
  },
  {
    id: "venue_blr_2",
    name: "The Boardroom & Brews Loft",
    city: "Bengaluru",
    area: "Koramangala 4th Block",
    vibe: "250+ Strategy Board Games • Zero Awkward Small Talk",
    elitmusPerk: "Free Game Library Pass + ₹150 Craft Kombucha/Chai",
    safetyBadge: "Catalyst Safe-Zone • Verified Check-In Desk",
    avgSplitCost: "₹220 per person",
    rating: 4.8
  },
  {
    id: "venue_blr_3",
    name: "Blossoms Book House & Indian Coffee House",
    city: "Bengaluru",
    area: "Church Street",
    vibe: "Bookstore Browse + Iconic ₹80 Filter Coffee & Dosa",
    elitmusPerk: "Book-Swap Prompt Card + Priority Seating",
    safetyBadge: "Catalyst Safe-Zone • High-Footfall Daylight Venue",
    avgSplitCost: "₹110 per person",
    rating: 4.9
  },
  {
    id: "venue_hyd_1",
    name: "Roastery Coffee House Courtyard",
    city: "Hyderabad",
    area: "Banjara Hills",
    vibe: "Lush Leafy Courtyard • Great Evening Conversations",
    elitmusPerk: "₹220 Alumni Cap Menu + Priority Courtyard Table",
    safetyBadge: "Catalyst Safe-Zone • Safe Drop Verified",
    avgSplitCost: "₹220 per person",
    rating: 4.9
  },
  {
    id: "venue_pune_1",
    name: "Pagdandi Books Chai Cafe",
    city: "Pune",
    area: "Baner",
    vibe: "Indie Bookstore • Acoustic Evenings • Deep Conversations",
    elitmusPerk: "Complimentary Book Swap Voucher + ₹120 Artisanal Chai Pot",
    safetyBadge: "Catalyst Safe-Zone • Community Verified",
    avgSplitCost: "₹150 per person",
    rating: 4.8
  }
];

const COOP_ICEBREAKERS = [
  {
    id: "ice_shared_ph",
    title: "Shared eLitmus Memory Trigger",
    prompt: "We both wrote the eLitmus pH Test in 2021–22 and relocated to Bengaluru for our first tech jobs! What was your very first week in the city like?"
  },
  {
    id: "ice_1",
    title: "2 Truths & 1 Career Plot-Twist",
    prompt: "Drop two real facts about your life since graduation and one plausible lie. Let your match debug which one is fake!"
  },
  {
    id: "ice_2",
    title: "The ₹200 Ideal Sunday Challenge",
    prompt: "If we had a strict ₹200 budget this Sunday in the city to have the most memorable 2-hour hangout, what's our blueprint?"
  },
  {
    id: "ice_3",
    title: "Migrant In The Metro Confession",
    prompt: "What is one thing from your hometown you still miss every week after moving to this metro for work?"
  }
];

const USERS = [
  {
    id: "usr_aarav",
    email: "aarav@elitmus.com",
    password: "password123",
    elitmusPhId: "EL-2022-88412",
    name: "Aarav Mehta",
    age: 25,
    gender: "Male",
    lookingFor: "Female",
    batchYear: 2022,
    hometown: "Jaipur",
    relocatedYear: 2022,
    phTestMemory: "Wrote pH Test in Aug 2022 (Jaipur Center) • Class 10/12 & B.Tech Docs Verified",
    college: "NIT Surathkal (B.Tech CSE '22)",
    collegeTier: "Verified eLitmus Batch '22",
    company: "Razorpay",
    companyDomain: "razorpay.com",
    role: "Senior Product Engineer (SDE-2)",
    city: "Bengaluru",
    neighborhood: "Indiranagar",
    intent: "Serious / Intentional Dating",
    freeEvenings: ["Fri Evening", "Sat Evening", "Sun 4:30 PM"],
    diet: "Vegetarian",
    languages: ["English", "Hindi"],
    trustLadder: {
      level: 4,
      maxLevel: 4,
      phoneOtp: true,
      age18AndSelfieLiveness: true,
      elitmusCredentialDocs: true,
      peerVouchesCount: 3,
      vouchedBy: ["Ananya I. (Met at Table #11)", "Rohan V. (2021 Batch)"]
    },
    reliabilityStats: {
      showUpRatePct: 100,
      tablesAttended: 4,
      kindClosuresSent: 3,
      zeroGhostStreakWeeks: 14
    },
    avatarColor: "#6366f1",
    photoSvgSeed: "aarav",
    headline: "Relocated from Jaipur to BLR in '22. Building payment rails by day, hunting ₹80 filter coffees by evening.",
    bio: "Came to Bengaluru via the eLitmus pH route in 2022. Like most 2020–23 grads who moved cities for work, I realized big metros can feel lonely despite crowded offices. Here for genuine small-group tables and high-signal conversations.",
    voiceNoteTranscript: "Hey! If you prefer a ₹150 Cubbon Park coffee walk and board games over loud ₹4,000 clubbing, we'll get along dangerously well.",
    cognitiveArchetype: "Systems Architect",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden by Privacy Firewall)",
    karmaScore: 96,
    karmaBadges: ["100% Table Show-Up Rate", "Rung-4 Vouched", "Verified Alumni '22"],
    subscriptionTier: "Catalyst Pass Active",
    credits: 45,
    confirmedTableId: "tbl_blr_filter_coffee",
    duetCompletedWith: ["usr_ananya"],
    sparkPicks: ["usr_ananya", "usr_meera"],
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: false,
      blockedDomains: ["razorpay.com"],
      incognitoToRecruiters: true
    },
    dpdpConsent: {
      consentedAt: "2026-11-01T10:00:00Z",
      rulesVersion: "DPDP Rules (Notified 14 Nov 2025 / Effective May 2027 Ready)",
      allowIdentityVerification: true,
      allowSharedPhCityMonthMemory: true,
      employerFirewallGuaranteed: true
    },
    wavelengthVector: {
      intellectualCuriosity: 92,
      careerAmbitionTempo: 86,
      financialThermostat: 88,
      socialBattery: 64,
      conflictDirectness: 78
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_b",
      dil_sunday_rhythm: "opt_b",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_a",
      dil_relocation_horizon: "opt_a"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "When someone gets visibly excited explaining a niche topic I know nothing about—and treats café staff with warmth."
      },
      {
        question: "Shared Migrant-in-the-Metro Reality",
        answer: "Moved to BLR in 2022 knowing zero people. Built a close Sunday board-game circle and looking for a true partner-in-crime."
      }
    ],
    revealStages: {
      usr_ananya: 3,
      usr_meera: 2,
      usr_kavya: 1,
      usr_diya: 1,
      usr_shreya: 2
    }
  },
  {
    id: "usr_ananya",
    email: "ananya@elitmus.com",
    password: "password123",
    elitmusPhId: "EL-2021-41908",
    name: "Ananya Iyer",
    age: 26,
    gender: "Female",
    lookingFor: "Male",
    batchYear: 2021,
    hometown: "Mumbai",
    relocatedYear: 2021,
    phTestMemory: "Wrote pH Test in Aug 2021 • Class 10/12 & VJTI Degree Verified",
    college: "VJTI Mumbai (B.Tech IT '21)",
    collegeTier: "Verified eLitmus Batch '21",
    company: "Swiggy",
    companyDomain: "swiggy.in",
    role: "Product Manager — Consumer",
    city: "Bengaluru",
    neighborhood: "Koramangala",
    intent: "Serious / Intentional Dating",
    freeEvenings: ["Sat Evening", "Sun 4:30 PM"],
    diet: "Vegetarian",
    languages: ["English", "Hindi", "Tamil", "Marathi"],
    trustLadder: {
      level: 4,
      maxLevel: 4,
      phoneOtp: true,
      age18AndSelfieLiveness: true,
      elitmusCredentialDocs: true,
      peerVouchesCount: 4,
      vouchedBy: ["Meera K.", "Shreya N."]
    },
    reliabilityStats: {
      showUpRatePct: 100,
      tablesAttended: 5,
      kindClosuresSent: 4,
      zeroGhostStreakWeeks: 18
    },
    avatarColor: "#ec4899",
    photoSvgSeed: "ananya",
    headline: "Moved from Mumbai to BLR after my eLitmus APM offer. Here for small-group tables, zero swipe burnout.",
    bio: "78% of women on regular apps run into fake profiles or exhausting small talk. I joined Catalyst because meeting 5 verified alumni over ₹150 filter coffee in public feels 10x safer and more natural than 1:1 blind dates.",
    voiceNoteTranscript: "I judge cafés by their cortado and people by how we collaborate on the 3-minute Duet puzzle before the Sunday table!",
    cognitiveArchetype: "Empathetic Strategist",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    karmaScore: 98,
    karmaBadges: ["100% Show-Up Rate", "Rung-4 Vouched", "Verified Alumni '21"],
    subscriptionTier: "Catalyst Pass Active",
    credits: 60,
    confirmedTableId: "tbl_blr_filter_coffee",
    duetCompletedWith: ["usr_aarav"],
    sparkPicks: ["usr_aarav"],
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: true,
      blockedDomains: ["swiggy.in", "bundl.in"],
      incognitoToRecruiters: true
    },
    wavelengthVector: {
      intellectualCuriosity: 94,
      careerAmbitionTempo: 88,
      financialThermostat: 86,
      socialBattery: 70,
      conflictDirectness: 74
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_b",
      dil_sunday_rhythm: "opt_b",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_a",
      dil_relocation_horizon: "opt_a"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "Emotional maturity + intellectual playfulness. Being able to collaborate on a puzzle without talking over each other."
      }
    ],
    revealStages: {
      usr_aarav: 3,
      usr_rohan: 2,
      usr_vikram: 1
    }
  },
  {
    id: "usr_meera",
    email: "meera@elitmus.com",
    password: "password123",
    elitmusPhId: "EL-2020-19204",
    name: "Meera Krishnan",
    age: 27,
    gender: "Female",
    lookingFor: "Male",
    batchYear: 2020,
    hometown: "Coimbatore",
    relocatedYear: 2021,
    phTestMemory: "Wrote pH Test in Jan 2020 (Coimbatore) • Class 10/12 & PSG Degree Verified",
    college: "PSG Tech Coimbatore ('20)",
    collegeTier: "Verified eLitmus Batch '20",
    company: "Atlassian",
    companyDomain: "atlassian.com",
    role: "Lead Product Designer",
    city: "Bengaluru",
    neighborhood: "HSR Layout",
    intent: "Serious / Intentional Dating",
    freeEvenings: ["Sat Evening", "Sun 4:30 PM"],
    diet: "Vegetarian",
    languages: ["English", "Tamil"],
    trustLadder: {
      level: 4,
      maxLevel: 4,
      phoneOtp: true,
      age18AndSelfieLiveness: true,
      elitmusCredentialDocs: true,
      peerVouchesCount: 3,
      vouchedBy: ["Ananya I."]
    },
    reliabilityStats: {
      showUpRatePct: 100,
      tablesAttended: 3,
      kindClosuresSent: 2,
      zeroGhostStreakWeeks: 11
    },
    avatarColor: "#8b5cf6",
    photoSvgSeed: "meera",
    headline: "Designing calm software, browsing Church Street bookstores, and loving ₹150 budget-capped tables.",
    bio: "2020 pandemic batch grad who relocated from Coimbatore. Love that Catalyst skips endless texting limbo and brings 4–6 verified grads together in public first.",
    voiceNoteTranscript: "My love language is picking out a book for you at Blossoms and debating it over ₹80 Indian Coffee House filter coffee.",
    cognitiveArchetype: "Creative Catalyst",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    karmaScore: 95,
    karmaBadges: ["100% Show-Up Rate", "Rung-4 Vouched", "Verified Alumni '20"],
    subscriptionTier: "Free (Pay-Per-Table)",
    credits: 30,
    confirmedTableId: "tbl_blr_filter_coffee",
    duetCompletedWith: [],
    sparkPicks: ["usr_aarav"],
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: false,
      blockedDomains: ["atlassian.com"],
      incognitoToRecruiters: true
    },
    wavelengthVector: {
      intellectualCuriosity: 95,
      careerAmbitionTempo: 78,
      financialThermostat: 90,
      socialBattery: 48,
      conflictDirectness: 82
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_b",
      dil_sunday_rhythm: "opt_a",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_a",
      dil_relocation_horizon: "opt_c"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "Curiosity without arrogance. Knowing when to debate a point and when to listen."
      }
    ],
    revealStages: {
      usr_aarav: 2,
      usr_rohan: 3
    }
  },
  {
    id: "usr_kavya",
    email: "kavya@elitmus.com",
    password: "password123",
    elitmusPhId: "EL-2023-77319",
    name: "Kavya Deshmukh",
    age: 24,
    gender: "Female",
    lookingFor: "Male",
    batchYear: 2023,
    hometown: "Pune",
    relocatedYear: 2023,
    phTestMemory: "Wrote pH Test in Sep 2022 (Pune) • Class 10/12 & COEP Degree Verified",
    college: "COEP Pune (B.Tech Comp '23)",
    collegeTier: "Verified eLitmus Batch '23",
    company: "Zerodha (Tech)",
    companyDomain: "zerodha.com",
    role: "Backend Systems Engineer",
    city: "Bengaluru",
    neighborhood: "Jayanagar",
    intent: "Dating, Open to Serious",
    freeEvenings: ["Sun 6:00 PM"],
    diet: "Vegetarian",
    languages: ["English", "Hindi", "Marathi"],
    trustLadder: {
      level: 4,
      maxLevel: 4,
      phoneOtp: true,
      age18AndSelfieLiveness: true,
      elitmusCredentialDocs: true,
      peerVouchesCount: 2,
      vouchedBy: ["Diya C."]
    },
    reliabilityStats: {
      showUpRatePct: 100,
      tablesAttended: 2,
      kindClosuresSent: 1,
      zeroGhostStreakWeeks: 9
    },
    avatarColor: "#14b8a6",
    photoSvgSeed: "kavya",
    headline: "Low-latency Go code, Himalayan treks, and zero tolerance for 3-week texting limbo.",
    bio: "2023 batch grad! Moved from Pune to South Bangalore. Small-group board game tables are way less awkward than 1:1 interviews.",
    voiceNoteTranscript: "Let's skip texting about the weather and play Codenames at the Sunday Koramangala table!",
    cognitiveArchetype: "Pragmatic Builder",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    karmaScore: 93,
    karmaBadges: ["100% Show-Up Rate", "Verified Alumni '23"],
    subscriptionTier: "Free (Pay-Per-Table)",
    credits: 25,
    confirmedTableId: "tbl_blr_boardgames",
    duetCompletedWith: [],
    sparkPicks: [],
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: false,
      blockedDomains: ["zerodha.com"],
      incognitoToRecruiters: true
    },
    wavelengthVector: {
      intellectualCuriosity: 88,
      careerAmbitionTempo: 85,
      financialThermostat: 94,
      socialBattery: 60,
      conflictDirectness: 88
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_a",
      dil_sunday_rhythm: "opt_a",
      dil_conflict_protocol: "opt_a",
      dil_money_philosophy: "opt_a",
      dil_relocation_horizon: "opt_b"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "People who keep their word on small things—showing up on time and speaking directly."
      }
    ],
    revealStages: {
      usr_aarav: 1
    }
  },
  {
    id: "usr_diya",
    email: "diya@elitmus.com",
    password: "password123",
    elitmusPhId: "EL-2022-55102",
    name: "Diya Chatterjee",
    age: 25,
    gender: "Female",
    lookingFor: "Male",
    batchYear: 2022,
    hometown: "Kolkata",
    relocatedYear: 2022,
    phTestMemory: "Wrote pH Test in Jul 2022 (Kolkata) • Class 10/12 & Jadavpur Degree Verified",
    college: "Jadavpur University ('22)",
    collegeTier: "Verified eLitmus Batch '22",
    company: "Flipkart",
    companyDomain: "flipkart.com",
    role: "Applied ML Scientist",
    city: "Bengaluru",
    neighborhood: "Sarjapur / HSR",
    intent: "Serious / Intentional Dating",
    freeEvenings: ["Sun 6:00 PM"],
    diet: "Non-Vegetarian",
    languages: ["English", "Hindi", "Bengali"],
    trustLadder: {
      level: 4,
      maxLevel: 4,
      phoneOtp: true,
      age18AndSelfieLiveness: true,
      elitmusCredentialDocs: true,
      peerVouchesCount: 3,
      vouchedBy: ["Kavya D."]
    },
    reliabilityStats: {
      showUpRatePct: 96,
      tablesAttended: 4,
      kindClosuresSent: 3,
      zeroGhostStreakWeeks: 12
    },
    avatarColor: "#f59e0b",
    photoSvgSeed: "diya",
    headline: "Training recommendation models at work; refusing AI-written dating chats in real life.",
    bio: "I build ML ranking models for a living, which is why I distrust black-box AI matchmakers. Give me real human reasoning on the Duet puzzle and an offline table!",
    voiceNoteTranscript: "Tell me a book or film that genuinely rewired how you look at people.",
    cognitiveArchetype: "Systems Architect",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    karmaScore: 97,
    karmaBadges: ["Rung-4 Vouched", "Verified Alumni '22"],
    subscriptionTier: "Catalyst Pass Active",
    credits: 50,
    confirmedTableId: "tbl_blr_boardgames",
    duetCompletedWith: [],
    sparkPicks: [],
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: false,
      blockedDomains: ["flipkart.com"],
      incognitoToRecruiters: true
    },
    wavelengthVector: {
      intellectualCuriosity: 97,
      careerAmbitionTempo: 90,
      financialThermostat: 84,
      socialBattery: 68,
      conflictDirectness: 76
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_a",
      dil_sunday_rhythm: "opt_b",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_b",
      dil_relocation_horizon: "opt_a"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "When someone can steel-man an argument they personally disagree with."
      }
    ],
    revealStages: {
      usr_aarav: 1
    }
  },
  {
    id: "usr_shreya",
    email: "shreya@elitmus.com",
    password: "password123",
    elitmusPhId: "EL-2021-63011",
    name: "Shreya Nair",
    age: 26,
    gender: "Female",
    lookingFor: "Male",
    batchYear: 2021,
    hometown: "Kochi",
    relocatedYear: 2021,
    phTestMemory: "Wrote pH Test in Aug 2021 (Kochi) • Class 10/12 & MEC Degree Verified",
    college: "MODEL Engineering College Kochi ('21)",
    collegeTier: "Verified eLitmus Batch '21",
    company: "CRED",
    companyDomain: "cred.club",
    role: "Brand & Product Strategist",
    city: "Bengaluru",
    neighborhood: "Indiranagar",
    intent: "Dating, Open to Serious",
    freeEvenings: ["Sat Evening", "Sun 4:30 PM"],
    diet: "Non-Vegetarian",
    languages: ["English", "Malayalam", "Hindi"],
    trustLadder: {
      level: 4,
      maxLevel: 4,
      phoneOtp: true,
      age18AndSelfieLiveness: true,
      elitmusCredentialDocs: true,
      peerVouchesCount: 5,
      vouchedBy: ["Ananya I.", "Aarav M."]
    },
    reliabilityStats: {
      showUpRatePct: 100,
      tablesAttended: 6,
      kindClosuresSent: 4,
      zeroGhostStreakWeeks: 16
    },
    avatarColor: "#f43f5e",
    photoSvgSeed: "shreya",
    headline: "Obsessed with behavioral psychology, film photography, and hosting unstrangering dinners.",
    bio: "Relocated from Kochi to Indiranagar in 2021 after landing my fintech role through eLitmus. Huge fan of Catalyst's small-group tables.",
    voiceNoteTranscript: "Cynicism is overrated. Give me someone who actually shows up when they confirm a Sunday table.",
    cognitiveArchetype: "Creative Catalyst",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    karmaScore: 94,
    karmaBadges: ["Table Super-Host", "Verified Alumni '21"],
    subscriptionTier: "Free (Pay-Per-Table)",
    credits: 35,
    confirmedTableId: "tbl_blr_filter_coffee",
    duetCompletedWith: [],
    sparkPicks: [],
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: false,
      blockedDomains: ["cred.club"],
      incognitoToRecruiters: true
    },
    wavelengthVector: {
      intellectualCuriosity: 90,
      careerAmbitionTempo: 84,
      financialThermostat: 82,
      socialBattery: 82,
      conflictDirectness: 72
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_a",
      dil_sunday_rhythm: "opt_c",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_b",
      dil_relocation_horizon: "opt_a"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "High agency + kindness. People who notice when someone at a table is quiet and bring them into the conversation."
      }
    ],
    revealStages: {
      usr_aarav: 2
    }
  },
  {
    id: "usr_rohan",
    email: "rohan@elitmus.com",
    password: "password123",
    elitmusPhId: "EL-2021-30944",
    name: "Rohan Verma",
    age: 26,
    gender: "Male",
    lookingFor: "Female",
    batchYear: 2021,
    hometown: "Chandigarh",
    relocatedYear: 2021,
    phTestMemory: "Wrote pH Test in Sep 2021 (Chandigarh) • Class 10/12 & PEC Degree Verified",
    college: "PEC Chandigarh ('21)",
    collegeTier: "Verified eLitmus Batch '21",
    company: "Microsoft Research",
    companyDomain: "microsoft.com",
    role: "Applied AI Engineer",
    city: "Hyderabad",
    neighborhood: "Jubilee Hills",
    intent: "Serious / Intentional Dating",
    freeEvenings: ["Sun 4:30 PM"],
    diet: "Non-Vegetarian",
    languages: ["English", "Hindi", "Punjabi"],
    trustLadder: {
      level: 3,
      maxLevel: 4,
      phoneOtp: true,
      age18AndSelfieLiveness: true,
      elitmusCredentialDocs: true,
      peerVouchesCount: 1,
      vouchedBy: ["Aarav M."]
    },
    reliabilityStats: {
      showUpRatePct: 100,
      tablesAttended: 3,
      kindClosuresSent: 2,
      zeroGhostStreakWeeks: 11
    },
    avatarColor: "#0ea5e9",
    photoSvgSeed: "rohan",
    headline: "Relocated from Chandigarh. Building multimodal agents & playing blues guitar.",
    bio: "2021 eLitmus alum from PEC. Frequently between Hyderabad and Bengaluru. Looking for an intellectually equal partner.",
    voiceNoteTranscript: "The best relationships feel like a 2-person co-op game that never runs out of levels.",
    cognitiveArchetype: "Systems Architect",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    karmaScore: 95,
    karmaBadges: ["100% Show-Up Rate", "Verified Alumni '21"],
    subscriptionTier: "Catalyst Pass Active",
    credits: 50,
    confirmedTableId: "tbl_blr_filter_coffee",
    duetCompletedWith: [],
    sparkPicks: ["usr_ananya"],
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: false,
      blockedDomains: ["microsoft.com"],
      incognitoToRecruiters: true
    },
    wavelengthVector: {
      intellectualCuriosity: 94,
      careerAmbitionTempo: 88,
      financialThermostat: 85,
      socialBattery: 66,
      conflictDirectness: 80
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_b",
      dil_sunday_rhythm: "opt_a",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_b",
      dil_relocation_horizon: "opt_a"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "Being able to laugh at ourselves when plans go sideways."
      }
    ],
    revealStages: {
      usr_ananya: 2,
      usr_meera: 3
    }
  },
  {
    id: "usr_vikram",
    email: "vikram@elitmus.com",
    password: "password123",
    elitmusPhId: "EL-2022-90122",
    name: "Vikramaditya Rao",
    age: 25,
    gender: "Male",
    lookingFor: "Female",
    batchYear: 2022,
    hometown: "Mysuru",
    relocatedYear: 2022,
    phTestMemory: "Wrote pH Test in Aug 2022 (Bengaluru) • Class 10/12 & BMSCE Degree Verified",
    college: "BMSCE Bengaluru ('22)",
    collegeTier: "Verified eLitmus Batch '22",
    company: "Razorpay",
    companyDomain: "razorpay.com",
    role: "Product Analyst",
    city: "Bengaluru",
    neighborhood: "Whitefield",
    intent: "Serious / Intentional Dating",
    freeEvenings: ["Sat Evening"],
    diet: "Vegetarian",
    languages: ["English", "Kannada", "Hindi"],
    trustLadder: {
      level: 3,
      maxLevel: 4,
      phoneOtp: true,
      age18AndSelfieLiveness: true,
      elitmusCredentialDocs: true,
      peerVouchesCount: 1,
      vouchedBy: []
    },
    reliabilityStats: {
      showUpRatePct: 92,
      tablesAttended: 2,
      kindClosuresSent: 1,
      zeroGhostStreakWeeks: 6
    },
    avatarColor: "#10b981",
    photoSvgSeed: "vikram",
    headline: "Data storyteller, amateur triathlete, and compulsive board-game strategist.",
    bio: "2022 batch eLitmus alum at Razorpay. Automatically cloaked from Razorpay coworkers via the Employer Firewall!",
    voiceNoteTranscript: "Always up for a morning cycle to Nandi Hills followed by ₹70 Masala Dosa at CTR.",
    cognitiveArchetype: "Pragmatic Builder",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    karmaScore: 91,
    karmaBadges: ["Verified Alumni '22"],
    subscriptionTier: "Free (Pay-Per-Table)",
    credits: 20,
    confirmedTableId: null,
    duetCompletedWith: [],
    sparkPicks: [],
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: false,
      blockedDomains: ["razorpay.com"],
      incognitoToRecruiters: true
    },
    wavelengthVector: {
      intellectualCuriosity: 84,
      careerAmbitionTempo: 82,
      financialThermostat: 88,
      socialBattery: 78,
      conflictDirectness: 75
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_b",
      dil_sunday_rhythm: "opt_c",
      dil_conflict_protocol: "opt_a",
      dil_money_philosophy: "opt_a",
      dil_relocation_horizon: "opt_b"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "Consistency and high energy."
      }
    ],
    revealStages: {
      usr_ananya: 1
    }
  }
];

const INITIAL_CONVERSATIONS = [
  {
    id: "conv_aarav_ananya",
    participants: ["usr_aarav", "usr_ananya"],
    stage: 3, // Full Mutual Spark after Table #14 + Duet Puzzle
    status: "active",
    origin: "Mutual Spark from Table #14 (Cubbon Park Filter Coffee) + 78s Duet Solve",
    startedAt: "2026-11-15T18:30:00Z",
    sharedDilemmasCount: 5,
    equilibriumScore: 96,
    safeDateBooking: {
      venueId: "venue_blr_1",
      venueName: "Araku Coffee & Sensory Lab, Indiranagar",
      dateTime: "Saturday, Nov 21 • 5:30 PM (Budget Cap: ₹190/person)",
      passCode: "CAT-ARK-9921",
      status: "Confirmed • Safe-Date Co-Pilot & Trusted Contact Timer Active",
      safetyCheckInEnabled: true,
      trustedContact: "Rohit M. (+91-98XXXXXX12 • Live Link Shared)"
    },
    messages: [
      {
        id: "msg_1",
        senderId: "system",
        type: "dilemma_sync",
        text: "⚡ Mutual Spark Unlocked after Table #14! Shared eLitmus Memory: You both wrote the pH test in Aug 2021/2022 and relocated to Bengaluru for your first tech roles. Duet Note: Solved the Indiranagar Seating Logic Duet in 78s!",
        timestamp: "2026-11-15T18:30:00Z"
      },
      {
        id: "msg_2",
        senderId: "usr_ananya",
        type: "text",
        text: "That Sunday table at Cubbon Park was honestly the least awkward first meetup I've ever had in Bengaluru 😄 And your deduction on Seat #2 in the Duet puzzle was clutch!",
        timestamp: "2026-11-15T18:42:00Z"
      },
      {
        id: "msg_3",
        senderId: "usr_aarav",
        type: "text",
        text: "Haha only because you immediately shared Clue B1 about the Founder in Seat 4! Ready for our 1:1 rematch over ₹190 pour-overs at Araku this Saturday?",
        timestamp: "2026-11-15T18:55:00Z"
      },
      {
        id: "msg_4",
        senderId: "system",
        type: "scam_shield_notice",
        text: "🛡️ McAfee 2026 India Scam Shield Active: Links, QR codes, phone numbers, and UPI IDs are automatically blocked in early chat. Never send money to anyone you meet online.",
        timestamp: "2026-11-16T09:00:00Z"
      }
    ]
  },
  {
    id: "conv_aarav_meera",
    participants: ["usr_aarav", "usr_meera"],
    stage: 2,
    status: "active",
    origin: "Mutual Spark from Table #14 • Stage 2 Half-Reveal",
    startedAt: "2026-11-16T14:20:00Z",
    sharedDilemmasCount: 4,
    equilibriumScore: 91,
    safeDateBooking: null,
    messages: [
      {
        id: "msg_m1",
        senderId: "system",
        type: "dilemma_sync",
        text: "🧪 Mutual Table Spark + 91% pH Equilibrium! Shared Memory: Both graduated from tier-2 engineering colleges via eLitmus and prefer ₹150 bookstore/coffee walks.",
        timestamp: "2026-11-16T14:20:00Z"
      },
      {
        id: "msg_m2",
        senderId: "usr_meera",
        type: "text",
        text: "Loved your point at the Sunday table about how relocated grads in Bengaluru need third places that aren't loud pubs! Have you checked out Blossoms on Church Street lately?",
        timestamp: "2026-11-16T16:10:00Z"
      }
    ]
  }
];

const ELITMUS_ALUMNI_REGISTRY = {
  "EL-2023-10492": {
    elitmusPhId: "EL-2023-10492",
    name: "Siddharth Kulkarni",
    batchYear: 2023,
    hometown: "Nagpur",
    phTestMemory: "Wrote pH Test in Oct 2022 (Nagpur) • Class 10/12 & VIT Degree Verified",
    college: "VIT Vellore (B.Tech CSE '23)",
    company: "PhonePe",
    companyDomain: "phonepe.com",
    role: "Software Development Engineer",
    city: "Bengaluru",
    cognitiveArchetype: "Systems Architect",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    wavelengthVector: {
      intellectualCuriosity: 91,
      careerAmbitionTempo: 87,
      financialThermostat: 88,
      socialBattery: 68,
      conflictDirectness: 77
    }
  },
  "EL-2022-66201": {
    elitmusPhId: "EL-2022-66201",
    name: "Neha Sharma",
    batchYear: 2022,
    hometown: "Lucknow",
    phTestMemory: "Wrote pH Test in Jul 2022 (Delhi NCR) • Class 10/12 & DTU Degree Verified",
    college: "DTU Delhi (B.Tech ECE '22)",
    company: "Zomato",
    companyDomain: "zomato.com",
    role: "Product Manager",
    city: "Gurugram",
    cognitiveArchetype: "Empathetic Strategist",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    wavelengthVector: {
      intellectualCuriosity: 93,
      careerAmbitionTempo: 89,
      financialThermostat: 85,
      socialBattery: 76,
      conflictDirectness: 74
    }
  },
  "EL-2021-50019": {
    elitmusPhId: "EL-2021-50019",
    name: "Karthik Sundaram",
    batchYear: 2021,
    hometown: "Madurai",
    phTestMemory: "Wrote pH Test in Aug 2021 (Chennai) • Class 10/12 & SSN Degree Verified",
    college: "SSN College of Engineering ('21)",
    company: "Freshworks",
    companyDomain: "freshworks.com",
    role: "Senior Product Engineer",
    city: "Chennai",
    cognitiveArchetype: "Pragmatic Builder",
    archetypeBadge: "Verified eLitmus Reasoning DNA (Raw Score Hidden)",
    wavelengthVector: {
      intellectualCuriosity: 89,
      careerAmbitionTempo: 82,
      financialThermostat: 89,
      socialBattery: 62,
      conflictDirectness: 81
    }
  }
};

module.exports = {
  WEEKLY_DROP_TABLES,
  DUET_PUZZLES,
  DILEMMA_BANK,
  SAFE_DATE_VENUES,
  COOP_ICEBREAKERS,
  USERS,
  INITIAL_CONVERSATIONS,
  ELITMUS_ALUMNI_REGISTRY
};
