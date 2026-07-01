import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Tours from "@/components/tours";
import WhyChooseUs from "@/components/why-choose-us";
import Gallery from "@/components/gallery";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import CTA from "@/components/cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Tours />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
