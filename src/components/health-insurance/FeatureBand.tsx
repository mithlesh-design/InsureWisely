import Image from "next/image";

const FEATURES = [
  { icon: "band-guidance", title: "Expert guidance", body: "Get clear, unbiased advice from insurance experts." },
  { icon: "band-compare", title: "Plan comparisons", body: "Explore and compare suitable health insurance options." },
  { icon: "band-support", title: "Support through purchase", body: "We’re with you from shortlisting to buying the plan." },
];

// Figma 1001:789 — blue band closing the "why" section
export function FeatureBand() {
  return <div className="hh-band">
    <ul className="hh-band-list">
      {FEATURES.map(feature => <li key={feature.title}>
        <Image src={`/images/health-insurance/${feature.icon}.svg`} alt="" width={44} height={44} unoptimized />
        <div>
          <h3>{feature.title}</h3>
          <p>{feature.body}</p>
        </div>
      </li>)}
    </ul>
  </div>;
}
