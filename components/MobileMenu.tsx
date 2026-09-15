"use client";

import { useEffect } from "react";
import styles from "./MobileMenu.module.css";
import ArrowIcon from "./ArrowIcon";
import { NAV_LINKS } from "./Header";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={[styles.overlay, open && styles.open].filter(Boolean).join(" ")}
      aria-hidden={!open}
    >
      <div className={styles.top}>
        <span className={styles.wordmark}>AURÉA</span>
        <button className={styles.close} aria-label="Close menu" onClick={onClose}>
          <i />
          <i />
        </button>
      </div>

      <nav className={styles.links}>
        {NAV_LINKS.map((l) => (
          <a key={l.label} className={styles.link} href={l.href} onClick={onClose}>
            {l.label}
          </a>
        ))}
      </nav>

      <a className={styles.cta} href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
        Agendar avaliação
        <ArrowIcon />
      </a>
    </div>
  );
}
