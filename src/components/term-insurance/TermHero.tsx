import Image from "next/image";
import type { CSSProperties } from "react";
import { LeadForm } from "./LeadForm";

// labelWidth mirrors the Figma text boxes so the labels break onto the same two lines
const FEATURES = [
  { icon: "/images/icon-family.png", label: "Financial Security for your family" },
  { icon: "/images/icon-health.png", label: "Financial Security for your health" },
  { icon: "/images/icon-future.png", label: "Keep their dreams on track", labelWidth: 138 },
];

// Figma 1001:210 / 1001:211
export function TermHero() {
  return <section className="section ti-hero" aria-labelledby="term-hero-title">
    <div className="page-container ti-hero-grid">
      <div className="ti-hero-copy">
        <p className="ti-hero-intro">Protect the life you&rsquo;ve built.</p>
        <h1 id="term-hero-title" className="display-heading">Protect the life you&rsquo;ve built.</h1>
        <p className="ti-hero-description">Insurance doesn&apos;t have to be complicated or driven by fear. Insure Wisely helps you understand your options, choose what fits your needs, and feel more confident about tomorrow.</p>
        <ul className="ti-hero-features">
          {FEATURES.map(feature => <li key={feature.label}>
            <span className="ti-feature-icon"><Image src={feature.icon} alt="" width={48} height={48} /></span>
            <p style={feature.labelWidth ? { "--label-w": `${feature.labelWidth}px` } as CSSProperties : undefined}>{feature.label}</p>
          </li>)}
        </ul>
      </div>
      <LeadForm />
    </div>
  </section>;
}
