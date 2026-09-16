"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SPECIALIST } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import s from "./Specialist.module.css";

function useCountUp(target: number, run: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(target); return; }
    const dur = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return v;
}

function formatPtBr(v: number, decimals: number) {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function Stat({ item, run, i }: { item: (typeof SPECIALIST.stats)[number]; run: boolean; i: number }) {
  const num = useCountUp(item.value, run);
  return (
    <div className={s.stat} data-reveal style={{ ["--i" as string]: i }}>
      <div className={s.statValue}>{formatPtBr(num, item.decimals)}{item.suffix}</div>
      <div className={s.statLabel}>{item.label}</div>
    </div>
  );
}

export default function Specialist() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  const { ref: statsRef, visible: statsVisible } = useReveal<HTMLDivElement>(0.4);

  return (
    <section id="specialist" className={s.section}>
      <div className={s.inner}>
        <div className={`${s.grid} ${visible ? s.visible : ""}`} ref={ref}>
          <div className={s.mediaCol} data-reveal>
            <div className={s.portrait}>
              <Image
                src={SPECIALIST.portrait.src}
                alt={SPECIALIST.portrait.alt}
                fill
                sizes="(max-width:1023px) 100vw, 34vw"
                quality={100}
                className={s.portraitImg}
              />
            </div>
            <div className={s.editorial}>
              <Image
                src={SPECIALIST.editorial.src}
                alt={SPECIALIST.editorial.alt}
                fill
                sizes="(max-width:1023px) 60vw, 18vw"
                quality={92}
                className={s.editorialImg}
              />
            </div>
          </div>

          <div className={s.copy}>
            <span className="eyebrow" data-reveal>{SPECIALIST.eyebrow}</span>
            <h2 className={s.name} data-reveal>{SPECIALIST.name}</h2>
            <p className={s.role} data-reveal>{SPECIALIST.role}</p>

            <blockquote className={s.quote} data-reveal>“{SPECIALIST.quote}”</blockquote>

            <p className={s.bio} data-reveal>{SPECIALIST.bio}</p>

            <div className={`${s.stats} ${statsVisible ? s.visible : ""}`} ref={statsRef}>
              {SPECIALIST.stats.map((it, i) => <Stat key={it.label} item={it} run={statsVisible} i={i} />)}
            </div>

            <ul className={s.timeline}>
              {SPECIALIST.credentials.map((c, i) => (
                <li key={c.year} className={s.row} data-reveal style={{ ["--i" as string]: i }}>
                  <span className={s.year}>{c.year}</span>
                  <span className={s.text}>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
