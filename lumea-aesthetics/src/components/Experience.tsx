"use client";
import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { EXPERIENCE } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import s from "./Experience.module.css";

/** Galeria em leque: os 3 momentos ficam empilhados e levemente rotacionados
 * como um baque de cartas, cada um saindo um pouco mais para o lado e para
 * baixo conforme se afasta do centro. Hover levanta e endireita o card por
 * cima dos demais. Substitui o carrossel horizontal de arrastar anterior —
 * texto/eyebrow/legendas continuam os mesmos. */
const ROTATE_STEP = 6;
const OVERLAP = 0.58;
const HOVER_SCALE = 1.06;
const HOVER_LIFT = 16;

/** Largura do card recalculada no resize (não em breakpoints fixos), como
 * fração do viewport, dentro de um piso/teto — mesmo espírito de um
 * clamp() de CSS, só que em JS porque a matemática do leque (translateX
 * proporcional à largura do card) precisa do valor em px. */
function useCardWidth() {
  const [width, setWidth] = useState(240);
  useEffect(() => {
    const calc = () => setWidth(Math.min(240, Math.max(110, window.innerWidth * 0.17)));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return width;
}

export default function Experience() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState<number | null>(null);
  const cardWidth = useCardWidth();
  const cardHeight = cardWidth * (4 / 3);
  const yStep = cardHeight * 0.056;

  const items = EXPERIENCE.items;
  const total = items.length;
  const mid = (total - 1) / 2;
  const stageWidth = cardWidth + Math.abs(mid) * 2 * cardWidth * OVERLAP + cardWidth * 0.2;
  const stageHeight = cardHeight + Math.abs(mid) * yStep + 48;

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={`${s.head} ${visible ? s.visible : ""}`} ref={ref} data-reveal>
          <span className="eyebrow">{EXPERIENCE.eyebrow}</span>
          <h2 className={s.heading}>{EXPERIENCE.heading}</h2>
        </div>

        <div className={s.stageWrap}>
          <div className={s.stage} style={{ width: stageWidth, height: stageHeight }} role="group" aria-label="Momentos na Luméa">
            {items.map((it, i) => {
              const offset = i - mid;
              const rotate = offset * ROTATE_STEP;
              const translateY = Math.abs(offset) * yStep;
              const translateX = offset * cardWidth * OVERLAP;
              const baseZ = total - Math.abs(offset);
              const isHovered = hovered === i;

              const cardStyle: CSSProperties = {
                width: cardWidth,
                height: cardHeight,
                marginLeft: -cardWidth / 2,
                marginTop: -cardHeight / 2,
                transform: isHovered
                  ? `translate(${translateX}px, ${translateY - HOVER_LIFT}px) rotate(0deg) scale(${HOVER_SCALE})`
                  : `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(1)`,
                zIndex: isHovered ? total + 1 : baseZ,
              };

              return (
                <div
                  key={it.n}
                  className={s.card}
                  style={cardStyle}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  aria-label={it.alt}
                >
                  <Image
                    src={`/images/lumea/gallery/${it.file}`}
                    alt={it.alt}
                    fill
                    sizes="(max-width:767px) 45vw, 240px"
                    quality={95}
                    className={s.img}
                    style={{ objectPosition: it.position }}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className={s.captions}>
          {items.map((it) => (
            <div key={it.n} className={s.caption}>
              <span className={s.captionN}>{it.n}</span>
              <span className={s.captionTitle}>{it.title}</span>
              <span className={s.captionText}>{it.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
