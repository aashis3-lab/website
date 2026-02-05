"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import InteractiveHourglass from "@/components/InteractiveHourglass";

const SECTIONS = {
  Origin: {
    title: "The Origin",
    subtitle: "From the Desert to Digital",
    content: (
      <>
        <p className="mb-6">
          My journey is rooted in the warmth of hospitality and the resilience of the desert. I believe that software, at its best, should feel human—intuitive, forgiving, and deeply connected to the needs of the people it serves.
        </p>
        <p>
          From early experiments with code to building scalable platforms, my focus has always been on the intersection of technical excellence and emotional design. Just as an oasis sustains life in the void, I build tools that sustain curiosity.
        </p>
      </>
    ),
    hex: "#F2EFE9", // Light (Bone)
    textColor: "text-[#231F1C]",
    accent: "text-[#8C7B75]"
  },
  Philosophy: {
    title: "The Philosophy",
    subtitle: "Principles of Construction",
    content: (
      <ul className="space-y-6">
        {[
          { title: "Clarity over complexity", desc: "Removing the noise to find the signal. Every pixel must earn its place." },
          { title: "Motion with meaning", desc: "Animation that guides and informs, rather than just decorating the screen." },
          { title: "Built for the long term", desc: "Code that endures, scales, and adapts like stone in the wind." }
        ].map((item, i) => (
          <li key={i} className="flex flex-col">
            <span className="text-xl font-serif mb-1 opacity-90">{item.title}</span>
            <span className="font-sans opacity-70">{item.desc}</span>
          </li>
        ))}
      </ul>
    ),
    hex: "#231F1C", // Dark (Obsidian)
    textColor: "text-[#F2EFE9]",
    accent: "text-[#A68A64]"
  },
  Bio: {
    title: "The Bio",
    subtitle: "Founder. Builder. Storyteller.",
    content: (
      <>
        <p className="mb-6">
          I am Aashi Shah, a product creator based in the digital ether. With a background in engineering, economics, & computer science and a passion for human-centered design, I create startups addressing real issues.
        </p>
        <p className="mb-6">
          Currently building immersive web experiences and exploring the future of generative interfaces.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-sans uppercase tracking-widest opacity-80">
            <span>Next.js Expert</span>
            <span>•</span>
            <span>UI/UX Designer</span>
            <span>•</span>
            <span>Technical Writer</span>
        </div>
      </>
    ),
    hex: "#8C7B75", // Medium (Clay)
    textColor: "text-[#F2EFE9]",
    accent: "text-[#231F1C]"
  }
};

export default function About() {
  const [currentSection, setCurrentSection] = useState<keyof typeof SECTIONS>("Origin");
  const data = SECTIONS[currentSection];

  return (
    <motion.div 
      initial={false}
      animate={{ backgroundColor: data.hex, color: data.hex === "#231F1C" ? "#F2EFE9" : (data.hex === "#8C7B75" ? "#F2EFE9" : "#231F1C") }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen relative flex flex-col transition-colors duration-1000 overflow-hidden ${data.textColor}`}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
         <motion.div 
            animate={{ 
                x: currentSection === "Origin" ? 0 : 100,
                scale: currentSection === "Bio" ? 1.5 : 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-sand rounded-full mix-blend-multiply filter blur-3xl opacity-50" 
         />
         <motion.div 
            animate={{ 
                y: currentSection === "Philosophy" ? -50 : 0,
                opacity: currentSection === "Bio" ? 0.2 : 0.5
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terracotta rounded-full mix-blend-multiply filter blur-3xl opacity-50" 
         />
      </div>

      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-20 gap-20">
        
        {/* Left Side: Content */}
        <div className="flex-1 w-full max-w-xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={`block font-sans text-sm uppercase tracking-[0.3em] mb-4 ${data.accent}`}>
                        0{Object.keys(SECTIONS).indexOf(currentSection) + 1} — {data.subtitle}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[0.9]">
                        {data.title}
                    </h1>
                    <div className="text-lg md:text-xl font-serif leading-relaxed opacity-90">
                        {data.content}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Right Side: Hourglass */}
        <div className="flex-1 flex justify-center items-center">
            <InteractiveHourglass 
                currentSection={currentSection} 
                onSectionChange={(s) => setCurrentSection(s as keyof typeof SECTIONS)} 
            />
        </div>
      </div>

      {/* Contact Section at Bottom */}
      <div id="contact" className="w-full py-20 flex flex-col items-center justify-center relative z-10 border-t border-current/10">
        <h2 className="text-4xl md:text-5xl font-serif mb-8 opacity-80">Ready to build?</h2>
        <a 
            href="mailto:hello@example.com"
            className="text-2xl md:text-3xl font-serif italic hover:text-terracotta transition-colors duration-300 flex items-center gap-2"
        >
            Get in touch <ArrowUpRight className="w-6 h-6" />
        </a>
      </div>

      {/* Footer / Socials (Visible on Bio only?) No, keep consistent but change color */}
      <motion.div 
        animate={{ opacity: 1 }}
        className="w-full pb-12 flex justify-center gap-12 relative z-10"
      >
        {[
            { icon: Github, label: "Github", href: "#" },
            { icon: Linkedin, label: "LinkedIn", href: "#" },
            { icon: Twitter, label: "Twitter", href: "#" }
        ].map((social, i) => (
            <Link 
            key={i} 
            href={social.href}
            className="group flex flex-col items-center gap-2"
            >
            <div className="p-4 rounded-full border border-foreground/10 hover:bg-foreground/5 transition-all duration-300">
                <social.icon className="w-6 h-6 transition-colors" />
            </div>
            </Link>
        ))}
      </motion.div>

    </motion.div>
  );
}
