"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Tours", href: "#tours" },
    { label: "Why Us", href: "#why-us" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-elevation-1">
      <nav className="container-max container-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
              <span className="font-bold text-white">VW</span>
            </div>
            <span className="hidden font-bold text-gray-900 sm:inline">
              VW Tour Bali
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a href="#contact" className="btn-primary hidden text-sm sm:inline-flex">
              Book Now
            </a>

            <a href="#contact" className="btn-primary hidden text-sm sm:inline-flex">
              WhatsApp Bobby
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary mt-4 block w-full text-center">
              Book Now
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
