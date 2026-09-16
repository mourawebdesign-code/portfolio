import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter_Tight, Inter } from "next/font/google";
import "./globals.css";

/* Grotesk editorial usada só na Hero (subheadline/CTAs) — o resto do site
   continua em Nunito. Inter Tight tem tracking mais fechado e caixa alta
   mais firme que Nunito, sem cair para o lado "futurista"/serifado. */
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/* Inter (não-Tight) — só para a headline da Hero, replicando 1:1 a fonte
   usada no design de referência no Figma (Aurea, node 51:3). */
const inter = Inter({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-hero-title",
  display: "swap",
});

const nunito = localFont({
  src: [
    { path: "../../public/fonts/nunito-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/nunito-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/nunito-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/nunito-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/nunito-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-nunito",
  display: "swap",
  fallback: ["sans-serif"],
});

const nunitoSans = localFont({
  src: [
    { path: "../../public/fonts/nunito-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/nunito-sans-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/nunito-sans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-nunito-sans",
  display: "swap",
  fallback: ["sans-serif"],
});

const SITE_NAME = "Luméa Aesthetics";
const TITLE = "Luméa Aesthetics | Clínica de Estética em São Paulo";
const DESCRIPTION =
  "Tratamentos estéticos personalizados, com resultados naturais — injetáveis, rejuvenescimento da pele e harmonização facial em São Paulo.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_NAME,
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Oscar Freire, 1250",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01426-001",
    addressCountry: "BR",
  },
  telephone: "+55-11-4000-2847",
  email: "hello@lumeaaesthetics.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${nunitoSans.variable} ${interTight.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {/* Progressive enhancement: se o JS estiver desabilitado, o reveal-
            on-scroll nunca dispara — este bloco só é aplicado nesse caso e
            garante que o conteúdo continue visível. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
