import styles from "./Eyebrow.module.css";

/** Pill de rótulo de seção — ver Eyebrow.module.css para as medidas. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className={styles.eyebrow}>{children}</span>;
}
