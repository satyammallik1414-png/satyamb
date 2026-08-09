"use client";

import React, { useState, useEffect } from "react";
import { FastForward, CheckCircle2, RotateCcw, Sparkles, Film, Grid, Target, Lock } from "lucide-react";
import { HeartParticles } from "@/components/fx/HeartParticles";
import { SoundController } from "@/components/audio/SoundController";
import { Header } from "@/components/dashboard/Header";
import { TaskGrid } from "@/components/dashboard/TaskGrid";
import { AdminModal } from "@/components/dashboard/AdminModal";
import { LandingScreen } from "@/components/LandingScreen";
import { MidnightLockScreen } from "@/components/MidnightLockScreen";

// Import all 13 Challenge components
import { StoryUnlock } from "@/components/tasks/StoryUnlock";
import { PhotoPuzzle } from "@/components/tasks/PhotoPuzzle";
import { BalloonBlast } from "@/components/tasks/BalloonBlast";
import { HeartCatch } from "@/components/tasks/HeartCatch";
import { MemoryHunt } from "@/components/tasks/MemoryHunt";
import { LoveScramble } from "@/components/tasks/LoveScramble";
import { PictureReveal } from "@/components/tasks/PictureReveal";
import { DotConnect } from "@/components/tasks/DotConnect";
import { LoveMaze } from "@/components/tasks/LoveMaze";
import { CupidsArrow } from "@/components/tasks/CupidsArrow";
import { MemoryReel } from "@/components/tasks/MemoryReel";
import { TreasureChest } from "@/components/tasks/TreasureChest";
import { GrandFinale } from "@/components/tasks/GrandFinale";

