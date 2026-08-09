"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, CheckCircle2, ArrowRight, Heart } from "lucide-react";

interface CupidsArrowProps {
  customReasons?: string[];
  onComplete: () => void;
}

const DEFAULT_REASONS = [
  "You make me smile every day 😊",
  "You're my ultimate safe place 🏡",
  "You understand me like no one else 💖",
  "I love the way you care so deeply ❤️",
  "You inspire me to be better ✨",
  "Your kindness warms my soul ☀️",
  "Your laughter is my favorite sound 🎶",
  "You are my dream come true 👑",
];

interface Balloon {
  id: number;
  reason: string;
  x: number; // Percentage 10% - 86%
  y: number; // Percentage 14% - 58%
  speedX: number;
  colorType: "gold" | "pink" | "rose" | "coral";
  isPopped: boolean;
}

interface FlyingArrow {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  angle: number;
  progress: number; // 0 to 1
}

interface FloatingLoveNote {
  id: number;
  text: string;
  x: number;
  y: number;
  offsetY: number;
  opacity: number;
  scale: number;
}

export function CupidsArrow({ customReasons, onComplete }: CupidsArrowProps) {
  const reasonsList = customReasons && customReasons.length >= 8 ? customReasons : DEFAULT_REASONS;

  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [flyingArrows, setFlyingArrows] = useState<FlyingArrow[]>([]);
  const [floatingNotes, setFloatingNotes] = useState<FloatingLoveNote[]>([]);
  const [revealedReasons, setRevealedReasons] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Drag & Shoot Bow State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({ x: 50, y: 86 });

  const arenaRef = useRef<HTMLDivElement | null>(null);

  // Bow Center Coordinates
  const bowX = 50;
  const bowY = 86;

  // Initialize 8 floating balloons
  useEffect(() => {
    const colors: Array<"gold" | "pink" | "rose" | "coral"> = ["gold", "pink", "rose", "coral"];
    const initialBalloons: Balloon[] = reasonsList.slice(0, 8).map((reason, idx) => ({
      id: idx + 1,
      reason,
      x: 14 + (idx % 4) * 22 + (Math.random() * 4 - 2),
      y: 16 + Math.floor(idx / 4) * 24 + (Math.random() * 4 - 2),
      speedX: (Math.random() - 0.5) * 0.16,
      colorType: colors[idx % colors.length],
      isPopped: false,
    }));
    setBalloons(initialBalloons);
  }, [reasonsList]);

  // Floating animation loop for balloons
  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          if (b.isPopped) return b;
          let newX = b.x + b.speedX;
          if (newX < 10 || newX > 88) b.speedX *= -1;
          return { ...b, x: Math.max(10, Math.min(88, newX)) };
        })
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Arrow flying movement loop
  useEffect(() => {
    if (flyingArrows.length === 0) return;

    const timer = setInterval(() => {
      setFlyingArrows((prevArrows) => {
        return prevArrows
          .map((arrow) => {
            const nextProgress = arrow.progress + 0.08;
            const currentX = arrow.startX + (arrow.targetX - arrow.startX) * nextProgress;
            const currentY = arrow.startY + (arrow.targetY - arrow.startY) * nextProgress;

            // Collision check
            setBalloons((prevBalloons) => {
              let hasHit = false;
              const updatedBalloons = prevBalloons.map((b) => {
                if (!b.isPopped) {
                  const dist = Math.hypot(currentX - b.x, currentY - b.y);
                  if (dist < 12) {
                    hasHit = true;
                    popBalloon(b);
                    return { ...b, isPopped: true };
                  }
                }
                return b;
              });
              return hasHit ? updatedBalloons : prevBalloons;
            });

            return {
              ...arrow,
              progress: nextProgress,
              currentX,
              currentY,
            };
          })
          .filter((arrow) => arrow.progress < 1.05);
      });
    }, 25);

    return () => clearInterval(timer);
  }, [flyingArrows]);

  const playSFX = (type: "pop" | "sparkle" | "win" | "click") => {
    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX(type);
    }
  };

  const getArenaCoords = (clientX: number, clientY: number) => {
    if (!arenaRef.current) return { x: 50, y: 86 };
    const rect = arenaRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));
    return { x, y };
  };

  const shootArrow = (targetX: number, targetY: number) => {
    playSFX("click");

    const dx = targetX - bowX;
    const dy = targetY - bowY;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

    const newArrow: FlyingArrow = {
      id: Date.now() + Math.random(),
      startX: bowX,
      startY: bowY,
      targetX,
      targetY,
      currentX: bowX,
      currentY: bowY,
      angle,
      progress: 0,
    };

    setFlyingArrows((prev) => [...prev, newArrow]);
    setDragPos({ x: bowX, y: bowY });
  };

  // Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCompleted) return;
    const coords = getArenaCoords(e.clientX, e.clientY);
    setIsDragging(true);
    setDragPos(coords);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const coords = getArenaCoords(e.clientX, e.clientY);
    setDragPos(coords);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    const coords = getArenaCoords(e.clientX, e.clientY);
    const dx = bowX - coords.x;
    const dy = bowY - coords.y;

    const pullDistance = Math.hypot(dx, dy);

    if (pullDistance < 4) {
      // Tap fallback: Shoot directly toward pointer
      shootArrow(coords.x, Math.min(65, coords.y));
    } else {
      // Drag pull back: Shoot along inverted vector
      const targetX = Math.max(5, Math.min(95, bowX + dx * 3.5));
      const targetY = Math.max(5, Math.min(75, bowY + dy * 3.5));
      shootArrow(targetX, targetY);
    }
  };

  const popBalloon = (b: Balloon) => {
    playSFX("pop");

    setRevealedReasons((prev) => {
      if (prev.includes(b.reason)) return prev;
      const updated = [...prev, b.reason];
      if (updated.length >= 8) {
        setIsCompleted(true);
        setTimeout(() => playSFX("win"), 500);
      }
      return updated;
    });

    // Spawn floating love note at popped balloon position
    const noteId = Date.now() + Math.random();
    const newNote: FloatingLoveNote = {
      id: noteId,
      text: b.reason,
      x: b.x,
      y: b.y,
      offsetY: 0,
      opacity: 1,
      scale: 1,
    };

    setFloatingNotes((prev) => [...prev, newNote]);

    // Smoothly float down & fade out (vanish) after 1.3s
    setTimeout(() => {
      setFloatingNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, offsetY: 30, opacity: 0, scale: 0.88 } : n))
      );
    }, 1300);

    // Remove from state after fade animation finishes
    setTimeout(() => {
      setFloatingNotes((prev) => prev.filter((n) => n.id !== noteId));
    }, 2600);
  };

  // Aiming math for trajectory line
  const dx = bowX - dragPos.x;
  const dy = bowY - dragPos.y;
  const aimTargetX = bowX + dx * 3.5;
  const aimTargetY = bowY + dy * 3.5;
  const aimAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center select-none space-y-4 px-2 sm:px-4">
      {/* Symmetrically Aligned Top Header */}
      <div className="w-full neon-card-frame p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <span className="pink-badge mb-1">CHALLENGE 10 — CUPID'S ARROW 🏹</span>
          <h2 className="text-xl sm:text-2xl font-black text-[#4A0E17]">
            Cupid's Arrow Target Shoot 🏹
          </h2>
          <p className="text-xs text-[#7A1C2C] font-semibold">
            Pull back bow to aim & release, or tap any balloon to shoot an arrow directly!
          </p>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-rose-50 border border-[#FFB6C1] text-xs font-black text-[#FF3366] shrink-0 shadow-xs">
          REASONS DISCOVERED: {revealedReasons.length} / 8 ❤️
        </div>
      </div>

      {/* Proportioned & Centered Shooting Arena */}
      <div
        ref={arenaRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-[500px] sm:h-[540px] rounded-3xl border-2 border-[#FFB6C1] bg-gradient-to-b from-[#FFF0F5] via-white to-[#FFE4E1] shadow-[0_12px_40px_rgba(255,105,140,0.2)] relative overflow-hidden touch-none flex flex-col items-center justify-between p-4 cursor-crosshair"
      >
        {/* Subtle Heart Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <Heart className="w-80 h-80 text-[#FF3366] fill-[#FF3366]" />
        </div>

        {/* Floating Love Notes (Popped at balloon coordinates, float down & smoothly vanish) */}
        {floatingNotes.map((note) => (
          <div
            key={note.id}
            style={{
              left: `${note.x}%`,
              top: `${note.y}%`,
              transform: `translate(-50%, ${note.offsetY}px) scale(${note.scale})`,
              opacity: note.opacity,
            }}
            className="absolute z-40 transition-all duration-1000 ease-out pointer-events-none max-w-xs text-center"
          >
            <div className="px-4 py-3 rounded-2xl bg-[#FFFDFA] border-2 border-[#FF3366] shadow-xl text-xs sm:text-sm font-black text-[#4A0E17] flex items-center gap-2 animate-bounce">
              <span className="text-base shrink-0">💘</span>
              <span>{note.text}</span>
            </div>
          </div>
        ))}

        {/* Dynamic Aiming Trajectory SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {/* Flexible Bow String */}
          <path
            d={`M 41% 86% Q ${isDragging ? dragPos.x : bowX}% ${isDragging ? dragPos.y : bowY}% 59% 86%`}
            stroke="#FF3366"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Aiming Dotted Line */}
          {isDragging && (
            <>
              <line
                x1={`${bowX}%`}
                y1={`${bowY}%`}
                x2={`${aimTargetX}%`}
                y2={`${aimTargetY}%`}
                stroke="#FF3366"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <circle
                cx={`${aimTargetX}%`}
                cy={`${aimTargetY}%`}
                r="10"
                fill="none"
                stroke="#FF3366"
                strokeWidth="2"
                className="animate-ping"
              />
            </>
          )}
        </svg>

        {/* 8 Floating 3D Balloons */}
        {balloons.map((b) => {
          if (b.isPopped) return null;

          const getGradient = () => {
            if (b.colorType === "gold") return "from-[#FFF5D0] via-[#F5C76A] to-[#D4AF37]";
            if (b.colorType === "pink") return "from-[#FFE4E1] via-[#FF6699] to-[#FF3366]";
            if (b.colorType === "rose") return "from-[#FFB6C1] via-[#FF4F91] to-[#D91B5C]";
            return "from-[#FFE5D9] via-[#FF8E53] to-[#FF6B8B]";
          };

          return (
            <div
              key={b.id}
              onClick={(e) => {
                e.stopPropagation();
                shootArrow(b.x, b.y);
              }}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 cursor-pointer z-10"
            >
              {/* 3D Balloon Body */}
              <div
                className={`w-14 h-18 sm:w-16 sm:h-20 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${getGradient()} shadow-lg flex items-center justify-center relative border border-white/40 animate-float-realistic`}
              >
                <div className="absolute top-2 left-3 w-4 h-6 rounded-full bg-white/50 blur-[1px] rotate-[-25deg]" />
                <span className="text-xl sm:text-2xl drop-shadow">💖</span>
              </div>

              {/* Knot & String */}
              <div className="w-2 h-2 mx-auto bg-[#D4AF37] rounded-full -mt-1" />
              <svg className="w-4 h-10 mx-auto stroke-[#FF6699]/60 fill-none stroke-[1.5]" viewBox="0 0 20 40">
                <path d="M10 0 Q 15 10 10 20 T 10 40" />
              </svg>
            </div>
          );
        })}

        {/* Flying Arrows in Motion */}
        {flyingArrows.map((arrow) => (
          <div
            key={arrow.id}
            style={{
              left: `${arrow.currentX}%`,
              top: `${arrow.currentY}%`,
              transform: `translate(-50%, -50%) rotate(${arrow.angle}deg)`,
            }}
            className="absolute pointer-events-none z-30 transition-all duration-75"
          >
            <div className="text-3xl drop-shadow-[0_0_12px_#FF3366]">🏹</div>
          </div>
        ))}

        {/* Bow Anchor Centered at Bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
          <div
            style={{
              transform: isDragging ? `rotate(${aimAngle}deg)` : "none",
            }}
            className="w-16 h-16 rounded-full bg-rose-100 border-2 border-[#FF3366] flex items-center justify-center shadow-md transition-transform"
          >
            <span className="text-3xl">🏹</span>
          </div>
          <span className="text-[11px] font-black text-[#FF3366] uppercase tracking-wider mt-1 bg-white/95 px-3 py-1 rounded-full border border-[#FFB6C1] shadow-sm backdrop-blur-sm">
            {isDragging ? "RELEASE TO SHOOT! 🎯" : "PULL BACK OR TAP TO SHOOT 🏹"}
          </span>
        </div>
      </div>

      {/* Discovered Reasons Memory List Grid */}
      {revealedReasons.length > 0 && (
        <div className="w-full neon-card-frame p-5 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#FF3366] flex items-center gap-1.5 border-b border-rose-200 pb-2">
            <Heart className="w-4 h-4 text-[#FF3366] fill-[#FF3366]" />
            <span>DISCOVERED REASONS WHY I LOVE YOU ({revealedReasons.length} / 8)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-44 overflow-y-auto pr-1">
            {revealedReasons.map((reason, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-rose-50 border border-[#FFB6C1] text-xs font-extrabold text-[#4A0E17] flex items-center gap-2.5 shadow-xs animate-fade-in leading-relaxed"
              >
                <span className="text-[#FF3366] text-base shrink-0">💘</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Card */}
      {isCompleted && (
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#FF3366] shadow-xl text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-lg font-black text-[#FF3366]">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <span>All 8 Reasons Discovered! ❤️</span>
          </div>
          <p className="text-sm text-[#7A1C2C] font-semibold italic">
            "And honestly, I could give you a thousand more reasons every single day."
          </p>
          <button
            onClick={onComplete}
            className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <span>UNLOCK NEXT CHALLENGE ❤️</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
