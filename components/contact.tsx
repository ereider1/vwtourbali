"use client";

import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-900 py-20 lg:py-32 text-white">
      <div className="container-max container-padding">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="badge bg-white text-gray-900">Get In Touch</span>
          <h2 className="section-title mb-4 mt-4 text-white">Ready for Your Adventure?</h2>
          <p className="section-subtitle text-gray-300">
            Reach out to us and let&apos;s plan your perfect Bali tour with VW Tours.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3 className="mb-8 text-2xl font-bold">Contact Information</h3>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-lg bg-primary-600 p-3">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Phone</h4>
                  <p className="text-gray-300">
                    <a href="tel:+62123456789" className="hover:text-primary-400">
                      +62 123 456 789
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">Available 24/7</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-lg bg-primary-600 p-3">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">WhatsApp</h4>
                  <p className="text-gray-300">
                    <a href="https://wa.me/62123456789" className="hover:text-primary-400">
                      +62 123 456 789
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">Fastest response</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-lg bg-primary-600 p-3">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Email</h4>
                  <p className="text-gray-300">
                    <a href="mailto:info@vwtourbali.com" className="hover:text-primary-400">
                      info@vwtourbali.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">We&apos;ll reply within 2 hours</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-lg bg-primary-600 p-3">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold">Location</h4>
                  <p className="text-gray-300">Bali, Indonesia</p>
                  <p className="text-sm text-gray-400">Operating island-wide</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-12">
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <a href="#tours" className="block text-gray-300 hover:text-primary-400">
                  → Explore Tours
                </a>
                <a href="#gallery" className="block text-gray-300 hover:text-primary-400">
                  → View Gallery
                </a>
                <a href="#why-us" className="block text-gray-300 hover:text-primary-400">
                  → Why Choose Us
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl bg-gray-800 p-8">
            <form className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Tour Interest</label>
                <select className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 text-white focus:border-primary-500 focus:outline-none">
                  <option>Select a tour</option>
                  <option>Sunrise Adventure</option>
                  <option>Cultural Heritage</option>
                  <option>Beach Hopper</option>
                  <option>Adventure Expedition</option>
                  <option>Custom Tour</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Message</label>
                <textarea
                  placeholder="Tell us about your preferences..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
