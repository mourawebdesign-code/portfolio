import { ABeeZee, Inter } from "next/font/google";

/* Scoped to the Filosofia section only — the Figma reference uses ABeeZee
   and Inter instead of the site's own PP Mori / PP Editorial New, and the
   brief calls for pixel-exact reproduction, not a substitution with the
   project's existing type family. */
export const abeezee = ABeeZee({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-abeezee",
  display: "swap",
});

export const interFigma = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter-figma",
  display: "swap",
});
