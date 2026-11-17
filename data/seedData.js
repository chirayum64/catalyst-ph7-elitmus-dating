/**
 * pH7 by eLitmus — Seed Database & Cognitive Compatibility Dataset
 * Cohort Focus: 1,000,000+ Verified eLitmus Alumni (2020 - 2023 Graduating Batches)
 */

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
    title: "The ₹5 Lakh Bonus Allocation",
    scenario: "You both receive an unexpected ₹5L post-tax windfall. Without overthinking, how do you split it?",
    options: [
      {
        id: "opt_a",
        label: "80% straight into low-cost index funds / freedom corpus; 20% guilt-free treat.",
        archetypeTag: "FIRE Architect",
        axisImpact: { financialThermostat: 95, careerAmbitionTempo: 85 }
      },
      {
        id: "opt_b",
        label: "50% invested, 30% for an unforgettable 10-day international trip, 20% upskilling/gear.",
        archetypeTag: "Balanced Compounder",
        axisImpact: { financialThermostat: 78, socialBattery: 75 }
      },
      {
        id: "opt_c",
        label: "Invest in memories & backing a side-project while we're in our 20s.",
        archetypeTag: "Experiential Optimist",
        axisImpact: { financialThermostat: 55, careerAmbitionTempo: 88 }
      }
    ]
  },
  {
    id: "dil_relocation_horizon",
    category: "Life Architecture",
    title: "Geography & Dual-Career Geometry",
    scenario: "In 3 years, one of you gets a dream role in another metro (or abroad). How should a modern two-career couple navigate geography?",
    options: [
      {
        id: "opt_a",
        label: "Optimize for whoever has the steeper compounding curve now, then alternate turns.",
        archetypeTag: "Relay Partner",
        axisImpact: { careerAmbitionTempo: 90, conflictDirectness: 80 }
      },
      {
        id: "opt_b",
        label: "Anchor in one tier-1 tech hub (BLR/HYD/NCR) where both careers have deep liquidity.",
        archetypeTag: "Hub Anchor",
        axisImpact: { careerAmbitionTempo: 80, financialThermostat: 88 }
      },
      {
        id: "opt_c",
        label: "Build remote-first/location-independent careers so we never have to split cities.",
        archetypeTag: "Sovereign Nomad",
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
    vibe: "Specialty Pour-Over • Quiet Acoustics • Intellectual First Date",
    elitmusPerk: "20% off Artisanal Tasting Flight + Reserved Corner Booth",
    safetyBadge: "pH7 Verified Safe-Zone • Staff Trained in Ask-for-Angela Protocol",
    avgSplitCost: "₹650 per person",
    rating: 4.9
  },
  {
    id: "venue_blr_2",
    name: "The Boardroom & Brews Loft",
    city: "Bengaluru",
    area: "Koramangala 4th Block",
    vibe: "250+ Strategy Board Games • Zero Awkward Small Talk",
    elitmusPerk: "Free Game Library Pass + Complimentary Craft Kombucha",
    safetyBadge: "pH7 Verified Safe-Zone • Verified Check-In Desk",
    avgSplitCost: "₹550 per person",
    rating: 4.8
  },
  {
    id: "venue_hyd_1",
    name: "Roastery Coffee House Courtyard",
    city: "Hyderabad",
    area: "Banjara Hills",
    vibe: "Lush Leafy Courtyard • Great Evening Conversations",
    elitmusPerk: "15% eLitmus Alumni Privilege + Priority Seating",
    safetyBadge: "pH7 Verified Safe-Zone • Valet & Safe Drop Verified",
    avgSplitCost: "₹600 per person",
    rating: 4.9
  },
  {
    id: "venue_pune_1",
    name: "Pagdandi Books Chai Cafe",
    city: "Pune",
    area: "Baner",
    vibe: "Indie Bookstore • Acoustic Evenings • Deep Conversations",
    elitmusPerk: "Complimentary Book Swap Voucher + Artisanal Chai Pot",
    safetyBadge: "pH7 Verified Safe-Zone • Community Verified",
    avgSplitCost: "₹400 per person",
    rating: 4.8
  },
  {
    id: "venue_ncr_1",
    name: "Blue Tokai & Pottery Studio",
    city: "Gurugram",
    area: "Galleria Market",
    vibe: "Co-Op Clay Wheel Session + Cold Brews",
    elitmusPerk: "25% off Couple Micro-Workshop for pH7 Matches",
    safetyBadge: "pH7 Verified Safe-Zone • High-Visibility Plaza",
    avgSplitCost: "₹800 per person",
    rating: 4.7
  }
];

const COOP_ICEBREAKERS = [
  {
    id: "ice_1",
    title: "2 Truths & 1 Career Plot-Twist",
    prompt: "Drop two real facts about your life since graduation and one plausible lie. Let your match debug which one is fake!"
  },
  {
    id: "ice_2",
    title: "The Unpopular Tech/Life Hill I'll Die On",
    prompt: "Share one opinion about work, cities, money, or relationships where you disagree with 90% of people around you."
  },
  {
    id: "ice_3",
    title: "Our Hypothetical Weekend Hackathon",
    prompt: "If we had ₹25,000 and 48 hours this weekend to launch a non-software project together (food pop-up, travel documentary, book club), what roles do we each take?"
  },
  {
    id: "ice_4",
    title: "Rapid Fire: Split-Second Tradeoffs",
    prompt: "Hills or Beaches? Early Morning Gym or Midnight Deep Work? Index Funds or Angel Investing? Cooking Together or Ordering In?"
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
    college: "NIT Surathkal (B.Tech CSE '22)",
    collegeTier: "Verified eLitmus Batch '22",
    company: "Razorpay",
    companyDomain: "razorpay.com",
    role: "Senior Product Engineer (SDE-2)",
    city: "Bengaluru",
    neighborhood: "Indiranagar",
    avatarColor: "#6366f1",
    photoSvgSeed: "aarav",
    headline: "Building payment rails by day, perfecting sourdough & sci-fi plots by night.",
    bio: "Came to Bengaluru via the eLitmus pH route in 2022. Huge fan of long walks around Ulsoor Lake, podcasts that make you pause every 3 minutes, and people who are genuinely curious about how the world works.",
    voiceNoteTranscript: "Hey! If you can debate whether AI agents will replace SaaS over filter coffee and then laugh at terrible dad jokes, we'll get along dangerously well.",
    cognitiveArchetype: "Systems Architect",
    archetypeBadge: "Top 4% Analytical & Systems Synthesis (pH Verified)",
    karmaScore: 96,
    karmaBadges: ["Zero-Ghosting Streak (14w)", "Thoughtful Closer", "Verified Alumni '22"],
    subscriptionTier: "pH7 Equilibrium+",
    credits: 45,
    coworkerShield: {
      enabled: true,
      blockCurrentCompany: true,
      blockCollegeBatch: false,
      blockedDomains: ["razorpay.com"],
      incognitoToRecruiters: true
    },
    wavelengthVector: {
      intellectualCuriosity: 92,
      careerAmbitionTempo: 86,
      financialThermostat: 84,
      socialBattery: 64,
      conflictDirectness: 78
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_b",
      dil_sunday_rhythm: "opt_b",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_b",
      dil_relocation_horizon: "opt_a"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "When someone gets visibly excited explaining a niche topic I know nothing about—from urban architecture to behavioral economics."
      },
      {
        question: "Life Pace & Relationship Intent",
        answer: "Looking for an intentional long-term partner where both of our careers and personal lives feel 2x lighter and 3x more fun together."
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
    college: "VJTI Mumbai (B.Tech IT '21)",
    collegeTier: "Verified eLitmus Batch '21",
    company: "Swiggy",
    companyDomain: "swiggy.in",
    role: "Product Manager — Consumer Growth",
    city: "Bengaluru",
    neighborhood: "Koramangala",
    avatarColor: "#ec4899",
    photoSvgSeed: "ananya",
    headline: "Product thinker who treats weekend travel itineraries like sprint boards (with room for chaos).",
    bio: "2021 batch grad who landed my first APM role through eLitmus! Tired of apps where every conversation starts with 'Hey how was your weekend'. Tell me the last rabbit hole you fell into at 1 AM.",
    voiceNoteTranscript: "I judge cafés by their cortado and people by how they treat waiters and whether they actually listen before replying.",
    cognitiveArchetype: "Empathetic Strategist",
    archetypeBadge: "Top 3% Behavioral Synthesis & Verbal Precision (pH Verified)",
    karmaScore: 98,
    karmaBadges: ["99% Reply Clarity", "Safe-Date Verified", "Verified Alumni '21"],
    subscriptionTier: "pH7 Equilibrium+",
    credits: 60,
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
      financialThermostat: 82,
      socialBattery: 70,
      conflictDirectness: 74
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_b",
      dil_sunday_rhythm: "opt_b",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_b",
      dil_relocation_horizon: "opt_a"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "Emotional maturity + intellectual playfulness. Being able to switch from discussing macroeconomics to laughing at absurd memes in 5 seconds."
      },
      {
        question: "Life Pace & Relationship Intent",
        answer: "Intentional dating leading to a true equal partnership. Bonus points if you love board games and spontaneous Cubbon Park runs."
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
    college: "PSG Tech Coimbatore ('20)",
    collegeTier: "Verified eLitmus Batch '20",
    company: "Atlassian",
    companyDomain: "atlassian.com",
    role: "Lead Product Designer",
    city: "Bengaluru",
    neighborhood: "HSR Layout",
    avatarColor: "#8b5cf6",
    photoSvgSeed: "meera",
    headline: "Designing calm software, collecting vinyl records, and advocating for 4-day workweeks.",
    bio: "Graduated into the 2020 pandemic batch, built resilience early, and now value depth over noise. I love pottery workshops, indie bookstores, and partners who know how to communicate clearly without playing games.",
    voiceNoteTranscript: "My love language is sending you a weirdly specific article at 2 PM because it reminded me of a point you made three days ago.",
    cognitiveArchetype: "Creative Catalyst",
    archetypeBadge: "Top 5% Divergent Problem Solving & Design Logic (pH Verified)",
    karmaScore: 95,
    karmaBadges: ["High-Depth Conversationalist", "Verified Alumni '20"],
    subscriptionTier: "Free (Verified Alumni)",
    credits: 30,
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
      financialThermostat: 86,
      socialBattery: 48,
      conflictDirectness: 82
    },
    dilemmaAnswers: {
      dil_career_leap: "opt_b",
      dil_sunday_rhythm: "opt_a",
      dil_conflict_protocol: "opt_b",
      dil_money_philosophy: "opt_b",
      dil_relocation_horizon: "opt_c"
    },
    prompts: [
      {
        question: "My Non-Swipeable Green Flag",
        answer: "Curiosity without arrogance. Knowing when to debate a point and when to just hold space for the other person."
      },
      {
        question: "Life Pace & Relationship Intent",
        answer: "Seeking a calm, intellectually rich partnership built on shared curiosity and mutual respect."
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
    college: "COEP Pune (B.Tech Comp '23)",
    collegeTier: "Verified eLitmus Batch '23",
    company: "Zerodha (Tech)",
    companyDomain: "zerodha.com",
    role: "Backend Systems Engineer",
    city: "Bengaluru",
    neighborhood: "Jayanagar",
    avatarColor: "#14b8a6",
    photoSvgSeed: "kavya",
    headline: "Low-latency Go code, high-altitude Himalayan treks, and zero tolerance for small talk.",
    bio: "2023 batch grad! Wrote the eLitmus pH test in final year and moved to South Bangalore. I love minimalist living, marathon training, and financial independence.",
    voiceNoteTranscript: "Let's skip the 3 weeks of texting about the weather and build a Lego set over filter coffee this Saturday.",
    cognitiveArchetype: "Pragmatic Builder",
    archetypeBadge: "Top 2% Quantitative & Algorithmic Reasoning (pH Verified)",
    karmaScore: 93,
    karmaBadges: ["Zero-Ghosting Streak (9w)", "Verified Alumni '23"],
    subscriptionTier: "Free (Verified Alumni)",
    credits: 25,
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
        answer: "People who keep their word on small things—showing up on time, following through, and speaking directly."
      },
      {
        question: "Life Pace & Relationship Intent",
        answer: "Looking for someone grounded, intellectually sharp, and outdoorsy."
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
    college: "Jadavpur University ('22)",
    collegeTier: "Verified eLitmus Batch '22",
    company: "Flipkart",
    companyDomain: "flipkart.com",
    role: "Applied ML Scientist",
    city: "Bengaluru",
    neighborhood: "Bellandur / Sarjapur",
    avatarColor: "#f59e0b",
    photoSvgSeed: "diya",
    headline: "Training recommendation models at work; fighting the algorithm in real life.",
    bio: "Ironically I build ranking algorithms for a living, which is why I hate traditional swipe apps. Here for pH7's cognitive matching. Jazz, theatre, and Bengali food enthusiast.",
    voiceNoteTranscript: "Tell me a book or film that genuinely rewired how you look at people.",
    cognitiveArchetype: "Systems Architect",
    archetypeBadge: "Top 1% Quantitative & Analytical Depth (pH Verified)",
    karmaScore: 97,
    karmaBadges: ["Deep Thinker Badge", "Verified Alumni '22"],
    subscriptionTier: "pH7 Equilibrium+",
    credits: 50,
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
      financialThermostat: 80,
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
      },
      {
        question: "Life Pace & Relationship Intent",
        answer: "High-trust, high-curiosity partnership where we push each other to grow."
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
    college: "MODEL Engineering College Kochi ('21)",
    collegeTier: "Verified eLitmus Batch '21",
    company: "CRED",
    companyDomain: "cred.club",
    role: "Brand & Product Strategist",
    city: "Bengaluru",
    neighborhood: "Indiranagar",
    avatarColor: "#f43f5e",
    photoSvgSeed: "shreya",
    headline: "Obsessed with behavioral psychology, film photography, and finding the best ramen in town.",
    bio: "Non-IIT grad who broke into consumer fintech via eLitmus in 2021. I love building community dinners, weekend road trips to Coorg, and people who aren't afraid to be earnest.",
    voiceNoteTranscript: "Cynicism is overrated. Give me someone who actually cares deeply about their craft and their people.",
    cognitiveArchetype: "Creative Catalyst",
    archetypeBadge: "Top 4% Verbal Synthesis & Behavioral Insight (pH Verified)",
    karmaScore: 94,
    karmaBadges: ["Community Host", "Verified Alumni '21"],
    subscriptionTier: "Free (Verified Alumni)",
    credits: 35,
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
      financialThermostat: 76,
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
        answer: "High agency + kindness. People who notice when someone in a group is left out and bring them into the conversation."
      },
      {
        question: "Life Pace & Relationship Intent",
        answer: "Looking for my co-conspirator in crime, travel, and building a warm life."
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
    college: "PEC Chandigarh ('21)",
    collegeTier: "Verified eLitmus Batch '21",
    company: "Microsoft Research",
    companyDomain: "microsoft.com",
    role: "Applied AI Engineer",
    city: "Hyderabad",
    neighborhood: "Jubilee Hills",
    avatarColor: "#0ea5e9",
    photoSvgSeed: "rohan",
    headline: "Building multimodal agents, playing blues guitar, and hunting for the best Haleem & Irani chai.",
    bio: "2021 eLitmus topper from a tier-2 college. Frequently between Hyderabad and Bengaluru. Looking for an intellectually equal partner who values warmth and ambition in equal measure.",
    voiceNoteTranscript: "I'm a big believer that the best relationships feel like a 2-person podcast that never runs out of episodes.",
    cognitiveArchetype: "Systems Architect",
    archetypeBadge: "Top 2% Problem Solving & Synthesis (pH Verified)",
    karmaScore: 95,
    karmaBadges: ["Zero-Ghosting Streak (11w)", "Verified Alumni '21"],
    subscriptionTier: "pH7 Equilibrium+",
    credits: 50,
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
      },
      {
        question: "Life Pace & Relationship Intent",
        answer: "Long-term partnership built on curiosity, mutual respect, and shared adventures."
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
    college: "BMSCE Bengaluru ('22)",
    collegeTier: "Verified eLitmus Batch '22",
    company: "Razorpay",
    companyDomain: "razorpay.com",
    role: "Product Analyst",
    city: "Bengaluru",
    neighborhood: "Whitefield",
    avatarColor: "#10b981",
    photoSvgSeed: "vikram",
    headline: "Data storyteller, amateur triathlete, and compulsive board-game strategist.",
    bio: "2022 batch eLitmus alum. Note: Because I work at Razorpay, anyone with the Coworker Shield enabled for razorpay.com will automatically see me cloaked!",
    voiceNoteTranscript: "Always up for a morning cycle to Nandi Hills followed by crispy Masala Dosa at CTR.",
    cognitiveArchetype: "Pragmatic Builder",
    archetypeBadge: "Top 5% Quantitative & Analytical Logic (pH Verified)",
    karmaScore: 91,
    karmaBadges: ["Verified Alumni '22"],
    subscriptionTier: "Free (Verified Alumni)",
    credits: 20,
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
      },
      {
        question: "Life Pace & Relationship Intent",
        answer: "Serious dating with someone who loves fitness and building a solid future."
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
    stage: 3, // Full Equilibrium Match (Unblurred)
    status: "active", // Consumes 1 of 3 Focused Chemistry Slots
    startedAt: "2026-11-15T18:30:00Z",
    sharedDilemmasCount: 5,
    equilibriumScore: 96,
    safeDateBooking: {
      venueId: "venue_blr_1",
      venueName: "Araku Coffee & Sensory Lab, Indiranagar",
      dateTime: "Saturday, Nov 21 • 5:30 PM",
      passCode: "PH7-ARK-9921",
      status: "Confirmed • 20% Alumni Privilege Applied",
      safetyCheckInEnabled: true
    },
    messages: [
      {
        id: "msg_1",
        senderId: "system",
        type: "dilemma_sync",
        text: "⚡ pH7 Wavelength Match (96% Equilibrium)! You both chose 'Set a 12-month runway cap with clear milestones' on The Startup ESOP Crossroads AND 'Hosting 4 close friends for board games & debate' on Sunday Rhythm.",
        timestamp: "2026-11-15T18:30:00Z"
      },
      {
        id: "msg_2",
        senderId: "usr_ananya",
        type: "text",
        text: "Okay, seeing someone else pick '12-month runway cap with milestones' AND Sunday board games made me immediately trust your brain 😄 What's your current go-to board game?",
        timestamp: "2026-11-15T18:42:00Z"
      },
      {
        id: "msg_3",
        senderId: "usr_aarav",
        type: "text",
        text: "Haha that's the pH test analytical conditioning in both of us! Lately it's been Catan: Cities & Knights and Codenames Duet. Though I have to ask—how strictly do you enforce sprint velocity on weekend trips?",
        timestamp: "2026-11-15T18:55:00Z"
      },
      {
        id: "msg_4",
        senderId: "usr_ananya",
        type: "icebreaker_card",
        icebreakerTitle: "2 Truths & 1 Career Plot-Twist",
        text: "Let's test your debugging skills: (1) I once pitched a feature to a CXO in an elevator, (2) I've solo-backpacked across Vietnam, (3) I drink decaf voluntarily.",
        timestamp: "2026-11-16T10:15:00Z"
      },
      {
        id: "msg_5",
        senderId: "usr_aarav",
        type: "text",
        text: "Number 3 is 100% the lie. Nobody who judges cafés by their cortado touches decaf voluntarily. Let's settle this over a real pour-over at Araku in Indiranagar this Saturday?",
        timestamp: "2026-11-16T10:28:00Z"
      }
    ]
  },
  {
    id: "conv_aarav_meera",
    participants: ["usr_aarav", "usr_meera"],
    stage: 2, // Dilemma Synced (Half Reveal - 1 step from full unlock)
    status: "active", // Slot 2 of 3
    startedAt: "2026-11-16T14:20:00Z",
    sharedDilemmasCount: 4,
    equilibriumScore: 91,
    safeDateBooking: null,
    messages: [
      {
        id: "msg_m1",
        senderId: "system",
        type: "dilemma_sync",
        text: "🧪 Stage 2 Chemistry Unlocked (91% Equilibrium)! You and Meera aligned on Conflict Protocol ('Morning Chai Diplomat') and Financial Thermostat ('Balanced Compounder'). Exchange 1 thoughtful prompt to unlock Stage 3 Full Reveal!",
        timestamp: "2026-11-16T14:20:00Z"
      },
      {
        id: "msg_m2",
        senderId: "usr_meera",
        type: "text",
        text: "Loved your note on urban architecture and behavioral economics! Have you read 'Thinking in Systems' by Donella Meadows? Feels right up a Systems Architect's alley.",
        timestamp: "2026-11-16T16:10:00Z"
      }
    ]
  }
];

// Mock eLitmus Master Alumni Registry for 1-Click Import / Verification Demo
const ELITMUS_ALUMNI_REGISTRY = {
  "EL-2023-10492": {
    elitmusPhId: "EL-2023-10492",
    name: "Siddharth Kulkarni",
    batchYear: 2023,
    college: "VIT Vellore (B.Tech CSE '23)",
    company: "PhonePe",
    companyDomain: "phonepe.com",
    role: "Software Development Engineer",
    city: "Bengaluru",
    cognitiveArchetype: "Systems Architect",
    archetypeBadge: "Top 3% Analytical & Quantitative Synthesis (pH Verified)",
    wavelengthVector: {
      intellectualCuriosity: 91,
      careerAmbitionTempo: 87,
      financialThermostat: 83,
      socialBattery: 68,
      conflictDirectness: 77
    }
  },
  "EL-2022-66201": {
    elitmusPhId: "EL-2022-66201",
    name: "Neha Sharma",
    batchYear: 2022,
    college: "DTU Delhi (B.Tech ECE '22)",
    company: "Zomato",
    companyDomain: "zomato.com",
    role: "Product Manager",
    city: "Gurugram",
    cognitiveArchetype: "Empathetic Strategist",
    archetypeBadge: "Top 4% Behavioral & Verbal Reasoning (pH Verified)",
    wavelengthVector: {
      intellectualCuriosity: 93,
      careerAmbitionTempo: 89,
      financialThermostat: 80,
      socialBattery: 76,
      conflictDirectness: 74
    }
  },
  "EL-2021-50019": {
    elitmusPhId: "EL-2021-50019",
    name: "Karthik Sundaram",
    batchYear: 2021,
    college: "SSN College of Engineering ('21)",
    company: "Freshworks",
    companyDomain: "freshworks.com",
    role: "Senior Product Engineer",
    city: "Chennai",
    cognitiveArchetype: "Pragmatic Builder",
    archetypeBadge: "Top 5% Systems & Problem Solving (pH Verified)",
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
  DILEMMA_BANK,
  SAFE_DATE_VENUES,
  COOP_ICEBREAKERS,
  USERS,
  INITIAL_CONVERSATIONS,
  ELITMUS_ALUMNI_REGISTRY
};
