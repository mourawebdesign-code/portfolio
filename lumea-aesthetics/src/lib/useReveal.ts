"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll compartilhado por todas as seções (evita reimplementar
 * IntersectionObserver em cada componente). Dispara uma única vez por
 * carregamento (não reinicia ao subir/descer). Sob prefers-reduced-motion,
 * fica visível imediatamente, sem observer. Um timeout de segurança garante
 * que o conteúdo nunca fique preso em opacity:0 caso o observer não dispare
 * por algum motivo (ver também o fallback [data-reveal] em globals.css para
 * quando o JS está desabilitado).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    const fallback = window.setTimeout(() => setVisible(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return { ref, visible };
}