export default function Home() {
  const [viewState, setViewState] = useState<"midnight_lock" | "landing" | "dashboard" | "task">("landing");
  const [currentTask, setCurrentTask] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [playerName, setPlayerName] = useState("Satyam's Love ❤️");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [settings, setSettings] = useState<any>({});
  const [treasureHuntModal, setTreasureHuntModal] = useState<{
    completedTask: number;
    nextTask: number;
  } | null>(null);

  // Sync state from SQLite API & localStorage
  const loadState = async () => {
    try {
      // 1. Fetch SQLite Settings
      const setRes = await fetch("/api/settings");
      if (setRes.ok) {
        const setData = await setRes.json();
        setSettings(setData);
        if (setData.player_name) setPlayerName(setData.player_name);
      }

      // 2. Fetch SQLite Progress
      const progRes = await fetch("/api/progress");
      if (progRes.ok) {
        const progData = await progRes.json();
        if (progData) {
          if (progData.completed_tasks) setCompletedTasks(progData.completed_tasks);
          if (progData.player_name) setPlayerName(progData.player_name);
        }
      }
    } catch (err) {
      if (typeof window !== "undefined") {
        const savedPlayer = localStorage.getItem("love_game_player");
        const savedTasks = localStorage.getItem("love_game_completed");
        if (savedPlayer) setPlayerName(savedPlayer);
        if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));
      }
    }
    // Always start at Challenge 1 on page refresh so user plays from beginning
    setCurrentTask(1);
  };

  useEffect(() => {
    loadState();
    const interval = setInterval(loadState, 4000);
    window.addEventListener("focus", loadState);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", loadState);
    };
  }, []);

  const saveProgressToDb = async (taskNum: number, doneTasks: number[], pName?: string) => {
    const nameToSave = pName || playerName;
    if (typeof window !== "undefined") {
      localStorage.setItem("love_game_player", nameToSave);
      localStorage.setItem("love_game_completed", JSON.stringify(doneTasks));
      localStorage.setItem("love_game_current", taskNum.toString());
    }

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_task: taskNum,
          completed_tasks: doneTasks,
          player_name: nameToSave,
        }),
      });
    } catch (err) {
      console.error("SQLite save error:", err);
    }
  };

  const handleStartJourney = (name: string) => {
    setPlayerName(name);
    setCurrentTask(1);
    saveProgressToDb(1, completedTasks, name);
    setViewState("task");
  };

  const handleTaskComplete = (taskId: number) => {
    const updatedCompleted = Array.from(new Set([...completedTasks, taskId]));
    setCompletedTasks(updatedCompleted);

    const nextTask = Math.min(13, taskId + 1);
    saveProgressToDb(nextTask, updatedCompleted);

    if (taskId < 13) {
      setTreasureHuntModal({
        completedTask: taskId,
        nextTask: nextTask,
      });
    } else {
      setCurrentTask(13);
    }
  };

  const handleDiscoverNext = () => {
    if (treasureHuntModal) {
      setCurrentTask(treasureHuntModal.nextTask);
      setTreasureHuntModal(null);
      setViewState("task");
    }
  };

  const handleSelectTaskFromGrid = (taskId: number) => {
    setCurrentTask(taskId);
    setViewState("task");
  };

  const handleResetGame = async () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    try {
      await fetch("/api/progress", { method: "DELETE" });
    } catch (err) {}
    setCurrentTask(1);
    setCompletedTasks([]);
    setViewState("landing");
    setIsAdminOpen(false);
  };

  // Strictly check if current task is in completedTasks
  const isCurrentTaskCompleted = completedTasks.includes(currentTask);

  return (
    <main className="min-h-screen bg-[#FFF0F5] text-[#4A0E17] relative flex flex-col font-sans overflow-x-hidden">
      {/* Background Floating Particles */}
      <HeartParticles />

      {/* Floating Audio Controller */}
      <SoundController />

      {/* Header Bar */}
      {viewState !== "landing" && viewState !== "midnight_lock" && (
        <Header
          currentTask={currentTask}
          completedTasks={completedTasks}
          playerName={playerName}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      )}

      {/* Navigation & Mode Switcher Bar */}
      {viewState !== "landing" && viewState !== "midnight_lock" && (
        <div className="w-full max-w-5xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewState("dashboard")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                viewState === "dashboard"
                  ? "bg-[#FF3366] text-white border-[#FF3366] shadow-md"
                  : "bg-white/90 text-[#7A1C2C] border-[#FFB6C1] hover:border-[#FF3366]"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>DASHBOARD GRID</span>
            </button>

            <button
              onClick={() => setViewState("task")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                viewState === "task"
                  ? "bg-[#FF3366] text-white border-[#FF3366] shadow-md"
                  : "bg-white/90 text-[#7A1C2C] border-[#FFB6C1] hover:border-[#FF3366]"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>CHALLENGE {currentTask} / 13</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewState("midnight_lock")}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-[#FFB6C1] text-[#7A1C2C] hover:bg-rose-50 transition-all flex items-center gap-1.5 shadow-sm"
              title="Test Midnight Countdown & Fireworks Reveal"
            >
              <Lock className="w-3.5 h-3.5 text-[#FF3366]" />
              <span>MIDNIGHT COUNTDOWN 🔒</span>
            </button>

            <button
              onClick={() => setViewState("landing")}
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-white border border-[#FFB6C1] text-[#FF3366] hover:bg-rose-50 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Film className="w-3.5 h-3.5 text-[#FF3366]" />
              <span>REPLAY INTRO 🎬</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Game Screen */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 z-20">
        {/* 1. MIDNIGHT LOCK & COUNTDOWN REVEAL */}
        {viewState === "midnight_lock" && (
          <MidnightLockScreen
            playerName={playerName}
            onUnlock={() => setViewState("landing")}
          />
        )}

        {/* 2. ONE-BY-ONE INTRO + LOVE LETTER + MEMORY GALLERY */}
        {viewState === "landing" && (
          <LandingScreen
            initialName={playerName}
            partnerName={settings.partner_name || "Satyam"}
            loveLetterText={settings.love_letter_text}
            customMemories={settings.memories_json}
            onStart={handleStartJourney}
          />
        )}

        {/* 3. TASK GRID DASHBOARD */}
        {viewState === "dashboard" && (
          <TaskGrid
            currentTask={currentTask}
            completedTasks={completedTasks}
            onSelectTask={handleSelectTaskFromGrid}
          />
        )}

        {/* 4. 13 CHALLENGES */}
        {viewState === "task" && (
          <div className="w-full py-2 sm:py-4">
            {/* Skip Challenge Bar for Previously Completed Challenges */}
            {isCurrentTaskCompleted && currentTask < 13 && (
              <div className="w-full max-w-xl mx-auto mb-4 px-4 py-2.5 bg-white/90 border border-[#FFB6C1] rounded-2xl animate-fade-in flex items-center justify-between gap-2 shadow-sm">
                <span className="text-xs font-bold text-[#7A1C2C] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Completed Challenge</span>
                </span>
                <button
                  onClick={() => handleTaskComplete(currentTask)}
                  className="px-4 py-2 rounded-xl bg-[#FF3366] text-white font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>SKIP CHALLENGE</span>
                  <FastForward className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {currentTask === 1 && (
              <StoryUnlock
                initialName={playerName}
                onComplete={(name) => {
                  setPlayerName(name);
                  handleTaskComplete(1);
                }}
              />
            )}

            {currentTask === 2 && (
              <PhotoPuzzle
                photoUrl={settings.puzzle_photo}
                onComplete={() => handleTaskComplete(2)}
              />
            )}

            {currentTask === 3 && (
              <BalloonBlast onComplete={() => handleTaskComplete(3)} />
            )}

            {currentTask === 4 && (
              <HeartCatch onComplete={() => handleTaskComplete(4)} />
            )}

            {currentTask === 5 && (
              <MemoryHunt
                gardenPhotoUrl={settings.garden_photo}
                customMemories={settings.memory_hunt_texts}
                onComplete={() => handleTaskComplete(5)}
              />
            )}

            {currentTask === 6 && (
              <LoveScramble
                customWord={settings.special_word}
                onComplete={() => handleTaskComplete(6)}
              />
            )}

            {currentTask === 7 && (
              <PictureReveal
                secretPhotoUrl={settings.secret_photo}
                onComplete={() => handleTaskComplete(7)}
              />
            )}

            {currentTask === 8 && (
              <DotConnect onComplete={() => handleTaskComplete(8)} />
            )}

            {currentTask === 9 && (
              <LoveMaze onComplete={() => handleTaskComplete(9)} />
            )}

            {currentTask === 10 && (
              <CupidsArrow
                customReasons={settings.cupid_reasons}
                onComplete={() => handleTaskComplete(10)}
              />
            )}

            {currentTask === 11 && (
              <MemoryReel
                videoUrl={settings.video_config?.memory_reel_video}
                onComplete={() => handleTaskComplete(11)}
              />
            )}

            {currentTask === 12 && (
              <TreasureChest
                customRiddleQuestion={settings.riddle_question}
                customRiddleAnswer={settings.riddle_answer}
                onComplete={() => handleTaskComplete(12)}
              />
            )}

            {currentTask === 13 && (
              <GrandFinale
                playerName={playerName}
                finalMessage={settings.final_message}
                surpriseLink={settings.secret_surprise_link}
                onResetGame={handleResetGame}
              />
            )}
          </div>
        )}
      </div>

      {/* Interstitial Completion Overlay */}
      {treasureHuntModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in select-none">
          <div className="w-full max-w-md p-8 sm:p-10 neon-card-frame text-center space-y-6 relative">
            <div className="absolute top-4 left-4">
              <span className="pink-badge">COMPLETION SCREEN</span>
            </div>

            <div className="pt-6 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-rose-100 border-2 border-[#FF3366] flex items-center justify-center shadow-md animate-pulse">
                <CheckCircle2 className="w-12 h-12 text-[#FF3366] stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-[#4A0E17] tracking-wider">
                  CHALLENGE COMPLETE!
                </h2>
                <p className="text-base text-[#7A1C2C] font-extrabold italic">
                  You did it, my love ♥
                </p>
              </div>
            </div>

            <button
              onClick={handleDiscoverNext}
              className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <span>CONTINUE →</span>
            </button>
          </div>
        </div>
      )}

      {/* Admin Panel Drawer */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSettingsUpdated={loadState}
        onResetProgress={handleResetGame}
        onJumpToTask={(num) => {
          setCurrentTask(num);
          setViewState("task");
        }}
      />
    </main>
  );
}
