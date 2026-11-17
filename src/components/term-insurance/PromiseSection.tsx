import Image from "next/image";
import { CtaLink, Eyebrow } from "@/components/ui/PageElements";

// Row-major, matching the two-column list in Figma 1001:393
const PROMISES = ["No complicated jargon", "Personalised recommendations", "Transparent explanations", "Expert guidance", "Focus on your family's needs", "No unnecessary pressure"];

// Figma 1001:381
export function PromiseSection() {
  return <section className="section ti-promise" aria-labelledby="promise-title">
    <div className="page-container ti-promise-grid">
      <div className="ti-promise-copy">
        <Eyebrow>The Insure Wisely promise</Eyebrow>
        <h2 id="promise-title" className="display-heading">Insurance without the confusion.</h2>
        <ul className="ti-checklist">
          {PROMISES.map(promise => <li key={promise}><Image src="/images/term-insurance/check.svg" alt="" width={26} height={26} unoptimized />{promise}</li>)}
        </ul>
        <CtaLink href="#get-started">Get started now</CtaLink>
      </div>
      <Image className="ti-shield" src="/images/term-insurance/shield.svg" alt="" width={320} height={381} unoptimized />
    </div>
  </section>;
}
