"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Section, Reveal } from "./Section";
import { useNow } from "@/lib/useNow";
import { AU_KM, C_KM_S, VOYAGER_1, VOYAGER_2, fmtDuration, snapshot, type Craft } from "@/lib/ephemeris";
import { INSTRUMENTS } from "@/lib/data";

type Unit = "km" | "mi" | "AU" | "light";

function fmtDist(km: number, unit: Unit) {
  if (unit === "km") return `${Math.floor(km).toLocaleString("en-US")} km`;
  if (unit === "mi") return `${Math.floor(km / 1.609344).toLocaleString("en-US")} mi`;
  if (unit === "AU") return `${(km / AU_KM).toFixed(6)} AU`;
  return `${(km / C_KM_S / 3600).toFixed(5)} light‑hours`;
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
      <div className="tabular mt-1 font-mono text-base font-semibold sm:text-lg" style={{ color: accent }}>{value}</div>
    </div>
  );
}

function CraftCard({ c, unit, now }: { c: Craft; unit: Unit; now: number }) {
  const s = snapshot(c, now);
  const on = INSTRUMENTS.filter((i) => (c.id === "v1" ? i.v1On : i.v2On));
  const pct = (s.power / 470) * 100;
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-30 blur-3xl" style={{ background: c.color }} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">{c.name}</h3>
          <span className="rounded-full px-3 py-1 text-xs font-semibold text-black" style={{ background: c.color }}>INTERSTELLAR</span>
        </div>
        <div className="mt-4 text-xs uppercase tracking-wider text-slate-400">Distance from Earth</div>
        <div className="tabular font-mono text-3xl font-bold text-white sm:text-4xl">{fmtDist(s.earthKm, unit)}</div>
        <div className="mt-1 text-sm text-slate-400">From the Sun: <span className="tabular font-mono text-slate-200">{fmtDist(s.sunKm, unit)}</span></div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat label="Speed vs Sun" value={`${c.speedKmS.toFixed(2)} km/s`} accent={c.color} />
          <Stat label="Speed vs Earth (now)" value={`${s.rangeRate.toFixed(2)} km/s`} accent={c.color} />
          <Stat label="One‑way light time" value={fmtDuration(s.oneWayS)} accent={c.color} />
          <Stat label="Command round trip" value={fmtDuration(s.roundTripS)} accent={c.color} />
          <Stat label="Mission time" value={`${Math.floor(s.missionDays).toLocaleString()} days`} accent={c.color} />
          <Stat label="Speed (per hour)" value={`${Math.round(c.speedKmS * 3600).toLocaleString()} km/h`} accent={c.color} />
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>RTG electrical power (est.)</span>
            <span className="tabular font-mono text-slate-200">{s.power.toFixed(1)} W of 470 W</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.6 }}
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-lime-300" />
          </div>
        </div>

        <div className="mt-5">
          <div className="text-xs uppercase tracking-wider text-slate-400">Science instruments still on ({on.length} of 10)</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {INSTRUMENTS.map((i) => {
              const isOn = c.id === "v1" ? i.v1On : i.v2On;
              return (
                <span key={i.code} title={`${i.name}: ${c.id === "v1" ? i.v1 : i.v2}`}
                  className={`rounded-md px-2 py-1 font-mono text-xs ${isOn ? "bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/50" : "bg-white/5 text-slate-500 line-through"}`}>
                  {i.code}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveTelemetry() {
  const now = useNow(200);
  const [unit, setUnit] = useState<Unit>("km");
  return (
    <Section id="live" kicker="Live telemetry model" title={<>Where are they <span className="text-aurora">right now?</span></>}
      intro="Distances update in real time from a trajectory model calibrated to NASA's published figures. Notice the Earth-relative speed: it swings during the year because Earth itself orbits the Sun at ~30 km/s — sometimes moving toward the Voyagers, sometimes away.">
      <Reveal>
        <div className="mb-6 flex flex-wrap gap-2">
          {(["km", "mi", "AU", "light"] as Unit[]).map((u) => (
            <button key={u} onClick={() => setUnit(u)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${unit === u ? "bg-white text-black" : "glass text-slate-300 hover:text-white"}`}>
              {u === "light" ? "light‑hours" : u}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        {now ? (
          <>
            <Reveal><CraftCard c={VOYAGER_1} unit={unit} now={now} /></Reveal>
            <Reveal delay={0.1}><CraftCard c={VOYAGER_2} unit={unit} now={now} /></Reveal>
          </>
        ) : (
          <><div className="glass h-[560px] rounded-3xl" /><div className="glass h-[560px] rounded-3xl" /></>
        )}
      </div>

      <Reveal className="mt-10">
        <div className="glass overflow-x-auto rounded-3xl p-2 sm:p-4">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-400">
              <tr><th className="p-3">Instrument</th><th className="p-3 text-sky-300">Voyager 1</th><th className="p-3 text-pink-300">Voyager 2</th></tr>
            </thead>
            <tbody>
              {INSTRUMENTS.map((i) => (
                <tr key={i.code} className="border-t border-white/5">
                  <td className="p-3"><span className="font-mono text-white">{i.code}</span> <span className="text-slate-400">· {i.name}</span></td>
                  <td className={`p-3 ${i.v1On ? "font-semibold text-emerald-300" : "text-slate-400"}`}>{i.v1}</td>
                  <td className={`p-3 ${i.v2On ? "font-semibold text-emerald-300" : "text-slate-400"}`}>{i.v2}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-3 pb-2 pt-3 text-xs text-slate-500">Source: NASA Science, instrument table updated April 17, 2026. Power values are modelled estimates.</p>
        </div>
      </Reveal>
    </Section>
  );
}
