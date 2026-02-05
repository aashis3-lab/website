"use client";

import { useEffect, useRef } from "react";

  interface Particle {
    x: number;
    y: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
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
      const radius = 1.5; // Size of particles

      const colors = ["#E0DCD3", "#6B6054", "#8C5E58"]; // Sand, Dusk, Terracotta (Updated Palette)

      const initParticles = () => {
        particles.current = [];
        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const particleCount = Math.floor((width * height) / 1000); // Adjust density

        for (let i = 0; i < particleCount; i++) {
          particles.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * radius + 0.5,
            vx: (Math.random() - 0.5) * 0.5, // Gentle float velocity
            vy: (Math.random() - 0.5) * 0.5,
          });
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
        
        const nearbyParticles: Particle[] = [];
        const connectionRadius = 180; // Radius around mouse to form shapes

        particles.current.forEach((p) => {
          // Move particles
          p.x += p.vx;
          p.y += p.vy;

          // Boundary check (bounce)
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Calculate distance from mouse for constellation effect
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Interaction with mouse (gentle attraction)
          const forceRadius = 200; // Increased radius for better gathering
          if (distance < forceRadius) {
            const force = (forceRadius - distance) / forceRadius; // 0 to 1
            const angle = Math.atan2(dy, dx);
            const pullX = Math.cos(angle) * force * 0.15; // Pull towards
            const pullY = Math.sin(angle) * force * 0.15;
            
            p.vx += pullX;
            p.vy += pullY;
          }

          // Limit velocity
          const maxSpeed = 2;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
          }

          // Damping (optional, keeps them from accelerating forever)
          p.vx *= 0.99;
          p.vy *= 0.99;

          // Collect particles for connections
          if (distance < connectionRadius) {
              nearbyParticles.push(p);
          }

          // Draw Particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });

        // Draw Geometric Connections
        nearbyParticles.forEach((p1, i) => {
          for (let j = i + 1; j < nearbyParticles.length; j++) {
              const p2 = nearbyParticles[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxLinkDist = 60; // Max distance to connect particles

              if (dist < maxLinkDist) {
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  const opacity = (1 - dist / maxLinkDist) * 0.3;
                  ctx.strokeStyle = `rgba(140, 94, 88, ${opacity})`; // Terracotta
                  ctx.lineWidth = 0.5;
                  ctx.stroke();
              }
          }
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
