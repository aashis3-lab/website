"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  ease: number;
}

export default function ReactiveSand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const gap = 30; // Distance between particles
    const radius = 1.5; // Size of particles

    const colors = ["#E0DCD3", "#6B6054", "#8C5E58"]; // Sand, Dusk, Terracotta (Updated Palette)

    const initParticles = () => {
      particles.current = [];
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          // Add some randomness to initial position
          const dx = (Math.random() - 0.5) * 10;
          const dy = (Math.random() - 0.5) * 10;
          const particleX = x + dx;
          const particleY = y + dy;
          
          particles.current.push({
            x: particleX,
            y: particleY,
            originX: particleX,
            originY: particleY,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * radius + 0.5,
            vx: 0,
            vy: 0,
            ease: Math.random() * 0.1 + 0.05, // Random ease for organic movement
          });
        }
      }
    };

    const handleResize = () => {
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.current.forEach((p) => {
        // Calculate distance from mouse
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 150; // Radius of influence
        const force = Math.max(0, forceDistance - distance); // Stronger when closer

        // Angle away from mouse
        const angle = Math.atan2(dy, dx);
        
        // Target position (push away from mouse + return to origin)
        // If mouse is close, push away. If far, return to origin.
        let targetX = p.originX;
        let targetY = p.originY;

        if (distance < forceDistance) {
           const pushFactor = force / 15; // Power of the push
           targetX -= Math.cos(angle) * pushFactor;
           targetY -= Math.sin(angle) * pushFactor;
        }

        // Physics: Move towards target
        p.vx += (targetX - p.x) * p.ease;
        p.vy += (targetY - p.y) * p.ease;
        
        // Friction
        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <canvas ref={canvasRef} />
    </div>
  );
}
