"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Specialist.module.css";
import Reveal from "./Reveal";

/** Local, single-purpose reveal for the photo: clip-path + opacity, which
    the shared Reveal component (translate + opacity only) doesn't do. Kept
    local rather than extending Reveal so no other section's motion changes. */
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

export default function Specialist() {
  const [mediaRef, mediaShown] = useInView<HTMLDivElement>(0.15);

  return (
    <section className={styles.section} id="especialista">
      <div className={styles.inner}>
        <div className={`${styles.mediaCol} ${styles.photoArea}`}>
          <div
            ref={mediaRef}
            className={`${styles.media} ${mediaShown ? styles.mediaShown : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/organic/specialist/retrato.png" alt="Dra. Helena Valença" />
          </div>
        </div>

        <div className={styles.content}>
          <div className={`${styles.contentBlock} ${styles.headArea}`}>
            <Reveal trigger="scroll" distance={10}>
              <p className={styles.eyebrow}>Especialista</p>
            </Reveal>

            <Reveal trigger="scroll" distance={16} delay={0.06}>
              <h2 className={styles.name}>Dra. Helena Valença</h2>
            </Reveal>

            <Reveal trigger="scroll" distance={10} delay={0.1}>
              <p className={styles.role}>
                Biomédica Esteta · Especialista em Harmonização Facial
              </p>
            </Reveal>
          </div>

          <div className={`${styles.contentBlock} ${styles.restArea}`}>
            <div className={styles.bio}>
              <Reveal trigger="scroll" distance={12} delay={0.14}>
                <p>
                  Há mais de uma década, Helena Valença constrói sua
                  trajetória na estética a partir do estudo das proporções,
                  da anatomia facial e da individualidade de cada paciente.
                </p>
              </Reveal>
              <Reveal trigger="scroll" distance={12} delay={0.2}>
                <p>
                  Formada em Biomedicina e pós-graduada em Biomedicina
                  Estética, aprofundou sua atuação em harmonização facial e
                  técnicas avançadas de rejuvenescimento. À frente da AURÉA,
                  reúne essa trajetória em uma prática marcada por técnica
                  apurada, olhar individual e escolhas feitas com intenção.
                </p>
              </Reveal>
            </div>

            <Reveal trigger="scroll" distance={10} delay={0.32}>
              <div className={styles.credentials}>
                <div className={styles.credItem}>
                  <p className={styles.credValue}>12 anos</p>
                  <p className={styles.credLabel}>de atuação em estética</p>
                </div>
                <div className={styles.credItem}>
                  <p className={styles.credValue}>3.800+</p>
                  <p className={styles.credLabel}>pacientes atendidos</p>
                </div>
                <div className={styles.credItem}>
                  <p className={styles.credValue}>Pós-graduação</p>
                  <p className={styles.credLabel}>em Biomedicina Estética</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
