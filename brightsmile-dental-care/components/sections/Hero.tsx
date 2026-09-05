import { A } from "@/lib/assets";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.section} id="hero">
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Title row — 1365x227, gap 16, badge between the two words.
            No scroll-reveal here: the hero is visible on load, so this
            content (LCP candidate) must never sit at opacity:0 waiting
            on JS/IntersectionObserver to reveal it. */}
        <h1 className={styles.titleRow}>
          <span className={`${styles.word} ${styles.wordLead}`}>Dental</span>

          {/* "Badge" and "Border" are siblings in the reference; only the
              dashed ring rotates, the tooth stays fixed. */}
          <span className={styles.badge} aria-hidden="true">
            <span className={styles.badgeDisc}>
              <img src={A.heroToothBadge} alt="" />
            </span>
            <span className={styles.badgeRing} />
          </span>

          <span className={`${styles.word} ${styles.wordTrail}`}>Health</span>
        </h1>

        {/* Cards row — 1365x483, gap 24 */}
        <div className={styles.cardsRow}>
          <img
            className={`${styles.shape} ${styles.shapeLeft}`}
            src={A.heroShapeLeft}
            alt=""
            aria-hidden="true"
          />
          <img
            className={`${styles.shape} ${styles.shapeRight}`}
            src={A.heroShapeRight}
            alt=""
            aria-hidden="true"
          />

          {/* Card A — 444x483, padding 48, radius 24, cyan */}
          <div className={styles.connect}>
            <div className={styles.connectHead}>
              <h2 className={styles.connectTitle}>Connect with Us</h2>
              <p className={styles.connectBody}>
                Reach us any time for questions, referrals or a second opinion.
              </p>
            </div>

            <div className={styles.infoStack}>
              <div className={styles.infoRow}>
                <img className={styles.infoIcon} src={A.heroIconClock} alt="" />
                <span>
                  <span className={styles.infoLabel}>Opening Hours</span>
                  <span className={styles.infoValue}>Mon to Sat 10:00 - 24:00</span>
                </span>
              </div>

              <div className={styles.infoRow}>
                <img className={styles.infoIcon} src={A.heroIconPhone} alt="" />
                <span>
                  <span className={styles.infoLabel}>Need Dental Help?</span>
                  <span className={styles.infoValue}>Call: +8 880 283 9136</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card B — 429x466 portrait with overlay pill at 32/329 */}
          <div className={styles.portrait}>
            <img
              src={A.heroPortrait}
              alt="Clinician"
              // Likely LCP element — hint the browser to fetch it first.
              fetchPriority="high"
            />
            <div className={styles.portraitOverlay}>
              <span className={styles.portraitPill}>How can I help you?</span>
              <img className={styles.portraitSign} src={A.heroSignature} alt="" />
            </div>
          </div>

          {/* Card C — 444x482, dark gradient, media 348x182 r16 */}
          <div className={styles.help}>
            <img className={styles.helpMedia} src={A.heroCardMedia} alt="" />

            <div className={styles.helpFoot}>
              <p className={styles.helpBody}>
                From digital imaging through to computer-assisted diagnosis,
                current tooling lets our clinicians work more precisely and more
                quickly than before.
              </p>

              <a className={styles.helpBtn} href="#appointment">
                Find Consultation
                <img src={A.arrowWhite} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
