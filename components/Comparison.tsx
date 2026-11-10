"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Section, Reveal } from "./Section";
import { IMPROVEMENTS, PROBES, SHIP_COMPARE } from "@/lib/data";

export default function Comparison() {
  const [metric, setMetric] = useState<"distAU" | "speed">("distAU");
  const max = Math.max(...PROBES.map((p) => p[metric]));
  return (
    <Section id="compare" kicker="Voyager vs. the rest" title={<>How the twins <span className="text-aurora">stack up</span></>}
      intro="Only five spacecraft have ever been sent on paths that leave the Solar System. Voyager 1 is the fastest of them and will stay the farthest for the foreseeable future.">
      <Reveal>
        <div className="glass rounded-3xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-bold text-white">🏁 The escape race (late 2026)</h3>
            <div className="flex gap-2">
              {([["distAU", "Distance (AU)"], ["speed", "Speed (km/s)"]] as const).map(([k, l]) => (
                <button key={k} onClick={() => setMetric(k)} className={`rounded-full px-4 py-1.5 text-sm ${metric === k ? "bg-white text-black" : "bg-white/10 text-slate-300"}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {PROBES.map((p, i) => (
              <div key={p.name}>
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <span className="font-semibold text-white">{p.name} <span className="font-normal text-slate-400">· {p.launch} · {p.power}</span></span>
                  <span className={`font-mono ${p.active ? "text-emerald-300" : "text-slate-500"}`}>{p.status}</span>
                </div>
                <div className="mt-1 h-7 overflow-hidden rounded-full bg-white/5">
                  <motion.div key={metric} className="flex h-full items-center justify-end rounded-full pr-3 font-mono text-xs font-bold text-black"
                    style={{ background: `linear-gradient(90deg, ${p.color}66, ${p.color})` }}
                    initial={{ width: 0 }} whileInView={{ width: `${(p[metric] / max) * 100}%` }} viewport={{ once: true }}
                    animate={{ width: `${(p[metric] / max) * 100}%` }} transition={{ duration: 1.2, delay: i * 0.08 }}>
                    {metric === "distAU" ? `~${p.distAU} AU` : `${p.speed} km/s`}
                  </motion.div>
                </div>
                <div className="mt-1 text-xs text-slate-400">{p.note}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Approximate heliocentric values. Parker Solar Probe is faster (≈192 km/s) but is bound to the Sun, not escaping.</p>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div className="glass overflow-x-auto rounded-3xl p-2 sm:p-4">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-400">
              <tr>{["Spacecraft", "Launch", "Memory / computing", "Data rate", "Camera", "Power", "Notes"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {SHIP_COMPARE.map((s, i) => (
                <motion.tr key={s.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`border-t border-white/5 ${i === 0 ? "bg-sky-400/10" : ""}`}>
                  <td className="p-3 font-semibold text-white">{s.name}</td>
                  <td className="p-3 font-mono text-slate-300">{s.year}</td>
                  <td className="p-3 text-slate-300">{s.memory}</td>
                  <td className="p-3 text-slate-300">{s.data}</td>
                  <td className="p-3 text-slate-300">{s.camera}</td>
                  <td className="p-3 text-slate-300">{s.power}</td>
                  <td className="p-3 text-slate-400">{s.note}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <h3 className="text-2xl font-bold text-white">📈 What&apos;s improved since 1977</h3>
      </Reveal>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {IMPROVEMENTS.map((m, i) => (
          <Reveal key={m.title} delay={(i % 3) * 0.08}>
            <motion.div whileHover={{ scale: 1.03 }} className="glass h-full rounded-3xl p-6">
              <div className="flex items-center gap-3"><span className="text-3xl">{m.icon}</span><h4 className="text-lg font-bold text-white">{m.title}</h4></div>
              <div className="mt-4 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-200"><span className="font-mono text-xs text-rose-300">1977 · </span>{m.from}</div>
              <div className="my-2 text-center text-slate-500">↓</div>
              <div className="rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-200"><span className="font-mono text-xs text-emerald-300">TODAY · </span>{m.to}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <div className="glass rounded-3xl bg-gradient-to-br from-fuchsia-600/20 to-sky-600/20 p-6">
          <h4 className="text-xl font-bold text-white">🔮 What could replace Voyager?</h4>
          <p className="mt-2 text-sm text-slate-300">
            The proposed <b>Interstellar Probe</b> (studied by Johns Hopkins APL for NASA) would use a heavy-lift rocket and a close Jupiter or solar flyby to reach ~7 AU/year — about twice
            Voyager 1&apos;s speed — and pass it within a few decades. Concepts like <b>Breakthrough Starshot</b> aim even further: gram-scale laser-driven light sails to Alpha Centauri.
            Until then, the 1977 twins remain our only probes in interstellar space.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
