"use client";

export default function CTA() {
  return (
    <section className="bg-linear-to-r from-primary-600 to-primary-800 text-white py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Adventure?</h2>
        <p className="text-lg mb-8 opacity-90">
          Book your Island Safari Volkswagen tour today and create unforgettable memories in Bali.
        </p>
        <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Reserve your tour
        </button>
      </div>
    </section>
  );
}
