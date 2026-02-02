"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import profileImg from "./Aashi8.jpeg";
import { ArrowUpRight, ArrowDown, Mail, Github, Twitter, Download, Camera, Code, Layers } from "lucide-react";
import BuriedArtifact from "@/components/BuriedArtifact";

// --- Content Components ---

function IntroSummary() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">hey! my name is</span>
            <h1 className="text-6xl md:text-8xl text-[#4A3B32] leading-none tracking-tight">
                <br/> <span className="italic text-[#8D6E63] font-serif">Aashi</span>
            </h1>
            <div className="text-xl text-[#6B6054] leading-relaxed border-l-2 border-[#C77D63] pl-6 max-w-lg">
                <p>
                    "To build in the emptiness is to build with intent."
                </p>
                <p className="mt-4 text-sm text-[#4A3B32]/60 font-sans uppercase tracking-widest">
                    Rotate the dial to navigate the archive.
                </p>
            </div>
        </div>
    );
}

function PhilosophyContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector I: Philosophy</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">The Code as Sand</h2>
            <div className="prose prose-stone text-[#6B6054] leading-relaxed">
                <p>
                    Software is transient. Like dunes shifting in the wind, codebases evolve, erode, and reform. 
                    My approach embraces this entropy. I build systems that are modular, resilient, and designed to degrade gracefully.
                </p>
                <p className="mt-4">
                    Complexity is the enemy of longevity. I strive for the "Minimum Viable Elegance"—the point where function and form meet without excess.
                </p>
            </div>
        </div>
    );
}

function TechStackContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
             <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector II: Toolkit</span>
             <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Architectural Layers</h2>
             <div className="grid grid-cols-2 gap-6">
                {[
                    { icon: Layers, label: "Next.js 15", desc: "Server Actions, RSC" },
                    { icon: Code, label: "TypeScript", desc: "Strict Typing" },
                    { icon: Camera, label: "Framer Motion", desc: "Physics Animation" },
                    { icon: Layers, label: "Tailwind CSS", desc: "Utility First" },
                    { icon: Code, label: "Supabase", desc: "Postgres Database" },
                    { icon: Layers, label: "WebGL", desc: "Three.js / R3F" }
                ].map((item, i) => (
                    <div key={i} className="p-4 border border-[#4A3B32]/10 rounded-sm hover:border-[#C77D63] transition-colors group">
                        <item.icon className="w-6 h-6 text-[#8D6E63] mb-2 group-hover:text-[#C77D63]" />
                        <h3 className="text-[#4A3B32] font-serif text-lg">{item.label}</h3>
                        <p className="text-xs text-[#8D6E63] uppercase tracking-wider">{item.desc}</p>
                    </div>
                ))}
             </div>
        </div>
    );
}

function ProjectVenture() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector III: Project 01</span>
            <h2 className="text-5xl md:text-7xl text-[#4A3B32] font-serif italic">Venture ONE</h2>
            <p className="text-lg text-[#6B6054] max-w-md">
                A high-frequency trading dashboard designed for institutional clarity. Reducing cognitive load in high-stress environments.
            </p>
            <ul className="flex gap-4 text-xs font-sans uppercase tracking-widest text-[#8D6E63]">
                <li>Fintech</li>
                <li>•</li>
                <li>Realtime</li>
                <li>•</li>
                <li>Dashboard</li>
            </ul>
            <div className="pt-4">
                <Link href="/projects" className="inline-flex items-center gap-2 text-[#4A3B32] border-b border-[#4A3B32] pb-1 hover:text-[#C77D63] hover:border-[#C77D63] transition-colors">
                    View Case Study <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

function ProjectMarket() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector IV: Project 02</span>
            <h2 className="text-5xl md:text-7xl text-[#4A3B32] font-serif italic">MarketPulse</h2>
            <p className="text-lg text-[#6B6054] max-w-md">
                AI-driven sentiment analysis for emerging markets. Visualizing the invisible currents of social discourse.
            </p>
             <ul className="flex gap-4 text-xs font-sans uppercase tracking-widest text-[#8D6E63]">
                <li>AI / LLM</li>
                <li>•</li>
                <li>Python</li>
                <li>•</li>
                <li>Analytics</li>
            </ul>
            <div className="pt-4">
                <Link href="/projects" className="inline-flex items-center gap-2 text-[#4A3B32] border-b border-[#4A3B32] pb-1 hover:text-[#C77D63] hover:border-[#C77D63] transition-colors">
                    View Case Study <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

