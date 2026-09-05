"use client";

import { useEffect, useRef, useState } from "react";
import { A } from "@/lib/assets";
import { ChevronDown, Close, Mail, Menu } from "../ui/Icon";
import styles from "./Navbar.module.css";

const PAGES = [
  { label: "Home", href: "#" },
  { label: "New Patients", href: "#" },
  { label: "About Us", href: "#journey" },
  { label: "Contact Us", href: "#appointment" },
];

const LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#journey" },
  { label: "Doctors", href: "#appointment" },
  { label: "Pages", href: "#", children: PAGES },
  { label: "Blogs", href: "#blog" },
];

export function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Raw scroll events can fire far more often than the display refreshes
  // (especially on precision trackpads). Coalescing every tick into a
  // single rAF-scheduled check — and only calling setState when the
  // boolean actually flips — keeps this listener from running React's
  // render/commit cycle on every native scroll event.
  const stuckRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const check = () => {
      tickingRef.current = false;
      const next = window.scrollY > 80;
      if (next !== stuckRef.current) {
        stuckRef.current = next;
        setStuck(next);
      }
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  return (
    <>
      <header className={styles.header} data-stuck={stuck}>
        <div className={`container ${styles.inner}`}>
          <a className={styles.logo} href="#" aria-label="BrightSmile Dental Care home">
            <img
              className={styles.logoImg}
              src={A.logo}
              alt="BrightSmile Dental Care"
            />
          </a>

          <nav className={styles.nav} aria-label="Primary">
            {LINKS.map((link) => (
              <div
                key={link.label}
                className={styles.navItem}
                data-open={link.children ? openDropdown : undefined}
                onMouseEnter={() => link.children && setOpenDropdown(true)}
                onMouseLeave={() => link.children && setOpenDropdown(false)}
              >
                <a
                  className={styles.navLink}
                  href={link.href}
                  aria-haspopup={link.children ? "true" : undefined}
                  aria-expanded={link.children ? openDropdown : undefined}
                  onClick={(e) => {
                    if (!link.children) return;
                    e.preventDefault();
                    setOpenDropdown((v) => !v);
                  }}
                >
                  {link.label}
                  {link.children && <ChevronDown size={16} className={styles.caret} />}
                </a>

                {link.children && (
                  <div className={styles.dropdown}>
                    {link.children.map((child) => (
                      <a key={child.label} href={child.href}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <a className={styles.cta} href="#appointment">
            Get In Touch
            <span className={styles.ctaIcon}>
              <Mail size={20} />
            </span>
          </a>

          <button
            className={styles.burger}
            type="button"
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen((v) => !v)}
          >
            {sheetOpen ? <Close size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={styles.sheet} data-open={sheetOpen} aria-hidden={!sheetOpen}>
        {LINKS.map((link) => (
          <div key={link.label}>
            <a
              className={styles.sheetLink}
              href={link.href}
              onClick={() => setSheetOpen(false)}
            >
              {link.label}
            </a>
            {link.children && (
              <div className={styles.sheetSub}>
                {link.children.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    onClick={() => setSheetOpen(false)}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <a
          className={`${styles.cta} ${styles.sheetCta}`}
          href="#appointment"
          onClick={() => setSheetOpen(false)}
          style={{ display: "inline-flex", alignSelf: "flex-start" }}
        >
          Get In Touch
          <span className={styles.ctaIcon}>
            <Mail size={20} />
          </span>
        </a>
      </div>
    </>
  );
}
