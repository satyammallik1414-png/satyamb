"use client";

import React, { useState, useEffect } from "react";
import { Heart, Sparkles, ArrowRight, Lock, CheckCircle2, ShieldCheck, Flame, Mail, MailOpen, Edit3, Check, FastForward } from "lucide-react";
import { OurMemoriesScreen } from "./OurMemoriesScreen";

interface LandingScreenProps {
  initialName?: string;
  partnerName?: string;
  loveLetterText?: string;
  customMemories?: any[];
  onStart: (name: string) => void;
}

const DEFAULT_LETTER_BODY = `My Love,

I don't know if words will ever be enough to explain how much you mean to me.

You have become such a beautiful part of my life, and every memory we've created together is something I will always treasure.

I know I'm not perfect. I've made mistakes, I've said things I shouldn't have, and sometimes I may not have shown you how much I care.

But one thing I want you to always know is that you matter to me more than you realize.

Thank you for every smile, every conversation, every silly moment, every beautiful memory, and simply for being you.

I hope this birthday brings you all the happiness you deserve.

With all my heart,`;

export function LandingScreen({ initialName, partnerName, loveLetterText, customMemories, onStart }: LandingScreenProps) {
  const [page, setPage] = useState<number>(1);
  const [page5SubStep, setPage5SubStep] = useState<number>(1);
  const [ruleIndex, setRuleIndex] = useState<number>(0);
  const [name, setName] = useState<string>(initialName || "Satyam's Love ❤️");
  const [showDelayedText, setShowDelayedText] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isBlackout, setIsBlackout] = useState<boolean>(false);

  // Love Letter Specific State
  const [isLetterOpened, setIsLetterOpened] = useState<boolean>(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState<boolean>(false);
  const [isEditingLetter, setIsEditingLetter] = useState<boolean>(false);
  const [currentLetterContent, setCurrentLetterContent] = useState<string>(
    loveLetterText || DEFAULT_LETTER_BODY
  );

  // Typewriter Typing Animation State
  const [typedCharIndex, setTypedCharIndex] = useState<number>(0);

  useEffect(() => {
    if (loveLetterText) {
      setCurrentLetterContent(loveLetterText);
    }
  }, [loveLetterText]);

  // Typewriter effect loop when letter opens
  useEffect(() => {
    if (page === 5.5 && isLetterOpened && !isEditingLetter) {
      if (typedCharIndex < currentLetterContent.length) {
        const timer = setInterval(() => {
          setTypedCharIndex((prev) => {
            if (prev >= currentLetterContent.length) {
              clearInterval(timer);
              return prev;
            }
            return prev + 1;
          });
        }, 22);
        return () => clearInterval(timer);
      }
    }
  }, [page, isLetterOpened, isEditingLetter, typedCharIndex, currentLetterContent]);

  // Page 1 delayed text reveal
  useEffect(() => {
    if (page === 1) {
      const timer = setTimeout(() => {
        setShowDelayedText(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [page]);

  const playSFX = (type: "pop" | "sparkle" | "win" | "click") => {
    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX(type);
    }
  };

  const goToNextPage = (nextPageNum: number) => {
    playSFX("click");
    setIsFading(true);
    setTimeout(() => {
      setPage(nextPageNum);
      setIsFading(false);
    }, 300);
  };

  const handleOpenLetter = () => {
    playSFX("sparkle");
    setIsOpeningAnim(true);
    setTypedCharIndex(0);
    setTimeout(() => {
      setIsLetterOpened(true);
      setIsOpeningAnim(false);
    }, 700);
  };

  const handleSkipTyping = () => {
    setTypedCharIndex(currentLetterContent.length);
  };

  const handleStartGame = () => {
    playSFX("win");
    setIsBlackout(true);
    setTimeout(() => {
      onStart(name);
    }, 500);
  };

  const senderName = partnerName || "Satyam";
  const isTypingComplete = typedCharIndex >= currentLetterContent.length;
  const displayedTypedText = currentLetterContent.slice(0, typedCharIndex);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#FFF0F5] text-[#4A0E17] flex flex-col items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto select-none">
      {/* 0.5s Blackout Flash Overlay for Game Launch */}
      {isBlackout && (
        <div className="fixed inset-0 bg-[#FF3366] z-50 flex items-center justify-center animate-fade-in text-white">
          <div className="text-center space-y-4">
            <span className="text-4xl sm:text-6xl font-black tracking-wider animate-bounce">
              MISSION ACCEPTED 🔓
            </span>
            <p className="text-lg font-bold">Entering Game World...</p>
          </div>
        </div>
      )}

      {/* Main Card Frame with Smooth Fading (Expanded to max-w-4xl for Memories Gallery page) */}
      <div
        className={`w-full ${
          page === 5.8 ? "max-w-4xl" : "max-w-xl"
        } mx-auto flex flex-col items-center justify-center text-center transition-all duration-300 transform my-auto`}
      >
        {/* ================= PAGE 1 ================= */}
        {page === 1 && (
          <div className="w-full p-8 sm:p-12 neon-card-frame space-y-8 animate-fade-in relative">
            <div className="absolute top-4 left-4">
              <span className="pink-badge">INTRO 1</span>
            </div>

            <div className="pt-6 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-rose-100 border-2 border-[#FF3366] flex items-center justify-center shadow-md animate-pulse">
                <Heart className="w-12 h-12 text-[#FF3366] fill-[#FF3366]" />
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-black text-[#4A0E17] tracking-wide">
                  Hey... ♡
                </h1>
                {showDelayedText && (
                  <p className="text-lg sm:text-2xl text-[#7A1C2C] font-semibold animate-fade-in tracking-wide">
                    I made something very special for you...
                  </p>
                )}
              </div>
            </div>

            {showDelayedText && (
              <button
                onClick={() => goToNextPage(2)}
                className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2"
              >
                <span>TAP TO CONTINUE</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>
            )}
          </div>
        )}

        {/* ================= PAGE 2 ================= */}
        {page === 2 && (
          <div className="w-full p-8 sm:p-12 neon-card-frame space-y-8 animate-fade-in relative">
            <div className="absolute top-4 left-4">
              <span className="pink-badge">INTRO 2</span>
            </div>

            <div className="pt-6 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 border border-[#FF6699] flex items-center justify-center text-4xl shadow-md animate-float-realistic">
                ✨
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-4xl font-bold text-[#4A0E17] leading-snug">
                  I made something <br />
                  <span className="text-[#FF3366] font-extrabold">
                    very special for you...
                  </span>
                </h2>
              </div>
            </div>

            <button
              onClick={() => goToNextPage(3)}
              className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <span>I'M CURIOUS</span>
              <Heart className="w-4 h-4 fill-white" />
            </button>
          </div>
        )}

        {/* ================= PAGE 3 ================= */}
        {page === 3 && (
          <div className="w-full p-8 sm:p-12 neon-card-frame space-y-8 animate-fade-in relative">
            <div className="absolute top-4 left-4">
              <span className="pink-badge">INTRO 3</span>
            </div>

            <div className="pt-6 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#FF3366] to-[#FF6699] p-1 shadow-md animate-pulse">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <Lock className="w-10 h-10 text-[#FF3366]" />
                </div>
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <h2 className="text-xl sm:text-3xl font-extrabold text-[#4A0E17]">
                  But before you see it,
                </h2>
                <p className="text-base sm:text-lg text-[#7A1C2C] font-semibold">
                  I need you to promise me one thing.
                </p>
              </div>
            </div>

            <button
              onClick={() => goToNextPage(4)}
              className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <span>I PROMISE</span>
              <Heart className="w-4 h-4 fill-white" />
            </button>
          </div>
        )}

        {/* ================= PAGE 4 ================= */}
        {page === 4 && (
          <div className="w-full p-8 sm:p-12 neon-card-frame space-y-8 animate-fade-in relative">
            <div className="absolute top-4 left-4">
              <span className="pink-badge">INTRO 4</span>
            </div>

            <div className="pt-6 space-y-6">
              <div className="flex justify-center gap-3 text-2xl text-[#FF3366] animate-pulse">
                ♡ ♡ ♡
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <h2 className="text-xl sm:text-3xl font-bold text-[#4A0E17]">Don't rush.</h2>
                <h2 className="text-xl sm:text-3xl font-bold text-[#D4AF37]">Don't skip anything.</h2>
                <p className="text-base sm:text-lg text-[#7A1C2C] font-semibold">
                  Just enjoy the journey.
                </p>
              </div>
            </div>

            <button
              onClick={() => goToNextPage(5)}
              className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <span>OKAY</span>
              <Heart className="w-4 h-4 fill-white" />
            </button>
          </div>
        )}

        {/* ================= PAGE 5 ================= */}
        {page === 5 && (
          <div className="w-full p-8 sm:p-12 neon-card-frame space-y-8 animate-fade-in relative">
            <div className="absolute top-4 left-4">
              <span className="pink-badge">INTRO 5</span>
            </div>

            <div className="pt-6 space-y-6">
              {page5SubStep === 1 ? (
                <>
                  <div className="space-y-3">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
                      THIS IS ONLY FOR
                    </p>
                    <h2 className="text-3xl sm:text-5xl font-black text-[#FF3366] italic">
                      My Love ❤️
                    </h2>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50 border border-[#FFB6C1] space-y-2">
                    <label className="text-xs font-bold text-[#7A1C2C] block">
                      Confirm or change her name:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#FFB6C1] text-center font-bold text-lg text-[#4A0E17] focus:border-[#FF3366] outline-none"
                      placeholder="Enter Name..."
                    />
                  </div>

                  <button
                    onClick={() => {
                      playSFX("sparkle");
                      setPage5SubStep(2);
                    }}
                    className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2"
                  >
                    <span>AWW</span>
                    <Heart className="w-4 h-4 fill-white" />
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-xl sm:text-3xl font-black text-[#4A0E17] leading-relaxed">
                      Every little thing you're about to see was made with you in mind. ❤️
                    </p>
                    <p className="text-sm text-[#7A1C2C] font-semibold italic">
                      "I've written a handwritten letter for you..."
                    </p>
                  </div>

                  <button
                    onClick={() => goToNextPage(5.5)}
                    className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2"
                  >
                    <span>READ MY LETTER 💌</span>
                    <Mail className="w-5 h-5 fill-white" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= PAGE 5.5 — TYPEWRITER HANDWRITTEN LOVE LETTER ================= */}
        {page === 5.5 && (
          <div className="w-full animate-fade-in select-none my-auto">
            {!isLetterOpened ? (
              /* First Screen: Sealed Romantic Envelope */
              <div className="w-full p-8 sm:p-10 rounded-3xl bg-[#0F0B15] border-2 border-[#FF2D75] shadow-[0_0_50px_rgba(255,45,117,0.35)] space-y-6 text-center relative overflow-hidden">
                <div className="absolute top-4 left-4">
                  <span className="pink-badge">💌 LOVE LETTER</span>
                </div>

                <div className="pt-6 space-y-3">
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-wide drop-shadow-md">
                    A Letter For You 💌
                  </h2>
                  <p className="text-sm sm:text-base text-[#FF9CBD] font-semibold italic max-w-md mx-auto leading-relaxed">
                    "You've completed the journey... <br />
                    but I still have something to tell you."
                  </p>
                </div>

                {/* 3D Envelope Graphic with Wax Seal */}
                <div className="py-4 flex flex-col items-center justify-center">
                  <div
                    className={`relative w-64 h-44 rounded-2xl bg-gradient-to-b from-[#2A1625] via-[#1F0D1B] to-[#120510] border-2 border-[#FF2D75]/60 shadow-[0_0_30px_rgba(255,45,117,0.3)] transition-transform duration-500 flex items-center justify-center ${
                      isOpeningAnim ? "scale-105 rotate-1" : "hover:scale-105"
                    }`}
                  >
                    {/* Envelope Flap */}
                    <div
                      className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#3D1E35] to-[#2A1625] border-b-2 border-[#FF2D75]/40 rounded-b-3xl transition-all duration-700 origin-top transform ${
                        isOpeningAnim ? "-rotate-x-180 opacity-40" : ""
                      }`}
                    />

                    {/* Wax Seal */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF1A66] via-[#FF2D75] to-[#D91B5C] border-2 border-[#F5C76A] flex items-center justify-center shadow-[0_0_20px_#FF2D75] animate-pulse">
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleOpenLetter}
                  className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2 group"
                >
                  <MailOpen className="w-5 h-5 group-hover:scale-125 transition-transform" />
                  <span>OPEN MY LETTER ❤️</span>
                </button>
              </div>
            ) : (
              /* Opened Typewriter Handwritten Paper Card (Properly Aligned & Centered) */
              <div className="w-full p-6 sm:p-10 rounded-3xl bg-[#FFFDFA] border-2 border-[#FFB6C1] shadow-[0_15px_45px_rgba(0,0,0,0.25)] text-left relative space-y-6 text-[#3D2314] overflow-hidden my-auto max-w-xl mx-auto">
                {/* Left Stationery Margin Rule Line */}
                <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-rose-200 opacity-60" />

                {/* Header Controls */}
                <div className="pl-6 sm:pl-8 flex items-center justify-between border-b border-rose-200 pb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF3366] flex items-center gap-1.5">
                    💌 HANDWRITTEN LETTER FOR YOU
                  </span>

                  <div className="flex items-center gap-2">
                    {!isTypingComplete && !isEditingLetter && (
                      <button
                        onClick={handleSkipTyping}
                        className="px-2.5 py-1 rounded-lg bg-rose-100 text-[#FF3366] hover:bg-rose-200 text-xs font-bold flex items-center gap-1 transition-colors"
                        title="Show full text"
                      >
                        <FastForward className="w-3 h-3" />
                        <span>Show All</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsEditingLetter(!isEditingLetter);
                        setTypedCharIndex(currentLetterContent.length);
                      }}
                      className="p-1.5 rounded-lg bg-rose-50 text-[#7A1C2C] hover:bg-rose-100 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="Edit letter content"
                    >
                      {isEditingLetter ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Done Editing</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-3.5 h-3.5 text-[#FF3366]" />
                          <span>Edit Text</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Typewriter Letter Body */}
                <div className="pl-6 sm:pl-8 space-y-4">
                  {isEditingLetter ? (
                    <textarea
                      rows={11}
                      value={currentLetterContent}
                      onChange={(e) => setCurrentLetterContent(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white border border-[#FFB6C1] font-serif text-sm sm:text-base text-[#3D2314] leading-relaxed outline-none focus:ring-2 focus:ring-[#FF3366]"
                    />
                  ) : (
                    <div className="font-serif italic font-medium text-base sm:text-lg leading-relaxed text-[#3D2314] whitespace-pre-line tracking-wide min-h-[220px]">
                      {displayedTypedText}
                      {!isTypingComplete && (
                        <span className="inline-block ml-1 w-2 h-5 bg-[#FF3366] animate-pulse rounded-xs align-middle" />
                      )}
                    </div>
                  )}

                  {isTypingComplete && !isEditingLetter && (
                    <div className="pt-4 border-t border-rose-100 flex flex-col items-end animate-fade-in">
                      <p className="font-serif italic text-base sm:text-lg font-bold text-[#FF3366]">
                        {senderName} ❤️
                      </p>
                    </div>
                  )}
                </div>

                {/* Continue to Page 5.8 (Our Memories) */}
                <button
                  onClick={() => goToNextPage(5.8)}
                  className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>OUR MEMORIES ❤️</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= PAGE 5.8 — OUR MEMORIES PHOTO GALLERY PAGE ================= */}
        {page === 5.8 && (
          <OurMemoriesScreen customMemories={customMemories} onContinue={() => goToNextPage(6)} />
        )}

        {/* ================= PAGE 6 ================= */}
        {page === 6 && (
          <div className="w-full p-8 sm:p-12 neon-card-frame space-y-8 animate-fade-in relative">
            <div className="absolute top-4 left-4">
              <span className="pink-badge">INTRO 6</span>
            </div>

            <div className="pt-6 space-y-6">
              <p className="text-base sm:text-lg text-[#7A1C2C] font-semibold">
                Are you ready for something amazing?
              </p>

              <div className="p-6 rounded-3xl bg-rose-50 border-2 border-[#FFB6C1] space-y-2">
                <span className="text-3xl sm:text-5xl font-black text-[#4A0E17] block">
                  13 CHALLENGES
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#FF3366] block">
                  ONE BEAUTIFUL STORY ❤️
                </span>
              </div>

              <p className="text-sm font-bold text-[#7A1C2C]">
                Let's Begin ♡
              </p>
            </div>

            <button
              onClick={() => goToNextPage(7)}
              className="w-full py-4 btn-neon-pink text-base sm:text-xl flex items-center justify-center gap-2"
            >
              <span>I'M READY</span>
              <Heart className="w-4 h-4 fill-white" />
            </button>
          </div>
        )}

        {/* ================= PAGE 7 ================= */}
        {page === 7 && (
          <div className="w-full p-8 sm:p-10 neon-card-frame space-y-6 animate-fade-in relative">
            <div className="absolute top-4 left-4">
              <span className="pink-badge">RULES 🔐</span>
            </div>

            <div className="pt-4 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A0E17]">
                There are only 3 rules...
              </h2>
            </div>

            {/* Interactive Unlocking Rules Cards */}
            <div className="space-y-3">
              {/* Rule 1 */}
              <div
                onClick={() => ruleIndex < 1 && (playSFX("pop"), setRuleIndex(1))}
                className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  ruleIndex >= 1
                    ? "bg-rose-50 border-[#FF3366] text-[#4A0E17] font-bold shadow-sm"
                    : "bg-white border-zinc-200 text-zinc-400 hover:border-[#FFB6C1]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center font-bold text-sm text-[#FF3366]">
                    #1
                  </span>
                  <span className="font-bold text-base">Rule #1 — Don't skip.</span>
                </div>
                {ruleIndex >= 1 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <span className="text-xs bg-rose-100 text-[#FF3366] px-2 py-1 rounded-full font-bold">TAP TO REVEAL</span>
                )}
              </div>

              {/* Rule 2 */}
              {ruleIndex >= 1 && (
                <div
                  onClick={() => ruleIndex < 2 && (playSFX("pop"), setRuleIndex(2))}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer animate-fade-in ${
                    ruleIndex >= 2
                      ? "bg-rose-50 border-[#FF3366] text-[#4A0E17] font-bold shadow-sm"
                      : "bg-white border-zinc-200 text-zinc-400 hover:border-[#FFB6C1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center font-bold text-sm text-[#FF3366]">
                      #2
                    </span>
                    <span className="font-bold text-base">Rule #2 — Take your time.</span>
                  </div>
                  {ruleIndex >= 2 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <span className="text-xs bg-rose-100 text-[#FF3366] px-2 py-1 rounded-full font-bold">TAP TO REVEAL</span>
                  )}
                </div>
              )}

              {/* Rule 3 */}
              {ruleIndex >= 2 && (
                <div
                  onClick={() => ruleIndex < 3 && (playSFX("win"), setRuleIndex(3))}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer animate-fade-in ${
                    ruleIndex >= 3
                      ? "bg-amber-50 border-[#D4AF37] text-[#4A0E17] font-bold shadow-sm"
                      : "bg-white border-zinc-200 text-zinc-400 hover:border-[#FFB6C1]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-bold text-sm text-[#D4AF37]">
                      #3
                    </span>
                    <span className="font-bold text-base">Rule #3 — Make it to the end. 🎁</span>
                  </div>
                  {ruleIndex >= 3 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <span className="text-xs bg-rose-100 text-[#FF3366] px-2 py-1 rounded-full font-bold">TAP TO REVEAL</span>
                  )}
                </div>
              )}
            </div>

            {ruleIndex < 3 && (
              <button
                onClick={() => {
                  playSFX("pop");
                  setRuleIndex((prev) => Math.min(3, prev + 1));
                }}
                className="w-full py-3 rounded-xl bg-white border border-[#FFB6C1] text-xs font-bold text-[#7A1C2C] hover:bg-rose-50"
              >
                Reveal All Rules ✨
              </button>
            )}

            {ruleIndex >= 3 && (
              <button
                onClick={() => goToNextPage(8)}
                className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2 animate-fade-in"
              >
                <Lock className="w-5 h-5" />
                <span>I ACCEPT THE CHALLENGE 🔐</span>
              </button>
            )}
          </div>
        )}

        {/* ================= PAGE 8 — GAME BEGINS ================= */}
        {page === 8 && (
          <div className="w-full p-8 sm:p-12 neon-card-frame space-y-6 animate-fade-in relative">
            <div className="flex items-center justify-between border-b border-rose-200 pb-3">
              <span className="pink-badge">CHALLENGE 1 / 13</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> UNLOCKED
              </span>
            </div>

            <div className="space-y-3 text-center py-2">
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 border-2 border-[#FF3366] flex items-center justify-center shadow-md animate-pulse">
                <Lock className="w-8 h-8 text-[#FF3366]" />
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#4A0E17]">
                UNLOCK OUR STORY
              </h2>
              <p className="text-sm text-[#7A1C2C] font-semibold italic">
                "Every love story has a beginning. Let's unlock ours."
              </p>
            </div>

            <button
              onClick={handleStartGame}
              className="w-full py-4 btn-neon-pink text-base sm:text-lg flex items-center justify-center gap-2 group"
            >
              <Flame className="w-5 h-5 text-white group-hover:scale-125 transition-transform" />
              <span>START CHALLENGE</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
