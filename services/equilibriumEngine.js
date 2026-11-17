/**
 * pH7 Equilibrium Compatibility & Privacy Firewall Engine
 * Explainable 5-Axis Cognitive, Values & Life-Architecture Matching
 */

const { DILEMMA_BANK } = require("../data/seedData");

function calculateEquilibrium(userA, userB) {
  const vecA = userA.wavelengthVector || {
    intellectualCuriosity: 85,
    careerAmbitionTempo: 80,
    financialThermostat: 80,
    socialBattery: 65,
    conflictDirectness: 75
  };
  const vecB = userB.wavelengthVector || {
    intellectualCuriosity: 85,
    careerAmbitionTempo: 80,
    financialThermostat: 80,
    socialBattery: 65,
    conflictDirectness: 75
  };

  // Axis weights reflecting long-term partnership predictors for 2020-2023 professional cohort
  const axes = [
    {
      key: "intellectualCuriosity",
      label: "Intellectual Wavelength",
      weight: 0.28,
      mode: "similarity",
      highNote: "Both of you crave rabbit-hole conversations and first-principles thinking.",
      midNote: "Healthy overlap in curiosity with distinct domain interests."
    },
    {
      key: "financialThermostat",
      label: "Financial Thermostat",
      weight: 0.22,
      mode: "similarity",
      highNote: "Aligned philosophy on compounding wealth vs. guilt-free lifestyle spending.",
      midNote: "Complementary money habits—one anchors security, the other sparks experiences."
    },
    {
      key: "careerAmbitionTempo",
      label: "Ambition & Career Tempo",
      weight: 0.20,
      mode: "similarity",
      highNote: "Mutual empathy for high-ownership tech careers and growth sprints.",
      midNote: "Balanced career pace—one provides steady grounding during crunch weeks."
    },
    {
      key: "conflictDirectness",
      label: "Conflict & Communication",
      weight: 0.16,
      mode: "calibrated",
      highNote: "High psychological safety: you debug disagreements without ego.",
      midNote: "One brings direct clarity while the other brings reflective diplomacy."
    },
    {
      key: "socialBattery",
      label: "Social Battery & Rhythm",
      weight: 0.14,
      mode: "complement",
      highNote: "Synchronized weekend energy—easy agreement on when to go out vs. stay in.",
      midNote: "Classic introvert-ambivert synergy that expands both your worlds."
    }
  ];

  let weightedSum = 0;
  const axisBreakdown = axes.map((axis) => {
    const valA = vecA[axis.key] ?? 80;
    const valB = vecB[axis.key] ?? 80;
    const diff = Math.abs(valA - valB);

    let score;
    if (axis.mode === "similarity") {
      score = Math.max(55, Math.round(100 - diff * 1.15));
    } else if (axis.mode === "calibrated") {
      score = Math.max(60, Math.round(100 - diff * 0.95));
    } else {
      // complement mode: small diff (0-18) is great, huge diff (>35) penalizes slightly
      score = diff <= 15 ? Math.round(98 - diff * 0.4) : Math.max(62, Math.round(95 - (diff - 15) * 1.1));
    }

    weightedSum += score * axis.weight;

    return {
      key: axis.key,
      label: axis.label,
      userAValue: valA,
      userBValue: valB,
      delta: diff,
      compatibilityScore: score,
      insight: score >= 88 ? axis.highNote : axis.midNote
    };
  });

  // Dilemma Micro-Case comparison
  const answersA = userA.dilemmaAnswers || {};
  const answersB = userB.dilemmaAnswers || {};
  let exactDilemmaMatches = 0;
  let totalComparedDilemmas = 0;

  const dilemmaComparison = DILEMMA_BANK.map((dilemma) => {
    const choiceAId = answersA[dilemma.id];
    const choiceBId = answersB[dilemma.id];
    const optA = dilemma.options.find((o) => o.id === choiceAId) || dilemma.options[0];
    const optB = dilemma.options.find((o) => o.id === choiceBId) || dilemma.options[0];
    const isExactMatch = choiceAId && choiceBId && choiceAId === choiceBId;

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

  // Boost score slightly for shared real-world dilemma choices
  const dilemmaBonus = totalComparedDilemmas > 0
    ? (exactDilemmaMatches / totalComparedDilemmas) * 6
    : 3;

  const overallScore = Math.min(99, Math.max(68, Math.round(weightedSum + dilemmaBonus)));

  // Calculate pH Chemistry Value (7.00 is pure equilibrium; ranges from 6.60 to 7.40)
  const deviation = ((99 - overallScore) * 0.012).toFixed(2);
  const phValue = (7.0 + (overallScore % 2 === 0 ? 1 : -1) * Number(deviation)).toFixed(2);

  // Determine top synergy & honest watchout
  const sortedAxes = [...axisBreakdown].sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  const bestAxis = sortedAxes[0];
  const watchAxis = sortedAxes[sortedAxes.length - 1];

  const synergySuperpower = `${bestAxis.label} (${bestAxis.compatibilityScore}% Sync): ${bestAxis.insight}`;
  const frictionWatchout =
    watchAxis.delta > 14
      ? `${watchAxis.label} (${watchAxis.delta} pt delta): ${userA.name.split(" ")[0]} scores ${watchAxis.userAValue} vs ${userB.name.split(" ")[0]}'s ${watchAxis.userBValue}. Great opportunity for conscious balance.`
      : `Low Friction Pair: Your lowest axis (${watchAxis.label}) still holds a strong ${watchAxis.compatibilityScore}% resonance.`;

  return {
    overallScore,
    phValue,
    phLabel:
      overallScore >= 92
        ? "Golden pH7 Equilibrium"
        : overallScore >= 85
        ? "High Cognitive Resonance"
        : "Complementary Spark",
    exactDilemmaMatches,
    totalComparedDilemmas,
    axisBreakdown,
    dilemmaComparison,
    synergySuperpower,
    frictionWatchout
  };
}

/**
 * Filters candidate profiles respecting both users' Coworker & Batchmate Privacy Shields
 */
function filterByPrivacyShield(currentUser, allUsers) {
  const cloakedCoworkers = [];
  const visibleCandidates = [];

  for (const candidate of allUsers) {
    if (candidate.id === currentUser.id) continue;

    // Respect gender preference if set
    if (
      currentUser.lookingFor &&
      currentUser.lookingFor !== "Everyone" &&
      candidate.gender !== currentUser.lookingFor
    ) {
      continue;
    }

    const myShield = currentUser.coworkerShield || {};
    const theirShield = candidate.coworkerShield || {};

    const sameCompany =
      (currentUser.companyDomain &&
        candidate.companyDomain &&
        currentUser.companyDomain.toLowerCase() === candidate.companyDomain.toLowerCase()) ||
      (currentUser.company &&
        candidate.company &&
        currentUser.company.toLowerCase() === candidate.company.toLowerCase());

    const domainBlockedByMe =
      Array.isArray(myShield.blockedDomains) &&
      candidate.companyDomain &&
      myShield.blockedDomains.map((d) => d.toLowerCase()).includes(candidate.companyDomain.toLowerCase());

    const domainBlockedByThem =
      Array.isArray(theirShield.blockedDomains) &&
      currentUser.companyDomain &&
      theirShield.blockedDomains.map((d) => d.toLowerCase()).includes(currentUser.companyDomain.toLowerCase());

    const sameCollegeBatch =
      currentUser.college === candidate.college && currentUser.batchYear === candidate.batchYear;

    if (
      (myShield.enabled && myShield.blockCurrentCompany && sameCompany) ||
      (theirShield.enabled && theirShield.blockCurrentCompany && sameCompany) ||
      domainBlockedByMe ||
      domainBlockedByThem
    ) {
      cloakedCoworkers.push({
        reason: `Mutual Coworker Shield (${candidate.company})`,
        company: candidate.company,
        batchYear: candidate.batchYear
      });
      continue;
    }

    if (
      (myShield.enabled && myShield.blockCollegeBatch && sameCollegeBatch) ||
      (theirShield.enabled && theirShield.blockCollegeBatch && sameCollegeBatch)
    ) {
      cloakedCoworkers.push({
        reason: `College Batch Shield (${candidate.college})`,
        company: candidate.company,
        batchYear: candidate.batchYear
      });
      continue;
    }

    visibleCandidates.push(candidate);
  }

  return {
    visibleCandidates,
    cloakedCount: cloakedCoworkers.length,
    cloakedDetails: cloakedCoworkers
  };
}

module.exports = {
  calculateEquilibrium,
  filterByPrivacyShield
};
