import Image from "next/image";
import { CtaLink, Eyebrow } from "@/components/ui/PageElements";

const promises = [
  { title: "Confidence", description: "Know you're better prepared for what lies ahead.", image: "confidence" },
  { title: "Preparation", description: "Know you're better prepared for what lies ahead.", image: "preparation" },
  { title: "Protection", description: "Protect what matters most to you and your family.", image: "protection" },
  { title: "Freedom", description: 'Move forward without constantly worrying about "what if."', image: "freedom" },
];
export function FourPromisesSection() {
  return <section className="promises section"><div className="page-container">
    <div className="section-heading-row"><div><Eyebrow>Four promises</Eyebrow><h2 className="display-heading">Be ready. Live<br /> freely.</h2></div><CtaLink>Get started Now</CtaLink></div>
    <div className="promise-cards">{promises.map(card => <article key={card.title} className={`promise-card promise-${card.image}`}>
      <Image src={`/images/promise-${card.image}.png`} alt="" fill sizes="(max-width: 639px) 85vw, (max-width: 1023px) 50vw, 300px" />
      <div className="promise-shade" /><div className="promise-copy"><h3>{card.title}</h3><p>{card.description}</p></div>
    </article>)}</div>
  </div></section>;
}
