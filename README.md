# Voyager Odyssey

A colorful, animated Next.js web app about NASA's Voyager 1 and 2: live distance model, physics and astrophysics explainers, mission history, politics, the Golden Record, and comparisons with other spacecraft.

Data reference: [NASA — Where are Voyager 1 and Voyager 2 now?](https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/)

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Stack

Next.js 15 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · Framer Motion

## Structure

- `app/` — layout, global styles, page
- `components/` — page sections (hero, live telemetry, trajectory map, physics, heliosphere, story, comparison)
- `lib/ephemeris.ts` — distance/light-time/power model, calibrated to NASA's one-light-day milestone (Nov 18, 2026)
- `lib/data.ts` — content: instruments, timeline, politics, discoveries, spacecraft comparisons

Live distances are computed in the browser from a straight-line escape model; RTG power and Voyager 2's distance are estimates.
