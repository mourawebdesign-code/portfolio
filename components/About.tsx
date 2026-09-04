import styles from "./About.module.css";
import { ButtonLink } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Check } from "./ui/Icons";
import { Reveal, RevealChild } from "./ui/Reveal";
import { about } from "@/lib/content";

/**
 * About — geometria medida em https://handyx.framer.website/ @1440.
 *
 *   section    top 835 · altura 588 · padding 0px 20px 100px
 *              ^ SEM padding-top: a seção encosta direto no fim da hero.
 *   container  1300x488 · flex row · gap 80 · align-items center
 *   coluna E   610x450  · imagem radius 12 + 2 badges sobrepostos
 *   coluna D   610x488  · flex column · gap 20
 *              eyebrow 28 · h2 122 · parágrafo 90 · lista 121 · CTA 47
 *
 * A coluna esquerda (450) é menor que a direita (488) e o container centraliza,
 * por isso a imagem cai em y=19 dentro da seção.
 */
export function About() {
  return (
    <section className={styles.about} id="about">
      <div className={`container ${styles.row}`}>
        <Reveal className={styles.media}>
          <div className={styles.frame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={about.image}
              width={610}
              height={520}
              alt={about.imageAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal className={styles.content} stagger={0.08}>
          <RevealChild>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </RevealChild>

          <RevealChild as="h2" className={`h2 ${styles.headline}`}>
            <span className="accent">{about.headlineAccent}</span>
            {about.headlineMid}
            <br />
            {about.headlineEnd}
          </RevealChild>

          <RevealChild as="p" className={styles.paragraph}>
            {about.paragraph}
          </RevealChild>

          <RevealChild as="ul" className={styles.benefits}>
            {about.benefits.map((b) => (
              <li key={b} className={styles.benefit}>
                <Check className={styles.checkIcon} />
                <span className={styles.benefitText}>{b}</span>
              </li>
            ))}
          </RevealChild>

          <RevealChild>
            <ButtonLink href="#services">{about.cta}</ButtonLink>
          </RevealChild>
        </Reveal>
      </div>
    </section>
  );
}
