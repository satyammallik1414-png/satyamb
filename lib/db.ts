import { DatabaseSync } from "node:sqlite";
import path from "path";
import crypto from "crypto";

const dbPath = path.join(process.cwd(), "love_game.db");
let db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (!db) {
    db = new DatabaseSync(dbPath);
    initTables(db);
  }
  return db;
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "satyam_love_salt_2026").digest("hex");
}

function initTables(database: DatabaseSync) {
  // 1. Settings Table
  database.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      player_name TEXT NOT NULL DEFAULT 'Satyam''s Love ❤️',
      partner_name TEXT NOT NULL DEFAULT 'Satyam',
      nickname TEXT NOT NULL DEFAULT 'My Love',
      relationship_date TEXT NOT NULL DEFAULT '2024-02-14',
      favorite_color TEXT NOT NULL DEFAULT '#FF3366',
      birthday_date TEXT NOT NULL DEFAULT '2026-08-10',
      birthday_time TEXT NOT NULL DEFAULT '00:00:00',
      timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
      unlock_timestamp TEXT NOT NULL DEFAULT '2026-08-10T00:00:00+05:30',
      unlock_enabled INTEGER NOT NULL DEFAULT 1,
      countdown_enabled INTEGER NOT NULL DEFAULT 1,
      midnight_fireworks INTEGER NOT NULL DEFAULT 1,
      midnight_music INTEGER NOT NULL DEFAULT 1,
      puzzle_photo TEXT NOT NULL DEFAULT '/images/puzzle_memory.png',
      garden_photo TEXT NOT NULL DEFAULT '/images/hidden_garden.png',
      secret_photo TEXT NOT NULL DEFAULT '/images/secret_photo.png',
      special_word TEXT NOT NULL DEFAULT 'LOVE',
      riddle_question TEXT NOT NULL DEFAULT 'I have a face but no eyes, hands but no arms. What am I?',
      riddle_answer TEXT NOT NULL DEFAULT 'CLOCK',
      accepted_answers TEXT NOT NULL DEFAULT '["clock", "a clock", "watch"]',
      secret_surprise_link TEXT NOT NULL DEFAULT 'https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️',
      cupid_reasons TEXT NOT NULL DEFAULT '["You make me smile every day 😊", "You''re my ultimate safe place 🏡", "You understand me like no one else 💖", "I love the way you care so deeply ❤️", "You inspire me to be better ✨", "Your kindness warms my soul ☀️", "Your laughter is my favorite sound 🎶", "You are my dream come true 👑"]',
      memory_hunt_texts TEXT NOT NULL DEFAULT '["You looked so beautiful that day ✨", "The time we laughed till our stomachs hurt 😂", "Holding your hand under the starry sky 🌌", "Our late-night deep conversations 💬", "Your sweet smile that brightens my day 😊", "The way you care about me so deeply ❤️", "Every single second with you is a gift 🎁"]',
      final_message TEXT NOT NULL DEFAULT 'I know I haven''t been perfect.\n\nI''m truly sorry for hurting you.\n\nYou mean the world to me, and I''m so grateful to have you in my life.\n\nYou make every moment beautiful and worthwhile.\n\nI promise to always cherish you, respect you, and make you happy.\n\nHappy Birthday to the most amazing girl in the world.\n\nI love you so much. ❤️',
      love_letter_text TEXT NOT NULL DEFAULT 'My Love,\n\nI don''t know if words will ever be enough to explain how much you mean to me.\n\nYou have become such a beautiful part of my life, and every memory we''ve created together is something I will always treasure.\n\nI know I''m not perfect. I''ve made mistakes, I''ve said things I shouldn''t have, and sometimes I may not have shown you how much I care.\n\nBut one thing I want you to always know is that you matter to me more than you realize.\n\nThank you for every smile, every conversation, every silly moment, every beautiful memory, and simply for being you.\n\nI hope this birthday brings you all the happiness you deserve.\n\nWith all my heart,\n\nSatyam ❤️',
      birthday_wish_json TEXT NOT NULL DEFAULT '{"heading": "HAPPY BIRTHDAY", "name": "Sneha ❤️", "message": "Today isn''t just another day... it''s the day the most beautiful soul in the world was born.", "signature": "With all my heart,\\nSatyam ❤️"}',
      challenges_config TEXT NOT NULL DEFAULT '[]',
      memories_json TEXT NOT NULL DEFAULT '[]',
      intro_screens_json TEXT NOT NULL DEFAULT '[]',
      music_config TEXT NOT NULL DEFAULT '{"bg_music": "/audio/romantic_bg.mp3", "volume": 0.7, "loop": true}',
      final_surprise_config TEXT NOT NULL DEFAULT '{"type": "LINK", "url": "https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️", "title": "One Last Surprise", "message": "I love you forever!"}',
      theme_config TEXT NOT NULL DEFAULT '{"primary_color": "#FF3366", "secondary_color": "#FF6699", "bg_color": "#FFF0F5", "preset": "ROMANTIC"}',
      emergency_lock INTEGER NOT NULL DEFAULT 0,
      activity_logs TEXT NOT NULL DEFAULT '[]',
      published_config TEXT NOT NULL DEFAULT '{}'
    );
  `);

  // Safely add missing columns if upgrading database schema
  const safeAddColumn = (columnDef: string) => {
    try {
      database.exec(`ALTER TABLE settings ADD COLUMN ${columnDef};`);
    } catch (e) {
      // Column already exists
    }
  };

  safeAddColumn("love_letter_text TEXT NOT NULL DEFAULT 'My Love,\\n\\nI don''t know if words will ever be enough to explain how much you mean to me.\\n\\nWith all my heart,\\n\\nSatyam ❤️'");
  safeAddColumn("final_message TEXT NOT NULL DEFAULT 'Happy Birthday My Love ❤️'");
  safeAddColumn("player_name TEXT NOT NULL DEFAULT 'Satyam''s Love ❤️'");
  safeAddColumn("partner_name TEXT NOT NULL DEFAULT 'Satyam'");
  safeAddColumn("puzzle_photo TEXT NOT NULL DEFAULT '/images/puzzle_memory.png'");
  safeAddColumn("garden_photo TEXT NOT NULL DEFAULT '/images/hidden_garden.png'");
  safeAddColumn("secret_photo TEXT NOT NULL DEFAULT '/images/secret_photo.png'");
  safeAddColumn("special_word TEXT NOT NULL DEFAULT 'LOVE'");
  safeAddColumn("riddle_question TEXT NOT NULL DEFAULT 'I have a face but no eyes, hands but no arms. What am I?'");
  safeAddColumn("riddle_answer TEXT NOT NULL DEFAULT 'CLOCK'");
  safeAddColumn("secret_surprise_link TEXT NOT NULL DEFAULT 'https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️'");
  safeAddColumn("cupid_reasons TEXT NOT NULL DEFAULT '[\"You make me smile every day 😊\"]'");
  safeAddColumn("memory_hunt_texts TEXT NOT NULL DEFAULT '[\"You looked so beautiful that day ✨\"]'");
  safeAddColumn("nickname TEXT NOT NULL DEFAULT 'My Love'");
  safeAddColumn("relationship_date TEXT NOT NULL DEFAULT '2024-02-14'");
  safeAddColumn("favorite_color TEXT NOT NULL DEFAULT '#FF3366'");
  safeAddColumn("birthday_date TEXT NOT NULL DEFAULT '2026-08-10'");
  safeAddColumn("birthday_time TEXT NOT NULL DEFAULT '00:00:00'");
  safeAddColumn("timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata'");
  safeAddColumn("unlock_timestamp TEXT NOT NULL DEFAULT '2026-08-10T00:00:00+05:30'");
  safeAddColumn("unlock_enabled INTEGER NOT NULL DEFAULT 1");
  safeAddColumn("countdown_enabled INTEGER NOT NULL DEFAULT 1");
  safeAddColumn("midnight_fireworks INTEGER NOT NULL DEFAULT 1");
  safeAddColumn("midnight_music INTEGER NOT NULL DEFAULT 1");
  safeAddColumn("accepted_answers TEXT NOT NULL DEFAULT '[\"clock\", \"a clock\", \"watch\"]'");
  safeAddColumn("birthday_wish_json TEXT NOT NULL DEFAULT '{\"heading\": \"HAPPY BIRTHDAY\", \"name\": \"Sneha ❤️\", \"message\": \"Today isn''t just another day...\", \"signature\": \"Satyam ❤️\"}'");
  safeAddColumn("challenges_config TEXT NOT NULL DEFAULT '[]'");
  safeAddColumn("memories_json TEXT NOT NULL DEFAULT '[]'");
  safeAddColumn("intro_screens_json TEXT NOT NULL DEFAULT '[]'");
  safeAddColumn("music_config TEXT NOT NULL DEFAULT '{\"bg_music\": \"/audio/romantic_bg.mp3\", \"volume\": 0.7, \"loop\": true}'");
  safeAddColumn("video_config TEXT NOT NULL DEFAULT '{\"memory_reel_video\": \"\", \"finale_video\": \"\", \"surprise_video\": \"\"}'");
  safeAddColumn("final_surprise_config TEXT NOT NULL DEFAULT '{\"type\": \"LINK\", \"url\": \"https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️\", \"title\": \"One Last Surprise\"}'");
  safeAddColumn("theme_config TEXT NOT NULL DEFAULT '{\"primary_color\": \"#FF3366\", \"secondary_color\": \"#FF6699\", \"bg_color\": \"#FFF0F5\", \"preset\": \"ROMANTIC\"}'");
  safeAddColumn("emergency_lock INTEGER NOT NULL DEFAULT 0");
  safeAddColumn("activity_logs TEXT NOT NULL DEFAULT '[]'");
  safeAddColumn("published_config TEXT NOT NULL DEFAULT '{}'");

  // 2. Progress Table
  database.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY DEFAULT 1,
      current_task INTEGER NOT NULL DEFAULT 1,
      completed_tasks TEXT NOT NULL DEFAULT '[]',
      scores TEXT NOT NULL DEFAULT '{}',
      player_name TEXT NOT NULL DEFAULT 'My Love',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Admin Users Table
  database.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      session_token TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Initialize Admin User (Username: satyam, Email: satyam@love.com, Password: baby)
  const defaultPassHash = hashPassword("baby");
  database.exec(`
    INSERT OR REPLACE INTO admin_users (id, username, email, password_hash)
    VALUES (1, 'satyam', 'satyam@love.com', '${defaultPassHash}');
  `);

  database.exec(`
    INSERT OR IGNORE INTO settings (id, player_name, partner_name)
    VALUES (1, 'Sneha ❤️', 'Satyam');
  `);

  database.exec(`
    UPDATE settings SET
      player_name = 'Anne ❤️',
      nickname = 'Baby',
      birthday_date = '2026-08-10',
      birthday_time = '00:00:00',
      unlock_timestamp = '2026-08-10T00:00:00+05:30',
      puzzle_photo = '/images/anne_love_is.jpg',
      garden_photo = '/images/anne_cute_baby_pout.jpg',
      secret_photo = '/images/anne_cute_baby_smile.jpg',
      memories_json = '[]'
    WHERE id = 1;
  `);

  database.exec(`
    INSERT OR IGNORE INTO progress (id, current_task, completed_tasks, scores, player_name)
    VALUES (1, 1, '[]', '{}', 'My Love');
  `);
}

export interface SettingsData {
  player_name: string;
  partner_name: string;
  nickname: string;
  relationship_date: string;
  favorite_color: string;
  birthday_date: string;
  birthday_time: string;
  timezone: string;
  unlock_timestamp: string;
  unlock_enabled: number;
  countdown_enabled: number;
  midnight_fireworks: number;
  midnight_music: number;
  puzzle_photo: string;
  garden_photo: string;
  secret_photo: string;
  special_word: string;
  riddle_question: string;
  riddle_answer: string;
  accepted_answers: string[];
  secret_surprise_link: string;
  cupid_reasons: string[];
  memory_hunt_texts: string[];
  final_message: string;
  love_letter_text: string;
  birthday_wish_json: any;
  challenges_config: any[];
  memories_json: any[];
  intro_screens_json: any[];
  music_config: any;
  video_config: any;
  final_surprise_config: any;
  theme_config: any;
  emergency_lock: number;
  activity_logs: any[];
  published_config: any;
}

export interface ProgressData {
  current_task: number;
  completed_tasks: number[];
  scores: Record<string, number>;
  player_name: string;
}

export function getSettings(): SettingsData {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM settings WHERE id = 1");
  const row = stmt.get() as any;

  if (!row) {
    return {
      player_name: "Satyam's Love ❤️",
      partner_name: "Satyam",
      nickname: "My Love",
      relationship_date: "2024-02-14",
      favorite_color: "#FF3366",
      birthday_date: "2026-08-10",
      birthday_time: "00:00:00",
      timezone: "Asia/Kolkata",
      unlock_timestamp: "2026-08-10T00:00:00+05:30",
      unlock_enabled: 1,
      countdown_enabled: 1,
      midnight_fireworks: 1,
      midnight_music: 1,
      puzzle_photo: "/images/puzzle_memory.png",
      garden_photo: "/images/hidden_garden.png",
      secret_photo: "/images/secret_photo.png",
      special_word: "LOVE",
      riddle_question: "I have a face but no eyes, hands but no arms. What am I?",
      riddle_answer: "CLOCK",
      accepted_answers: ["clock", "a clock", "watch"],
      secret_surprise_link: "https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️",
      cupid_reasons: [
        "You make me smile every day 😊",
        "You're my ultimate safe place 🏡",
        "You understand me like no one else 💖",
        "I love the way you care so deeply ❤️",
        "You inspire me to be better ✨",
        "Your kindness warms my soul ☀️",
        "Your laughter is my favorite sound 🎶",
        "You are my dream come true 👑",
      ],
      memory_hunt_texts: [
        "You looked so beautiful that day ✨",
        "The time we laughed till our stomachs hurt 😂",
        "Holding your hand under the starry sky 🌌",
        "Our late-night deep conversations 💬",
        "Your sweet smile that brightens my day 😊",
        "The way you care about me so deeply ❤️",
        "Every single second with you is a gift 🎁",
      ],
      final_message: `Happy Birthday My Love ❤️`,
      love_letter_text: `My Love,\n\nI don't know if words will ever be enough to explain how much you mean to me.\n\nWith all my heart,\n\nSatyam ❤️`,
      birthday_wish_json: { heading: "HAPPY BIRTHDAY", name: "Sneha ❤️", message: "Today isn't just another day...", signature: "Satyam ❤️" },
      challenges_config: [],
      memories_json: [],
      intro_screens_json: [],
      music_config: { bg_music: "/audio/romantic_bg.mp3", volume: 0.7, loop: true },
      video_config: { memory_reel_video: "", finale_video: "", surprise_video: "" },
      final_surprise_config: { type: "LINK", url: "https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️", title: "One Last Surprise" },
      theme_config: { primary_color: "#FF3366", secondary_color: "#FF6699", bg_color: "#FFF0F5", preset: "ROMANTIC" },
      emergency_lock: 0,
      activity_logs: [],
      published_config: {},
    };
  }

  let cupidReasons: string[] = [];
  let memoryHuntTexts: string[] = [];
  let acceptedAnswers: string[] = ["clock", "a clock", "watch"];
  let birthdayWishJson: any = { heading: "HAPPY BIRTHDAY", name: "Sneha ❤️" };
  let challengesConfig: any[] = [];
  let memoriesJson: any[] = [];
  let introScreensJson: any[] = [];
  let musicConfig: any = {};
  let videoConfig: any = {};
  let finalSurpriseConfig: any = {};
  let themeConfig: any = {};
  let activityLogs: any[] = [];
  let publishedConfig: any = {};

  try { cupidReasons = JSON.parse(row.cupid_reasons || "[]"); } catch (e) {}
  try { memoryHuntTexts = JSON.parse(row.memory_hunt_texts || "[]"); } catch (e) {}
  try { acceptedAnswers = JSON.parse(row.accepted_answers || '["clock", "a clock", "watch"]'); } catch (e) {}
  try { birthdayWishJson = JSON.parse(row.birthday_wish_json || '{}'); } catch (e) {}
  try { challengesConfig = JSON.parse(row.challenges_config || '[]'); } catch (e) {}
  try { memoriesJson = JSON.parse(row.memories_json || '[]'); } catch (e) {}
  try { introScreensJson = JSON.parse(row.intro_screens_json || '[]'); } catch (e) {}
  try { musicConfig = JSON.parse(row.music_config || '{}'); } catch (e) {}
  try { videoConfig = JSON.parse(row.video_config || '{}'); } catch (e) {}
  try { finalSurpriseConfig = JSON.parse(row.final_surprise_config || '{}'); } catch (e) {}
  try { themeConfig = JSON.parse(row.theme_config || '{}'); } catch (e) {}
  try { activityLogs = JSON.parse(row.activity_logs || '[]'); } catch (e) {}
  try { publishedConfig = JSON.parse(row.published_config || '{}'); } catch (e) {}

  const defaultRealMemories = [
    { id: 1, title: "Love Is... Anne ❤️", subtitle: "My Whole World", quote: "You are my favorite thought every morning and my sweetest dream every night.", url: "/images/anne_love_is.jpg" },
    { id: 2, title: "Baby Anne's Smile 😊", subtitle: "Precious Joy", quote: "Your cute smile brightens up my darkest days.", url: "/images/anne_cute_baby_smile.jpg" },
    { id: 3, title: "Baby Anne's Pout 🥺", subtitle: "Cutest Expression", quote: "I can never stay mad at this adorable cute face.", url: "/images/anne_cute_baby_pout.jpg" },
    { id: 4, title: "Cutest Cheek Kiss 💋", subtitle: "Satyam & Anne", quote: "The sweetest kiss that makes my heart skip a beat every single time.", url: "/images/satyam_sneha_college_kiss.jpg" },
    { id: 5, title: "Golden Garden Moments ☀️", subtitle: "Together In Yellow", quote: "Sitting beside you under the warm sun is my happiest safe space.", url: "/images/satyam_sneha_yellow_dress.jpg" },
    { id: 6, title: "Laughing Together 😂", subtitle: "Pure Joy", quote: "Looking at photos together and laughing till our stomachs hurt.", url: "/images/satyam_sneha_phone_laugh.jpg" },
    { id: 7, title: "Anne's Sweetest Poses ✨", subtitle: "4 Cute Frames", quote: "Every expression of yours is a masterwork of beauty.", url: "/images/sneha_4grid_collage.jpg" },
    { id: 8, title: "Always By Your Side ❤️", subtitle: "Outdoors Memory", quote: "Holding you close and promise to cherish you forever.", url: "/images/satyam_sneha_collage_1.jpg" },
    { id: 9, title: "Warm Cozy Hug 🫂", subtitle: "Heartbeats Together", quote: "Every moment in your arms is a dream come true.", url: "/images/satyam_sneha_hug.jpg" },
    { id: 10, title: "Our First Memory ❤️", subtitle: "The Day It All Began", quote: "I didn't know that this moment would become one of my favorites.", url: "/images/secret_photo.png" },
    { id: 11, title: "That Day 🥹", subtitle: "Unforgettable Seconds", quote: "I wish I could go back to this moment and pause time forever.", url: "/images/puzzle_memory.png" },
    { id: 12, title: "Candlelit Dinner 🍷", subtitle: "Warm Evening Whispers", quote: "Soft lights, deep conversations, and your sweetest smile.", url: "/images/memory_date.png" },
  ];

  return {
    player_name: row.player_name && row.player_name !== "Satyam's Love ❤️" ? row.player_name : "Anne ❤️",
    partner_name: row.partner_name || "Satyam",
    nickname: row.nickname || "Baby",
    relationship_date: row.relationship_date || "2024-02-14",
    favorite_color: row.favorite_color || "#FF3366",
    birthday_date: "2026-08-10",
    birthday_time: "00:00:00",
    timezone: "Asia/Kolkata",
    unlock_timestamp: "2026-08-10T00:00:00+05:30",
    unlock_enabled: row.unlock_enabled !== undefined ? Number(row.unlock_enabled) : 1,
    countdown_enabled: row.countdown_enabled !== undefined ? Number(row.countdown_enabled) : 1,
    midnight_fireworks: row.midnight_fireworks !== undefined ? Number(row.midnight_fireworks) : 1,
    midnight_music: row.midnight_music !== undefined ? Number(row.midnight_music) : 1,
    puzzle_photo: "/images/anne_love_is.jpg",
    garden_photo: "/images/anne_cute_baby_pout.jpg",
    secret_photo: "/images/anne_cute_baby_smile.jpg",
    special_word: row.special_word || "LOVE",
    riddle_question: row.riddle_question || "I have a face but no eyes, hands but no arms. What am I?",
    riddle_answer: row.riddle_answer || "CLOCK",
    accepted_answers: acceptedAnswers,
    secret_surprise_link: row.secret_surprise_link || "https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️",
    cupid_reasons: cupidReasons,
    memory_hunt_texts: memoryHuntTexts,
    final_message: row.final_message || "Happy Birthday Anne ❤️",
    love_letter_text: row.love_letter_text || "My Dearest Anne (Baby),\n\nI don't know if words will ever be enough to explain how much you mean to me.\n\nYou are my whole world, my safe place, and my favorite person on Earth.\n\nWith all my heart,\n\nSatyam ❤️",
    birthday_wish_json: birthdayWishJson,
    challenges_config: challengesConfig,
    memories_json: defaultRealMemories,
    intro_screens_json: introScreensJson,
    music_config: musicConfig,
    video_config: videoConfig,
    final_surprise_config: finalSurpriseConfig,
    theme_config: themeConfig,
    emergency_lock: Number(row.emergency_lock || 0),
    activity_logs: activityLogs,
    published_config: publishedConfig,
  };
}

