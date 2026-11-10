// Content for the Voyager Odyssey app.
// Instrument status: NASA "Where are Voyager 1 and Voyager 2 now?" (table updated April 17, 2026).

export type Instrument = { code: string; name: string; v1: string; v2: string; v1On: boolean; v2On: boolean };

export const INSTRUMENTS: Instrument[] = [
  { code: "MAG", name: "Magnetometer", v1: "On", v2: "On", v1On: true, v2On: true },
  { code: "PWS", name: "Plasma Wave Subsystem", v1: "On", v2: "On", v1On: true, v2On: true },
  { code: "CRS", name: "Cosmic Ray Subsystem", v1: "Off to save power · Feb 25, 2025", v2: "On", v1On: false, v2On: true },
  { code: "LECP", name: "Low-Energy Charged Particles", v1: "Off to save power · Apr 17, 2026", v2: "Off to save power · Mar 24, 2025", v1On: false, v2On: false },
  { code: "PLS", name: "Plasma Science", v1: "Degraded · Feb 1, 2007", v2: "Off to save power · Sep 26, 2024", v1On: false, v2On: false },
  { code: "ISS", name: "Imaging Science (cameras)", v1: "Off · Feb 14, 1990", v2: "Off · Oct 10 & Dec 5, 1989", v1On: false, v2On: false },
  { code: "IRIS", name: "Infrared Interferometer Spectrometer", v1: "Off · Jun 3, 1998", v2: "Off · Feb 1, 2007", v1On: false, v2On: false },
  { code: "PPS", name: "Photopolarimeter", v1: "Degraded · Jan 29, 1980", v2: "Degraded · Apr 3, 1991", v1On: false, v2On: false },
  { code: "PRA", name: "Planetary Radio Astronomy", v1: "Off · Jan 15, 2008", v2: "Off · Feb 21, 2008", v1On: false, v2On: false },
  { code: "UVS", name: "Ultraviolet Spectrometer", v1: "Off · Apr 19, 2016", v2: "Off · Nov 12, 1998", v1On: false, v2On: false },
];

export type Era = "mission" | "politics" | "engineering" | "science";

