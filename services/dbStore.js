/**
 * Persistent JSON + In-Memory Database Store for Catalyst (pH7) by eLitmus
 * Automatically seeds on first boot and persists all user actions across restarts.
 */

const fs = require("fs");
const path = require("path");
const {
  WEEKLY_DROP_TABLES,
  DUET_PUZZLES,
  DILEMMA_BANK,
  SAFE_DATE_VENUES,
  COOP_ICEBREAKERS,
  USERS,
  INITIAL_CONVERSATIONS,
  ELITMUS_ALUMNI_REGISTRY
} = require("../data/seedData");

const DB_FILE = path.join(__dirname, "..", "data", "runtime-db.json");

function createFreshState() {
  return {
    users: JSON.parse(JSON.stringify(USERS)),
    tables: JSON.parse(JSON.stringify(WEEKLY_DROP_TABLES)),
    duetPuzzles: JSON.parse(JSON.stringify(DUET_PUZZLES)),
    conversations: JSON.parse(JSON.stringify(INITIAL_CONVERSATIONS)),
    dilemmas: JSON.parse(JSON.stringify(DILEMMA_BANK)),
    venues: JSON.parse(JSON.stringify(SAFE_DATE_VENUES)),
    icebreakers: JSON.parse(JSON.stringify(COOP_ICEBREAKERS)),
    alumniRegistry: JSON.parse(JSON.stringify(ELITMUS_ALUMNI_REGISTRY)),
    safetyReports: [],
    scamShieldLogs: [
      {
        id: "scam_seed_1",
        blockedPattern: "UPI ID / QR Request (user@okaxis)",
        timestamp: "2026-11-14T19:15:00Z",
        action: "Auto-Blocked in Early Chat (McAfee 2026 Protection)"
      }
    ],
    closureLogs: [
      {
        id: "cls_seed_1",
        fromUserId: "usr_aarav",
        toUserName: "Riya (2022 Batch)",
        reason: "Different city relocation timelines (Bengaluru vs. Mumbai)",
        karmaEarned: 2,
        timestamp: "2026-11-10T12:00:00Z"
      }
    ],
    platformMetrics: {
      totalVerifiedAlumniPool: 1042800,
      activatedWaitlistUsers: 68400,
      monthlyActiveUsers: 24500,
      meetupsAttendedPer100Users: 64.8,
      avgTimeInAppMinutesWeekly: 14.2, // Anti-metric: lower is better!
      payingTableSeatsMonthly: 8420,
      corporateWelcomeSocialsBooked: 42,
      avgShowUpRatePct: 96.4,
      ghostingReductionPct: 84.5,
      coworkerCloaksActive: 19400
    }
  };
}

class DBStore {
  constructor() {
    this.state = null;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed && parsed.tables && parsed.duetPuzzles) {
          this.state = parsed;
          return;
        }
      }
      this.state = createFreshState();
      this.save();
    } catch (err) {
      this.state = createFreshState();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state, null, 2), "utf8");
    } catch (err) {
      // Ignore write errors in read-only serverless environments
    }
  }

  resetToSeed() {
    this.state = createFreshState();
    this.save();
    return this.state;
  }

  getUsers() {
    return this.state.users;
  }

  getUserById(id) {
    return this.state.users.find((u) => u.id === id) || null;
  }

  getUserByEmail(email) {
    if (!email) return null;
    return (
      this.state.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || null
    );
  }

  addUser(userObj) {
    this.state.users.push(userObj);
    this.state.platformMetrics.activatedWaitlistUsers += 1;
    this.state.platformMetrics.monthlyActiveUsers += 1;
    this.save();
    return userObj;
  }

  updateUser(userId, updaterFn) {
    const idx = this.state.users.findIndex((u) => u.id === userId);
    if (idx === -1) return null;
    const updated = updaterFn(this.state.users[idx]);
    this.state.users[idx] = updated;
    this.save();
    return updated;
  }

  getConversationsForUser(userId) {
    return this.state.conversations.filter((c) => c.participants.includes(userId));
  }

  getConversationBetween(userAId, userBId) {
    return (
      this.state.conversations.find(
        (c) => c.participants.includes(userAId) && c.participants.includes(userBId)
      ) || null
    );
  }

  getConversationById(convId) {
    return this.state.conversations.find((c) => c.id === convId) || null;
  }

  upsertConversation(convObj) {
    const idx = this.state.conversations.findIndex((c) => c.id === convObj.id);
    if (idx === -1) {
      this.state.conversations.push(convObj);
    } else {
      this.state.conversations[idx] = convObj;
    }
    this.save();
    return convObj;
  }
}

module.exports = new DBStore();
