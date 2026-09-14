import React from "react";
import Image from "next/image";

interface StepItem {
  step: string;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    step: "01",
    title: "Understand",
    description: "Tell us what matters to you and what you're looking to protect.",
  },
  {
    step: "02",
    title: "Explore",
    description: "Understand the options that could fit your needs.",
  },
  {
    step: "03",
    title: "Choose",
    description: "Make an informed decision with greater clarity.",
  },
  {
    step: "04",
    title: "Feel prepared",
    description: "Move forward knowing you've taken a thoughtful step.",
  },
];

export const ClearerWaySection: React.FC = () => {
  return (
    <section id="process" className="bg-[#ff7e3d] bg-gradient-to-br from-[#feb823] to-[#ff7e3d] text-white relative min-h-[734px] lg:h-[734px] overflow-hidden flex items-center py-16 lg:py-0">
      {/* Desktop Right-Side Sunflower Sunset Image with soft blend mask (No Box, 100% height, matching Hero & Secure Future) */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 h-full w-[54%] xl:w-[58%] pointer-events-none z-10">
        <div
          className="relative w-full h-full opacity-85"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 12%, rgba(0,0,0,0.85) 30%, black 50%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 12%, rgba(0,0,0,0.85) 30%, black 50%)",
          }}
        >
          <Image
            src="/images/clearer-way.png"
            alt="A clearer way to get protected"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-right-top"
          />
        </div>
      </div>

      {/* Content Container matching Figma Frame 1618872937 (max-w 1238px, px 136px) */}
      <div className="max-w-[1512px] w-full mx-auto px-6 sm:px-12 lg:px-[136px] relative z-20 my-auto">
        <div className="max-w-[1238px]">
          {/* Title (Work Sans 900 67px uppercase) */}
          <div className="mb-12 lg:mb-14 text-left">
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[67px] leading-[1.06] tracking-normal text-white uppercase max-w-[688px]">
              A clearer way to <br />
              get protected.
            </h2>
          </div>

          {/* 4 Steps Row matching Figma Frame 1618872959 (gap 78px between columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[78px] mb-12 lg:mb-14">
            {steps.map((item, idx) => (
              <div key={idx} className="space-y-6 text-left">
                {/* 68x68 circular badge with 15% white fill */}
                <div className="w-[68px] h-[68px] rounded-full bg-white/15 flex items-center justify-center font-mono text-2xl text-white">
                  {item.step}
                </div>

                <div className="space-y-1.5 text-left">
                  <h3 className="font-display font-bold text-[28px] sm:text-[32px] leading-[45px] text-white uppercase">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base leading-[24px] text-white/95 max-w-[280px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width CTA Button matching Figma Frame 2:317 (1238x60 px, bg #0a1b2c) */}
          <div>
            <button
              type="button"
              className="w-full max-w-[1238px] h-[60px] bg-[#0a1b2c] hover:bg-[#123049] text-white font-sans font-bold text-base uppercase rounded-[8px] transition-all duration-200 shadow-xl flex items-center justify-center tracking-normal active:scale-[0.99]"
            >
              Make a wise choice
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
