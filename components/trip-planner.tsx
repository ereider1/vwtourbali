"use client";

import { SITES } from "@/lib/domains";

const stops = [
  {
    name: "Tanah Lot",
    query: "Tanah Lot Bali",
    region: "South-West",
    note: "Iconic sea temple - go for sunset.",
  },
  {
    name: "Uluwatu Temple",
    query: "Uluwatu Temple Bali",
    region: "South",
    note: "Clifftop temple with Kecak fire dance at dusk.",
  },
  {
    name: "Sacred Monkey Forest",
    query: "Sacred Monkey Forest Sanctuary Ubud",
    region: "Ubud",
    note: "Ancient temples and resident macaques.",
  },
  {
    name: "Ubud Art Market",
    query: "Ubud Art Market Bali",
    region: "Ubud",
    note: "Handwoven textiles, carvings, and souvenirs.",
  },
  {
    name: "Gunung Kawi",
    query: "Gunung Kawi Temple Bali",
    region: "Tampaksiring",
    note: "11th-century shrines carved into a river valley.",
  },
  {
    name: "Jatiluwih Rice Terraces",
    query: "Jatiluwih Rice Terraces",
    region: "Tabanan",
    note: "UNESCO-listed terraces on Mount Batukaru's slopes.",
  },
  {
    name: "Tabanan Countryside",
    query: "Tabanan Bali",
    region: "Tabanan",
    note: "Quiet villages and rolling rice paddies.",
  },
  {
    name: "Mount Batur Viewpoint",
    query: "Mount Batur Kintamani",
    region: "Kintamani",
    note: "Caldera views over an active volcano and lake.",
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
          <iframe
            title="Bali attractions map"
            src="https://maps.google.com/maps?q=Bali%2C+Indonesia&z=10&output=embed"
            className="h-96 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Stops list */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Route Points</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stops.map((stop) => (
              <a
                key={stop.name}
                href={`https://maps.google.com/maps?q=${encodeURIComponent(stop.query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-600"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
                  {stop.region}
                </p>
                <p className="mt-1 font-semibold text-gray-900">{stop.name}</p>
                <p className="mt-1 text-sm text-gray-600">{stop.note}</p>
                <span className="mt-2 inline-block text-sm text-primary-600">View on map →</span>
              </a>
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
