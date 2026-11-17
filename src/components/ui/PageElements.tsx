import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true" />{children}</p>;
}
export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`design-pill ${className}`}>{children}</span>;
}
export function CtaLink({ children, href = "#services", variant = "primary", className = "" }: {
  children: ReactNode; href?: string; variant?: "primary" | "outline" | "dark"; className?: string;
}) {
  return <Link href={href} className={`cta cta-${variant} ${className}`}>{children}</Link>;
}
// tone "blue" is the Figma logo on light headers (wordmark and leaf mask in #124697)
export function Brand({ footer = false, tone = "white", href = "#home" }: { footer?: boolean; tone?: "white" | "blue"; href?: string }) {
  return <Link href={href} aria-label="Insure Wisely home" className={`brand ${footer ? "brand-footer" : ""}`}>
    <Image src={tone === "blue" ? "/images/logo-blue.svg" : "/images/logo.svg"} alt="Insure Wisely" width={284} height={54} priority={!footer} unoptimized />
  </Link>;
}
