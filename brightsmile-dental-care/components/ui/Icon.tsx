import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/**
 * One icon family: 24px grid, 1.6 stroke, round caps — matched to the
 * reference's line-icon language. No emoji, no mixed sets.
 */
function Base({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Base>
);

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Base>
);

export const ArrowLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 12H5" />
    <path d="m11 18-6-6 6-6" />
  </Base>
);

export const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const Clock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.2 1.9" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.2 3.5h3l1.5 3.8-2 1.3a11.5 11.5 0 0 0 5.7 5.7l1.3-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m3.8 7 7.1 5.2a2 2 0 0 0 2.2 0L20.2 7" />
  </Base>
);

export const Tooth = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.2 3.2c1.3 0 2 .7 3.8.7s2.5-.7 3.8-.7c2.2 0 3.7 1.7 3.7 4.3 0 2.4-.9 3.6-1.6 6.2-.6 2.2-.7 6.3-2.6 6.3-1.6 0-1.5-3.3-2-5.2-.3-1.1-.7-1.7-1.3-1.7s-1 .6-1.3 1.7c-.5 1.9-.4 5.2-2 5.2-1.9 0-2-4.1-2.6-6.3C5.4 11.1 4.5 9.9 4.5 7.5c0-2.6 1.5-4.3 3.7-4.3Z" />
  </Base>
);

export const Sparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5 13.8 9 19.5 10.8 13.8 12.6 12 18.2 10.2 12.6 4.5 10.8 10.2 9Z" />
    <path d="M18.5 16.5 19.3 18.8 21.5 19.6 19.3 20.4 18.5 22.6 17.7 20.4 15.5 19.6 17.7 18.8Z" />
  </Base>
);

export const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.4-7 9.4-4.1-2-7-5.2-7-9.4V6Z" />
    <path d="m9 12 2.1 2.1L15.2 10" />
  </Base>
);

export const Star = ({ size = 20, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8Z" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 6 12 12" />
    <path d="M18 6 6 18" />
  </Base>
);

/* ---- Social glyphs (filled, 24px grid) ---- */

function Solid({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Facebook = (p: IconProps) => (
  <Solid {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.46-4 4.14V9.9H7.6V13h2.7v8Z" />
  </Solid>
);

export const XSocial = (p: IconProps) => (
  <Solid {...p}>
    <path d="M17.2 3h3.1l-6.8 7.8L21.5 21h-6.2l-4.9-6.4L4.8 21H1.7l7.3-8.3L2 3h6.4l4.4 5.8Zm-1.1 16.1h1.7L7.9 4.8H6.1Z" />
  </Solid>
);

export const Instagram = (p: IconProps) => (
  <Solid {...p}>
    <path d="M12 4.6c2.4 0 2.7 0 3.6.05.9.04 1.4.2 1.7.32.43.17.74.37 1.06.7.32.31.52.62.69 1.05.12.3.28.8.32 1.7.04.9.05 1.2.05 3.58s0 2.68-.05 3.58c-.04.9-.2 1.4-.32 1.7-.17.43-.37.74-.7 1.06-.31.32-.62.52-1.05.69-.3.12-.8.28-1.7.32-.9.04-1.2.05-3.58.05s-2.68 0-3.58-.05c-.9-.04-1.4-.2-1.7-.32a2.85 2.85 0 0 1-1.06-.7 2.85 2.85 0 0 1-.69-1.05c-.12-.3-.28-.8-.32-1.7C4.6 14.68 4.6 14.38 4.6 12s0-2.68.05-3.58c.04-.9.2-1.4.32-1.7.17-.43.37-.74.7-1.06.31-.32.62-.52 1.05-.69.3-.12.8-.28 1.7-.32C9.32 4.6 9.62 4.6 12 4.6ZM12 2.8c-2.5 0-2.8 0-3.75.06-.96.04-1.6.19-2.18.41-.6.23-1.1.54-1.6 1.05-.51.5-.82 1-1.05 1.6-.22.57-.37 1.22-.41 2.18C2.95 9.05 2.94 9.35 2.94 12s0 2.95.07 3.9c.4.96.19 1.6.41 2.18.23.6.54 1.1 1.05 1.6.5.51 1 .82 1.6 1.05.57.22 1.22.37 2.18.41.95.07 1.25.07 3.75.07s2.8 0 3.75-.07c.96-.04 1.6-.19 2.18-.41.6-.23 1.1-.54 1.6-1.05.51-.5.82-1 1.05-1.6.22-.57.37-1.22.41-2.18.07-.95.07-1.25.07-3.9s0-2.95-.07-3.9c-.04-.96-.19-1.6-.41-2.18a4.65 4.65 0 0 0-1.05-1.6 4.65 4.65 0 0 0-1.6-1.05c-.57-.22-1.22-.37-2.18-.41C14.8 2.8 14.5 2.8 12 2.8Zm0 4.5a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1Zm5.99-7.94a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
  </Solid>
);

export const LinkedIn = (p: IconProps) => (
  <Solid {...p}>
    <path d="M6.94 8.9V20H3.5V8.9ZM5.22 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM20.5 20h-3.44v-5.85c0-1.5-.54-2.52-1.87-2.52-1.02 0-1.62.69-1.89 1.35-.1.24-.12.57-.12.9V20H9.74s.05-10.06 0-11.1h3.44v1.57c.46-.7 1.27-1.71 3.1-1.71 2.27 0 3.97 1.48 3.97 4.66Z" />
  </Solid>
);
