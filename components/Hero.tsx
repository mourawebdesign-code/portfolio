"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import Reveal from "./Reveal";
import FlowButton from "./FlowButton";
import { AnimatedText } from "./AnimatedText";
import { HERO_ANNOTATIONS, HERO_ANNOTATIONS_COMPACT } from "@/lib/heroAnnotations";
import { GradientBackground } from "./GradientBackground";

/**
 * Connector geometry. The viewBox is uniform (never stretched), which is
 * what keeps the stroke a true hairline and makes the draw-in dash render
 * as one continuous segment. The box is rendered at `--conn`, a vw-based
 * scale, so the curve tracks the photo's own scale: its tip keeps landing
 * on the same spot of the mouth at every desktop width, while staying the
 * short editorial hook of the reference rather than a long diagonal.
 * `sx`/`sy` is where the curve starts inside the box, so the SVG can be
 * shifted to hang that point exactly under the pill.
 */
const CONNECTOR = {
  right: {
    w: 80,
    h: 84,
    sx: 6,
    sy: 6,
    d: "M 6 6 Q 46 24 67 70",
    cx: 67,
    cy: 70,
  },
  left: {
    w: 62,
    h: 88,
    sx: 48,
    sy: 6,
    d: "M 48 6 Q 52 44 20 74",
    cx: 20,
    cy: 74,
  },
} as const;

/** The `right` box's width is the unit `--conn` is expressed in. */
const CONN_UNIT = CONNECTOR.right.w;

function AnnotationConnector({
  direction,
  delay,
}: {
  direction: "right" | "left";
  delay: number;
}) {
  const c = CONNECTOR[direction];
  const ref = useRef<SVGPathElement>(null);
  const [length, setLength] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setLength(el.getTotalLength());
  }, []);

  useEffect(() => {
    if (length === null) return;
    const t = window.setTimeout(() => setDrawn(true), delay * 1000);
    return () => window.clearTimeout(t);
  }, [length, delay]);

  return (
    <svg
      className={styles.connector}
      width={c.w}
      height={c.h}
      viewBox={`0 0 ${c.w} ${c.h}`}
      style={{
        left: "62%",
        top: "100%",
        width: `calc(var(--conn) * ${c.w / CONN_UNIT})`,
        height: `calc(var(--conn) * ${c.h / CONN_UNIT})`,
        translate: `${-(c.sx / c.w) * 100}% ${-(c.sy / c.h) * 100}%`,
      }}
      aria-hidden="true"
    >
      <path
        ref={ref}
        className={styles.connectorPath}
        d={c.d}
        style={
          length === null
            ? { opacity: 0 }
            : {
                strokeDasharray: length,
                strokeDashoffset: drawn ? 0 : length,
                opacity: drawn ? 1 : 0,
                transition:
                  "stroke-dashoffset 1.1s var(--ease-soft, ease), opacity 1.1s ease",
              }
        }
      />
      <circle
        className={styles.connectorDot}
        cx={c.cx}
        cy={c.cy}
        r={2.5}
        style={{
          opacity: drawn ? 1 : 0,
          transition: "opacity 0.5s ease 0.9s",
        }}
      />
    </svg>
  );
}

/* Below ~900px the photo sits much closer behind the content block, so the
   desktop annotation coordinates would land the pills behind the CTA. */
function useCompactAnnotations() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return compact;
}

/** The CTA's own appear-effect is gated on both pieces of content above it
    actually finishing their appearance, rather than a fixed delay guessed
    to land after them: the wordmark's completion arrives as a real
    Framer Motion callback, and the description's is the same fixed
    0.9s-delay + 0.4s-tween schedule its own Reveal already runs on. */
function useCtaReady() {
  const [titleDone, setTitleDone] = useState(false);
  const [descriptionDone, setDescriptionDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDescriptionDone(true), 900 + 400);
    return () => window.clearTimeout(t);
  }, []);

  return {
    ready: titleDone && descriptionDone,
    onTitleDone: () => setTitleDone(true),
  };
}

export default function Hero() {
  const compact = useCompactAnnotations();
  const annotations = compact ? HERO_ANNOTATIONS_COMPACT : HERO_ANNOTATIONS;
  const { ready: ctaReady, onTitleDone } = useCtaReady();

  return (
    <section className={styles.hero} id="hero">
      {/* BACKGROUND — replaces the old flat black fill. Sits behind
          everything (lowest z-index) and never intercepts pointer events.
          GradientBackground's own root div ships a hard-coded
          `position: relative; width/height: 100%` inline style, so the
          positioning classes go on a plain wrapper around it instead of on
          the component itself — putting them directly on it would collide
          with those inline styles (inline always wins) and, worse, resolve
          its height:100% against nothing, collapsing it to 0. */}
      <div className={styles.heroBackground}>
        <GradientBackground />
      </div>

      {/* CONTENT — headline, description, CTA, in the upper black area. */}
      <div className={styles.content}>
        <AnimatedText
          text="LUMÉA"
          className={styles.animatedRoot}
          textClassName={styles.wordmark}
          underlineClassName={styles.wordmarkUnderline}
          onUnderlineComplete={onTitleDone}
        />

        <Reveal as="p" className={styles.description} delay={0.9} distance={16}>
          Estética avançada conduzida com precisão, naturalidade e cuidado em
          cada detalhe.
        </Reveal>

        <div
          className={`${styles.ctaWrap} ${styles.ctaReveal}`}
          style={{
            opacity: ctaReady ? 1 : 0.001,
            transform: ctaReady ? "none" : "translateY(16px)",
          }}
        >
          <FlowButton
            text="Agendar avaliação"
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
            autoActivate={ctaReady}
          />
        </div>
      </div>

      {/* VISUAL — full-bleed editorial photo. Sits in normal document flow
          (not absolutely positioned/clipped) so the Hero's own height grows
          to fit it completely: nothing about the photo is ever cropped.
          Width alone runs past the viewport for the full-bleed, asymmetric
          composition; height follows from the asset's own aspect ratio. */}
      <div className={styles.visualWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.photo}
          src="/organic/hero/HERO.png"
          alt="Retrato macro editorial — lábios e contorno do rosto"
        />

        {/* ANNOTATIONS — pill anchored in % of the photo, with its own short
            fixed-size connector hanging underneath it. */}
        {annotations.map((a, i) => (
          <div
            key={a.label}
            className={styles.annotation}
            style={{
              ["--ax" as string]: `${a.x}%`,
              ["--ay" as string]: `${a.y}%`,
            }}
          >
            <Reveal trigger="load" delay={1.2 + i * 0.15} distance={6}>
              <span className={styles.annotationLabel}>{a.label}</span>
            </Reveal>

            <AnnotationConnector direction={a.direction} delay={1.5 + i * 0.15} />
          </div>
        ))}
      </div>
    </section>
  );
}
