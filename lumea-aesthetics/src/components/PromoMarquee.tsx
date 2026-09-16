"use client";
import { useEffect, useRef, useState } from "react";
import { PROMO } from "@/lib/content";
import s from "./PromoMarquee.module.css";

function Star() {
  return (
    <svg className={s.star} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z" fill="currentColor"/>
    </svg>
  );
}

function Group({ innerRef }: { innerRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div className={s.group} aria-hidden="true" ref={innerRef}>
      {PROMO.map((text, i) => (
        <span className={s.item} key={i}>
          <Star />
          <span className={s.text}>{text}</span>
        </span>
      ))}
    </div>
  );
}

/* O loop só é seamless se a track tiver cópias suficientes do grupo pra
   nunca "acabar o conteúdo" antes do fim do deslocamento. Com N cópias
   idênticas lado a lado, animar de translateX(0) a translateX(-100%/N)
   sempre move EXATAMENTE a largura de um grupo (é uma fração exata da
   largura da própria track, não um valor em px calculado à parte) — então
   o requisito real é só: quantas cópias cabem para a viewport nunca ficar
   sem conteúdo à frente enquanto a animação percorre até um group-width
   inteiro. Cobertura exigida no pior instante (deslocado 1 group-width):
   groupWidth (já percorrido) + containerWidth (o que ainda precisa
   aparecer) <= N * groupWidth → N >= 1 + containerWidth/groupWidth.
   +2 de folga absorve arredondamento de subpixel e evita recalcular a
   cada resize de 1px. */
function useCopyCount() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4); // chute inicial generoso — nunca fica vazio antes da 1ª medição

  useEffect(() => {
    const wrap = wrapRef.current;
    const group = groupRef.current;
    if (!wrap || !group) return;

    let raf = 0;
    const recompute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const containerWidth = wrap.clientWidth;
        const groupWidth = group.getBoundingClientRect().width;
        if (!containerWidth || !groupWidth) return;
        const needed = Math.ceil(containerWidth / groupWidth) + 2;
        setCopies((prev) => (prev === needed ? prev : needed));
      });
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(wrap);
    ro.observe(group);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return { wrapRef, groupRef, copies };
}

export default function PromoMarquee() {
  const { wrapRef, groupRef, copies } = useCopyCount();

  return (
    <div className={s.wrap} aria-label={PROMO[0]} ref={wrapRef}>
      <div className={s.band}>
        {/* --n vira a fração exata (-100%/n) que a animação percorre em
            PromoMarquee.module.css — sempre a largura de UM grupo,
            qualquer que seja n, porque é relativa à própria largura da
            track (n grupos idênticos), não um px calculado à parte. */}
        <div className={s.track} style={{ ["--n" as string]: copies }}>
          <Group innerRef={groupRef} />
          {Array.from({ length: copies - 1 }).map((_, i) => <Group key={i} />)}
        </div>
      </div>
    </div>
  );
}
