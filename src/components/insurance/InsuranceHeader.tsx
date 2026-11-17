"use client";
import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/ui/PageElements";

// Figma draws the active bar (Rectangle 82) at a slightly different inset under each item
const NAV = [
  { label: "Home", href: "/" },
  { label: "Term Insurance", href: "/term-insurance", underline: { left: 13, right: 0 } },
  { label: "Health Insurance", href: "/health-insurance", underline: { left: 8, right: -4 } },
];
const MOBILE_EXTRAS = [{ label: "Login", href: "#" }, { label: "Talk to us", href: "#get-started" }];

// Light header shared by the insurance pages (Figma 1001:99 / 1001:503): the current page is blue and underlined
export function InsuranceHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const current = (href: string) => (href === pathname ? "page" : undefined);
  return <header className="ti-header">
    <div className="page-container nav-container">
      <Brand tone="blue" href="/" />
      <nav className="ti-nav" aria-label="Main navigation">
        {NAV.map(item => <Link key={item.label} href={item.href} aria-current={current(item.href)}
          style={item.underline ? { "--ul-left": `${item.underline.left}px`, "--ul-right": `${item.underline.right}px` } as CSSProperties : undefined}>{item.label}</Link>)}
      </nav>
      <div className="ti-header-actions">
        <Link className="ti-login" href="#">Login</Link>
        <Link className="ti-talk" href="#get-started">Talk to us</Link>
      </div>
      <button className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="insurance-mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav id="insurance-mobile-navigation" className="ti-mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {[...NAV, ...MOBILE_EXTRAS].map(item => <Link key={item.label} href={item.href} aria-current={current(item.href)} onClick={close}>{item.label}</Link>)}
    </nav>
  </header>;
}
