"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Trigger confetti burst on load
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#FF2D75", "#FF4F91", "#FF9CBD", "#F5C76A", "#FFFFFF"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FF2D75", "#F5C76A", "#FF4F91"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FF2D75", "#F5C76A", "#FF4F91"],
      });
    }, 2500);

    // Fireworks Canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return () => clearInterval(interval);

    const ctx = canvas.getContext("2d");
    if (!ctx) return () => clearInterval(interval);

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;
      size: number;
      sparkTrail: { x: number; y: number }[];
    }

    const particles: FireworkParticle[] = [];

    const createExplosion = (x: number, y: number) => {
      const colors = ["#FF2D75", "#FF4F91", "#F5C76A", "#FFFFFF", "#FF9CBD", "#FFD700"];
      const particleCount = 65;

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          decay: Math.random() * 0.018 + 0.01,
          size: Math.random() * 3 + 1.5,
          sparkTrail: [],
        });
      }
    };

    const autoExplodeInterval = setInterval(() => {
      createExplosion(
        Math.random() * canvas.width,
        Math.random() * (canvas.height * 0.55)
      );
    }, 600);

    const render = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Record trail
        p.sparkTrail.push({ x: p.x, y: p.y });
        if (p.sparkTrail.length > 5) p.sparkTrail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98; // air drag
        p.vy *= 0.98;
        p.vy += 0.08; // realistic gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
          return;
        }

        // Draw spark trail
        ctx.save();
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size * 0.8;
        ctx.beginPath();
        if (p.sparkTrail.length > 0) {
          ctx.moveTo(p.sparkTrail[0].x, p.sparkTrail[0].y);
          for (let i = 1; i < p.sparkTrail.length; i++) {
            ctx.lineTo(p.sparkTrail[i].x, p.sparkTrail[i].y);
          }
        }
        ctx.stroke();
        ctx.restore();

        // Draw spark head
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      clearInterval(autoExplodeInterval);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}

