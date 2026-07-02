import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VW Tour Bali - Premium Volkswagen Tour Experience",
  description:
    "Experience the beauty of Bali in a classic convertible Volkswagen. Curated tours with professional guides.",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#4338ca" />
      </head>
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  );
}
