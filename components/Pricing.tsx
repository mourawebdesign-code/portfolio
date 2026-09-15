import styles from "./Pricing.module.css";
import { PLANS } from "@/lib/pricing";
import ChevronIcon from "./ChevronIcon";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.scrim} />

      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>Planos</p>
        <h2 className={styles.title}>Tratamentos personalizados</h2>

        <div className={styles.cards}>
          {PLANS.map((p, i) => (
            <Reveal
              key={p.name}
              trigger="scroll"
              distance={24}
              delay={i * 0.08}
              className={`${styles.card} ${styles["cardOffset" + i]}`}
            >
              <a className={styles.cardLink} href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
                <p className={styles.name}>{p.name}</p>
                <p className={styles.price}>{p.price}</p>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.features}>
                  {p.features.map((f) => (
                    <p className={styles.feature} key={f}>
                      {f}
                    </p>
                  ))}
                </div>
                <span className={styles.cardBtn} aria-hidden="true">
                  <ChevronIcon size={20} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
