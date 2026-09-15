export type HeroAnnotation = {
  label: string;
  /** pill anchor (its bottom-left corner), in % of the photo's own box */
  x: number;
  y: number;
  /** which way the connector sweeps out from under the pill */
  direction: "right" | "left";
};

/**
 * The pill is anchored in % of the photo's own box (so it tracks the same
 * facial landmark at any scale); the connector that hangs off it is a
 * fixed-pixel SVG sized against the pill itself, which is what keeps it as
 * short and as tightly coupled to the label as the reference.
 */
export const HERO_ANNOTATIONS: HeroAnnotation[] = [
  { label: "Volume na medida", x: 31.9, y: 32.2, direction: "right" },
  { label: "Equilíbrio", x: 65.5, y: 30.8, direction: "left" },
];

/**
 * Below ~900px the photo's own box sits much closer behind the content
 * block, so the desktop y values would land the pills behind the CTA.
 * Pushed down (and Equilíbrio left, clear of the narrower right edge).
 */
export const HERO_ANNOTATIONS_COMPACT: HeroAnnotation[] = [
  { label: "Volume na medida", x: 16, y: 33, direction: "right" },
  { label: "Equilíbrio", x: 54, y: 29, direction: "left" },
];
