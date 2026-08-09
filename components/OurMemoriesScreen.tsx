"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, ChevronLeft, ChevronRight, X, ArrowRight, Expand } from "lucide-react";

interface OurMemoriesScreenProps {
  onContinue: () => void;
  customMemories?: MemoryItem[];
}

export interface MemoryItem {
  id: number;
  title: string;
  subtitle?: string;
  quote: string;
  url: string;
}

export const MEMORIES_LIST: MemoryItem[] = [
  {
    id: 1,
    title: "Our First Memory ❤️",
    subtitle: "The Day It All Began",
    quote: "I didn't know that this moment would become one of my favorites.",
    url: "/images/secret_photo.png",
  },
  {
    id: 2,
    title: "That Day 🥹",
    subtitle: "Unforgettable Seconds",
    quote: "I wish I could go back to this moment and pause time forever.",
    url: "/images/puzzle_memory.png",
  },
  {
    id: 3,
    title: "The Magic Hour 🌇",
    subtitle: "Golden Hour Glow",
    quote: "Everything felt quiet, peaceful, and perfect when I was with you.",
    url: "/images/memory_sunset.png",
  },
  {
    id: 4,
    title: "Candlelit Dinner 🍷",
    subtitle: "Warm Evening Whispers",
    quote: "Soft lights, deep conversations, and your sweetest smile.",
    url: "/images/memory_date.png",
  },
  {
    id: 5,
    title: "Twilight Waves 🌊",
    subtitle: "Bi-Luminescent Shore",
    quote: "Walking along the shore under a thousand glowing stars.",
    url: "/images/memory_beach.png",
  },
  {
    id: 6,
    title: "Secret Garden Walk 🌹",
    subtitle: "Enchanted Bloom",
    quote: "Lost in our own enchanted little world, far away from everything.",
    url: "/images/hidden_garden.png",
  },
  {
    id: 7,
    title: "Cozy Coffee Date ☕",
    subtitle: "Warm Rainy Evening",
    quote: "Cold rainy nights outside, but absolute warmth in my heart with you.",
    url: "/images/memory_cozy.png",
  },
  {
    id: 8,
    title: "Stargazing Dreams 🌌",
    subtitle: "Under The Midnight Sky",
    quote: "Making wishes on falling stars, knowing mine already came true.",
    url: "/images/secret_photo.png",
  },
  {
    id: 9,
    title: "Late Night Talks 💬",
    subtitle: "Endless Conversations",
    quote: "Hours felt like minutes whenever we talked about our dreams.",
    url: "/images/puzzle_memory.png",
  },
  {
    id: 10,
    title: "Surprise Birthday Smile 🎁",
    subtitle: "Pure Happiness",
    quote: "Seeing you smile like that is my absolute favorite feeling in the world.",
    url: "/images/memory_date.png",
  },
  {
    id: 11,
    title: "Laughter in the Rain 🌧️",
    subtitle: "Spontaneous Joy",
    quote: "Getting caught in the rain and laughing like crazy without a care.",
    url: "/images/memory_sunset.png",
  },
  {
    id: 12,
    title: "Holding Your Hand 🤝",
    subtitle: "My Safe Haven",
    quote: "The safest place in the entire world is right here in your hand.",
    url: "/images/memory_beach.png",
  },
  {
    id: 13,
    title: "Our Secret Spot 🏡",
    subtitle: "Quiet Haven",
    quote: "Where time stood completely still and nothing else in the world mattered.",
    url: "/images/hidden_garden.png",
  },
  {
    id: 14,
    title: "Warmest Hugs 🫂",
    subtitle: "Heartbeats Together",
    quote: "The sweetest hug that instantly melted all my worries away.",
    url: "/images/memory_cozy.png",
  },
  {
    id: 15,
    title: "Forever & Always 👑",
    subtitle: "A Journey Continues",
    quote: "You are my past, my present, and my absolute favorite future.",
    url: "/images/secret_photo.png",
  },
];

