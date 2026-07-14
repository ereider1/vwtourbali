"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SITES } from "@/lib/domains";
import type { MapStop } from "@/components/interactive-map";

const InteractiveMap = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
      Loading map...
    </div>
  ),
});

const stops: MapStop[] = [
  {
    name: "Tanah Lot",
    region: "South-West",
    note: "Iconic sea temple - go for sunset.",
    detail: "A wave-washed temple reached along Bali's dramatic west coast.",
    image: "/tourpics/tanah-lot.jpg",
    learnMoreHref: `${SITES.gobali.url}#tanah-lot`,
    category: "landmark",
    position: [-8.6212, 115.0868],
  },
  {
    name: "Uluwatu Temple",
    region: "South",
    note: "Clifftop temple with Kecak fire dance at dusk.",
    detail: "Pair the ocean views with the evening dance, and secure loose belongings near the monkeys.",
    image: "/tourpics/uluwatu.jpg",
    learnMoreHref: `${SITES.gobali.url}#uluwatu`,
    category: "landmark",
    position: [-8.8291, 115.0849],
  },
  {
    name: "Sacred Monkey Forest",
    region: "Ubud",
    note: "Ancient temples and resident macaques.",
    detail: "Shaded paths wind through a living sanctuary of banyan trees, shrines, and more than 1,000 macaques.",
    image: "/tourpics/monkey-forest-3.jpg",
    learnMoreHref: `${SITES.gobali.url}#monkey-forest`,
    category: "nature",
    position: [-8.5188, 115.2589],
  },
  {
    name: "Ubud Art Market",
    region: "Ubud",
    note: "Handwoven textiles, carvings, and souvenirs.",
    detail: "Visit early for cooler lanes, lighter crowds, and a relaxed browse through Ubud's cultural center.",
    image: "/tourpics/ubud-market.jpg",
    learnMoreHref: `${SITES.gobali.url}#ubud-market`,
    category: "adventure",
    position: [-8.5069, 115.2624],
  },
  {
    name: "Gunung Kawi",
    region: "Tampaksiring",
    note: "11th-century shrines carved into a river valley.",
    detail: "The atmospheric complex sits below roughly 300 steps, surrounded by river and rice-field scenery.",
    image: "/tourpics/gunung-kawi-01.jpg",
    learnMoreHref: `${SITES.gobali.url}#gunung-kawi`,
    category: "landmark",
    position: [-8.4144, 115.3139],
  },
  {
    name: "Jatiluwih Rice Terraces",
    region: "Tabanan",
    note: "UNESCO-listed terraces on Mount Batukaru's slopes.",
    detail: "Walk the quiet subak irrigation trails for wide green views well beyond the roadside lookout.",
    image: "/tourpics/jatiluwih3.jpg",
    learnMoreHref: `${SITES.gobali.url}#jatiluwih`,
    category: "nature",
    position: [-8.3714, 115.1281],
  },
  {
    name: "Tabanan Countryside",
    region: "Tabanan",
    note: "Quiet villages and rolling rice paddies.",
    detail: "A slower stretch of rural Bali, with village temples, farm roads, and roadside coffee stops.",
    image: "/tourpics/tabanan-02.jpg",
    learnMoreHref: `${SITES.gobali.url}#tabanan`,
    category: "nature",
    position: [-8.5382, 115.1249],
  },
  {
    name: "Mount Batur Viewpoint",
    region: "Kintamani",
    note: "Caldera views over an active volcano and lake.",
    detail: "Cool highland air and sweeping crater views make this a scenic alternative to the pre-dawn summit trek.",
    image: "/tourpics/volcano.jpg",
    learnMoreHref: `${SITES.gobali.url}#volcano`,
    category: "adventure",
    position: [-8.2422, 115.3752],
  },
];

