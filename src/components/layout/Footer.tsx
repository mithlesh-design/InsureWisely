import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a1b2c] text-white relative pt-20 pb-12 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-16">
          {/* Left Column: Brand & Tagline matching Figma 2:322 */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center group">
              <div className="relative w-[210px] h-[40px] sm:w-[240px] sm:h-[46px] flex-shrink-0">
                <Image
                  src="/images/logo.svg"
                  alt="Insure Wisely"
                  fill
                  unoptimized
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="font-sans text-sm leading-[21px] text-white/50 pt-1">
              Protection starts with a wise choice.
            </p>
          </div>

          {/* Right Columns matching Figma Container 2:332 with 70px gap */}
          <div className="flex flex-wrap sm:flex-nowrap gap-12 sm:gap-[70px]">
            {/* Column 1: Navigate */}
            <div className="space-y-4 min-w-[88px]">
              <h4 className="font-mono text-[11px] leading-[16.5px] tracking-[1.1px] text-white/40 uppercase">
                Navigate
              </h4>
              <ul className="space-y-2.5 font-sans text-sm leading-[21px] text-white/70">
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    Insurance
                  </Link>
                </li>
                <li>
                  <Link href="#process" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Navigate (Plans) */}
            <div className="space-y-4 min-w-[88px]">
              <h4 className="font-mono text-[11px] leading-[16.5px] tracking-[1.1px] text-white/40 uppercase">
                Navigate
              </h4>
              <ul className="space-y-2.5 font-sans text-sm leading-[21px] text-white/70">
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    Insurance
                  </Link>
                </li>
                <li>
                  <Link href="#process" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="space-y-4 min-w-[122px]">
              <h4 className="font-mono text-[11px] leading-[16.5px] tracking-[1.1px] text-white/40 uppercase">
                Support
              </h4>
              <ul className="space-y-2.5 font-sans text-sm leading-[21px] text-white/70">
                <li>
                  <Link href="#faq" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#claims" className="hover:text-white transition-colors">
                    Claims
                  </Link>
                </li>
                <li>
                  <Link href="#support" className="hover:text-white transition-colors">
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link href="#privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider matching Figma Vector 14 (stroke #b4b4b4 op: 0.25) */}
        <div className="w-full h-px bg-[#b4b4b4]/25 mb-8" />

        {/* Bottom Attribution and Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[13px] leading-[19.5px] text-white">
          <p>An Avdesh Mishra Capitals company</p>
          <p>© 2026 Insure Wisely. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
