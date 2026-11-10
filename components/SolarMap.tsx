"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Section, Reveal } from "./Section";

// Radial scale: r_px ∝ √AU so Earth and 170 AU both fit on one screen.
const R = 300;
const K = R / Math.sqrt(175);
const toXY = (lonDeg: number, au: number): [number, number] => {
  const r = K * Math.sqrt(au), a = (lonDeg * Math.PI) / 180;
  // Rounded so server and browser produce identical SVG attributes.
  return [Math.round(r * Math.cos(a) * 100) / 100, Math.round(-r * Math.sin(a) * 100) / 100];
};

const PLANETS = [
  { name: "Earth", au: 1, size: 3, color: "#60a5fa", period: 6 },
  { name: "Jupiter", au: 5.2, size: 7, color: "#fb923c", period: 18 },
  { name: "Saturn", au: 9.5, size: 6, color: "#fde047", period: 28 },
  { name: "Uranus", au: 19.2, size: 5, color: "#5eead4", period: 44 },
  { name: "Neptune", au: 30.1, size: 5, color: "#818cf8", period: 60 },
];

// Waypoints [heliocentric ecliptic longitude (unwrapped), distance AU, label]
const V1_WAYS: [number, number, string?][] = [[-18, 1, "Launch 1977"], [120, 5.2, "Jupiter 1979"], [185, 9.5, "Saturn/Titan 1980"], [222, 60], [242, 120, "Heliopause 2012"], [256, 172.4, "Now"]];
const V2_WAYS: [number, number, string?][] = [[-33, 1], [128, 5.2, "Jupiter 1979"], [195, 9.5, "Saturn 1981"], [260, 19.2, "Uranus 1986"], [281, 30.1, "Neptune 1989"], [287, 80], [289, 119, "Heliopause 2018"], [290.2, 144.6, "Now"]];

function buildPath(ways: [number, number, string?][]) {
  const pts: [number, number][] = [];
  for (let i = 0; i < ways.length - 1; i++) {
    const [l0, a0] = ways[i], [l1, a1] = ways[i + 1];
    for (let s = 0; s < 24; s++) {
      const f = s / 24;
      pts.push(toXY(l0 + (l1 - l0) * f, a0 + (a1 - a0) * f));
    }
  }
  const last = ways[ways.length - 1];
  pts.push(toXY(last[0], last[1]));
  return "M" + pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L");
}

export default function SolarMap() {
  const [spin, setSpin] = useState(true);
  const v1 = useMemo(() => buildPath(V1_WAYS), []);
  const v2 = useMemo(() => buildPath(V2_WAYS), []);
  const rings = [{ au: 94, label: "Termination shock ~84–94 AU", color: "#f59e0b" }, { au: 121, label: "Heliopause ~120 AU", color: "#e879f9" }];

  return (
    <Section id="map" kicker="Trajectory map" title={<>The <span className="text-aurora">Grand Tour</span>, drawn</>}
      intro="A top-down view of the Solar System on a square-root distance scale (otherwise Earth's orbit would be smaller than a pixel). Voyager 2 visited all four giant planets; Voyager 1 swung by Titan, which flung it 35° above the planets' plane — faster, but away from Uranus and Neptune.">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-2 sm:p-6">
          <button onClick={() => setSpin((s) => !s)} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 hover:bg-white/20">
            {spin ? "⏸ Pause orbits" : "▶ Animate orbits"}
          </button>
          <svg viewBox={`${-R - 40} ${-R - 40} ${2 * R + 80} ${2 * R + 80}`} className="mx-auto w-full max-w-3xl">
            <defs>
              <radialGradient id="sun"><stop offset="0%" stopColor="#fff7ed" /><stop offset="40%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#f97316" stopOpacity="0" /></radialGradient>
              <radialGradient id="helio"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.0" /><stop offset="80%" stopColor="#7c3aed" stopOpacity="0.15" /><stop offset="100%" stopColor="#ec4899" stopOpacity="0.25" /></radialGradient>
            </defs>
            <circle r={K * Math.sqrt(121)} fill="url(#helio)" />
            {rings.map((r) => (
              <g key={r.au}>
                <circle r={K * Math.sqrt(r.au)} fill="none" stroke={r.color} strokeOpacity="0.6" strokeDasharray="6 6" />
                <text y={-K * Math.sqrt(r.au) - 6} textAnchor="middle" fontSize="11" fill={r.color}>{r.label}</text>
              </g>
            ))}
            {PLANETS.map((p) => (
              <circle key={p.name} r={K * Math.sqrt(p.au)} fill="none" stroke="#ffffff" strokeOpacity="0.12" />
            ))}
            <circle r="22" fill="url(#sun)" />
            <circle r="5" fill="#fff7ed" />
            {PLANETS.map((p, i) => (
              <g key={p.name} style={{ animation: `spin ${p.period}s linear infinite`, animationPlayState: spin ? "running" : "paused", transformOrigin: "0 0" }}>
                <g transform={`rotate(${i * 67})`}>
                  <circle cx={K * Math.sqrt(p.au)} r={p.size} fill={p.color} />
                  <circle cx={K * Math.sqrt(p.au)} r={p.size + 4} fill={p.color} opacity="0.2" />
                  <text x={K * Math.sqrt(p.au) + p.size + 4} y="4" fontSize="11" fill="#cbd5e1">{p.name}</text>
                </g>
              </g>
            ))}

            {[{ d: v1, c: "#38bdf8", ways: V1_WAYS, name: "Voyager 1", delay: 0 }, { d: v2, c: "#f472b6", ways: V2_WAYS, name: "Voyager 2", delay: 0.6 }].map((t) => {
              const [ex, ey] = toXY(t.ways[t.ways.length - 1][0], t.ways[t.ways.length - 1][1]);
              return (
                <g key={t.name}>
                  <motion.path d={t.d} fill="none" stroke={t.c} strokeWidth="2.5" strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ duration: 4, delay: t.delay, ease: "easeInOut" }} style={{ filter: `drop-shadow(0 0 6px ${t.c})` }} />
                  <circle r="4" fill="#fff">
                    <animateMotion dur="9s" repeatCount="indefinite" path={t.d} begin={`${t.delay}s`} />
                  </circle>
                  {t.ways.filter((w) => w[2]).map((w) => {
                    const [x, y] = toXY(w[0], w[1]);
                    return (
                      <g key={w[2]}>
                        <circle cx={x} cy={y} r="3" fill={t.c} />
                        <text x={x + 6} y={y + (t.name === "Voyager 1" ? -6 : 14)} fontSize="10" fill={t.c}>{w[2]}</text>
                      </g>
                    );
                  })}
                  <circle cx={ex} cy={ey} r="8" fill="none" stroke={t.c} strokeWidth="2" className="pulse-ring" />
                  <text x={ex + 10} y={ey + 4} fontSize="13" fontWeight="bold" fill={t.c}>{t.name}</text>
                </g>
              );
            })}
          </svg>
          <div className="flex flex-wrap justify-center gap-4 pb-2 text-xs text-slate-400">
            <span><span className="text-sky-300">━</span> Voyager 1 · 2 planets · 35° north of ecliptic</span>
            <span><span className="text-pink-300">━</span> Voyager 2 · 4 planets · 32° south of ecliptic</span>
            <span>Planet motion is sped up for illustration</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
