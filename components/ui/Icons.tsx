/**
 * Ícones do hero/navbar. As formas da seta e da estrela foram extraídas dos
 * próprios assets da referência (framerusercontent) para que o traço e as
 * proporções batam; as demais seguem a mesma linguagem (caixa 24x24, traço
 * arredondado, currentColor).
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: 24,
  height: 24,
  "aria-hidden": true,
  focusable: false,
};

/* Geometria do asset da referência (467x400, traço 66.667 = bem encorpado). */
export const ArrowRight = (p: IconProps) => (
  <svg
    viewBox="0 0 467 400"
    fill="none"
    stroke="currentColor"
    strokeWidth={66.667}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={24}
    height={24}
    aria-hidden
    focusable="false"
    {...p}
  >
    <path d="M33.333 200h400M266.666 366.667 433.333 200 266.666 33.333" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

/* Estrela do rating — path exato do SVG inline da referência. */
export const Star = (p: IconProps) => (
  <svg
    viewBox="0 0 18 17.454"
    fill="currentColor"
    width={18}
    height={18}
    aria-hidden
    focusable="false"
    {...p}
  >
    <path d="M 14.655 17.357 L 9.065 14.291 L 3.529 17.454 L 4.669 11.103 L 0 6.726 L 6.294 5.866 L 8.945 0 L 11.694 5.819 L 18 6.569 L 13.405 11.026 Z" />
  </svg>
);

/* Check minimalista — traço fino, sem caixa/fundo, para listas editoriais. */
export const Check = (p: IconProps) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M5 12.5 9.5 17 19 7.5" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

/* ---- Badges flutuantes da hero ---- */

export const BoltIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinejoin="round" />
  </svg>
);

export const HouseIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5 9.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
    <path d="M9.5 20v-6h5v6" />
  </svg>
);

export const BuildingIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 7.5h1M14 7.5h1M9 11.5h1M14 11.5h1M9 15.5h1M14 15.5h1" />
    <path d="M9.5 21v-3.5h5V21" />
  </svg>
);

export const OutletIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M9 8v4" />
    <path d="M15 8v4" />
    <circle cx="12" cy="16.5" r="1.4" />
  </svg>
);

/* ---- Redes sociais (rodape) ---- */

export const Facebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} aria-hidden focusable="false" {...p}>
    <path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.6C11.5 3 11 4.5 11 6.6v1.9H9V11h2v10h3V11h2.2l.3-2.5H14Z" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base} width={20} height={20} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const XSocial = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} aria-hidden focusable="false" {...p}>
    <path d="M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.7 21h-3l7-8L2.5 3h6.2l4.2 5.6L17.5 3Zm-1.1 16h1.7L7.7 4.8H5.9L16.4 19Z" />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} aria-hidden focusable="false" {...p}>
    <path d="M6.9 8.6H3.7V21h3.2V8.6ZM5.3 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.3 21h-3.2v-6c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.8 1.3-.1.2-.1.6-.1.9V21H10s.1-11.3 0-12.4h3.2v1.8c.4-.7 1.2-1.7 3-1.7 2.2 0 3.9 1.4 3.9 4.5V21Z" />
  </svg>
);
