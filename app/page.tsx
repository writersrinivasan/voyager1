import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LiveTelemetry from "@/components/LiveTelemetry";
import SolarMap from "@/components/SolarMap";
import Physics from "@/components/Physics";
import Heliosphere from "@/components/Heliosphere";
import { Discoveries, Timeline, Politics, GoldenRecord } from "@/components/Story";
import Comparison from "@/components/Comparison";

export default function Home() {
  return (
    <main className="relative">
      <Starfield />
      <Nav />
      <Hero />
      <LiveTelemetry />
      <SolarMap />
      <Physics />
      <Heliosphere />
      <Discoveries />
      <Timeline />
      <Politics />
      <GoldenRecord />
      <Comparison />
      <footer className="mx-auto max-w-7xl px-4 pb-16 pt-8 text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6">
          <p className="font-semibold text-slate-300">Sources</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li><a className="underline hover:text-white" href="https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/" target="_blank" rel="noreferrer">NASA Science — Where are Voyager 1 and Voyager 2 now?</a> (light-day milestone, instrument status)</li>
            <li><a className="underline hover:text-white" href="https://science.nasa.gov/mission/voyager/" target="_blank" rel="noreferrer">NASA Voyager mission pages</a> and JPL mission history</li>
          </ul>
          <p className="mt-3">Live distances are computed in your browser from a straight-line escape model anchored to NASA&apos;s figures; small differences from NASA&apos;s own tracker are expected. Built with Next.js, Tailwind CSS and Framer Motion.</p>
        </div>
      </footer>
    </main>
  );
}
