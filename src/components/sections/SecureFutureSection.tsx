import React from "react";
import Image from "next/image";

export const SecureFutureSection: React.FC = () => {
  return (
    <section className="bg-[#e8f4ff] text-[#091b2c] relative min-h-[758px] lg:h-[758px] overflow-hidden flex items-center py-16 lg:py-0">
      {/* Desktop Full-Height Right-Aligned Image with seamless fade into background */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 h-full w-[56%] xl:w-[58%] 2xl:w-[55%] pointer-events-none z-10">
        <div
          className="relative w-full h-full"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.8) 22%, black 38%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.8) 22%, black 38%)",
          }}
        >
          <Image
            src="/images/secure-future.png"
            alt="Protect what matters most"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Floating Pill Badge 1: BUILDING A SECURE FUTURE (Figma pos: top 24%, right 6%) */}
        <div className="absolute top-[23%] right-[8%] xl:right-[10%] z-20 pointer-events-auto bg-[#08244e]/65 backdrop-blur-xl rounded-full px-6 py-2.5 border border-[#ffd978] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
          <span className="font-mono text-xs text-[#ffd978] font-normal tracking-[1.92px] uppercase whitespace-nowrap">
            Building a Secure Future
          </span>
        </div>

        {/* Floating Pill Badge 2: PROTECT WHAT MATTERS (Figma pos: bottom 30%, left 5%) */}
        <div className="absolute bottom-[30%] left-[8%] xl:left-[10%] z-20 pointer-events-auto bg-[#08244e]/65 backdrop-blur-xl rounded-full px-6 py-2.5 border border-[#ffd978] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
          <span className="font-mono text-xs text-[#ffd978] font-normal tracking-[1.92px] uppercase whitespace-nowrap">
            Protect What Matters
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-[1512px] w-full mx-auto px-6 sm:px-12 lg:px-[136px] relative z-20 my-auto">
        <div className="max-w-[620px] xl:max-w-[680px] text-left">
          {/* Tag line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-[22px] h-[1px] bg-[#091b2c]" />
            <span className="font-mono text-xs text-[#091b2c] uppercase tracking-[1.92px] font-normal">
              Life doesn&apos;t come with a plan
            </span>
          </div>

          {/* 3-Line Work Sans 900 Uppercase Headline */}
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-[67px] leading-[1.04] tracking-normal text-[#091b2c] uppercase mb-6">
            Insurance isn&apos;t<br />
            about expecting<br />
            the worst.
          </h2>

          {/* Fraunces Serif Subtitle */}
          <p className="font-serif text-2xl sm:text-4xl lg:text-[46px] leading-[1.18] text-[#091b2c] font-normal mb-5">
            It&apos;s about being ready for<br />
            whatever comes next.
          </p>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base text-[#091b2c] max-w-[370px] leading-[20.2px] mb-8 opacity-90">
            You can&apos;t prepare for every possibility — but you can prepare for what matters.
          </p>

          {/* Coral CTA Button */}
          <div>
            <button
              type="button"
              className="w-[277px] h-[60px] bg-[#ff7e3d] hover:bg-[#e66727] text-white font-sans font-bold text-base uppercase rounded-[8px] transition-all duration-200 shadow-sm flex items-center justify-center tracking-normal active:scale-[0.99]"
            >
              Explore your protection
            </button>
          </div>

          {/* Mobile-Only Image fallback */}
          <div className="lg:hidden relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mt-10">
            <Image
              src="/images/secure-future.png"
              alt="Protect what matters most"
              fill
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 z-20 bg-[#08244e]/85 backdrop-blur-md rounded-full px-5 py-2 border border-[#ffd978]">
              <span className="font-mono text-[11px] text-[#ffd978] uppercase tracking-wider">
                Protect What Matters
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

