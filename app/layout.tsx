import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Volterra Electric | Electrical Services in Austin, TX",
  description:
    "Licensed electrical services for homes and businesses in Austin, Texas. Repairs, panel upgrades, lighting, EV chargers, wiring and commercial electrical work.",
  openGraph: {
    title: "Volterra Electric | Electrical Services in Austin, TX",
    description:
      "Licensed electrical services for homes and businesses in Austin, Texas. Repairs, panel upgrades, lighting, EV chargers, wiring and commercial electrical work.",
    siteName: "Volterra Electric",
    images: [
      {
        url: "/images/volterra/project-panel-upgrade.webp",
        width: 1536,
        height: 1024,
        alt: "Volterra Electric licensed electricians at work",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
