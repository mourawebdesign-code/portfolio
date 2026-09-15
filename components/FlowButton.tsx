"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState, type AnchorHTMLAttributes } from "react";
import styles from "./FlowButton.module.css";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  text: string;
  /** Once true, the button settles into its own hover look (white fill,
      dark text, swapped arrows) on its own after a brief pause — no
      pointer needed. Opt-in so every other call site keeps working
      exactly as before, hover-only. */
  autoActivate?: boolean;
};

export default function FlowButton({ text, className, autoActivate, ...anchorProps }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!autoActivate) return;
    const t = window.setTimeout(() => setActive(true), 1000);
    return () => window.clearTimeout(t);
  }, [autoActivate]);

  return (
    <a
      className={[styles.flowBtn, active ? styles.active : "", className]
        .filter(Boolean)
        .join(" ")}
      {...anchorProps}
    >
      <ArrowRight className={`${styles.arrow} ${styles.arrowLeft}`} aria-hidden="true" />
      <span className={styles.text}>{text}</span>
      <span className={styles.circle} aria-hidden="true" />
      <ArrowRight className={`${styles.arrow} ${styles.arrowRight}`} aria-hidden="true" />
    </a>
  );
}
