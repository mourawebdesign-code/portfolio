import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "dark" | "light" | "ghost";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  withIcon?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

export function Button({
  children,
  variant = "dark",
  href,
  withIcon = true,
  className = "",
  ...rest
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`.trim();

  const inner = (
    <>
      <span>{children}</span>
      {withIcon && (
        <span className={styles.icon}>
          <ArrowRight size={18} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} type="button" {...rest}>
      {inner}
    </button>
  );
}

export function TextLink({
  children,
  href = "#",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a className={`${styles.link} ${className}`.trim()} href={href}>
      <span>{children}</span>
      <ArrowRight size={18} />
    </a>
  );
}
