"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Dozed",
    category: "Embedded Systems",
    description: "A sleep-aware system with wearable PPG sensor and Raspberry Pi alarm triggering adaptive light/audio wake sequences. Led market research & cost analysis to evaluate product feasibility.",
    tags: ["Raspberry Pi", "Python", "Sensors", "Market Analysis"],
    link: "#",
    year: "2024",
    color: "bg-[#4A3B32]", // Dark brown/Dusk
  },
  {
    id: "02",
    title: "Titanium Dioxide Research",
    category: "Nanomaterials Research",
    description: "Conducted analysis on structural properties of titanium dioxide nanoparticles and their impact on material strength and performance. Published in Curieux Academic Journal.",
    tags: ["Research", "Nanomaterials", "Data Analysis"],
    link: "#",
    year: "2023",
    color: "bg-[#C77D63]", // Terracotta
  },
  {
    id: "03",
    title: "PortaProfile",
    category: "Product Design",
    description: "Developed a modular smart business card integrating QR and RFID technology for seamless professional networking. 2nd Place, Illinois Product Design Competition.",
    tags: ["Product Design", "RFID", "Cost Analysis"],
    link: "#",
    year: "2024",
    color: "bg-[#EFEBE9]", // Sand/Light
  }
];

const ProjectItem = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-32 items-center ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Project Visual / Parallax Image Area */}
      <div className={`md:col-span-7 relative h-[60vh] overflow-hidden ${isEven ? "md:order-1 rounded-slab" : "md:order-2 rounded-slab-reverse"}`}>
        <motion.div 
          style={{ y }}
          className={`absolute inset-0 ${project.color} w-full h-[120%] -top-[10%]`}
        >
          {/* Abstract geometric shapes or texture could go here */}
          <div className="absolute inset-0 opacity-20 bg-[url('/noise.svg')] mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Dune curve overlay */}
          <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent ${isEven ? "rounded-tl-[50%]" : "rounded-tr-[50%]"}`} />
        </motion.div>
        
        {/* Project Number - Sun Disc Style */}
        <div className="absolute top-6 left-6 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white/90 font-serif text-lg z-10 backdrop-blur-sm">
          {project.id}
        </div>
      </div>

      {/* Project Details */}
      <div className={`md:col-span-5 flex flex-col justify-center ${isEven ? "md:order-2 pl-4" : "md:order-1 pr-4"}`}>
        <div className="flex items-center gap-4 mb-6">
          <span className="h-[1px] w-12 bg-[#C77D63]/60"></span>
          <span className="text-[#C77D63] font-sans uppercase tracking-widest text-xs font-medium">
            {project.category} — {project.year}
          </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-serif text-[#4A3B32] mb-8 leading-[0.9]">
          {project.title}
        </h2>

        <p className="text-[#6B6054] text-lg leading-relaxed mb-8 max-w-md">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-4 py-1.5 border border-[#4A3B32]/30 rounded-full text-xs font-sans text-[#4A3B32] uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link 
          href={project.link}
          data-cursor="View Project"
          className="group inline-flex items-center gap-3 text-[#4A3B32] font-serif italic text-xl hover:text-[#C77D63] transition-colors duration-300"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-20">
      <div className="max-w-[90vw] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32 md:mb-48 pl-4 md:pl-12 border-l border-[#BC6C4A]/30"
        >
          <h1 className="text-7xl md:text-9xl font-serif text-[#4A3B32] leading-[0.8] tracking-tight mb-8">
            Selected<br />Works
          </h1>
          <p className="text-xl md:text-2xl text-[#6B6054] max-w-2xl font-serif italic">
            A curation of digital landscapes and technical explorations.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} />
          ))}
        </div>

        {/* Bottom Navigation / CTA */}
        <div className="mt-20 md:mt-40 border-t border-[#4A3B32]/20 pt-12 flex justify-between items-end">
          <div className="text-[#6B6054] font-sans text-sm uppercase tracking-widest">
            01 — Projects
          </div>
          <Link href="/" className="text-4xl md:text-6xl font-serif text-[#4A3B32]/50 hover:text-[#4A3B32] transition-colors duration-500">
            Back: Home <span className="text-[#BC6C4A]">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
