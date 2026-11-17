import type { CSSProperties } from "react";
import { CtaLink } from "@/components/ui/PageElements";
import { Lines } from "./Lines";

export type Step = { title: string; lines: string[] };

// Four numbered steps on a dashed connector (Figma 1001:466 / 1001:732).
// textHeight reserves the Figma description box height so the CTA sits where the design puts it.
export function HowItWorksSection({ id, title, steps, textHeight, className = "" }: {
  id: string; title: string; steps: Step[]; textHeight?: number; className?: string;
}) {
  return <section className={`section ti-how ${className}`} aria-labelledby={id}
    style={textHeight ? { "--step-text-h": `${textHeight}px` } as CSSProperties : undefined}>
    <div className="page-container">
      <p className="ti-how-eyebrow">How it works</p>
      <h2 id={id}>{title}</h2>
      <ol className="ti-steps">
        {steps.map((step, index) => <li className="ti-step" key={step.title}>
          <span className="ti-step-number">{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p><Lines lines={step.lines} /></p>
        </li>)}
      </ol>
      <CtaLink href="#get-started">Get started now</CtaLink>
    </div>
  </section>;
}
