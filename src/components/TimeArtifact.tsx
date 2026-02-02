"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TimeArtifactProps {
  phase: number;
  onPhaseChange: (phase: number) => void;
}

export default function TimeArtifact({ phase, onPhaseChange }: TimeArtifactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const rotation = useMotionValue(0);
  const smoothRotation = useTransform(rotation, (r) => r); // Can add spring if needed

  // Snap to closest 72 degrees (360 / 5 phases)
  const SNAP_ANGLE = 72;

  const handlePan = (event: any, info: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle from center
    const angle = Math.atan2(info.point.y - centerY, info.point.x - centerX) * (180 / Math.PI);
    
    // We want to rotate based on the delta, but absolute angle tracking is easier for a wheel
    // Let's just track the raw rotation.
    // Actually, simpler approach: Calculate angle of click start, then track delta.
    // For now, let's just add delta X to rotation to simulate "spinning" a wheel on its side or top.
    
    // Better: "Steering wheel" logic
    // But since it's at the bottom, maybe just dragging left/right rotates it?
    // Let's try Dragging Horizontal = Rotate.
    
    const sensitivity = 0.5;
    rotation.set(rotation.get() + info.delta.x * sensitivity);
  };

  const handlePanEnd = () => {
    setIsDragging(false);
    const currentRot = rotation.get();
    
    // Find closest snap point
    // Phases are 0-4. 
    // Let's map rotation to phase. 
    // 0 deg = Phase 0
    // -72 deg = Phase 1
    // -144 deg = Phase 2...
    
    const snapIndex = Math.round(currentRot / -SNAP_ANGLE);
    // Normalize to 0-4
    // But we want continuous rotation? Or clamped?
    // Let's clamp for now to keep it simple: 0 to 4.
    
    const clampedIndex = Math.max(0, Math.min(4, snapIndex));
    const targetRot = clampedIndex * -SNAP_ANGLE;
    
    animate(rotation, targetRot, { type: "spring", stiffness: 50, damping: 10 });
    onPhaseChange(clampedIndex);
  };

  // Sync internal rotation with external phase prop change (if needed)
  useEffect(() => {
    const targetRot = phase * -SNAP_ANGLE;
    if (!isDragging && Math.abs(rotation.get() - targetRot) > 1) {
       animate(rotation, targetRot, { type: "spring", stiffness: 40, damping: 15 });
    }
  }, [phase, isDragging, rotation]);

  return (
    <div className="relative w-full h-full flex justify-center items-end overflow-hidden">
      {/* The Artifact Container */}
      <motion.div 
        ref={containerRef}
        className="relative w-64 h-64 md:w-96 md:h-96 cursor-grab active:cursor-grabbing touch-none"
        style={{ rotate: rotation, transformOrigin: "50% 50%" }}
        onPan={handlePan}
        onPanStart={() => setIsDragging(true)}
        onPanEnd={handlePanEnd}
      >
         {/* Main Disc - Antique Bronze */}
         <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8C5E58] to-[#2C241B] shadow-2xl border-4 border-[#6B6054]">
            {/* Inner Texture */}
            <div className="absolute inset-2 rounded-full border border-[#E0DCD3]/20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50" />
            
            {/* Decorative Rings */}
            <div className="absolute inset-8 rounded-full border-2 border-dashed border-[#E0DCD3]/30" />
            <div className="absolute inset-24 rounded-full border border-[#E0DCD3]/10" />

            {/* Ticks/Markers for Phases */}
            {[0, 1, 2, 3, 4].map((i) => (
                <div 
                    key={i}
                    className="absolute top-0 left-1/2 w-0.5 h-6 bg-[#E0DCD3] origin-bottom"
                    style={{ 
                        transform: `translateX(-50%) rotate(${i * 72}deg)`, 
                        transformOrigin: "50% 192px" // Half of w-96 (approx) - adjusted dynamically via CSS usually, but here hardcoded for 96
                    }} 
                />
            ))}
            
            {/* The "Eye" or Indicator - Fixed on the artifact or the world? 
                If the artifact rotates, the indicator should be part of the world (static).
                See below outside motion.div
            */}
            
            {/* Internal Glyphs that rotate with it */}
            {[
                { label: "I", rot: 0 },
                { label: "II", rot: 72 },
                { label: "III", rot: 144 },
                { label: "IV", rot: 216 },
                { label: "V", rot: 288 },
            ].map((glyph, i) => (
                <div 
                    key={i}
                    className="absolute top-4 left-1/2 -translate-x-1/2 text-[#E0DCD3] font-serif font-bold opacity-80"
                    style={{ 
                        transform: `translateX(-50%) rotate(${glyph.rot}deg) translateY(20px)`, 
                        transformOrigin: "50% 170px"
                    }}
                >
                    {glyph.label}
                </div>
            ))}
         </div>
         
         {/* Center Jewel/Mechanism */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#2C241B] border-2 border-[#8C5E58] shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#E0DCD3] animate-pulse" />
         </div>
      </motion.div>

      {/* Static Indicator (The "Needle") */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-1 h-12 bg-terracotta z-20 pointer-events-none">
        <div className="w-4 h-4 bg-terracotta rounded-full absolute -top-2 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(140,94,88,0.8)]" />
      </div>

      {/* Sand Overlay (to bury the bottom half) */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
      {/* Actual Sand SVG Shape matching the landscape would be better, but handled in parent via z-index */}
    </div>
  );
}