export const TIMELINE: { year: string; date?: string; title: string; text: string; era: Era }[] = [
  { year: "1964", title: "A rare planetary lineup", era: "science", text: "JPL intern Gary Flandro calculates that Jupiter, Saturn, Uranus and Neptune will line up in the late 1970s — an alignment that happens about once every 175 years — letting one probe hop between all four using gravity assists." },
  { year: "1969–71", title: "The 'Grand Tour' is born", era: "politics", text: "NASA plans a Grand Tour of four (later five) Thermoelectric Outer Planets Spacecraft (TOPS). Estimated cost: close to $1 billion — at the same time Apollo, Skylab and the Space Shuttle compete for funds." },
  { year: "1972", title: "Grand Tour cancelled", era: "politics", text: "Facing post‑Apollo budget cuts under President Nixon, Congress and NASA cancel TOPS. A cheaper replacement is approved: Mariner Jupiter‑Saturn 1977 (MJS77) — officially only two planets, quietly designed so that a tour could continue." },
  { year: "1977", date: "Mar", title: "Renamed 'Voyager'", era: "mission", text: "MJS77 is renamed Voyager. Carl Sagan's committee assembles the Golden Record in roughly six weeks." },
  { year: "1977", date: "Aug 20", title: "Voyager 2 launches first", era: "mission", text: "Titan IIIE‑Centaur from Cape Canaveral. It launches first but on a slower path — hence the 'out-of-order' numbering." },
  { year: "1977", date: "Sep 5", title: "Voyager 1 launches", era: "mission", text: "On a faster trajectory, Voyager 1 overtakes its twin in December 1977 within the asteroid belt." },
  { year: "1979", date: "Mar 5 / Jul 9", title: "Jupiter encounters", era: "science", text: "Active volcanoes on Io (the first seen beyond Earth), a faint ring around Jupiter, and a fractured icy crust on Europa that hints at a hidden ocean." },
  { year: "1980", date: "Nov 12", title: "Voyager 1 at Saturn & Titan", era: "science", text: "Voyager 1 trades a Pluto option for a close pass of Titan's thick nitrogen atmosphere. The Titan flyby flings it up and out of the planets' plane." },
  { year: "1981", date: "Aug 25", title: "Voyager 2 at Saturn", era: "science", text: "Thousands of ringlets, spokes, braided F‑ring. Budget approval for the Uranus extension was not guaranteed until after this success." },
  { year: "1986", date: "Jan 24", title: "Voyager 2 at Uranus", era: "science", text: "The first and only visit. 10 new moons, 2 new rings, and a magnetic field tilted 59°. Four days later, Challenger's loss pushed the news off front pages." },
  { year: "1989", date: "Aug 25", title: "Voyager 2 at Neptune", era: "science", text: "The Great Dark Spot, 2,000 km/h winds — the fastest in the Solar System — and nitrogen geysers on Triton. The planetary 'Grand Tour' is done after all." },
  { year: "1990", date: "Feb 14", title: "Pale Blue Dot & Family Portrait", era: "mission", text: "At Sagan's urging and after internal resistance, Voyager 1 turns back to photograph six planets. Earth is 0.12 pixel. Minutes later the cameras are switched off forever to save power." },
  { year: "1990", title: "Voyager Interstellar Mission begins", era: "mission", text: "The mission is renamed and given a new goal: reach the edge of the Sun's influence." },
  { year: "1998", date: "Feb 17", title: "Most distant human object", era: "mission", text: "Voyager 1 passes Pioneer 10 at ~69 AU to become the most distant human-made object." },
  { year: "2004", date: "Dec", title: "V1 crosses the termination shock", era: "science", text: "At ~94 AU the solar wind abruptly slows from supersonic to subsonic." },
  { year: "2005", title: "Budget threat", era: "politics", text: "A NASA budget proposal aimed to end funding for several old missions, Voyager included. Scientific and public pushback kept it alive — a pattern repeated in later budget fights." },
  { year: "2007", date: "Aug", title: "V2 crosses the termination shock", era: "science", text: "At ~84 AU — closer than V1, proving the heliosphere is squashed and asymmetric." },
  { year: "2012", date: "Aug 25", title: "Voyager 1 enters interstellar space", era: "science", text: "At ~121.6 AU, cosmic rays from the galaxy jump and solar particles vanish. Confirmed in 2013 from plasma wave measurements of a jump in plasma density." },
  { year: "2018", date: "Nov 5", title: "Voyager 2 enters interstellar space", era: "science", text: "At ~119 AU. Its still-working plasma instrument directly measured the cold, dense interstellar plasma for the first time." },
  { year: "2020", date: "Mar–Oct", title: "DSS‑43 upgrade", era: "engineering", text: "The 70‑m dish in Canberra, Australia — the only antenna on Earth that can send commands to Voyager 2 in the southern sky — goes offline for upgrades. Voyager 2 runs on its own for 7 months." },
  { year: "2022–24", title: "The memory chip crisis", era: "engineering", text: "In Nov 2023, Voyager 1 begins sending gibberish. Engineers trace it to one failed chip in the Flight Data Subsystem, then split and relocate code around it — a 46-year-old computer patched from 24 billion km away. Science data returned in 2024." },
  { year: "2023", date: "Jul–Aug", title: "Voyager 2 'shout'", era: "engineering", text: "A wrong command tilts V2's antenna 2°. DSN 'shouts' a command at the highest power, timed perfectly, and Voyager 2 re-points itself." },
  { year: "2024–26", title: "Rationing power", era: "engineering", text: "Instruments are switched off to stretch the ever-shrinking RTG output: V2 PLS (2024), V1 CRS & V2 LECP (2025), V1 LECP (Apr 2026). Dormant roll thrusters on V1 were revived in 2025." },
  { year: "2026", date: "Nov 18", title: "One light‑day from Earth", era: "mission", text: "Voyager 1 becomes the first human-made object one light-day (25.902 billion km) from Earth. A radio signal takes a full 24 hours one way." },
];

