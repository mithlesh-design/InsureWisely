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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <OneParentSection />
        <TrustMetricsSection />
        <SecureFutureSection />
        <FourPromisesSection />
        <WhatMattersSection />
        <CtaBannerSection />
        <ClearerWaySection />
      </main>
      <Footer />
    </div>
  );
}
