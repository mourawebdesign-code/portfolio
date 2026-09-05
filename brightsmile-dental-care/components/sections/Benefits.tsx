import { A } from "@/lib/assets";
import styles from "./Benefits.module.css";

const ITEMS = ["Pure Pearls", "Gleam Bright", "Fresh Breath"];

/** One pass of the ticker. Rendered twice so the loop has no gap. */
function Track({ clone = false }: { clone?: boolean }) {
  return (
    <div className={styles.track} aria-hidden={clone || undefined}>
      {ITEMS.map((label) => (
        <span className={styles.item} key={label}>
          <img className={styles.mark} src={A.marqueeIcon} alt="" />
          <span className={styles.word}>{label}</span>
        </span>
      ))}
    </div>
  );
}

export function Benefits() {
  return (
    <section className={styles.section} aria-label="Practice highlights">
      {/* Fades in as one unit — the ticker itself never pauses to animate
          individual words. */}
      <div className={styles.viewport} data-reveal>
        <Track />
        <Track clone />
      </div>
    </section>
  );
}
