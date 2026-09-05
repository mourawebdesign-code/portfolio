import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Self-hosted so the build never depends on a network fetch at compile time.
   Both families are variable fonts — one file per subset covers 400–700. */

const bricolage = localFont({
  src: [
    { path: "../public/fonts/bricolage-latin.woff2", style: "normal" },
    { path: "../public/fonts/bricolage-latin-ext.woff2", style: "normal" },
  ],
  weight: "400 700",
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const instrument = localFont({
  src: [
    { path: "../public/fonts/instrument-latin.woff2", style: "normal" },
    { path: "../public/fonts/instrument-latin-ext.woff2", style: "normal" },
  ],
  weight: "400 700",
  variable: "--font-instrument",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "BrightSmile Dental Care — Dental Health",
  description:
    "Front-end reproduction study of the BrightSmile Dental Care dental clinic layout.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
