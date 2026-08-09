"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  User,
  Film,
  Gamepad2,
  Image as ImageIcon,
  Mail,
  Music,
  Sparkles,
  Gift,
  Palette,
  Settings,
  Shield,
  LogOut,
  Save,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  Menu,
  X,
  Clock,
  Check,
  FileText,
  History,
  Edit2,
  ArrowUp,
  ArrowDown,
  Volume2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<string>("");
  const [editingChallengeIndex, setEditingChallengeIndex] = useState<number | null>(null);

  // Main Form Settings State
  const [settings, setSettings] = useState<any>({
    player_name: "Sneha ❤️",
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
    love_letter_text: `My Love,\n\nI don't know if words will ever be enough to explain how much you mean to me.\n\nYou have become such a beautiful part of my life, and every memory we've created together is something I will always treasure.\n\nWith all my heart,\n\nSatyam ❤️`,
    birthday_wish_json: {
      heading: "HAPPY BIRTHDAY",
      name: "Sneha ❤️",
      message: "Today isn't just another day... it's the day the most beautiful soul in the world was born.",
      signature: "Satyam ❤️",
    },
    challenges_config: [
      { id: 1, title: "UNLOCK OUR STORY", description: "Enter your name to unlock the journey", success: "Welcome my love!", enabled: true, required: true, points: 100 },
      { id: 2, title: "PHOTO PUZZLE", description: "Assemble our special memory picture", success: "You solved our memory puzzle!", enabled: true, required: true, points: 100 },
      { id: 3, title: "BALLOON BLAST", description: "Pop romantic balloons to discover surprises", success: "All balloons popped!", enabled: true, required: true, points: 100 },
      { id: 4, title: "HEART CATCH", description: "Catch falling love hearts in the basket", success: "You caught my heart!", enabled: true, required: true, points: 100 },
      { id: 5, title: "MEMORY HUNT", description: "Find hidden memory hearts in the garden", success: "All garden memories unlocked!", enabled: true, required: true, points: 100 },
      { id: 6, title: "LOVE SCRAMBLE", description: "Unscramble the secret romantic word", success: "Correct special word!", enabled: true, required: true, points: 100 },
      { id: 7, title: "PICTURE REVEAL", description: "Scratch & reveal our secret photo", success: "Secret photo revealed!", enabled: true, required: true, points: 100 },
      { id: 8, title: "DOT CONNECT", description: "Connect the constellation of love", success: "Constellation completed!", enabled: true, required: true, points: 100 },
      { id: 9, title: "LOVE MAZE", description: "Guide Cupid through the maze of hearts", success: "Maze escaped together!", enabled: true, required: true, points: 100 },
      { id: 10, title: "CUPID'S ARROW 🏹", description: "Shoot targets to unlock reasons why I love you", success: "All love reasons unlocked!", enabled: true, required: true, points: 100 },
      { id: 11, title: "MEMORY REEL", description: "Watch our romantic memory video reel", success: "Memory reel completed!", enabled: true, required: true, points: 100 },
      { id: 12, title: "TREASURE CHEST", description: "Solve the love riddle to open the chest", success: "Treasure chest unlocked!", enabled: true, required: true, points: 100 },
      { id: 13, title: "GRAND FINALE", description: "Blow out candles & reveal final surprise", success: "Happy Birthday my love!", enabled: true, required: true, points: 100 },
    ],
    intro_screens_json: [
      { id: 1, title: "Hey... ❤️", message: "I made something special for you.", button: "CONTINUE →" },
      { id: 2, title: "I need you to promise me...", message: "Promise me you won't skip anything.", button: "I PROMISE ❤️" },
      { id: 3, title: "Don't rush...", message: "Take your time and enjoy every moment.", button: "OKAY 🥺" },
      { id: 4, title: "This is only for you.", message: "A small journey created with all my heart.", button: "START JOURNEY ✨" },
    ],
    memories_json: [
      { id: 1, title: "Our First Memory ❤️", quote: "I didn't know this moment would become my favorite.", url: "/images/secret_photo.png" },
      { id: 2, title: "Cozy Evening ☕", quote: "Talking for hours without caring about time.", url: "/images/puzzle_memory.png" },
      { id: 3, title: "Under The Stars 🌌", quote: "Holding your hand felt like home.", url: "/images/hidden_garden.png" },
    ],
    music_config: { bg_music: "/audio/romantic_bg.mp3", volume: 0.7, loop: true, intro_music: "/audio/intro.mp3", finale_music: "/audio/win.mp3" },
    final_surprise_config: {
      type: "LINK",
      url: "https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️",
      title: "One Last Surprise",
      message: "Click the button below to claim your surprise!",
    },
    theme_config: {
      primary_color: "#FF3366",
      secondary_color: "#FF6699",
      bg_color: "#FFF0F5",
      preset: "ROMANTIC",
      particle_density: 30,
    },
    emergency_lock: 0,
    activity_logs: [],
  });

  // Verify auth on mount
  useEffect(() => {
    const isLocalAuth = typeof window !== "undefined" && localStorage.getItem("admin_auth_session") === "true";
    fetch("/api/admin/check-auth")
      .then((res) => {
        if (!res.ok && !isLocalAuth) {
          router.push("/admin/login");
        } else {
          loadAdminSettings();
        }
      })
      .catch(() => {
        if (isLocalAuth) {
          loadAdminSettings();
        } else {
          router.push("/admin/login");
        }
      });
  }, [router]);

  const loadAdminSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings((prev: any) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 3500);
  };

  const handleSave = async (actionDesc = "Saved settings") => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, action: actionDesc }),
      });
      if (res.ok) {
        showToast("Saved settings successfully! ❤️");
        loadAdminSettings();
      } else {
        showToast("Failed to save settings.");
      }
    } catch (err) {
      showToast("Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      const publishedConfig = { ...settings, published_at: new Date().toISOString() };
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settings,
          published_config: publishedConfig,
          action: "Published changes live to public website 🎉",
        }),
      });
      if (res.ok) {
        showToast("🎉 All changes are now LIVE on the website!");
        loadAdminSettings();
      }
    } catch (err) {
      showToast("Publish error.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth_session");
    }
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const toggleEmergencyLock = () => {
    const newLock = settings.emergency_lock === 1 ? 0 : 1;
    setSettings((prev: any) => ({ ...prev, emergency_lock: newLock }));
    handleSave(newLock === 1 ? "Locked public website" : "Unlocked public website");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0B15] text-white flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#FF3366] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#FF9CBD]">Loading Admin Control Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0711] text-zinc-100 flex flex-col font-sans select-none">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl bg-emerald-950 border border-emerald-500/60 text-emerald-300 text-xs font-bold shadow-2xl animate-bounce flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="w-full bg-[#120F1D] border-b border-zinc-800/80 px-4 sm:px-6 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-800 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF1A66] to-[#FF4F91] flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white leading-tight">
                13 Challenges of Love
              </h1>
              <p className="text-[10px] font-bold text-[#FF9CBD] tracking-wider uppercase">
                ⚙️ Admin Control Center
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => window.open("/", "_blank")}
            className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#FF3366]" />
            <span className="hidden sm:inline">LIVE PREVIEW</span>
          </button>

          <button
            onClick={() => handleSave("Saved from header")}
            disabled={saving}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-xs font-bold text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "SAVING..." : "SAVE DRAFT"}</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF1A66] to-[#FF4F91] text-white font-black text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PUBLISH LIVE 🎉</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Emergency Lock Alert Banner */}
      {settings.emergency_lock === 1 && (
        <div className="w-full bg-rose-950 border-b border-rose-600 px-4 py-2.5 flex items-center justify-between text-rose-200 text-xs font-bold">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>⚠️ EMERGENCY LOCK IS ACTIVE — PUBLIC WEBSITE IS CURRENTLY LOCKED FOR VISITORS!</span>
          </div>
          <button
            onClick={toggleEmergencyLock}
            className="px-3 py-1 rounded-lg bg-rose-800 hover:bg-rose-700 text-white font-black text-[11px]"
          >
            UNLOCK WEBSITE NOW 🔓
          </button>
        </div>
      )}

      {/* Sidebar + Content Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Navigation */}
        <aside
          className={`w-64 bg-[#120F1D] border-r border-zinc-800/80 flex flex-col justify-between z-20 transition-all duration-300 ${
            mobileMenuOpen ? "fixed inset-y-0 left-0 pt-16" : "hidden md:flex"
          }`}
        >
          <div className="p-3 space-y-1 overflow-y-auto">
            <SidebarButton
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard & Stats"
              active={activeTab === "dashboard"}
              onClick={() => { setActiveTab("dashboard"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Calendar className="w-4 h-4" />}
              label="Birthday Settings"
              active={activeTab === "birthday"}
              onClick={() => { setActiveTab("birthday"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<User className="w-4 h-4" />}
              label="Personalization"
              active={activeTab === "personalization"}
              onClick={() => { setActiveTab("personalization"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Film className="w-4 h-4" />}
              label="Intro Experience"
              active={activeTab === "intro"}
              onClick={() => { setActiveTab("intro"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Gamepad2 className="w-4 h-4" />}
              label="13 Challenges"
              active={activeTab === "challenges"}
              onClick={() => { setActiveTab("challenges"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<ImageIcon className="w-4 h-4" />}
              label="Photos & Memories"
              active={activeTab === "photos"}
              onClick={() => { setActiveTab("photos"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Mail className="w-4 h-4" />}
              label="Love Letter"
              active={activeTab === "letter"}
              onClick={() => { setActiveTab("letter"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Music className="w-4 h-4" />}
              label="Music Library"
              active={activeTab === "music"}
              onClick={() => { setActiveTab("music"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Film className="w-4 h-4 text-amber-400" />}
              label="Video Manager 🎬"
              active={activeTab === "video"}
              onClick={() => { setActiveTab("video"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Sparkles className="w-4 h-4" />}
              label="Grand Finale"
              active={activeTab === "finale"}
              onClick={() => { setActiveTab("finale"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Gift className="w-4 h-4" />}
              label="Final Surprise"
              active={activeTab === "surprise"}
              onClick={() => { setActiveTab("surprise"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Palette className="w-4 h-4" />}
              label="Theme & Design"
              active={activeTab === "theme"}
              onClick={() => { setActiveTab("theme"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<History className="w-4 h-4" />}
              label="Activity Log"
              active={activeTab === "logs"}
              onClick={() => { setActiveTab("logs"); setMobileMenuOpen(false); }}
            />
            <SidebarButton
              icon={<Settings className="w-4 h-4" />}
              label="Security & Auth"
              active={activeTab === "security"}
              onClick={() => { setActiveTab("security"); setMobileMenuOpen(false); }}
            />
          </div>

          <div className="p-4 border-t border-zinc-800/80 bg-[#161224] text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span>Status:</span>
              <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> READY
              </span>
            </div>
            <button
              onClick={toggleEmergencyLock}
              className="w-full py-2 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 font-bold text-[11px] hover:bg-rose-900/80 transition-colors flex items-center justify-center gap-1.5"
            >
              {settings.emergency_lock === 1 ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UNLOCK WEBSITE</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span>LOCK WEBSITE ⚠️</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Welcome back, Admin ❤️
                  </h2>
                  <p className="text-xs text-zinc-400 font-medium mt-1">
                    Manage and control every detail of the 13 Challenges Birthday Website.
                  </p>
                </div>

                <div className="px-4 py-2 rounded-2xl bg-[#1B152A] border border-[#FF3366]/40 text-xs font-black text-[#FF9CBD] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF3366]" />
                  <span>TARGET: {settings.birthday_date || "10 August 2026"} 12:00 AM IST</span>
                </div>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                <DashboardStatCard title="TOTAL CHALLENGES" value="13" color="text-[#FF3366]" />
                <DashboardStatCard title="PHOTOS" value={settings.memories_json?.length || "15"} color="text-amber-400" />
                <DashboardStatCard title="MEMORIES" value={settings.memories_json?.length || "15"} color="text-pink-400" />
                <DashboardStatCard title="MESSAGES" value="25" color="text-purple-400" />
                <DashboardStatCard
                  title="PUBLIC STATUS"
                  value={settings.emergency_lock === 1 ? "🔒 LOCKED" : "🔓 ACTIVE"}
                  color={settings.emergency_lock === 1 ? "text-rose-400" : "text-emerald-400"}
                />
              </div>

              {/* Pre-Birthday Completeness Checklist */}
              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF3366]" />
                  <span>Pre-Birthday Content Completeness Checklist</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <ChecklistItem label="Girlfriend Name configured" isDone={!!settings.player_name} />
                  <ChecklistItem label="Your Name configured" isDone={!!settings.partner_name} />
                  <ChecklistItem label="Birthday Date set (10 August 2026)" isDone={!!settings.birthday_date} />
                  <ChecklistItem label="Love Letter written" isDone={!!settings.love_letter_text} />
                  <ChecklistItem label="13 Challenges active & ready" isDone={true} />
                  <ChecklistItem label="Our Memories polaroids ready" isDone={true} />
                  <ChecklistItem label="Task 12 Riddle configured" isDone={!!settings.riddle_answer} />
                  <ChecklistItem label="Final Surprise Link ready" isDone={!!settings.secret_surprise_link} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BIRTHDAY SETTINGS */}
          {activeTab === "birthday" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">🎂 Birthday & Unlock Settings</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Birthday Date</label>
                    <input
                      type="date"
                      value={settings.birthday_date}
                      onChange={(e) => setSettings({ ...settings, birthday_date: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Birthday Time</label>
                    <input
                      type="text"
                      value={settings.birthday_time}
                      onChange={(e) => setSettings({ ...settings, birthday_time: e.target.value })}
                      placeholder="00:00:00"
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Timezone</label>
                    <input
                      type="text"
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Unlock Timestamp (ISO-8601)</label>
                    <input
                      type="text"
                      value={settings.unlock_timestamp}
                      onChange={(e) => setSettings({ ...settings, unlock_timestamp: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <ToggleSwitch
                    label="Midnight Countdown Lock"
                    checked={settings.countdown_enabled === 1}
                    onChange={(val) => setSettings({ ...settings, countdown_enabled: val ? 1 : 0 })}
                  />
                  <ToggleSwitch
                    label="Midnight Fireworks Reveal"
                    checked={settings.midnight_fireworks === 1}
                    onChange={(val) => setSettings({ ...settings, midnight_fireworks: val ? 1 : 0 })}
                  />
                </div>

                <button
                  onClick={() => handleSave("Updated Birthday Settings")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE BIRTHDAY SETTINGS ❤️
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PERSONALIZATION */}
          {activeTab === "personalization" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">👤 Personalization & Names</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Girlfriend's Name</label>
                    <input
                      type="text"
                      value={settings.player_name}
                      onChange={(e) => setSettings({ ...settings, player_name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Your Name (Partner)</label>
                    <input
                      type="text"
                      value={settings.partner_name}
                      onChange={(e) => setSettings({ ...settings, partner_name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Nickname</label>
                    <input
                      type="text"
                      value={settings.nickname}
                      onChange={(e) => setSettings({ ...settings, nickname: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Relationship Start Date</label>
                    <input
                      type="date"
                      value={settings.relationship_date}
                      onChange={(e) => setSettings({ ...settings, relationship_date: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSave("Updated Personalization Settings")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE PERSONALIZATION ❤️
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: INTRO EXPERIENCE EDITOR */}
          {activeTab === "intro" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">🎬 Intro Experience Editor</h2>

              <div className="space-y-4">
                {(settings.intro_screens_json || []).map((screen: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#161124] border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF3366]/20 border border-[#FF3366] text-[#FF3366] font-black text-[10px]">
                        INTRO SCREEN 0{idx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-400">Screen Title</label>
                        <input
                          type="text"
                          value={screen.title}
                          onChange={(e) => {
                            const updated = [...settings.intro_screens_json];
                            updated[idx].title = e.target.value;
                            setSettings({ ...settings, intro_screens_json: updated });
                          }}
                          className="w-full p-2.5 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-400">Button Text</label>
                        <input
                          type="text"
                          value={screen.button}
                          onChange={(e) => {
                            const updated = [...settings.intro_screens_json];
                            updated[idx].button = e.target.value;
                            setSettings({ ...settings, intro_screens_json: updated });
                          }}
                          className="w-full p-2.5 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-zinc-400">Main Message</label>
                      <input
                        type="text"
                        value={screen.message}
                        onChange={(e) => {
                          const updated = [...settings.intro_screens_json];
                          updated[idx].message = e.target.value;
                          setSettings({ ...settings, intro_screens_json: updated });
                        }}
                        className="w-full p-2.5 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-xs"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => handleSave("Updated Intro Experience")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE INTRO EXPERIENCE 🎬
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: 13 CHALLENGES MANAGEMENT */}
          {activeTab === "challenges" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-black text-white">🎮 13 Challenges Management</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(settings.challenges_config || []).map((ch: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#161124] border border-zinc-800 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF3366]/20 border border-[#FF3366] text-[#FF3366] font-black text-[10px]">
                        CHALLENGE 0{ch.id || idx + 1}
                      </span>
                      <span className={`text-xs font-bold ${ch.enabled ? "text-emerald-400" : "text-rose-400"}`}>
                        {ch.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{ch.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{ch.description}</p>

                    <button
                      onClick={() => setEditingChallengeIndex(editingChallengeIndex === idx ? null : idx)}
                      className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-[#FF3366] text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{editingChallengeIndex === idx ? "CLOSE EDITOR" : "EDIT CONFIGURATION"}</span>
                    </button>

                    {editingChallengeIndex === idx && (
                      <div className="pt-3 border-t border-zinc-800 space-y-2 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-400">Title</label>
                          <input
                            type="text"
                            value={ch.title}
                            onChange={(e) => {
                              const updated = [...settings.challenges_config];
                              updated[idx].title = e.target.value;
                              setSettings({ ...settings, challenges_config: updated });
                            }}
                            className="w-full p-2 rounded-lg bg-[#1E1730] border border-zinc-700 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-400">Description</label>
                          <input
                            type="text"
                            value={ch.description}
                            onChange={(e) => {
                              const updated = [...settings.challenges_config];
                              updated[idx].description = e.target.value;
                              setSettings({ ...settings, challenges_config: updated });
                            }}
                            className="w-full p-2 rounded-lg bg-[#1E1730] border border-zinc-700 text-white"
                          />
                        </div>
                        <button
                          onClick={() => {
                            setEditingChallengeIndex(null);
                            handleSave(`Saved Challenge ${idx + 1}`);
                          }}
                          className="w-full py-2 rounded-lg bg-[#FF3366] text-white font-bold"
                        >
                          SAVE THIS CHALLENGE
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PHOTOS & MEMORIES MANAGER */}
          {activeTab === "photos" && (
            <div className="space-y-6 max-w-4xl animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-white">📸 Photos & Memories Manager</h2>
                <button
                  onClick={() => {
                    const newMem = {
                      id: Date.now(),
                      title: `New Memory ${settings.memories_json.length + 1}`,
                      quote: "Add a special caption for this memory.",
                      url: "/images/puzzle_memory.png",
                    };
                    setSettings({ ...settings, memories_json: [...settings.memories_json, newMem] });
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FF3366] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW MEMORY PHOTO</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(settings.memories_json || []).map((mem: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#161124] border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FF9CBD]">PHOTO #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = settings.memories_json.filter((_: any, i: number) => i !== idx);
                          setSettings({ ...settings, memories_json: updated });
                        }}
                        className="p-1 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400">Photo Title</label>
                      <input
                        type="text"
                        value={mem.title}
                        onChange={(e) => {
                          const updated = [...settings.memories_json];
                          updated[idx].title = e.target.value;
                          setSettings({ ...settings, memories_json: updated });
                        }}
                        className="w-full p-2.5 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400">Caption / Quote</label>
                      <input
                        type="text"
                        value={mem.quote}
                        onChange={(e) => {
                          const updated = [...settings.memories_json];
                          updated[idx].quote = e.target.value;
                          setSettings({ ...settings, memories_json: updated });
                        }}
                        className="w-full p-2.5 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400">Image File Path / URL</label>
                      <input
                        type="text"
                        value={mem.url}
                        onChange={(e) => {
                          const updated = [...settings.memories_json];
                          updated[idx].url = e.target.value;
                          setSettings({ ...settings, memories_json: updated });
                        }}
                        className="w-full p-2.5 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSave("Updated Memories Gallery Photos")}
                className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
              >
                SAVE PHOTOS & MEMORIES 📸
              </button>
            </div>
          )}

          {/* TAB 7: LOVE LETTER EDITOR */}
          {activeTab === "letter" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">💌 Love Letter Editor</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-4">
                <label className="text-xs font-bold text-zinc-300 block">
                  Handwritten Letter Content (Supports line breaks & emojis):
                </label>

                <textarea
                  rows={14}
                  value={settings.love_letter_text}
                  onChange={(e) => setSettings({ ...settings, love_letter_text: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-[#1E1730] border border-zinc-700 text-white font-serif text-sm leading-relaxed focus:border-[#FF3366] outline-none"
                />

                <button
                  onClick={() => handleSave("Updated Love Letter")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE LOVE LETTER 💌
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: MUSIC MANAGER */}
          {activeTab === "music" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">🎵 Music & Audio Library</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Background Music File Path / URL</label>
                  <input
                    type="text"
                    value={settings.music_config?.bg_music || "/audio/romantic_bg.mp3"}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        music_config: { ...settings.music_config, bg_music: e.target.value },
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Default Music Volume (0.0 to 1.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={settings.music_config?.volume || 0.7}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        music_config: { ...settings.music_config, volume: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                  />
                </div>

                <button
                  onClick={() => handleSave("Updated Music Library")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE MUSIC SETTINGS 🎵
                </button>
              </div>
            </div>
          )}

          {/* TAB: VIDEO MANAGER */}
          {activeTab === "video" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">🎬 Video Manager</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-5">
                <p className="text-xs text-zinc-400">
                  Configure HTML5 video paths stored directly in SQLite DB (`love_game.db`). Videos will play automatically in Challenge 11 Memory Reel and Grand Finale!
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Memory Reel Video File Path / URL (Task 11)</label>
                  <input
                    type="text"
                    value={settings.video_config?.memory_reel_video || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        video_config: { ...settings.video_config, memory_reel_video: e.target.value },
                      })
                    }
                    placeholder="e.g. /videos/memory_reel.mp4 or https://..."
                    className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Grand Finale Video Path / URL (Task 13)</label>
                  <input
                    type="text"
                    value={settings.video_config?.finale_video || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        video_config: { ...settings.video_config, finale_video: e.target.value },
                      })
                    }
                    placeholder="e.g. /videos/birthday_finale.mp4"
                    className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Final Surprise Video Path / URL</label>
                  <input
                    type="text"
                    value={settings.video_config?.surprise_video || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        video_config: { ...settings.video_config, surprise_video: e.target.value },
                      })
                    }
                    placeholder="e.g. /videos/surprise.mp4"
                    className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm font-mono"
                  />
                </div>

                <button
                  onClick={() => handleSave("Updated Video Manager Settings")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE VIDEO SETTINGS 🎬
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: GRAND FINALE */}
          {activeTab === "finale" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">🎆 Grand Finale Editor</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Final Birthday Message</label>
                  <textarea
                    rows={6}
                    value={settings.final_message}
                    onChange={(e) => setSettings({ ...settings, final_message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm leading-relaxed"
                  />
                </div>

                <button
                  onClick={() => handleSave("Updated Grand Finale")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE GRAND FINALE 🎆
                </button>
              </div>
            </div>
          )}

          {/* TAB 10: TASK 12 RIDDLE & FINAL SURPRISE */}
          {activeTab === "surprise" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">🎁 Task 12 Riddle & Final Surprise</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Treasure Chest Riddle Question</label>
                  <textarea
                    rows={2}
                    value={settings.riddle_question}
                    onChange={(e) => setSettings({ ...settings, riddle_question: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Primary Answer</label>
                  <input
                    type="text"
                    value={settings.riddle_answer}
                    onChange={(e) => setSettings({ ...settings, riddle_answer: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Secret WhatsApp Surprise Link</label>
                  <input
                    type="text"
                    value={settings.secret_surprise_link}
                    onChange={(e) => setSettings({ ...settings, secret_surprise_link: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                  />
                </div>

                <button
                  onClick={() => handleSave("Updated Task 12 Riddle & Surprise")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE RIDDLE & SURPRISE 🎁
                </button>
              </div>
            </div>
          )}

          {/* TAB 11: THEME & DESIGN */}
          {activeTab === "theme" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">🎨 Theme & Design Customizer</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Primary Color</label>
                    <input
                      type="color"
                      value={settings.theme_config?.primary_color || "#FF3366"}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          theme_config: { ...settings.theme_config, primary_color: e.target.value },
                        })
                      }
                      className="w-full h-12 rounded-xl bg-[#1E1730] border border-zinc-700 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Preset Theme</label>
                    <select
                      value={settings.theme_config?.preset || "ROMANTIC"}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          theme_config: { ...settings.theme_config, preset: e.target.value },
                        })
                      }
                      className="w-full p-3 rounded-xl bg-[#1E1730] border border-zinc-700 text-white text-sm"
                    >
                      <option value="ROMANTIC">❤️ ROMANTIC (Pink & Soft White)</option>
                      <option value="MIDNIGHT">🌙 MIDNIGHT (Dark Violet & Neon Pink)</option>
                      <option value="ROSE_GOLD">✨ ROSE GOLD (Gold & Crimson)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => handleSave("Updated Theme & Design")}
                  className="w-full py-3.5 rounded-xl bg-[#FF3366] text-white font-black text-sm hover:bg-[#FF6699] transition-all"
                >
                  SAVE THEME & DESIGN 🎨
                </button>
              </div>
            </div>
          )}

          {/* TAB 12: ACTIVITY LOG */}
          {activeTab === "logs" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">📜 Admin Activity Log</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-3">
                {settings.activity_logs && settings.activity_logs.length > 0 ? (
                  settings.activity_logs.map((log: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#1E1730] border border-zinc-800 text-xs flex items-center justify-between"
                    >
                      <span className="font-bold text-zinc-200">{log.action}</span>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {log.date} {log.time}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 text-center py-4">No recent activity logs recorded.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 13: SECURITY */}
          {activeTab === "security" && (
            <div className="space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-2xl font-black text-white">🔐 Security & Authentication</h2>

              <div className="p-6 rounded-3xl bg-[#161124] border border-zinc-800 space-y-4">
                <p className="text-xs text-zinc-400">
                  Your admin panel is protected with SHA-256 server-side authentication and HTTP-only cookies.
                </p>

                <div className="p-4 rounded-2xl bg-[#1E1730] border border-zinc-700 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-300">Admin Account:</span>
                    <span className="text-white font-mono">satyam / satyam@love.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-300">Auth Method:</span>
                    <span className="text-emerald-400 font-bold">SHA-256 Hashed Password</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-3.5 rounded-xl bg-rose-950 border border-rose-500/50 text-rose-300 font-black text-sm hover:bg-rose-900 transition-all"
                >
                  LOGOUT OF ADMIN SESSION 🔒
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* Helper Sidebar Button Component */
function SidebarButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
        active
          ? "bg-gradient-to-r from-[#FF1A66] to-[#FF4F91] text-white shadow-md"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function DashboardStatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="p-4 rounded-2xl bg-[#161124] border border-zinc-800/80 space-y-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
        {title}
      </span>
      <span className={`text-xl sm:text-2xl font-black ${color} block`}>{value}</span>
    </div>
  );
}

function ChecklistItem({ label, isDone }: { label: string; isDone: boolean }) {
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1E1730] border border-zinc-800">
      {isDone ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
      )}
      <span className={isDone ? "text-zinc-200 font-semibold" : "text-zinc-400"}>{label}</span>
    </div>
  );
}

function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between p-3.5 rounded-xl bg-[#1E1730] border border-zinc-700 cursor-pointer select-none"
    >
      <span className="text-xs font-bold text-zinc-200">{label}</span>
      <div
        className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
          checked ? "bg-[#FF3366]" : "bg-zinc-700"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}
