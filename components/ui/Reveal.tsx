"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode, Ref } from "react";

/**
 * Fade + slide-up na entrada, com stagger opcional entre filhos — o padrão
 * observado na referência. Curva cubic-bezier(0.22, 1, 0.36, 1), sem bounce,
 * dispara uma única vez.
 *
 * O gatilho é um IntersectionObserver próprio em vez do `whileInView` do
 * framer-motion: com `staggerChildren`, o `whileInView` levava o container ao
 * estado "show" mas não propagava para os <RevealChild>, que ficavam presos em
 * opacity 0. Conduzir `animate` por estado resolve a propagação e é
 * determinístico.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Mapa estático de tags animadas. Criar `motion(Tag)` dentro do render
 * geraria um componente novo a cada ciclo e remontaria a subárvore.
 */
const MOTION = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  figure: motion.figure,
} as const;

type MotionTagName = keyof typeof MOTION;

const motionTag = (as: ElementType) =>
  MOTION[(as as MotionTagName) in MOTION ? (as as MotionTagName) : "div"];

/**
 * Dispara uma única vez quando o elemento entra na viewport.
 *
 * Usa checagem de rect no mount + em scroll/resize (agendada por rAF) em vez de
 * IntersectionObserver: o IO não emite em contextos de renderização ocultos
 * (aba em background, pane oculta, captura de thumbnail), e ali o conteúdo
 * ficava preso em opacity 0 para sempre. Uma animação de entrada nunca pode
 * deixar conteúdo permanentemente invisível.
 */
function useRevealed(immediate: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let done = false;

    const check = () => {
      frame = 0;
      if (done || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // mesma margem do design: revela quando 12% do fundo da viewport passa
      if (r.top < vh * 0.88 && r.bottom > 0) {
        done = true;
        setShown(true);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      done = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [immediate]);

  return { ref, shown };
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** atraso extra antes de iniciar */
  delay?: number;
  /** aplica stagger aos filhos diretos que usarem <RevealChild> */
  stagger?: number;
  /** conteúdo above-the-fold: anima no load em vez de esperar o scroll.
      É o comportamento da hero na referência. */
  immediate?: boolean;
  id?: string;
};

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  stagger,
  immediate = false,
  id,
}: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, shown } = useRevealed(immediate);
  const MotionTag = motionTag(as);

  if (reduced) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  const container: Variants = stagger
    ? {
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE, delay },
        },
      };

  return (
    <MotionTag
      /* MOTION e uma uniao de tags, entao o ref generico nao unifica sozinho. */
      ref={ref as Ref<never>}
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

export function RevealChild({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;

  if (reduced) return <Tag className={className}>{children}</Tag>;

  const MotionTag = motionTag(as);
  return (
    <MotionTag className={className} variants={revealItem}>
      {children}
    </MotionTag>
  );
}
