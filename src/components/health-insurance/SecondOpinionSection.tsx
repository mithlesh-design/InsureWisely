import { CtaLink } from "@/components/ui/PageElements";

// Figma 1001:718 — navy call-to-action band
export function SecondOpinionSection() {
  return <section className="section hh-opinion" aria-labelledby="second-opinion-title">
    <div className="page-container hh-opinion-body">
      <ul className="hh-opinion-tags">
        <li>No confusing jargon.</li>
        <li>No pressure.</li>
      </ul>
      <h2 id="second-opinion-title">A second opinion can make all the difference.</h2>
      <p>Have questions or unsure which plan is right for you? Talk to an Insure Wisely expert for personalised guidance.</p>
      <CtaLink href="#get-started">Let&rsquo;s figure it out together &rarr;</CtaLink>
    </div>
  </section>;
}
