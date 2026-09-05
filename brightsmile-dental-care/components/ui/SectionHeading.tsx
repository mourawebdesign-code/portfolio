import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "stack" | "split";
  aside?: ReactNode;
  titleMax?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "stack",
  aside,
  titleMax,
  className = "",
}: Props) {
  return (
    <div
      className={`${styles.head} ${className}`.trim()}
      data-align={align}
      data-reveal
    >
      <div>
        <p className={styles.eyebrowRow}>
          <span className={styles.dot} aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
        </p>
        <h2
          className={styles.title}
          style={titleMax ? ({ "--title-max": titleMax } as React.CSSProperties) : undefined}
        >
          {title}
        </h2>
        {body && <p className={styles.body}>{body}</p>}
      </div>
      {aside}
    </div>
  );
}
