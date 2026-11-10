"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#ffffff", "#bae6fd", "#ddd6fe", "#fbcfe8", "#fde68a"];

/** Full-screen warp-style starfield that drifts and twinkles; reacts to scroll speed. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, boost = 0, lastY = window.scrollY;
    const N = Math.min(900, Math.floor((window.innerWidth * window.innerHeight) / 2200));
    const stars = Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.random(),
      c: COLORS[Math.floor(Math.random() * COLORS.length)], tw: Math.random() * Math.PI * 2,
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onScroll = () => { boost = Math.min(boost + Math.abs(window.scrollY - lastY) * 0.0004, 0.05); lastY = window.scrollY; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.fillStyle = "rgba(5,3,15,0.35)";
      ctx.fillRect(0, 0, w, h);
      const speed = (reduce ? 0 : 0.0009) + boost;
      boost *= 0.94;
      for (const s of stars) {
        s.z -= speed;
        if (s.z <= 0.01) { s.z = 1; s.x = (Math.random() - 0.5) * 2; s.y = (Math.random() - 0.5) * 2; }
        const k = 0.5 / s.z;
        const px = w / 2 + s.x * k * w * 0.5, py = h / 2 + s.y * k * h * 0.5;
        if (px < 0 || px > w || py < 0 || py > h) continue;
        const r = Math.max(0.3, (1 - s.z) * 2.2);
        ctx.globalAlpha = (0.55 + 0.45 * Math.sin(t * 2 + s.tw)) * (1 - s.z * 0.6);
        ctx.fillStyle = s.c;
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
