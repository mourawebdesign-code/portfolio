"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";
import Reveal from "./Reveal";

const EXPLORE = [
  { label: "Filosofia", href: "#filosofia" },
  { label: "Procedimentos", href: "#tratamentos" },
  { label: "Especialista", href: "#especialista" },
  { label: "Resultados", href: "#resultados" },
  { label: "Experiência", href: "#experiencia" },
];

const CONNECT = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Localização", href: "#localizacao" },
];

const LEGAL = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
];

const WORDMARK = "Luméa";

/** Sizes the wordmark's font-size so its rendered width fills the
    available container width almost exactly, without ever clipping a
    letter — guessing a clamp() for a fixed five-letter word is fragile
    across breakpoints, so this measures the real glyph width instead
    (at a fixed 100px probe size) and scales from that ratio. Re-runs on
    resize and once webfonts finish loading, since the probe measurement
    taken against a fallback font would otherwise under/over-shoot. */
function useFillWidth(min: number, max: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    function measure() {
      if (!container || !text) return;
      const prevFontSize = text.style.fontSize;
      text.style.fontSize = "100px";
      const naturalWidth = text.scrollWidth;
      text.style.fontSize = prevFontSize;
      if (!naturalWidth) return;
      const available = container.clientWidth;
      const size = Math.min(max, Math.max(min, (available / naturalWidth) * 100));
      setFontSize(size);
    }

    measure();
    document.fonts?.ready?.then(measure);

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [min, max]);

  return { containerRef, textRef, fontSize };
}

export default function Footer() {
  const { containerRef, textRef, fontSize } = useFillWidth(64, 460);

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <div className={styles.top}>
          <Reveal trigger="scroll" distance={18} className={styles.brandBlock}>
            <p className={styles.brandName}>Luméa</p>
            <p className={styles.tagline}>
              Estética que <span className={styles.taglineAccent}>preserva</span>
              <br />o que faz você ser você.
            </p>
            <p className={styles.city}>São Paulo, Brasil</p>
          </Reveal>

          <div className={styles.navCols}>
            <Reveal as="nav" trigger="scroll" distance={14} delay={0.06} className={styles.navCol}>
              <p className={styles.colLabel}>Explorar</p>
              {EXPLORE.map((l) => (
                <a className={styles.navLink} key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </Reveal>

            <Reveal as="nav" trigger="scroll" distance={14} delay={0.12} className={styles.navCol}>
              <p className={styles.colLabel}>Conecte-se</p>
              {CONNECT.map((l) => (
                <a
                  className={styles.navLink}
                  key={l.label}
                  href={l.href}
                  target={l.href === "#" ? undefined : "_blank"}
                  rel={l.href === "#" ? undefined : "noreferrer"}
                >
                  {l.label} <span className={styles.navArrow}>↗</span>
                </a>
              ))}
            </Reveal>
          </div>
        </div>

        <Reveal trigger="scroll" distance={20} delay={0.15}>
          <div ref={containerRef} className={styles.wordmark} aria-label={WORDMARK}>
            <span
              ref={textRef}
              className={styles.wordmarkText}
              style={fontSize ? { fontSize } : undefined}
              aria-hidden="true"
            >
              {WORDMARK}
            </span>
          </div>
        </Reveal>

        <div className={styles.legal}>
          <p>© 2026 Luméa Clínica Estética</p>
          <div className={styles.legalLinks}>
            {LEGAL.map((l) => (
              <a className={styles.legalLink} key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
