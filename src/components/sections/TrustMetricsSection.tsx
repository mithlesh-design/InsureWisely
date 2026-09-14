import React from "react";

export const TrustMetricsSection: React.FC = () => {
  return (
    <section className="bg-[#317dc4] text-white py-[76px] relative">
      <div className="max-w-[1138px] mx-auto px-6 sm:px-8 space-y-10">
        <h2 className="font-serif text-3xl sm:text-[40px] leading-[49.3px] text-white font-normal text-center">
          Confidence begins with trust.
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-14 pt-2">
          {/* Metric 1 */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="font-display font-black text-5xl sm:text-6xl lg:text-[67px] leading-[71px] text-white">
              20+
            </div>
            <div className="font-mono text-xs text-white uppercase tracking-[1.92px] pt-1">
              Industry experience
            </div>
          </div>

          {/* Metric 2 */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="font-display font-black text-5xl sm:text-6xl lg:text-[67px] leading-[71px] text-white">
              4+
            </div>
            <div className="font-mono text-xs text-white uppercase tracking-[1.92px] pt-1">
              Insurance partners
            </div>
          </div>

          {/* Metric 3 */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="font-display font-black text-5xl sm:text-6xl lg:text-[67px] leading-[71px] text-white">
              10K+
            </div>
            <div className="font-mono text-xs text-white uppercase tracking-[1.92px] pt-1">
              Customers guided
            </div>
          </div>

          {/* Metric 4 */}
          <div className="space-y-1 text-center lg:text-left">
            <div className="font-display font-black text-5xl sm:text-6xl lg:text-[67px] leading-[71px] text-white">
              99%
            </div>
            <div className="font-mono text-xs text-white uppercase tracking-[1.92px] pt-1">
              Customer retention
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
