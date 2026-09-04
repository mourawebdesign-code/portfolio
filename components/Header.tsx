"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { ButtonLink } from "./ui/Button";
import { Close, Menu } from "./ui/Icons";
import { nav, site } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);

  // trava o scroll do corpo enquanto o menu mobile estiver aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // fecha ao voltar para desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 960px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label={`${site.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logoImage}
            src="/images/volterra/logo.webp"
            width={800}
            height={267}
            alt={site.name}
          />
        </a>

        <div className={styles.right}>
          <nav aria-label="Main">
            <ul className={styles.navList}>
              {nav.map((item) => (
                <li key={item.href}>
                  <a className={styles.navLink} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ButtonLink href="#quote">{site.ctaPrimary}</ButtonLink>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
      >
        <div className={styles.panelInner}>
          <nav aria-label="Mobile">
            <ul className={styles.panelList}>
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    className={styles.panelLink}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink
            href="#quote"
            block
            className={styles.panelCta}
            onClick={() => setOpen(false)}
          >
            {site.ctaPrimary}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
