import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import CTA from "@/components/cta";
import TripPlanner from "@/components/trip-planner";
import { SITES } from "@/lib/domains";

const site = SITES.balisafari;

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Bali Safari Tours",
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/tourpics/volcano.jpg`,
        width: 1200,
        height: 900,
        alt: "Mount Batur volcano viewpoint in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/tourpics/volcano.jpg`],
  },
};

export default function BaliSafariPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <TripPlanner />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
