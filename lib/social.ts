/** One marquee cycle: 7 small tiles plus the oversized centre tile. */
export type Tile = { src: string; big?: boolean; offset: number };

export const SOCIAL_TILES: Tile[] = [
  { src: "/organic/social/5mDhMweqg9sRxWW8eh7OxXc301Y.png", offset: 155 },
  { src: "/organic/social/BOBsxPlDUMqdMpr874hcOflce64.png", offset: 85 },
  { src: "/organic/reviews/lFcAnB84ENMMp088vcUPqXmCJ9U.png", offset: 155 },
  { src: "/organic/social/Qq9qahEMKXIKRQNyJEOjrPeQPxM.png", big: true, offset: 0 },
  { src: "/organic/social/ZiQhNSE6DREJkfx2WF7kJaVxiY.png", offset: 155 },
  { src: "/organic/reviews/emKEqEKPzHlQcgKsXOolhFIgjrk.png", offset: 85 },
  { src: "/organic/social/FxUiqmqlAz2XDcdo3ur5GppwU8.png", offset: 155 },
  { src: "/organic/reviews/h4iZFJmHFiYyBBydo0g482s2c4.png", offset: 85 },
];
