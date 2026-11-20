import type { Metadata } from "next";
import { WhyCardsSection, type WhyCard } from "@/components/insurance/WhyCardsSection";
import { AdviceSection } from "@/components/insurance/AdviceSection";
import { HowItWorksSection, type Step } from "@/components/insurance/HowItWorksSection";
import { QuestionsSection, type Question } from "@/components/insurance/QuestionsSection";
import { TermHero } from "@/components/term-insurance/TermHero";
import { CoverCalculator } from "@/components/term-insurance/CoverCalculator";
import { PromiseSection } from "@/components/term-insurance/PromiseSection";

export const metadata: Metadata = {
  title: "Term Insurance — Insure Wisely",
  description:
    "Protect the life you've built. Understand term insurance, estimate the cover your family needs and talk to an Insure Wisely expert for free.",
};

// Copy is verbatim from Figma "Term Insurance" (node 1001:98)
const REASONS: WhyCard[] = [
  { icon: "/images/icon-family.png", title: "Protect Their Future", lead: "Your income supports more than today.", leadWidth: 302, body: ["Help create a financial safety net for your family if you’re no longer around to provide for them."] },
  { icon: "/images/icon-assets.png", title: "Cover What You Owe", lead: "Loans shouldn't become your family's burden.", body: ["Your cover can help protect your family from major financial obligations such as home loans and other liabilities."] },
  { icon: "/images/icon-future.png", title: "Keep Dreams on Track", lead: "Goals are too important to leave uncertain.", body: ["From your child’s education to your family’s everyday lifestyle, the right protection can help keep future plans financially secure."] },
];
const STEPS: Step[] = [
  { title: "Tell us about yourself", lines: ["Answer a few questions about your age, income, family and financial responsibilities."] },
  { title: "Understand your need", lines: ["We’ll help you estimate how much", "cover may make sense for your", "situation."] },
  { title: "Explore your options", lines: ["Understand the available plans,", "benefits and important exclusions important exclusions."] },
  { title: "Choose with confidence", lines: ["Once you're comfortable with your", "choice, we’ll help you move forward.", "move forward."] },
];
const QUESTIONS: Question[] = [
  { text: "How much would my family need if my income stopped?" },
  { text: "What loans or financial obligations would they inherit?" },
  { text: "How much will my children's future goals cost?" },
  { text: "Do I already have enough life cover?" },
  { text: "Does the policy actually fit my family's needs?", textWidth: 244 },
];

// Normal page scroll (no full-screen section paging, unlike the landing page)
export default function TermInsurancePage() {
  return (
    <>
      <TermHero />
      <WhyCardsSection id="why-term-title" eyebrow="Four promises" title="Why consider term insurance?" cards={REASONS} cta={{ label: "Get started now", href: "#get-started" }} />
      <CoverCalculator />
      <AdviceSection id="advice-title" title="Insurance advice, made for you." intro="We believe buying insurance shouldn't feel like navigating a maze of plans, jargon and fine print." />
      <PromiseSection />
      <HowItWorksSection id="how-title" title="Getting insured doesn’t have to be complicated." steps={STEPS} textHeight={67} />
      <QuestionsSection id="questions-title" questions={QUESTIONS} />
    </>
  );
}
