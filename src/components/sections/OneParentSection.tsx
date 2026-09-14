import React from "react";
import Image from "next/image";

export const OneParentSection: React.FC = () => {
  return (
    <section id="one-parent" className="bg-[#124697] text-white relative min-h-[653px] lg:h-[655px] overflow-hidden flex items-center py-16 lg:py-0">
      {/* Desktop Full-Height Image (100% height of section) */}
      <div className="hidden lg:flex absolute left-0 bottom-0 top-0 h-full w-[45%] max-w-[506px] z-10 pointer-events-none items-end justify-start">
        <div className="relative h-full w-full">
          <Image
            src="/images/one-parent.png"
            alt="One Parent. One Plan."
            fill
            className="object-cover object-center"
          />

          {/* Floating badge overlapping between image and content matching Figma Frame 1618872944 at pos:(306, 1006) */}
          <div className="absolute top-[112px] -right-16 z-20 pointer-events-auto bg-[#08244e]/90 backdrop-blur-md rounded-full px-7 py-3 border border-[#ffd978] shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center">
            <span className="font-mono text-xs text-[#ffd978] font-normal tracking-[1.92px] uppercase whitespace-nowrap">
              One Parent. One Plan.
            </span>
          </div>
        </div>
      </div>

      {/* Right Content Area matching Figma Frame 1618872903 */}
      <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-8 relative z-20 flex justify-end my-auto">
        <div className="w-full lg:max-w-[720px] xl:max-w-[780px] space-y-8 text-left">
          <div className="space-y-4">
            {/* Tag line */}
            <div className="flex items-center gap-3">
              <div className="w-[22px] h-[1px] bg-[#5fa787]" />
              <span className="font-mono text-xs text-[#5fa787] uppercase tracking-[1.92px]">
                Life doesn&apos;t come with a plan
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[67px] leading-[1.06] tracking-normal text-white">
              Some things are <br />
              beyond our control.
            </h2>
          </div>

          {/* Change Sequence with circular dots */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-8">
            <span className="font-serif text-xl sm:text-2xl text-white font-normal">
              Plans change
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#d9d9d9] flex-shrink-0" />
            <span className="font-serif text-xl sm:text-2xl text-white font-normal">
              Circumstances change
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#d9d9d9] flex-shrink-0" />
            <span className="font-serif text-xl sm:text-2xl text-white font-normal">
              Life changes
            </span>
          </div>

          {/* Horizontal divider Vector 14 */}
          <div className="w-full max-w-[805px] h-[1px] bg-[#939393]/40" />

          {/* Body & Punchline */}
          <div className="space-y-3 pt-1">
            <p className="font-sans text-base text-white/50 leading-[20.2px] max-w-xl">
              You can&apos;t prepare for every possibility — but you can prepare for what matters.
            </p>
            <p className="font-serif text-2xl sm:text-[32px] leading-tight text-[#9bffcb] font-normal">
              That&apos;s where wise protection begins.
            </p>
          </div>

          {/* Mobile Only: Image under text */}
          <div className="lg:hidden pt-6 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/one-parent.png"
              alt="One Parent. One Plan."
              fill
              className="object-cover object-center"
            />
            <div className="absolute top-4 right-4 z-20 bg-[#08244e]/90 backdrop-blur-md rounded-full px-5 py-2 border border-[#ffd978]">
              <span className="font-mono text-xs text-[#ffd978] uppercase tracking-wider">
                One Parent. One Plan.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
