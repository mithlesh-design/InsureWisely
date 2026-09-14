"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface DomainCard {
  title: string;
  description: string;
  icon: string;
}

const domains: DomainCard[] = [
  {
    title: "Your Health",
    description: "Protection when your health takes an unexpected turn.",
    icon: "/images/icon-health.png",
  },
  {
    title: "Your Family",
    description: "Help protect the people who depend on you.",
    icon: "/images/icon-family.png",
  },
  {
    title: "Your Assets",
    description: "Protect the things you've worked hard to own.",
    icon: "/images/icon-assets.png",
  },
  {
    title: "Your Future",
    description: "Protect the plans you're working towards.",
    icon: "/images/icon-future.png",
  },
  {
    title: "Your Income",
    description: "Create a layer of financial protection around your livelihood.",
    icon: "/images/icon-income.png",
  },
];

export const WhatMattersSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mouse drag scrolling state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Right se touch kra do: initially align/scroll so cards touch the right edge
    const alignRight = () => {
      if (el) {
        el.scrollLeft = el.scrollWidth - el.clientWidth;
      }
    };

    alignRight();
    const timer = setTimeout(alignRight, 150);
    window.addEventListener("resize", alignRight);

    // Smooth horizontal wheel scrolling support for mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaY) < 4) return;

      const canScrollLeft = el.scrollLeft > 1;
      const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;

      if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY * 1.5,
          behavior: "auto",
        });
      } else if (e.deltaY > 0 && canScrollLeft && !canScrollRight) {
        // When touching the right edge, wheeling down slides towards the left cards
        e.preventDefault();
        el.scrollBy({
          left: -e.deltaY * 1.5,
          behavior: "auto",
        });
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", alignRight);
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
    <section
      id="services"
      className="bg-[#f9fdff] text-[#091b2c] min-h-[771px] lg:h-[771px] flex items-center py-20 lg:py-0 relative overflow-hidden"
    >
      <div className="w-full my-auto">
        {/* Top Header Row matching Figma Frame 1618872917 & reference screenshot */}
        <div className="max-w-[1512px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-[136px] mb-12 lg:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="text-left">
              {/* Tag matching Figma Container 2:225 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[22px] h-[1px] bg-[#091b2c]" />
                <span className="font-mono text-xs text-[#091b2c] uppercase tracking-[1.92px] font-normal">
                  Four promises
                </span>
              </div>

              {/* 2-line Work Sans 900 Uppercase Headline matching reference image */}
              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[67px] leading-[1.04] tracking-normal text-[#091b2c] uppercase max-w-[574px]">
                What matters <br />
                to you?
              </h2>
            </div>

            {/* Right-aligned CTA Button matching reference image (pure right align, no inline arrows) */}
            <div className="flex items-center justify-start lg:justify-end lg:pb-1">
              <button
                type="button"
                className="w-[277px] h-[60px] bg-[#ff7e3d] hover:bg-[#e66727] text-white font-sans font-bold text-base uppercase rounded-[8px] transition-all duration-200 shadow-sm flex items-center justify-center tracking-normal active:scale-[0.99]"
              >
                Get started Now
              </button>
            </div>
          </div>
        </div>

        {/* 5 Cards Row - Touching from the right edge with smooth horizontal scrolling across all cards */}
        <div className="w-full">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex gap-[19px] overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 cursor-grab active:cursor-grabbing select-none pl-6 sm:pl-12 lg:pl-16 xl:pl-[136px] pr-0"
          >
            {/* Leading flex-grow spacer to push cards flush to the right when free space exists */}
            <div className="flex-grow hidden 2xl:block pointer-events-none" />

            {domains.map((card, idx) => (
              <div
                key={idx}
                data-card
                className="w-[280px] xl:w-[309px] h-[304px] flex-shrink-0 bg-white rounded-[16px] border border-[#e2eaee] px-5 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 snap-center select-none"
              >
                {/* 84x84 icon */}
                <div className="w-[84px] h-[84px] relative flex-shrink-0 flex items-center justify-center mb-6 pointer-events-none">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={84}
                    height={84}
                    draggable={false}
                    className="object-contain"
                  />
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5 text-center pointer-events-none">
                  <h3 className="font-serif text-[28px] leading-[45px] text-[#0a1118] font-normal">
                    {card.title}
                  </h3>
                  <p className="font-sans text-base leading-[24px] text-[#0a1118]/70 text-center max-w-[267px]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

