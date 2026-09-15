"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./ImageCompareSlider.module.css";

type Side = {
  src: string;
  alt: string;
  /** Escape hatch for sourcing a crop from a shared composite asset —
      overrides position/size on the underlying <img>. Inline so it always
      wins regardless of stylesheet order. */
  imgStyle?: CSSProperties;
};

type Props = {
  before: Side;
  after: Side;
  className?: string;
  /** Initial handle position, 0–100. */
  initial?: number;
};

export default function ImageCompareSlider({ before, after, className, initial = 50 }: Props) {
  const [position, setPosition] = useState(initial);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - step));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + step));
      e.preventDefault();
    } else if (e.key === "Home") {
      setPosition(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setPosition(100);
      e.preventDefault();
    }
  };

  return (
    <div
      ref={frameRef}
      className={`${styles.frame} ${className ?? ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Comparar antes e depois"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.img}
        src={before.src}
        alt={before.alt}
        style={before.imgStyle}
        draggable={false}
      />

      <div className={styles.afterMask} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.img}
          src={after.src}
          alt={after.alt}
          style={after.imgStyle}
          draggable={false}
        />
      </div>

      <div className={styles.divider} style={{ left: `${position}%` }}>
        <div className={styles.handle}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5.2 3.2 2 7l3.2 3.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.8 3.2 12 7l-3.2 3.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <span className={`${styles.label} ${styles.labelBefore}`}>Antes</span>
      <span className={`${styles.label} ${styles.labelAfter}`}>Depois</span>
    </div>
  );
}
