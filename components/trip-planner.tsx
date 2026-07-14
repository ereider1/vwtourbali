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
    category: "landmark",
    position: [-8.6212, 115.0868],
  },
  {
    name: "Uluwatu Temple",
    region: "South",
    note: "Clifftop temple with Kecak fire dance at dusk.",
    category: "landmark",
    position: [-8.8291, 115.0849],
  },
  {
    name: "Sacred Monkey Forest",
    region: "Ubud",
    note: "Ancient temples and resident macaques.",
    category: "nature",
    position: [-8.5188, 115.2589],
  },
  {
    name: "Ubud Art Market",
    region: "Ubud",
    note: "Handwoven textiles, carvings, and souvenirs.",
    category: "adventure",
    position: [-8.5069, 115.2624],
  },
  {
    name: "Gunung Kawi",
    region: "Tampaksiring",
    note: "11th-century shrines carved into a river valley.",
    category: "landmark",
    position: [-8.4144, 115.3139],
  },
  {
    name: "Jatiluwih Rice Terraces",
    region: "Tabanan",
    note: "UNESCO-listed terraces on Mount Batukaru's slopes.",
    category: "nature",
    position: [-8.3714, 115.1281],
  },
  {
    name: "Tabanan Countryside",
    region: "Tabanan",
    note: "Quiet villages and rolling rice paddies.",
    category: "nature",
    position: [-8.5382, 115.1249],
  },
  {
    name: "Mount Batur Viewpoint",
    region: "Kintamani",
    note: "Caldera views over an active volcano and lake.",
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
    <section className="py-20 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-16 max-w-2xl">
          <span className="badge">Trip Planner</span>
          <h1 className="section-title mb-4 mt-4">Map Your Bali Safari Route</h1>
          <p className="section-subtitle">
            Use the map and itinerary guide below to plan how much of Bali you want to cover -
            from a quick south-coast loop to a full island route.
          </p>
        </div>

        {/* Map */}
        <div className="mb-16 overflow-hidden rounded-lg shadow-elevation-1">
          <InteractiveMap stops={stops} hoveredStop={hoveredStop} onHoverStop={setHoveredStop} />
        </div>

        {/* Stops list */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Route Points</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stops.map((stop) => (
              <div
                key={stop.name}
                onMouseEnter={() => setHoveredStop(stop.name)}
                onMouseLeave={() => setHoveredStop(null)}
                className={`rounded-lg border p-4 transition-colors ${
                  hoveredStop === stop.name
                    ? "border-primary-600 bg-primary-50"
                    : "border-gray-200"
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
                  {stop.region}
                </p>
                <p className="mt-1 font-semibold text-gray-900">{stop.name}</p>
                <p className="mt-1 text-sm text-gray-600">{stop.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary planner */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Plan by Trip Length</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {itineraries.map((plan) => (
              <div key={plan.days} className="rounded-lg border border-gray-200 p-6">
                <span className="badge">{plan.days}</span>
                <h3 className="mb-2 mt-4 text-xl font-bold text-gray-900">{plan.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{plan.summary}</p>
                <ol className="space-y-2">
                  {plan.route.map((stop, i) => (
                    <li key={stop} className="flex gap-2 text-sm text-gray-700">
                      <span className="font-semibold text-primary-600">{i + 1}.</span>
                      {stop}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-gray-600">Let a professional driver-guide handle the route.</p>
          <a href="https://wa.me/6281237812783" className="btn-primary">
            Book Your Safari Route
          </a>
          <p className="mt-6 text-sm text-gray-500">
            Want more detail on each stop? Read{" "}
            <a href={SITES.gobali.url} className="text-primary-600 hover:underline">
              our full attraction guides
            </a>{" "}
            at {SITES.gobali.url.replace("https://", "")}, or see{" "}
            <a href={SITES.vwbali.url} className="text-primary-600 hover:underline">
              what past guests experienced
            </a>{" "}
            at {SITES.vwbali.url.replace("https://", "")}.
          </p>
        </div>
      </div>
    </section>
  );
}
