import type { CSSProperties } from "react";
import { CtaLink, Eyebrow } from "@/components/ui/PageElements";

// textWidth mirrors a narrower Figma text box so the question breaks on the same word
export type Question = { text: string; textWidth?: number };

// "Ask the right questions first." grid (Figma 1001:435 / 1001:687)
export function QuestionsSection({ id, questions }: { id: string; questions: Question[] }) {
  return <section className="section ti-questions" aria-labelledby={id}>
    <div className="page-container">
      <Eyebrow>Before you buy</Eyebrow>
      <h2 id={id} className="display-heading">Ask the right questions first.</h2>
      <ul className="ti-question-grid">
        {/* Content is centred in the card (a one-line question sits mid-card), the "?" stays on the first line */}
        {questions.map(question => <li className="ti-question" key={question.text}>
          <div className="ti-question-body">
            <span className="ti-question-mark" aria-hidden="true">?</span>
            <p style={question.textWidth ? { "--text-w": `${question.textWidth}px` } as CSSProperties : undefined}>{question.text}</p>
          </div>
        </li>)}
      </ul>
      <CtaLink href="#get-started">Let&rsquo;s figure it out together &rarr;</CtaLink>
    </div>
  </section>;
}
