"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";

export const NAV_LINKS = [
  { label: "Filosofia", href: "/#filosofia" },
  { label: "Tratamentos", href: "/#tratamentos" },
  { label: "Especialista", href: "/#especialista" },
  { label: "Resultados", href: "/#resultados" },
];

/** How much of the fixed header's own height counts as "still on the hero". */
const HEADER_ZONE = 96;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    // Compares the hero's own bottom edge against the header's height
    // directly, rather than leaning on rootMargin sign conventions — the
    // condition this way is unambiguous regardless of how the observer's
    // root box is computed.
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(entry.boundingClientRect.bottom <= HEADER_ZONE),
      { threshold: [0, 0.01, 0.5, 0.99, 1] },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        aria-hidden={scrolled}
      >
        <div className={styles.row}>
          <div className={styles.side} aria-hidden="true" />

          <nav className={styles.nav}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                className={styles.link}
                href={l.href}
                tabIndex={scrolled ? -1 : 0}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className={`${styles.side} ${styles.sideRight}`}>
            <button
              className={styles.burger}
              aria-label="Abrir menu"
              aria-expanded={open}
              tabIndex={scrolled ? -1 : 0}
              onClick={() => setOpen(true)}
            >
              <span className={styles.burgerBars} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
