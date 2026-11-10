"use client";
import { motion } from "framer-motion";
import { Section, Reveal } from "./Section";

const LAYERS = [
  { name: "Solar wind", color: "#fbbf24", text: "A million-tonne-per-second stream of charged particles from the Sun, blowing outward at 300–800 km/s — supersonic." },
  { name: "Termination shock", color: "#fb923c", text: "Where the solar wind piles up against interstellar gas and slows to subsonic speed, like water spreading in a sink. V1 crossed at ~94 AU (2004), V2 at ~84 AU (2007)." },
  { name: "Heliosheath", color: "#f472b6", text: "A turbulent zone of hot, slowed solar wind. V1 found a surprising 'magnetic highway' here, where solar and galactic particles mix." },
  { name: "Heliopause", color: "#c084fc", text: "The boundary where the Sun's wind stops and interstellar plasma begins. Plasma density jumped ~40×, and galactic cosmic rays rose sharply." },
  { name: "Interstellar medium", color: "#38bdf8", text: "Gas, dust and plasma between the stars, ejected by long-dead stars. Voyager measures its magnetic field and plasma 'hum' caused by solar outbursts." },
];

const FUTURE = [
  ["~2030s", "Last science instrument switched off; engineering data may continue a few more years."],
  ["~2036", "Probably out of range of the Deep Space Network, even if power remains."],
  ["~300 yrs", "Reaches the inner edge of the Oort Cloud — the shell of icy comets around the Sun."],
  ["~30,000 yrs", "Time to cross the Oort Cloud."],
  ["~40,000 yrs", "Voyager 1 passes 1.6 light-years from star Gliese 445; Voyager 2 passes 1.7 ly from Ross 248."],
  ["~296,000 yrs", "Voyager 2 passes 4.3 light-years from Sirius, the brightest star in our sky."],
  ["billions of yrs", "The gold-plated record could outlast Earth itself, orbiting the Milky Way's center."],
];

function Particles() {
  return (
    <g>
      {Array.from({ length: 28 }).map((_, i) => {
        const a = (i / 28) * Math.PI * 2;
        return (
          <motion.circle key={i} r="2" fill="#fde68a"
            initial={{ cx: 200, cy: 200, opacity: 1 }}
            animate={{ cx: 200 + Math.cos(a) * 120, cy: 200 + Math.sin(a) * 105, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, delay: (i % 7) * 0.4, ease: "easeOut" }} />
        );
      })}
    </g>
  );
}

export default function Heliosphere() {
  return (
    <Section id="heliosphere" kicker="Interstellar space" title={<>Leaving the Sun&apos;s <span className="text-aurora">bubble</span></>}
      intro="The Sun blows a giant magnetic bubble — the heliosphere — as it moves through the galaxy at ~26 km/s. The Voyagers are the only spacecraft ever to have measured its edge and the space beyond.">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="glass rounded-3xl p-4">
            <svg viewBox="0 0 640 400" className="w-full">
              <defs>
                <radialGradient id="hs" cx="35%" cy="50%"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" /><stop offset="60%" stopColor="#db2777" stopOpacity="0.18" /><stop offset="100%" stopColor="#7c3aed" stopOpacity="0.08" /></radialGradient>
              </defs>
              {/* interstellar wind */}
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.line key={i} y1={30 + i * 42} y2={30 + i * 42} stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="10 14"
                  initial={{ x1: 640, x2: 560 }} animate={{ x1: [640, 520], x2: [600, 480] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: "linear" }} />
              ))}
              <text x="520" y="22" fontSize="12" fill="#7dd3fc">← interstellar wind</text>
              {/* bow wave */}
              <path d="M 520 0 Q 380 200 520 400" fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 6" />
              {/* heliopause - comet shape */}
              <path d="M 430 200 C 430 70, 260 40, 160 80 C 60 120, 0 160, 0 200 C 0 240, 60 280, 160 320 C 260 360, 430 330, 430 200 Z" fill="url(#hs)" stroke="#c084fc" strokeWidth="2.5" />
              {/* termination shock */}
              <ellipse cx="220" cy="200" rx="135" ry="115" fill="none" stroke="#fb923c" strokeWidth="2" strokeDasharray="6 5" />
              <Particles />
              <circle cx="200" cy="200" r="14" fill="#fde047" />
              <circle cx="200" cy="200" r="24" fill="#fde047" opacity="0.25" className="pulse-ring" />
              <text x="200" y="235" textAnchor="middle" fontSize="11" fill="#fde68a">Sun</text>
              <text x="250" y="78" fontSize="11" fill="#fb923c">termination shock</text>
              <text x="300" y="56" fontSize="11" fill="#d8b4fe">heliopause</text>
              <text x="300" y="215" fontSize="11" fill="#f9a8d4">heliosheath</text>
              {/* Voyager trails */}
              <motion.path d="M 200 200 Q 330 150 470 110" fill="none" stroke="#38bdf8" strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 3 }} />
              <motion.path d="M 200 200 Q 330 260 455 300" fill="none" stroke="#f472b6" strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 3, delay: 0.4 }} />
              <circle cx="470" cy="110" r="6" fill="#38bdf8" />
              <circle cx="455" cy="300" r="6" fill="#f472b6" />
              <text x="480" y="106" fontSize="12" fontWeight="bold" fill="#7dd3fc">Voyager 1 · 2012 →</text>
              <text x="465" y="318" fontSize="12" fontWeight="bold" fill="#f9a8d4">Voyager 2 · 2018 →</text>
            </svg>
            <p className="px-2 pb-1 text-xs text-slate-500">Schematic — the true shape of the heliosphere (comet-like or croissant-like) is still debated, and Voyager data are central to that debate.</p>
          </div>
        </Reveal>
        <div className="space-y-3">
          {LAYERS.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <div className="glass flex gap-4 rounded-2xl p-4">
                <div className="mt-1 h-4 w-4 shrink-0 rounded-full" style={{ background: l.color, boxShadow: `0 0 16px ${l.color}` }} />
                <div><div className="font-semibold text-white">{l.name}</div><div className="text-sm text-slate-300">{l.text}</div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-14">
        <h3 className="text-2xl font-bold text-white">🔭 The road ahead</h3>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {FUTURE.map(([t, d], i) => (
            <motion.div key={t} whileHover={{ y: -8 }} className="glass min-w-[220px] rounded-2xl p-5"
              style={{ background: `linear-gradient(160deg, hsla(${200 + i * 25},90%,60%,0.18), rgba(255,255,255,0.02))` }}>
              <div className="font-mono text-xl font-bold text-white">{t}</div>
              <div className="mt-2 text-sm text-slate-300">{d}</div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
