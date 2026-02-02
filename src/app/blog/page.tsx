"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Matter from "matter-js";
import { ArrowUpRight, X } from "lucide-react";

// Blog Data
const blogPosts = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    title: [
        "The Digital Mirage", "Oasis of Code", "Shifting Sands", "Timeless Design", "Entropy & UI", 
        "React Physics", "Next.js Dunes", "Canvas Secrets", "The User's Journey", "Architecting Void",
        "Silence in UX", "Typography Heat", "Golden Ratio", "Desert Algorithms", "Mirage State",
        "Infinite Scroll", "Pixel Dust", "Vector Valleys", "CSS Miracles", "State Management",
        "The Art of Wait", "Loading States", "Skeleton Screens", "Async Await", "Promise.all()",
        "Virtual DOM", "Reconciliation", "Fiber Architecture", "Concurrent Mode", "Server Components",
        "Edge Functions", "Middleware Magic", "Tailwind Winds", "Framer Motion", "Spring Physics",
        "Gestalt Principles", "Fitts's Law", "Hick's Law", "Occam's Razor", "Mental Models",
        "Cognitive Load", "Dark Patterns", "Ethical Design", "Accessibility", "WCAG 2.1",
        "Contrast Ratios", "Screen Readers", "Semantic HTML", "ARIA Labels", "Focus States"
    ][i] || `Desert Thought #${i + 1}`,
    excerpt: "Exploring the boundaries of digital landscapes and human interaction.",
    date: "2024",
    category: "Tech",
    size: Math.floor(Math.random() * 20) + 25, // Random size between 25-45
    color: ["#8C5E58", "#6B6054", "#E0DCD3", "#9C9488"][Math.floor(Math.random() * 4)], // Random palette color
    slug: "#"
}));

