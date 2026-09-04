"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Odometer.module.css";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Reproduz o comportamento medido na referência: cada dígito é uma coluna
 * 0–9 que desliza até o valor final quando o bloco entra na viewport.
 * Caracteres não numéricos (+, %, vírgula) ficam estáticos.
 */
export function Odometer({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRun(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  let digitIndex = 0;

  return (
    <span ref={ref} className={styles.value}>
      <span className="srOnly">{value}</span>
      <span aria-hidden style={{ display: "inline-flex", alignItems: "baseline" }}>
        {value.split("").map((char, i) => {
          if (!/[0-9]/.test(char)) {
            return (
              <span key={`${char}-${i}`} className={styles.static}>
                {char}
              </span>
            );
          }

          // atraso escalonado da esquerda para a direita
          const delay = digitIndex * 0.08;
          digitIndex += 1;

          return (
            <span key={`${char}-${i}`} className={styles.digit}>
              <span
                className={styles.reel}
                style={{
                  transform: run
                    ? `translateY(calc(var(--digit-h) * -${char}))`
                    : "translateY(0)",
                  transitionDelay: `${delay}s`,
                }}
              >
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
