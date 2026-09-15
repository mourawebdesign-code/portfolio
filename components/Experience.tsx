"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./Experience.module.css";
import Reveal from "./Reveal";

/** Local reveal for the carousel: clip-path + opacity, which the shared
    Reveal component (translate + opacity only) doesn't do. The observed
    element must stay geometrically unclipped — a clip-path on it would
    make its own visible area (and so its IntersectionObserver ratio)
    permanently zero, a deadlock where the hidden state prevents ever
    detecting it's in view. So the ref lives on a plain outer box, and the
    clip-path + opacity reveal is applied to an inner one instead. */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      io.disconnect();
    }

    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

type Slide = {
  src: string;
  alt: string;
  objectPosition: string;
};

const SLIDES: Slide[] = [
  {
    src: "/organic/experiencia/momento-equipe.png",
    alt: "Recepção da AURÉA: equipe recebendo uma paciente com atenção e cordialidade",
    objectPosition: "center 20%",
  },
  {
    src: "/organic/experiencia/momento-presente.png",
    alt: "Detalhe do acolhimento: um gesto de cuidado ao final da visita",
    objectPosition: "center 40%",
  },
  {
    src: "/organic/experiencia/momento-procedimento.png",
    alt: "Procedimento conduzido com cuidado, em ambiente calmo e acolhedor",
    objectPosition: "center 32%",
  },
];

/** Native scroll-snap carousel: touch/trackpad scroll horizontally for
    free, and a small pointer-drag layer teaches the mouse to do the same
    (click-drag-to-scroll), so there is one code path for every input
    instead of separate touch/mouse implementations. */
function Carousel() {
  const [wrapRef, wrapShown] = useInView<HTMLDivElement>(0.15);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const dragState = useRef<{ startX: number; startScroll: number; dragging: boolean } | null>(null);
  const animRef = useRef<number>(0);

  // A hand-rolled tween rather than `scrollTo({behavior:"smooth"})`: the
  // native smooth-scroll is a documented no-op in some automated/embedded
  // Chromium contexts (it silently never animates at all there), and this
  // also gives the exact sophisticated ease-out the brief calls for
  // instead of the browser's default scroll timing.
  const animateScrollTo = useCallback((target: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    cancelAnimationFrame(animRef.current);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = viewport.scrollLeft;
    const distance = target - start;
    if (Math.abs(distance) < 1) return;
    if (reduceMotion) {
      viewport.scrollLeft = target;
      return;
    }

    const duration = 560;
    const startTime = performance.now();
    const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      viewport.scrollLeft = start + distance * easeOutExpo(t);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, index));
      const slide = viewport.children[0]?.children[clamped] as HTMLElement | undefined;
      if (slide) animateScrollTo(slide.offsetLeft);
    },
    [animateScrollTo],
  );

  const getNearestIndex = useCallback(() => {
    const viewport = viewportRef.current;
    const track = viewport?.children[0] as HTMLElement | undefined;
    if (!viewport || !track) return 0;
    let closest = 0;
    let closestDist = Infinity;
    [...track.children].forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - viewport.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let raf = 0;
    let settleTimer = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(getNearestIndex()));

      // Trackpad/wheel scrolling has no pointerup to hook a snap onto, so
      // settle to the nearest slide once scrolling has been quiet for a
      // moment. Pointer-drag drives scrollLeft directly too (also firing
      // "scroll"), so skip the auto-settle while a drag is in progress —
      // endDrag already snaps explicitly once the gesture ends.
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (dragState.current?.dragging) return;
        scrollToIndex(getNearestIndex());
      }, 140);
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
    };
  }, [getNearestIndex, scrollToIndex]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    cancelAnimationFrame(animRef.current);
    dragState.current = { startX: e.clientX, startScroll: viewport.scrollLeft, dragging: false };
    viewport.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const viewport = viewportRef.current;
    if (!state || !viewport) return;
    const delta = e.clientX - state.startX;
    if (!state.dragging && Math.abs(delta) > 4) {
      state.dragging = true;
      viewport.classList.add(styles.dragging);
    }
    if (state.dragging) {
      viewport.scrollLeft = state.startScroll - delta;
    }
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (state?.dragging) {
      viewport.classList.remove(styles.dragging);
      const nearest = getNearestIndex();
      setActive(nearest);
      requestAnimationFrame(() => scrollToIndex(nearest));
    }
    dragState.current = null;
    if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
  };

  return (
    <div ref={wrapRef} className={styles.carouselOuter}>
      <div className={`${styles.carouselInner} ${wrapShown ? styles.shown : ""}`}>
        <div
          ref={viewportRef}
          className={styles.viewport}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="group"
          aria-roledescription="carousel"
          aria-label="Fotografias da experiência AURÉA"
        >
          <div className={styles.track}>
            {SLIDES.map((slide, i) => (
              <figure
                key={slide.src}
                className={styles.slide}
                aria-hidden={i !== active}
              >
                <div className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    style={{ objectPosition: slide.objectPosition }}
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <span className={styles.counter}>
            {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Imagem anterior"
            onClick={() => scrollToIndex(active - 1)}
          >
            <ArrowGlyph dir="left" />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Próxima imagem"
            onClick={() => scrollToIndex(active + 1)}
          >
            <ArrowGlyph dir="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ArrowGlyph({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M8.4 2.6 3.6 7l4.8 4.4" : "M5.6 2.6 10.4 7l-4.8 4.4"}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Experience() {
  return (
    <section className={styles.section} id="experiencia">
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <Reveal trigger="scroll" distance={6}>
            <p className={styles.eyebrow}>Experiência</p>
          </Reveal>

          <Reveal trigger="scroll" distance={18} delay={0.06}>
            <h2 className={styles.title}>
              Cuidado em <em>cada detalhe</em>.
            </h2>
          </Reveal>

          <Reveal trigger="scroll" distance={12} delay={0.12}>
            <p className={styles.lead}>
              Da primeira conversa ao acompanhamento, cada etapa foi pensada
              para que você se sinta segura, acolhida e confiante.
            </p>
          </Reveal>

          <Reveal trigger="scroll" distance={12} delay={0.17}>
            <p className={styles.sub}>
              Ambiente, atendimento e cuidado caminham juntos para
              transformar cada visita em uma experiência leve e pessoal.
            </p>
          </Reveal>

          <Reveal trigger="scroll" distance={10} delay={0.22}>
            <a
              className={styles.cta}
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer"
            >
              Agendar minha avaliação <span className={styles.ctaArrow}>→</span>
            </a>
          </Reveal>
        </div>

        <div className={styles.visualCol}>
          <Carousel />
        </div>
      </div>

      <Reveal trigger="scroll" distance={12} delay={0.1} className={styles.values}>
        <div className={styles.valueItem}>
          <p className={styles.valueLabel}>Atendimento individual</p>
          <p className={styles.valueText}>Cada experiência começa pela escuta.</p>
        </div>
        <div className={styles.valueItem}>
          <p className={styles.valueLabel}>Ambiente pensado para acolher</p>
          <p className={styles.valueText}>Conforto, privacidade e cuidado em cada visita.</p>
        </div>
        <div className={styles.valueItem}>
          <p className={styles.valueLabel}>Acompanhamento</p>
          <p className={styles.valueText}>O cuidado continua depois do procedimento.</p>
        </div>
      </Reveal>
    </section>
  );
}
