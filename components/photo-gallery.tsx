"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  { src: "/gallerypics/bali_vw_08.jpg", alt: "Classic Volkswagen on a village road", title: "Village roads", label: "Slow travel" },
  { src: "/gallerypics/bali_vw_13.jpg", alt: "Guests visiting a Balinese temple", title: "Temple mornings", label: "Local culture" },
  { src: "/gallerypics/bali_vw_18.jpg", alt: "A classic Volkswagen seen from above", title: "Top-down days", label: "The VW feeling" },
  { src: "/gallerypics/bali_vw_22.jpg", alt: "Guests enjoying golden hour in Bali", title: "Golden hour", label: "Worth the detour" },
  { src: "/gallerypics/bali_vw_03.jpg", alt: "Classic Volkswagen beside Bali scenery", title: "Open-road moments", label: "Made for exploring" },
  { src: "/gallerypics/bali_vw_16.jpg", alt: "Bali countryside from a classic Volkswagen", title: "Green Bali", label: "Beyond the postcard" },
  { src: "/gallerypics/bali_vw_21.jpg", alt: "Guests riding through Bali", title: "Good company", label: "Your day, your pace" },
  { src: "/gallerypics/bali_vw_25.jpg", alt: "A scenic Bali tour stop", title: "Little stops", label: "Part of the story" },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelectedPhoto(null);
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  return (
    <section id="gallery" className="scroll-mt-24 bg-[#fbfaf6] py-24 lg:py-32">
      <div className="container-max container-padding">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="script text-4xl">The good stuff</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-black uppercase tracking-tight sm:text-5xl">Moments from the road</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-black/55 sm:text-right">Real days, real guests, and the little unscheduled stops that make the story.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              className={`${index % 4 === 1 || index % 4 === 3 ? "lg:mt-10" : ""} gallery-photo group relative aspect-[3/4] overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#79924f]`}
              aria-label={`Enlarge photo: ${photo.title}`}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <span className="text-[8px] font-bold uppercase tracking-[.2em] text-white/65">{photo.label}</span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase sm:text-2xl">{photo.title}</h3>
              </div>
              <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center border border-white/50 text-sm text-white opacity-0 transition group-hover:opacity-100" aria-hidden>↗</span>
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1d211e]/95 p-5 sm:p-10" role="dialog" aria-modal="true" aria-label={selectedPhoto.title} onClick={() => setSelectedPhoto(null)}>
          <button type="button" onClick={() => setSelectedPhoto(null)} className="absolute right-5 top-5 grid h-10 w-10 place-items-center border border-white/40 text-2xl text-white" aria-label="Close photo viewer">×</button>
          <div className="relative h-[78vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <Image src={selectedPhoto.src} alt={selectedPhoto.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[.18em] text-white/65 sm:bottom-8 sm:left-10">{selectedPhoto.label} · {selectedPhoto.title}</p>
        </div>
      ) : null}
    </section>
  );
}
