import styles from "./Services.module.css";
import Reveal from "./Reveal";
import ChevronIcon from "./ChevronIcon";

const SERVICES = [
  "Bioestimuladores de colágeno",
  "Preenchimento facial",
  "Toxina botulínica",
  "Harmonização facial",
  "Consultoria personalizada de pele",
];

export default function Services() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.kicker}>Tratamentos para uma pele saudável</p>
          <h2 className={styles.title}>Serviços</h2>
          <Reveal trigger="scroll" className={styles.desc} distance={30}>
            Protocolos personalizados para restaurar o equilíbrio da pele,
            nutrir e revelar um brilho natural e saudável.
          </Reveal>

          <ul className={styles.list}>
            {SERVICES.map((s) => (
              <li key={s} className={styles.listItem}>
                <a className={styles.item} href="#tratamentos">
                  {s}
                  <ChevronIcon size={18} className={styles.itemIcon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Reveal trigger="scroll" distance={30} className={styles.photo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/organic/services/m16ZPxCxQFNGh1QrNnmHYp6cjc.png"
            alt=""
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  );
}