export function updateSettings(data: Partial<SettingsData>): SettingsData {
  const database = getDb();
  const current = getSettings();
  const updated = { ...current, ...data };

  const stmt = database.prepare(`
    UPDATE settings SET
      player_name = ?,
      partner_name = ?,
      nickname = ?,
      relationship_date = ?,
      favorite_color = ?,
      birthday_date = ?,
      birthday_time = ?,
      timezone = ?,
      unlock_timestamp = ?,
      unlock_enabled = ?,
      countdown_enabled = ?,
      midnight_fireworks = ?,
      midnight_music = ?,
      puzzle_photo = ?,
      garden_photo = ?,
      secret_photo = ?,
      special_word = ?,
      riddle_question = ?,
      riddle_answer = ?,
      accepted_answers = ?,
      secret_surprise_link = ?,
      cupid_reasons = ?,
      memory_hunt_texts = ?,
      final_message = ?,
      love_letter_text = ?,
      birthday_wish_json = ?,
      challenges_config = ?,
      memories_json = ?,
      intro_screens_json = ?,
      music_config = ?,
      video_config = ?,
      final_surprise_config = ?,
      theme_config = ?,
      emergency_lock = ?,
      activity_logs = ?,
      published_config = ?
    WHERE id = 1
  `);

  stmt.run(
    updated.player_name,
    updated.partner_name,
    updated.nickname,
    updated.relationship_date,
    updated.favorite_color,
    updated.birthday_date,
    updated.birthday_time,
    updated.timezone,
    updated.unlock_timestamp,
    updated.unlock_enabled,
    updated.countdown_enabled,
    updated.midnight_fireworks,
    updated.midnight_music,
    updated.puzzle_photo,
    updated.garden_photo,
    updated.secret_photo,
    updated.special_word,
    updated.riddle_question,
    updated.riddle_answer,
    JSON.stringify(updated.accepted_answers),
    updated.secret_surprise_link,
    JSON.stringify(updated.cupid_reasons),
    JSON.stringify(updated.memory_hunt_texts),
    updated.final_message,
    updated.love_letter_text,
    JSON.stringify(updated.birthday_wish_json),
    JSON.stringify(updated.challenges_config),
    JSON.stringify(updated.memories_json),
    JSON.stringify(updated.intro_screens_json),
    JSON.stringify(updated.music_config),
    JSON.stringify(updated.video_config),
    JSON.stringify(updated.final_surprise_config),
    JSON.stringify(updated.theme_config),
    updated.emergency_lock,
    JSON.stringify(updated.activity_logs),
    JSON.stringify(updated.published_config)
  );

  return updated;
}

