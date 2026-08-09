"use client";

import React, { useEffect, useRef } from "react";

const BIRTHDAY_EMOJIS = ["🎂", "🎉", "🎈", "🌸", "💖", "✨", "👑", "🎁", "🥰", "🌺", "🥳", "🎀", "🌹", "🍰", "💎"];

export function BirthdayBloomParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface EmojiParticle {
      x: number;
      y: number;
      emoji: string;
      fontSize: number;
      speedY: number;
      speedX: number;
      opacity: number;
      rotation: number;
      rotSpeed: number;
      swayOffset: number;
      swaySpeed: number;
      scale: number;
    }

    const particles: EmojiParticle[] = [];
    const particleCount = 35; // Optimum density for smooth floating performance

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        emoji: BIRTHDAY_EMOJIS[Math.floor(Math.random() * BIRTHDAY_EMOJIS.length)],
        fontSize: Math.random() * 18 + 16, // Size 16px to 34px
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        scale: Math.random() * 0.4 + 0.8,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.swayOffset += p.swaySpeed;
        p.rotation += p.rotSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.swayOffset) * 0.45;
        p.scale += Math.sin(p.swayOffset * 2) * 0.005;

        if (p.y < -40) {
          p.y = canvas.height + 40;
          p.x = Math.random() * canvas.width;
          p.emoji = BIRTHDAY_EMOJIS[Math.floor(Math.random() * BIRTHDAY_EMOJIS.length)];
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scale, p.scale);
        ctx.font = `${p.fontSize}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
}
