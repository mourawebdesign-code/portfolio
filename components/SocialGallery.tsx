import styles from "./SocialGallery.module.css";
import { SOCIAL_TILES } from "@/lib/social";

export default function SocialGallery() {
  // The reference duplicates the tile sequence so the marquee can loop.
  const tiles = [...SOCIAL_TILES, ...SOCIAL_TILES];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.head}`}>
        <h2 className={styles.kicker}>Siga a clínica</h2>
        <h2 className={styles.handle}>@lumea.estetica</h2>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {tiles.map((t, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              className={`${styles.tile} ${t.big ? styles.big : ""}`}
              src={t.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={{ marginTop: t.offset }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
