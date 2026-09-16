"use client";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import s from "./Testimonials.module.css";

function ReviewCard({ t }: { t: (typeof TESTIMONIALS.items)[number] }) {
  return (
    <article className={s.card}>
      <div className={s.author}>
        <Image src={`/images/lumea/testimonials/${t.avatar}.jpg`} alt="" width={40} height={40} className={s.avatar} />
        <span className={s.name}>{t.name}</span>
      </div>
      <p className={s.quote}>“{t.quote}”</p>
    </article>
  );
}

/** Depoimentos em duas linhas estáticas, cada uma centralizada
 * individualmente — os 4 depoimentos reais se dividem 2+2; se a lista
 * mudar de tamanho no futuro, a segunda linha recebe o restante e continua
 * centralizada por conta própria (justify-content:center por linha). */
export default function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const mid = Math.ceil(TESTIMONIALS.items.length / 2);
  const firstRow = TESTIMONIALS.items.slice(0, mid);
  const secondRow = TESTIMONIALS.items.slice(mid);

  return (
    <section className={s.section}>
      <div className={`${s.head} ${visible ? s.visible : ""}`} ref={ref} data-reveal>
        <span className="eyebrow">{TESTIMONIALS.eyebrow}</span>
        <h2 className={s.heading}>{TESTIMONIALS.heading}</h2>
      </div>

      <div className={s.grid}>
        <div className={s.row}>
          {firstRow.map((t) => <ReviewCard key={t.id} t={t} />)}
        </div>
        <div className={s.row}>
          {secondRow.map((t) => <ReviewCard key={t.id} t={t} />)}
        </div>
      </div>
    </section>
  );
}
