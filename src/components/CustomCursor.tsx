"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const cursorRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for different layers to create a "trailing" mirage effect
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const trailConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const lagConfig = { damping: 40, stiffness: 150, mass: 1 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  const lagX = useSpring(mouseX, lagConfig);
  const lagY = useSpring(mouseY, lagConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const link = target.closest('a') || target.closest('button');
      const dataCursor = target.getAttribute('data-cursor') || link?.getAttribute('data-cursor');
      
      if (link || dataCursor) {
        setIsHovered(true);
        setHoverText(dataCursor || "");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Cursor (Sharp) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-exclusion"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div 
            animate={{
                width: isHovered ? 80 : 20,
                height: isHovered ? 80 : 20,
                backgroundColor: isHovered ? "#FFFFFF" : "#8C5E58",
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full flex items-center justify-center backdrop-blur-sm"
        >
             <AnimatePresence>
                {isHovered && hoverText && (
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-[10px] font-sans uppercase tracking-widest text-black font-bold text-center px-2"
                    >
                        {hoverText}
                    </motion.span>
                )}
             </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Trailing "Mirage" Layer 1 */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[99] hidden md:block opacity-40 mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#6B6054" // Dusk
        }}
        animate={{
            scale: isHovered ? 1.5 : 1,
        }}
      />

      {/* Trailing "Mirage" Layer 2 (More lag) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[98] hidden md:block opacity-30 mix-blend-difference blur-[2px]"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#E0DCD3" // Sand
        }}
        animate={{
            scale: isHovered ? 2 : 1,
        }}
      />
    </>
  );
}
