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
    <section id="content" className="py-24 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="script text-4xl">The view from the back seat</p><h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl">Real guests.<br />Real Bali.</h2></div>
          <p className="max-w-xl text-base leading-7 text-black/55 lg:ml-auto">Every trip looks different behind the wheel of a classic Bali VW. These are unscripted moments from real travelers—temple mornings, roadside coconuts and all.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {guestPhotos.map((photo, index) => (
            <div
              key={photo.src}
              className={`${index === 0 || index === 9 || index === 18 ? "col-span-2 row-span-2" : ""} group relative aspect-square overflow-hidden bg-[#263b27]`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/75 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="max-w-sm text-xs leading-5 text-white/85">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 pt-8 text-center">
          <p className="text-xs leading-6 text-black/45">
            Curious where each photo was taken? See{" "}
            <a href={SITES.gobali.url} className="font-bold text-[#425f32] hover:underline">
              our full guide to Bali&apos;s attractions
            </a>{" "}
            at {SITES.gobali.url.replace("https://", "")}, or plan your own route with{" "}
            <a href={SITES.balisafari.url} className="font-bold text-[#425f32] hover:underline">
              our trip planner
            </a>{" "}
            at {SITES.balisafari.url.replace("https://", "")}.
          </p>
        </div>
      </div>
    </section>
  );
}
