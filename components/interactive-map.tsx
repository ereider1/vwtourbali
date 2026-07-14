"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L, { type Marker as LeafletMarker } from "leaflet";

export type MapCategory = "landmark" | "nature" | "adventure";

export interface MapStop {
  name: string;
  region: string;
  note: string;
  category: MapCategory;
  position: [number, number];
}

const CATEGORY_META: Record<MapCategory, { label: string; color: string; emoji: string }> = {
  landmark: { label: "Must-See Icons & Landmarks", color: "#a855f7", emoji: "🛕" },
  nature: { label: "Nature & Scenic Landscapes", color: "#16a34a", emoji: "🌿" },
  adventure: { label: "Adventure & Entertainment", color: "#f97316", emoji: "🥾" },
};

function createIcon(category: MapCategory) {
  const { color, emoji } = CATEGORY_META[category];
  return L.divIcon({
    className: "map-pin-icon",
    html: `<span style="
      display:flex;align-items:center;justify-content:center;
      width:32px;height:32px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      background:${color};box-shadow:0 1px 4px rgba(0,0,0,0.4);
      border:2px solid white;">
      <span style="transform:rotate(45deg);font-size:16px;line-height:1;">${emoji}</span>
    </span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
}

function FlyToStop({ target }: { target: MapStop | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target.position, Math.max(map.getZoom(), 11), { duration: 0.6 });
    }
  }, [target, map]);
  return null;
}

interface InteractiveMapProps {
  stops: MapStop[];
  hoveredStop: string | null;
  onHoverStop: (name: string | null) => void;
}

export default function InteractiveMap({ stops, hoveredStop, onHoverStop }: InteractiveMapProps) {
  const markerRefs = useRef<Record<string, LeafletMarker | null>>({});

  useEffect(() => {
    Object.entries(markerRefs.current).forEach(([name, marker]) => {
      if (!marker) return;
      if (name === hoveredStop) {
        marker.openTooltip();
      } else {
        marker.closeTooltip();
      }
    });
  }, [hoveredStop]);

  const activeStop = stops.find((s) => s.name === hoveredStop) ?? null;

  return (
    <div className="h-96 w-full">
      <MapContainer
        center={[-8.45, 115.15]}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToStop target={activeStop} />
        {stops.map((stop) => (
          <Marker
            key={stop.name}
            position={stop.position}
            icon={createIcon(stop.category)}
            ref={(el) => {
              markerRefs.current[stop.name] = el;
            }}
            eventHandlers={{
              mouseover: () => onHoverStop(stop.name),
              mouseout: () => onHoverStop(null),
            }}
          >
            <Tooltip direction="top" offset={[0, -28]}>
              <div className="max-w-[220px]">
                <p className="font-semibold text-gray-900">{stop.name}</p>
                <p className="text-xs text-gray-600">{stop.note}</p>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
        {(Object.keys(CATEGORY_META) as MapCategory[]).map((key) => (
          <span key={key} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: CATEGORY_META[key].color }}
            />
            {CATEGORY_META[key].label}
          </span>
        ))}
      </div>
    </div>
  );
}
