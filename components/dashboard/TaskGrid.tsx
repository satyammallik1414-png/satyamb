"use client";

import React from "react";
import { CheckCircle2, Lock, Play, Heart, Gift, Sparkles } from "lucide-react";

export interface TaskInfo {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  reward: string;
}

export const TASKS_DATA: TaskInfo[] = [
  { id: 1, title: "UNLOCK THE STORY", subtitle: "Enter your name to begin", icon: "🌹", reward: "❤️" },
  { id: 2, title: "PHOTO PUZZLE", subtitle: "Solve the jigsaw memory", icon: "🧩", reward: "📸" },
  { id: 3, title: "BALLOON BLAST", subtitle: "Shoot floating balloon memories", icon: "🎈", reward: "🎈" },
  { id: 4, title: "HEART CATCH", subtitle: "Catch my heart, dodge heartbreaks", icon: "❤️", reward: "💕" },
  { id: 5, title: "MEMORY HUNT", subtitle: "Find 7 hidden hearts in the scene", icon: "🔍", reward: "🔍" },
  { id: 6, title: "LOVE SCRAMBLE", subtitle: "Unscramble romantic words", icon: "🔤", reward: "💌" },
  { id: 7, title: "PICTURE REVEAL", subtitle: "Scratch to reveal secret photo", icon: "📸", reward: "📷" },
  { id: 8, title: "DOT CONNECT", subtitle: "Connect 12 dots to draw a heart", icon: "💕", reward: "💖" },
  { id: 9, title: "MAZE OF LOVE", subtitle: "Guide heart through maze to rose", icon: "🌹", reward: "🌹" },
  { id: 10, title: "CUPID'S ARROW", subtitle: "Discover 8 reasons why I love you", icon: "🏹", reward: "🏹" },
  { id: 11, title: "MEMORY REEL", subtitle: "Watch our romantic story video", icon: "🎞️", reward: "🎞️" },
  { id: 12, title: "TREASURE CHEST", subtitle: "Solve the riddle for your gift", icon: "🎁", reward: "🎁" },
  { id: 13, title: "GRAND FINALE", subtitle: "Fireworks & Final Birthday Surprise", icon: "🎆", reward: "🎆" },
];

interface TaskGridProps {
  currentTask: number;
  completedTasks: number[];
  onSelectTask: (taskId: number) => void;
}

export function TaskGrid({ currentTask, completedTasks, onSelectTask }: TaskGridProps) {
  const completedCount = completedTasks.length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 z-20 relative select-none">
      <div className="neon-card-frame p-6 sm:p-8 space-y-6">
        {/* Pink Badge Header */}
        <div className="flex items-center justify-between border-b border-rose-200 pb-4">
          <span className="pink-badge">DASHBOARD</span>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7A1C2C]">
            <Heart className="w-4 h-4 text-[#FF3366] fill-[#FF3366]" />
            <span>{completedCount} / 13 COMPLETED</span>
          </div>
        </div>

        {/* Grid of 13 Task Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {TASKS_DATA.map((task) => {
            const isCompleted = completedTasks.includes(task.id);
            const isCurrent = task.id === currentTask;
            const isUnlocked = isCompleted || isCurrent || task.id <= (Math.max(...completedTasks, 0) + 1);
            const taskNumFormatted = task.id < 10 ? `0${task.id}` : `${task.id}`;

            return (
              <div
                key={task.id}
                onClick={() => isUnlocked && onSelectTask(task.id)}
                className={`relative group p-4 rounded-xl border-1.5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[125px] ${
                  isCurrent
                    ? "bg-rose-100 border-[#FF3366] shadow-md scale-[1.03]"
                    : isCompleted
                    ? "bg-amber-50/80 border-[#D4AF37] shadow-sm"
                    : isUnlocked
                    ? "bg-white border-[#FFB6C1] hover:border-[#FF3366] hover:shadow-md"
                    : "bg-zinc-100/60 border-zinc-200 opacity-50 cursor-not-allowed"
                }`}
              >
                {/* Task Number Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#FF3366]">
                    {taskNumFormatted}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF3366] animate-ping" />
                  ) : !isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  ) : null}
                </div>

                {/* Task Title & Icon */}
                <div className="my-2 text-center space-y-1">
                  <span className="text-2xl block drop-shadow-sm group-hover:scale-110 transition-transform">
                    {task.icon}
                  </span>
                  <h3 className="text-xs font-extrabold text-[#4A0E17] uppercase tracking-wider group-hover:text-[#FF3366] transition-colors leading-tight line-clamp-1">
                    {task.title}
                  </h3>
                </div>

                {/* Footer Lock / Heart Icon */}
                <div className="flex justify-end items-center text-[10px] text-zinc-500">
                  {isUnlocked ? (
                    <span className="text-[#FF3366] font-extrabold text-[10px] group-hover:translate-x-1 transition-transform">
                      {isCompleted ? "REPLAY ❤️" : "PLAY →"}
                    </span>
                  ) : (
                    <Lock className="w-3 h-3 text-zinc-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
