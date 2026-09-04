import styles from "./ServiceAreas.module.css";
import { ButtonLink } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal, RevealChild } from "./ui/Reveal";
import { areas } from "@/lib/content";

/**
 * Service Areas — geometria medida em https://handyx.framer.website/ @1440.
 *
 *   section  top 6411 · altura 815 · bg #F2F8FF · padding 100px 20px
 *   inner    1300x615 · row · gap 80 · align-items FLEX-END
 *   esquerda 520 (column, space-between): eyebrow + h2 + CTA
 *   direita  700 (column, gap 40): parágrafo + grade de cidades + imagem
 *   imagem   700x368 · radius 6
 */
export function ServiceAreas() {
  return (
    <section className={styles.areas} id="areas">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.left} stagger={0.08}>
          <RevealChild className={styles.leftHead}>
            <Eyebrow>{areas.eyebrow}</Eyebrow>
            <h2 className={`h2 ${styles.headline}`}>
              {areas.headlineStart}
              <span className="accent">{areas.headlineCity}</span>
              {areas.headlineEnd}
            </h2>
          </RevealChild>
          <RevealChild>
            <ButtonLink href="#quote">{areas.cta}</ButtonLink>
          </RevealChild>
        </Reveal>

        <Reveal className={styles.right} stagger={0.08} delay={0.1}>
          <RevealChild as="p" className={styles.paragraph}>
            {areas.paragraph}
          </RevealChild>

          <RevealChild as="ul" className={styles.cities}>
            {areas.cities.map((city) => (
              <li key={city} className={styles.city}>
                <span className={styles.marker} aria-hidden />
                <span className={styles.cityName}>{city}</span>
              </li>
            ))}
          </RevealChild>

          <RevealChild>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={areas.image}
              width={700}
              height={368}
              alt={areas.imageAlt}
              loading="lazy"
              decoding="async"
            />
          </RevealChild>
        </Reveal>
      </div>
    </section>
  );
}
