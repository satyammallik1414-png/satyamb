"use client";

import React, { useState, useEffect } from "react";
import { FireworksCanvas } from "@/components/fx/FireworksCanvas";
import { Heart, Sparkles, Gift, ExternalLink, RefreshCw, Camera } from "lucide-react";

interface GrandFinaleProps {
  playerName: string;
  finalMessage?: string;
  surpriseLink?: string;
  onResetGame: () => void;
}

const GALLERY_PHOTOS = [
  { url: "/images/secret_photo.png", label: "Golden Sunset" },
  { url: "/images/puzzle_memory.png", label: "Cozy Fireplace" },
  { url: "/images/hidden_garden.png", label: "Secret Garden" },
  { url: "/images/memory_date.png", label: "Candlelit Date" },
  { url: "/images/memory_beach.png", label: "Twilight Beach" },
];

export function GrandFinale({
  playerName,
  finalMessage,
  surpriseLink,
  onResetGame,
}: GrandFinaleProps) {
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX("win");
    }
    const timer = setTimeout(() => {
      setShowLetter(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const defaultMessage = `I know I haven't been perfect.

I'm truly sorry for hurting you.

You mean the world to me, and I'm so grateful to have you in my life.

You make every moment beautiful and worthwhile.

I promise to always cherish you, respect you, and make you happy.

Happy Birthday to the most amazing girl in the world.

I love you so much. ❤️`;

  const letterText = finalMessage || defaultMessage;
  const linkUrl = surpriseLink || "https://wa.me/?text=I%20Love%20You%20so%20much!%20❤️";

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-10 rounded-3xl bg-[#09090D]/90 border-2 border-[#FF2D75] backdrop-blur-2xl shadow-[0_0_60px_rgba(255,45,117,0.4)] text-center relative overflow-hidden z-20 glass-specular select-none">
      <FireworksCanvas />

      {/* Grand Title Banner */}
      <div className="relative z-20 space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#FF2D75] via-[#FF4F91] to-[#F5C76A] p-1 shadow-[0_0_35px_#FF2D75] animate-bounce">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl">
            👑
          </div>
        </div>

        <span className="text-xs font-extrabold uppercase tracking-widest text-[#F5C76A] px-4 py-1.5 rounded-full bg-[#F5C76A]/20 border border-[#F5C76A]/40 inline-flex items-center gap-1.5 shadow-[0_0_15px_#F5C76A]">
          <Sparkles className="w-3.5 h-3.5 text-[#F5C76A]" />
          TASK 13 — GRAND FINALE 🎆
        </span>

        <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-[#FF9CBD] to-[#F5C76A] bg-clip-text text-transparent drop-shadow-lg">
          Happy Birthday <br />
          <span className="text-[#FF2D75] drop-shadow-[0_0_25px_#FF2D75]">
            {playerName} ❤️
          </span>
        </h1>

        <p className="text-sm text-[#FF9CBD] font-semibold">
          You collected all 13 memories & completed the journey of love! ✨
        </p>

        {/* Photorealistic Memory Gallery Strip */}
        <div className="pt-2 pb-4">
          <p className="text-xs font-bold text-[#F5C76A] uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5">
            <Camera className="w-4 h-4 text-[#F5C76A]" /> OUR PHOTOREALISTIC MEMORY GALLERY
          </p>
          <div className="flex justify-center gap-2 overflow-x-auto pb-2 px-1">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="w-20 sm:w-24 p-1.5 bg-white rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-125 hover:z-30 hover:rotate-0 cursor-pointer border border-zinc-200"
                style={{
                  transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i + 2)}deg)`,
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="w-full h-16 sm:h-20 object-cover rounded-lg"
                />
                <span className="text-[9px] font-bold text-zinc-800 block text-center mt-1 truncate">
                  {photo.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Collectible Badges Grid */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto py-1">
          {["❤️", "📸", "🎈", "💕", "🔍", "💌", "📷", "💖", "🌹", "🏹", "🎞️", "🎁", "🎆"].map(
            (badge, idx) => (
              <span
                key={idx}
                className="w-8 h-8 rounded-full bg-black/70 border border-[#FF2D75]/50 flex items-center justify-center text-sm shadow-[0_0_12px_#FF2D75] hover:scale-125 transition-transform"
                title={`Memory ${idx + 1}`}
              >
                {badge}
              </span>
            )
          )}
        </div>
      </div>

      {/* Love Letter Section */}
      {showLetter && (
        <div className="mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-zinc-950/90 to-black/95 border border-[#FF2D75]/50 shadow-[0_0_35px_rgba(255,45,117,0.25)] text-left relative z-20 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 border-b border-[#FF2D75]/30 pb-3">
            <Heart className="w-5 h-5 text-[#FF2D75] fill-[#FF2D75]" />
            <h2 className="text-lg font-bold text-[#F5C76A] tracking-wider uppercase">
              MY FINAL MESSAGE
            </h2>
          </div>

          <div className="text-sm md:text-base text-zinc-200 leading-relaxed whitespace-pre-line font-medium italic">
            {letterText}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF2D75] via-[#FF4F91] to-[#F5C76A] text-white font-extrabold text-lg shadow-[0_0_35px_#FF2D75] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <Gift className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              <span>ONE LAST SURPRISE 🎁</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

            <button
              onClick={onResetGame}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/60 border border-zinc-700 text-zinc-400 font-semibold text-sm hover:text-white hover:border-white transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Play Journey Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

