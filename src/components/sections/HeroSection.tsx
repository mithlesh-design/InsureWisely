import React from "react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[894px] lg:h-[894px] bg-gradient-to-b from-[#072747] via-[#091a2a] to-[#030b0f] pt-[100px] pb-10 overflow-hidden flex flex-col justify-between">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#123049]/40 blur-[140px] rounded-full" />
      </div>

      {/* Desktop Full-Height Right-Aligned Image (100% height of hero section) */}
      <div className="hidden lg:flex absolute right-0 bottom-0 top-0 h-full w-[55%] max-w-[850px] z-10 pointer-events-none items-end justify-end">
        <div className="relative h-full w-full aspect-[914/790]">
          <Image
            src="/images/Hero image.png"
            alt="Family prepared for tomorrow"
            fill
            priority
            className="object-contain object-right-bottom"
          />

          {/* Floating Pill Tag Badge matching Figma pos:(935, 516) */}
          <div className="absolute bottom-[280px] -left-8 xl:-left-12 z-20 pointer-events-auto bg-[#08244e]/90 backdrop-blur-md rounded-full px-6 py-3 border border-[#ffd978] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            <span className="font-mono text-xs text-[#ffd978] font-normal tracking-[1.92px] uppercase whitespace-nowrap">
              Every Family Member Counts
            </span>
          </div>
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-8 relative z-20 my-auto">
        <div className="max-w-[700px] space-y-6 text-left">
          <div className="space-y-2">
            <h1 className="text-white">
              <span className="block font-serif text-3xl sm:text-5xl lg:text-[46px] font-normal leading-[56.7px] tracking-normal text-white">
                You can&apos;t predict life. You can
              </span>
              <span className="block font-display font-black text-6xl sm:text-8xl lg:text-[148px] leading-[0.88] tracking-normal text-[#a1f8cd] uppercase mt-2">
                prepare for it.
              </span>
            </h1>
          </div>

          <p className="font-sans text-base text-white/50 max-w-[620px] leading-[20.2px] pt-1">
            Insurance doesn&apos;t have to be complicated or driven by fear. Insure Wisely helps you understand your options, choose what fits your needs, and feel more confident about tomorrow.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[18px] pt-4">
            <button
              type="button"
              className="h-[60px] px-8 bg-[#ff7e3d] hover:bg-[#e66727] text-white font-sans font-bold text-base rounded-[8px] transition-all duration-200 flex items-center justify-center active:scale-[0.99] shadow-lg"
            >
              Explore your protection
            </button>
            <button
              type="button"
              className="h-[60px] px-8 bg-transparent hover:bg-white/5 text-white font-sans font-bold text-base rounded-[8px] border border-white/20 transition-all duration-200 flex items-center justify-center active:scale-[0.99]"
            >
              Understand insurance
            </button>
          </div>

          {/* Mobile Only: Hero Image Right-aligned */}
          <div className="lg:hidden pt-8 relative w-full aspect-[914/790] max-w-[480px] ml-auto">
            <Image
              src="/images/Hero image.png"
              alt="Family prepared for tomorrow"
              fill
              priority
              className="object-contain object-right-bottom"
            />
            <div className="absolute bottom-6 left-0 z-20 bg-[#08244e]/90 backdrop-blur-md rounded-full px-5 py-2.5 border border-[#ffd978] shadow-lg">
              <span className="font-mono text-xs text-[#ffd978] font-normal tracking-[1.92px] uppercase whitespace-nowrap">
                Every Family Member Counts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator matching Figma Frame 1618872942 */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center pt-6">
        <Link
          href="#one-parent"
          className="group flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors duration-200"
        >
          <div className="w-[14px] h-[35px] rounded-[24px] bg-[#04121f] border border-white/20 p-1 flex justify-center items-start">
            <div className="w-[6px] h-[6px] rounded-full bg-[#474747] group-hover:bg-white animate-bounce transition-colors" />
          </div>
          <span className="font-mono text-[11px] leading-[16.5px] tracking-[1.32px] uppercase text-white/50 group-hover:text-white transition-colors">
            Let&apos;s make tomorrow clearer
          </span>
        </Link>
      </div>
    </section>
  );
};
