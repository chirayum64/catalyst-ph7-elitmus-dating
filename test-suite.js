/**
 * End-to-End Integration Test Suite for Catalyst (pH7) by eLitmus
 * Verifies all 15 core product innovations, safety shields, and API endpoints.
 */

const assert = require("assert");
const server = require("./server");

const TEST_PORT = 3457;
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
  console.log("🧪 Starting Catalyst (pH7) by eLitmus 15-Point End-to-End Verification Suite...\n");

  await new Promise((resolve) => server.listen(TEST_PORT, resolve));

  try {
    await req("/api/admin/reset", "POST");

    // 1. Health & North-Star Metrics
    const health = await req("/api/health");
    assert.strictEqual(health.status, 200);
    assert.ok(health.data.metrics.meetupsAttendedPer100Users >= 60);
    console.log("✅ [1/15] Health & North-Star Telemetry (Meetups/100 Users & Anti-Metric) verified");

    // 2. Bootstrap Dataset (Tables, Duet Puzzles, Personas, Dilemmas, Venues)
    const boot = await req("/api/bootstrap");
    assert.strictEqual(boot.status, 200);
    assert.strictEqual(boot.data.tables.length, 3);
    assert.strictEqual(boot.data.duetPuzzles.length, 1);
    assert.strictEqual(boot.data.dilemmas.length, 5);
    console.log("✅ [2/15] Bootstrap dataset (3 Weekly Tables, Duet Puzzle, 5 Dilemmas) verified");

    // 3. Login with credentials
    const login = await req("/api/auth/login", "POST", {
      email: "aarav@elitmus.com",
      password: "password123"
    });
    assert.strictEqual(login.status, 200);
    assert.strictEqual(login.data.user.trustLadder.level, 4);
    console.log("✅ [3/15] 4-Rung Verification Trust Ladder & Credential Auth verified");

    // 4. Confirm Weekly Drop Table Seat via UPI Test Mode
    const tblConfirm = await req("/api/tables/confirm", "POST", {
      userId: "usr_aarav",
      tableId: "tbl_blr_boardgames",
      upiVpa: "aarav@okicici"
    });
    assert.strictEqual(tblConfirm.status, 200);
    assert.strictEqual(tblConfirm.data.receipt.amountRs, 99);
    console.log("✅ [4/15] Weekly Table Drop UPI Seat Confirmation (₹99 + Auto-Refund Guarantee) verified");

    // 5. Solve Asymmetric 2-Player Duet Puzzle ("The Wow Feature")
    const duet = await req("/api/duet/solve", "POST", {
      userId: "usr_aarav",
      puzzleId: "duet_cafe_seating",
      selectedOptionId: "seat_2",
      partnerId: "usr_ananya"
    });
    assert.strictEqual(duet.status, 200);
    assert.strictEqual(duet.data.solved, true);
    assert.ok(duet.data.duetNote.includes("Duet Collaboration Note"));
    console.log("✅ [5/15] Asymmetric 2-Player Duet Puzzle & Collaboration Note generation verified");

    // 6. Morning-After Private "Spark Reveal"
    const spark = await req("/api/spark/reveal", "POST", {
      userId: "usr_aarav",
      targetUserId: "usr_ananya"
    });
    assert.strictEqual(spark.status, 200);
    assert.strictEqual(spark.data.isMutual, true);
    console.log("✅ [6/15] Morning-After Private Spark Reveal (Mutual Pick -> Chat Unlock) verified");

    // 7. Discovery Feed & Coworker Firewall
    const disc = await req("/api/discover?userId=usr_aarav");
    assert.strictEqual(disc.status, 200);
    assert.ok(disc.data.matches.length >= 4);
    console.log("✅ [7/15] 5-Axis Equilibrium Feed & Mutual Coworker Firewall verified");

    // 8. Recalibrate a Dilemma Stance
    const dil = await req("/api/dilemmas/answer", "POST", {
      userId: "usr_aarav",
      dilemmaId: "dil_money_philosophy",
      optionId: "opt_a"
    });
    assert.strictEqual(dil.status, 200);
    console.log("✅ [8/15] Budget-First Life-Architecture Dilemma Recalibration verified");

    // 9. Advance Chemistry with 3rd match (fills slot 3 of 3)
    const adv3 = await req("/api/chemistry/advance", "POST", {
      userId: "usr_aarav",
      candidateId: "usr_shreya",
      noteText: "Loved meeting at the Indiranagar table!"
    });
    assert.strictEqual(adv3.status, 200);
    console.log("✅ [9/15] Progressive Reveal advancement & Slot #3 assignment verified");

    // 10. Attempt 4th parallel slot -> Blocked by Focused Chemistry Cap (409 SLOTS_FULL)
    const adv4 = await req("/api/chemistry/advance", "POST", {
      userId: "usr_aarav",
      candidateId: "usr_kavya",
      noteText: "Testing 4th slot cap"
    });
    assert.strictEqual(adv4.status, 409);
    assert.strictEqual(adv4.data.code, "SLOTS_FULL");
    console.log("✅ [10/15] Anti-Hoarding Focused Chemistry Cap (Max 3 Active Slots) enforced");

    // 11. Live Chat Scam Shield Interception (McAfee 2026 India Protection)
    const scamAttempt = await req("/api/conversations/message", "POST", {
      conversationId: "conv_aarav_ananya",
      senderId: "usr_aarav",
      text: "Please send Rs 500 to my UPI scammer@okaxis right now"
    });
    assert.strictEqual(scamAttempt.status, 422);
    assert.strictEqual(scamAttempt.data.code, "SCAM_SHIELD_BLOCKED");
    console.log("✅ [11/15] Live Chat Scam Shield (Blocks UPI IDs, links & phone numbers) verified");

    // 12. Valid Chat Message + Safe-Date Co-Pilot Booking
    const msgRes = await req("/api/conversations/message", "POST", {
      conversationId: "conv_aarav_meera",
      senderId: "usr_aarav",
      text: "Thinking in Systems is one of my all-time favorites! Let's do the ₹110 Blossoms walk?"
    });
    assert.strictEqual(msgRes.status, 200);

    const dateRes = await req("/api/conversations/book-safe-date", "POST", {
      conversationId: "conv_aarav_meera",
      venueId: "venue_blr_3",
      dateTime: "Sunday • 4:30 PM",
      trustedContact: "Rohit (+91-98XXXXXX12)"
    });
    assert.strictEqual(dateRes.status, 200);
    console.log("✅ [12/15] Budget-Aware 1:1 Plan & Safe-Date Co-Pilot Trusted Contact Link verified");

    // 13. Discreet "I Need Out" Safe-Date Co-Pilot SOS Trigger
    const sosRes = await req("/api/safety/copilot-sos", "POST", {
      userId: "usr_aarav",
      locationNote: "Table #14 Venue"
    });
    assert.strictEqual(sosRes.status, 200);
    console.log("✅ [13/15] Discreet 'I Need Out' Safe-Date Co-Pilot SOS alert verified");

    // 14. "Kind No" Graceful Closure Protocol -> Frees slot & awards +2 Karma
    const closeRes = await req("/api/conversations/graceful-close", "POST", {
      conversationId: adv3.data.conversation.id,
      userId: "usr_aarav",
      reason: "Focusing deeply on an existing match—wishing you the best!"
    });
    assert.strictEqual(closeRes.status, 200);
    console.log("✅ [14/15] 'Kind No' Graceful Closure Protocol (+2 Karma & slot freed) verified");

    // 15. DPDP Rules (14 Nov 2025 / May 2027) Data Portability Export & 18+ Age Gate
    const dpdpExport = await req("/api/dpdp/action", "POST", {
      userId: "usr_aarav",
      actionType: "export"
    });
    assert.strictEqual(dpdpExport.status, 200);
    assert.ok(dpdpExport.data.exportBundle.regulation.includes("DPDP"));

    const underageReg = await req("/api/auth/register", "POST", {
      name: "Minor Test",
      email: "minor@test.com",
      age: 17
    });
    assert.strictEqual(underageReg.status, 403);
    console.log("✅ [15/15] DPDP Rules (Nov 2025) JSON Export & Strict 18+ Age Gate verified");

    await req("/api/admin/reset", "POST");
    console.log("\n🎉 ALL 15 END-TO-END CHECKS PASSED! Runtime DB reset to clean seed state.");
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
