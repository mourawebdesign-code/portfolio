import styles from "./BrandPrinciples.module.css";
import { PRINCIPLES, type Principle } from "@/lib/principles";
import Reveal from "./Reveal";

const GRID_SLOTS: { key: Principle["key"]; area: "tl" | "tr" | "bl" | "br"; variant: "light" | "filled" }[] = [
  { key: "naturalidade", area: "tl", variant: "light" },
  { key: "precisao", area: "tr", variant: "filled" },
  { key: "planejamento", area: "bl", variant: "filled" },
  { key: "equilibrio", area: "br", variant: "light" },
];

export default function BrandPrinciples() {
  const byKey = Object.fromEntries(PRINCIPLES.map((p) => [p.key, p])) as Record<Principle["key"], Principle>;

  return (
    <section className={styles.section} id="filosofia">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal trigger="scroll" distance={14} className={styles.headLeft}>
            <div className={styles.ruleTop} aria-hidden="true" />
            <h2 className={styles.title}>Filosofia</h2>
            <p className={styles.intro}>
              Cada rosto possui proporções, expressões e características
              próprias. Por isso, cada tratamento começa com uma leitura
              individual e cuidada.
            </p>
          </Reveal>

          <Reveal trigger="scroll" distance={14} delay={0.08} className={styles.headRight}>
            <p className={styles.concept}>
              Valorizar o que já existe de único em você.
            </p>
          </Reveal>
        </div>

        <div className={styles.composition}>
          <div className={styles.photoStage}>
            <Reveal trigger="scroll" scaleFrom={0.98} delay={0.1} className={styles.photoReveal}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.photoImg}
                src="/organic/Filosofia/1.png"
                alt="Retrato de perfil — expressão serena, foco na naturalidade dos traços"
              />
            </Reveal>
          </div>

          <div className={styles.featuresWrap}>
            <div className={styles.featuresGrid}>
              {GRID_SLOTS.map((slot, i) => {
                const p = byKey[slot.key];
                return (
                  <Reveal
                    key={slot.key}
                    trigger="scroll"
                    distance={12}
                    delay={0.15 + i * 0.07}
                    className={`${styles.cell} ${styles[slot.area]} ${styles[slot.variant]}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.cellIcon} src={p.icon} alt="" aria-hidden="true" />
                    <h3 className={styles.cellTitle}>{p.title}</h3>
                    <p className={styles.cellText}>{p.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