export const POLITICS = [
  { icon: "🏛️", title: "Born from a budget cut", text: "Voyager exists because the $1-billion Grand Tour was killed in 1972. Engineers designed the 'cheap' two-planet MJS77 with enough margin, fuel and radiation hardening to quietly keep going. Each extension — Uranus, Neptune, the Interstellar Mission — had to be won in a new budget cycle." },
  { icon: "🌍", title: "Cold War, détente & a message for everyone", text: "Launched mid–Cold War, Voyager carried a message from US President Jimmy Carter and UN Secretary‑General Kurt Waldheim, plus greetings in 55 languages — deliberately framed as from all of humanity, not one nation. The Soviets were focused on Venus (Venera) and Mars; outer-planet exploration became a US scientific showcase." },
  { icon: "📀", title: "The Golden Record debates", text: "NASA refused a nude human drawing after the public backlash over Pioneer's plaque; it was replaced by a silhouette. The music selection — Bach to Chuck Berry, Navajo chant to Indian raga — sparked debates about who gets to represent Earth." },
  { icon: "🚀", title: "In the shadow of Challenger", text: "Voyager 2's Uranus discoveries (Jan 24, 1986) were overshadowed four days later by the Challenger disaster. The shuttle grounding then delayed Galileo and other planetary missions for years, making Voyager's data the only outer-planet science for over a decade." },
  { icon: "🤝", title: "An international lifeline", text: "Voyager depends on NASA's Deep Space Network: Goldstone (USA), Madrid (Spain) and Canberra (Australia). Only Canberra can command Voyager 2. Bilateral agreements made in the 1960s still keep humanity's farthest spacecraft talking." },
  { icon: "💸", title: "Funding vs. legacy", text: "Cost to the Neptune flyby: about $865 million (1989 dollars). Today a tiny team runs both craft on a small annual budget. Debates over cutting legacy missions to fund new ones recur, and Voyager is a frequent symbol in those fights." },
  { icon: "👩‍🔬", title: "Generational knowledge", text: "The spacecraft predate modern software. As original engineers retired, NASA dug through decades-old paper documents to fix faults — a lesson in long-term knowledge preservation now built into new missions." },
];

export const DISCOVERIES = [
  { planet: "Jupiter", year: "1979", gradient: "from-amber-300 via-orange-400 to-rose-500", facts: ["Active volcanoes on Io — first beyond Earth", "Thin ring system discovered", "Europa's cracked ice shell hints at an ocean", "Great Red Spot is a giant anticyclone storm", "Moons Thebe and Metis discovered"] },
  { planet: "Saturn", year: "1980–81", gradient: "from-yellow-200 via-amber-300 to-orange-400", facts: ["Thousands of ringlets, 'spokes' & a braided F‑ring", "Titan's thick nitrogen-rich atmosphere", "Shepherd moons guiding narrow rings", "Winds up to 1,800 km/h at the equator", "Hexagonal north polar jet stream"] },
  { planet: "Uranus", year: "1986", gradient: "from-cyan-200 via-teal-300 to-sky-400", facts: ["10 new moons, 2 new rings", "Magnetic field tilted 59° and offset from center", "Miranda: a patchwork 'Frankenstein' moon", "17-hour rotation measured", "Only spacecraft visit ever"] },
  { planet: "Neptune", year: "1989", gradient: "from-blue-400 via-indigo-500 to-violet-600", facts: ["Great Dark Spot storm system", "Fastest winds in the Solar System (~2,000 km/h)", "Nitrogen geysers on Triton", "6 new moons, complete ring arcs", "Only spacecraft visit ever"] },
];

export type Probe = {
  name: string; launch: number; distAU: number; speed: number; power: string; status: string; active: boolean; color: string; note: string;
};

// Distances are approximate values for late 2026.
export const PROBES: Probe[] = [
  { name: "Voyager 1", launch: 1977, distAU: 172.4, speed: 16.99, power: "3 RTGs (Pu‑238)", status: "Active", active: true, color: "#38bdf8", note: "Farthest human-made object; interstellar since 2012" },
  { name: "Voyager 2", launch: 1977, distAU: 144.6, speed: 15.37, power: "3 RTGs (Pu‑238)", status: "Active", active: true, color: "#f472b6", note: "Only visitor to Uranus & Neptune; interstellar since 2018" },
  { name: "Pioneer 10", launch: 1972, distAU: 137, speed: 12.0, power: "4 SNAP‑19 RTGs", status: "Silent (2003)", active: false, color: "#a78bfa", note: "First through the asteroid belt and to Jupiter" },
  { name: "Pioneer 11", launch: 1973, distAU: 116, speed: 11.1, power: "4 SNAP‑19 RTGs", status: "Silent (1995)", active: false, color: "#c084fc", note: "First to Saturn" },
  { name: "New Horizons", launch: 2006, distAU: 64, speed: 13.6, power: "1 GPHS‑RTG", status: "Active", active: true, color: "#34d399", note: "Fastest launch ever; Pluto 2015, Arrokoth 2019. Will never catch the Voyagers" },
];

