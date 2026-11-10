"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, Reveal } from "./Section";
import { DISCOVERIES, POLITICS, TIMELINE, type Era } from "@/lib/data";

/* ---------------- Planet discoveries ---------------- */
export function Discoveries() {
  return (
    <Section id="discoveries" kicker="Astrophysics results" title={<>Four worlds, <span className="text-aurora">rewritten</span></>}
      intro="Before Voyager, the giant planets were fuzzy dots in telescopes. Voyager 2 is still the only spacecraft to have visited Uranus and Neptune.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DISCOVERIES.map((p, i) => (
          <Reveal key={p.planet} delay={i * 0.1}>
            <motion.div whileHover={{ y: -10 }} className="glass group h-full overflow-hidden rounded-3xl p-6">
              <div className="relative mx-auto h-32 w-32">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20 + i * 6, repeat: Infinity, ease: "linear" }}
                  className={`h-32 w-32 rounded-full bg-gradient-to-br ${p.gradient} shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]`}
                  style={{ backgroundImage: undefined }} />
                <div className="absolute inset-0 rounded-full bg-[repeating-linear-gradient(170deg,transparent_0_10px,rgba(0,0,0,0.12)_10px_16px)]" />
                {p.planet === "Saturn" && <div className="absolute left-1/2 top-1/2 h-10 w-48 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border-4 border-amber-200/70" />}
                {p.planet === "Uranus" && <div className="absolute left-1/2 top-1/2 h-44 w-8 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[50%] border-2 border-cyan-100/40" />}
              </div>
              <div className="mt-6 flex items-baseline justify-between"><h3 className="text-2xl font-bold text-white">{p.planet}</h3><span className="font-mono text-sm text-slate-400">{p.year}</span></div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {p.facts.map((f) => <li key={f} className="flex gap-2"><span className="text-fuchsia-300">✦</span>{f}</li>)}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Timeline ---------------- */
const ERA_STYLE: Record<Era, { label: string; color: string }> = {
  mission: { label: "Mission", color: "#38bdf8" },
  science: { label: "Science", color: "#a3e635" },
  politics: { label: "Politics", color: "#f472b6" },
  engineering: { label: "Engineering", color: "#fbbf24" },
};

