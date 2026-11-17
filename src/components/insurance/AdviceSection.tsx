import Image from "next/image";
import { CtaLink } from "@/components/ui/PageElements";

const POINTS = [
  { title: "Understand first", body: "We explain your options in simple language before you make a decision." },
  { title: "Choose with clarity", body: "Compare what matters — coverage, exclusions, premiums and benefits." },
  { title: "Get human guidance", body: "Have questions? Speak with an expert who can help you understand your choices." },
];

// Heading, three principle cards and the advisor video still (Figma 1001:357 / 1001:662)
export function AdviceSection({ id, title, intro, cta }: { id: string; title: string; intro: string; cta?: { label: string; href: string } }) {
  return <section className="section ti-advice" aria-labelledby={id}>
    <div className="page-container ti-advice-grid">
      <div className="ti-advice-copy">
        <h2 id={id} className="display-heading">{title}</h2>
        <p className="ti-advice-intro">{intro}</p>
        <div className="ti-advice-points">
          {POINTS.map(point => <div className="ti-advice-point" key={point.title}>
            <h3>{point.title}</h3>
            <p>{point.body}</p>
          </div>)}
        </div>
        {cta && <CtaLink href={cta.href}>{cta.label}</CtaLink>}
      </div>
      <div className="ti-video">
        <Image className="ti-video-photo" src="/images/term-insurance/advisor.png" alt="An Insure Wisely advisor explaining insurance options" width={1170} height={1345} sizes="690px" />
        <Image className="ti-video-play" src="/images/term-insurance/play.svg" alt="" width={101} height={101} unoptimized />
      </div>
    </div>
  </section>;
}
