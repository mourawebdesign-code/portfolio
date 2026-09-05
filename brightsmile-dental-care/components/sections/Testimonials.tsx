"use client";

import { useState } from "react";
import { A } from "@/lib/assets";
import { ArrowLeft, ArrowRight, Star } from "../ui/Icon";
import styles from "./Testimonials.module.css";

const SLIDES = [
  {
    title: "They truly care about patients.",
    body: "This visit changed how I think about going to the dentist. The team was calm and thorough, the treatment went smoothly, and I left without any of the soreness I had braced myself for.",
    name: "Joseph David",
    role: "BrightSmile Patient",
  },
  {
    title: "Every step was explained clearly.",
    body: "I was shown the scans, walked through each option and given a written estimate before anything started. Nothing about the appointment felt rushed or confusing.",
    name: "Amara Blake",
    role: "Patient since 2021",
  },
  {
    title: "The follow-up care stood out.",
    body: "A week after my procedure, someone called to check how my recovery was going and helped me reschedule my next appointment around it. That kind of attention is rare.",
    name: "Marcus Lin",
    role: "Local Patient",
  },
];

export function Testimonials() {
  // Prev/next live inside the rating card, which is why the section's
  // inner height stays at head 126 + gap 64 + cards 458 = 648.
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;
  const go = (next: number) => setIndex(((next % count) + count) % count);

  return (
    <section className={styles.section} id="testimonials">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head} data-reveal>
          <p className={styles.eyebrow}>
            <img src={A.testimonialsEyebrowIcon} alt="" />
            Our Happy Patients
          </p>
          <h2 className={styles.title}>What Our Patients Say</h2>
        </div>

        <div
          className={styles.stage}
          data-reveal
          style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}
        >
          <div
            className={styles.viewport}
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          >
            {SLIDES.map((s, i) => (
              <article className={styles.slide} key={s.name} aria-hidden={i !== index}>
                {/* Rating card — 444x458, padding 64/80, #f4f4f6 */}
                <div className={styles.rating}>
                  <span className={styles.ratingLabel}>Average Rating</span>
                  <span className={styles.score}>4.5</span>
                  <span className={styles.stars} aria-label="4.5 out of 5">
                    {Array.from({ length: 5 }).map((_, n) => (
                      <Star key={n} size={22} />
                    ))}
                  </span>
                  <span className={styles.reviews}>(245+) Patient Reviews</span>

                  <span className={styles.ratingRule} aria-hidden="true" />

                  <span className={styles.controls}>
                    <button
                      className={styles.arrow}
                      type="button"
                      aria-label="Previous testimonial"
                      onClick={() => go(index - 1)}
                    >
                      <ArrowLeft size={22} />
                    </button>
                    <button
                      className={styles.arrow}
                      type="button"
                      aria-label="Next testimonial"
                      onClick={() => go(index + 1)}
                    >
                      <ArrowRight size={22} />
                    </button>
                  </span>
                </div>

                {/* Quote card — 897x450, transparent, padding 64 */}
                <div className={styles.quote}>
                  <h3 className={styles.quoteTitle}>&ldquo;{s.title}&rdquo;</h3>
                  <p className={styles.quoteBody}>{s.body}</p>
                  <div className={styles.author}>
                    <span>
                      <span className={styles.authorName}>{s.name}</span>
                      <span className={styles.authorRole}>{s.role}</span>
                    </span>
                    <span className={styles.avatar}>
                      <img src={A.testimonialAvatar} alt={s.name} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
