"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, CheckCircle2, ArrowRight, Film } from "lucide-react";

interface MemoryReelProps {
  videoUrl?: string;
  onComplete: () => void;
}

const REEL_SLIDES = [
  { image: "/images/satyam_sneha_hug.jpg", text: "The warm cozy hug where time stood completely still..." },
  { image: "/images/sneha_cute_1.jpg", text: "Sneha's adorable smile that brightens my world every single day..." },
  { image: "/images/sneha_cute_2.jpg", text: "Pure happiness and sweet memories with you..." },
  { image: "/images/memory_date.png", text: "The candlelit dinners filled with sweet whispers..." },
  { image: "/images/memory_beach.png", text: "Walking under starry skies by bioluminescent waves..." },
];

export function MemoryReel({ videoUrl, onComplete }: MemoryReelProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 4;
          if (next >= 100) {
            setIsPlaying(false);
            setIsCompleted(true);
            if (typeof window !== "undefined" && (window as any).playSFX) {
              (window as any).playSFX("win");
            }
            return 100;
          }
          const slideIndex = Math.min(
            REEL_SLIDES.length - 1,
            Math.floor((next / 100) * REEL_SLIDES.length)
          );
          setActiveSlide(slideIndex);
          return next;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, progress]);

  const togglePlay = () => {
    if (progress >= 100) {
      setProgress(0);
      setActiveSlide(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-[#0B0B0F]/90 border border-[#FF2D75]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,45,117,0.25)] text-center relative glass-specular select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30 flex items-center gap-1.5">
          <Film className="w-3.5 h-3.5 text-[#F5C76A]" />
          TASK 11 — MEMORY REEL 🎞️
        </span>
        <span className="text-xs font-semibold text-[#FF9CBD]">
          Reel Progress: {progress}%
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Our Memory Reel</h2>
      <p className="text-xs text-zinc-300 mb-4">
        Press play to watch our cinematic photorealistic relationship journey!
      </p>

      {/* Film Strip Holes Header */}
      <div className="flex justify-between items-center px-4 py-1 bg-black border-x-2 border-t-2 border-[#FF2D75]/40 rounded-t-2xl">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-zinc-800 rounded-sm border border-white/10" />
        ))}
      </div>

      {/* Cinematic Video Player Frame */}
      <div className="relative w-full h-72 sm:h-80 border-2 border-[#FF2D75]/40 overflow-hidden shadow-2xl bg-black">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            onEnded={() => {
              setIsCompleted(true);
              if (typeof window !== "undefined" && (window as any).playSFX) {
                (window as any).playSFX("win");
              }
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <img
              key={activeSlide}
              src={REEL_SLIDES[activeSlide].image}
              alt="Memory Reel Slide"
              className="w-full h-full object-cover animate-ken-burns transition-all duration-1000"
            />

            {/* Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent text-left">
              <p className="text-sm font-semibold text-white drop-shadow-md flex items-center gap-2">
                <span className="text-[#F5C76A] font-bold">#{activeSlide + 1}</span>
                <span>"{REEL_SLIDES[activeSlide].text}"</span>
              </p>
            </div>

            {/* Play/Pause Button Overlay */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#FF2D75]/80 hover:bg-[#FF2D75] text-white flex items-center justify-center shadow-[0_0_30px_#FF2D75] transition-transform hover:scale-110 active:scale-95 z-10"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-white" />
              ) : (
                <Play className="w-8 h-8 fill-white ml-1" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Film Strip Holes Footer */}
      <div className="flex justify-between items-center px-4 py-1 bg-black border-x-2 border-b-2 border-[#FF2D75]/40 rounded-b-2xl mb-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-zinc-800 rounded-sm border border-white/10" />
        ))}
      </div>

      {/* Video Progress Bar */}
      <div className="w-full bg-zinc-900 rounded-full h-2.5 overflow-hidden border border-white/10 p-0.5">
        <div
          className="bg-gradient-to-r from-[#FF2D75] via-[#FF4F91] to-[#F5C76A] h-full rounded-full transition-all duration-300 shadow-[0_0_12px_#FF2D75]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isCompleted && (
        <div className="mt-6 p-4 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD] animate-fade-in space-y-4 shadow-[0_0_30px_rgba(255,45,117,0.2)]">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-[#F5C76A]">
            <CheckCircle2 className="w-5 h-5" /> Memory Reel Completed!
          </div>
          <p className="text-sm text-white font-medium italic">
            "❤️ One little journey. So many memories."
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

