"use client";
import { useEffect, useMemo, useState } from "react";

type BP = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const queries: Record<Exclude<BP, "base">, string> = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

export function useBreakpoint(): BP {
  const getBP = () => {
    if (typeof window === "undefined") return "base";
    if (window.matchMedia(queries["2xl"]).matches) return "2xl";
    if (window.matchMedia(queries.xl).matches) return "xl";
    if (window.matchMedia(queries.lg).matches) return "lg";
    if (window.matchMedia(queries.md).matches) return "md";
    if (window.matchMedia(queries.sm).matches) return "sm";
    return "base";
  };

  const [bp, setBp] = useState<BP>(() => getBP());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqs = Object.entries(queries).map(([k, q]) => ({
      key: k as Exclude<BP, "base">,
      mql: window.matchMedia(q),
    }));

    let t: number | undefined;
    const onChange = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setBp(getBP()), 80); // 轻节流
    };

    mqs.forEach(({ mql }) => mql.addEventListener("change", onChange));
    return () => {
      mqs.forEach(({ mql }) => mql.removeEventListener("change", onChange));
      window.clearTimeout(t);
    };
  }, []);

  return bp;
}
