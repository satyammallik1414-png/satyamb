"use client";

import React, { useEffect, useRef } from "react";

export function HeartParticles() {
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

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      swayOffset: number;
      swaySpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = 28;
    const colors = ["#FF3366", "#FF6699", "#FF9CBD", "#FFB6C1", "#D4AF37"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 6,
        speedY: -(Math.random() * 0.7 + 0.25),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawHeart = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();

      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(
        x - size / 2,
        y + (size + topCurveHeight) / 2,
        x,
        y + (size + topCurveHeight) / 1.4,
        x,
        y + size
      );
      ctx.bezierCurveTo(
        x,
        y + (size + topCurveHeight) / 1.4,
        x + size / 2,
        y + (size + topCurveHeight) / 2,
        x + size / 2,
        y + topCurveHeight
      );
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.swayOffset += p.swaySpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.swayOffset) * 0.35;

        if (p.y < -30) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        drawHeart(p.x, p.y, p.size, p.color, p.opacity);
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
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}


