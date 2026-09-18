"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Brand } from "@/components/ui/PageElements";
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const close = () => setMobileMenuOpen(false);
  return <header className="site-header"><div className="page-container nav-container"><Brand />
    <nav className="desktop-nav" aria-label="Main navigation">
      <Link href="#home">Home</Link><Link href="#about">About</Link>
      <div className="nav-dropdown"><Link href="#services">Services<ChevronDown size={16} /></Link><div className="dropdown-panel">{["Health", "Family", "Assets", "Future", "Income"].map(item => <Link href="#services" key={item}>Your {item}</Link>)}</div></div>
      <div className="nav-dropdown"><Link href="#resources">Resources<ChevronDown size={16} /></Link><div className="dropdown-panel"><Link href="#process">How It Works</Link><Link href="#resources">Understand insurance</Link></div></div>
    </nav>
    <Link className="talk-link" href="#contact">Talk to us</Link>
    <button className="menu-toggle" type="button" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
  </div>{mobileMenuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[["Home", "#home"], ["About", "#about"], ["Services", "#services"], ["Resources", "#resources"], ["Talk to us", "#contact"]].map(([label,href]) => <Link key={label} href={href} onClick={close}>{label}</Link>)}</nav>}</header>;
}
