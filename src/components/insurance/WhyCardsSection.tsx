import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CtaLink, Eyebrow } from "@/components/ui/PageElements";
import { Lines } from "./Lines";

// leadWidth mirrors a narrower Figma text box so the line breaks match
export type WhyCard = { icon: string; title: string; lead?: string; leadWidth?: number; body: string[] };

// "Why consider" heading row + three icon cards (Figma 1001:127 / 1001:531). Children render full-bleed after the cards.
export function WhyCardsSection({ id, eyebrow, title, cards, cta, className = "", children }: {
  id: string; eyebrow: string; title: string; cards: WhyCard[]; cta?: { label: string; href: string }; className?: string; children?: ReactNode;
}) {
  return <section className={`section ti-why ${className}`} aria-labelledby={id}>
    <div className="page-container">
      <div className="section-heading-row">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={id} className="display-heading">{title}</h2>
        </div>
        {cta && <CtaLink href={cta.href}>{cta.label}</CtaLink>}
      </div>
      <div className="ti-why-cards">
        {cards.map(card => <article className="ti-why-card" key={card.title}>
          <Image src={card.icon} alt="" width={84} height={84} />
          <div>
            <h3>{card.title}</h3>
            {card.lead && <p className="ti-why-lead" style={card.leadWidth ? { "--lead-w": `${card.leadWidth}px` } as CSSProperties : undefined}>{card.lead}</p>}
            <p className="ti-why-body"><Lines lines={card.body} /></p>
          </div>
        </article>)}
      </div>
    </div>
    {children}
  </section>;
}
