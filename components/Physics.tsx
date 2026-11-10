"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Section, Reveal } from "./Section";
import { useNow } from "@/lib/useNow";
import { VOYAGER_1, VOYAGER_2, snapshot, rtgWatts, AU_KM } from "@/lib/ephemeris";
import { PHYSICS_FACTS } from "@/lib/data";

/* ---------------- Gravity assist playground ---------------- */
function Arrow({ x, y, dx, dy, color, label }: { x: number; y: number; dx: number; dy: number; color: string; label: string }) {
  // Round so server and browser render identical attribute strings (trig can differ in the last digit).
  const r = (n: number) => n.toFixed(2);
  const x2 = x + dx, y2 = y + dy;
  const a = Math.atan2(dy, dx);
  const h = 10;
  const pts = [[x2, y2], [x2 - h * Math.cos(a - 0.4), y2 - h * Math.sin(a - 0.4)], [x2 - h * Math.cos(a + 0.4), y2 - h * Math.sin(a + 0.4)]]
    .map(([px, py]) => `${r(px)},${r(py)}`).join(" ");
  return (
    <g>
      <line x1={x} y1={y} x2={r(x2)} y2={r(y2)} stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polygon points={pts} fill={color} />
      <text x={r(x2 + 6)} y={r(y2 + 4)} fontSize="12" fill={color}>{label}</text>
    </g>
  );
}

function GravityAssist() {
  const [planetV, setPlanetV] = useState(13.1); // Jupiter orbital speed km/s
  const [inAngle, setInAngle] = useState(120); // direction of incoming velocity (deg, sun frame)
  const [defl, setDefl] = useState(100); // deflection of relative velocity by planet (deg)
  const vin = 10.0; // spacecraft heliocentric speed on arrival
  const ai = (inAngle * Math.PI) / 180;
  const vIn = [vin * Math.cos(ai), vin * Math.sin(ai)];
  const rel = [vIn[0] - planetV, vIn[1]];
  const d = (-defl * Math.PI) / 180;
  const relOut = [rel[0] * Math.cos(d) - rel[1] * Math.sin(d), rel[0] * Math.sin(d) + rel[1] * Math.cos(d)];
  const vOut = [relOut[0] + planetV, relOut[1]];
  const sOut = Math.hypot(vOut[0], vOut[1]);
  const gain = sOut - vin;
  const S = 9; // px per km/s
  const cx = 220, cy = 170;
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-white">🪐 Gravity assist playground</h3>
      <p className="mt-2 text-sm text-slate-300">
        In the planet&apos;s frame the spacecraft leaves with the <em>same speed</em> it arrived with — just bent. But the planet is moving around the Sun, so in the
        Sun&apos;s frame the spacecraft can steal some of the planet&apos;s orbital momentum. Jupiter slowed down by about 1 foot per trillion years to give Voyager its kick.
      </p>
      <div className="mt-4 grid gap-6 md:grid-cols-[1fr_260px]">
        <svg viewBox="0 0 440 340" className="w-full rounded-2xl bg-black/30">
          <circle cx={cx} cy={cy} r="26" fill="#fb923c" />
          <circle cx={cx} cy={cy} r="40" fill="#fb923c" opacity="0.15" />
          <Arrow x={cx} y={cy} dx={planetV * S} dy={0} color="#fbbf24" label="planet" />
          <Arrow x={cx} y={cy} dx={vIn[0] * S} dy={-vIn[1] * S} color="#94a3b8" label="v in" />
          <Arrow x={cx} y={cy} dx={vOut[0] * S} dy={-vOut[1] * S} color="#22d3ee" label="v out" />
        </svg>
        <div className="space-y-4 text-sm">
          {[
            { l: "Planet orbital speed", v: planetV, set: setPlanetV, min: 5, max: 20, step: 0.1, u: "km/s" },
            { l: "Arrival direction", v: inAngle, set: setInAngle, min: 0, max: 180, step: 1, u: "°" },
            { l: "Bend angle (how close the flyby)", v: defl, set: setDefl, min: -150, max: 150, step: 1, u: "°" },
          ].map((s) => (
            <label key={s.l} className="block">
              <span className="flex justify-between text-slate-300"><span>{s.l}</span><span className="font-mono text-white">{s.v.toFixed(s.step < 1 ? 1 : 0)} {s.u}</span></span>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.v} onChange={(e) => s.set(parseFloat(e.target.value))} className="mt-1 w-full accent-fuchsia-400" />
            </label>
          ))}
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-slate-400">Speed in → out (Sun frame)</div>
            <div className="font-mono text-2xl text-white">{vin.toFixed(1)} → {sOut.toFixed(1)} km/s</div>
            <div className={`mt-1 font-mono text-lg ${gain >= 0 ? "text-emerald-300" : "text-rose-300"}`}>{gain >= 0 ? "+" : ""}{gain.toFixed(1)} km/s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- RTG power chart ---------------- */
