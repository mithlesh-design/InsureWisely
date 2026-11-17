import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans, Work_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { InsuranceHeader } from "@/components/insurance/InsuranceHeader";
import "./insurance.css";

/*
  Shared frame for the term and health insurance pages: light header, footer and fonts.
  These pages use weights the self-hosted files in public/fonts don't cover (Work Sans 400–600, Inter 500–700)
  plus Plus Jakarta Sans. next/font self-hosts them and re-points the shared CSS variables inside these pages only.
  Fraunces switches to the self-hosted variable cut in insurance.css (next/font can't rename its family,
  and the static 'Fraunces' face in fonts.css would win).
*/
const workSans = Work_Sans({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700", "900"], variable: "--font-work-sans", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-jakarta", display: "swap" });

export default function InsuranceLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`insurance-page flex min-h-screen flex-col ${workSans.variable} ${inter.variable} ${jakarta.variable}`}>
      <InsuranceHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
