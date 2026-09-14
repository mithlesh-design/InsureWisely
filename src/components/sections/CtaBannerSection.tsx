import React from "react";

export const CtaBannerSection: React.FC = () => {
  return (
    <section className="bg-white text-[#0a1118] py-24 sm:py-[100px] relative">
      <div className="max-w-[713px] mx-auto px-6 text-center space-y-8">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-[58px] leading-[67.3px] tracking-[-0.58px] text-[#0a1118] font-normal text-center">
          You can&apos;t know what tomorrow holds. But you can be ready for it.
        </h2>

        <p className="font-sans text-base sm:text-[18px] leading-[27px] text-[#0a1118]/60 max-w-[497px] mx-auto text-center">
          Make a thoughtful choice today. Protect what matters. Prepare for what you can&apos;t predict. And move forward with confidence.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            type="button"
            className="w-full sm:w-[365px] h-[60px] bg-[#0a1b2c] hover:bg-[#123049] text-white font-sans font-bold text-base rounded-[8px] transition-all duration-200 shadow-lg flex items-center justify-center active:scale-[0.99]"
          >
            Explore your protection
          </button>
        </div>
      </div>
    </section>
  );
};
