import { CtaLink } from "@/components/ui/PageElements";
const steps = [
  { title: "Understand", description: "Tell us what matters to you and what you're looking to protect." },
  { title: "Explore", description: "Understand the options that could fit your needs." },
  { title: "Choose", description: "Make an informed decision with greater clarity." },
  { title: "Feel prepared", description: "Move forward knowing you've taken a thoughtful step." },
];
export function ClearerWaySection() {
  return <section id="process" className="process section"><div className="page-container">
    <h2 className="display-heading">A clearer way to<br /> get protected.</h2>
    <ol className="process-steps">{steps.map((step,index) => <li key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
    <CtaLink variant="dark" href="#services">Make a wise choice</CtaLink>
  </div></section>;
}