export function Timeline() {
  const [filter, setFilter] = useState<Era | "all">("all");
  const items = TIMELINE.filter((t) => filter === "all" || t.era === filter);
  return (
    <Section id="timeline" kicker="History · 1964 → 2026" title={<>Six decades of <span className="text-aurora">firsts</span></>}
      intro="From a summer intern's calculation to a light-day from home. Filter by what drove each moment.">
      <div className="mb-10 flex flex-wrap gap-2">
        {(["all", "mission", "science", "politics", "engineering"] as const).map((e) => (
          <button key={e} onClick={() => setFilter(e)}
            className={`rounded-full px-4 py-1.5 text-sm capitalize transition ${filter === e ? "bg-white text-black" : "glass text-slate-300 hover:text-white"}`}
            style={filter === e && e !== "all" ? { background: ERA_STYLE[e].color } : undefined}>
            {e}
          </button>
        ))}
      </div>
      <div className="relative">
        <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-gradient-to-b from-sky-400 via-fuchsia-400 to-amber-300 md:left-1/2" />
        <AnimatePresence mode="popLayout">
          {items.map((t, i) => {
            const st = ERA_STYLE[t.era];
            const left = i % 2 === 0;
            return (
              <motion.div key={t.year + t.title} layout initial={{ opacity: 0, x: left ? -60 : 60 }} whileInView={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
                className={`relative mb-8 pl-12 md:w-1/2 md:pl-0 ${left ? "md:pr-12" : "md:ml-auto md:pl-12"}`}>
                <span className={`absolute left-[9px] top-6 h-4 w-4 rounded-full ring-4 ring-[#05030f] md:top-6 ${left ? "md:left-auto md:right-[-8px]" : "md:left-[-8px]"}`}
                  style={{ background: st.color, boxShadow: `0 0 18px ${st.color}` }} />
                <div className="glass rounded-2xl p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-2xl font-bold" style={{ color: st.color }}>{t.year}</span>
                    {t.date && <span className="font-mono text-sm text-slate-400">{t.date}</span>}
                    <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black" style={{ background: st.color }}>{st.label}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{t.text}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ---------------- Politics ---------------- */
export function Politics() {
  return (
    <Section id="politics" kicker="Politics & society" title={<>The mission that <span className="text-aurora">politics almost killed</span></>}
      intro="Voyager's story is as much about budgets, diplomacy and public imagination as it is about physics.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {POLITICS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <motion.div whileHover={{ rotate: -1, scale: 1.02 }} className="glass h-full rounded-3xl p-6">
              <div className="text-4xl">{p.icon}</div>
              <h3 className="mt-3 text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <blockquote className="glass rounded-3xl p-8 text-center">
          <p className="text-xl italic text-slate-100 sm:text-2xl">
            &ldquo;Look again at that dot. That&apos;s here. That&apos;s home. That&apos;s us.&rdquo;
          </p>
          <footer className="mt-3 text-sm text-slate-400">— Carl Sagan, on Voyager 1&apos;s 1990 &ldquo;Pale Blue Dot&rdquo; image</footer>
          <div className="mx-auto mt-6 flex h-28 max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-black via-amber-900/30 to-black">
            <motion.div className="h-24 w-3 bg-gradient-to-b from-transparent via-amber-200/40 to-transparent" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 3 }}>
              <div className="relative top-11 left-[3px] h-1 w-1 rounded-full bg-sky-300 shadow-[0_0_8px_#7dd3fc]" />
            </motion.div>
          </div>
        </blockquote>
      </Reveal>
    </Section>
  );
}

/* ---------------- Golden Record ---------------- */
const RECORD = [
  ["116", "encoded images — DNA, human anatomy, cities, food, a supermarket"],
  ["55", "languages of spoken greeting, from Akkadian to Wu Chinese"],
  ["90 min", "of music: Bach, Beethoven, Chuck Berry, Blind Willie Johnson, Indian raga, Javanese gamelan"],
  ["12 min", "'Sounds of Earth' — whales, thunder, a kiss, a heartbeat, a mother and baby"],
  ["1 hour", "of Ann Druyan's brainwaves recorded while she thought about love"],
  ["U‑238", "electroplated sample acts as a radioactive clock for finders to date the launch"],
];

export function GoldenRecord() {
  return (
    <Section id="record" kicker="A message in a bottle" title={<>The <span className="text-aurora">Golden Record</span></>}
      intro="Each Voyager carries a 12-inch gold-plated copper phonograph record, a stylus and engraved instructions — including a pulsar map that pinpoints the Sun to anyone who can read it.">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="spin-slow relative h-full w-full rounded-full shadow-2xl"
              style={{ background: "repeating-radial-gradient(circle at center, #b45309 0 2px, #f59e0b 2px 3px, #d97706 3px 5px), conic-gradient(from 0deg, #fde68a, #b45309, #fde68a, #92400e, #fde68a)", backgroundBlendMode: "overlay" }}>
              <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-amber-200 to-amber-600 ring-4 ring-amber-900/40">
                <svg viewBox="0 0 100 100" className="h-full w-full p-3 opacity-80">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const a = (i / 14) * Math.PI * 2;
                    const l = 18 + ((i * 37) % 28);
                    return <line key={i} x1="50" y1="50" x2={(50 + Math.cos(a) * l).toFixed(2)} y2={(50 + Math.sin(a) * l).toFixed(2)} stroke="#78350f" strokeWidth="1" />;
                  })}
                  <circle cx="50" cy="50" r="3" fill="#78350f" />
                </svg>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">Center art: a pulsar map — 14 pulsars with their periods in binary, triangulating the Sun.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {RECORD.map(([n, d], i) => (
            <Reveal key={n} delay={i * 0.07}>
              <div className="glass h-full rounded-2xl p-5">
                <div className="bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text font-mono text-3xl font-bold text-transparent">{n}</div>
                <div className="mt-1 text-sm text-slate-300">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
