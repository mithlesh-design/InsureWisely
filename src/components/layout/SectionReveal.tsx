"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const DURATION = 1.1;
// A wheel stream counts as one gesture until it pauses this long (covers trackpad momentum)
const GESTURE_GAP_MS = 180;
const WHEEL_THRESHOLD = 8;
const SWIPE_THRESHOLD = 40;
const HIDDEN = "inset(100% 0% 0% 0%)";
const SHOWN = "inset(0% 0% 0% 0%)";
const COVERED_Y = -12;

/*
  Desktop full-page sections: every scroll gesture (wheel, trackpad, touch or key) plays exactly one
  transition, in which the next section wipes up over the current one (or wipes back down).
  Input is ignored until the transition and its gesture have finished. On the last section the page
  hands over to native scrolling so the footer can be reached; scrolling back to the top takes over again.
  Tablet, phone and reduced motion keep the plain stacked page.
*/
export function SectionReveal({ children }: { children: ReactNode }) {
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const root = stack.current!;
      const sections = gsap.utils.toArray<HTMLElement>(root.children);
      const header = document.querySelector<HTMLElement>(".site-header");
      const last = sections.length - 1;
      let current = 0;
      let animating = false;
      // false once the user has scrolled past the last section into the footer
      let locked = true;
      let lastWheel = 0;
      let wheelDelta = 0;
      let gestureUsed = false;
      let touchStartY = 0;

      root.classList.add("is-revealing");

      // Sections before the active one are revealed and drifted up, later ones are clipped away
      const place = (index: number) => {
        sections.forEach((section, i) => gsap.set(section, {
          clipPath: i <= index ? SHOWN : HIDDEN,
          yPercent: i < index ? COVERED_Y : 0,
        }));
        if (header) gsap.set(header, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : -24 });
        current = index;
        root.dataset.section = String(index);
      };

      const goTo = (index: number) => {
        index = gsap.utils.clamp(0, last, index);
        if (index === current || animating) return;
        animating = true;
        const from = current;
        const down = index > from;
        const tl = gsap.timeline({
          defaults: { duration: DURATION, ease: "power3.inOut" },
          onComplete: () => { place(index); animating = false; },
        });
        if (down) {
          tl.fromTo(sections[index], { clipPath: HIDDEN, yPercent: 0 }, { clipPath: SHOWN }, 0)
            .to(sections[from], { yPercent: COVERED_Y }, 0);
        } else {
          // Sections between the two are hidden under the outgoing one before it wipes away
          sections.slice(index + 1, from).forEach(section => gsap.set(section, { clipPath: HIDDEN, yPercent: 0 }));
          tl.to(sections[from], { clipPath: HIDDEN }, 0)
            .fromTo(sections[index], { yPercent: COVERED_Y }, { yPercent: 0 }, 0);
        }
        if (header) tl.to(header, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : -24, duration: 0.5, ease: "power2.out" }, index === 0 ? DURATION * 0.5 : 0);
        root.dataset.section = String(index);
      };

      const lock = () => { locked = true; window.scrollTo(0, 0); };
      const atTop = () => window.scrollY <= 1;

      // Returns +1 / -1 once per gesture, 0 while the gesture is still settling
      const wheelStep = (e: WheelEvent) => {
        // Input time, not handling time, so a busy frame doesn't split one gesture into several
        const now = e.timeStamp;
        if (now - lastWheel > GESTURE_GAP_MS) { gestureUsed = false; wheelDelta = 0; }
        lastWheel = now;
        if (animating || gestureUsed) return 0;
        const delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
        if (Math.sign(delta) !== Math.sign(wheelDelta)) wheelDelta = 0;
        wheelDelta += delta;
        if (Math.abs(wheelDelta) < WHEEL_THRESHOLD) return 0;
        gestureUsed = true;
        return Math.sign(wheelDelta);
      };

      const onWheel = (e: WheelEvent) => {
        // Pinch-zoom and horizontal swipes (the services carousel) stay native
        if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        if (!locked) {
          if (!atTop() || e.deltaY >= 0) { lastWheel = e.timeStamp; gestureUsed = true; return; }
          e.preventDefault();
          if (wheelStep(e) < 0) { lock(); goTo(last - 1); }
          return;
        }
        const step = wheelStep(e);
        if (step > 0 && current === last && !animating) { locked = false; return; }
        e.preventDefault();
        if (step) goTo(current + step);
      };

      const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
      const onTouchMove = (e: TouchEvent) => {
        if (!locked) return;
        const pullingUp = touchStartY - e.touches[0].clientY > 0;
        if (current === last && pullingUp && !animating) { locked = false; return; }
        e.preventDefault();
      };
      const onTouchEnd = (e: TouchEvent) => {
        const dy = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(dy) < SWIPE_THRESHOLD || animating) return;
        if (!locked) {
          if (dy < 0 && atTop()) { lock(); goTo(last - 1); }
          return;
        }
        goTo(current + Math.sign(dy));
      };

      const onKey = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (e.altKey || e.ctrlKey || e.metaKey || e.repeat || target.closest("input, textarea, select, [contenteditable]")) return;
        const next = ["ArrowDown", "PageDown"].includes(e.key) || (e.key === " " && !e.shiftKey && !target.closest("a, button"));
        const prev = ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey && !target.closest("a, button"));
        if (!locked) {
          if ((prev || e.key === "Home") && atTop()) { e.preventDefault(); lock(); goTo(e.key === "Home" ? 0 : last - 1); }
          return;
        }
        if ((next || e.key === "End") && current === last) { locked = false; return; }
        if (next || prev || e.key === "Home" || e.key === "End") {
          e.preventDefault();
          goTo(e.key === "Home" ? 0 : e.key === "End" ? last : current + (next ? 1 : -1));
        }
      };

      // Anything else that scrolls the page down (scrollbar drag, focus, find) leaves the last section showing
      const onScroll = () => {
        if (locked && !atTop()) { locked = false; if (!animating) place(last); }
      };

      const sectionOf = (el: Element | null) => el?.closest<HTMLElement>(".is-revealing > *") ?? null;

      // In-page links and keyboard focus move to the section that holds their target
      const onClick = (e: MouseEvent) => {
        const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const section = link && sectionOf(document.getElementById(link.hash.slice(1)));
        if (!section) return;
        e.preventDefault();
        e.stopPropagation();
        history.replaceState(null, "", link.hash);
        const index = sections.indexOf(section);
        if (atTop()) { locked = true; goTo(index); return; }
        const scroll = { y: window.scrollY };
        gsap.to(scroll, { y: 0, duration: 0.6, ease: "power2.inOut", onUpdate: () => window.scrollTo(0, scroll.y), onComplete: () => { lock(); goTo(index); } });
      };
      const onFocus = (e: FocusEvent) => {
        const section = sectionOf(e.target as Element);
        if (!section || !locked) return;
        const index = sections.indexOf(section);
        if (index !== current) { if (animating) gsap.killTweensOf(sections); animating = false; place(index); }
      };

      const initial = sectionOf(location.hash ? document.getElementById(location.hash.slice(1)) : null);
      if (atTop()) place(initial ? sections.indexOf(initial) : 0);
      else { locked = false; place(last); }

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("keydown", onKey);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("click", onClick, true);
      document.addEventListener("focusin", onFocus);

      return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("click", onClick, true);
        document.removeEventListener("focusin", onFocus);
        const animated = header ? [...sections, header] : sections;
        gsap.killTweensOf(animated);
        gsap.set(animated, { clearProps: "clipPath,transform,opacity,visibility" });
        root.classList.remove("is-revealing");
        delete root.dataset.section;
      };
    });
  }, { scope: stack });

  return <div ref={stack} className="reveal-stack">{children}</div>;
}
