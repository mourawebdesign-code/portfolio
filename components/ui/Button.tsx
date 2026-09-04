import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Variant = "primary" | "secondary" | "onDark" | "link";

type Common = {
  variant?: Variant;
  /** seta à direita: "right" (CTA) | "upRight" (link textual) | "none" */
  arrow?: "right" | "upRight" | "none";
  icon?: ReactNode;
  small?: boolean;
  block?: boolean;
  children: ReactNode;
  className?: string;
};

function classes({ variant = "primary", small, block, className }: Common) {
  return [
    styles.btn,
    styles[variant],
    small ? styles.small : "",
    block ? styles.block : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function Arrow({ arrow, variant }: Pick<Common, "arrow" | "variant">) {
  const kind = arrow ?? (variant === "link" ? "upRight" : "right");
  if (kind === "none") return null;
  return kind === "upRight" ? <ArrowUpRight /> : <ArrowRight />;
}

export function ButtonLink({
  href,
  ...props
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { variant, arrow, icon, small, block, children, className, ...rest } =
    props;
  return (
    <a
      href={href}
      className={classes({ variant, small, block, className, children })}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      <Arrow arrow={arrow} variant={variant} />
    </a>
  );
}

export function Button({
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant, arrow, icon, small, block, children, className, ...rest } =
    props;
  return (
    <button
      className={classes({ variant, small, block, className, children })}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      <Arrow arrow={arrow} variant={variant} />
    </button>
  );
}
