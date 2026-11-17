import Image from "next/image";
import { CtaLink } from "@/components/ui/PageElements";
import { Lines } from "@/components/insurance/Lines";
import { HealthLeadForm } from "./HealthLeadForm";

// Figma 1001:601 (mirrored family photo under a #cecece inner-shadow vignette), 1001:604 copy, 1001:785/787 badges, 1001:768 form
export function HealthHero() {
  return <section className="section hh-hero" aria-labelledby="health-hero-title">
    <div className="hh-stage">
      {/* The badges ride on the photo layer so they keep their spot on it at every size */}
      <div className="hh-photo">
        <Image src="/images/health-insurance/hero-family.png" alt="" width={1672} height={941} priority sizes="(max-width: 1023px) 1100px, 1600px" />
        <span className="hh-pill hh-pill-hospitals">14K+ Hospitals</span>
        <span className="hh-pill hh-pill-claims">24/7 Claim Support</span>
      </div>
      <div className="page-container hh-hero-copy">
        <p className="ti-hero-intro">Protect the life you&rsquo;ve built.</p>
        <h1 id="health-hero-title" className="display-heading">Health cover that makes sense for you.</h1>
        <p className="ti-hero-description"><Lines lines={["Understand your needs, explore the right options and choose a", "health plan that works for you and your family."]} /></p>
        <CtaLink href="#get-started">Talk to expert</CtaLink>
      </div>
    </div>
    <div className="page-container hh-lead-wrap">
      <HealthLeadForm />
    </div>
  </section>;
}
