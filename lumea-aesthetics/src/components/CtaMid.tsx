"use client";
import { CTA_MID } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import { onAnchorClick } from "@/lib/scroll";
import s from "./CtaMid.module.css";

export default function CtaMid() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  return (
    <section className={s.section}>
      <div className={`${s.inner} ${visible ? s.visible : ""}`} ref={ref} data-reveal>
        <p className={s.text}>{CTA_MID.text}</p>
        <a href="#visit" className="btn btn-primary" onClick={onAnchorClick}>{CTA_MID.button}</a>
      </div>
    </section>
  );
}
