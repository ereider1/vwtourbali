"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L, { type Map as LeafletMap, type Marker as LeafletMarker } from "leaflet";

export type MapCategory = "landmark" | "nature" | "adventure";

export interface MapStop {
  name: string;
  region: string;
  note: string;
  category: MapCategory;
  position: [number, number];
}

const CATEGORY_META: Record<MapCategory, { label: string; color: string; emoji: string }> = {
  landmark: { label: "Temples & landmarks", color: "#425f32", emoji: "🛕" },
  nature: { label: "Nature & landscapes", color: "#79924f", emoji: "🌿" },
  adventure: { label: "Markets & adventure", color: "#b48a4c", emoji: "🥾" },
};

function createIcon(category: MapCategory) {
  const { color, emoji } = CATEGORY_META[category];
  return L.divIcon({
    className: "map-pin-icon",
    html: `<span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};box-shadow:0 2px 8px rgba(0,0,0,.3);border:2px solid white"><span style="transform:rotate(45deg);font-size:16px;line-height:1">${emoji}</span></span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
  });
}

interface InteractiveMapProps {
  stops: MapStop[];
  hoveredStop: string | null;
  onHoverStop: (name: string | null) => void;
}

export default function InteractiveMap({ stops, hoveredStop, onHoverStop }: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRefs = useRef<Record<string, LeafletMarker>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    // Leaflet tags its container; clearing a stale tag makes Strict Mode remounts safe.
    const taggedContainer = container as HTMLDivElement & { _leaflet_id?: number };
    if (taggedContainer._leaflet_id) delete taggedContainer._leaflet_id;

    const map = L.map(container, { center: [-8.45, 115.15], zoom: 10, scrollWheelZoom: false });
    mapRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    stops.forEach((stop) => {
      const tooltip = document.createElement("div");
      const title = document.createElement("strong");
      const note = document.createElement("p");
      title.textContent = stop.name;
      note.textContent = stop.note;
      note.style.margin = "4px 0 0";
      note.style.fontSize = "12px";
      tooltip.append(title, note);

      const marker = L.marker(stop.position, { icon: createIcon(stop.category) })
        .bindTooltip(tooltip, { direction: "top", offset: [0, -28] })
        .on("mouseover", () => onHoverStop(stop.name))
        .on("mouseout", () => onHoverStop(null))
        .addTo(map);
      markerRefs.current[stop.name] = marker;
    });

    window.requestAnimationFrame(() => map.invalidateSize());

    return () => {
      markerRefs.current = {};
      mapRef.current = null;
      map.remove();
      if (taggedContainer._leaflet_id) delete taggedContainer._leaflet_id;
    };
  }, [stops, onHoverStop]);

  useEffect(() => {
    const map = mapRef.current;
    Object.entries(markerRefs.current).forEach(([name, marker]) => {
      if (name === hoveredStop) marker.openTooltip();
      else marker.closeTooltip();
    });
    const activeStop = stops.find((stop) => stop.name === hoveredStop);
    if (map && activeStop) map.flyTo(activeStop.position, Math.max(map.getZoom(), 11), { duration: 0.6 });
  }, [hoveredStop, stops]);

  return (
    <div className="h-[470px] w-full lg:h-[620px]">
      <div ref={containerRef} className="h-full w-full" aria-label="Interactive map of Bali tour stops" />
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-black/55">
        {(Object.keys(CATEGORY_META) as MapCategory[]).map((key) => (
          <span key={key} className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: CATEGORY_META[key].color }} />{CATEGORY_META[key].label}</span>
        ))}
      </div>
    </div>
  );
}
