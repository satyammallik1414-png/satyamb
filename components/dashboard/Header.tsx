"use client";

import React from "react";
import { Heart, Sparkles, Settings } from "lucide-react";

interface HeaderProps {
  currentTask: number;
  completedTasks: number[];
  playerName: string;
  onOpenAdmin: () => void;
}

export function Header({ currentTask, completedTasks, playerName, onOpenAdmin }: HeaderProps) {
  const totalTasks = 13;
  const completedCount = completedTasks.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <header className="w-full max-w-5xl mx-auto px-4 pt-4 pb-2 relative z-30 select-none">
      <div className="flex flex-col items-center text-center space-y-1 mb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#FF3366] fill-[#FF3366] animate-pulse" />
          <h1 className="text-2xl sm:text-4xl font-black tracking-wider text-[#7A1C2C] drop-shadow-sm">
            13 CHALLENGES OF LOVE
          </h1>
          <Heart className="w-5 h-5 text-[#FF3366] fill-[#FF3366] animate-pulse" />
        </div>
        <p className="text-xs sm:text-sm text-[#FF3366] italic tracking-widest font-bold flex items-center gap-2">
          <span>--- ♥</span>
          <span>A Journey of Love, Just for You</span>
          <span>♥ ---</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/95 border-2 border-[#FFB6C1] rounded-2xl p-4 shadow-[0_10px_30px_rgba(255,105,140,0.15)]">
        {/* Welcome Text */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF3366] to-[#FF6699] flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#4A0E17]">
              Welcome, <span className="text-[#FF3366] font-extrabold">{playerName}</span> ❤️
            </h2>
            <p className="text-xs text-[#7A1C2C] font-semibold">
              Progress: <span className="text-[#D4AF37] font-extrabold">{completedCount} / {totalTasks} Completed</span>
            </p>
          </div>
        </div>

        {/* Progress & Heart Icons */}
        <div className="flex flex-col items-center md:items-end gap-1.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalTasks }).map((_, idx) => {
              const taskNum = idx + 1;
              const isDone = completedTasks.includes(taskNum);
              const isCurrent = taskNum === currentTask;
              return (
                <span
                  key={taskNum}
                  title={`Challenge ${taskNum}`}
                  className={`text-xs md:text-sm transition-all duration-300 ${
                    isDone
                      ? "text-[#FF3366] scale-110"
                      : isCurrent
                      ? "text-[#D4AF37] animate-bounce"
                      : "text-zinc-300 opacity-60"
                  }`}
                >
                  {isDone ? "❤️" : isCurrent ? "💗" : "○"}
                </span>
              );
            })}
          </div>

          <div className="w-full md:w-48 bg-rose-100/80 rounded-full h-2.5 overflow-hidden border border-[#FFB6C1] p-0.5">
            <div
              className="bg-gradient-to-r from-[#FF3366] via-[#FF6699] to-[#D4AF37] h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="text-[#7A1C2C]">
              CHALLENGE {currentTask} OF {totalTasks}
            </span>
            <span className="text-rose-300">•</span>
            <span className="text-[#D4AF37]">{progressPercent}%</span>
            <button
              onClick={onOpenAdmin}
              className="ml-2 p-1 text-[#7A1C2C] hover:text-[#FF3366] transition-colors"
              title="Customize / Admin Panel"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}


