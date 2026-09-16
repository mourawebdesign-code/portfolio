"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NAV, HERO, BRAND } from "@/lib/content";
import { onAnchorClick } from "@/lib/scroll";
import s from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={s.inner}>
        <a href="#top" className={s.logo} aria-label={`Página inicial — ${BRAND.name}`} onClick={onAnchorClick}>
          <Image
            src="/images/lumea/Logo.png"
            alt={BRAND.name}
            width={1774}
            height={887}
            priority
            quality={100}
            className={s.logoMark}
          />
        </a>

        <nav className={s.nav} aria-label="Navegação principal">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className={s.link} onClick={onAnchorClick}>{n.label}</a>
          ))}
        </nav>

        <a href="#visit" className={`btn btn-primary ${s.cta}`} onClick={onAnchorClick}>{HERO.primary}</a>

        <button
          className={s.burger}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? s.barTop : ""} />
          <span className={open ? s.barMid : ""} />
          <span className={open ? s.barBot : ""} />
        </button>
      </div>

      <div className={`${s.mobile} ${open ? s.mobileOpen : ""}`}>
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className={s.mobileLink}
            onClick={(e) => { onAnchorClick(e); setOpen(false); }}
          >
            {n.label}
          </a>
        ))}
        <a
          href="#visit"
          className="btn btn-primary"
          onClick={(e) => { onAnchorClick(e); setOpen(false); }}
        >
          {HERO.primary}
        </a>
      </div>
    </header>
  );
}
