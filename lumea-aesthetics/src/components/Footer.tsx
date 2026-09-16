"use client";
import Image from "next/image";
import { FOOTER, BRAND } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import { onAnchorClick } from "@/lib/scroll";
import s from "./Footer.module.css";

export default function Footer() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={`${s.top} ${visible ? s.visible : ""}`} ref={ref}>
          <div className={s.brand} data-reveal>
            <Image
              src="/images/lumea/Logo.png"
              alt={BRAND.name}
              width={1774}
              height={887}
              quality={100}
              className={s.logo}
            />
            <p className={s.headline}>
              {FOOTER.headline[0]}
              <br />
              <span className={s.headlineAccent}>{FOOTER.headline[1]}</span>
            </p>
            <p className={s.address}>{FOOTER.address}</p>
          </div>

          <div className={s.navGroup}>
            <div className={s.col} data-reveal style={{ ["--i" as string]: 1 }}>
              <h3 className={s.colHeading}>Explorar</h3>
              <nav className={s.colLinks} aria-label="Navegação do rodapé">
                {FOOTER.exploreLinks.map((l) => (
                  <a key={l.label} href={l.href} className={s.link} onClick={onAnchorClick}>{l.label}</a>
                ))}
              </nav>
            </div>

            <div className={s.col} data-reveal style={{ ["--i" as string]: 2 }}>
              <h3 className={s.colHeading}>Para pacientes</h3>
              <nav className={s.colLinks} aria-label="Links para pacientes">
                {FOOTER.patientLinks.map((l) => (
                  <a key={l.label} href={l.href} className={s.link} onClick={onAnchorClick}>{l.label}</a>
                ))}
              </nav>
            </div>

            <div className={s.col} data-reveal style={{ ["--i" as string]: 3 }}>
              <h3 className={s.colHeading}>Contato</h3>
              <div className={s.colLinks}>
                <a href={`tel:${FOOTER.phone.replace(/[^\d+]/g, "")}`} className={s.link}>
                  {FOOTER.phone}
                </a>
                <a href={`mailto:${FOOTER.email}`} className={s.link}>
                  {FOOTER.email}
                </a>
                {FOOTER.social.map((l) => (
                  <a key={l.label} href={l.href} className={s.link}>{l.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={s.divider} />

        <div className={s.bottom}>
          <span className={s.copy}>{FOOTER.copyright}</span>
          <div className={s.legal}>
            {FOOTER.legalLinks.map((l, i) => (
              <span key={l.label} className={s.legalItem}>
                {i > 0 && <span className={s.dot} aria-hidden="true">·</span>}
                <a href={l.href} className={s.legalLink}>{l.label}</a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
