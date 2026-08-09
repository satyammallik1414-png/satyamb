"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";

interface PhotoPuzzleProps {
  photoUrl?: string;
  onComplete: () => void;
}

export function PhotoPuzzle({ photoUrl, onComplete }: PhotoPuzzleProps) {
  const rows = 3;
  const cols = 4;
  const totalPieces = rows * cols;
  const imageToUse = photoUrl || "/images/puzzle_memory.png";

  const [pieces, setPieces] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Touch drag state
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const [touchItemVal, setTouchItemVal] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const initPuzzle = () => {
    const arr = Array.from({ length: totalPieces }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setPieces(arr);
    setSelectedIdx(null);
    setDraggedIdx(null);
    setIsCompleted(false);
  };

  useEffect(() => {
    initPuzzle();
  }, [imageToUse]);

  const swapPieces = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx || isCompleted) return;

    const newPieces = [...pieces];
    const temp = newPieces[fromIdx];
    newPieces[fromIdx] = newPieces[toIdx];
    newPieces[toIdx] = temp;

    setPieces(newPieces);
    setSelectedIdx(null);
    setDraggedIdx(null);

    if (typeof window !== "undefined" && (window as any).playSFX) {
      (window as any).playSFX("pop");
    }

    // Check solved
    const solved = newPieces.every((val, idx) => val === idx);
    if (solved) {
      setIsCompleted(true);
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("win");
      }
    }
  };

  // Click-to-swap
  const handleTileClick = (index: number) => {
    if (isCompleted) return;

    if (selectedIdx === null) {
      setSelectedIdx(index);
      if (typeof window !== "undefined" && (window as any).playSFX) {
        (window as any).playSFX("click");
      }
    } else {
      swapPieces(selectedIdx, index);
    }
  };

  // Desktop Drag-and-Drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (isCompleted) return;
    setDraggedIdx(index);
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIdx: number) => {
    e.preventDefault();
    if (draggedIdx !== null) {
      swapPieces(draggedIdx, dropIdx);
    }
  };

  // Mobile Touch Drag-and-Drop
  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    if (isCompleted) return;
    setDraggedIdx(index);
    setTouchItemVal(pieces[index]);
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedIdx === null || isCompleted) return;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (draggedIdx === null || !gridRef.current || !touchPos || isCompleted) {
      setDraggedIdx(null);
      setTouchPos(null);
      return;
    }

    // Find drop target tile element under finger
    const elem = document.elementFromPoint(touchPos.x, touchPos.y);
    if (elem) {
      const tileAttr = elem.getAttribute("data-tile-index");
      if (tileAttr !== null) {
        const dropIdx = Number(tileAttr);
        swapPieces(draggedIdx, dropIdx);
      }
    }

    setDraggedIdx(null);
    setTouchPos(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-7 rounded-3xl bg-[#0F0F14]/90 border border-[#FF2D75]/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center relative select-none">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F5C76A] px-3 py-1 rounded-full bg-[#F5C76A]/10 border border-[#F5C76A]/30">
          TASK 2 — PHOTO PUZZLE 🧩
        </span>
        <button
          onClick={initPuzzle}
          className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/10"
        >
          <RotateCcw className="w-3 h-3" /> RESET
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
        Solve the Memory Puzzle
      </h2>
      <p className="text-xs sm:text-sm text-zinc-400 mb-5">
        Drag & drop or tap tiles to move them into position!
      </p>

      {/* Touch Floating Drag Ghost Preview */}
      {touchPos && touchItemVal !== null && (
        <div
          className="fixed z-50 w-20 h-16 rounded-xl border-2 border-[#FF2D75] shadow-[0_0_20px_#FF2D75] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${touchPos.x}px`,
            top: `${touchPos.y}px`,
            backgroundImage: `url('${imageToUse}')`,
            backgroundSize: "400% 300%",
            backgroundPosition: `${(touchItemVal % cols) * 33.33}% ${
              Math.floor(touchItemVal / cols) * 50
            }%`,
          }}
        />
      )}

      {/* 3D Perspective Grid Container */}
      <div
        ref={gridRef}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`grid grid-cols-4 gap-2 p-2.5 bg-[#09090D] rounded-2xl border-2 perspective-1000 transition-all duration-500 ${
          isCompleted
            ? "border-[#F5C76A] shadow-[0_0_40px_rgba(245,199,106,0.6)]"
            : "border-[#FF2D75]/40 shadow-[0_0_25px_rgba(255,45,117,0.25)]"
        }`}
        style={{ aspectRatio: "4 / 3" }}
      >
        {pieces.map((pieceVal, currentPos) => {
          const correctRow = Math.floor(pieceVal / cols);
          const correctCol = pieceVal % cols;

          const bgX = (correctCol / (cols - 1)) * 100;
          const bgY = (correctRow / (rows - 1)) * 100;

          const isSelected = selectedIdx === currentPos;
          const isBeingDragged = draggedIdx === currentPos;
          const isCorrectPosition = pieceVal === currentPos;

          return (
            <div
              key={currentPos}
              data-tile-index={currentPos}
              draggable={!isCompleted}
              onDragStart={(e) => handleDragStart(e, currentPos)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, currentPos)}
              onTouchStart={(e) => handleTouchStart(e, currentPos)}
              onClick={() => handleTileClick(currentPos)}
              className={`relative cursor-grab active:cursor-grabbing rounded-xl overflow-hidden transition-all duration-300 transform-style-3d ${
                isBeingDragged
                  ? "opacity-30 scale-90 border-2 border-dashed border-[#FF2D75]"
                  : isSelected
                  ? "ring-4 ring-[#FF2D75] scale-95 shadow-[0_0_20px_#FF2D75] z-20 -translate-z-2"
                  : isCorrectPosition && !isCompleted
                  ? "border border-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                  : "hover:scale-[0.98] border border-white/10 hover:border-[#FF2D75]/60 hover:shadow-lg"
              }`}
              style={{
                backgroundImage: `url('${imageToUse}')`,
                backgroundSize: "400% 300%",
                backgroundPosition: `${bgX}% ${bgY}%`,
              }}
            >
              {!isCompleted && isSelected && (
                <div className="absolute inset-0 bg-[#FF2D75]/40 backdrop-blur-[1px] flex items-center justify-center animate-pulse">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider bg-black/50 px-2 py-0.5 rounded-full border border-white/20">
                    SELECTED
                  </span>
                </div>
              )}
              {!isCompleted && isCorrectPosition && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              )}
            </div>
          );
        })}
      </div>

      {isCompleted && (
        <div className="mt-6 p-5 rounded-2xl bg-[#F5C76A]/10 border border-[#F5C76A]/40 text-[#F5C76A] animate-fade-in space-y-4 shadow-[0_0_30px_rgba(245,199,106,0.2)]">
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <CheckCircle2 className="w-5 h-5 text-[#F5C76A]" /> PUZZLE COMPLETED! 🎉
          </div>
          <p className="text-sm text-white font-medium italic">
            "🥹 You found one of our beautiful memories."
          </p>
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF2D75] to-[#FF4F91] text-white font-extrabold text-base shadow-[0_0_25px_#FF2D75] hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>UNLOCK NEXT ❤️</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