function ProjectOasis() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector V: Project 03</span>
            <h2 className="text-5xl md:text-7xl text-[#4A3B32] font-serif italic">Oasis UI</h2>
            <p className="text-lg text-[#6B6054] max-w-md">
                A React component library inspired by brutalist architecture and organic textures. 
            </p>
             <ul className="flex gap-4 text-xs font-sans uppercase tracking-widest text-[#8D6E63]">
                <li>Open Source</li>
                <li>•</li>
                <li>Design System</li>
                <li>•</li>
                <li>NPM</li>
            </ul>
            <div className="pt-4">
                <Link href="/projects" className="inline-flex items-center gap-2 text-[#4A3B32] border-b border-[#4A3B32] pb-1 hover:text-[#C77D63] hover:border-[#C77D63] transition-colors">
                    View Documentation <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

function JournalLatest() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector VI: Latest Entry</span>
            <div className="space-y-4">
                <span className="text-sm font-sans text-[#8D6E63]">October 12, 2024</span>
                <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif leading-tight hover:text-[#C77D63] transition-colors cursor-pointer">
                    Entropy & UI Design
                </h2>
                <p className="text-lg text-[#6B6054] max-w-md">
                    Why chaos is an essential ingredient in digital interfaces. Embracing the unpredictable nature of user interaction.
                </p>
            </div>
            <Link href="/blog" className="text-[#4A3B32] font-serif italic hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Read Article <ArrowUpRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

function JournalArchive() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
             <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector VII: Archive</span>
             <ul className="space-y-6">
                {[
                    "The Silence of Code",
                    "Building for the Long Term",
                    "Digital Minimalism",
                    "React Server Components"
                ].map((title, i) => (
                    <li key={i} className="group flex items-baseline justify-between border-b border-[#4A3B32]/10 pb-2 hover:border-[#C77D63] transition-colors cursor-pointer">
                        <span className="text-2xl font-serif text-[#4A3B32] group-hover:text-[#C77D63] transition-colors">{title}</span>
                        <span className="text-xs font-sans text-[#8D6E63]">2024</span>
                    </li>
                ))}
             </ul>
             <Link href="/blog" className="self-start text-xs font-sans uppercase tracking-widest border border-[#4A3B32] px-6 py-3 hover:bg-[#4A3B32] hover:text-[#F9F7F2] transition-colors">
                View All Entries
             </Link>
        </div>
    );
}

function PhotographyContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector VIII: Visuals</span>
            <div className="aspect-video w-full bg-[#EFEBE9] rounded-sm relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[#4A3B32]/10 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-[#8D6E63] opacity-50" />
                 </div>
                 {/* Placeholder for actual image */}
                 <div className="absolute bottom-4 left-4">
                    <p className="text-[#4A3B32] font-serif italic">Desert Light, 2023</p>
                 </div>
            </div>
            <p className="text-[#6B6054]">
                Capturing the textures of the physical world to inform the digital one.
            </p>
        </div>
    );
}

function BioContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector IX: About</span>
            <h2 className="text-5xl md:text-6xl text-[#4A3B32] font-serif leading-none">
                I am <span className="italic text-[#C77D63]">Aashi Shah</span>.
            </h2>
            <div className="text-lg text-[#6B6054] leading-relaxed max-w-md space-y-4">
                <p>
                    Digital Craftsman. Founder. Builder.
                </p>
                <p>
                    Based in the ether, I help startups find their voice and their architecture. My work is a study in contrast: rigid logic meets organic design.
                </p>
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 text-[#4A3B32] border-b border-[#4A3B32] pb-1 w-fit hover:text-[#C77D63] hover:border-[#C77D63] transition-colors">
                Read Full Bio <ArrowUpRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

function ContactContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector X: Signal</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Open Frequencies</h2>
            <div className="grid gap-6">
                <a href="mailto:hello@example.com" className="flex items-center gap-4 text-xl text-[#6B6054] hover:text-[#C77D63] transition-colors">
                    <Mail className="w-6 h-6" /> hello@example.com
                </a>
                <a href="#" className="flex items-center gap-4 text-xl text-[#6B6054] hover:text-[#C77D63] transition-colors">
                    <Twitter className="w-6 h-6" /> @aashi_builds
                </a>
                <a href="#" className="flex items-center gap-4 text-xl text-[#6B6054] hover:text-[#C77D63] transition-colors">
                    <Github className="w-6 h-6" /> github.com/aashi
                </a>
            </div>
        </div>
    );
}

function ResumeContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
             <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector XI: Data</span>
             <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Curriculum Vitae</h2>
             <p className="text-[#6B6054] max-w-md">
                A chronological record of builds, failures, and lessons learned.
             </p>
             <button className="flex items-center gap-3 bg-[#4A3B32] text-[#F9F7F2] px-8 py-4 w-fit hover:bg-[#C77D63] transition-colors">
                <Download className="w-5 h-5" />
                <span className="text-sm font-sans uppercase tracking-widest">Download PDF</span>
             </button>
        </div>
    );
}

