"use client";

import { useState, useRef, useEffect } from "react";
import { motion, animate, useMotionValue } from "framer-motion";

interface BuriedArtifactProps {
  onAspectChange: (aspect: number) => void;
  currentAspect: number;
}

export default function BuriedArtifact({ onAspectChange, currentAspect }: BuriedArtifactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationValue = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const previousAngleRef = useRef(0);

  const NUMERALS = [
    { label: "XII", angle: 0, id: 0 },
    { label: "I", angle: 30, id: 1 },
    { label: "II", angle: 60, id: 2 },
    { label: "III", angle: 90, id: 3 },
    { label: "IV", angle: 120, id: 4 },
    { label: "V", angle: 150, id: 5 },
    { label: "VI", angle: 180, id: 6 },
    { label: "VII", angle: 210, id: 7 },
    { label: "VIII", angle: 240, id: 8 },
    { label: "IX", angle: 270, id: 9 },
    { label: "X", angle: 300, id: 10 },
    { label: "XI", angle: 330, id: 11 },
  ];

  // Sync rotation with currentAspect prop
  useEffect(() => {
    if (isDragging) return;
    
    const target = NUMERALS.find(n => n.id === currentAspect);
    if (target) {
        const current = rotationValue.get();
        const baseTarget = target.angle;
        const currentRotations = Math.floor(current / 360);
        
        const candidates = [
            (currentRotations - 1) * 360 + baseTarget,
            currentRotations * 360 + baseTarget,
            (currentRotations + 1) * 360 + baseTarget
        ];
        
        const closest = candidates.reduce((prev, curr) => 
           Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
        );
        
        animate(rotationValue, closest, { duration: 0.8, ease: "circOut" });
    }
  }, [currentAspect, isDragging]);

    // Continuous Second Hand Animation
    const secondHandRotation = useMotionValue(0);
    useEffect(() => {
        const controls = animate(secondHandRotation, 360, {
            ease: "linear",
            duration: 60,
            repeat: Infinity
        });
        return controls.stop;
    }, []);

    const handlePanStart = (event: any, info: any) => {
        setIsDragging(true);
        // Do not reset previousAngleRef here as we want continuity or calculation from current pointer
    };

    const handlePan = (event: any, info: any) => {
        if (!containerRef.current) return;

        // Calculate center of the clock
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate angle of pointer relative to center
        // info.point is the absolute position of the pointer
        const point = info.point;
        const deltaX = point.x - centerX;
        const deltaY = point.y - centerY;

        // Calculate angle in degrees
        // atan2 returns radians from -PI to PI
        // We convert to degrees. 0 is Right (3 o'clock). 
        // We want 0 to be Top (12 o'clock).
        // Standard: 0 = Right, 90 = Bottom, 180 = Left, -90 = Top
        // Our Clock: 0 = Top, 90 = Right, 180 = Bottom, 270 = Left
        
        let angleRad = Math.atan2(deltaY, deltaX);
        let angleDeg = angleRad * (180 / Math.PI);
        
        // Convert standard angle to clock angle (0 at top, clockwise)
        // Standard: 0 (Right) -> 90 (Bottom) -> 180/-180 (Left) -> -90 (Top)
        // Target: 0 (Top) -> 90 (Right) -> 180 (Bottom) -> 270 (Left)
        // Formula: (angleDeg + 90)
        let clockAngle = angleDeg + 90;
        
        // Normalize to positive 0-360
        // if (clockAngle < 0) clockAngle += 360; // We might want continuous rotation instead

        // To handle infinite rotation, we need to track deltas
        // Or simply calculate the difference from the LAST frame
        
        // On first frame of drag, we just set the ref?
        // No, calculate delta from previous event?
        // Framer Motion's handlePan is called continuously.
        
        // Better approach: Calculate absolute angle, find difference from previous absolute angle
        // Add difference to total rotation
        
        // But we need the previous angle of the POINTER, not the rotation value.
        // We can store the previous pointer angle in a ref.
        
        // Let's recalculate for this frame
        // Re-using clockAngle logic:
        // 0 is Top (12), 90 is Right (3), 180 is Bottom (6), -90 is Left (9)
        // Wait, standard atan2(y, x):
        // (0, -1) [Top] -> -90 deg
        // (1, 0) [Right] -> 0 deg
        // (0, 1) [Bottom] -> 90 deg
        // (-1, 0) [Left] -> 180 deg
        
        // So standard + 90 gives:
        // Top: 0
        // Right: 90
        // Bottom: 180
        // Left: 270
        
        // This maps correctly to our visual clock.
        
        // However, we need to handle the wrap-around from 359 to 0 (or -180 to 180 in atan2)
        // without the rotation jumping.
        
        // We can just work with the raw angleDeg (Standard atan2 output) and calculate delta.
        // Previous frame angle: P, Current frame angle: C
        // Delta = C - P
        // If Delta > 180, it means we crossed -180/180 boundary CCW -> subtract 360
        // If Delta < -180, it means we crossed boundary CW -> add 360
        
        const currentPointerAngle = angleDeg; // -180 to 180
        
        // We need a way to initialize previousAngleRef on start
        // But handlePanStart doesn't give us the point easily in the same coord system without recalculating.
        // We can just use a flag or check if it's the first event? 
        // Or just rely on small deltas?
        
        // If we strictly rely on `info.delta` we get x/y movement.
        // But we want angular movement.
        
        // Let's rely on a "lastAngle" ref that we update every frame.
        // But we need to know if this is the FIRST frame of the drag to avoid a jump.
        // Actually, onPanStart we can calculate the initial angle.
        
    };

    const handlePanStartLogic = (event: any, info: any) => {
         if (!containerRef.current) return;
         const rect = containerRef.current.getBoundingClientRect();
         const centerX = rect.left + rect.width / 2;
         const centerY = rect.top + rect.height / 2;
         const point = info.point;
         const deltaX = point.x - centerX;
         const deltaY = point.y - centerY;
         const angleRad = Math.atan2(deltaY, deltaX);
         const angleDeg = angleRad * (180 / Math.PI);
         previousAngleRef.current = angleDeg;
         setIsDragging(true);
    };

    const handlePanLogic = (event: any, info: any) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const point = info.point;
        const deltaX = point.x - centerX;
        const deltaY = point.y - centerY;
        const angleRad = Math.atan2(deltaY, deltaX);
        const currentAngle = angleRad * (180 / Math.PI);
        
        let deltaAngle = currentAngle - previousAngleRef.current;
        
        // Handle wrap-around
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;
        
        rotationValue.set(rotationValue.get() + deltaAngle);
        previousAngleRef.current = currentAngle;
    };

    const handlePanEnd = () => {
        setIsDragging(false);
        
        const currentRot = rotationValue.get();
        const snapTo = Math.round(currentRot / 30) * 30;
        
        animate(rotationValue, snapTo, { 
            type: "spring", 
            stiffness: 40, 
            damping: 20, 
            restDelta: 0.001
        });
        
        let normalizedAngle = snapTo % 360;
        if (normalizedAngle < 0) normalizedAngle += 360;
        
        const index = Math.round(normalizedAngle / 30) % 12;
        const numeral = NUMERALS.find(n => Math.round(n.angle / 30) === index);
        
        if (numeral && numeral.id !== undefined) {
            onAspectChange(numeral.id);
        }
    };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center select-none">
      
      {/* The Antique Pocket Watch Artifact - Plain & Aesthetic Redesign */}
      <motion.div 
        className="relative w-[500px] h-[500px] rounded-full shadow-2xl flex items-center justify-center box-border"
        style={{
            background: "#EFEBE9", // Clean paper/stone background
            boxShadow: "0 30px 60px rgba(0,0,0,0.1), inset 0 0 40px rgba(0,0,0,0.05)"
        }}
      >
        {/* Clean Minimal Rim */}
        <div className="absolute inset-0 rounded-full border-[12px] border-[#4A3B32] shadow-xl" />
        <div className="absolute inset-3 rounded-full border border-[#8D6E63]/20" />

        {/* Clock Face */}
        <div className="absolute inset-4 rounded-full bg-[#FAF9F6] overflow-hidden">
             {/* Subtle Paper Texture */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-multiply" />
             
             {/* Inner Rings */}
             <div className="absolute inset-12 border border-[#4A3B32]/5 rounded-full" />
             <div className="absolute inset-[18%] border border-[#4A3B32]/10 rounded-full" />
        </div>

        {/* Roman Numerals - True Radial Layout */}
        {NUMERALS.map((point, i) => {
            const radius = 170; 
            const isActive = point.id === currentAspect;
            return (
                <motion.div 
                    key={i}
                    className="absolute top-1/2 left-1/2 flex items-center justify-center w-12 h-12 cursor-pointer z-[60]"
                    onTap={() => onAspectChange(point.id)}
                    onPan={handlePanLogic}
                    onPanStart={handlePanStartLogic}
                    onPanEnd={handlePanEnd}
                    style={{ 
                        transform: `translate(-50%, -50%) rotate(${point.angle}deg) translate(0, -${radius}px) rotate(-${point.angle}deg)` 
                    }}
                >
                    <span 
                        className={`font-serif text-2xl tracking-widest transition-all duration-300 ${isActive ? 'text-[#C77D63] font-bold scale-110' : 'text-[#4A3B32]/40 scale-100 hover:text-[#4A3B32]/80 hover:scale-105'}`} 
                    >
                        {point.label}
                    </span>
                </motion.div>
            );
        })}

        {/* Secondary Hand (Seconds) - Thin Red Line */}
        <motion.div
            style={{ rotate: secondHandRotation }}
            className="absolute inset-0 z-10 pointer-events-none"
        >
             <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[1px] h-[48%] origin-bottom bg-[#C77D63] opacity-60" />
             <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C77D63] origin-center rounded-full -translate-y-1/2" />
        </motion.div>

        {/* Interactive Hand Container */}
        <motion.div
            style={{ rotate: rotationValue }}
            className="absolute inset-0 z-20 pointer-events-none"
        >
            {/* The Hand Graphic - Minimalist Spear */}
            <div className="absolute inset-0 pointer-events-none">
                 {/* Hour Hand */}
                 <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-3 h-[32%] origin-bottom bg-[#2A201C] shadow-lg rounded-full" 
                      style={{ borderRadius: "2px 2px 0 0" }}>
                      {/* Center Line */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-[90%] bg-[#FAF9F6]/20" />
                 </div>

                 {/* Counterweight */}
                 <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-3 h-[8%] bg-[#2A201C] origin-top rounded-b-sm" />
            </div>
        </motion.div>
            
        {/* Center Cap */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF9F6] shadow-md z-30 border-4 border-[#2A201C] pointer-events-none" />

        {/* Glass Reflection Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none opacity-40 z-40" />

        {/* Invisible Interaction Layer */}
        <motion.div 
            className="absolute inset-0 z-50 rounded-full cursor-grab active:cursor-grabbing"
            onPan={handlePanLogic}
            onPanStart={handlePanStartLogic}
            onPanEnd={handlePanEnd}
            whileTap={{ scale: 0.99 }} 
        />

      </motion.div>
    </div>
  );
}
