"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";
import { ButtonLink } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal, RevealChild } from "./ui/Reveal";
import { faq } from "@/lib/content";

/**
 * FAQ — geometria medida em https://handyx.framer.website/ @1440.
 *
 *   section    top 5611 · altura 800 · fundo branco · padding 100px 20px
 *   inner      1300x600 · row · gap 80 · align-items flex-start
 *   aside      520x600 · column · space-between
 *   accordion  700x600 · column · gap 16
 *   item       bg #F4F4F4 · radius 6 · padding 26px 28px · gap 12
 *              aberto 137 · fechado 77
 */
export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className={styles.faq} id="faq">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.aside} stagger={0.08}>
          <RevealChild className={styles.asideHead}>
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <h2 className={`h2 ${styles.headline}`}>
              {faq.headlineStart}{" "}
              <span className="accent">{faq.headlineAccent}</span>
              {faq.headlineEnd}
            </h2>
          </RevealChild>

          <RevealChild className={styles.asideCard}>
            <h3 className={styles.asideTitle}>{faq.asideTitle}</h3>
            <p className={styles.asideText}>{faq.asideText}</p>
            <ButtonLink href="#quote">{faq.asideCta}</ButtonLink>
          </RevealChild>
        </Reveal>

        <Reveal className={styles.list} stagger={0.06} delay={0.1}>
          {faq.items.map((item, i) => {
            const isOpen = i === open;
            return (
              <RevealChild key={item.q}>
                <div className={styles.item} data-open={isOpen}>
                  <button
                    type="button"
                    id={`faq-question-${i}`}
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.toggle} data-open={isOpen} aria-hidden>
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className={styles.answerWrap}
                    data-open={isOpen}
                  >
                    <div className={styles.answerInner}>
                      <p className={styles.answer}>{item.a}</p>
                    </div>
                  </div>
                </div>
              </RevealChild>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
