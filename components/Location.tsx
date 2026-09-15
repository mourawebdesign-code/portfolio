"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Location.module.css";
import Reveal from "./Reveal";

const ADDRESS_QUERY = "Rua das Palmeiras, 482, Jardins, São Paulo, SP";
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`;
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`;

/** Local width-reveal for the single divider rule (scaleX 0→1) — the shared
    Reveal component only does opacity/translateY/uniform-scale. */
function RuleReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={`${styles.rule} ${shown ? styles.ruleShown : ""}`} aria-hidden="true" />;
}

export default function Location() {
  return (
    <section className={styles.section} id="localizacao">
      <div className={styles.inner}>
        <div className={styles.content}>
          <Reveal trigger="scroll" distance={10}>
            <p className={styles.eyebrow}>Localização</p>
          </Reveal>

          <Reveal trigger="scroll" distance={14} delay={0.05}>
            <h2 className={styles.title}>
              Um espaço pensado
              <br />
              para receber você.
            </h2>
          </Reveal>

          <Reveal trigger="scroll" distance={10} delay={0.1} className={styles.intro}>
            No coração dos Jardins, um espaço pensado para receber você com
            conforto, privacidade e tranquilidade.
          </Reveal>

          <RuleReveal />

          <Reveal trigger="scroll" distance={10} delay={0.15} className={styles.infoRow}>
            <div>
              <p className={styles.label}>Endereço</p>
              <p className={styles.brand}>AURÉA</p>
              <p className={styles.value}>
                Rua das Palmeiras, 482
                <br />
                Jardins · São Paulo, SP
              </p>
              <a
                className={styles.link}
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Como chegar <span className={styles.arrow}>↗</span>
              </a>
            </div>

            <div>
              <p className={styles.label}>Horário</p>
              <p className={styles.value}>
                Segunda a sexta · 9h às 19h
                <br />
                Sábado · 9h às 14h
              </p>
            </div>
          </Reveal>
        </div>

        <div className={styles.mapCol}>
          <Reveal trigger="scroll" scaleFrom={0.98} delay={0.12} className={styles.mapReveal}>
            <div className={styles.mapFrame}>
              <iframe
                className={styles.mapIframe}
                src={MAPS_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da AURÉA no Google Maps"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
