"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Journey.module.css";
import Reveal from "./Reveal";
import { JOURNEY_STEPS } from "@/lib/journey";

/** Local reveal for the photo (clip-path + opacity) — mirrors the pattern
    used in Specialist/Results, kept local so no shared component changes. */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export default function Journey() {
  const [mediaRef, mediaShown] = useInView<HTMLDivElement>(0.15);

  return (
    <section className={styles.section} id="jornada">
      <div className={styles.inner}>
        <div className={`${styles.photoCol} ${styles.photoArea}`}>
          <div
            ref={mediaRef}
            className={`${styles.media} ${mediaShown ? styles.mediaShown : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/organic/journey/consulta.jpg"
              alt="Especialista conversando com paciente durante consulta inicial"
            />
          </div>
          <p className={styles.caption}>Tudo começa pela escuta.</p>
        </div>

        <div className={`${styles.textCol} ${styles.headArea}`}>
          <Reveal trigger="scroll" distance={10}>
            <p className={styles.eyebrow}>Jornada da paciente</p>
          </Reveal>
          <Reveal trigger="scroll" distance={16} delay={0.05}>
            <h2 className={styles.headline}>
              O cuidado começa
              <br />
              antes do procedimento.
            </h2>
          </Reveal>
        </div>

        <div className={`${styles.textCol} ${styles.introArea}`}>
          <Reveal trigger="scroll" distance={12} className={styles.intro}>
            <p>
              Cada atendimento começa entendendo o que você deseja, o que o
              seu rosto pede e o que realmente vale a pena fazer.
            </p>
            <p>
              Só depois dessa leitura construímos um plano individual, com
              decisões pensadas para preservar sua identidade e acompanhar
              sua evolução.
            </p>
          </Reveal>
        </div>

        <div className={`${styles.textCol} ${styles.stepsArea}`}>
          <div className={styles.timeline}>
            {JOURNEY_STEPS.map((s, i) => (
              <Reveal
                key={s.index}
                trigger="scroll"
                distance={14}
                delay={i * 0.07}
                className={styles.step}
              >
                <span className={styles.stepNum}>{s.index}</span>
                <span className={styles.stepBody}>
                  <span className={styles.stepTitle}>{s.title}</span>
                  <span className={styles.stepText}>{s.text}</span>
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal trigger="scroll" distance={6} delay={0.32}>
            <a
              className={styles.cta}
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer"
            >
              Agendar avaliação <span className={styles.arrow}>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
