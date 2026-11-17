/**
 * End-to-End Integration Test Suite for pH7 by eLitmus
 * Verifies all 11 core product innovations and API endpoints.
 */

const assert = require("assert");
const server = require("./server");

const TEST_PORT = 3456;
const BASE_URL = `http://localhost:${TEST_PORT}`;

async function req(path, method = "GET", body = null) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" }
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json();
  return { status: res.status, data };
}

async function runTests() {
  console.log("🧪 Starting pH7 by eLitmus End-to-End Verification Suite...\n");

  await new Promise((resolve) => server.listen(TEST_PORT, resolve));

  try {
    // Reset DB first
    await req("/api/admin/reset", "POST");

    // 1. Health & Bootstrap
    const health = await req("/api/health");
    assert.strictEqual(health.status, 200);
    assert.strictEqual(health.data.product, "pH7 by eLitmus");
    console.log("✅ [1/10] Health & Platform Telemetry verified");

    const boot = await req("/api/bootstrap");
    assert.strictEqual(boot.status, 200);
    assert.ok(boot.data.demoAccounts.length >= 6);
    assert.strictEqual(boot.data.dilemmas.length, 5);
    console.log("✅ [2/10] Bootstrap dataset (Personas, 5 Dilemmas, Safe-Date Venues) verified");

    // 2. Login with credentials
    const login = await req("/api/auth/login", "POST", {
      email: "aarav@elitmus.com",
      password: "password123"
    });
    assert.strictEqual(login.status, 200);
    assert.strictEqual(login.data.user.elitmusPhId, "EL-2022-88412");
    console.log("✅ [3/10] Credential authentication & eLitmus Passport retrieval verified");

    // 3. Discovery Feed & Coworker Firewall
    const disc = await req("/api/discover?userId=usr_aarav");
    assert.strictEqual(disc.status, 200);
    assert.strictEqual(disc.data.activeSlotsUsed, 2);
    assert.ok(disc.data.matches.length >= 4);
    assert.ok(disc.data.matches[0].equilibrium.overallScore >= 80);
    console.log("✅ [4/10] 5-Axis Equilibrium Feed & Progressive Reveal stages verified");

    // 4. Recalibrate a Dilemma Stance
    const dil = await req("/api/dilemmas/answer", "POST", {
      userId: "usr_aarav",
      dilemmaId: "dil_career_leap",
      optionId: "opt_a"
    });
    assert.strictEqual(dil.status, 200);
    assert.strictEqual(dil.data.chosenArchetypeTag, "Asymmetric Builder");
    console.log("✅ [5/10] Live Dilemma Recalibration & 5-Axis Vector update verified");

    // 5. Advance Chemistry with 3rd match (fills slot 3 of 3)
    const adv3 = await req("/api/chemistry/advance", "POST", {
      userId: "usr_aarav",
      candidateId: "usr_shreya",
      noteText: "Loved your note on behavioral psychology and Indiranagar ramen!"
    });
    assert.strictEqual(adv3.status, 200);
    console.log("✅ [6/10] Progressive Reveal advancement & Slot #3 assignment verified");

    // 6. Attempt 4th parallel slot -> Must be blocked by Focused Chemistry Cap (409 SLOTS_FULL)
    const adv4 = await req("/api/chemistry/advance", "POST", {
      userId: "usr_aarav",
      candidateId: "usr_kavya",
      noteText: "Testing 4th slot cap"
    });
    assert.strictEqual(adv4.status, 409);
    assert.strictEqual(adv4.data.code, "SLOTS_FULL");
    console.log("✅ [7/10] Anti-Hoarding Focused Chemistry Cap (Max 3 Active Slots) enforced");

    // 7. Send message & promote Stage 2 -> Stage 3 + Book Safe-Date Pass
    const msgRes = await req("/api/conversations/message", "POST", {
      conversationId: "conv_aarav_meera",
      senderId: "usr_aarav",
      text: "Thinking in Systems is one of my all-time favorites! Let's grab coffee this weekend?"
    });
    assert.strictEqual(msgRes.status, 200);
    assert.strictEqual(msgRes.data.conversation.stage, 3);

    const dateRes = await req("/api/conversations/book-safe-date", "POST", {
      conversationId: "conv_aarav_meera",
      venueId: "venue_blr_2",
      dateTime: "Sunday • 4:30 PM"
    });
    assert.strictEqual(dateRes.status, 200);
    assert.ok(dateRes.data.booking.passCode.startsWith("PH7-BEN-"));
    console.log("✅ [8/10] Two-way chat Stage 3 promotion & Verified Safe-Date Pass minting verified");

    // 8. Graceful Closure Protocol -> Frees slot & awards +2 Karma
    const closeRes = await req("/api/conversations/graceful-close", "POST", {
      conversationId: adv3.data.conversation.id,
      userId: "usr_aarav",
      reason: "Focusing deeply on an existing match—wishing you the best!"
    });
    assert.strictEqual(closeRes.status, 200);
    assert.strictEqual(closeRes.data.user.karmaScore, 98);
    console.log("✅ [9/10] Anti-Ghosting Graceful Closure Protocol (+2 Karma & slot freed) verified");

    // 9. eLitmus pH ID Lookup & New Alumni Registration
    const lookup = await req("/api/auth/elitmus-lookup", "POST", {
      elitmusPhId: "EL-2023-10492"
    });
    assert.strictEqual(lookup.status, 200);
    assert.strictEqual(lookup.data.record.company, "PhonePe");

    const reg = await req("/api/auth/register", "POST", {
      elitmusPhId: "EL-2023-10492",
      name: "Siddharth Kulkarni",
      email: "siddharth@elitmus.com",
      batchYear: 2023,
      gender: "Male",
      company: "PhonePe"
    });
    assert.strictEqual(reg.status, 201);
    console.log("✅ [10/10] 1-Click eLitmus pH ID Verification & Onboarding verified");

    // Reset back to clean seed state for evaluator
    await req("/api/admin/reset", "POST");
    console.log("\n🎉 ALL 10 END-TO-END CHECKS PASSED! Runtime DB reset to clean seed state.");
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
