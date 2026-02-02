"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface InteractiveHourglassProps {
  onSectionChange: (section: string) => void;
  currentSection: string;
}

const SECTIONS = ["Origin", "Philosophy", "Bio"];

export default function InteractiveHourglass({ onSectionChange, currentSection }: InteractiveHourglassProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    if (isRotating) return;
    
    setIsRotating(true);
    setRotation(prev => prev + 180);

    // Calculate next section
    const currentIndex = SECTIONS.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % SECTIONS.length;
    const nextSection = SECTIONS[nextIndex];

    // Trigger content change halfway through rotation
    setTimeout(() => {
        onSectionChange(nextSection);
        setIsRotating(false);
    }, 600);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-8">
      {/* The Hourglass */}
      <motion.div
        onClick={handleClick}
        animate={{ rotate: rotation }}
        transition={{ duration: 1.2, ease: "easeInOut", type: "spring", stiffness: 50 }}
        className="relative w-48 h-80 cursor-pointer group"
      >
        {/* Glass Container SVG */}
        <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-2xl">
           <defs>
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                 <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                 <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
           </defs>
           
           {/* Top Bulb */}
           <path d="M10,10 Q50,30 90,10 L90,80 Q50,110 10,80 Z" fill="url(#glassGradient)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
           {/* Bottom Bulb */}
           <path d="M10,190 Q50,170 90,190 L90,120 Q50,90 10,120 Z" fill="url(#glassGradient)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
           
           {/* Connection */}
           <path d="M45,80 L55,80 L55,120 L45,120 Z" fill="rgba(255,255,255,0.3)" />
        </svg>

        {/* Sand - Top (Draining) */}
        <motion.div 
            key={`top-${rotation}`} // Reset on rotation
            initial={{ height: "40%" }}
            animate={{ height: "0%" }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute top-[5%] left-[15%] right-[15%] bg-terracotta rounded-b-full opacity-80 mix-blend-multiply"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        />

        {/* Sand - Falling Stream */}
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-[40%] left-1/2 -translate-x-1/2 w-0.5 bg-terracotta h-20"
        />

        {/* Sand - Bottom (Filling) */}
        <motion.div 
            key={`bottom-${rotation}`} // Reset on rotation
            initial={{ height: "0%", scale: 0 }}
            animate={{ height: "30%", scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute bottom-[5%] left-[15%] right-[15%] bg-dusk rounded-t-full opacity-80 mix-blend-multiply origin-bottom"
            style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
        />
        
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-terracotta/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </motion.div>

      {/* Label / Instruction */}
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-stone font-sans text-xs uppercase tracking-widest"
      >
        Click to Turn Time
      </motion.p>
      
      {/* Falling Dust Particles */}
      <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: -10, opacity: 0 }}
                animate={{ 
                    y: [0, 400], 
                    opacity: [0, 0.8, 0],
                    x: Math.sin(i) * 20 // Slight sway
                }}
                transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 3,
                    ease: "linear"
                }}
                className="absolute top-0 left-1/2 w-1 h-1 bg-terracotta/40 rounded-full"
                style={{ marginLeft: (Math.random() * 40 - 20) + 'px' }}
            />
        ))}
      </div>
    </div>
  );
}