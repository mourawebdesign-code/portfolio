"use client";
import Image from "next/image";
import { HERO } from "@/lib/content";
import { onAnchorClick } from "@/lib/scroll";
import s from "./Hero.module.css";

/**
 * Reprodução 1:1 do Figma "Aurea" (node 51:3) — composição centralizada,
 * absolute-position, canvas de referência 2252x1080. A section trava
 * aspect-ratio:2252/1080 e todo elemento usa % (posição/tamanho) + vw
 * (tipografia) derivados desses mesmos px do Figma, então a composição
 * inteira escala proporcionalmente em qualquer largura ≥1024px mantendo
 * as relações exatas do design. Abaixo de 1024px o Figma não define um
 * frame próprio — ver bloco mobile no CSS para a adaptação necessária.
 */
export default function Hero() {
  return (
    <section id="top" className={s.section}>
      {/* .canvas isola exatamente o frame do Figma (2252x1080, aspect-ratio
          travado). O padding-top de respiro pra navbar vive em .section,
          fora dessa caixa — não é um valor do design, é o mesmo tipo de
          folga que qualquer Hero fixa precisa, então não distorce as
          proporções internas do Figma. */}
      <div className={s.canvas}>
        <div className={s.gradientBg} aria-hidden="true" />

        {/* .tailRow não tem position própria — em desktop é ignorada (os
            filhos continuam absolute-posicionados contra .canvas); em
            mobile vira o flex item que junta "Sem" + "EXCESSOS" numa linha. */}
        <div className={s.tailRow}>
          <p className={s.titleTail}>{HERO.titleTail}</p>
          <h1 className={s.highlightWord}>{HERO.titleHighlight}</h1>
        </div>

        {/* HARMONIZAÇÃO e FACIAL são elementos independentes (não uma
            string que quebra sozinha) — cada um com left/top próprios,
            para controlar exatamente onde a 2ª linha termina em relação
            à cabeça da doutora, sem depender de word-wrap do navegador. */}
        <p className={s.titleH1}>{HERO.titleH1}</p>
        <p className={s.titleFacial}>{HERO.titleFacial}</p>

        <div className={s.portrait}>
          <Image
            src="/images/lumea/hero/Doutora.png"
            alt="Olivia Bennett, especialista em harmonização facial da Luméa"
            fill
            priority
            quality={100}
            className={s.portraitImg}
            sizes="(max-width:1023px) 80vw, 27vw"
          />
        </div>

        <div className={s.glow} aria-hidden="true">
          <div className={s.glowInner}>
            <Image src="/images/lumea/hero/glow-ellipse.svg" alt="" fill className={s.glowImg} />
          </div>
        </div>

        {/* body + actions viram um único bloco (fluxo normal por dentro),
            em vez de dois elementos independentes com top% fixo cada — se
            o parágrafo quebrar em mais linhas que no Figma (telas
            intermediárias, onde a caixa fica mais estreita em px reais),
            o CTA é empurrado junto em vez de sobrepor o texto. */}
        <div className={s.footer}>
          <p className={s.body}>{HERO.body}</p>
          <div className={s.actions}>
            <a href="#visit" className={`btn btn-primary ${s.primary}`} onClick={onAnchorClick}>{HERO.primary}</a>
            <a href="#treatments" className={`btn btn-ghost ${s.ghost}`} onClick={onAnchorClick}>{HERO.secondary}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
