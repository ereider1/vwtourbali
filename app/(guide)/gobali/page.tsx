import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Contact from "@/components/contact";
import CTA from "@/components/cta";
import AttractionGuide from "@/components/attraction-guide";
import { SITES } from "@/lib/domains";

const site = SITES.gobali;

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Go Bali Tours",
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/tourpics/tanah-lot.jpg`,
        width: 1200,
        height: 900,
        alt: "Tanah Lot sea temple at sunset in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/tourpics/tanah-lot.jpg`],
  },
};

export default function GoBaliPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AttractionGuide />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
