"use client";

import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    src: "/gallerypics/bali_vw_01.jpg",
    alt: "Temple visit",
    category: "Cultural",
  },
  {
    id: 2,
    src: "/gallerypics/bali_vw_02.jpg",
    alt: "Mountain views",
    category: "Adventure",
  },
  {
    id: 3,
    src: "/gallerypics/bali_vw_03.jpg",
    alt: "Beach sunset",
    category: "Beach",
  },
  {
    id: 4,
    src: "/gallerypics/bali_vw_04.jpg",
    alt: "Rice terraces",
    category: "Landscape",
  },
  {
    id: 5,
    src: "/gallerypics/bali_vw_05.jpg",
    alt: "Local market",
    category: "Cultural",
  },
  {
    id: 6,
    src: "/gallerypics/bali_vw_06.jpg",
    alt: "Waterfall",
    category: "Adventure",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cultural", "Adventure", "Beach", "Landscape"];

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 lg:py-32">
      <div className="container-max container-padding">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="badge">Gallery</span>
          <h2 className="section-title mb-4 mt-4">Moments to Remember</h2>
          <p className="section-subtitle">Explore our collection of unforgettable moments from Bali tours.</p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary-600 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:border-primary-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative h-64 overflow-hidden rounded-lg md:h-80"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div>
                  <p className="text-sm font-semibold text-white">{image.alt}</p>
                  <p className="text-xs text-gray-200">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-gray-600">Create your own unforgettable moments</p>
          <a href="https://wa.me/62123456789" className="btn-primary">
            Book Your Tour Today
          </a>
        </div>
      </div>
    </section>
  );
}
