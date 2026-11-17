"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const DURATION = 0.7;
const EASE = "power3.out";
// Input is accepted again once a transition is this far through (98% of the way with this ease)
const UNLOCK_AT = 0.75;
// Wheel events further apart than this start a new stream
const STREAM_GAP_MS = 200;
// Pixels a fresh wheel stream needs before it moves a section
const WHEEL_START = 3;
// Smallest per-event delta that can count as a new push inside an ongoing stream (filters momentum tails)
const WHEEL_PUSH = 4;
// A stream holding at least this speed, near its own peak, is a wheel that keeps turning
const WHEEL_SUSTAIN = 20;
const SWIPE_START = 30;
const HIDDEN = "inset(100% 0% 0% 0%)";
const SHOWN = "inset(0% 0% 0% 0%)";
const COVERED_Y = -12;
// Overflow (px) a section needs before it gets extra steps; smaller overflow stays clipped
const OVERFLOW_MIN = 24;
// Each extra step moves a tall section by at most this share of the screen
const OVERFLOW_STEP = 0.85;

const average = (values: number[]) => values.reduce((sum, v) => sum + v, 0) / values.length;

/*
  Desktop full-page navigation. The page never scrolls natively; this controller owns every move.
  Steps are the sections (each wipes up over the previous one with a clip-path reveal) plus a final
  step that scrolls the footer into view. One wheel, trackpad, touch or key gesture = one step.
  A section taller than the screen gets extra steps that slide its overflow into view before the next wipe.

  Wheel input arrives as a stream of deltas. Trackpad momentum is a stream that only ever slows down,
  so a stream moves a step when it starts, and again only once the previous transition is visually
  done and the stream either jumps up sharply (a new swipe) or holds near its peak (a wheel that keeps turning).

  Tablet, phone and reduced motion keep the plain stacked page.
*/
export function SectionReveal({ children, header: headerSelector = ".site-header" }: { children: ReactNode; header?: string }) {
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const root = stack.current!;
      const html = document.documentElement;
      const sections = gsap.utils.toArray<HTMLElement>(root.children);
      const header = document.querySelector<HTMLElement>(headerSelector);
      const maxScroll = () => html.scrollHeight - window.innerHeight;

      // A stop is a section shown at a scroll offset: offset 0 for every section, plus evenly spaced
      // offsets down to the bottom of any section taller than the screen. The step after the last stop is the footer.
      type Stop = { section: number; offset: number };
      let stops: Stop[] = [];
      let FOOTER = 0;
      const buildStops = () => {
        stops = [];
        sections.forEach((section, i) => {
          stops.push({ section: i, offset: 0 });
          const overflow = section.scrollHeight - section.clientHeight;
          if (overflow <= OVERFLOW_MIN) return;
          const extra = Math.ceil(overflow / (section.clientHeight * OVERFLOW_STEP));
          for (let k = 1; k <= extra; k++) stops.push({ section: i, offset: Math.round((overflow * k) / extra) });
        });
        FOOTER = stops.length;
      };
      const stopAt = (target: number) => stops[Math.min(target, FOOTER - 1)];
      const firstStop = (section: number) => stops.findIndex(stop => stop.section === section);
      const maxStep = () => (maxScroll() > 1 ? FOOTER : FOOTER - 1);

      let step = 0;
      let tl: gsap.core.Timeline | null = null;
      const scroll = { y: 0 };
      const applyScroll = () => window.scrollTo(0, scroll.y);

      const restoration = history.scrollRestoration;
      history.scrollRestoration = "manual";
      html.classList.add("is-paged");
      root.classList.add("is-revealing");
      buildStops();

      // Sections before the active one are revealed, drifted up and left at their bottom; later ones are clipped away
      const place = (target: number) => {
        const { section: active, offset } = stopAt(target);
        sections.forEach((section, i) => {
          gsap.set(section, {
            clipPath: i <= active ? SHOWN : HIDDEN,
            yPercent: i < active ? COVERED_Y : 0,
          });
          section.scrollTop = i < active ? section.scrollHeight : i === active ? offset : 0;
        });
        if (header) gsap.set(header, { autoAlpha: target === 0 ? 1 : 0, y: target === 0 ? 0 : -24 });
        window.scrollTo(0, target === FOOTER ? maxScroll() : 0);
        step = target;
        root.dataset.step = String(target);
      };

      const busy = () => !!tl && tl.isActive() && tl.progress() < UNLOCK_AT;

      const go = (target: number) => {
        target = gsap.utils.clamp(0, maxStep(), target);
        if (busy()) return;
        // Finish the settling tail of the previous transition before starting the next
        tl?.progress(1);
        if (target === step) return;
        const from = step;
        const fromStop = stopAt(from);
        const toStop = stopAt(target);
        const fromSection = fromStop.section;
        const toSection = toStop.section;
        step = target;
        root.dataset.step = String(target);

        tl = gsap.timeline({ defaults: { duration: DURATION, ease: EASE }, onComplete: () => place(target) });
        if (from === FOOTER) {
          scroll.y = window.scrollY;
          tl.to(scroll, { y: 0, onUpdate: applyScroll });
        }
        const at = tl.duration();
        if (toSection > fromSection) {
          sections[toSection].scrollTop = toStop.offset;
          tl.fromTo(sections[toSection], { clipPath: HIDDEN, yPercent: 0 }, { clipPath: SHOWN }, at)
            .to(sections[fromSection], { yPercent: COVERED_Y }, at);
        } else if (toSection < fromSection) {
          // Sections between the two are hidden under the outgoing one before it wipes away
          sections.slice(toSection + 1, fromSection).forEach(section => gsap.set(section, { clipPath: HIDDEN, yPercent: 0 }));
          sections[toSection].scrollTop = toStop.offset;
          tl.to(sections[fromSection], { clipPath: HIDDEN }, at)
            .fromTo(sections[toSection], { yPercent: COVERED_Y }, { yPercent: 0 }, at);
        } else if (toStop.offset !== fromStop.offset) {
          // Same section: slide its overflow into view
          tl.to(sections[toSection], { scrollTop: toStop.offset }, at);
        }
        if (target === FOOTER) {
          tl.fromTo(scroll, { y: window.scrollY }, { y: maxScroll(), onUpdate: applyScroll }, tl.duration());
        }
        if (header && (from === 0 || target === 0)) {
          tl.to(header, { autoAlpha: target === 0 ? 1 : 0, y: target === 0 ? 0 : -24, duration: 0.4 }, target === 0 ? tl.duration() * 0.5 : 0);
        }
      };

      // Wheel: one step when a stream starts, another only when the stream speeds up again
      let samples: number[] = [];
      let lastTime = -Infinity;
      let lastSign = 0;
      let streamUsed = false;
      // Largest delta since the stream started or last moved a step
      let peak = 0;
      const pushedAgain = (delta: number) => {
        const recent = average(samples.slice(-3));
        const rising = samples.length >= 6 && delta >= WHEEL_PUSH && recent > 1.3 * average(samples.slice(-6, -3));
        const sustained = recent >= WHEEL_SUSTAIN && recent >= 0.9 * peak;
        return rising || sustained;
      };
      const onWheel = (e: WheelEvent) => {
        // Pinch-zoom and horizontal swipes (the services carousel) stay native; the page itself can't scroll
        if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        if (e.cancelable) e.preventDefault();
        const delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
        const sign = Math.sign(delta);
        if (!sign) return;
        // Input time, not handling time, so a busy frame doesn't split one stream into several
        if (e.timeStamp - lastTime > STREAM_GAP_MS || sign !== lastSign) {
          samples = [];
          peak = 0;
          // A stream that begins mid-transition is ignored unless it is pushed again afterwards
          streamUsed = busy();
        }
        lastTime = e.timeStamp;
        lastSign = sign;
        samples.push(Math.abs(delta));
        if (samples.length > 12) samples.shift();
        peak = Math.max(peak, Math.abs(delta));
        if (busy()) return;
        const fire = streamUsed ? pushedAgain(Math.abs(delta)) : samples.reduce((sum, v) => sum + v, 0) >= WHEEL_START;
        if (!fire) return;
        streamUsed = true;
        peak = 0;
        go(step + sign);
      };

      // Touch (touch laptops, iPad landscape): vertical swipes move a step as soon as they pass the threshold
      let touch: { x: number; y: number; axis: "x" | "y" | null; used: boolean } | null = null;
      const onTouchStart = (e: TouchEvent) => {
        touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, axis: null, used: false };
      };
      const onTouchMove = (e: TouchEvent) => {
        if (!touch || e.touches.length > 1) return;
        const dx = touch.x - e.touches[0].clientX;
        const dy = touch.y - e.touches[0].clientY;
        if (!touch.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) touch.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (touch.axis !== "y") return;
        if (e.cancelable) e.preventDefault();
        if (!touch.used && Math.abs(dy) >= SWIPE_START && !busy()) {
          touch.used = true;
          go(step + Math.sign(dy));
        }
      };
      const onTouchEnd = () => { touch = null; };

      const onKey = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (e.altKey || e.ctrlKey || e.metaKey || e.repeat || target.closest("input, textarea, select, [contenteditable]")) return;
        const space = e.key === " " && !target.closest("a, button");
        const moves: Record<string, number> = { ArrowDown: step + 1, PageDown: step + 1, ArrowUp: step - 1, PageUp: step - 1, Home: 0, End: maxStep() };
        const next = space ? step + (e.shiftKey ? -1 : 1) : moves[e.key];
        if (next === undefined) return;
        e.preventDefault();
        go(next);
      };

      // Browser-initiated scrolls (focus moving into the footer, find in page) still land on a whole step
      const onScroll = () => {
        if (tl?.isActive()) return;
        if (window.scrollY > 1 && step !== FOOTER) place(FOOTER);
        else if (window.scrollY <= 1 && step === FOOTER) place(FOOTER - 1);
      };
      // Section heights depend on the screen (and on late fonts), so stops are rebuilt and the current place kept
      const refresh = () => {
        tl?.progress(1);
        const atFooter = step === FOOTER;
        const current = stopAt(step);
        buildStops();
        let index = firstStop(current.section);
        while (stops[index + 1]?.section === current.section && stops[index + 1].offset <= current.offset) index++;
        place(atFooter ? FOOTER : index);
      };

      const sectionOf = (el: Element | null) => el?.closest<HTMLElement>(".is-revealing > *") ?? null;

      // In-page links move to the section holding their target; keyboard focus shows its section at once
      const onClick = (e: MouseEvent) => {
        const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const section = link && sectionOf(document.getElementById(link.hash.slice(1)));
        if (!section) return;
        e.preventDefault();
        e.stopPropagation();
        history.replaceState(null, "", link.hash);
        tl?.progress(1);
        go(firstStop(sections.indexOf(section)));
      };
      const onFocus = (e: FocusEvent) => {
        const section = sectionOf(e.target as Element);
        // Keyboard focus only; a mouse click on a visible link must not move the page first
        if (!section || !(e.target as Element).matches(":focus-visible")) return;
        const index = sections.indexOf(section);
        if (index === stopAt(step).section && step !== FOOTER) return;
        tl?.kill();
        tl = null;
        place(firstStop(index));
      };

      const initial = sectionOf(location.hash ? document.getElementById(location.hash.slice(1)) : null);
      place(initial ? firstStop(sections.indexOf(initial)) : 0);
      let alive = true;
      document.fonts?.ready.then(() => { if (alive && !tl?.isActive()) refresh(); });
      window.addEventListener("load", refresh);

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("touchcancel", onTouchEnd);
      window.addEventListener("keydown", onKey);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", refresh);
      document.addEventListener("click", onClick, true);
      document.addEventListener("focusin", onFocus);

      return () => {
        alive = false;
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchcancel", onTouchEnd);
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", refresh);
        window.removeEventListener("load", refresh);
        document.removeEventListener("click", onClick, true);
        document.removeEventListener("focusin", onFocus);
        tl?.kill();
        const animated = header ? [...sections, header] : sections;
        gsap.killTweensOf(animated);
        gsap.set(animated, { clearProps: "clipPath,transform,opacity,visibility" });
        sections.forEach(section => { section.scrollTop = 0; });
        html.classList.remove("is-paged");
        root.classList.remove("is-revealing");
        delete root.dataset.step;
        history.scrollRestoration = restoration;
      };
    });
  }, { scope: stack });

  return <div ref={stack} className="reveal-stack">{children}</div>;
}
