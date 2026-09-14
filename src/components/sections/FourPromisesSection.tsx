"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PromiseCard {
  title: string;
  description: string;
  image: string;
  objectPosition?: string;
}

const promises: PromiseCard[] = [
  {
    title: "Confidence",
    description: "Know you're better prepared for what lies ahead.",
    image: "/images/promise-confidence.png",
    objectPosition: "object-center",
  },
  {
    title: "Preparation",
    description: "Know you're better prepared for what lies ahead.",
    image: "/images/promise-preparation.png",
    objectPosition: "object-center",
  },
  {
    title: "Protection",
    description: "Protect what matters most to you and your family.",
    image: "/images/promise-protection.png",
    objectPosition: "object-[35%_center]",
  },
  {
    title: "Freedom",
    description: 'Move forward without constantly worrying about "what if."',
    image: "/images/promise-freedom.png",
    objectPosition: "object-[48%_center]",
  },
];

export const FourPromisesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag scrolling state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 17
      : 314;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), promises.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    // Smooth horizontal wheel scrolling support for mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaY) < 4) return;

      const canScrollHorizontally =
        (e.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth - 2) ||
        (e.deltaY < 0 && el.scrollLeft > 2);

      if (canScrollHorizontally) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY * 1.5,
          behavior: "auto",
        });
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 17 : 314;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const scrollToCard = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 17 : 314;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
    el.style.scrollBehavior = "auto";
    el.style.scrollSnapType = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = scrollContainerRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.style.scrollSnapType = "x mandatory";
    }
  };

  return (
    <section className="bg-[#f0f9ff] text-[#091b2c] min-h-[855px] lg:h-[855px] flex items-center py-20 lg:py-0 relative overflow-hidden">
      <div className="w-full my-auto">
        {/* Top Header Row matching Figma Frame 1618872916 */}
        <div className="max-w-[1512px] mx-auto px-6 sm:px-12 lg:px-[136px] mb-12 lg:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="text-left">
              {/* Tag matching Figma Container 2:194 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[22px] h-[1px] bg-[#091b2c]" />
                <span className="font-mono text-xs text-[#091b2c] uppercase tracking-[1.92px] font-normal">
                  Four promises
                </span>
              </div>

              {/* 2-line Work Sans 900 Uppercase Headline matching Figma 2:197 */}
              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[67px] leading-[1.04] tracking-normal text-[#091b2c] uppercase max-w-[574px]">
                Be ready. Live <br />
                freely.
              </h2>
            </div>

            {/* Right Controls: Arrow Buttons + CTA Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:pb-1">
              {/* Horizontal Scroll Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous card"
                  className={`w-12 h-12 rounded-full border border-[#091b2c]/20 flex items-center justify-center transition-all duration-200 ${
                    canScrollLeft
                      ? "bg-white text-[#091b2c] hover:bg-[#091b2c] hover:text-white shadow-sm cursor-pointer active:scale-95"
                      : "bg-white/40 text-[#091b2c]/30 cursor-not-allowed border-[#091b2c]/10"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Next card"
                  className={`w-12 h-12 rounded-full border border-[#091b2c]/20 flex items-center justify-center transition-all duration-200 ${
                    canScrollRight
                      ? "bg-white text-[#091b2c] hover:bg-[#091b2c] hover:text-white shadow-sm cursor-pointer active:scale-95"
                      : "bg-white/40 text-[#091b2c]/30 cursor-not-allowed border-[#091b2c]/10"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Button matching Figma Call to action/primary 2:198 (277x60 px, bg #ff7e3d) */}
              <button
                type="button"
                className="w-[277px] h-[60px] bg-[#ff7e3d] hover:bg-[#e66727] text-white font-sans font-bold text-base uppercase rounded-[8px] transition-all duration-200 shadow-sm flex items-center justify-center tracking-normal active:scale-[0.99]"
              >
                Get started Now
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Cards Row extending all the way to the right edge */}
        <div className="w-full">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex gap-[17px] overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-4 select-none pl-6 sm:pl-12 lg:pl-[max(136px,calc((100vw-1512px)/2+136px))] pr-0"
          >
            {promises.map((card, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 w-[297px] h-[400px] rounded-[16px] overflow-hidden group flex flex-col justify-end px-[30px] pb-[36px] shadow-[inset_0_-1px_94px_rgba(0,0,0,0.55)] transition-all duration-300 snap-start"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 297px, 100vw"
                  draggable={false}
                  className={`object-cover ${
                    card.objectPosition || "object-center"
                  } transition-transform duration-700 group-hover:scale-105 pointer-events-none`}
                />

                {/* Gradient Overlay from 36.5% to 98% matching Figma stops */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 via-50% to-black/90 pointer-events-none" />

                {/* Inner Shadow matching Figma effects: INNER_SHADOW radius 94 */}
                <div className="absolute inset-0 shadow-[inset_0_-30px_90px_rgba(0,0,0,0.85)] pointer-events-none" />

                {/* Text Content matching Figma Frame 1618872899 */}
                <div className="relative z-10 space-y-2 text-left pointer-events-none">
                  <h3 className="font-serif text-[28px] leading-[34.5px] text-white font-normal">
                    {card.title}
                  </h3>
                  <p className="font-sans text-base leading-[20.2px] text-white/95">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Trailing spacer */}
            <div className="flex-shrink-0 w-6 sm:w-12 lg:w-[max(136px,calc((100vw-1512px)/2+136px))] pointer-events-none" />
          </div>
        </div>

        {/* Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {promises.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 transition-all duration-300 rounded-full ${
                activeIndex === idx
                  ? "w-8 bg-[#ff7e3d]"
                  : "w-2 bg-[#091b2c]/20 hover:bg-[#091b2c]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


