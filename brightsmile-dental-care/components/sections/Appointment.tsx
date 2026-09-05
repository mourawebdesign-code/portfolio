"use client";

import { useState } from "react";
import { A } from "@/lib/assets";
import { Button } from "../ui/Button";
import styles from "./Appointment.module.css";

const DEPARTMENTS = ["General Dentistry", "Cosmetic Dentistry", "Orthodontics"];

const DOCTORS = ["Dr. Emily Hartman", "Dr. James Whitfield", "Dr. Daniel Cross"];

export function Appointment() {
  const [sent, setSent] = useState(false);

  return (
    <section className={styles.section} id="appointment">
      <div className={styles.bg} aria-hidden="true">
        <img src={A.appointmentBg} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Left column — 550x729 image, radius 32 */}
        <div className={styles.aside} data-reveal>
          <div className={styles.asideMedia}>
            <img
              className={styles.asideImage}
              src={A.appointmentImage}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <button className={styles.play} type="button" aria-label="Play clinic video">
              <svg width="26" height="28" viewBox="0 0 26 28" fill="currentColor" aria-hidden="true">
                <path d="M25 12.27a2 2 0 0 1 0 3.46L3.5 27.7A2 2 0 0 1 .5 26V2A2 2 0 0 1 3.5.3Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right column — 785 wide panel, padding 32/48, radius 32 */}
        <div
          className={styles.panel}
          data-reveal
          style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
        >
          <div className={styles.panelHead}>
            <p className={styles.eyebrow}>
              <img src={A.appointmentEyebrowIcon} alt="" />
              Schedule a Visit
            </p>
            <h2 className={styles.title}>Schedule Your Dental Appointment</h2>
          </div>

          <form
            className={styles.grid}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor="ap-name">
                Full Name <span>*</span>
              </label>
              <input
                className={styles.control}
                id="ap-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ap-email">
                Email <span>*</span>
              </label>
              <input
                className={styles.control}
                id="ap-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ap-phone">
                Phone <span>*</span>
              </label>
              <input
                className={styles.control}
                id="ap-phone"
                name="phone"
                type="tel"
                required
                placeholder="+00 000 000 000"
                autoComplete="tel"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ap-when">
                Date &amp; Time
              </label>
              <input
                className={styles.control}
                id="ap-when"
                name="when"
                type="datetime-local"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ap-department">
                Department
              </label>
              <select
                className={styles.control}
                id="ap-department"
                name="department"
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ap-doctor">
                Dentist
              </label>
              <select
                className={styles.control}
                id="ap-doctor"
                name="doctor"
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                {DOCTORS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label className={styles.label} htmlFor="ap-message">
                Message <span>*</span>
              </label>
              <textarea
                className={styles.control}
                id="ap-message"
                name="message"
                required
                placeholder="Tell us what you need help with"
              />
            </div>

            <div className={`${styles.foot} ${styles.full}`}>
              <Button variant="primary" type="submit">
                Submit Your Request
              </Button>
              <p className={styles.status} role="status">
                {sent
                  ? "Thanks! We've received your request and will reach out shortly to confirm your appointment."
                  : ""}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
