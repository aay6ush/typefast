import CTA from "@/components/landing-page/cta";
import Features from "@/components/landing-page/features";
import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Stats from "@/components/landing-page/stats";
import TestimonialsSection from "@/components/landing-page/testimonials";

const Home = () => {
  return (
    <main className="grid place-content-center mt-20">
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <TestimonialsSection />
      <Footer />
    </main>
  );
};

export default Home;
