import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import CTA from "@/components/cta";
import GuestShowcase from "@/components/guest-showcase";
import { SITES } from "@/lib/domains";

const site = SITES.vwbali;

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "VW Bali Tours",
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/gallerypics/bali_vw_01.jpg`,
        width: 1200,
        height: 900,
        alt: "Guests on a classic Volkswagen safari tour in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/gallerypics/bali_vw_01.jpg`],
  },
};

export default function VwBaliPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gray-900 text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src="/bobby-vw-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="container-max container-padding relative text-center">
          <span className="badge bg-white text-gray-900">Guest Experiences</span>
          <h1 className="section-title mt-4 mb-6 text-white text-balance">
            See Bali Through Our Guests&apos; Eyes
          </h1>
          <p className="section-subtitle mx-auto max-w-2xl text-gray-200 text-balance">
            Photos and video moments from real travelers who&apos;ve ridden along on our classic
            Volkswagen safaris — not staged shots, just the trip as they lived it.
          </p>
        </div>
      </section>

      <GuestShowcase />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
