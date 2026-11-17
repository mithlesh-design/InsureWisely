import type { Metadata } from "next";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { WhyCardsSection, type WhyCard } from "@/components/insurance/WhyCardsSection";
import { AdviceSection } from "@/components/insurance/AdviceSection";
import { HowItWorksSection, type Step } from "@/components/insurance/HowItWorksSection";
import { QuestionsSection, type Question } from "@/components/insurance/QuestionsSection";
import { HealthHero } from "@/components/health-insurance/HealthHero";
import { FeatureBand } from "@/components/health-insurance/FeatureBand";
import { PlanBasicsSection } from "@/components/health-insurance/PlanBasicsSection";
import { SecondOpinionSection } from "@/components/health-insurance/SecondOpinionSection";
import "./health-insurance.css";

export const metadata: Metadata = {
  title: "Health Insurance — Insure Wisely",
  description:
    "Health cover that makes sense for you. Understand your needs, compare the right options and choose a health plan with an Insure Wisely expert.",
};

// Copy is verbatim from the Figma frame (node 1001:502), including the "term insurance" heading it reuses
const REASONS: WhyCard[] = [
  { icon: "/images/icon-family.png", title: "Protect Your Savings", body: ["Helps you manage high medical expenses", "without affecting your long-term financial", "goals."] },
  { icon: "/images/icon-assets.png", title: "Access Quality Care", body: ["Get the freedom to choose from a wide", "network of trusted hospitals for your", "treatment, subject to policy terms."] },
  { icon: "/images/icon-future.png", title: "Cover Your Family", body: ["A suitable health insurance plan can help", "protect your loved ones and prepare for", "life’s healthcare uncertainties."] },
];
const STEPS: Step[] = [
  { title: "Tell Us About Your Needs", lines: ["Share a few details about yourself", "and your family."] },
  { title: "Understand Your Options", lines: ["We’ll explain suitable plans based on", "your needs."] },
  { title: "Compare Details", lines: ["Look at key features like cover,", "waiting periods, room rent and more."] },
  { title: "Help with the Next Steps", lines: ["Choose a plan and complete the", "purchase with our support."] },
];
const QUESTIONS: Question[] = [
  { text: "What is a sum insured?" },
  { text: "Are pre-existing conditions covered?" },
  { text: "Do I need a separate policy if I have employer cover?" },
  { text: "How do I choose the right health insurance policy?" },
  { text: "Does the policy actually fit my family's needs?", textWidth: 244 },
];

// Same full-screen section wipe as the landing and term pages; the feature band rides with the "why" cards
export default function HealthInsurancePage() {
  return (
    <SectionReveal header=".ti-header">
      <HealthHero />
      <WhyCardsSection id="why-health-title" className="hh-why" eyebrow="Four promises" title="Why consider term insurance?" cards={REASONS}>
        <FeatureBand />
      </WhyCardsSection>
      <PlanBasicsSection />
      <HowItWorksSection id="how-health-title" className="hh-how" title="Getting the right health cover is simple." steps={STEPS} />
      <AdviceSection id="advice-health-title" title="Advice that puts you first." intro="We help you understand your options clearly, so you can choose a health plan with confidence." cta={{ label: "Get started now", href: "#get-started" }} />
      <SecondOpinionSection />
      <QuestionsSection id="questions-health-title" questions={QUESTIONS} />
    </SectionReveal>
  );
}
