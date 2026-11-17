import Image from "next/image";
import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/PageElements";
import { DragScroll } from "@/components/ui/DragScroll";
import { Lines } from "@/components/insurance/Lines";

// textWidth is each card's Figma text box (some overhang the card padding), so descriptions break on the same words
const BASICS = [
  { icon: "basics-sum-insured", title: "Sum Insured", lines: ["The total cover amount", "available for eligible medical expenses."], textWidth: 204.5 },
  { icon: "basics-room-rent", title: "Room Rent Limits", lines: ["The maximum room category or room rent covered by the policy."], textWidth: 213.8 },
  { icon: "basics-waiting", title: "Waiting Periods", lines: ["A defined period before certain illnesses or treatments become covered."], textWidth: 233 },
  { icon: "basics-copay", title: "Co-payment", lines: ["A share of the eligible medical bill that you may need to pay."], textWidth: 219 },
  { icon: "basics-network", title: "Network Hospitals", lines: ["A list of hospitals where you may get cashless treatment, subject to policy conditions."], textWidth: 238 },
  { icon: "basics-restoration", title: "Restoration Benefit", lines: ["Helps reinstate your cover", "amount after eligible claims, as defined in the policy."], textWidth: 231 },
];

// Figma 1001:613 — heading plus a card rail that runs off the right edge
export function PlanBasicsSection() {
  return <section className="section hh-basics" aria-labelledby="plan-basics-title">
    <div className="hh-basics-body">
      <div className="page-container">
        <Eyebrow>Plan basics</Eyebrow>
        <h2 id="plan-basics-title" className="display-heading"><Lines lines={["What should you look for in a health", "plan?"]} /></h2>
      </div>
      <DragScroll className="hh-basics-rail" label="Health plan basics, scroll to explore">
        {BASICS.map(card => <article className="hh-basics-card" key={card.title}>
          <Image src={`/images/health-insurance/${card.icon}.svg`} alt="" width={44} height={44} unoptimized draggable={false} />
          <h3>{card.title}</h3>
          <p style={{ "--text-w": `${card.textWidth}px` } as CSSProperties}><Lines lines={card.lines} /></p>
        </article>)}
      </DragScroll>
    </div>
  </section>;
}
