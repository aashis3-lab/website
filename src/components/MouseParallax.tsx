"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseParallax({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPct = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      
      x.set(xPct * 20); // Max 20px offset
      y.set(yPct * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Layer - Moves opposite to mouse */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ x: springX, y: springY, scale: 1.1 }}
      >
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-terracotta/5 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-sand/10 rounded-full blur-3xl mix-blend-multiply" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
