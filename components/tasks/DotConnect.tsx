"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface DotConnectProps {
  onComplete: () => void;
}

// 12 points forming a heart shape on a 1000x1000 SVG grid
const HEART_DOTS = [
  { id: 1, x: 500, y: 320 },
  { id: 2, x: 620, y: 220 },
  { id: 3, x: 780, y: 240 },
  { id: 4, x: 880, y: 360 },
  { id: 5, x: 860, y: 500 },
  { id: 6, x: 740, y: 640 },
  { id: 7, x: 620, y: 760 },
  { id: 8, x: 500, y: 880 }, // bottom tip
  { id: 9, x: 380, y: 760 },
  { id: 10, x: 260, y: 640 },
  { id: 11, x: 140, y: 500 },
  { id: 12, x: 120, y: 360 },
];

export function DotConnect({ onComplete }: DotConnectProps) {
  const [nextDot, setNextDot] = useState(1);
  const [connectedPath, setConnectedPath] = useState<number[]>([1]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDotClick = (dotId: number) => {
    if (isCompleted) return;

    if (dotId === nextDot + 1 || (nextDot === 12 && dotId === 1)) {
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("sparkle");
      }

      const newPath = [...connectedPath, dotId];
      setConnectedPath(newPath);

      if (dotId === 1 && nextDot === 12) {
        setIsCompleted(true);
        if (typeof window !== "undefined" && (window as any).playSFX) {
          (window as any).playSFX("win");
        }
      } else {
        setNextDot(dotId);
      }
    } else {
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-black/60 border border-[#FF2D75]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,45,117,0.25)] text-center relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30">
          TASK 8 — DOT CONNECT 💕
        </span>
        <span className="text-xs font-semibold text-[#FF9CBD]">
          Next Dot: {isCompleted ? "Completed" : nextDot + 1}
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Connect the Love Dots</h2>
      <p className="text-xs text-zinc-300 mb-4">
        Tap the numbered dots in order (1 → 2 → 3 ... → 12 → 1) to reveal the heart!
      </p>

      {/* SVG Canvas Area */}
      <div className="relative w-full aspect-square max-w-sm mx-auto bg-gradient-to-b from-zinc-950 via-black to-zinc-950 rounded-2xl border-2 border-[#FF2D75]/40 overflow-hidden shadow-inner p-4">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          {/* Draw connected lines */}
          {connectedPath.map((dotId, index) => {
            if (index === 0) return null;
            const prev = HEART_DOTS.find((d) => d.id === connectedPath[index - 1]);
            const curr = HEART_DOTS.find((d) => d.id === dotId);
            if (!prev || !curr) return null;

            return (
              <line
                key={index}
                x1={prev.x}
                y1={prev.y}
                x2={curr.x}
                y2={curr.y}
                stroke="#FF2D75"
                strokeWidth="14"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_12px_#FF2D75]"
              />
            );
          })}

          {/* Dots */}
          {HEART_DOTS.map((dot) => {
            const isTarget = dot.id === nextDot + 1 || (nextDot === 12 && dot.id === 1);
            const isPassed = connectedPath.includes(dot.id);

            return (
              <g
                key={dot.id}
                onClick={() => handleDotClick(dot.id)}
                className="cursor-pointer group"
              >
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={isTarget ? 36 : 28}
                  fill={isTarget ? "#F5C76A" : isPassed ? "#FF2D75" : "#27272a"}
                  stroke="#FFFFFF"
                  strokeWidth="6"
                  className={`transition-all duration-300 ${
                    isTarget ? "animate-ping opacity-75" : ""
                  }`}
                />
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={isTarget ? 28 : 22}
                  fill={isTarget ? "#F5C76A" : isPassed ? "#FF2D75" : "#18181b"}
                  stroke={isPassed ? "#FF9CBD" : "#52525b"}
                  strokeWidth="4"
                />
                <text
                  x={dot.x}
                  y={dot.y + 10}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="28"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  {dot.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {isCompleted && (
        <div className="mt-6 p-4 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD] animate-fade-in space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-[#F5C76A]">
            <CheckCircle2 className="w-5 h-5" /> ✨ Glowing Heart Created!
          </div>
          <p className="text-sm text-white font-medium italic">
            "You just connected the dots of our story. ❤️"
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
