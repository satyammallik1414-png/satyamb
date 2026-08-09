"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface LoveMazeProps {
  onComplete: () => void;
}

// 7x7 grid maze layout (0 = path, 1 = wall, 2 = start heart, 3 = end rose)
const MAZE_GRID = [
  [2, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 3],
];

export function LoveMaze({ onComplete }: LoveMazeProps) {
  const [playerPos, setPlayerPos] = useState({ r: 0, c: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [msg, setMsg] = useState("");

  const movePlayer = (dr: number, dc: number) => {
    if (isCompleted) return;

    const newR = playerPos.r + dr;
    const newC = playerPos.c + dc;

    // Check bounds
    if (newR < 0 || newR >= 7 || newC < 0 || newC >= 7) return;

    // Check wall
    if (MAZE_GRID[newR][newC] === 1) {
      setMsg("Oops! Try again ❤️");
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("wrong");
      }
      setTimeout(() => setMsg(""), 1200);
      return;
    }

    setPlayerPos({ r: newR, c: newC });
    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX("click");
    }

    // Check win condition (rose at 6,6)
    if (newR === 6 && newC === 6) {
      setIsCompleted(true);
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("win");
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") movePlayer(-1, 0);
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") movePlayer(1, 0);
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") movePlayer(0, -1);
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") movePlayer(0, 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPos, isCompleted]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-black/60 border border-[#FF2D75]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,45,117,0.25)] text-center relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30">
          TASK 9 — MAZE OF LOVE 🌹
        </span>
        <span className="text-xs font-semibold text-[#FF9CBD]">
          Goal: Guide ❤️ to 🌹
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Maze of Love</h2>
      <p className="text-xs text-zinc-300 mb-4">
        Use Arrow keys / WASD or touch buttons to guide your heart to the blooming rose!
      </p>

      {msg && (
        <div className="mb-3 text-xs font-bold text-[#FF2D75] animate-pulse">
          {msg}
        </div>
      )}

      {/* 7x7 Grid Maze */}
      <div className="grid grid-cols-7 gap-1 p-2 bg-zinc-950 border-2 border-[#FF2D75]/40 rounded-2xl max-w-xs mx-auto aspect-square">
        {MAZE_GRID.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const isPlayerHere = playerPos.r === rIdx && playerPos.c === cIdx;
            const isWall = cell === 1;
            const isRose = rIdx === 6 && cIdx === 6;

            return (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`rounded-lg flex items-center justify-center text-xl transition-all ${
                  isWall
                    ? "bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700/40"
                    : isPlayerHere
                    ? "bg-[#FF2D75]/30 border border-[#FF2D75] shadow-[0_0_15px_#FF2D75] animate-pulse"
                    : isRose
                    ? "bg-[#F5C76A]/20 border border-[#F5C76A]"
                    : "bg-black/60"
                }`}
              >
                {isPlayerHere ? "❤️" : isRose ? "🌹" : ""}
              </div>
            );
          })
        )}
      </div>

      {/* Mobile D-Pad Controls */}
      <div className="mt-4 flex flex-col items-center gap-1 max-w-xs mx-auto">
        <button
          onClick={() => movePlayer(-1, 0)}
          className="w-12 h-10 rounded-xl bg-white/10 hover:bg-[#FF2D75] text-white font-bold border border-white/20 active:scale-90"
        >
          ▲
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => movePlayer(0, -1)}
            className="w-12 h-10 rounded-xl bg-white/10 hover:bg-[#FF2D75] text-white font-bold border border-white/20 active:scale-90"
          >
            ◄
          </button>
          <button
            onClick={() => movePlayer(1, 0)}
            className="w-12 h-10 rounded-xl bg-white/10 hover:bg-[#FF2D75] text-white font-bold border border-white/20 active:scale-90"
          >
            ▼
          </button>
          <button
            onClick={() => movePlayer(0, 1)}
            className="w-12 h-10 rounded-xl bg-white/10 hover:bg-[#FF2D75] text-white font-bold border border-white/20 active:scale-90"
          >
            ►
          </button>
        </div>
      </div>

      {isCompleted && (
        <div className="mt-6 p-4 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD] animate-fade-in space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-[#F5C76A]">
            <CheckCircle2 className="w-5 h-5" /> 🌹 Rose Reached!
          </div>
          <p className="text-sm text-white font-medium italic">
            "You found your way straight to my heart."
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
