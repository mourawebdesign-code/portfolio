import styles from "./Media.module.css";

type MediaProps = {
  /** Slot id — cross-references public/placeholders/MANIFEST.md. */
  id: string;
  /** Width / height of the box the reference reserves, e.g. "429 / 466". */
  ratio: string;
  /** Drop a real asset in here during the personalisation pass. */
  src?: string;
  alt?: string;
  /** object-position, for crops that are not centred. */
  focal?: string;
  radius?: string;
  zoom?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function Media({
  id,
  ratio,
  src,
  alt = "",
  focal,
  radius,
  zoom = false,
  className = "",
  children,
}: MediaProps) {
  return (
    <div
      className={`${styles.media} ${zoom ? styles.zoom : ""} ${className}`.trim()}
      style={{
        aspectRatio: ratio,
        ...(focal ? ({ "--focal": focal } as React.CSSProperties) : {}),
        ...(radius ? ({ "--radius": radius } as React.CSSProperties) : {}),
      }}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={alt || id}>
          <span className={styles.label}>{id}</span>
        </div>
      )}
      {children}
    </div>
  );
}
