import styles from "./Hero.module.css";
import { ButtonLink } from "./ui/Button";
import {
  BoltIcon,
  BuildingIcon,
  HouseIcon,
  OutletIcon,
  Phone,
  Star,
} from "./ui/Icons";
import { Odometer } from "./ui/Odometer";
import { Reveal, RevealChild } from "./ui/Reveal";
import { hero, site } from "@/lib/content";

/**
 * Hero — geometria medida em https://handyx.framer.website/.
 * Os breakpoints são os da própria referência: >=1340 desktop, 810-1339
 * tablet (empilhado) e <=809 mobile.
 *
 * Desktop @1440 (clientWidth 1425):
 *   section 1425x835 · padding 100px 20px · flex · align-items center
 *   row     1300x728 · flex row · gap 10 · align-items center
 *   coluna E 650x535 · flex column · gap 20 · 5 filhos
 *   coluna D 640x728 · imagem object-fit cover
 *
 * A row (728) é mais alta que o content-box (835 - 200 = 635), então transborda
 * 46.5px de cada lado: é daí que saem a imagem em y=54 e a coluna de texto em
 * y=150. O header é fixo (67px) e sobrepõe o topo da hero.
 *
 * Os 4 badges são ancorados à caixa da imagem em % — tamanho e posição foram
 * medidos separadamente no desktop e no tablet, e a referência os esconde no
 * mobile.
 */
/* Raio (eletricidade), casa (residencial), prédio (comercial) e tomada —
   representam os serviços da Volterra em vez dos ícones genéricos do
   template original. */
const badgeIcons = [BoltIcon, HouseIcon, BuildingIcon, OutletIcon];

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.background}
        src="/handyx/hero-background.svg"
        alt=""
        aria-hidden
      />

      <div className={`container ${styles.row}`}>
        <Reveal className={styles.content} stagger={0.09} immediate>
          <RevealChild className={styles.rating}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.ratingMark}
              src="/handyx/google-mark.svg"
              alt=""
              width={40}
              height={40}
              aria-hidden
            />
            <span className={styles.ratingStack}>
              <span className={styles.stars} aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </span>
              <span className={styles.ratingText}>{hero.rating}</span>
            </span>
          </RevealChild>

          <RevealChild as="h1" className={`h1 ${styles.headline}`}>
            {hero.headlineBefore}
            <span className="accent">{hero.headlineAccent}</span>
            {hero.headlineAfter}
          </RevealChild>

          <RevealChild as="p" className={styles.paragraph}>
            {hero.paragraphLine1}
            {/* Quebra autoral: a referencia quebra depois de "on" em todos os
                breakpoints (linha 1 = 528px numa caixa de 650). */}
            <br />{" "}
            {hero.paragraphLine2}
          </RevealChild>

          <RevealChild className={styles.ctas}>
            <ButtonLink href="#quote">{hero.ctaPrimary}</ButtonLink>
            <ButtonLink
              href={site.phoneHref}
              variant="secondary"
              arrow="none"
              icon={<Phone />}
            >
              Call {site.phoneLabel}
            </ButtonLink>
          </RevealChild>

          <RevealChild className={styles.metrics}>
            {hero.metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <Odometer value={m.value} />
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </RevealChild>
        </Reveal>

        <Reveal className={styles.media} delay={0.15} immediate>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.image}
            src="/handyx/hero-worker.webp"
            width={640}
            height={728}
            alt="Licensed electrician at work"
          />

          <span className={styles.badges} aria-hidden>
            {badgeIcons.map((Icon, i) => (
              <span key={i} className={styles.badge} data-badge={i + 1}>
                <Icon />
              </span>
            ))}
          </span>
        </Reveal>
      </div>

      {/* Fade de saída para o About. Medido na referência: div full-bleed
          absoluta, bottom 0, 150px de altura, gradiente branco 0% -> 100% em
          50%. Cobre y 685..835 — exatamente abaixo do fim da coluna de texto
          (685), então dissolve apenas o grid do fundo e a base do trabalhador.
          E o que torna a emenda com o About (que comeca em 835 sem
          padding-top) imperceptivel. */}
      <div className={styles.fade} aria-hidden />
    </section>
  );
}