function PowerChart({ now }: { now: number }) {
  const start = 1977, end = 2036;
  const W = 520, H = 220, P = 36;
  const year = (t: number) => 1970 + t / (365.25 * 86400000);
  const x = (y: number) => P + ((y - start) / (end - start)) * (W - 2 * P);
  const y = (w: number) => H - P - (w / 500) * (H - 2 * P);
  const pts: string[] = [];
  for (let yr = start; yr <= end; yr += 0.5) {
    const t = Date.UTC(Math.floor(yr), Math.round((yr % 1) * 12), 1);
    pts.push(`${x(yr).toFixed(1)},${y(rtgWatts(t)).toFixed(1)}`);
  }
  const nowYr = year(now);
  const nowW = rtgWatts(now);
  const events = [[1990, "Cameras off"], [2007, "PLS (V1)"], [2016, "UVS (V1)"], [2025.1, "CRS (V1)"], [2026.3, "LECP (V1)"]] as const;
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-white">⚛️ Nuclear batteries running down</h3>
      <p className="mt-2 text-sm text-slate-300">
        Sunlight at 170 AU is ~29,000× weaker than at Earth, so solar panels are useless. Each Voyager carries three radioisotope thermoelectric generators (RTGs):
        plutonium‑238 decays (half-life 87.7 years), heating thermocouples that turn heat directly into electricity. Output drops ~4 W per year as the fuel decays and the thermocouples age.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full">
        <defs>
          <linearGradient id="pw" x1="0" x2="1"><stop offset="0%" stopColor="#a3e635" /><stop offset="60%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#f43f5e" /></linearGradient>
        </defs>
        {[100, 200, 300, 400, 500].map((w) => (
          <g key={w}><line x1={P} x2={W - P} y1={y(w)} y2={y(w)} stroke="#fff" strokeOpacity="0.07" /><text x={P - 6} y={y(w) + 4} fontSize="10" textAnchor="end" fill="#94a3b8">{w}W</text></g>
        ))}
        {[1980, 1990, 2000, 2010, 2020, 2030].map((yr) => <text key={yr} x={x(yr)} y={H - 12} fontSize="10" textAnchor="middle" fill="#94a3b8">{yr}</text>)}
        {events.map(([yr, l], i) => (
          <g key={l}><line x1={x(yr)} x2={x(yr)} y1={y(rtgWatts(Date.UTC(Math.floor(yr), 0)))} y2={y(rtgWatts(Date.UTC(Math.floor(yr), 0))) - 30 - (i % 2) * 18} stroke="#e879f9" strokeOpacity="0.6" />
            <text x={x(yr)} y={y(rtgWatts(Date.UTC(Math.floor(yr), 0))) - 34 - (i % 2) * 18} fontSize="9" textAnchor="middle" fill="#f0abfc">{l}</text></g>
        ))}
        <motion.polyline points={pts.join(" ")} fill="none" stroke="url(#pw)" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.2 }} />
        <circle cx={x(nowYr)} cy={y(nowW)} r="6" fill="#fff" className="pulse-ring" />
        <circle cx={x(nowYr)} cy={y(nowW)} r="4" fill="#fff" />
        <text x={x(nowYr) + 8} y={y(nowW) + 18} fontSize="11" fill="#fff">today ≈ {nowW.toFixed(0)} W</text>
      </svg>
      <p className="mt-2 text-xs text-slate-500">Modelled curve (≈470 W in 1977 → ≈225 W today). NASA expects to keep at least one instrument running into the 2030s.</p>
    </div>
  );
}

