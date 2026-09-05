"use client";

import { useReveal } from "@/lib/useReveal";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { Journey } from "@/components/sections/Journey";
import { Solutions } from "@/components/sections/Solutions";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { Appointment } from "@/components/sections/Appointment";
import { Testimonials } from "@/components/sections/Testimonials";
import { EmergencyCTA } from "@/components/sections/EmergencyCTA";
import { Blog } from "@/components/sections/Blog";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Journey />
        <Solutions />
        <SuccessStories />
        <Appointment />
        <Testimonials />
        <EmergencyCTA />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