export function getProgress(): ProgressData {
  const database = getDb();
  const stmt = database.prepare("SELECT * FROM progress WHERE id = 1");
  const row = stmt.get() as any;

  if (!row) {
    return {
      current_task: 1,
      completed_tasks: [],
      scores: {},
      player_name: "My Love",
    };
  }

  let completedTasks: number[] = [];
  let scores: Record<string, number> = {};

  try { completedTasks = JSON.parse(row.completed_tasks || "[]"); } catch (e) {}
  try { scores = JSON.parse(row.scores || "{}"); } catch (e) {}

  return {
    current_task: row.current_task,
    completed_tasks: completedTasks,
    scores: scores,
    player_name: row.player_name,
  };
}

export function updateProgress(data: Partial<ProgressData>): ProgressData {
  const database = getDb();
  const current = getProgress();
  const updated = { ...current, ...data };

  const stmt = database.prepare(`
    UPDATE progress SET
      current_task = ?,
      completed_tasks = ?,
      scores = ?,
      player_name = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `);

  stmt.run(
    updated.current_task,
    JSON.stringify(updated.completed_tasks),
    JSON.stringify(updated.scores),
    updated.player_name
  );

  return updated;
}

export function resetProgress(): ProgressData {
  return updateProgress({
    current_task: 1,
    completed_tasks: [],
    scores: {},
    player_name: "My Love",
  });
}

