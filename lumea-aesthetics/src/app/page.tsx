"use client";
import { useLenis } from "@/lib/useLenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoMarquee from "@/components/PromoMarquee";
import Philosophy from "@/components/Philosophy";
import Treatments from "@/components/Treatments";
import Rupture from "@/components/Rupture";
import Specialist from "@/components/Specialist";
import Results from "@/components/Results";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import VisitCta from "@/components/VisitCta";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  useLenis();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PromoMarquee />
        <Philosophy />
        <Treatments />
        <Rupture />
        <Specialist />
        <Results />
        <Experience />
        <Testimonials />
        <VisitCta />
        <Location />
      </main>
      <Footer />
    </>
  );
}
