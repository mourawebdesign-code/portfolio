"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Results.module.css";
import ImageCompareSlider from "./ImageCompareSlider";
import { RESULT_CASES, type ResultCase } from "@/lib/results";

/** Local reveal (translateY + opacity, own timing/easing) rather than the
    shared Reveal component, so this section can use the exact 700–900ms
    premium timing it needs without changing any other section's motion. */
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

function Case({
  data,
  reverse,
}: {
  data: ResultCase;
  reverse: boolean;
}) {
  const [mediaRef, mediaShown] = useInView<HTMLDivElement>(0.2);
  const [bodyRef, bodyShown] = useInView<HTMLDivElement>(0.2);

  const media = (
    <div
      ref={mediaRef}
      className={`${styles.mediaCol} ${mediaShown ? styles.shown : ""}`}
    >
      {/* ImageCompareSlider's `before` prop is the unclipped base layer,
          which the slider's own clip-path formula reveals on the RIGHT of
          the handle; `after` is the masked layer, revealed on the LEFT.
          The fixed "Antes"/"Depois" labels sit left/right respectively, so
          the crop that should read as "antes" (left half of the composite)
          has to be wired into the `after` slot, and vice versa — this is
          the origin-side fix, no change to the slider or its clip-path. */}
      <ImageCompareSlider
        className={styles.sliderFrame}
        before={{
          src: data.image,
          alt: `${data.procedure} — depois`,
          imgStyle: { width: "200%", height: "100%", left: "-100%", objectPosition: `center ${data.focusY}` },
        }}
        after={{
          src: data.image,
          alt: `${data.procedure} — antes`,
          imgStyle: { width: "200%", height: "100%", left: 0, objectPosition: `center ${data.focusY}` },
        }}
      />
    </div>
  );

  const body = (
    <div
      ref={bodyRef}
      className={`${styles.contentCol} ${bodyShown ? styles.shown : ""}`}
    >
      <div className={styles.caseLabel}>
        <span>Caso real</span>
        <span className={styles.caseLabelRule} aria-hidden="true" />
      </div>

      <h3 className={styles.procedure}>{data.procedure}</h3>
      <p className={styles.tagline}>{data.tagline}</p>

      <div className={styles.infoRow}>
        <div>
          <p className={styles.infoLabel}>Objetivo</p>
          <p className={styles.infoText}>{data.goal}</p>
        </div>
        <div>
          <p className={styles.infoLabel}>Resultado</p>
          <p className={styles.infoText}>{data.outcome}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.case}>
      {reverse ? (
        <>
          {body}
          {media}
        </>
      ) : (
        <>
          {media}
          {body}
        </>
      )}
    </div>
  );
}

export default function Results() {
  const [headRef, headShown] = useInView<HTMLDivElement>(0.2);

  return (
    <section className={styles.section} id="resultados">
      <div className={styles.container}>
        <div ref={headRef} className={`${styles.head} ${headShown ? styles.shown : ""}`}>
          <span className={styles.headLine} aria-hidden="true" />
          <p className={styles.eyebrow}>Resultados</p>
          <h2 className={styles.title}>
            Casos reais, <span className={styles.titleItalic}>resultados naturais.</span>
          </h2>
          <p className={styles.subtitle}>
            Mais do que mudanças, mostramos escolhas bem feitas. Resultados que
            respeitam sua expressão e valorizam o que é único em você.
          </p>
        </div>

        <div className={styles.list}>
          {RESULT_CASES.map((c, i) => (
            <div key={c.code}>
              <Case data={c} reverse={i % 2 === 1} />
            </div>
          ))}
        </div>

        <div className={styles.closing}>
          <span className={styles.closingLine} aria-hidden="true" />

          <h3 className={styles.closingTitle}>
            Seu resultado começa{" "}
            <span className={styles.closingAccent}>com uma escolha bem orientada.</span>
          </h3>

          <p className={styles.closingSubtitle}>
            Agende uma avaliação e descubra quais cuidados fazem sentido para você.
          </p>

          <a
            className={styles.closingCta}
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
          >
            Agendar minha avaliação <span className={styles.closingArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
