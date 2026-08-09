"use client";

import React, { useState } from "react";
import { Heart, Sparkles, Unlock, ArrowRight } from "lucide-react";

interface StoryUnlockProps {
  initialName: string;
  onComplete: (name: string) => void;
}

export function StoryUnlock({ initialName, onComplete }: StoryUnlockProps) {
  const [name, setName] = useState(initialName || "Satyam's Love ❤️");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX("win");
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsUnlocked(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 md:p-8 rounded-3xl bg-black/60 border border-[#FF2D75]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,45,117,0.25)] text-center relative overflow-hidden">
      {/* Top Rose Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#FF2D75] via-[#FF4F91] to-[#F5C76A] p-0.5 shadow-[0_0_20px_#FF2D75]">
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl">
          🌹
        </div>
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30">
        TASK 1 — UNLOCK THE STORY
      </span>

      {!isUnlocked ? (
        <form onSubmit={handleUnlock} className="mt-6 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-[#FF9CBD] to-[#F5C76A] bg-clip-text text-transparent">
              Welcome My Love ❤️
            </h2>
            <p className="text-sm text-zinc-300 mt-2">
              Enter your name to unlock the beginning of our romantic story.
            </p>
          </div>

          <div className="max-w-sm mx-auto">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 text-center text-lg font-semibold rounded-2xl bg-black/80 border-2 border-[#FF2D75]/50 text-white placeholder-zinc-500 focus:border-[#FF2D75] focus:shadow-[0_0_20px_#FF2D75] outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-sm mx-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FF2D75] via-[#FF4F91] to-[#FF2D75] text-white font-bold text-lg shadow-[0_0_25px_#FF2D75] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Preparing your journey... ❤️</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 fill-white animate-pulse" />
                <span>START JOURNEY ❤️</span>
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="mt-6 space-y-6 animate-fade-in">
          <div className="p-4 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD]">
            <div className="flex items-center justify-center gap-2 text-xl font-bold text-[#F5C76A] mb-2">
              <Unlock className="w-6 h-6 text-[#F5C76A]" /> STORY UNLOCKED 🔓
            </div>
            <p className="text-lg text-white font-semibold italic">
              "Welcome, {name} ❤️"
            </p>
            <p className="text-sm text-zinc-300 mt-2">
              Every beautiful story has a beginning. Let’s revisit ours.
            </p>
          </div>

          <button
            onClick={() => onComplete(name)}
            className="w-full max-w-sm mx-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-[#F5C76A] via-[#FF4F91] to-[#FF2D75] text-black font-extrabold text-lg shadow-[0_0_25px_#F5C76A] hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>UNLOCK CHALLENGE 2 ❤️</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
