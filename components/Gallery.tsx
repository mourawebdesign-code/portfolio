import styles from "./Gallery.module.css";
import { ButtonLink } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal, RevealChild } from "./ui/Reveal";
import { gallery } from "@/lib/content";

/**
 * Projects — grid editorial assimétrico (uma imagem grande + duas médias em
 * cima, duas na linha de baixo), montado com as MESMAS 5 imagens que a faixa
 * horizontal usava antes. Cada célula recebe uma identificação discreta
 * (categoria + cidade) sobre um degradê sutil, e escala levemente no hover.
 *
 * No mobile o grid assimétrico não é comprimido: vira uma pilha vertical que
 * alterna alturas (maior / horizontal / maior / horizontal / maior).
 */

type Item = (typeof gallery.items)[number];

function ProjectCell({ item }: { item: Item }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.shot}
        src={item.src}
        width={item.w}
        height={item.h}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: item.position }}
      />
      <div className={styles.caption}>
        <span className={styles.category}>{item.category}</span>
        <span className={styles.location}>{item.location}</span>
      </div>
    </>
  );
}

export function Gallery() {
  const [big, a, b, c, d] = [
    gallery.items[3],
    gallery.items[0],
    gallery.items[2],
    gallery.items[1],
    gallery.items[4],
  ];

  return (
    <section className={styles.gallery} id="gallery">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <Reveal className={styles.headLeft} stagger={0.08}>
            <RevealChild>
              <Eyebrow>{gallery.eyebrow}</Eyebrow>
            </RevealChild>
            <RevealChild as="h2" className={`h2 ${styles.headline}`}>
              {gallery.headlineStart}
              <br />
              {gallery.headlineEnd}
            </RevealChild>
          </Reveal>

          <Reveal className={styles.headRight} stagger={0.08} delay={0.1}>
            <RevealChild as="p" className={styles.headParagraph}>
              {gallery.paragraph}
            </RevealChild>
            <RevealChild>
              <ButtonLink href="#quote">{gallery.cta}</ButtonLink>
            </RevealChild>
          </Reveal>
        </div>

        <Reveal className={styles.grid} stagger={0.08} delay={0.1}>
          <div className={styles.gridTop}>
            <RevealChild as="div" className={`${styles.cell} ${styles.cellBig}`}>
              <ProjectCell item={big} />
            </RevealChild>
            <RevealChild as="div" className={`${styles.cell} ${styles.cellA}`}>
              <ProjectCell item={a} />
            </RevealChild>
            <RevealChild as="div" className={`${styles.cell} ${styles.cellB}`}>
              <ProjectCell item={b} />
            </RevealChild>
          </div>

          <div className={styles.gridBottom}>
            <RevealChild as="div" className={`${styles.cell} ${styles.cellC}`}>
              <ProjectCell item={c} />
            </RevealChild>
            <RevealChild as="div" className={`${styles.cell} ${styles.cellD}`}>
              <ProjectCell item={d} />
            </RevealChild>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
