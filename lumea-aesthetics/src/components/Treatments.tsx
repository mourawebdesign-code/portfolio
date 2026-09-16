"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { TREATMENTS } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import { onAnchorClick } from "@/lib/scroll";
import s from "./Treatments.module.css";

function Learn({ href }: { href: string }) {
  return (
    <a href={href} className={s.learnMore} onClick={onAnchorClick}>
      Conhecer tratamento
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden="true">
        <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* px/s do autoplay — constante, então o tempo de ciclo (pedido: ~30-45s)
 * decorre naturalmente da largura real da track (mais cards = ciclo mais
 * longo), em vez de uma duration fixa que aceleraria/desaceleraria a
 * depender de quantos itens existem. */
const SPEED = 75;

export default function Treatments() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [line1, line2] = TREATMENTS.heading;

  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const movedRef = useRef(false);

  /* Loop -50%/+50% real (não CSS @keyframes): a posição vive num único
   * xRef atualizado por requestAnimationFrame, então arrastar só troca
   * quem escreve nesse valor (o dedo/mouse em vez do autoplay) — ao soltar,
   * o autoplay retoma exatamente de onde a track ficou, sem pulo. */
  const loop = [...TREATMENTS.items, ...TREATMENTS.items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function measure() {
      halfWidthRef.current = track!.scrollWidth / 2;
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    function apply() {
      track!.style.transform = `translate3d(${xRef.current}px,0,0)`;
    }
    // Leve corte inicial nas duas pontas, para já nascer parecendo uma
    // trilha contínua em vez de um card perfeitamente alinhado à esquerda.
    xRef.current = -80;
    apply();

    let raf = 0;
    let lastTs: number | null = null;
    function frame(ts: number) {
      if (lastTs == null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (!draggingRef.current && !reduced) {
        xRef.current -= SPEED * dt;
      }
      const half = halfWidthRef.current;
      if (half > 0) {
        while (xRef.current <= -half) xRef.current += half;
        while (xRef.current > 0) xRef.current -= half;
      }
      apply();
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    movedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = xRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) movedRef.current = true;
    xRef.current = dragStartOffsetRef.current + dx;
  }
  function endDrag() {
    draggingRef.current = false;
  }
  // Depois de um drag de verdade, engole o click resultante (captura, antes
  // do onClick do link "Conhecer tratamento") para não navegar sem querer.
  function onClickCapture(e: React.MouseEvent) {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <section id="treatments" className={s.section}>
      <div className={s.heading}>
        <span className={s.eyebrow}>{TREATMENTS.eyebrow}</span>
        <h2 className={s.title}>
          <span className={s.line1}>{line1}</span>
          <span className={s.line2}>{line2}</span>
        </h2>
        <p className={s.body}>{TREATMENTS.body}</p>
      </div>

      <div
        className={`${s.viewport} ${visible ? s.visible : ""}`}
        ref={(node) => {
          ref.current = node;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div className={s.track} ref={trackRef}>
          {loop.map((it, i) => (
            <article className={s.tile} key={`${it.slug}-${i}`} style={{ ["--i" as string]: i % TREATMENTS.items.length }}>
              <Image
                src={it.image}
                alt={it.name}
                fill
                draggable={false}
                sizes="(max-width:767px) 78vw, (max-width:1023px) 320px, 360px"
                quality={95}
                className={s.tileImg}
                style={{ objectPosition: it.focus }}
              />
              <div className={s.tileOverlay} />
              <div className={s.tileBody}>
                <h3 className={s.tileName}>{it.name}</h3>
                <p className={s.tileText}>{it.text}</p>
                <Learn href={TREATMENTS.viewAllHref} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
