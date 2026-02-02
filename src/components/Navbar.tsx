"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const navItems = [
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full z-40 px-6 py-8 flex justify-between items-center mix-blend-difference text-cream"
    >
      <Link href="/" className="text-2xl font-serif tracking-tighter hover:opacity-70 transition-opacity">
        AS.
      </Link>

      <div className="hidden md:flex gap-12">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="relative text-sm font-sans tracking-widest uppercase hover:text-dusk transition-colors group"
          >
            {item.name}
            <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-dusk transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${pathname === item.path ? 'scale-x-100' : ''}`} />
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        {/* Mobile Menu Icon (Simple dot grid or lines) */}
        <div className="space-y-1 cursor-pointer">
          <div className="w-6 h-[1px] bg-current" />
          <div className="w-4 h-[1px] bg-current ml-auto" />
        </div>
      </div>
    </motion.nav>
  );
}
