import styles from "./Testimonials.module.css";
import { ButtonLink } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Star } from "./ui/Icons";
import { Reveal, RevealChild } from "./ui/Reveal";
import { testimonials } from "@/lib/content";

/**
 * Testimonials — geometria medida em https://handyx.framer.website/ @1440.
 *
 *   section    top 4956 · altura 655 · bg #F2F8FF · padding 100px 20px
 *   inner      1300x455 · column · gap 60
 *   cabeçalho  1300x161 · row · gap 10 · align-items flex-end
 *   carrossel  1300x234 · row · gap 20 · overflow clip (3 cards visíveis)
 *   card       420x234 · bg #FFF · radius 6 · padding 20 · column gap 20
 *
 * Os depoimentos são texto de preenchimento — ver a nota em lib/content.ts.
 */
export function Testimonials() {
  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <Reveal className={styles.headLeft} stagger={0.08}>
            <RevealChild>
              <Eyebrow>{testimonials.eyebrow}</Eyebrow>
            </RevealChild>
            <RevealChild as="h2" className={`h2 ${styles.headline}`}>
              {testimonials.headlineStart}
              <br />
              {testimonials.headlineEnd}
            </RevealChild>
          </Reveal>

          <Reveal className={styles.headRight} stagger={0.08} delay={0.1}>
            <RevealChild as="p" className={styles.headParagraph}>
              {testimonials.paragraph}
            </RevealChild>
            <RevealChild>
              <ButtonLink href="#quote">{testimonials.cta}</ButtonLink>
            </RevealChild>
          </Reveal>
        </div>

        <Reveal className={styles.carousel} delay={0.15}>
          <div className={styles.track}>
            {testimonials.items.map((t) => (
              <article key={t.name} className={styles.card}>
                <div className={styles.quoteBlock}>
                  <span className={styles.stars} aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} />
                    ))}
                  </span>
                  <p className={styles.quote}>{t.quote}</p>
                </div>

                <div className={styles.footer}>
                  <div className={styles.author}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.avatar}
                      src={t.avatar}
                      width={50}
                      height={50}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.authorText}>
                      <span className={styles.name}>{t.name}</span>
                      <span className={styles.role}>{t.role}</span>
                    </span>
                  </div>
                  <span className={styles.source}>Google Review</span>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
