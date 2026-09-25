import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { OneParentSection } from "@/components/sections/OneParentSection";
import { TrustMetricsSection } from "@/components/sections/TrustMetricsSection";
import { SecureFutureSection } from "@/components/sections/SecureFutureSection";
import { FourPromisesSection } from "@/components/sections/FourPromisesSection";
import { WhatMattersSection } from "@/components/sections/WhatMattersSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";
import { ClearerWaySection } from "@/components/sections/ClearerWaySection";

// Temporarily hidden per client feedback; flip to true to bring the section back.
const SHOW_TRUST_METRICS = false;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <OneParentSection />
        {SHOW_TRUST_METRICS && <TrustMetricsSection />}
        <SecureFutureSection />
        <FourPromisesSection />
        <WhatMattersSection />
        <CtaBannerSection />
        {/* One snap area taller than the viewport, so scrolling is free from here to the footer */}
        <div className="snap-end-zone">
          <ClearerWaySection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
