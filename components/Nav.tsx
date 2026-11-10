"use client";
import { motion, useScroll, useSpring } from "framer-motion";

const LINKS = [
  ["live", "Live"], ["map", "Map"], ["physics", "Physics"], ["heliosphere", "Interstellar"],
  ["discoveries", "Discoveries"], ["timeline", "Timeline"], ["politics", "Politics"], ["record", "Golden Record"], ["compare", "Compare"],
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX }} className="h-1 origin-left bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300" />
      <nav className="glass mx-auto mt-3 flex max-w-6xl items-center gap-4 overflow-x-auto rounded-full px-5 py-2 text-sm [scrollbar-width:none]">
        <a href="#top" className="shrink-0 font-bold text-white">🛰️ Voyager<span className="text-fuchsia-300">Odyssey</span></a>
        <div className="flex gap-1">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-3 py-1 text-slate-300 transition hover:bg-white/10 hover:text-white">{label}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
