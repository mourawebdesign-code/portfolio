/** Arrow glyph from the reference's sprite: a chevron plus a rule. */
export default function ChevronIcon({
  dir = "right",
  size = 24,
  className,
}: {
  dir?: "left" | "right";
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {dir === "right" ? (
        <>
          <path
            d="M 0 0 L 5.5 5.25 L 0 10.5"
            transform="translate(13.75 6.75)"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
          />
          <path
            d="M 14.25 0 L 0 0"
            transform="translate(4.75 12)"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
          />
        </>
      ) : (
        <>
          <path
            d="M 5.5 0 L 0 5.25 L 5.5 10.5"
            transform="translate(4.75 6.75)"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
          />
          <path
            d="M 14.25 0 L 0 0"
            transform="translate(4.75 12)"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
          />
        </>
      )}
    </svg>
  );
}
