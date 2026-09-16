"use client";
import { useEffect } from "react";
import { setLenisInstance } from "./scroll";

/** Smooth scroll — a referência usa Lenis no root. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      setLenisInstance(lenis as unknown as { scrollTo: (target: Element | string, opts?: Record<string, unknown>) => void });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      setLenisInstance(null);
      lenis?.destroy();
    };
  }, []);
}
