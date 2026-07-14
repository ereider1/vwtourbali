import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VW Tour Bali - Classic Volkswagen Safari Tours",
    short_name: "VW Tour Bali",
    description:
      "Explore Bali in a classic convertible Volkswagen Safari with island-wide guided tours.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf6",
    theme_color: "#263b27",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/vw-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
