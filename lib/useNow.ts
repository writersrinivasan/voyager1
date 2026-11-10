"use client";
import { useEffect, useState } from "react";

/** Current time, updated every `ms`. Returns null before mount to avoid hydration mismatch. */
export function useNow(ms = 100) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
