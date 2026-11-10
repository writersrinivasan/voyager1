"use client";
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({ id, kicker, title, intro, children }: { id: string; kicker: string; title: React.ReactNode; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-300">{kicker}</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
        {intro && <p className="mt-4 max-w-3xl text-lg text-slate-300">{intro}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
