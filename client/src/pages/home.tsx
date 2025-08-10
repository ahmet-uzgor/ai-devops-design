import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import SocialProof from "@/components/sections/social-proof";
import DataVisualization from "@/components/sections/data-visualization";
import Testimonials from "@/components/sections/testimonials";
import FinalCTA from "@/components/sections/final-cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <Features />
        <HowItWorks />
        <SocialProof />
        <DataVisualization />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
