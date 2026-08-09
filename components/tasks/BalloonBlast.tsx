"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface BalloonBlastProps {
  onComplete: () => void;
}

interface Balloon {
  id: number;
  type: "gold" | "black";
  label: string;
  x: number;
  y: number;
  speedY: number;
  popped: boolean;
}

const BALLOON_MEMORIES = [
  "Our first memory ❤️",
  "You make me smile 😊",
  "My favorite date night 🌹",
  "Your beautiful laugh ✨",
  "Happy Birthday My Love 🎂",
  "You are my whole world 💖",
];

export function BalloonBlast({ onComplete }: BalloonBlastProps) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [revealedMessages, setRevealedMessages] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const initialBalloons: Balloon[] = BALLOON_MEMORIES.map((msg, idx) => ({
      id: idx,
      type: idx % 2 === 0 ? "gold" : "black",
      label: msg,
      x: 12 + idx * 15,
      y: 12 + (idx % 2) * 22,
      speedY: 0.15 + (idx % 3) * 0.05,
      popped: false,
    }));
    setBalloons(initialBalloons);
  }, []);

  const popBalloon = (id: number, label: string) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX("pop");
    }

    setRevealedMessages((prev) => [...prev, label]);
    const newCount = poppedCount + 1;
    setPoppedCount(newCount);

    if (newCount >= BALLOON_MEMORIES.length) {
      setIsCompleted(true);
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("win");
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-[#09090D]/90 border border-[#FF2D75]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,45,117,0.25)] text-center relative overflow-hidden glass-specular select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F5C76A]" />
          TASK 3 — BALLOON BLAST 🎈
        </span>
        <span className="text-xs font-semibold text-[#FF9CBD]">
          Popped: {poppedCount} / {BALLOON_MEMORIES.length}
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Pop the Metallic Gold & Black Balloons</h2>
      <p className="text-xs text-zinc-300 mb-4">
        Tap or click the floating gold and black balloons to reveal hidden birthday notes!
      </p>

      {/* Floating Sky Play Area */}
      <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-[#0B0B12] via-[#141220] to-[#050508] rounded-2xl border-2 border-[#FF2D75]/40 overflow-hidden shadow-2xl flex items-center justify-center">
        {balloons.map((b) => {
          if (b.popped) return null;
          const isGold = b.type === "gold";

          return (
            <button
              key={b.id}
              onClick={() => popBalloon(b.id, b.label)}
              className="absolute animate-float-realistic cursor-pointer group transition-transform hover:scale-125 focus:outline-none"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
              }}
            >
              {/* Realistic 3D Metallic Balloon */}
              <div
                className={`w-14 h-18 sm:w-16 sm:h-20 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] relative transition-all duration-300 shadow-2xl flex items-center justify-center ${
                  isGold
                    ? "shadow-[0_0_30px_rgba(245,199,106,0.5)] border border-[#FFE7A0]/50"
                    : "shadow-[0_0_30px_rgba(255,255,255,0.25)] border border-white/30"
                }`}
                style={{
                  background: isGold
                    ? "radial-gradient(circle at 35% 30%, #FFF5D0 0%, #F5C76A 25%, #D4AF37 55%, #8B6508 85%, #4A3500 100%)"
                    : "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #4A4A5A 22%, #1A1A24 55%, #0A0A0E 85%, #000000 100%)",
                }}
              >
                {/* 3D Specular Highlight Oval */}
                <div className="absolute top-2 left-2.5 w-4 h-7 rounded-full bg-white/70 blur-[1px] rotate-[-25deg] pointer-events-none" />

                {/* Center Icon */}
                <span className="text-base sm:text-lg drop-shadow-md z-10">
                  {isGold ? "✨" : "🖤"}
                </span>

                {/* Metallic Balloon Knot */}
                <div
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 rounded-b-sm border-t ${
                    isGold ? "bg-[#D4AF37] border-[#FFF5D0]" : "bg-zinc-700 border-zinc-400"
                  }`}
                />

                {/* Wobbling Balloon String */}
                <svg
                  className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-10 pointer-events-none overflow-visible"
                  viewBox="0 0 20 50"
                >
                  <path
                    d="M 10 0 Q 18 15 10 25 T 10 50"
                    fill="none"
                    stroke={isGold ? "#F5C76A" : "#FFFFFF"}
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />
                </svg>
              </div>
            </button>
          );
        })}

        {/* Revealed memory notes */}
        <div className="absolute inset-x-4 bottom-3 flex flex-wrap gap-2 justify-center pointer-events-none z-20">
          {revealedMessages.map((msg, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-bold rounded-full bg-black/80 border border-[#F5C76A] text-[#F5C76A] shadow-[0_0_15px_#F5C76A] backdrop-blur-md animate-fade-in"
            >
              ✨ {msg}
            </span>
          ))}
        </div>
      </div>

      {isCompleted && (
        <div className="mt-6 p-5 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD] animate-fade-in space-y-4 shadow-[0_0_30px_rgba(255,45,117,0.2)]">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-[#F5C76A]">
            <CheckCircle2 className="w-5 h-5 text-[#F5C76A]" /> 🎉 All Gold & Black Balloons Popped!
          </div>
          <p className="text-sm text-white font-medium italic">
            "All our sweet moments floating straight into my heart."
          </p>
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF2D75] to-[#FF4F91] text-white font-bold text-base shadow-[0_0_25px_#FF2D75] hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>UNLOCK NEXT ❤️</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

