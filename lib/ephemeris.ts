// Lightweight position model for Voyager 1 & 2.
// Each spacecraft is modelled on a straight-line (asymptotic hyperbolic) escape path
// from the Sun, and Earth on a slightly eccentric orbit. That is accurate to well
// under 0.1% for display purposes.
//
// Calibration anchor (NASA, science.nasa.gov "Where are Voyager 1 and 2 now?"):
// Voyager 1 will be 25.902 billion km from Earth (one light-day) on
// 2026-11-18 at 02:16:07 PST (10:16:07 UTC).

export const AU_KM = 149_597_870.7;
export const C_KM_S = 299_792.458;
export const KM_PER_MILE = 1.609344;
const DEG = Math.PI / 180;
const DAY_MS = 86_400_000;
const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);

export const LIGHT_DAY_KM = C_KM_S * 86_400; // 25.902 billion km
export const LIGHT_DAY_MOMENT = Date.UTC(2026, 10, 18, 10, 16, 7);

type Vec = [number, number, number];

function unit(lonDeg: number, latDeg: number): Vec {
  const lon = lonDeg * DEG, lat = latDeg * DEG;
  return [Math.cos(lat) * Math.cos(lon), Math.cos(lat) * Math.sin(lon), Math.sin(lat)];
}
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** Earth's heliocentric position in km (ecliptic frame). */
export function earthPos(t: number): Vec {
  const n = (t - J2000) / DAY_MS;
  const g = (357.528 + 0.9856003 * n) * DEG;
  const L = (280.46 + 0.9856474 * n + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * DEG;
  const r = (1.00014 - 0.01671 * Math.cos(g) - 0.00014 * Math.cos(2 * g)) * AU_KM;
  const lon = L + Math.PI; // heliocentric = geocentric Sun longitude + 180°
  return [r * Math.cos(lon), r * Math.sin(lon), 0];
}

/** Earth's heliocentric ecliptic longitude in degrees (for drawing). */
export function earthLongitude(t: number): number {
  const e = earthPos(t);
  return ((Math.atan2(e[1], e[0]) / DEG) % 360 + 360) % 360;
}

export interface Craft {
  id: "v1" | "v2";
  name: string;
  launch: number;
  speedKmS: number; // heliocentric speed
  dir: Vec; // asymptotic direction (ecliptic J2000)
  lon: number;
  lat: number;
  anchorT: number;
  anchorSunKm: number;
  color: string;
}

function makeCraft(
  id: "v1" | "v2", name: string, launch: number, speedKmS: number,
  lon: number, lat: number, anchorT: number, anchorSunKm: number, color: string,
): Craft {
  return { id, name, launch, speedKmS, dir: unit(lon, lat), lon, lat, anchorT, anchorSunKm, color };
}

// Solve the heliocentric distance d so that |d·u − earth| equals the NASA Earth distance.
function solveSunDistance(u: Vec, t: number, earthDistKm: number) {
  const e = earthPos(t);
  const ue = dot(u, e);
  return ue + Math.sqrt(ue * ue - dot(e, e) + earthDistKm * earthDistKm);
}

const V1_DIR = unit(256.0, 35.0);
export const VOYAGER_1 = makeCraft(
  "v1", "Voyager 1", Date.UTC(1977, 8, 5, 12, 56), 16.99, 256.0, 35.0,
  LIGHT_DAY_MOMENT, solveSunDistance(V1_DIR, LIGHT_DAY_MOMENT, LIGHT_DAY_KM), "#38bdf8",
);
// Voyager 2 anchored to ≈144.6 AU from the Sun on the same date (JPL Horizons-derived estimate).
export const VOYAGER_2 = makeCraft(
  "v2", "Voyager 2", Date.UTC(1977, 7, 20, 14, 29), 15.37, 290.2, -36.2,
  LIGHT_DAY_MOMENT, 144.6 * AU_KM, "#f472b6",
);

export function sunDistanceKm(c: Craft, t: number) {
  return c.anchorSunKm + c.speedKmS * ((t - c.anchorT) / 1000);
}

export function earthDistanceKm(c: Craft, t: number) {
  const d = sunDistanceKm(c, t);
  const e = earthPos(t);
  const p: Vec = [c.dir[0] * d - e[0], c.dir[1] * d - e[1], c.dir[2] * d - e[2]];
  return Math.sqrt(dot(p, p));
}

/** Rate of change of the Earth–spacecraft distance (km/s). Varies with Earth's orbit. */
export function earthRangeRate(c: Craft, t: number) {
  const dt = 3600_000;
  return (earthDistanceKm(c, t + dt) - earthDistanceKm(c, t - dt)) / (2 * dt / 1000);
}

/** Approximate RTG electrical output (W). ~470 W at launch, decaying ~1.5%/yr
 *  (Pu-238 decay plus thermocouple degradation). */
export function rtgWatts(t: number, launch = VOYAGER_1.launch) {
  const yrs = (t - launch) / (365.25 * DAY_MS);
  return 470 * Math.exp(-0.01512 * yrs);
}

export function snapshot(c: Craft, t: number) {
  const earthKm = earthDistanceKm(c, t);
  const sunKm = sunDistanceKm(c, t);
  const oneWayS = earthKm / C_KM_S;
  return {
    earthKm,
    sunKm,
    earthAU: earthKm / AU_KM,
    sunAU: sunKm / AU_KM,
    earthMiles: earthKm / KM_PER_MILE,
    oneWayS,
    roundTripS: oneWayS * 2,
    rangeRate: earthRangeRate(c, t),
    missionDays: (t - c.launch) / DAY_MS,
    power: rtgWatts(t, c.launch),
  };
}

export function fmtDuration(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return `${h}h ${String(m).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`;
}
