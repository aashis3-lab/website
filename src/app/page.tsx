"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Mail, Github, Twitter, Download, Camera, Code, Layers } from "lucide-react";
import BuriedArtifact from "@/components/BuriedArtifact";
import ReactiveSand from "@/components/ReactiveSand";

// --- Content Components ---

function IntroSummary() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Systems Engineering & Design + CS & Economics</span>
            <h1 className="text-6xl md:text-8xl text-[#4A3B32] leading-none tracking-tight">
                <br/> <span className="italic text-[#8D6E63] font-serif">Aashi Shah</span>
            </h1>
            <div className="text-xl text-[#6B6054] leading-relaxed border-l-2 border-[#C77D63] pl-6 max-w-lg">
                <p>
                    University of Illinois at Urbana-Champaign '29
                </p>
                <p className="mt-4 text-sm text-[#4A3B32]/60 font-sans uppercase tracking-widest">
                    Rotate the dial to explore my work.
                </p>
            </div>
        </div>
    );
}

function RoleFocus() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector I: Role / Focus</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Systems Engineering & Design, Computer Science + Economics @ UIUC</h2>
            <p className="text-[#6B6054] text-xl leading-relaxed border-l-2 border-[#C77D63] pl-6">
                Building human-centered tech at the intersection of engineering, design, and business.
            </p>
        </div>
    );
}

function MissionStatement() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector II: Mission Statement</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Impact Through Design</h2>
            <p className="text-[#6B6054] text-xl leading-relaxed">
                Design technology that actually helps people — blending engineering rigor, thoughtful design, and real-world impact to build solutions that are practical, scalable, and human-first.
            </p>
        </div>
    );
}

function EducationContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector III: Education</span>
            <h2 className="text-3xl md:text-4xl text-[#4A3B32] font-serif">University of Illinois Urbana-Champaign</h2>
            <div className="text-[#6B6054] leading-relaxed">
                <p className="font-bold">B.S. Systems Engineering & Design + Computer Science & Economics</p>
                <p className="mb-4 mt-4"><strong>Relevant Coursework:</strong> Technological Entrepreneurship • Discrete Structures • Business Side of Engineering</p>
                <p><strong>Activities:</strong> Baja SAE • Hive Society Improv • SKY Campus Happiness</p>
            </div>
        </div>
    );
}

function SkillsContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
             <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector IV: Skills</span>
             <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Technical Arsenal</h2>
             <div className="grid grid-cols-1 gap-6 text-sm">
                <div className="p-4 border border-[#4A3B32]/10 rounded-sm">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-wider">Languages</h3>
                    <p className="text-[#6B6054]">Python, Java, C++, React, TypeScript, HTML</p>
                </div>
                <div className="p-4 border border-[#4A3B32]/10 rounded-sm">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-wider">Tools</h3>
                    <p className="text-[#6B6054]">Fusion 360, CAD, Prototyping, Market & Cost Analysis, React Native</p>
                </div>
                <div className="p-4 border border-[#4A3B32]/10 rounded-sm">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-wider">Business Models</h3>
                    <p className="text-[#6B6054]">Certified Microsoft Office Specialist Expert (Excel, PowerPoint), product strategy, presentations</p>
                </div>
                <div className="p-4 border border-[#4A3B32]/10 rounded-sm">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-wider">Spoken Languages</h3>
                    <p className="text-[#6B6054]">Gujarati (fluent), English, Spanish (basic)</p>
                </div>
             </div>
        </div>
    );
}

function ExperienceHighlights() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector V: Experience Highlights</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Key Roles</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl text-[#4A3B32] font-bold">Autodesk Ambassador</h3>
                    <p className="text-[#6B6054] text-sm">Led workshops teaching Fusion & AutoCAD</p>
                </div>
                <ul className="list-disc list-outside ml-5 text-[#6B6054] space-y-2">
                    <li>Built + programmed competition robots (FRC)</li>
                    <li>Engine simulation research with Abbott mentorship</li>
                    <li>Hands-on operations & customer leadership roles</li>
                </ul>
                <div className="pt-4">
                    <Link 
                        href="/projects" 
                        className="inline-flex items-center gap-2 text-[#C77D63] hover:text-[#4A3B32] transition-colors font-serif italic"
                    >
                        <span>View Detailed Projects</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function GoalsContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector VI: Goals</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Aspirations</h2>
            <div className="space-y-6">
                <div className="p-6 border-l-2 border-[#C77D63] bg-[#4A3B32]/5">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-widest text-xs">Short Term</h3>
                    <p className="text-[#6B6054] text-lg">Ship impactful projects, gain industry experience, deepen technical mastery</p>
                </div>
                <div className="p-6 border-l-2 border-[#4A3B32] bg-[#C77D63]/10">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-widest text-xs">Long Term</h3>
                    <p className="text-[#6B6054] text-lg">Build products or startups that merge engineering, design, & accessibility</p>
                </div>
            </div>
        </div>
    );
}

function InterestsContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector VII: Interests</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Passions</h2>
            <div className="flex flex-wrap gap-3">
                {["Robotics", "Product design", "Startups", "Human-centered tech", "Wellness & mindfulness"].map((interest) => (
                    <span key={interest} className="px-4 py-2 border border-[#4A3B32]/20 rounded-full text-[#6B6054] hover:bg-[#4A3B32] hover:text-[#F9F7F2] transition-colors cursor-default">
                        {interest}
                    </span>
                ))}
            </div>
        </div>
    );
}

function ValuesContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector VIII: Values</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Core Principles</h2>
            <div className="grid grid-cols-1 gap-4">
                {["Curiosity", "Empathy", "Execution", "Creativity", "Impact"].map((value, i) => (
                    <div key={value} className="flex items-center gap-4">
                        <span className="text-[#C77D63] font-serif italic text-xl">0{i+1}</span>
                        <span className="text-2xl md:text-3xl text-[#4A3B32]">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CurrentlyContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector IX: Currently</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">In Progress</h2>
            <div className="space-y-4 text-xl text-[#6B6054]">
                <p className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C77D63]"></span> Learning embedded systems
                </p>
                <p className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C77D63]"></span> Designing hardware + software prototypes
                </p>
                <p className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C77D63]"></span> Exploring tech-for-wellbeing ideas
                </p>
            </div>
        </div>
    );
}

function MottoContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector X: Motto</span>
            <blockquote className="text-4xl md:text-6xl text-[#4A3B32] font-serif italic leading-tight">
                "Your soul knows when it's on to something."
            </blockquote>
        </div>
    );
}

function ContactContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector XI: Contact</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Get in Touch</h2>
            <div className="grid gap-6">
                <a href="mailto:aashi.shah.102@gmail.com" className="flex items-center gap-4 text-xl text-[#6B6054] hover:text-[#C77D63] transition-colors">
                    <Mail className="w-6 h-6" /> aashi.shah.102@gmail.com
                </a>
                <a href="tel:650-740-0357" className="flex items-center gap-4 text-xl text-[#6B6054] hover:text-[#C77D63] transition-colors">
                    <span className="w-6 h-6 flex items-center justify-center font-bold">#</span> 650-740-0357
                </a>
                <a href="https://linkedin.com/in/aashi-shah3" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-xl text-[#6B6054] hover:text-[#C77D63] transition-colors">
                    <Github className="w-6 h-6" /> linkedin.com/in/aashi-shah3
                </a>
            </div>
        </div>
    );
}



const ASPECTS = [
  { id: 0, label: "XII", component: IntroSummary },
  { id: 1, label: "I", component: RoleFocus },
  { id: 2, label: "II", component: MissionStatement },
  { id: 3, label: "III", component: EducationContent },
  { id: 4, label: "IV", component: SkillsContent },
  { id: 5, label: "V", component: ExperienceHighlights },
  { id: 6, label: "VI", component: GoalsContent },
  { id: 7, label: "VII", component: InterestsContent },
  { id: 8, label: "VIII", component: ValuesContent },
  { id: 9, label: "IX", component: CurrentlyContent },
  { id: 10, label: "X", component: MottoContent },
  { id: 11, label: "XI", component: ContactContent },
];

export default function Home() {
  const [currentAspect, setCurrentAspect] = useState(0);

  return (
    <div className="min-h-screen w-full bg-[#EFEBE9] font-serif text-[#4A3B32] selection:bg-[#C77D63] selection:text-[#F9F7F2]">
      
      {/* SECTION: THE ARTIFACT DASHBOARD (Full Screen) */}
      <section className="h-screen w-full flex flex-col md:flex-row overflow-hidden relative z-20 bg-[#EFEBE9]">
      
      {/* LEFT COLUMN: The Artifact */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center relative border-b md:border-b-0 md:border-r border-[#4A3B32]/10 p-8 md:p-0 bg-[#EFEBE9]">
         {/* Background Detail */}
         <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
             <ReactiveSand />
         </div>
         <div className="absolute top-8 left-8 text-xs font-sans uppercase tracking-widest text-[#4A3B32]/30 z-10">
             Ref: 12-POS-DIAL
         </div>

         <div className="transform scale-75 md:scale-100 z-10">
             <BuriedArtifact 
                currentAspect={currentAspect} 
                onAspectChange={setCurrentAspect} 
             />
         </div>

         <div className="absolute bottom-8 text-center w-full z-10">
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
