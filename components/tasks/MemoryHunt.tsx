"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, Heart } from "lucide-react";

interface MemoryHuntProps {
  gardenPhotoUrl?: string;
  customMemories?: string[];
  onComplete: () => void;
}

const DEFAULT_MEMORIES = [
  "You looked so beautiful that day ✨",
  "The time we laughed till our stomachs hurt 😂",
  "Holding your hand under the starry sky 🌌",
  "Our late-night deep conversations 💬",
  "Your sweet smile that brightens my day 😊",
  "The way you care about me so deeply ❤️",
  "Every single second with you is a gift 🎁",
];

export function MemoryHunt({ gardenPhotoUrl, customMemories, onComplete }: MemoryHuntProps) {
  const memoriesList = customMemories && customMemories.length >= 7 ? customMemories : DEFAULT_MEMORIES;
  const gardenBg = gardenPhotoUrl || "/images/hidden_garden.png";

  const [hearts, setHearts] = useState([
    { id: 1, x: 22, y: 35, memory: memoriesList[0], found: false },
    { id: 2, x: 48, y: 22, memory: memoriesList[1], found: false },
    { id: 3, x: 75, y: 40, memory: memoriesList[2], found: false },
    { id: 4, x: 30, y: 68, memory: memoriesList[3], found: false },
    { id: 5, x: 60, y: 72, memory: memoriesList[4], found: false },
    { id: 6, x: 82, y: 78, memory: memoriesList[5], found: false },
    { id: 7, x: 15, y: 80, memory: memoriesList[6], found: false },
  ]);

  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  const [foundCount, setFoundCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleHeartClick = (id: number, memoryText: string) => {
    setHearts((prev) =>
      prev.map((h) => (h.id === id ? { ...h, found: true } : h))
    );

    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX("sparkle");
    }

    setActiveMemory(memoryText);
    const newCount = foundCount + 1;
    setFoundCount(newCount);

    if (newCount >= memoriesList.length) {
      setIsCompleted(true);
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("win");
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-7 rounded-3xl bg-[#0F0F14]/90 border border-[#FF2D75]/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center relative select-none glass-specular">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F5C76A]" />
          TASK 5 — MEMORY HUNT 🔍
        </span>
        <span className="text-xs font-semibold text-[#FF9CBD]">
          Found: ❤️ {foundCount} / {memoriesList.length}
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Find the Hidden Hearts</h2>
      <p className="text-xs text-zinc-300 mb-4">
        Explore the photorealistic secret garden scene and tap all 7 hidden glowing hearts!
      </p>

      {/* Romantic Scene Area */}
      <div
        className="relative w-full h-72 sm:h-80 rounded-2xl border-2 border-[#FF2D75]/40 overflow-hidden shadow-2xl bg-cover bg-center animate-ken-burns"
        style={{ backgroundImage: `url('${gardenBg}')` }}
      >
        {hearts.map((h) => (
          <button
            key={h.id}
            onClick={() => !h.found && handleHeartClick(h.id, h.memory)}
            className={`absolute p-2.5 rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              h.found
                ? "bg-black/70 border border-[#F5C76A] opacity-60 scale-75 cursor-default"
                : "bg-[#FF2D75]/60 hover:bg-[#FF2D75] border-2 border-white shadow-[0_0_25px_#FF2D75] hover:scale-125 cursor-pointer animate-bounce"
            }`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <Heart
              className={`w-5 h-5 ${
                h.found ? "text-[#F5C76A] fill-[#F5C76A]" : "text-white fill-white"
              }`}
            />
            {!h.found && (
              <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-75 pointer-events-none" />
            )}
          </button>
        ))}

        {activeMemory && (
          <div className="absolute inset-x-3 bottom-3 p-4 rounded-2xl bg-black/95 border-2 border-[#FF2D75] backdrop-blur-xl animate-fade-in flex items-center justify-between text-left gap-3 shadow-[0_0_30px_#FF2D75]">
            <div>
              <span className="text-[10px] font-extrabold text-[#F5C76A] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#F5C76A]" /> MEMORY UNLOCKED
              </span>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                "{activeMemory}"
              </p>
            </div>
            <button
              onClick={() => setActiveMemory(null)}
              className="px-3.5 py-2 text-xs font-extrabold rounded-xl bg-gradient-to-r from-[#FF2D75] to-[#FF4F91] text-white hover:scale-105 transition-transform shrink-0 shadow-[0_0_15px_#FF2D75]"
            >
              Continue ❤️
            </button>
          </div>
        )}
      </div>

      {isCompleted && (
        <div className="mt-6 p-5 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD] animate-fade-in space-y-4 shadow-[0_0_30px_rgba(255,45,117,0.2)]">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-[#F5C76A]">
            <CheckCircle2 className="w-5 h-5 text-[#F5C76A]" /> 7 Memories Found ❤️
          </div>
          <p className="text-sm text-white font-medium italic">
            "Every hidden memory is a treasure I cherish forever."
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
