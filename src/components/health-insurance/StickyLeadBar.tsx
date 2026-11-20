"use client";
import { useEffect, useState } from "react";
import { CtaLink } from "@/components/ui/PageElements";
import { HealthLeadForm } from "./HealthLeadForm";

/*
  Figma 1019:79 — expert call-back bar fixed to the bottom of the screen. It slides up once the element
  matched by `after` (the hero, with its own form) has scrolled off the top, and slides away on the way back up.
  Desktop gets the one-row form from the design; narrower screens get just the button, which jumps to the hero form.
  While hidden it is inert, so its fields can't be tabbed to.
*/
export function StickyLeadBar({ after }: { after: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(after);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [after]);

  return <aside className={`hh-sticky${visible ? " is-visible" : ""}`} aria-label="Talk to an insurance expert" inert={!visible}>
    <HealthLeadForm className="hh-sticky-form" />
    <CtaLink href="#get-started" className="hh-sticky-cta">Connect now</CtaLink>
  </aside>;
}
