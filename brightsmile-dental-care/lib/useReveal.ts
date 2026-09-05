"use client";

import { useEffect } from "react";

/**
 * Adds `data-reveal="in"` to every `[data-reveal]` node once it enters the
 * viewport. Elements stay revealed afterwards — the reference never replays
 * its entrance animations on scroll-up.
 *
 * `will-change` is applied to each element only for the moment it's actually
 * transitioning (set right before the opacity/transform change, removed on
 * `transitionend`), instead of sitting on every not-yet-revealed element for
 * the whole time it's below the fold — that would promote dozens of layers
 * that are just waiting, doing nothing.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.setAttribute("data-reveal", "in"));
      return;
    }

    const clearWillChange = (el: HTMLElement) => {
      el.style.willChange = "";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;

          el.style.willChange = "opacity, transform";
          el.addEventListener("transitionend", () => clearWillChange(el), {
            once: true,
          });
          // Belt-and-braces: if the transition never fires (e.g. the tab
          // was backgrounded mid-animation), don't leave the layer promoted.
          window.setTimeout(() => clearWillChange(el), 1200);

          el.setAttribute("data-reveal", "in");
          observer.unobserve(el);
        });
      },
      // Fire a little before the element reaches the centre of the
      // viewport — roughly the first 10-15% of it coming into view.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}
