"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import s from "./BeforeAfterSlider.module.css";

type Props = {
  before: string;
  after: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** CSS object-position for both images, e.g. "center 35%". Defaults to "center". */
  objectPosition?: string;
};

export default function BeforeAfterSlider({ before, after, alt, width, height, className, objectPosition }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromX(e.clientX);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromX(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
  };

  return (
    <div
      className={`${s.compare} ${className || ""}`}
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={{ touchAction: "pan-y" }}
    >
      <Image
        src={after}
        alt={`${alt} — depois`}
        width={width}
        height={height}
        className={s.img}
        style={objectPosition ? { objectPosition } : undefined}
        draggable={false}
      />
      <div className={s.beforeLayer} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt={`${alt} — antes`}
          width={width}
          height={height}
          className={s.img}
          style={objectPosition ? { objectPosition } : undefined}
          draggable={false}
        />
      </div>

      <span className={`${s.tag} ${s.tagBefore}`}>Antes</span>
      <span className={`${s.tag} ${s.tagAfter}`}>Depois</span>

      <div className={s.handle} style={{ left: `${pos}%` }}>
        <button
          type="button"
          className={s.knob}
          role="slider"
          aria-label={`Comparar antes e depois — ${alt}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKey}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M9 6 4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
