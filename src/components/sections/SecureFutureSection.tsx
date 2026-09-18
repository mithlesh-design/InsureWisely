import Image from "next/image";
import { CtaLink, Eyebrow, Pill } from "@/components/ui/PageElements";

export function SecureFutureSection() {
  return <section className="secure-future section" id="resources">
    <div className="secure-art photo-layer" aria-hidden="true"><Image src="/images/secure-future-img72.png" alt="" width={2736} height={1824} sizes="(max-width: 639px) 600px, (max-width: 1023px) 1000px, 1368px" /></div>
    <div className="page-container secure-content"><Eyebrow>Life doesn&apos;t come with a plan</Eyebrow>
      <h2 className="display-heading">Insurance isn&apos;t<br /> about expecting<br /> the worst.</h2>
      <p className="secure-subtitle">It&apos;s about being ready for<br /> whatever comes next.</p>
      <p className="secure-description">You can&apos;t prepare for every possibility — but you can<br className="desktop-break" /> prepare for what matters.</p>
      <CtaLink>Explore your protection</CtaLink>
    </div>
    <div className="secure-badges photo-layer"><Pill className="future-pill">Building a Secure Future</Pill><Pill className="protection-pill">Protect What Matters</Pill></div>
  </section>;
}
