"use client";

import { useState } from "react";
import { A } from "@/lib/assets";
import { ArrowUpRight, Facebook, Instagram, LinkedIn, XSocial } from "../ui/Icon";
import styles from "./Footer.module.css";

const PAGES = ["Home", "New Patients", "About Us", "Contact Us"];
const UTILITY = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Preventive Care",
  "Emergency Dental Care",
];
const SCHEDULE = [
  "Monday - 08:00 - 20:00",
  "Tuesday - 08:00 - 20:00",
  "Wednesday - 08:00 - 20:00",
  "Thursday - 08:00 - 20:00",
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <span className={styles.divider} aria-hidden="true" />

          <div className={styles.brand} data-reveal>
            <h2 className={styles.newsletterTitle}>Subscribe to Our Newsletter</h2>
            <p className={styles.blurb}>
              We think every smile deserves proper attention, and we back that up
              with equipment and training we keep current.
            </p>

            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                className={styles.input}
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                autoComplete="email"
              />
              <button className={styles.submit} type="submit" aria-label="Subscribe">
                <ArrowUpRight size={20} />
              </button>
            </form>
            <p className={styles.note} role="status">
              {subscribed ? "You are on the list." : ""}
            </p>

            <div className={styles.socials}>
              <a className={styles.social} href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a className={styles.social} href="#" aria-label="X">
                <XSocial size={18} />
              </a>
              <a className={styles.social} href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a className={styles.social} href="#" aria-label="LinkedIn">
                <LinkedIn size={20} />
              </a>
            </div>
          </div>

          <div
            className={styles.cols}
            data-reveal
            style={{ "--reveal-delay": "0.07s" } as React.CSSProperties}
          >
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Quick Links</h3>
              <div className={styles.colList}>
                {PAGES.map((p) => (
                  <a href="#" key={p}>
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.col}>
              <h3 className={styles.colTitle}>Services</h3>
              <div className={styles.colList}>
                {UTILITY.map((p) => (
                  <a href="#" key={p}>
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.col}>
              <h3 className={styles.colTitle}>Office Hours</h3>
              <div className={styles.colList}>
                {SCHEDULE.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.rule} aria-hidden="true" />

          <div
            className={styles.wordmarkRow}
            data-reveal
            style={{ "--reveal-delay": "0.14s" } as React.CSSProperties}
          >
            <p className={styles.wordmark} aria-hidden="true">
              <span className={styles.wordmarkBright}>Bright</span>
              <span className={styles.wordmarkBadge}>
                <img src={A.logoMark} alt="" />
              </span>
              <span className={styles.wordmarkSmile}>Smile</span>
            </p>
          </div>

          <span className={styles.rule} aria-hidden="true" />

          <div className={styles.bar}>
            <p>© {new Date().getFullYear()} BrightSmile Dental Care. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
