import { A } from "@/lib/assets";
import { Button } from "../ui/Button";
import styles from "./EmergencyCTA.module.css";

export function EmergencyCTA() {
  return (
    <section className={styles.section} id="emergency">
      <div className="container">
        {/* Cyan rounded card — 1365x562, radius 32 */}
        <div className={styles.card} data-reveal>
          <img
            className={styles.shape}
            src={A.emergencyShape}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />

          <div className={styles.figure} aria-hidden="true">
            <img
              className={styles.person}
              src={A.emergencyPerson}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <img
              className={styles.badge}
              src={A.emergencyBadge}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className={`${styles.label} ${styles.labelTalk}`}>Want to Talk?</span>
            <span className={`${styles.label} ${styles.labelHello}`}>Hello!</span>
          </div>

          <div className={styles.copy}>
            <div className={styles.copyText}>
              <p className={styles.eyebrow}>
                <img src={A.emergencyEyebrowIcon} alt="" />
                Need Emergency Help?
              </p>

              <h2 className={styles.title}>Keeping Your Smile Healthy &amp; Bright</h2>

              <p className={styles.body}>
                Advanced gum disease attacks the soft tissue and the bone holding
                your teeth in place. Treated early, most of that damage never
                happens at all.
              </p>
            </div>

            <Button variant="light" href="#appointment">
              Contact Us Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
