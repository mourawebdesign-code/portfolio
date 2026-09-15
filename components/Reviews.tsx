"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Reviews.module.css";
import { REVIEWS, type Review } from "@/lib/reviews";

const COLUMNS = [REVIEWS.slice(0, 3), REVIEWS.slice(3, 6), REVIEWS.slice(6, 9)];
const DURATIONS = [26, 32, 29];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function Card({ review }: { review: Review }) {
  const initial = review.author.charAt(0);
  return (
    <li className={styles.card}>
      <blockquote className={styles.blockquote}>
        <p className={styles.quote}>{review.quote}</p>
        <footer className={styles.footer}>
          <span className={styles.avatar} aria-hidden="true">
            {initial}
          </span>
          <div>
            <cite className={styles.author}>{review.author}</cite>
            <p className={styles.detail}>{review.detail}</p>
          </div>
        </footer>
      </blockquote>
    </li>
  );
}

function Column({
  reviews,
  duration,
  hiddenFrom,
}: {
  reviews: Review[];
  duration: number;
  hiddenFrom?: "md" | "lg";
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`${styles.column} ${hiddenFrom === "md" ? styles.hideMd : ""} ${
        hiddenFrom === "lg" ? styles.hideLg : ""
      }`}
    >
      <motion.ul
        className={styles.columnList}
        animate={reducedMotion ? undefined : { translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {[0, 1].map((pass) =>
          reviews.map((review, i) => (
            <Card key={`${pass}-${i}`} review={review} />
          )),
        )}
      </motion.ul>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>Depoimentos</p>
        <h2 className={styles.title}>Histórias de confiança</h2>

        <div className={styles.marquee} role="region" aria-label="Depoimentos de pacientes">
          <Column reviews={COLUMNS[0]} duration={DURATIONS[0]} />
          <Column reviews={COLUMNS[1]} duration={DURATIONS[1]} hiddenFrom="md" />
          <Column reviews={COLUMNS[2]} duration={DURATIONS[2]} hiddenFrom="lg" />
        </div>
      </div>
    </section>
  );
}
