import Image from "next/image";
import { Eyebrow, Pill } from "@/components/ui/PageElements";

export function OneParentSection() {
  return <section id="one-parent" className="one-parent section">
    <div className="parent-art photo-layer"><div className="parent-photo"><Image src="/images/one-parent.png" alt="A mother embracing her daughter" width={1536} height={1024} sizes="(max-width: 639px) 640px, (max-width: 1023px) 100vw, 1000px" /></div><Pill className="parent-pill">One Parent. One Plan.</Pill></div>
    <div className="parent-content" id="about">
      <Eyebrow>Life doesn&apos;t come with a plan</Eyebrow>
      <h2 className="display-heading">Some things are<br /> beyond our control.</h2>
      <div className="change-sequence"><span>Plans change</span><i /><span>Circumstances change</span><i /><span>Life changes</span></div>
      <div className="parent-divider" />
      <p className="parent-description">You can&apos;t prepare for every possibility — but you can<br className="desktop-break" /> prepare for what matters.</p>
      <p className="parent-punchline">That&apos;s where wise protection begins.</p>
    </div>
  </section>;
}
