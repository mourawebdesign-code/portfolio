"use client";

import { useState } from "react";
import { A } from "@/lib/assets";
import styles from "./Solutions.module.css";

const SOLUTIONS = [
  {
    icon: A.solutionIcon1,
    title: "Preventive Dental Care",
    text: "Consistent hygiene keeps cavities, gum disease and infection from taking hold.",
  },
  {
    icon: A.solutionIcon2,
    title: "Professional Teeth Whitening",
    text: "Brushing twice a day and flossing regularly keeps teeth and gums resilient.",
  },
  {
    icon: A.solutionIcon3,
    title: "Restorative Dentistry",
    text: "A child-friendly room and playful teaching help young patients build habits.",
  },
  {
    icon: A.solutionIcon1,
    title: "Emergency Dental Care",
    text: "Sudden tooth pain or a dental injury? We offer same-day appointments to get you out of pain fast.",
  },
];

export function Solutions() {
  // Three cards visible; the fourth scrolls in on hover of the rail.
  const [index] = useState(0);

  return (
    <section className={styles.section} id="solutions">
      <div className={styles.plate} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.head} data-reveal>
          <p className={styles.eyebrow}>
            <img src={A.solutionsEyebrowIcon} alt="" />
            Explore Our Dental Services
          </p>
          <h2 className={styles.title}>Dental Care for Every Smile</h2>
        </div>

        <div className={styles.rail}>
          <div
            className={styles.viewport}
            style={{
              transform: `translate3d(calc(${-index} * (100% + 24px) / 3), 0, 0)`,
            }}
          >
            {SOLUTIONS.map((s, i) => (
              <article
                className={styles.card}
                key={s.title}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(i, 3) * 0.07}s` } as React.CSSProperties}
              >
                <img className={styles.cardIcon} src={s.icon} alt="" />
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardText}>{s.text}</p>
                  <a className={styles.cardLink} href="#">
                    More Details
                    <img src={A.arrowDark} alt="" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
