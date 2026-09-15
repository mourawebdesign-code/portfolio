import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandPrinciples from "@/components/BrandPrinciples";
import PurePotency from "@/components/PurePotency";
import Specialist from "@/components/Specialist";
import Results from "@/components/Results";
import Reviews from "@/components/Reviews";
import Experience from "@/components/Experience";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <BrandPrinciples />
      <PurePotency />
      <Specialist />
      <Results />
      <Reviews />
      <Experience />
      <Location />
      <Footer />
    </main>
  );
}
