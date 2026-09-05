"use client";

import { A } from "@/lib/assets";
import { Button } from "../ui/Button";
import { useCountUp } from "@/lib/useCountUp";
import styles from "./Journey.module.css";

const METRICS = [
  { icon: A.metricIcon1, value: 15, suffix: "+", label: "Years of Experience" },
  { icon: A.metricIcon2, value: 2500, suffix: "+", label: "Happy Patients" },
  { icon: A.metricIcon3, value: 12, suffix: "K+", label: "Successful Treatments" },
];

function Metric({ icon, value, suffix, label }: (typeof METRICS)[number]) {
  const { ref, value: current } = useCountUp(value);

  return (
    <div className={styles.metricCard}>
      <span className={styles.metricIconBox}>
        <img className={styles.metricIcon} src={icon} alt="" />
      </span>
      <span>
        <span className={styles.metricNumber}>
          <span ref={ref}>{current.toLocaleString("en-US")}</span>
          {suffix}
        </span>
        <span className={styles.metricLabel}>{label}</span>
      </span>
    </div>
  );
}

export function Journey() {
  return (
    <section className={styles.section} id="journey">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head} data-reveal>
          <div className={styles.headLeft}>
            <p className={styles.eyebrow}>
              <img src={A.journeyEyebrowIcon} alt="" />
              Discover Our Journey
            </p>
            <h2 className={styles.title}>Your Trusted Partner in Dental Health</h2>
          </div>

          <div className={styles.headRight}>
            <p className={styles.headBody}>
              Oral health carries a great deal of general well-being. Routine
              examinations and a steady hygiene routine head off most of the
              problems we treat.
            </p>
            <Button variant="primary">More About Us</Button>
          </div>
        </div>

        {/* Metrics row — 412 / 346 / 567, gap 20 */}
        <div className={styles.metrics}>
          <div className={styles.col1} data-reveal>
            <div className={styles.badgeCard}>
              <img className={styles.badgeAvatars} src={A.journeyBadge} alt="" />
              <span>
                <span className={styles.badgeNumber}>8+</span>
                <span className={styles.badgeLabel}>Expert Dentists</span>
              </span>
            </div>
            <img
              className={styles.col1Image}
              src={A.journeyImageLeft}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            className={styles.col2}
            data-reveal
            style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
          >
            {METRICS.map((m) => (
              <Metric key={m.label} {...m} />
            ))}
          </div>

          <div
            className={styles.col3}
            data-reveal
            style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
          >
            <img
              className={styles.col3Image}
              src={A.journeyImageRight}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