export default function Blog() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<any>(null);
  
  // Refs for DOM elements to sync with physics bodies
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [expandedPost, setExpandedPost] = useState<typeof blogPosts[0] | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !sceneRef.current) return;

    // Module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Events = Matter.Events,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    
    // Slow down time for "slow fall" effect
    engine.timing.timeScale = 0.8;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create renderer (optional, mainly for debugging bounds, but we'll use it to keep the world dimensioned)
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false, // Set to true to see physics bodies
        showAngleIndicator: false
      }
    });
    renderRef.current = render;

    // --- Hourglass Shape (Static Bodies) ---
    // We need to build a funnel shape using static bodies
    const wallOptions = { 
        isStatic: true, 
        render: { fillStyle: 'transparent' }, // Invisible, we'll draw the glass with SVG/CSS
        friction: 0.5
    };

    const centerX = width / 2;
    const centerY = height / 2;
    // const gap = 40; // Old Neck width
    
    // Top Funnel Walls (Wider)
    const leftTopWall = Bodies.rectangle(centerX - 220, centerY - 150, 340, 20, { 
        ...wallOptions, 
        angle: Math.PI / 3 
    });
    const rightTopWall = Bodies.rectangle(centerX + 220, centerY - 150, 340, 20, { 
        ...wallOptions, 
        angle: -Math.PI / 3 
    });

    // Bottom Funnel Walls (Catchment - Wider)
    const leftBottomWall = Bodies.rectangle(centerX - 180, centerY + 200, 340, 20, { 
        ...wallOptions, 
        angle: -Math.PI / 4 
    });
    const rightBottomWall = Bodies.rectangle(centerX + 180, centerY + 200, 340, 20, { 
        ...wallOptions, 
        angle: Math.PI / 4 
    });
    
    // Floor
    const floor = Bodies.rectangle(centerX, height - 20, 600, 40, wallOptions);
    
    // Side Constraints (invisible walls to keep balls in view if they bounce high)
    const leftWall = Bodies.rectangle(0, height/2, 20, height, wallOptions);
    const rightWall = Bodies.rectangle(width, height/2, 20, height, wallOptions);

    Composite.add(engine.world, [
        leftTopWall, rightTopWall, 
        leftBottomWall, rightBottomWall, 
        floor,
        leftWall, rightWall
    ]);

    // --- Blog Post Bodies (Balls) ---
    const balls = blogPosts.map((post, i) => {
        // Randomize start position slightly
        const x = centerX + (Math.random() * 40 - 20);
        const y = 50 - (i * 80); // Stack them high up initially
        
        return Bodies.circle(x, y, post.size, {
            restitution: 0.1, // Low bounce, like sand
            friction: 0.5, // Sand friction
            frictionAir: 0.02, // Slow fall
            density: 0.04,
            label: `post-${i}`
        });
    });

    Composite.add(engine.world, balls);

    // --- Mouse Control ---
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 1, // Much stiffer interaction
            render: { visible: false }
        }
    });
    Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // --- Animation Loop ---
    // Instead of using Matter.Render.run, we'll use our own loop to sync DOM
    // But we need the runner to update the physics
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    // Render.run(render); // Uncomment to debug physics bodies

    // Sync Loop
    const updateLoop = () => {
        balls.forEach((ball, i) => {
            const domNode = itemsRef.current[i];
            if (domNode) {
                const { x, y } = ball.position;
                const angle = ball.angle;
                const size = blogPosts[i].size;
                domNode.style.transform = `translate(${x - size}px, ${y - size}px) rotate(${angle}rad)`;
            }
        });
        requestAnimationFrame(updateLoop);
    };
    const animationId = requestAnimationFrame(updateLoop);

    return () => {
        cancelAnimationFrame(animationId);
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas) render.canvas.remove();
        Composite.clear(engine.world, false);
        Engine.clear(engine);
    };
  }, [isClient]);

  // Handle Resize? Ideally we'd re-init, but for now let's assume desktop fixed or simple responsive
  
  return (
    <div className="min-h-screen bg-cream overflow-hidden relative">
      
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-10 pointer-events-none">
        <h1 className="text-6xl md:text-9xl font-serif text-night/10 select-none">
            Journal
        </h1>
      </div>

      {/* Physics Container */}
      <div 
        ref={sceneRef} 
        className="absolute inset-0 w-full h-full max-w-2xl mx-auto"
      >
        {/* SVG Hourglass Overlay (Visual Only) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
             {/* Gradient Definition */}
             <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </linearGradient>
             </defs>
             
             {/* Left Glass Wall */}
             <path 
                d="M 15% 10% Q 40% 45% 40% 50% Q 40% 55% 15% 90%"
                fill="none"
                stroke="rgba(140, 94, 88, 0.2)" // Terracotta low opacity
                strokeWidth="2"
                className="drop-shadow-lg"
             />
             
             {/* Right Glass Wall */}
             <path 
                d="M 85% 10% Q 60% 45% 60% 50% Q 60% 55% 85% 90%"
                fill="none"
                stroke="rgba(140, 94, 88, 0.2)"
                strokeWidth="2"
                className="drop-shadow-lg"
             />

             {/* Glass Reflection/Sheen */}
             <path 
                d="M 17% 12% Q 41% 46% 41% 50% Q 41% 54% 17% 88%"
                fill="none"
                stroke="url(#glassGradient)"
                strokeWidth="20"
                style={{ filter: 'blur(10px)' }}
             />
             <path 
                d="M 83% 12% Q 59% 46% 59% 50% Q 59% 54% 83% 88%"
                fill="none"
                stroke="url(#glassGradient)"
                strokeWidth="20"
                style={{ filter: 'blur(10px)' }}
             />
        </svg>

        {/* The Blog "Balls" */}
        {isClient && blogPosts.map((post, i) => (
            <div
                key={post.id}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="absolute top-0 left-0 rounded-full cursor-pointer flex items-center justify-center text-center p-2 shadow-lg hover:brightness-110 active:scale-95 transition-filter"
                style={{
                    width: post.size * 2,
                    height: post.size * 2,
                    backgroundColor: post.color,
                    willChange: 'transform'
                }}
                onClick={() => setExpandedPost(post)}
            >
                <div className="text-cream font-serif leading-tight pointer-events-none select-none overflow-hidden text-ellipsis max-h-full flex items-center justify-center">
                    {post.size > 45 && (
                        <span className="text-[10px] uppercase tracking-widest opacity-80">
                            {post.category}
                        </span>
                    )}
                </div>
            </div>
        ))}
      </div>

      {/* Instruction */}
      <div className="absolute bottom-12 w-full text-center text-stone/50 font-sans text-xs uppercase tracking-[0.2em] pointer-events-none animate-pulse">
        Drag to play • Click to read
      </div>

      {/* Expanded Post Overlay */}
      <AnimatePresence>
        {expandedPost && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-cream/80 backdrop-blur-sm p-4 md:p-12"
                onClick={() => setExpandedPost(null)}
            >
                <motion.div 
                    layoutId={`post-${expandedPost.id}`}
                    className="bg-cream border border-terracotta/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                >
                    <button 
                        onClick={() => setExpandedPost(null)}
                        className="absolute top-6 right-6 text-stone hover:text-terracotta transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="p-8 md:p-16">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: expandedPost.color }} />
                            <span className="text-sm font-sans uppercase tracking-widest text-[#6B6054]">
                                {expandedPost.category} — {expandedPost.date}
                            </span>
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-serif text-[#4A3B32] mb-8 leading-tight">
                            {expandedPost.title}
                        </h2>
                        
                        <p className="text-xl text-[#6B6054] font-serif leading-relaxed mb-12">
                            {expandedPost.excerpt}
                        </p>

                        <div className="h-px w-full bg-[#4A3B32]/10 mb-12" />

                        <div className="prose prose-stone prose-lg text-[#6B6054]">
                            <p>
                                [Full article content would be loaded here. Since this is a demo, we are showing the concept of the expanding sand-grain.]
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                        
                        <div className="mt-12 pt-8 border-t border-[#4A3B32]/10">
                            <a href={expandedPost.slug} className="inline-flex items-center gap-2 text-[#BC6C4A] font-sans uppercase tracking-widest text-sm hover:gap-4 transition-all">
                                Read Full Article <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
