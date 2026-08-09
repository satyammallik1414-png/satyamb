"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react";

interface LoveScrambleProps {
  onComplete: () => void;
  customWord?: string;
}

const ROUNDS = [
  { word: "LOVE", hint: "It's what I feel for you every single day ❤️" },
  { word: "SMILE", hint: "The most beautiful thing on your face 😊" },
  { word: "FOREVER", hint: "How long I want to be by your side ♾️" },
];

export function LoveScramble({ onComplete, customWord }: LoveScrambleProps) {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentRound = {
    ...ROUNDS[currentRoundIdx],
    word: customWord && currentRoundIdx === 0 ? customWord : ROUNDS[currentRoundIdx].word,
  };

  // Scramble letters
  const scrambledLetters = React.useMemo(() => {
    const letters = currentRound.word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  }, [currentRoundIdx, currentRound.word]);

  const [availableLetters, setAvailableLetters] = useState<string[]>(scrambledLetters);

  React.useEffect(() => {
    setAvailableLetters(scrambledLetters);
    setUserLetters([]);
    setShowHint(false);
  }, [scrambledLetters]);

  const handleSelectLetter = (letter: string, index: number) => {
    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX("click");
    }

    const nextUser = [...userLetters, letter];
    const nextAvailable = availableLetters.filter((_, idx) => idx !== index);

    setUserLetters(nextUser);
    setAvailableLetters(nextAvailable);

    // Check if filled
    if (nextUser.length === currentRound.word.length) {
      const attempted = nextUser.join("");
      if (attempted === currentRound.word) {
        // Correct!
        if (typeof window !== "undefined" && (window as any).playSFX) {
          (window as any).playSFX("win");
        }

        if (currentRoundIdx + 1 < ROUNDS.length) {
          setTimeout(() => {
            setCurrentRoundIdx(currentRoundIdx + 1);
          }, 800);
        } else {
          setIsCompleted(true);
        }
      } else {
        // Wrong
        if (typeof window !== "undefined" && (window as any).playSFX) {
          (window as any).playSFX("wrong");
        }
        setTimeout(() => {
          setUserLetters([]);
          setAvailableLetters(scrambledLetters);
        }, 600);
      }
    }
  };

  const handleRemoveLetter = (index: number) => {
    const removedLetter = userLetters[index];
    setUserLetters((prev) => prev.filter((_, i) => i !== index));
    setAvailableLetters((prev) => [...prev, removedLetter]);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-black/60 border border-[#FF2D75]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(255,45,117,0.25)] text-center relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30">
          TASK 6 — LOVE SCRAMBLE 🔤
        </span>
        <span className="text-xs font-semibold text-[#FF9CBD]">
          ROUND {currentRoundIdx + 1} / {ROUNDS.length}
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">Unscramble the Love Word</h2>
      <p className="text-xs text-zinc-300 mb-4">
        Tap the letters in the correct order to spell out the romantic word!
      </p>

      {/* Word Slots */}
      <div className="flex justify-center gap-2 mb-6 my-4">
        {Array.from({ length: currentRound.word.length }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => userLetters[idx] && handleRemoveLetter(idx)}
            className={`w-12 h-14 rounded-xl border-2 text-xl font-extrabold flex items-center justify-center transition-all ${
              userLetters[idx]
                ? "bg-[#FF2D75]/20 border-[#FF2D75] text-white shadow-[0_0_15px_#FF2D75]"
                : "bg-zinc-900/80 border-zinc-700 text-zinc-500"
            }`}
          >
            {userLetters[idx] || "_"}
          </button>
        ))}
      </div>

      {/* Available Letters Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {availableLetters.map((letter, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectLetter(letter, idx)}
            className="w-12 h-12 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-[#FF9CBD]/40 text-white font-bold text-lg hover:border-[#FF2D75] hover:scale-110 shadow-lg active:scale-95 transition-all"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Hint Section */}
      <div className="mb-4">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs font-semibold text-[#F5C76A] flex items-center gap-1.5 mx-auto bg-[#F5C76A]/10 px-3 py-1.5 rounded-full border border-[#F5C76A]/30 hover:bg-[#F5C76A]/20 transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5" /> {showHint ? "Hide Hint" : "Need a Hint?"}
        </button>
        {showHint && (
          <p className="text-xs text-white mt-2 italic animate-fade-in bg-black/40 p-2 rounded-xl border border-white/10">
            "{currentRound.hint}"
          </p>
        )}
      </div>

      {isCompleted && (
        <div className="mt-6 p-4 rounded-2xl bg-[#FF2D75]/10 border border-[#FF2D75]/40 text-[#FF9CBD] animate-fade-in space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-[#F5C76A]">
            <CheckCircle2 className="w-5 h-5" /> Correct! ❤️
          </div>
          <p className="text-sm text-white font-medium italic">
            "That's exactly what I feel for you every moment."
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
