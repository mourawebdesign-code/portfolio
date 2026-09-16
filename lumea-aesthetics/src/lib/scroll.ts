"use client";
import type { MouseEvent } from "react";

type LenisLike = { scrollTo: (target: Element | string, opts?: Record<string, unknown>) => void };
let lenisInstance: LenisLike | null = null;

/** Chamado pelo useLenis quando a instância é criada/destruída. */
export function setLenisInstance(instance: LenisLike | null) {
  lenisInstance = instance;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Altura real da navbar fixa no momento do clique (+ respiro), para a
 * seção de destino não ficar escondida atrás dela. */
function navOffset() {
  const nav = document.querySelector("header");
  const h = nav ? nav.getBoundingClientRect().height : 88;
  return -(h + 16);
}

/** Rola suavemente até um elemento já resolvido (usado tanto pelas âncoras
 * com # quanto pelo rail de tratamentos, que navega por ref). Usa o Lenis
 * já ativo no app em vez de scrollIntoView nativo — dois motores de scroll
 * suave brigando pelo mesmo frame causa stutter. */
export function scrollToElement(el: HTMLElement, extraOffset = 0) {
  const reduced = prefersReducedMotion();
  const offset = navOffset() + extraOffset;
  if (lenisInstance && !reduced) {
    lenisInstance.scrollTo(el, { offset, duration: 1.1 });
    return;
  }
  const rect = el.getBoundingClientRect();
  const top = window.scrollY + rect.top + offset;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (el) scrollToElement(el);
}

/** onClick pronto para qualquer <a href="#secao">. Ignora hrefs vazios
 * ("#") ou externos — só intercepta âncoras internas reais. */
export function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (href && href.startsWith("#") && href.length > 1) {
    e.preventDefault();
    scrollToHash(href);
  }
}
