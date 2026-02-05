"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface InteractiveHourglassProps {
  onSectionChange: (section: string) => void;
  currentSection: string;
}

const SECTIONS = ["Origin", "Philosophy", "Bio"];

export default function InteractiveHourglass({ onSectionChange, currentSection }: InteractiveHourglassProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Physics State Refs (to access inside requestAnimationFrame without re-binding)
  const rotationRef = useRef(0);
  
  // Sync rotation ref
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Sand Simulation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Simulation Constants
    // Increased resolution for smaller, more natural grains
    const WIDTH = 160; 
    const HEIGHT = 320; 
    
    // Set canvas resolution
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // 1. Generate Collision Mask (The Hourglass Shape)
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = WIDTH;
    maskCanvas.height = HEIGHT;
    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;

    // Fill Black (Walls)
    maskCtx.fillStyle = "#000000";
    maskCtx.fillRect(0, 0, WIDTH, HEIGHT);
    
    // Draw Hourglass Shape in White (Empty Space)
    // Scale the path to match new resolution (originally 100x200, now 160x320 = 1.6x)
    maskCtx.scale(1.6, 1.6);
    maskCtx.fillStyle = "#FFFFFF";
    const path = new Path2D("M 20 10 H 80 Q 80 55 53 98 L 53 102 Q 80 145 80 190 H 20 Q 20 145 47 102 L 47 98 Q 20 55 20 10 Z");
    maskCtx.fill(path);
    maskCtx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

    const imgData = maskCtx.getImageData(0, 0, WIDTH, HEIGHT);
    const pixels = imgData.data;
    const walls = new Uint8Array(WIDTH * HEIGHT); // 1 = Wall, 0 = Empty
    
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] < 128) {
            walls[i / 4] = 1;
        }
    }

    // 2. Initialize Sand Grid
    const grid = new Uint8Array(WIDTH * HEIGHT);
    
    // Fill the Bottom Bulb initially (approx Y=176 to 304 in new scale)
    // 110 * 1.6 = 176, 190 * 1.6 = 304
    for (let y = 180; y < 300; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const idx = y * WIDTH + x;
            if (walls[idx] === 0) {
                 if (Math.random() > 0.1) {
                     grid[idx] = 1;
                 }
            }
        }
    }

    let animationFrameId: number;

    const update = () => {
        const currentRot = rotationRef.current;
        const normalizedRot = Math.round(currentRot / 180);
        const isUpright = normalizedRot % 2 === 0;

        let moved = false;

        // Physics Pass
        if (isUpright) {
            // GRAVITY DOWN (+Y)
            for (let y = HEIGHT - 2; y >= 0; y--) {
                // Randomize scan direction for more organic movement
                const scanLeftToRight = Math.random() > 0.5;
                const startX = scanLeftToRight ? 0 : WIDTH - 1;
                const endX = scanLeftToRight ? WIDTH : -1;
                const stepX = scanLeftToRight ? 1 : -1;

                for (let x = startX; x !== endX; x += stepX) {
                    const idx = y * WIDTH + x;
                    if (grid[idx] === 1) { // Particle found
                        const below = (y + 1) * WIDTH + x;
                        const belowLeft = (y + 1) * WIDTH + (x - 1);
                        const belowRight = (y + 1) * WIDTH + (x + 1);

                        // 1. Fall Straight Down
                        if (walls[below] === 0 && grid[below] === 0) {
                            grid[below] = 1;
                            grid[idx] = 0;
                            moved = true;
                        }
                        // 2. Slide Diagonally (Organic Slip)
                        else {
                            const canLeft = x > 0 && walls[belowLeft] === 0 && grid[belowLeft] === 0;
                            const canRight = x < WIDTH - 1 && walls[belowRight] === 0 && grid[belowRight] === 0;

                            if (canLeft && canRight) {
                                if (Math.random() < 0.5) {
                                    grid[belowLeft] = 1;
                                    grid[idx] = 0;
                                } else {
                                    grid[belowRight] = 1;
                                    grid[idx] = 0;
                                }
                                moved = true;
                            } else if (canLeft) {
                                grid[belowLeft] = 1;
                                grid[idx] = 0;
                                moved = true;
                            } else if (canRight) {
                                grid[belowRight] = 1;
                                grid[idx] = 0;
                                moved = true;
                            }
                        }
                    }
                }
            }
        } else {
            // GRAVITY UP (-Y)
            for (let y = 1; y < HEIGHT; y++) {
                // Randomize scan direction
                const scanLeftToRight = Math.random() > 0.5;
                const startX = scanLeftToRight ? 0 : WIDTH - 1;
                const endX = scanLeftToRight ? WIDTH : -1;
                const stepX = scanLeftToRight ? 1 : -1;

                for (let x = startX; x !== endX; x += stepX) {
                    const idx = y * WIDTH + x;
                    if (grid[idx] === 1) { // Particle found
                        const above = (y - 1) * WIDTH + x;
                        const aboveLeft = (y - 1) * WIDTH + (x - 1);
                        const aboveRight = (y - 1) * WIDTH + (x + 1);

                        // 1. Fall Straight Up
                        if (walls[above] === 0 && grid[above] === 0) {
                            grid[above] = 1;
                            grid[idx] = 0;
                            moved = true;
                        }
                        // 2. Slide Diagonally
                        else {
                            const canLeft = x > 0 && walls[aboveLeft] === 0 && grid[aboveLeft] === 0;
                            const canRight = x < WIDTH - 1 && walls[aboveRight] === 0 && grid[aboveRight] === 0;

                            if (canLeft && canRight) {
                                if (Math.random() < 0.5) {
                                    grid[aboveLeft] = 1;
                                    grid[idx] = 0;
                                } else {
                                    grid[aboveRight] = 1;
                                    grid[idx] = 0;
                                }
                                moved = true;
                            } else if (canLeft) {
                                grid[aboveLeft] = 1;
                                grid[idx] = 0;
                                moved = true;
                            } else if (canRight) {
                                grid[aboveRight] = 1;
                                grid[idx] = 0;
                                moved = true;
                            }
                        }
                    }
                }
            }
        }

        // Draw Pass
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        const output = ctx.createImageData(WIDTH, HEIGHT);
        const data = output.data;

        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === 1) {
                const px = i * 4;
                
                // Enhanced Aesthetic Sand Colors
                // Mix of Gold (#D4AF37) and Terracotta (#C77D63) and Dark Sand (#8D6E63)
                // Use position/index noise for variety
                const noise = (i * 1234567) % 100;
                
                if (noise < 30) {
                    // Gold Accent
                    data[px] = 212; // R
                    data[px + 1] = 175; // G
                    data[px + 2] = 55;  // B
                } else if (noise < 80) {
                    // Warm Terracotta
                    data[px] = 199 + (noise % 10);
                    data[px + 1] = 125 + (noise % 10);
                    data[px + 2] = 99 + (noise % 10);
                } else {
                    // Darker Grain
                    data[px] = 141;
                    data[px + 1] = 110;
                    data[px + 2] = 99;
                }
                data[px + 3] = 255;
            }
        }
        ctx.putImageData(output, 0, 0);

        animationFrameId = requestAnimationFrame(update);
    };

    // Start Loop
    update();

    return () => {
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
    <div className="relative flex flex-col items-center justify-center gap-8 w-full h-[600px]">
      
      {/* Background Dust System (Optional - Keeping purely atmospheric if desired, or removing if distracting) */}
      {/* For now, removing the external dust to focus on the hourglass physics as requested. */}

      {/* The Hourglass Container */}
      <motion.div
        onClick={handleClick}
        animate={{ rotate: rotation }}
        transition={{ duration: 1.2, ease: "easeInOut", type: "spring", stiffness: 40 }}
        className="relative w-56 h-96 cursor-pointer group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 1. Back Pillars (Static Wood) - Positioned behind canvas */}
        <div className="absolute inset-0 z-0">
             <div className="absolute left-[25%] top-[5%] w-[4%] h-[90%] bg-[#2D1B15] opacity-90 rounded-sm" />
             <div className="absolute right-[25%] top-[5%] w-[4%] h-[90%] bg-[#2D1B15] opacity-90 rounded-sm" />
        </div>

        {/* 2. Physics Canvas (Sand) */}
        <canvas 
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-10 pixelated"
            style={{ imageRendering: "pixelated" }}
        />

        {/* 3. SVG Frame & Glass Overlay (Front) */}
        <svg viewBox="0 0 100 200" className="absolute inset-0 w-full h-full z-20 pointer-events-none drop-shadow-2xl overflow-visible">
           <defs>
              <linearGradient id="antiqueBrass" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#2D1B15" />
                 <stop offset="20%" stopColor="#4A3B32" />
                 <stop offset="50%" stopColor="#8D6E63" />
                 <stop offset="80%" stopColor="#4A3B32" />
                 <stop offset="100%" stopColor="#2D1B15" />
              </linearGradient>

              <linearGradient id="goldTrim" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#D4AF37" />
                 <stop offset="50%" stopColor="#F9F7F2" />
                 <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
              
              <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                 <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
                 <stop offset="60%" stopColor="rgba(255,255,255,0.0)" />
                 <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
              </linearGradient>
            </defs>
 
           {/* Glass Bulb (Overlay) - Refined Shape */}
           <path 
             d="M 22 12 H 78 Q 78 50 52 98 L 52 102 Q 78 150 78 188 H 22 Q 22 150 48 102 L 48 98 Q 22 50 22 12 Z" 
             fill="url(#glassShine)" 
             stroke="rgba(255,255,255,0.2)" 
             strokeWidth="1" 
           />
           
           {/* Glass Highlights - More subtle */}
           <path d="M 28 25 Q 28 60 45 90" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
           <path d="M 72 175 Q 72 140 55 110" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />

           {/* Frame (Top, Bottom, Side Pillars) */}
           {/* Top Cap */}
           <rect x="12" y="2" width="76" height="10" rx="2" fill="url(#antiqueBrass)" stroke="#1a100c" strokeWidth="1" />
           <rect x="18" y="12" width="64" height="3" fill="#2D1B15" />
           <rect x="12" y="5" width="76" height="1" fill="url(#goldTrim)" opacity="0.3" />

           {/* Bottom Cap */}
           <rect x="12" y="188" width="76" height="10" rx="2" fill="url(#antiqueBrass)" stroke="#1a100c" strokeWidth="1" />
           <rect x="18" y="185" width="64" height="3" fill="#2D1B15" />
           <rect x="12" y="192" width="76" height="1" fill="url(#goldTrim)" opacity="0.3" />

           {/* Side Pillars (Front) */}
           <rect x="14" y="10" width="4" height="180" fill="url(#antiqueBrass)" stroke="#1a100c" strokeWidth="0.5" />
           <rect x="82" y="10" width="4" height="180" fill="url(#antiqueBrass)" stroke="#1a100c" strokeWidth="0.5" />
           
           {/* Decorative Screws/Bolts - Gold */}
           <circle cx="16" cy="7" r="1.5" fill="url(#goldTrim)" stroke="#2D1B15" strokeWidth="0.5" />
           <circle cx="84" cy="7" r="1.5" fill="url(#goldTrim)" stroke="#2D1B15" strokeWidth="0.5" />
           <circle cx="16" cy="193" r="1.5" fill="url(#goldTrim)" stroke="#2D1B15" strokeWidth="0.5" />
           <circle cx="84" cy="193" r="1.5" fill="url(#goldTrim)" stroke="#2D1B15" strokeWidth="0.5" />

        </svg>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-[#C77D63]/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </motion.div>

      {/* Label / Instruction */}
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-stone font-sans text-xs uppercase tracking-widest"
      >
        Click to Turn Time
      </motion.p>
    </div>
  );
}
