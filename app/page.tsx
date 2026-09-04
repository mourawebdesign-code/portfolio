import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { QuoteForm } from "@/components/QuoteForm";
import { Gallery } from "@/components/Gallery";
import { Blog } from "@/components/Blog";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <QuoteForm />
        <Gallery />
        <Blog />
        <Testimonials />
        <FAQ />
        <ServiceAreas />
      </main>
      <Footer />
    </>
  );
}