export const SHIP_COMPARE = [
  { name: "Voyager 1/2", year: "1977", memory: "≈69 KB total", data: "160 bps now (115 kbps at Jupiter)", camera: "800×800 vidicon", power: "RTG, 470 W → ~225 W", note: "Still operating after 49 years" },
  { name: "Galileo", year: "1989", memory: "≈384 KB", data: "~160 bps (antenna failed to open)", camera: "800×800 CCD", power: "RTG, 570 W", note: "First Jupiter orbiter; deorbited 2003" },
  { name: "Cassini", year: "1997", memory: "≈2 GB solid-state recorder", data: "up to 166 kbps", camera: "1024×1024 CCD", power: "3 RTGs, 885 W", note: "13 years at Saturn; 'Grand Finale' 2017" },
  { name: "New Horizons", year: "2006", memory: "2×8 GB flash", data: "~1–2 kbps from Kuiper Belt", camera: "LORRI 1024×1024", power: "RTG, 245 W → ~180 W", note: "Pluto in 2015" },
  { name: "Juno", year: "2011", memory: "Radiation‑vaulted electronics", data: "up to ~40 kbps", camera: "JunoCam (color)", power: "Solar, ~500 W at Jupiter", note: "Solar power at Jupiter — impossible in Voyager's era" },
  { name: "Parker Solar Probe", year: "2018", memory: "Autonomous fault protection", data: "up to 555 kbps", camera: "WISPR imager", power: "Solar, water-cooled", note: "Fastest object ever: ~192 km/s at perihelion" },
  { name: "JWST", year: "2021", memory: "68 GB SSR", data: "28 Mbps (Ka‑band)", camera: "Infrared 2048² detectors", power: "Solar, 2 kW", note: "Sits at L2, 1.5 million km away" },
  { name: "Psyche (DSOC test)", year: "2023", memory: "Modern flight computer", data: "Laser: up to 267 Mbps", camera: "Multispectral imager", power: "Solar + Hall-effect ion thrusters", note: "Optical comms from deep space" },
];

export const IMPROVEMENTS = [
  { title: "Computing", from: "3 computers, ~69 KB memory, 8-track digital tape", to: "Gigabytes of radiation-hardened flash, multicore CPUs", icon: "🧠" },
  { title: "Communications", from: "X-band radio, 22.4 W, 3.7 m dish", to: "Ka-band and laser optical links (DSOC) — 1000× more data", icon: "📡" },
  { title: "Imaging", from: "Vidicon tubes, 0.64 megapixel", to: "CCD/CMOS sensors, IR detectors like JWST", icon: "📷" },
  { title: "Propulsion", from: "Hydrazine thrusters + one-shot launch energy", to: "Ion engines (Dawn, Psyche), solar sails", icon: "🔥" },
  { title: "Power", from: "MHW-RTGs, ~470 W", to: "MMRTGs (Curiosity, Perseverance), large solar arrays far out (Juno)", icon: "⚡" },
  { title: "Autonomy", from: "Command sequences uploaded from Earth", to: "On-board AI navigation and hazard avoidance", icon: "🤖" },
];

export const PHYSICS_FACTS = [
  { label: "Launch mass", value: "≈722 kg", sub: "each (without propulsion module)" },
  { label: "Transmitter power", value: "22.4 W", sub: "about a fridge light bulb" },
  { label: "High-gain antenna", value: "3.7 m", sub: "dish, points at Earth" },
  { label: "Data rate now", value: "160 bps", sub: "slower than a 1990s modem" },
  { label: "Signal at Earth", value: "~10⁻¹⁹ W", sub: "collected by a 70 m dish" },
  { label: "Temperature outside", value: "≈ −270 °C", sub: "heaters keep electronics warm" },
];
