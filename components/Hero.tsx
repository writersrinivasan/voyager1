"use client";
import { motion } from "framer-motion";
import { useNow } from "@/lib/useNow";
import { LIGHT_DAY_MOMENT, VOYAGER_1, VOYAGER_2, snapshot } from "@/lib/ephemeris";

function Countdown({ now }: { now: number }) {
  const diff = LIGHT_DAY_MOMENT - now;
  const passed = diff <= 0;
  const s = Math.abs(diff) / 1000;
  const parts = [
    [Math.floor(s / 86400), "days"],
    [Math.floor((s % 86400) / 3600), "hrs"],
    [Math.floor((s % 3600) / 60), "min"],
    [Math.floor(s % 60), "sec"],
  ] as const;
  return (
    <div className="glass rounded-3xl p-5 sm:p-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300">
        {passed ? "Voyager 1 has been beyond one light‑day for" : "Countdown · Voyager 1 reaches one light‑day"}
      </p>
      <div className="mt-3 flex gap-3 sm:gap-5">
        {parts.map(([v, l]) => (
          <div key={l} className="text-center">
            <motion.div key={v} initial={{ y: -8, opacity: 0.3 }} animate={{ y: 0, opacity: 1 }} className="tabular font-mono text-3xl font-bold text-white sm:text-5xl">
              {String(v).padStart(2, "0")}
            </motion.div>
            <div className="text-xs uppercase tracking-widest text-slate-400">{l}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-slate-300">Nov 18, 2026 · 2:16:07 a.m. PST — 25,902,068,371 km. Light itself needs 24 hours to get there.</p>
    </div>
  );
}

function Odometer({ label, km, color }: { label: string; km: number; color: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: color }} />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: color }} />
        </span>
        {label} · from Earth
      </div>
      <div className="tabular mt-1 font-mono text-2xl font-bold text-white sm:text-3xl">
        {Math.floor(km).toLocaleString("en-US")} <span className="text-base text-slate-400">km</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const now = useNow(100);
  const v1 = now ? snapshot(VOYAGER_1, now) : null;
  const v2 = now ? snapshot(VOYAGER_2, now) : null;
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="nebula" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs uppercase tracking-[0.35em] text-sky-300">
            1977 → ∞ · Interstellar Mission
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-4 text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl"
          >
            The farthest <span className="text-aurora">journey</span> humans ever made.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 max-w-xl text-lg text-slate-300">
            Two 722‑kg robots, launched with less memory than a single photo on your phone, are now sailing between the stars — and still phoning home.
            Explore where they are right now, the physics keeping them alive, and the history that almost stopped them.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 space-y-3">
            {now ? <Countdown now={now} /> : <div className="glass h-40 rounded-3xl" />}
          </motion.div>
        </div>

        <div className="relative">
          <VoyagerCraft />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {v1 && v2 ? (
              <>
                <Odometer label="Voyager 1" km={v1.earthKm} color={VOYAGER_1.color} />
                <Odometer label="Voyager 2" km={v2.earthKm} color={VOYAGER_2.color} />
              </>
            ) : (
              <><div className="glass h-24 rounded-2xl" /><div className="glass h-24 rounded-2xl" /></>
            )}
          </div>
        </div>
      </div>
      <motion.a href="#live" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-slate-400">
        scroll to launch ↓
      </motion.a>
    </section>
  );
}

/** Stylised SVG Voyager with floating motion and radio pulses. */
function VoyagerCraft() {
  return (
    <motion.div animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="mx-auto w-full max-w-md">
      <svg viewBox="0 0 400 320" className="w-full drop-shadow-[0_0_40px_rgba(56,189,248,0.35)]">
        <defs>
          <radialGradient id="dish" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
          <linearGradient id="gold" x1="0" x2="1">
            <stop offset="0%" stopColor="#fde68a" /><stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        {[0, 0.8, 1.6].map((d) => (
          <circle key={d} cx="170" cy="125" r="60" fill="none" stroke="#38bdf8" strokeWidth="2" className="pulse-ring" style={{ animationDelay: `${d}s` }} />
        ))}
        {/* magnetometer boom */}
        <line x1="190" y1="170" x2="390" y2="60" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="390" cy="60" r="4" fill="#38bdf8" />
        {/* RTG boom */}
        <line x1="160" y1="190" x2="40" y2="290" stroke="#94a3b8" strokeWidth="4" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={95 - i * 25} y={232 + i * 20} width="22" height="16" rx="3" fill="#78716c" stroke="#f97316" strokeWidth="1.5" transform={`rotate(-40 ${106 - i * 25} ${240 + i * 20})`} />
        ))}
        {/* science boom */}
        <line x1="200" y1="190" x2="320" y2="260" stroke="#94a3b8" strokeWidth="4" />
        <rect x="300" y="245" width="34" height="26" rx="4" fill="#334155" stroke="#a78bfa" strokeWidth="2" />
        <circle cx="317" cy="258" r="6" fill="#a78bfa" />
        {/* bus */}
        <polygon points="140,160 200,160 215,185 200,210 140,210 125,185" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <circle cx="170" cy="200" r="10" fill="url(#gold)" />
        {/* dish */}
        <ellipse cx="170" cy="125" rx="95" ry="36" fill="url(#dish)" stroke="#e2e8f0" strokeWidth="2" />
        <line x1="170" y1="125" x2="170" y2="80" stroke="#e2e8f0" strokeWidth="3" />
        <circle cx="170" cy="78" r="5" fill="#f8fafc" />
      </svg>
    </motion.div>
  );
}
