"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, CheckCircle2, ArrowRight } from "lucide-react";

interface HeartCatchProps {
  onComplete: () => void;
}

interface FallingItem {
  id: number;
  x: number; // 0 to 100%
  y: number; // 0 to 100%
  type: "good" | "bad";
  symbol: string;
  speed: number;
}

export function HeartCatch({ onComplete }: HeartCatchProps) {
  const [score, setScore] = useState(0);
  const [basketX, setBasketX] = useState(50); // percentage
  const [isCompleted, setIsCompleted] = useState(false);
  const [items, setItems] = useState<FallingItem[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const targetScore = 100;

  // Move basket via mouse/touch
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isCompleted) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || isCompleted) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  // Game loop
  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      // Spawn new items occasionally
      if (Math.random() < 0.4) {
        const isBad = Math.random() < 0.25;
        const goodSymbols = ["❤️", "💗", "💕", "💖"];
        const badSymbols = ["💔", "🖤"];
        const symbol = isBad
          ? badSymbols[Math.floor(Math.random() * badSymbols.length)]
          : goodSymbols[Math.floor(Math.random() * goodSymbols.length)];

        setItems((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 85 + 5,
            y: 0,
            type: isBad ? "bad" : "good",
            symbol,
            speed: Math.random() * 3 + 2,
          },
        ]);
      }

      // Update positions & check collisions
      setItems((prevItems) => {
        const updated: FallingItem[] = [];
        prevItems.forEach((item) => {
          const nextY = item.y + item.speed;

          // Catch collision check near bottom (y > 80%)
          if (nextY >= 80 && nextY <= 92) {
            if (Math.abs(item.x - basketX) < 12) {
              // Caught!
              if (item.type === "good") {
                setScore((s) => {
                  const newScore = s + 10;
                  if (newScore >= targetScore && !isCompleted) {
                    setIsCompleted(true);
                    if (typeof window !== "undefined" && (window as any).playSFX) {
                      (window as any).playSFX("win");
                    }
                  } else {
                    if (typeof window !== "undefined" && (window as any).playSFX) {
                      (window as any).playSFX("pop");
                    }
                  }
                  return newScore;
                });
              } else {
                setScore((s) => Math.max(0, s - 10));
                if (typeof window !== "undefined" && (window as any).playSFX) {
                  (window as any).playSFX("wrong");
                }
              }
              return; // item consumed
            }
          }

          if (nextY < 95) {
            updated.push({ ...item, y: nextY });
          }
        });
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [basketX, isCompleted]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-black/60 border border-[#FF2D75]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,45,117,0.25)] text-center relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30">
          TASK 4 — HEART CATCH ❤️
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white">LOVE SCORE:</span>
          <span className="text-sm font-extrabold text-[#FF2D75] px-2 py-0.5 rounded-lg bg-[#FF2D75]/10 border border-[#FF2D75]/30">
            {score} / {targetScore}
          </span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Catch My Heart</h2>
      <p className="text-xs text-zinc-300 mb-4">
        Move the basket left & right to catch good hearts (+10) and dodge heartbreaks (-10)!
      </p>

      {/* Play Canvas Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-72 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 rounded-2xl border border-[#FF2D75]/30 overflow-hidden cursor-crosshair shadow-inner"
      >
        {/* Falling Hearts */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute text-2xl select-none transition-transform pointer-events-none drop-shadow-[0_0_10px_#FF2D75]"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {item.symbol}
          </div>
        ))}

        {/* Basket */}
        <div
          className="absolute bottom-3 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-75"
          style={{ left: `${basketX}%` }}
        >
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF2D75] to-[#FF4F91] border-2 border-white text-white font-bold text-sm shadow-[0_0_20px_#FF2D75] flex items-center gap-1">
            <span>🧺</span>
            <span>BASKET</span>
          </div>
        </div>
      </div>

      {isCompleted && (
        <div className="mt-6 p-4 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD] animate-fade-in space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-[#F5C76A]">
            <CheckCircle2 className="w-5 h-5" /> You caught my heart! ❤️
          </div>
          <p className="text-sm text-white font-medium italic">
            "You always make my heart feel complete."
          </p>
          <button
            onClick={onComplete}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2D75] to-[#FF4F91] text-white font-bold text-base shadow-[0_0_20px_#FF2D75] hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>UNLOCK NEXT ❤️</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
