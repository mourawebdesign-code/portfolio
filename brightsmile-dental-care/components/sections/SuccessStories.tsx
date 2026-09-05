import { A } from "@/lib/assets";
import { Button } from "../ui/Button";
import styles from "./SuccessStories.module.css";

// Matched to each photo: A.story[0] is a routine checkup, [1] a hygiene
// visit, [2] a shade-matching for cosmetic work, [3] a close-up exam,
// [4] intraoral scanning, [5] a clear aligner fitting, [6] a brushing
// demo on a model, [7] a cross-section model showing a tooth's root.
const CASES = [
  "Routine Dental Checkups",
  "Dental Cleanings",
  "Cosmetic Dentistry",
  "Oral Health Assessment",
  "Digital Dental Diagnostics",
  "Clear Aligner Therapy",
  "Preventive Dental Care",
  "Root Canal Therapy",
];

export function SuccessStories() {
  return (
    <section className={styles.section} id="cases">
      <div className={`container ${styles.inner}`}>
        <div className={styles.aside} data-reveal>
          <p className={styles.eyebrow}>
            <img src={A.storiesEyebrowIcon} alt="" />
            Smile Success Stories
          </p>
          <h2 className={styles.title}>Where Healthy Smiles Begin</h2>
          <p className={styles.body}>
            Cosmetic work keeps drawing people in as they look for a smile they
            are happy to show. Whitening, veneers and digital smile design have
            all become far easier to reach than they once were.
          </p>
          <Button variant="dark">Explore More Cases</Button>
        </div>

        <div className={styles.grid}>
          {CASES.map((title, i) => (
            <a
              className={styles.case}
              href="#"
              key={title}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(i, 3) * 0.07}s` } as React.CSSProperties}
            >
              <span className={styles.caseMedia}>
                <img src={A.story[i]} alt={title} loading="lazy" />
              </span>
              <span className={styles.caseTitle}>{title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
