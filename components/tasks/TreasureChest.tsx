"use client";

import React, { useState } from "react";
import { Sparkles, Lock, Unlock, CheckCircle2, ArrowRight, Gift } from "lucide-react";

interface TreasureChestProps {
  customRiddleQuestion?: string;
  customRiddleAnswer?: string;
  onComplete: () => void;
}

export function TreasureChest({
  customRiddleQuestion,
  customRiddleAnswer,
  onComplete,
}: TreasureChestProps) {
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [shaking, setShaking] = useState(false);

  const riddleQ = customRiddleQuestion || "I have a face but no eyes, hands but no arms. What am I?";
  const correctAnswer = (customRiddleAnswer || "CLOCK").trim().toUpperCase();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (answer.trim().toUpperCase() === correctAnswer) {
      setShaking(true);
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("win");
      }

      setTimeout(() => {
        setShaking(false);
        setIsOpen(true);
      }, 1000);
    } else {
      setShaking(true);
      setErrorMsg("Almost! ❤️ Try again or ask for a clue.");
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("wrong");
      }
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-7 rounded-3xl bg-[#0F0F14]/90 border border-[#FF2D75]/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center relative select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30">
          TASK 12 — TREASURE CHEST 🎁
        </span>
        <span className="text-xs font-semibold text-[#FF9CBD]">
          Final Clue Challenge
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Unlock Your Birthday Gift</h2>
      <p className="text-xs text-zinc-300 mb-6">
        Solve the final romantic riddle to open the golden treasure chest!
      </p>

      {/* 3D Chest Box Graphic */}
      <div className="my-6">
        <div
          className={`w-32 h-32 mx-auto rounded-3xl flex items-center justify-center text-6xl shadow-2xl transition-all duration-500 ${
            isOpen
              ? "bg-gradient-to-tr from-[#F5C76A] via-[#FF4F91] to-[#FF2D75] shadow-[0_0_50px_#F5C76A] scale-110"
              : shaking
              ? "bg-zinc-900 border-2 border-red-500 animate-bounce"
              : "bg-zinc-900 border-2 border-[#F5C76A]/60 shadow-[0_0_25px_#F5C76A]"
          }`}
        >
          {isOpen ? "🔓 🎁" : "🎁"}
        </div>
      </div>

      {!isOpen ? (
        <form onSubmit={handleUnlock} className="space-y-4 max-w-sm mx-auto">
          <div className="p-4 rounded-2xl bg-black border border-[#F5C76A]/40 text-left">
            <span className="text-[10px] font-bold text-[#F5C76A] uppercase tracking-wider block mb-1">
              🗝️ THE FINAL RIDDLE CLUE:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
              "{riddleQ}"
            </p>
          </div>

          {errorMsg && (
            <p className="text-xs font-bold text-[#FF2D75] animate-pulse">
              {errorMsg}
            </p>
          )}

          <div>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full px-4 py-3.5 text-center text-lg font-semibold rounded-2xl bg-black border-2 border-[#F5C76A]/50 text-white placeholder-zinc-500 focus:border-[#F5C76A] focus:shadow-[0_0_20px_#F5C76A] outline-none tracking-widest uppercase transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F5C76A] via-[#FF4F91] to-[#FF2D75] text-black font-extrabold text-lg shadow-[0_0_25px_#F5C76A] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5 text-black" />
            <span>SOLVE CLUE & UNLOCK 🔓</span>
          </button>
        </form>
      ) : (
        <div className="p-5 rounded-2xl bg-[#F5C76A]/10 border border-[#F5C76A]/40 text-[#F5C76A] animate-fade-in space-y-4">
          <div className="flex items-center justify-center gap-2 text-xl font-bold">
            <Unlock className="w-6 h-6 text-[#F5C76A]" /> CHEST UNLOCKED! 🎁
          </div>
          <p className="text-base text-white font-bold">
            "YOUR REAL SURPRISE IS READY!"
          </p>
          <p className="text-xs text-zinc-300">
            Check your WhatsApp or look under your pillow for your birthday gift ❤️
          </p>

          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF2D75] via-[#FF4F91] to-[#F5C76A] text-white font-extrabold text-lg shadow-[0_0_35px_#FF2D75] hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>PROCEED TO GRAND FINALE 🎆</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