/* ---------------- Communications link ---------------- */
function CommsLink({ now }: { now: number }) {
  const s = snapshot(VOYAGER_1, now);
  const dM = s.earthKm * 1000;
  const eirp = 22.4 * Math.pow(10, 48 / 10); // 22.4 W into a ~48 dBi high-gain antenna
  const flux = eirp / (4 * Math.PI * dM * dM);
  const received = flux * Math.PI * 35 * 35 * 0.7; // 70 m DSN dish, 70% efficiency
  const exp = Math.floor(Math.log10(received));
  const mant = received / Math.pow(10, exp);
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-white">📡 Whispering across 25 billion km</h3>
      <p className="mt-2 text-sm text-slate-300">
        Signals spread out obeying the <b>inverse-square law</b>: double the distance, quarter the power. Voyager 1&apos;s 22.4‑W X‑band radio (8.4 GHz) is focused by a 3.7 m dish,
        but by the time it reaches NASA&apos;s 70‑m Deep Space Network antennas, the captured power is billions of times weaker than a digital watch battery.
      </p>
      <div className="relative mt-6 h-24 overflow-hidden rounded-2xl bg-black/30">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-3xl">🛰️</span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-3xl">🌍</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span key={i} className="absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-2 border-sky-300"
            initial={{ left: "8%", opacity: 1, scale: 0.4 }} animate={{ left: "88%", opacity: 0.05, scale: 2.2 }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: "linear" }} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-white/5 p-3"><div className="text-slate-400">Power received (est.)</div><div className="font-mono text-xl text-sky-300">{mant.toFixed(1)}×10<sup>{exp}</sup> W</div></div>
        <div className="rounded-xl bg-white/5 p-3"><div className="text-slate-400">Data rate</div><div className="font-mono text-xl text-sky-300">160 bit/s</div></div>
        <div className="rounded-xl bg-white/5 p-3"><div className="text-slate-400">One photo (1 MB) would take</div><div className="font-mono text-xl text-sky-300">~14 hours</div></div>
        <div className="rounded-xl bg-white/5 p-3"><div className="text-slate-400">Doppler shift used to track speed</div><div className="font-mono text-xl text-sky-300">up to ~1 MHz</div></div>
      </div>
    </div>
  );
}

