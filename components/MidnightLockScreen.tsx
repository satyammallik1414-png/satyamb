"use client";

import React, { useState, useEffect } from "react";
import { Lock, Sparkles, Heart, Clock, ArrowRight, ShieldCheck } from "lucide-react";

interface MidnightLockScreenProps {
  playerName: string;
  unlockTimestamp?: string;
  onUnlock: () => void;
}

export function MidnightLockScreen({ playerName, unlockTimestamp, onUnlock }: MidnightLockScreenProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const playSFX = (type: "pop" | "sparkle" | "win" | "click") => {
    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX(type);
    }
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const targetDate = unlockTimestamp
        ? new Date(unlockTimestamp)
        : new Date("2026-08-10T00:00:00+05:30");

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        triggerMidnightReveal();
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [unlockTimestamp]);

  const triggerMidnightReveal = () => {
    playSFX("win");
    setIsRevealed(true);
  };

  const isFinal10Seconds =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds <= 10 && timeLeft.seconds > 0;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0F0B15] text-white flex flex-col items-center justify-center p-4 sm:p-6 z-50 overflow-hidden select-none">
      {/* Background Glowing Fireworks Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <Sparkles
            key={i}
            style={{
              left: `${(i * 11 + 7) % 95}%`,
              top: `${(i * 17 + 5) % 90}%`,
            }}
            className={`absolute w-6 h-6 ${
              i % 2 === 0 ? "text-[#FF3366]" : "text-[#F5C76A]"
            } animate-pulse`}
          />
        ))}
      </div>

      {!isRevealed ? (
        /* BEFORE MIDNIGHT LOCK & COUNTDOWN */
        <div className="w-full max-w-lg mx-auto text-center space-y-8 p-8 sm:p-10 rounded-3xl bg-[#1A1225] border-2 border-[#FF2D75]/60 shadow-[0_0_60px_rgba(255,45,117,0.35)] relative overflow-hidden animate-fade-in my-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-[#FF2D75] text-[#FF9CBD] text-xs font-black uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-[#FF2D75]" />
            <span>WEBSITE LOCKED UNTIL MIDNIGHT 🔒</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-wide text-white drop-shadow-md">
              Waiting For Midnight 🌙
            </h1>
            <p className="text-sm sm:text-base text-[#FF9CBD] font-semibold italic">
              "Something magical is unlocking for {playerName} at 00:00:00..."
            </p>
          </div>

          {/* Dramatic Countdown Clock Display */}
          {isFinal10Seconds ? (
            /* Last 10 Seconds Countdown Animation */
            <div className="py-6 flex flex-col items-center justify-center space-y-2">
              <span className="text-7xl sm:text-9xl font-black text-[#FF2D75] drop-shadow-[0_0_35px_#FF2D75] animate-ping">
                {timeLeft.seconds}
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-[#F5C76A]">
                GET READY FOR MIDNIGHT! 🎆
              </span>
            </div>
          ) : (
            /* Standard Digital Countdown Clock */
            <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto py-2">
              <div className="p-3 sm:p-4 rounded-2xl bg-[#2A1B38] border border-[#FF2D75]/40 shadow-inner text-center">
                <span className="text-2xl sm:text-4xl font-black text-white block">
                  {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                </span>
                <span className="text-[10px] font-bold text-[#FF9CBD] uppercase tracking-wider block mt-1">
                  DAYS
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-[#2A1B38] border border-[#FF2D75]/40 shadow-inner text-center">
                <span className="text-2xl sm:text-4xl font-black text-white block">
                  {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
                </span>
                <span className="text-[10px] font-bold text-[#FF9CBD] uppercase tracking-wider block mt-1">
                  HOURS
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-[#2A1B38] border border-[#FF2D75]/40 shadow-inner text-center">
                <span className="text-2xl sm:text-4xl font-black text-white block">
                  {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
                </span>
                <span className="text-[10px] font-bold text-[#FF9CBD] uppercase tracking-wider block mt-1">
                  MINS
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-[#2A1B38] border border-[#FF2D75]/40 shadow-inner text-center">
                <span className="text-2xl sm:text-4xl font-black text-[#FF2D75] block animate-pulse">
                  {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
                </span>
                <span className="text-[10px] font-bold text-[#FF9CBD] uppercase tracking-wider block mt-1">
                  SECS
                </span>
              </div>
            </div>
          )}

          {/* Test / Trigger Midnight Reveal Button */}
          <button
            onClick={triggerMidnightReveal}
            className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2 group shadow-xl"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span>PREVIEW MIDNIGHT REVEAL 🎆</span>
          </button>
        </div>
      ) : (
        /* 🎆 MIDNIGHT REVEAL & HAPPY BIRTHDAY REVEAL */
        <div className="w-full max-w-xl mx-auto text-center space-y-8 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#2A1625] via-[#1F0D1B] to-[#120510] border-2 border-[#F5C76A] shadow-[0_0_80px_rgba(245,199,106,0.4)] relative overflow-hidden animate-fade-in my-auto">
          {/* Gold Celebration Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-[#F5C76A] text-[#F5C76A] text-xs font-black uppercase tracking-widest animate-pulse">
            <Sparkles className="w-4 h-4 text-[#F5C76A]" />
            <span>00:00:00 — IT'S OFFICIALLY MIDNIGHT! 🎆</span>
          </div>

          <div className="space-y-4 py-2">
            <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D0] via-[#F5C76A] to-[#FF3366] tracking-wide drop-shadow-lg leading-tight">
              HAPPY BIRTHDAY <br />
              {playerName} ❤️
            </h1>
            <p className="text-base sm:text-xl text-[#FF9CBD] font-bold italic max-w-md mx-auto leading-relaxed">
              "The clock struck midnight, and your birthday journey is officially ready for you."
            </p>
          </div>

          {/* Action Button to Launch Intro Sequence */}
          <button
            onClick={() => {
              playSFX("click");
              onUnlock();
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF1A66] via-[#FF2D75] to-[#D91B5C] text-white font-black text-base sm:text-xl shadow-[0_0_30px_rgba(255,45,117,0.5)] hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <span>START YOUR BIRTHDAY JOURNEY ❤️</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
