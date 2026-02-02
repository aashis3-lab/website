"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function DesertLandscape() {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for parallax
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax Transforms
  const skyY = useTransform(scrollY, [0, 1000], [0, 50]);
  
  // Parallax for layers - More subtle, "painting" like movement
  const sunY = useTransform(scrollY, [0, 1000], [0, 150]);
  const sunX = useTransform(smoothMouseX, [-0.5, 0.5], [10, -10]);

  const farMountX = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]);
  const farMountY = useTransform(scrollY, [0, 1000], [0, 80]);
  
  const midMesaX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const midMesaY = useTransform(scrollY, [0, 1000], [0, 60]);
  
  const closeDuneX = useTransform(smoothMouseX, [-0.5, 0.5], [60, -60]);
  const closeDuneY = useTransform(scrollY, [0, 1000], [0, 30]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#FAF9F6]">
      {/* Sky Gradient - Pale Dawn */}
      <motion.div 
        style={{ y: skyY }}
        className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#E6E2D8] h-[120%]"
      />

      {/* The Sun / Moon - A perfect geometric circle */}
      <motion.div
        style={{ y: sunY, x: sunX }}
        className="absolute top-[15%] left-[50%] -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#FFFFFF] shadow-[0_0_100px_rgba(198,166,100,0.3)]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#E6E2D8] opacity-80" />
      </motion.div>

      {/* Grain Overlay - Fine art paper texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Layer 1: Distant Mountains (Sharp, Jagged, Atmospheric) */}
      <motion.div
        style={{ x: farMountX, y: farMountY }}
        className="absolute bottom-[20%] left-[-10%] w-[120%] h-[60%] opacity-60"
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d" preserveAspectRatio="none">
           {/* Detailed jagged mountain range - High Fidelity */}
           <path fill="#B8AFA6" d="M0,256L30,240L60,250L90,220L120,245L150,210L180,230L210,190L240,225L270,200L300,240L330,180L360,220L390,170L420,210L450,160L480,200L510,150L540,190L570,140L600,180L630,130L660,170L690,120L720,160L750,110L780,150L810,100L840,145L870,115L900,155L930,125L960,165L990,135L1020,175L1050,145L1080,185L1110,155L1140,195L1170,165L1200,205L1230,175L1260,215L1290,185L1320,225L1350,195L1380,235L1410,205L1440,245V320H0Z"></path>
        </svg>
      </motion.div>

      {/* Layer 2: Mid-Ground Mesas & Ruins (Geometric, Intentional) */}
      <motion.div
        style={{ x: midMesaX, y: midMesaY }}
        className="absolute bottom-[5%] left-[-10%] w-[120%] h-[60%]"
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
           {/* Terracotta Mesa with eroded details */}
           <path fill="#BC6C4A" opacity="0.8" d="M0,320L0,260L60,260L80,240L120,240L140,260L200,260L220,210L350,210L370,260L450,260L480,180L620,180L650,260L720,260L750,220L850,220L880,260L950,260L980,150L1120,150L1150,260L1250,260L1280,200L1380,200L1400,260L1440,260V320Z"></path>
           
           {/* "Ruins" - Ancient Pillars */}
           <rect x="520" y="160" width="12" height="60" fill="#BC6C4A" opacity="0.9" />
           <rect x="540" y="165" width="8" height="40" fill="#BC6C4A" opacity="0.9" />
           <rect x="560" y="170" width="6" height="20" fill="#BC6C4A" opacity="0.9" />
           
           <rect x="1020" y="130" width="15" height="80" fill="#BC6C4A" opacity="0.9" />
           <rect x="1050" y="140" width="10" height="50" fill="#BC6C4A" opacity="0.9" />
        </svg>
      </motion.div>

      {/* Layer 3: Foreground Dunes (Smooth, Clean Lines) */}
      <motion.div
        style={{ x: closeDuneX, y: closeDuneY }}
        className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[60%]"
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
           <defs>
             <linearGradient id="duneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#E6E2D8" />
               <stop offset="100%" stopColor="#D1CBC1" />
             </linearGradient>
           </defs>
           
           {/* Main Dune Body - Sweeping Curve */}
           <path fill="url(#duneGradient)" d="M0,192 C150,192 250,120 450,120 C650,120 750,220 950,220 C1150,220 1250,150 1440,150 V320 H0 Z"></path>
           
           {/* Shadow/Ridge Detail for 3D effect */}
           <path fill="#B8AFA6" opacity="0.2" d="M450,120 C550,120 600,160 650,190 L650,320 L250,320 C350,250 400,120 450,120 Z"></path>
        </svg>
      </motion.div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent pointer-events-none" />
    </div>
  );
}
