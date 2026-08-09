"use client";

import React, { useState, useEffect } from "react";
import { X, Save, RotateCcw, Sparkles, Image, MessageSquare, Shield, Play } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsUpdated: () => void;
  onResetProgress: () => void;
  onJumpToTask?: (taskNum: number) => void;
}

export function AdminModal({
  isOpen,
  onClose,
  onSettingsUpdated,
  onResetProgress,
  onJumpToTask,
}: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "photos" | "content" | "testing">("general");
  const [formData, setFormData] = useState({
    player_name: "Satyam's Love ❤️",
    partner_name: "Satyam",
    puzzle_photo: "/images/puzzle_memory.png",
    garden_photo: "/images/hidden_garden.png",
    secret_photo: "/images/secret_photo.png",
    special_word: "LOVE",
    riddle_question: "I have a face but no eyes, hands but no arms. What am I?",
    riddle_answer: "CLOCK",
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
    love_letter_text: `My Love,

I don't know if words will ever be enough to explain how much you mean to me.

You have become such a beautiful part of my life, and every memory we've created together is something I will always treasure.

I know I'm not perfect. I've made mistakes, I've said things I shouldn't have, and sometimes I may not have shown you how much I care.

But one thing I want you to always know is that you matter to me more than you realize.

Thank you for every smile, every conversation, every silly moment, every beautiful memory, and simply for being you.

I hope this birthday brings you all the happiness you deserve.

With all my heart,

Satyam ❤️`
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetch("/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            setFormData(data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMsg("Settings saved to SQLite database successfully! ❤️");
        onSettingsUpdated();
        setTimeout(() => setMsg(""), 3000);
      }
    } catch (err) {
      setMsg("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const updateCupidReason = (index: number, val: string) => {
    const arr = [...formData.cupid_reasons];
    arr[index] = val;
    setFormData({ ...formData, cupid_reasons: arr });
  };

  const updateMemoryText = (index: number, val: string) => {
    const arr = [...formData.memory_hunt_texts];
    arr[index] = val;
    setFormData({ ...formData, memory_hunt_texts: arr });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-lg overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#0B0B0F] border border-[#FF2D75]/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(255,45,117,0.35)] relative my-auto max-h-[92vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <Shield className="w-6 h-6 text-[#F5C76A]" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Admin Panel — Customize Everything
          </h2>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-950 rounded-2xl border border-white/10 mb-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "general"
                ? "bg-[#FF2D75] text-white shadow-[0_0_12px_#FF2D75]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            👤 General & Names
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "photos"
                ? "bg-[#FF2D75] text-white shadow-[0_0_12px_#FF2D75]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            📸 Photos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "content"
                ? "bg-[#FF2D75] text-white shadow-[0_0_12px_#FF2D75]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            💌 Messages & Riddles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("testing")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "testing"
                ? "bg-[#FF2D75] text-white shadow-[0_0_12px_#FF2D75]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            🎮 Jump / Reset
          </button>
        </div>

        {msg && (
          <div className="mb-3 p-3 rounded-xl bg-[#FF2D75]/20 border border-[#FF2D75] text-[#FF9CBD] text-xs font-semibold text-center animate-fade-in">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          {/* TAB 1: GENERAL */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Her Name (Girlfriend / Player Name)
                </label>
                <input
                  type="text"
                  value={formData.player_name}
                  onChange={(e) => setFormData({ ...formData, player_name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.partner_name}
                  onChange={(e) => setFormData({ ...formData, partner_name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Special Scramble Word (Task 6)
                </label>
                <input
                  type="text"
                  value={formData.special_word}
                  onChange={(e) => setFormData({ ...formData, special_word: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none uppercase tracking-widest"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Secret Surprise Button Link (Task 13 Finale)
                </label>
                <input
                  type="url"
                  value={formData.secret_surprise_link}
                  onChange={(e) => setFormData({ ...formData, secret_surprise_link: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none"
                  placeholder="https://wa.me/..."
                  required
                />
              </div>
            </div>
          )}

          {/* TAB 2: PHOTOS */}
          {activeTab === "photos" && (
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Task 2: Jigsaw Photo Puzzle Image URL
                </label>
                <input
                  type="text"
                  value={formData.puzzle_photo}
                  onChange={(e) => setFormData({ ...formData, puzzle_photo: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none"
                  placeholder="/images/puzzle_memory.png or image URL"
                  required
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  Enter image path or paste a direct image URL.
                </p>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Task 5: Memory Hunt Garden Scene Image URL
                </label>
                <input
                  type="text"
                  value={formData.garden_photo}
                  onChange={(e) => setFormData({ ...formData, garden_photo: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none"
                  placeholder="/images/hidden_garden.png or image URL"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Task 7: Secret Picture Reveal Image URL
                </label>
                <input
                  type="text"
                  value={formData.secret_photo}
                  onChange={(e) => setFormData({ ...formData, secret_photo: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none"
                  placeholder="/images/secret_photo.png or image URL"
                  required
                />
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT & MESSAGES */}
          {activeTab === "content" && (
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Task 12: Treasure Chest Riddle Question
                </label>
                <input
                  type="text"
                  value={formData.riddle_question}
                  onChange={(e) => setFormData({ ...formData, riddle_question: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Task 12: Treasure Chest Riddle Answer Key
                </label>
                <input
                  type="text"
                  value={formData.riddle_answer}
                  onChange={(e) => setFormData({ ...formData, riddle_answer: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none uppercase tracking-widest"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Task 10: Cupid's Arrow (8 Reasons Why You Love Her)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {formData.cupid_reasons.map((reason, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={reason}
                      onChange={(e) => updateCupidReason(idx, e.target.value)}
                      className="px-2.5 py-2 rounded-lg bg-black border border-zinc-800 text-white text-xs focus:border-[#FF2D75] outline-none"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Task 5: Memory Hunt (7 Hidden Messages)
                </label>
                <div className="space-y-1.5">
                  {formData.memory_hunt_texts.map((msg, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={msg}
                      onChange={(e) => updateMemoryText(idx, e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-black border border-zinc-800 text-white text-xs focus:border-[#FF2D75] outline-none"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Intro Love Letter Text (Page 5.5 Envelope) 💌
                </label>
                <textarea
                  rows={6}
                  value={formData.love_letter_text}
                  onChange={(e) => setFormData({ ...formData, love_letter_text: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none leading-relaxed text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Task 13: Final Birthday Apology & Message
                </label>
                <textarea
                  rows={5}
                  value={formData.final_message}
                  onChange={(e) => setFormData({ ...formData, final_message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:border-[#FF2D75] outline-none leading-relaxed"
                  required
                />
              </div>
            </div>
          )}

          {/* TAB 4: TESTING / JUMP */}
          {activeTab === "testing" && (
            <div className="space-y-4">
              <p className="text-zinc-300 text-xs">
                Jump directly to any task to test games & animations:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {Array.from({ length: 13 }).map((_, i) => {
                  const taskNum = i + 1;
                  return (
                    <button
                      key={taskNum}
                      type="button"
                      onClick={() => {
                        if (onJumpToTask) onJumpToTask(taskNum);
                        onClose();
                      }}
                      className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#FF2D75] text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#FF2D75]/20 transition-all"
                    >
                      <Play className="w-3 h-3 text-[#FF2D75]" /> Task {taskNum}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={onResetProgress}
                  className="w-full py-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 font-bold hover:bg-red-900 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset All Progress (Start From Beginning)
                </button>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-zinc-900 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF2D75] via-[#FF4F91] to-[#FF2D75] text-white font-extrabold text-sm shadow-[0_0_20px_#FF2D75] hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> {saving ? "Saving to Database..." : "Save All Settings ❤️"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