export function OurMemoriesScreen({ onContinue, customMemories }: OurMemoriesScreenProps) {
  const memoriesToUse = (customMemories && customMemories.length > 0) ? customMemories : MEMORIES_LIST;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [pageGroup, setPageGroup] = useState<number>(0);

  // Touch Swipe Support for Lightbox
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const playSFX = (type: "pop" | "sparkle" | "win" | "click") => {
    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX(type);
    }
  };

  const handleOpenLightbox = (index: number) => {
    playSFX("sparkle");
    setSelectedIdx(index);
  };

  const handlePrevPhoto = () => {
    if (selectedIdx === null) return;
    playSFX("click");
    setSelectedIdx((prev) => (prev! === 0 ? memoriesToUse.length - 1 : prev! - 1));
  };

  const handleNextPhoto = () => {
    if (selectedIdx === null) return;
    playSFX("click");
    setSelectedIdx((prev) => (prev! === memoriesToUse.length - 1 ? 0 : prev! + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNextPhoto();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrevPhoto();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Active 5 items for the current page group
  const currentGroupMemories = memoriesToUse.slice(pageGroup * 5, pageGroup * 5 + 5);

  const activeMemory = selectedIdx !== null ? memoriesToUse[selectedIdx] : null;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 select-none animate-fade-in my-auto py-2 sm:py-3 px-2 sm:px-4">
      {/* Header Badge & Title */}
      <div className="space-y-1 sm:space-y-1.5">
        <span className="pink-badge text-[10px] sm:text-xs">📸 OUR MEMORIES</span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#4A0E17] tracking-wide">
          Our Little World ❤️
        </h1>
        <p className="text-xs sm:text-sm text-[#7A1C2C] font-semibold italic max-w-md mx-auto">
          "Some moments deserve to be remembered forever."
        </p>
      </div>

      {/* Memory Counter Badge & Group Switcher */}
      <div className="flex items-center justify-between w-full max-w-sm sm:max-w-md mx-auto px-3 py-1.5 sm:py-2 rounded-xl bg-white/95 border border-[#FFB6C1] shadow-xs text-[11px] sm:text-xs font-bold text-[#7A1C2C]">
        <span>MEMORIES {pageGroup * 5 + 1} - {Math.min(15, (pageGroup + 1) * 5)} OF 15</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              playSFX("click");
              setPageGroup((prev) => (prev === 0 ? 2 : prev - 1));
            }}
            className="p-0.5 sm:p-1 rounded-md bg-rose-50 text-[#FF3366] hover:bg-rose-100 transition-colors"
            title="Previous set"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[#FF3366] font-extrabold px-1">
            0{pageGroup + 1} / 03
          </span>
          <button
            onClick={() => {
              playSFX("click");
              setPageGroup((prev) => (prev === 2 ? 0 : prev + 1));
            }}
            className="p-0.5 sm:p-1 rounded-md bg-rose-50 text-[#FF3366] hover:bg-rose-100 transition-colors"
            title="Next set"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Compact Grid Layout - Fits 100% in Viewport */}
      <div className="w-full space-y-2.5 sm:space-y-3 max-w-2xl mx-auto">
        {/* Top Row: Photo 01 & Photo 02 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 items-stretch">
          {currentGroupMemories[0] && (
            <MemoryPolaroidCard
              item={currentGroupMemories[0]}
              index={pageGroup * 5 + 1}
              onClick={() => handleOpenLightbox(pageGroup * 5 + 0)}
            />
          )}
          {currentGroupMemories[1] && (
            <MemoryPolaroidCard
              item={currentGroupMemories[1]}
              index={pageGroup * 5 + 2}
              onClick={() => handleOpenLightbox(pageGroup * 5 + 1)}
            />
          )}
        </div>

        {/* Center Row: Featured Larger Photo 03 */}
        {currentGroupMemories[2] && (
          <div className="w-full max-w-md mx-auto">
            <MemoryPolaroidCard
              item={currentGroupMemories[2]}
              index={pageGroup * 5 + 3}
              isFeatured={true}
              onClick={() => handleOpenLightbox(pageGroup * 5 + 2)}
            />
          </div>
        )}

        {/* Bottom Row: Photo 04 & Photo 05 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 items-stretch">
          {currentGroupMemories[3] && (
            <MemoryPolaroidCard
              item={currentGroupMemories[3]}
              index={pageGroup * 5 + 4}
              onClick={() => handleOpenLightbox(pageGroup * 5 + 3)}
            />
          )}
          {currentGroupMemories[4] && (
            <MemoryPolaroidCard
              item={currentGroupMemories[4]}
              index={pageGroup * 5 + 5}
              onClick={() => handleOpenLightbox(pageGroup * 5 + 4)}
            />
          )}
        </div>
      </div>

      {/* Bottom Action Button */}
      <button
        onClick={() => {
          playSFX("click");
          onContinue();
        }}
        className="w-full max-w-sm sm:max-w-md py-3 sm:py-3.5 btn-neon-pink text-sm sm:text-base flex items-center justify-center gap-2 shadow-md mx-auto"
      >
        <span>KEEP GOING ❤️</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Interactive Lightbox Modal with Floating Hearts & Swipe Navigation */}
      {selectedIdx !== null && activeMemory && (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in select-none"
        >
          {/* Floating Hearts Particles in Lightbox */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <Heart
                key={i}
                style={{
                  left: `${(i * 7 + 5) % 95}%`,
                  top: `${(i * 13 + 10) % 90}%`,
                }}
                className="absolute w-5 h-5 text-[#FF3366] fill-[#FF3366] opacity-35 animate-bounce"
              />
            ))}
          </div>

          {/* Lightbox Content Card */}
          <div className="relative w-full max-w-md bg-[#FFFDFA] border-2 border-[#FF3366] rounded-3xl p-5 sm:p-6 text-center space-y-3.5 shadow-2xl z-10 my-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                playSFX("click");
                setSelectedIdx(null);
              }}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-rose-100 text-[#FF3366] hover:bg-rose-200 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Counter Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 text-[#FF3366] font-black text-xs">
              <span>{selectedIdx + 1 < 10 ? `0${selectedIdx + 1}` : selectedIdx + 1} / 15</span>
            </div>

            {/* Expanded Image */}
            <div className="w-full aspect-16/10 sm:aspect-4/3 rounded-xl overflow-hidden border border-[#FFB6C1] shadow-md relative group max-h-64 sm:max-h-72">
              <img
                src={activeMemory.url}
                alt={activeMemory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title & Romantic Caption */}
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black text-[#4A0E17]">
                {activeMemory.title}
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-[#7A1C2C] leading-relaxed px-1">
                "{activeMemory.quote}"
              </p>
            </div>

            {/* Lightbox Navigation Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-rose-100">
              <button
                onClick={handlePrevPhoto}
                className="px-3.5 py-1.5 rounded-xl bg-rose-100 text-[#FF3366] font-bold text-xs hover:bg-rose-200 flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV</span>
              </button>

              <span className="text-[10px] text-zinc-400 font-semibold">
                Swipe left/right 📱
              </span>

              <button
                onClick={handleNextPhoto}
                className="px-3.5 py-1.5 rounded-xl bg-[#FF3366] text-white font-bold text-xs hover:bg-[#FF6699] flex items-center gap-1 transition-colors"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Sub-component for individual polaroid cards */
function MemoryPolaroidCard({
  item,
  index,
  isFeatured = false,
  onClick,
}: {
  item: MemoryItem;
  index: number;
  isFeatured?: boolean;
  onClick: () => void;
}) {
  const indexFormatted = index < 10 ? `0${index}` : `${index}`;

  return (
    <div
      onClick={onClick}
      className={`p-2.5 sm:p-3 rounded-2xl bg-white border-2 border-[#FFB6C1] shadow-xs hover:border-[#FF3366] hover:shadow-md transition-all duration-300 cursor-pointer text-left flex flex-col justify-between space-y-2 relative group overflow-hidden h-full ${
        isFeatured ? "bg-gradient-to-b from-rose-50/90 to-white border-[#FF3366] shadow-sm" : ""
      }`}
    >
      {/* Index Badge */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#FF3366] bg-rose-100 px-2 py-0.5 rounded-full">
          PHOTO {indexFormatted}
        </span>
        <span className="text-zinc-400 group-hover:text-[#FF3366] transition-colors">
          <Expand className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Image Thumbnail */}
      <div
        className={`w-full rounded-lg overflow-hidden border border-rose-100 relative ${
          isFeatured ? "h-28 sm:h-36" : "h-20 sm:h-28"
        }`}
      >
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[#FF3366] font-bold text-[10px] sm:text-xs shadow-sm">
            Click to View ✨
          </span>
        </div>
      </div>

      {/* Title & Small Caption */}
      <div className="space-y-0.5">
        <h4 className="text-xs sm:text-sm font-black text-[#4A0E17] group-hover:text-[#FF3366] transition-colors leading-tight">
          {item.title}
        </h4>
        <p className="text-[11px] sm:text-xs font-serif italic text-[#7A1C2C] line-clamp-1 leading-normal">
          "{item.quote}"
        </p>
      </div>
    </div>
  );
}