const ASPECTS = [
  { id: 0, label: "XII", component: IntroSummary },
  { id: 1, label: "I", component: PhilosophyContent },
  { id: 2, label: "II", component: TechStackContent },
  { id: 3, label: "III", component: ProjectVenture },
  { id: 4, label: "IV", component: ProjectMarket },
  { id: 5, label: "V", component: ProjectOasis },
  { id: 6, label: "VI", component: JournalLatest },
  { id: 7, label: "VII", component: JournalArchive },
  { id: 8, label: "VIII", component: PhotographyContent },
  { id: 9, label: "IX", component: BioContent },
  { id: 10, label: "X", component: ContactContent },
  { id: 11, label: "XI", component: ResumeContent },
];

export default function Home() {
  const [currentAspect, setCurrentAspect] = useState(0);

  return (
    <div className="min-h-screen w-full bg-[#EFEBE9] font-serif text-[#4A3B32] selection:bg-[#C77D63] selection:text-[#F9F7F2]">
      
      {/* SECTION 1: HERO / TITLE (Full Screen) */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative bg-[#EFEBE9] border-b border-[#4A3B32]/10 p-8 md:p-12 overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 max-w-[90rem] z-10 w-full">
              
              {/* Text Group (Left on Desktop) */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:space-y-8 order-2 md:order-1">
                  <div className="space-y-2 md:space-y-4">
                      <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-serif text-[#4A3B32] leading-[0.85] tracking-tighter">
                          Aashi <br className="hidden md:block" />
                          <span className="italic text-[#8D6E63]">Shah</span>
                      </h1>
                      <p className="text-xl md:text-3xl font-sans uppercase tracking-[0.4em] text-[#8D6E63] mt-4 ml-2">
                          Digital Craftsman
                      </p>
                  </div>

                  <p className="text-xl md:text-2xl text-[#6B6054] max-w-xl leading-relaxed font-light italic ml-2">
                      "Building systems that endure the digital void."
                  </p>
              </div>

              {/* Image Group (Right on Desktop) */}
              <div className="order-1 md:order-2 flex-shrink-0">
                  <div className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[#D7CCC8] border-4 border-[#C77D63] overflow-hidden shadow-2xl relative group">
                      <Image 
                        src={profileImg} 
                        alt="Aashi Shah" 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        priority
                      />
                      <div className="absolute inset-0 bg-[#C77D63]/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500" />
                  </div>
              </div>

          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 animate-bounce flex flex-col items-center gap-2 text-[#C77D63] opacity-60">
              <span className="text-xs font-sans uppercase tracking-widest">Enter the Archive</span>
              <ArrowDown className="w-6 h-6" />
          </div>
      </section>

      {/* SECTION 2: THE ARTIFACT DASHBOARD (Full Screen Sticky/Relative) */}
      <section className="h-screen w-full flex flex-col md:flex-row overflow-hidden relative z-20 bg-[#EFEBE9]">
      
      {/* LEFT COLUMN: The Artifact */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center relative border-b md:border-b-0 md:border-r border-[#4A3B32]/10 p-8 md:p-0 bg-[#EFEBE9]">
         {/* Background Detail */}
         <div className="absolute top-8 left-8 text-xs font-sans uppercase tracking-widest text-[#4A3B32]/30">
             Ref: 12-POS-DIAL
         </div>

         <div className="transform scale-75 md:scale-100">
             <BuriedArtifact 
                currentAspect={currentAspect} 
                onAspectChange={setCurrentAspect} 
             />
         </div>

         <div className="absolute bottom-8 text-center w-full">
            <p className="text-xs font-sans uppercase tracking-widest text-[#4A3B32]/40">
                Current Position: {ASPECTS[currentAspect].label}
            </p>
         </div>
      </div>

      {/* RIGHT COLUMN: The Content */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#FAF9F6] relative overflow-hidden flex items-center p-8 md:p-24">
         <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
               <motion.div
                 key={currentAspect}
                 initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                 animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                 exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                 transition={{ duration: 0.5, ease: "circOut" }}
                 className="w-full"
               >
                 {ASPECTS[currentAspect].component()}
               </motion.div>
            </AnimatePresence>
         </div>
         
         {/* Decorative Lines */}
         <div className="absolute top-0 right-0 w-px h-full bg-[#4A3B32]/5" />
         <div className="absolute top-0 right-12 w-px h-full bg-[#4A3B32]/5" />
      </div>

      </section> {/* End of MAIN CONTENT */}

    </div>
  );
}
