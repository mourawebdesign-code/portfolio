import styles from "./Services.module.css";
import { ButtonLink } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { ArrowRight } from "./ui/Icons";
import { Reveal, RevealChild } from "./ui/Reveal";
import { services } from "@/lib/content";

/**
 * Services — geometria medida em https://handyx.framer.website/ @1440.
 *
 *   section    top 1423 · altura 1037 · bg #F2F8FF · padding 100px 20px
 *   container  1300x837 · flex column · gap 60 · align-items flex-start
 *   cabeçalho  1300x160 · flex row · gap 10 · align-items center
 *              esquerda 770 (column, gap 10): eyebrow 28 + h2 122
 *              direita  520 (column, gap 20): parágrafo 45 + CTA 47
 *   grid       1300x617 · grid-template-columns 420px 420px 420px · gap 20
 *   card       420x298 · bg #FFF · radius 6 · padding 40
 *              flex column gap 80: [ícone 50x50] + [texto 340x88]
 *
 * A seção anterior (About) termina em 1423 sem margem: a troca de fundo
 * branco -> #F2F8FF acontece exatamente nessa linha, e os 100px de respiro
 * vêm do padding-top desta seção.
 */
export function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <Reveal className={styles.headLeft} stagger={0.08}>
            <RevealChild>
              <Eyebrow>{services.eyebrow}</Eyebrow>
            </RevealChild>
            <RevealChild as="h2" className={`h2 ${styles.headline}`}>
              {services.headlineStart}
              <br />
              {services.headlineEnd}
            </RevealChild>
          </Reveal>

          <Reveal className={styles.headRight} stagger={0.08} delay={0.1}>
            <RevealChild as="p" className={styles.headParagraph}>
              {services.paragraph}
            </RevealChild>
            <RevealChild>
              <ButtonLink href="#quote">{services.cta}</ButtonLink>
            </RevealChild>
          </Reveal>
        </div>

        <Reveal className={styles.grid} stagger={0.07}>
          {services.items.map((item, i) => (
            <RevealChild key={item.title} as="article" className={styles.cardWrap}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.number} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.icon} aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.icon}
                      alt=""
                      width={26}
                      height={26}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </div>

                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.text}</p>
                </div>

                <a className={styles.cardLink} href="#quote">
                  <span>Learn More</span>
                  <ArrowRight />
                </a>
              </div>
            </RevealChild>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
