import React from "react";
import { Brand } from "@/components/ui/PageElements";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="page-container">
        <div className="footer-top">
          {/* Left Column: Brand & Tagline matching Figma 2:322 */}
          <div className="footer-brand">
            <Brand footer />
            <p className="footer-tagline">
              Protection starts with a wise choice.
            </p>
          </div>

          {/* Right Columns matching Figma Container 2:332 with 70px gap */}
          <div className="footer-columns">
            {/* Column 1: Navigate */}
            <div className="footer-column">
              <h4 className="font-mono text-[11px] leading-[16.5px] tracking-[1.1px] text-white/40 uppercase">
                Navigate
              </h4>
              <ul className="footer-links">
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
            <div className="footer-column">
              <h4 className="font-mono text-[11px] leading-[16.5px] tracking-[1.1px] text-white/40 uppercase">
                Navigate
              </h4>
              <ul className="footer-links">
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
            <div className="footer-column">
              <h4 className="font-mono text-[11px] leading-[16.5px] tracking-[1.1px] text-white/40 uppercase">
                Support
              </h4>
              <ul className="footer-links">
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
        <div className="footer-divider" />

        {/* Bottom Attribution and Copyright */}
        <div className="footer-bottom">
          <p>An Avdesh Mishra Capitals company</p>
          <p>© 2026 Insure Wisely. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
