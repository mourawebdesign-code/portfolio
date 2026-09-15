import styles from "./CTAEvaluation.module.css";
import Reveal from "./Reveal";

export default function CTAEvaluation() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.scrim} />

      <div className={`container ${styles.inner}`}>
        <Reveal trigger="scroll" distance={24} className={styles.content}>
          <p className={styles.eyebrow}>Próximo passo</p>
          <h2 className={styles.headline}>
            Seu resultado começa com uma avaliação individual.
          </h2>
          <p className={styles.desc}>
            Nenhum protocolo é padrão. Vamos conversar sobre o que faz
            sentido para o seu rosto, seu tempo e seus objetivos.
          </p>
          <a className={styles.cta} href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
            Agendar avaliação
          </a>
        </Reveal>
      </div>
    </section>
  );
}
