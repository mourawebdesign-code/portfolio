/**
 * The thin editorial curve the reference draws across the Brand Principles and
 * Reviews sections. 1483x92 viewBox, 1px black stroke, deliberately wider than
 * the viewport so its ends bleed off both edges.
 */
export default function DecorArc({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1483 92"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 0C146.151 32.041 500.849 94.7739 750.432 89.3774C1000.01 83.981 1341.22 27.544 1480.63 0"
        stroke="currentColor"
      />
    </svg>
  );
}
