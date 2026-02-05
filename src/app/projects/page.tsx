"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Dozed — Smart Sleep App & Adaptive Alarm Device",
    category: "Embedded Systems • Human-Centered Design",
    description: "Built a sleep-aware system that personalizes wake-ups using biometric sensing and adaptive light/audio cues. Integrated wearable PPG sensor + Raspberry Pi hardware. Designed app logic to trigger dynamic wake sequences based on sleep state. Led user research, market analysis, and pricing strategy.",
    tags: ["Raspberry Pi", "Python", "Sensors", "Market Analysis"],
    link: "#",
    linkText: "View project",
    year: "2024",
    color: "bg-[#4A3B32]", // Dark brown/Dusk
  },
  {
    id: "02",
    title: "PortaProfile — Smart NFC/RFID Business Card",
    category: "Product Design • Prototyping",
    description: "A modular smart business card enabling seamless digital networking. Embedded QR + RFID for instant contact sharing. Prototyped multiple form factors in Fusion. Conducted feasibility + cost modeling ($2–$10 manufacturing). Developed positioning and go-to-market strategy. 2nd Place — Illinois Product Design Competition.",
    tags: ["Product Design", "RFID", "Cost Analysis"],
    link: "#",
    linkText: "View prototype",
    year: "2024",
    color: "bg-[#EFEBE9]", // Sand/Light
  },
  {
    id: "03",
    title: "Titanium Dioxide Nanomaterials Research",
    category: "Research • Data Analysis",
    description: "Published research in Curieux Academic Journal exploring structural properties of TiO₂ nanoparticles. Analyzed how microstructure impacts strength & performance. Synthesized findings into formal academic paper. Focused on real-world material applications.",
    tags: ["Research", "Nanomaterials", "Data Analysis"],
    link: "#",
    linkText: "Read paper",
    year: "2023",
    color: "bg-[#C77D63]", // Terracotta
  },
  {
    id: "04",
    title: "Internal Combustion Engine Digital Model",
    category: "CAD • Simulation • Thermodynamics",
    description: "High-fidelity Fusion 360 model + simulation of a 4-stroke engine. Modeled complete mechanical system. Simulated thermodynamic behavior & performance. Connected theory to real engineering systems.",
    tags: ["Fusion 360", "Simulation", "CAD"],
    link: "#",
    linkText: "Explore models",
    year: "2023",
    color: "bg-[#8D6E63]",
  },
  {
    id: "05",
    title: "Airplane Basics Handbook",
    category: "Technical Writing • Education",
    description: "Beginner-friendly guide breaking down aircraft types, systems, and engine fundamentals. Designed for accessibility & clarity. Visual-first explanations of complex concepts. Created as an original instructional resource.",
    tags: ["Technical Writing", "Education", "Systems Thinking"],
    link: "#",
    linkText: "Flip through",
    year: "2022",
    color: "bg-[#6B6054]",
  },
  {
    id: "06",
    title: "Engines Unplugged (Medium Article Series)",
    category: "Deep Dives • Engineering Communication",
    description: "Long-form breakdown of the four primary engine types and how they work. Explained complex mechanisms simply. Combined diagrams + real-world examples. Written for curious beginners & students.",
    tags: ["Technical Writing", "Engineering", "Medium"],
    link: "#",
    linkText: "Read article",
    year: "2022",
    color: "bg-[#4A3B32]",
  }
];

const experience = [
    {
        role: "Autodesk Design & Make Ambassador",
        description: "Help students adopt professional design tools across campus.",
        details: [
            "Led workshops + live demos in Fusion & AutoCAD",
            "Translated technical features into practical workflows",
            "Organized outreach events and strengthened brand engagement"
        ]
    },
    {
        role: "FIRST Robotics — Mechanical Team Member & Programmer",
        description: "Designed and built competition robots under tight deadlines.",
        details: [
            "Machined parts, wired electrical systems, and fabricated assemblies",
            "Programmed movement + sensor logic",
            "Collaborated in fast-paced, cross-functional team environment"
        ]
    },
    {
        role: "Abbott — Independent Study & Mentorship",
        description: "Thermodynamics-focused engineering research with industry mentor.",
        details: [
            "Studied real-world thermal systems",
            "Built digital engine simulation",
            "Applied theory to practical modeling challenges"
        ]
    },
    {
        role: "BSB Design — Job Shadow Intern",
        description: "Exposure to professional architectural workflows.",
        details: [
            "Observed client → concept → CAD → final plan pipeline",
            "Learned revision cycles & stakeholder communication",
            "Practiced translating requirements into 2D models"
        ]
    },
    {
        role: "University of North Texas — Summer Engineering Intern",
        description: "Hands-on manufacturing + renewable energy projects.",
        details: [
            "3D printing, sand casting, injection molding",
            "Built structural + solar/wind prototypes",
            "Applied mechanical principles through fabrication"
        ]
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
            {project.category}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-[#4A3B32] mb-8 leading-[1.1]">
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
          className="group inline-flex items-center gap-3 text-[#4A3B32] font-serif italic text-xl hover:text-[#C77D63] transition-colors duration-300"
        >
          <span>{project.linkText}</span>
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
        <div className="flex flex-col mb-40">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} />
          ))}
        </div>

        {/* Experience Section */}
        <div className="max-w-4xl mx-auto mb-40">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="border-l-4 border-[#C77D63] pl-8"
            >
                <h2 className="text-6xl md:text-8xl font-serif text-[#4A3B32] mb-16 tracking-tight">Experience</h2>
                
                <div className="space-y-16">
                    {experience.map((exp, i) => (
                        <div key={i} className="group">
                            <h3 className="text-3xl md:text-4xl text-[#4A3B32] font-serif mb-4 group-hover:text-[#C77D63] transition-colors">
                                {exp.role}
                            </h3>
                            <p className="text-[#6B6054] text-xl mb-4 italic border-b border-[#4A3B32]/10 pb-4 inline-block">
                                {exp.description}
                            </p>
                            <ul className="space-y-2">
                                {exp.details.map((detail, j) => (
                                    <li key={j} className="flex items-start gap-3 text-[#6B6054]">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C77D63]" />
                                        <span className="text-lg">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>

        {/* Bottom Navigation / CTA */}
        <div className="mt-20 md:mt-40 border-t border-[#4A3B32]/20 pt-12 flex justify-between items-end">
          <div className="text-[#6B6054] font-sans text-sm uppercase tracking-widest">
            01 — Projects & Experience
          </div>
          <Link href="/" className="text-4xl md:text-6xl font-serif text-[#4A3B32]/50 hover:text-[#4A3B32] transition-colors duration-500">
            Back: Home <span className="text-[#BC6C4A]">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
