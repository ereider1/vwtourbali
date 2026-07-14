"use client";

import Image from "next/image";
import { SITES } from "@/lib/domains";

const captions = [
  "The Sitorus family soaking up the sunrise on the ridge road above Kintamani.",
  "First-timers in the convertible, cruising past Tabanan's rice terraces.",
  "A honeymoon couple pulling over for photos on the coastal road to Uluwatu.",
  "Friends from Melbourne catching golden hour on the way back from Tanah Lot.",
  "A solo traveler chatting with our driver at a roadside coffee stop.",
  "Grandparents and grandkids sharing the back seat on a full-day safari.",
  "Guests waving from the VW outside Ubud's morning market.",
  "A group of four wrapped in sarongs before a temple visit.",
  "Newlyweds mid-laugh as the top comes down for the coastal stretch.",
  "A birthday group posing beside the car at a jungle waterfall stop.",
  "Kids grinning through the open window on the drive to Jatiluwih.",
  "Guests toasting with fresh coconuts at a lunch stop in the hills.",
  "A couple watching the sunset light hit the rice paddies.",
  "Friends piling back into the VW after a Gunung Kawi temple climb.",
  "A guest capturing the volcano views on the Kintamani rim road.",
  "Two sisters sharing the front seat for the drive to Monkey Forest.",
  "A family portrait in front of the car at Tanah Lot at low tide.",
  "Guests taking a break at a Tabanan viewpoint, coffee in hand.",
  "A couple's engagement shoot using the VW as a backdrop.",
  "Friends mid-conversation with our driver-guide along a quiet backroad.",
  "A guest leaning out to photograph the terraces at Jatiluwih.",
  "A group toasting the end of the day back at their hotel drop-off.",
  "Kids waving flags out the window on the way to the beach.",
  "A couple watching the surf at Uluwatu from the clifftop.",
  "Guests sharing snacks in the back seat between stops.",
  "The whole group posing for a final photo before saying goodbye.",
];

const guestPhotos = Array.from({ length: 26 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/gallerypics/bali_vw_${n}.jpg`,
    alt: captions[i] ?? `Guests on a VW Bali safari tour, photo ${n}`,
  };
});

export default function GuestShowcase() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-16 max-w-2xl">
          <span className="badge">Guest Stories</span>
          <h2 className="section-title mb-4 mt-4">Real Guests, Real Moments</h2>
          <p className="section-subtitle">
            Every trip looks different behind the wheel of a classic Bali VW. Here&apos;s what
            our guests have captured along the way — unscripted, unfiltered, and all real
            travelers on real tours.
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div]:mb-4">
          {guestPhotos.map((photo) => (
            <div
              key={photo.src}
              className="group relative overflow-hidden rounded-lg break-inside-avoid"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={450}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm text-white">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-gray-600">Want to be in the next set of photos?</p>
          <a href="https://wa.me/6281237812783" className="btn-primary">
            Book Your Own Bali Safari
          </a>
          <p className="mt-6 text-sm text-gray-500">
            Curious where each photo was taken? See{" "}
            <a href={SITES.gobali.url} className="text-primary-600 hover:underline">
              our full guide to Bali&apos;s attractions
            </a>{" "}
            at {SITES.gobali.url.replace("https://", "")}, or plan your own route with{" "}
            <a href={SITES.balisafari.url} className="text-primary-600 hover:underline">
              our trip planner
            </a>{" "}
            at {SITES.balisafari.url.replace("https://", "")}.
          </p>
        </div>
      </div>
    </section>
  );
}
