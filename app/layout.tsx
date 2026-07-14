import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Oswald } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-body" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-display" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-script" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vwtourbali.com";
const SITE_NAME = "Bali Safari Tour | VW Tour Bali";
const TITLE = "VW Tour Bali - Classic Volkswagen Safari Tours in Bali";
const DESCRIPTION =
  "Explore Bali in a classic convertible Volkswagen Safari. Island-wide guided tours, professional drivers, and unforgettable open-air adventures through rice terraces, temples, and hidden gems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | VW Tour Bali",
  },
  description: DESCRIPTION,
  keywords: [
    "VW tour Bali",
    "Bali Volkswagen safari",
    "classic VW Bali tour",
    "Bali convertible tour",
    "Bali safari tour",
    "Bali VW Beetle tour",
    "Bali island tour",
    "Bali sightseeing tour",
  ],
  authors: [{ name: "VW Tour Bali" }],
  creator: "VW Tour Bali",
  publisher: "VW Tour Bali",
  applicationName: SITE_NAME,
  category: "Travel",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Classic Volkswagen convertible safari tour in Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vwtourbali",
    creator: "@vwtourbali",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero-1.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/vw-icon.png",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#263b27",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "VW Tour Bali",
  alternateName: "Bali Safari Tour",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/hero-1.jpg`,
  logo: `${SITE_URL}/vw-logo-3.svg`,
  telephone: "+62-812-3781-2783",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bali",
    addressCountry: "ID",
  },
  areaServed: {
    "@type": "Place",
    name: "Bali, Indonesia",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${oswald.variable} ${caveat.variable} scroll-smooth`}>
      <head>
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
