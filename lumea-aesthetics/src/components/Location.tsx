"use client";
import { LOCATION } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import s from "./Location.module.css";

/**
 * 12 — Localização. Sem fotografia: o Google Maps (embed real, sem API key)
 * é o protagonista visual da seção, ao lado de uma coluna editorial com
 * endereço/horário/rota separados por divisores finos — não cards.
 */
export default function Location() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const addressQuery = encodeURIComponent(LOCATION.address.replace(/\n/g, ", "));
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${addressQuery}&output=embed`;

  return (
    <section className={s.section}>
      <div className={`${s.grid} ${visible ? s.visible : ""}`} ref={ref}>
        <div className={s.copy} data-reveal>
          <span className="eyebrow">{LOCATION.eyebrow}</span>
          <h2 className={s.heading}>
            <span className={s.line}>{LOCATION.headingLine1}</span>
            <span className={s.line}>
              {LOCATION.headingLine2Pre}
              <span className={s.highlight}>{LOCATION.headingLine2Highlight}</span>
            </span>
          </h2>
          <p className={s.intro}>{LOCATION.intro}</p>

          <div className={s.info}>
            <div className={s.infoBlock}>
              <span className={s.infoLabel}>{LOCATION.addressLabel}</span>
              <p className={s.infoText} style={{ whiteSpace: "pre-line" }}>{LOCATION.address}</p>
            </div>
            <div className={s.divider} />
            <div className={s.infoBlock}>
              <span className={s.infoLabel}>{LOCATION.hoursLabel}</span>
              {LOCATION.hours.map((h) => (
                <p key={h} className={s.infoText}>{h}</p>
              ))}
            </div>
            <div className={s.divider} />
            <div className={s.ctaRow}>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={s.cta}>
                <span className={s.ctaLabel}>
                  {LOCATION.cta}
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={s.ctaLine} aria-hidden="true" />
              </a>
              <span className={s.geo}>
                {LOCATION.geo.map((l) => <span key={l}>{l}</span>)}
              </span>
            </div>
          </div>
        </div>

        <div className={s.mapWrap} data-reveal>
          <iframe
            className={s.map}
            src={mapEmbedSrc}
            title={`Mapa — ${LOCATION.address.replace(/\n/g, ", ")}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