export function verifyAdminLogin(usernameOrEmail: string, passwordAttempt: string): boolean {
  const cleanUser = (usernameOrEmail || "").toString().trim().toLowerCase();
  const cleanPass = (passwordAttempt || "").toString().trim().toLowerCase();

  // Allow satyam / baby (case-insensitive & whitespace trimmed)
  if (
    (cleanUser === "satyam" || cleanUser === "admin" || cleanUser === "satyam@love.com") &&
    (cleanPass === "baby" || cleanPass === "admin")
  ) {
    return true;
  }

  try {
    const database = getDb();
    const hashed = hashPassword(passwordAttempt.trim());
    const stmt = database.prepare("SELECT * FROM admin_users WHERE (LOWER(username) = ? OR LOWER(email) = ?) AND password_hash = ?");
    const user = stmt.get(cleanUser, cleanUser, hashed);
    return !!user;
  } catch (e) {
    return false;
  }
}

export function logAdminActivity(action: string) {
  const current = getSettings();
  const logs = current.activity_logs || [];
  const newLog = {
    id: Date.now(),
    action,
    date: new Date().toLocaleDateString("en-IN"),
    time: new Date().toLocaleTimeString("en-IN"),
  };
  updateSettings({ activity_logs: [newLog, ...logs].slice(0, 50) });
}
