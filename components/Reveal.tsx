"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import styles from "./Reveal.module.css";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** seconds */
  delay?: number;
  /** px travelled on the Y axis; negative comes from above */
  distance?: number;
  scaleFrom?: number;
  transition?: "tween" | "spring";
  /** "load" fires on mount, "scroll" waits for the element to enter view */
  trigger?: "load" | "scroll";
};

export default function Reveal({
  children,
  as = "div",
  className,
  style,
  delay = 0,
  distance = 50,
  scaleFrom,
  transition = "tween",
  trigger = "load",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (trigger === "load") {
      const t = window.setTimeout(() => setShown(true), delay * 1000);
      return () => window.clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.setTimeout(() => setShown(true), delay * 1000);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, trigger]);

  const from =
    scaleFrom !== undefined
      ? `scale(${scaleFrom})`
      : `translateY(${distance}px)`;

  // Both states are driven inline so that no class-order or specificity
  // question can leave an element stuck in its start state.
  return createElement(
    as,
    {
      ref,
      className: [styles.base, styles[transition], className]
        .filter(Boolean)
        .join(" "),
      style: {
        ...style,
        opacity: shown ? 1 : 0.001,
        transform: shown ? "none" : from,
      },
    },
    children,
  );
}