const itineraries = [
  {
    days: "1 Day",
    title: "South Bali Highlights",
    route: ["Uluwatu Temple", "Tanah Lot"],
    summary:
      "A compact loop through South Bali's most iconic coastal sights, ending with sunset at Tanah Lot.",
  },
  {
    days: "3 Days",
    title: "Temples, Terraces & Culture",
    route: ["Sacred Monkey Forest", "Ubud Art Market", "Gunung Kawi", "Jatiluwih Rice Terraces", "Tanah Lot"],
    summary:
      "Combine Ubud's culture with the rice terrace landscapes further north, finishing on the coast.",
  },
  {
    days: "5 Days",
    title: "Full Island Safari",
    route: [
      "Uluwatu Temple",
      "Tanah Lot",
      "Sacred Monkey Forest",
      "Ubud Art Market",
      "Gunung Kawi",
      "Jatiluwih Rice Terraces",
      "Tabanan Countryside",
      "Mount Batur Viewpoint",
    ],
    summary:
      "The complete route from the southern coast to the volcanic highlands, covering every stop on this map.",
  },
];

export default function TripPlanner() {
  const [hoveredStop, setHoveredStop] = useState<string | null>(null);

  return (
    <section id="content" className="py-24 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="script text-4xl">Make the island yours</p><h2 className="mt-1 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl">Plot your<br />perfect route</h2></div>
          <p className="max-w-xl text-base leading-7 text-black/55 lg:ml-auto">Start with the places that pull you in. Hover a route point, compare trip lengths, then send us your shortlist—we’ll turn it into a day that flows.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.45fr_.55fr]">
          <div className="overflow-hidden bg-white shadow-[0_20px_55px_rgb(30_42_25/0.12)]"><InteractiveMap stops={stops} hoveredStop={hoveredStop} onHoverStop={setHoveredStop} /></div>
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#425f32]">Route points</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {stops.map((stop) => (
              <button
                type="button"
                key={stop.name}
                onMouseEnter={() => setHoveredStop(stop.name)}
                onMouseLeave={() => setHoveredStop(null)}
                onFocus={() => setHoveredStop(stop.name)}
                onBlur={() => setHoveredStop(null)}
                className={`border-l-2 p-3 text-left transition-all ${
                  hoveredStop === stop.name
                    ? "border-[#79924f] bg-[#eef1e7] pl-5"
                    : "border-black/10 bg-white"
                }`}
              >
                <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#79924f]">{stop.region}</p>
                <p className="mt-1 text-sm font-bold">{stop.name}</p>
                <p className="mt-1 hidden text-xs leading-5 text-black/50 lg:block">{stop.note}</p>
              </button>
            ))}
            </div>
          </div>
        </div>

        <div id="itineraries" className="mt-28 scroll-mt-24">
          <div className="mb-10 text-center"><p className="script text-4xl">How much Bali fits?</p><h2 className="font-[family-name:var(--font-display)] text-4xl font-black uppercase tracking-tight sm:text-5xl">Plan by trip length</h2></div>
          <div className="grid gap-5 lg:grid-cols-3">
            {itineraries.map((plan) => (
              <article key={plan.days} className="group bg-white p-7 shadow-[0_16px_45px_rgb(30_42_25/0.08)] transition duration-500 hover:-translate-y-2 hover:bg-[#425f32] hover:text-white">
                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#79924f]">{plan.days}</span>
                <h3 className="mb-3 mt-4 font-[family-name:var(--font-display)] text-2xl font-black uppercase leading-none">{plan.title}</h3>
                <p className="mb-5 text-sm leading-6 text-black/50 group-hover:text-white/60">{plan.summary}</p>
                <ol className="space-y-2 border-t border-black/10 pt-5 group-hover:border-white/15">
                  {plan.route.map((stop, i) => (
                    <li key={stop} className="flex gap-2 text-xs text-black/65 group-hover:text-white/75">
                      <span className="font-bold text-[#79924f]">{String(i + 1).padStart(2, "0")}</span>
                      {stop}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-black/10 pt-8 text-center">
          <p className="text-xs leading-6 text-black/45">
            Want more detail on each stop? Read{" "}
            <a href={SITES.gobali.url} className="font-bold text-[#425f32] hover:underline">
              our full attraction guides
            </a>{" "}
            at {SITES.gobali.url.replace("https://", "")}, or see{" "}
            <a href={SITES.vwbali.url} className="font-bold text-[#425f32] hover:underline">
              what past guests experienced
            </a>{" "}
            at {SITES.vwbali.url.replace("https://", "")}.
          </p>
        </div>
      </div>
    </section>
  );
}
