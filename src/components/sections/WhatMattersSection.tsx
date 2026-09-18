"use client";
import Image from "next/image";
import { useRef } from "react";
import { CtaLink, Eyebrow } from "@/components/ui/PageElements";
const domains = [
  { title: "Your Health", image: "health", description: "Protection when your health takes an unexpected turn." },
  { title: "Your Family", image: "family", description: "Help protect the people who depend on you." },
  { title: "Your Assets", image: "assets", description: "Protect the things you've worked hard to own." },
  { title: "Your Future", image: "future", description: "Protect the plans you're working towards." },
  { title: "Your Income", image: "income", description: "Create a layer of financial protection around your livelihood." },
];
export function WhatMattersSection() {
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  return <section id="services" className="what-matters section">
    <div className="page-container"><div className="section-heading-row"><div><Eyebrow>Four promises</Eyebrow><h2 className="display-heading">What matters<br /> to you?</h2></div><CtaLink href="#process">Get started Now</CtaLink></div></div>
    <div className="domain-scroll" tabIndex={0} role="region" aria-label="Insurance categories, scroll to explore"
      onPointerDown={e => { if (e.pointerType !== "mouse") return; drag.current = {x:e.clientX, scroll:e.currentTarget.scrollLeft}; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => { if(drag.current) e.currentTarget.scrollLeft = drag.current.scroll - (e.clientX - drag.current.x); }}
      onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
      {domains.map(card => <article className="domain-card" key={card.title}><Image src={`/images/icon-${card.image}.png`} alt="" width={84} height={84} draggable={false} /><h3>{card.title}</h3><p>{card.description}</p></article>)}
    </div>
  </section>;
}