/* ---------------- Escape velocity & relativity ---------------- */
function EscapeAndRelativity({ now }: { now: number }) {
  const v1 = snapshot(VOYAGER_1, now);
  const v2 = snapshot(VOYAGER_2, now);
  const esc = (au: number) => 42.1 / Math.sqrt(au); // km/s, solar escape speed
  const rows = [
    { n: "Voyager 1", v: VOYAGER_1.speedKmS, e: esc(v1.sunAU), c: "#38bdf8" },
    { n: "Voyager 2", v: VOYAGER_2.speedKmS, e: esc(v2.sunAU), c: "#f472b6" },
  ];
  // Special-relativistic lag accumulated (Δt ≈ v²/2c² · t), using average cruise speed
  const secs = (now - VOYAGER_1.launch) / 1000;
  const lag = ((17 * 17) / (2 * 299792.458 * 299792.458)) * secs;
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-white">🚀 Never coming back</h3>
      <p className="mt-2 text-sm text-slate-300">
        Escape speed from the Sun falls with distance as <span className="font-mono">v = √(2GM/r)</span>. Both Voyagers move far faster than the escape speed where they are, so they follow
        <b> hyperbolic</b> (unbound) paths. Gravity still tugs on them, but it can never pull them back.
      </p>
      <div className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.n}>
            <div className="flex justify-between text-sm"><span style={{ color: r.c }}>{r.n}</span><span className="font-mono text-slate-300">{r.v.toFixed(1)} km/s vs escape {r.e.toFixed(2)} km/s</span></div>
            <div className="relative mt-1 h-4 rounded-full bg-white/10">
              <motion.div className="h-full rounded-full" style={{ background: r.c }} initial={{ width: 0 }} whileInView={{ width: `${(r.v / 20) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
              <div className="absolute top-[-4px] h-6 w-0.5 bg-white" style={{ left: `${(r.e / 20) * 100}%` }} title="escape speed" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 p-4">
        <div className="text-sm text-slate-300">⏱️ Einstein bonus — special relativity: Voyager 1&apos;s clock has fallen behind Earth&apos;s by about</div>
        <div className="font-mono text-3xl font-bold text-white">{lag.toFixed(3)} s</div>
        <div className="text-xs text-slate-400">from its speed alone (it gains back a little because it&apos;s farther from the Sun&apos;s gravity well).</div>
      </div>
      <p className="mt-4 text-xs text-slate-500">Distances from the Sun now: V1 {v1.sunAU.toFixed(1)} AU ({(v1.sunKm / 1e9).toFixed(2)} bn km) · V2 {v2.sunAU.toFixed(1)} AU · 1 AU = {AU_KM.toLocaleString()} km</p>
    </div>
  );
}

export default function Physics() {
  const now = useNow(1000);
  return (
    <Section id="physics" kicker="Physics & astrophysics" title={<>How does it <span className="text-aurora">actually work</span> out there?</>}
      intro="Voyager is a 1970s machine solving 21st-century problems: steal energy from planets, live on decaying plutonium, talk with a 22-watt radio, and keep warm at −270 °C.">
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {PHYSICS_FACTS.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.05}>
            <motion.div whileHover={{ y: -6, scale: 1.03 }} className="glass h-full rounded-2xl p-4">
              <div className="text-xs uppercase tracking-wider text-slate-400">{f.label}</div>
              <div className="mt-1 text-2xl font-bold text-white">{f.value}</div>
              <div className="text-xs text-slate-400">{f.sub}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 grid gap-6">
        <Reveal><GravityAssist /></Reveal>
        {now && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal><PowerChart now={now} /></Reveal>
            <Reveal delay={0.1}><CommsLink now={now} /></Reveal>
            <Reveal><EscapeAndRelativity now={now} /></Reveal>
            <Reveal delay={0.1}><Navigation /></Reveal>
          </div>
        )}
      </div>
    </Section>
  );
}

function Navigation() {
  const items = [
    ["🧭", "Attitude control", "Sun sensors and a star tracker locked on the bright star Canopus keep the antenna pointed at Earth to within a fraction of a degree. Tiny hydrazine thruster pulses do the steering."],
    ["🔥", "Thrusters", "Original attitude thrusters clog with silica residue. Engineers switched to trajectory-correction thrusters unused since 1989 (in 2017) and revived the 'dead' primary roll thrusters in 2025."],
    ["❄️", "Thermal control", "Waste heat from the RTGs and electric heaters keep fuel lines from freezing. Each heater switched off makes the spacecraft colder — a constant trade-off."],
    ["🧮", "Computers", "Three computer types (CCS, FDS, AACS), each doubled for redundancy. Programs are uploaded in assembly-like code and checked on a ground simulator first."],
  ];
  return (
    <div className="glass h-full rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-white">🛠️ Staying alive and on target</h3>
      <div className="mt-4 space-y-4">
        {items.map(([i, t, d]) => (
          <div key={t} className="flex gap-3"><div className="text-2xl">{i}</div><div><div className="font-semibold text-white">{t}</div><div className="text-sm text-slate-300">{d}</div></div></div>
        ))}
      </div>
    </div>
  );
}
