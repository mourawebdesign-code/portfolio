"use client";
import { useRef, useState } from "react";
import { RESULTS } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import BeforeAfterSlider from "./BeforeAfterSlider";
import s from "./Results.module.css";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* Result showcase: um único comparador grande por vez — trocar de tratamento
 * troca o caso inteiro (número, nome, imagens), nunca os 3 lado a lado. A
 * troca usa um fade+scale sutil (ver .stage/.stage.out) em vez de corte seco,
 * e o BeforeAfterSlider é remontado (key=slug) a cada troca só para que sua
 * régua interna volte sozinha a 50% — sem precisar expor um setter nele. */
export default function Results() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const total = RESULTS.cases.length;
  const current = RESULTS.cases[active];

  function selectCase(i: number) {
    if (i === active || leaving) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(i);
      return;
    }
    setLeaving(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setActive(i);
      setLeaving(false);
    }, 280);
  }

  function onNavKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === "ArrowRight") { e.preventDefault(); selectCase((i + 1) % total); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); selectCase((i - 1 + total) % total); }
  }

  return (
    <section id="results" className={s.section}>
      <div className={`${s.inner} ${visible ? s.visible : ""}`} ref={ref}>
        <div className={s.head} data-reveal>
          <span className="eyebrow">{RESULTS.eyebrow}</span>
          <h2 className={s.heading}>
            <span className={s.line}>{RESULTS.headingLine1}</span>
            <span className={s.line}>
              {RESULTS.headingLine2Pre} <span className={s.hl}>{RESULTS.headingLine2Highlight}</span>
            </span>
          </h2>
          <p className={s.body}>{RESULTS.body}</p>
        </div>

        <div className={s.showcase} data-reveal>
          <div className={`${s.stage} ${leaving ? s.out : ""}`}>
            <div className={s.compareWrap}>
              <BeforeAfterSlider
                key={current.slug}
                before={current.before}
                after={current.after}
                alt={current.treatment}
                width={1600}
                height={900}
                className={s.slider}
              />
            </div>
          </div>

          <nav className={s.nav} aria-label="Selecionar tratamento">
            {RESULTS.cases.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                className={`${s.navItem} ${i === active ? s.active : ""}`}
                aria-current={i === active}
                onClick={() => selectCase(i)}
                onKeyDown={(e) => onNavKeyDown(e, i)}
              >
                {c.treatment}
              </button>
            ))}
          </nav>
          <p className={s.counter}>{pad(active + 1)} / {pad(total)}</p>
        </div>
      </div>
    </section>
  );
}
