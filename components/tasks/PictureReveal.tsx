"use client";

import React, { useState, useRef } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface PictureRevealProps {
  secretPhotoUrl?: string;
  onComplete: () => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function PictureReveal({ secretPhotoUrl, onComplete }: PictureRevealProps) {
  const [revealPercent, setRevealPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const photoToUse = secretPhotoUrl || "/images/secret_photo.png";

  const handleTapToReveal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCompleted) return;

    // Create realistic sparkle particles at click location
    if (frameRef.current) {
      const rect = frameRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newSparkles: SparkleParticle[] = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        size: Math.random() * 10 + 6,
      }));

      setSparkles((prev) => [...prev.slice(-18), ...newSparkles]);
    }

    const next = Math.min(100, revealPercent + 15);
    setRevealPercent(next);

    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX("sparkle");
    }

    if (next >= 100 && !isCompleted) {
      setIsCompleted(true);
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("win");
      }
    }
  };

  const blurPx = Math.max(0, Math.round((1 - revealPercent / 100) * 26));
  const saturateVal = 0.5 + (revealPercent / 100) * 0.7;

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-7 rounded-3xl bg-[#0F0F14]/90 border border-[#FF2D75]/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center relative select-none glass-specular">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F5C76A]" />
          TASK 7 — PICTURE REVEAL 📸
        </span>
        <span className="text-xs font-semibold text-[#FF9CBD]">
          Progress: {revealPercent}%
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Reveal the Secret Photo</h2>
      <p className="text-xs text-zinc-300 mb-4">
        Keep clicking or wiping the photo to reveal the high-definition memory!
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 rounded-full h-2.5 mb-4 overflow-hidden border border-white/10 p-0.5">
        <div
          className="bg-gradient-to-r from-[#FF2D75] via-[#FF4F91] to-[#F5C76A] h-full rounded-full transition-all duration-300 shadow-[0_0_12px_#FF2D75]"
          style={{ width: `${revealPercent}%` }}
        />
      </div>

      {/* Realistic Photo Frame Container */}
      <div
        ref={frameRef}
        onClick={handleTapToReveal}
        className="relative w-full h-72 sm:h-80 rounded-2xl border-2 border-[#FF2D75]/40 overflow-hidden cursor-pointer select-none group shadow-2xl transition-all hover:scale-[1.01]"
      >
        <img
          src={photoToUse}
          alt="Secret Memory"
          className="w-full h-full object-cover transition-all duration-300"
          style={{
            filter: `blur(${blurPx}px) saturate(${saturateVal})`,
            transform: `scale(${1 + (100 - revealPercent) * 0.001})`,
          }}
        />

        {/* Sparkle particle burst overlay */}
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute pointer-events-none animate-ping text-[#F5C76A]"
            style={{
              left: `${s.x}px`,
              top: `${s.y}px`,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
          >
            ✨
          </div>
        ))}

        {!isCompleted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 group-hover:bg-black/20 transition-colors">
            <span className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF2D75] to-[#FF4F91] text-white font-bold text-sm shadow-[0_0_25px_#FF2D75] animate-bounce flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F5C76A]" />
              TAP TO WIPE BLUR ❤️
            </span>
          </div>
        )}
      </div>

      {isCompleted && (
        <div className="mt-6 p-5 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD] animate-fade-in space-y-4 shadow-[0_0_30px_rgba(255,45,117,0.2)]">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-[#F5C76A]">
            <CheckCircle2 className="w-5 h-5 text-[#F5C76A]" /> 🎉 Photo Fully Unlocked!
          </div>
          <p className="text-sm text-white font-medium italic">
            "Some memories are too beautiful to stay hidden."
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

