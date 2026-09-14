"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[100px] flex items-center ${
        isScrolled
          ? "bg-[#030b0f]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo matching Figma 2:97 & 2:103 (284x54 px in original, scaled for navbar) */}
        <div className="flex items-center gap-10 sm:gap-14">
          <Link href="/" className="flex items-center group">
            <div className="relative w-[210px] h-[40px] sm:w-[240px] sm:h-[46px] flex-shrink-0">
              <Image
                src="/images/logo.svg"
                alt="Insure Wisely"
                fill
                unoptimized
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation matching Figma Frame 1618872645 (gap 16px) */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="text-white hover:text-white/80 font-sans font-medium text-base leading-[22px] px-4 py-2 rounded-[4px] transition-colors"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-white hover:text-white/80 font-sans font-medium text-base leading-[22px] px-4 py-2 rounded-[4px] transition-colors"
            >
              About
            </Link>
            <div className="relative group cursor-pointer flex items-center gap-2 px-4 py-2 rounded-[4px] text-white hover:text-white/80 font-sans font-medium text-base leading-[22px] transition-colors">
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-80" />

              <div className="absolute top-full left-0 pt-2 hidden group-hover:block w-52">
                <div className="bg-[#091a2a] border border-white/15 rounded-lg shadow-2xl py-2 backdrop-blur-md">
                  <Link
                    href="#services"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Your Health
                  </Link>
                  <Link
                    href="#services"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Your Family
                  </Link>
                  <Link
                    href="#services"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Your Assets
                  </Link>
                  <Link
                    href="#services"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Your Future
                  </Link>
                  <Link
                    href="#services"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Your Income
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer flex items-center gap-2 px-4 py-2 rounded-[4px] text-white hover:text-white/80 font-sans font-medium text-base leading-[22px] transition-colors">
              <span>Resources</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-80" />

              <div className="absolute top-full left-0 pt-2 hidden group-hover:block w-48">
                <div className="bg-[#091a2a] border border-white/15 rounded-lg shadow-2xl py-2 backdrop-blur-md">
                  <Link
                    href="#process"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10"
                  >
                    How It Works
                  </Link>
                  <Link
                    href="#faq"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Support & FAQs
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Talk to Us Button matching Figma Frame 1618872644 (104x38 px, r=7px, border 1px white) */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center border border-white hover:bg-white hover:text-[#0a1118] text-white font-sans font-medium text-base tracking-[-0.48px] w-[104px] h-[38px] rounded-[7px] transition-all duration-200"
          >
            Talk to us
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[100px] left-0 right-0 bg-[#030b0f]/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-sans text-lg py-2 border-b border-white/10"
          >
            Home
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-sans text-lg py-2 border-b border-white/10"
          >
            About
          </Link>
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-sans text-lg py-2 border-b border-white/10"
          >
            Services
          </Link>
          <Link
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-sans text-lg py-2 border-b border-white/10"
          >
            Resources
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center bg-[#ff7e3d] text-white font-bold py-3 rounded-lg mt-4"
          >
            Talk to us
          </Link>
        </div>
      )}
    </header>
  );
};
