"use client";

import { useState } from "react";
import styles from "./TreatmentCarousel.module.css";
import type { Treatment } from "@/lib/treatments";
import ChevronIcon from "./ChevronIcon";

const PER_VIEW = 2;

export default function TreatmentCarousel({
  category,
  treatments,
}: {
  category: string;
  treatments: Treatment[];
}) {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, treatments.length - PER_VIEW);

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.category}>{category}</p>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            aria-label="Tratamento anterior"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            <ChevronIcon dir="left" size={18} />
          </button>
          <button
            className={styles.arrow}
            aria-label="Próximo tratamento"
            disabled={index >= maxIndex}
            onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
          >
            <ChevronIcon dir="right" size={18} />
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(calc(${-index} * (100% / ${PER_VIEW} + var(--tc-gap))))` }}
        >
          {treatments.map((tr, i) => (
            <article className={styles.card} key={i}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.name}>{tr.name}</p>
              <p className={styles.desc}>{tr.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
