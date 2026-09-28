"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
  Desktop: the stack is pinned and each following section wipes up over the one before it
  (clip-path inset from the bottom), snapping section to section. When the last section is
  fully revealed the pin releases, so the footer scrolls in normally.
  Tablet, phone and reduced motion keep the plain stacked page.
*/
export function SectionReveal({ children }: { children: ReactNode }) {
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const root = stack.current!;
      const sections = gsap.utils.toArray<HTMLElement>(root.children);
      root.classList.add("is-revealing");

      const tl = gsap.timeline({ defaults: { ease: "none" } }).addLabel("section-0");
      sections.slice(1).forEach((section, i) => {
        tl.fromTo(section, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
          .fromTo(sections[i], { yPercent: 0 }, { yPercent: -12, duration: 1 }, "<")
          .addLabel(`section-${i + 1}`);
      });

      // One section per gesture: finish the reveal in the scroll direction, ignoring flick velocity
      const step = 1 / (sections.length - 1);
      const snapTo = (progress: number, self?: ScrollTrigger) => {
        const position = progress / step;
        const index = self && self.direction > 0 ? Math.ceil(position - 0.02) : Math.floor(position + 0.02);
        return gsap.utils.clamp(0, 1, index * step);
      };

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${(sections.length - 1) * window.innerHeight}`,
        pin: true,
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
        snap: { snapTo, inertia: false, duration: { min: 0.3, max: 0.7 }, delay: 0.05, ease: "power2.inOut" },
      });

      // In-page links: sections all sit at the top of the pinned stack, so jump to each one's scroll position instead
      const scrollToSection = (section: HTMLElement, smooth = true) => {
        const index = sections.indexOf(section);
        window.scrollTo({ top: trigger.labelToScroll(`section-${index}`), behavior: smooth ? "smooth" : "instant" });
      };
      const onClick = (e: MouseEvent) => {
        const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const section = link && document.getElementById(link.hash.slice(1))?.closest<HTMLElement>(".is-revealing > *");
        if (!section) return;
        e.preventDefault();
        e.stopPropagation();
        history.replaceState(null, "", link.hash);
        scrollToSection(section);
      };
      document.addEventListener("click", onClick, true);
      const initial = location.hash && document.getElementById(location.hash.slice(1))?.closest<HTMLElement>(".is-revealing > *");
      if (initial) scrollToSection(initial, false);

      return () => {
        document.removeEventListener("click", onClick, true);
        root.classList.remove("is-revealing");
      };
    });
  }, { scope: stack });

  return <div ref={stack} className="reveal-stack">{children}</div>;
}
