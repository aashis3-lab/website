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

function EducationContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector I: Education</span>
            <h2 className="text-3xl md:text-4xl text-[#4A3B32] font-serif">University of Illinois at Urbana-Champaign</h2>
            <div className="text-[#6B6054] leading-relaxed">
                <p className="font-bold">Bachelor of Science, Systems Engineering & Design and Computer Science + Economics</p>
                <p className="text-sm italic mb-4">Aug 2025 - May 2029</p>
                <p className="mb-2"><strong>Relevant Coursework:</strong> Business Side of Engineering, Technical Entrepreneurship, Discrete Structures</p>
                <p><strong>Activities:</strong> Off-Road Illini Baja SAE, Hive Society Improv Team, Sky Campus Happiness Volunteer</p>
            </div>
            <div className="border-t border-[#4A3B32]/10 pt-4 mt-4">
                 <h3 className="text-xl text-[#4A3B32] font-serif mb-2">Frisco High School</h3>
                 <p className="text-[#6B6054] text-sm">GPA 4.0 | Aug 2021 - May 2025</p>
                 <p className="text-[#6B6054] text-sm mt-1">Activities: FIRST Robotics Competition (FRC) Radicubs, Model United Nations, Badminton Club</p>
            </div>
        </div>
    );
}

function SkillsContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
             <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector II: Skills</span>
             <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Technical Arsenal</h2>
             <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-4 border border-[#4A3B32]/10 rounded-sm">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-wider">Languages</h3>
                    <p className="text-[#6B6054]">Python, Java, C++, JavaScript, HTML, React, TypeScript, Kotlin</p>
                </div>
                <div className="p-4 border border-[#4A3B32]/10 rounded-sm">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-wider">Frameworks & Tools</h3>
                    <p className="text-[#6B6054]">Certified Microsoft Office Specialist Expert, Fusion, MATLAB, Market & Cost Analysis</p>
                </div>
                <div className="p-4 border border-[#4A3B32]/10 rounded-sm col-span-2">
                    <h3 className="text-[#4A3B32] font-bold mb-2 uppercase tracking-wider">Spoken Languages</h3>
                    <p className="text-[#6B6054]">English, Spanish (basic), Gujarati (fluent), Hindi (basic), French (beginner)</p>
                </div>
             </div>
        </div>
    );
}

function ExperienceAutodesk() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector III: Experience</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Autodesk</h2>
            <p className="text-sm font-sans uppercase tracking-widest text-[#8D6E63]">Autodesk Ambassador | Hybrid | June 2025 - Present</p>
            <ul className="list-disc list-outside ml-5 text-[#6B6054] space-y-2">
                <li>Administered in-class workshops & tabling events locally, presented students with Autodesk resources and swag</li>
                <li>Facilitated coachings & presentations in Fusion, Sketchbook, AutoCAD</li>
            </ul>
        </div>
    );
}

function ExperienceRobotics() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector IV: Experience</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">FIRST Robotics Team 7503</h2>
            <p className="text-sm font-sans uppercase tracking-widest text-[#8D6E63]">Mechanical Team Member and Programmer | Frisco, TX | Jun 2023 - May 2025</p>
             <ul className="list-disc list-outside ml-5 text-[#6B6054] space-y-2">
                <li>Built and assembled competition robots using Fusion, machining tools, and hand fabrication</li>
                <li>Wired electrical boards and programmed robot systems for movement and sensor functions</li>
            </ul>
        </div>
    );
}

function ExperienceInternships() {
    return (
        <div className="flex flex-col justify-center h-full space-y-6">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector V: Experience</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">BSB Design & Abbott</h2>
            
            <div className="mb-4">
                <h3 className="text-xl text-[#4A3B32] font-bold">BSB Design - Job Shadow Intern</h3>
                <p className="text-xs text-[#8D6E63] mb-1">Jul 2024 - Aug 2024</p>
                <p className="text-sm text-[#6B6054]">Observed architects, CAD workflows. Acquired knowledge in design revisions and 2D modeling.</p>
            </div>

            <div>
                <h3 className="text-xl text-[#4A3B32] font-bold">Abbott - Independent Study</h3>
                <p className="text-xs text-[#8D6E63] mb-1">Jan 2024 - May 2024</p>
                <p className="text-sm text-[#6B6054]">Studied thermodynamic systems. Pioneered a digital simulation of a 4-stroke Internal Combustion Engine on Fusion.</p>
            </div>
        </div>
    );
}

function ProjectsLink() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector VI: Projects</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Selected Works</h2>
            <p className="text-[#6B6054] max-w-md text-lg">
                Explore a collection of my technical projects, research, and product designs.
            </p>
            <Link 
                href="/projects" 
                className="flex items-center gap-3 bg-[#4A3B32] text-[#F9F7F2] px-8 py-4 w-fit hover:bg-[#C77D63] transition-colors"
            >
                <span className="text-sm font-sans uppercase tracking-widest">View All Projects</span>
                <ArrowUpRight className="w-5 h-5" />
            </Link>
        </div>
    );
}

function ContactContent() {
    return (
        <div className="flex flex-col justify-center h-full space-y-8">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C77D63]">Sector VII: Contact</span>
            <h2 className="text-4xl md:text-5xl text-[#4A3B32] font-serif">Get in Touch</h2>
            <div className="grid gap-6">
                <a href="mailto:aashis3@illinois.edu" className="flex items-center gap-4 text-xl text-[#6B6054] hover:text-[#C77D63] transition-colors">
                    <Mail className="w-6 h-6" /> aashis3@illinois.edu
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
  { id: 1, label: "I", component: EducationContent },
  { id: 2, label: "II", component: SkillsContent },
  { id: 3, label: "III", component: ExperienceAutodesk },
  { id: 4, label: "IV", component: ExperienceRobotics },
  { id: 5, label: "V", component: ExperienceInternships },
  { id: 6, label: "VI", component: ProjectsLink },
  { id: 7, label: "VII", component: ContactContent },
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
