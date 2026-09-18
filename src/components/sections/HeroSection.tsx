import Image from "next/image";
import Link from "next/link";
import { CtaLink, Pill } from "@/components/ui/PageElements";

export function HeroSection() {
  return <section id="home" className="hero section">
    <div className="hero-art photo-layer" aria-hidden="true"><Image src="/images/hero-family.png" alt="" width={1536} height={1024} priority sizes="(max-width: 639px) 560px, (max-width: 1023px) 900px, 1254px" /></div>
    <div className="page-container hero-content">
      <h1><span className="hero-intro">You can&apos;t predict life. You can</span><span className="hero-title">Prepare<br />for it.</span></h1>
      <p className="hero-description">Insurance doesn&apos;t have to be complicated or driven by fear. Insure Wisely helps you understand your options, choose what fits your needs, and feel more confident about tomorrow.</p>
      <div className="hero-actions"><CtaLink>Explore your protection</CtaLink><CtaLink href="#process" variant="outline">Understand insurance</CtaLink></div>
    </div>
    <div className="hero-badges photo-layer"><Pill className="hero-pill">Every Family Member Counts</Pill></div>
    <Link href="#one-parent" className="scroll-prompt"><span className="scroll-mouse" aria-hidden="true"><span /></span><span>Let&apos;s make tomorrow clearer</span></Link>
  </section>;
}
