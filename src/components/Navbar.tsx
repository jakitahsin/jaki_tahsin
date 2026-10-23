"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { EasterEggModal } from "./EasterEgg";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/#color-game", label: "Color Game" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleWordmarkClick = (e: React.MouseEvent) => {
    const nextCount = easterEggClicks + 1;
    setEasterEggClicks(nextCount);
    if (nextCount >= 5) {
      setEasterEggOpen(true);
      setEasterEggClicks(0);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-obsidian/85 backdrop-blur-md border-b border-graphite py-3.5 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
          {/* Brand Wordmark with Easter Egg Trigger */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              onClick={handleWordmarkClick}
              className="group flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-lime rounded-md"
              data-cursor="HOME"
            >
              <span className="font-heading text-lg md:text-xl font-black tracking-widest text-warm group-hover:text-lime transition-colors">
                JAKI TAHSIN
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime group-hover:scale-150 transition-transform" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs font-heading font-medium tracking-wider uppercase transition-colors hover:text-warm ${
                    isActive ? "text-lime" : "text-muted"
                  }`}
                  data-cursor={link.label.toUpperCase()}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-lime shadow-[0_0_8px_#D7FF64]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Start a Project CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <MagneticButton>
              <Link
                href="/contact"
                className="group relative inline-flex items-center space-x-2 rounded-full border border-lime/60 bg-lime/10 px-4 py-2 text-xs font-heading font-semibold text-lime transition-all duration-200 hover:bg-lime hover:text-obsidian hover:shadow-[0_0_20px_rgba(215,255,100,0.35)]"
                data-cursor="INQUIRE"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-warm hover:bg-elevated transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-obsidian/95 backdrop-blur-xl pt-24 px-8 pb-10 md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-6" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-heading font-bold uppercase tracking-wider flex items-center justify-between transition-colors ${
                    isActive ? "text-lime" : "text-muted hover:text-warm"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-lime text-sm">✦</span>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t border-graphite">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-lime py-3.5 text-center font-heading text-sm font-bold uppercase tracking-wider text-obsidian shadow-lg"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-center text-xs text-muted">
              Dhaka, Bangladesh · Available Worldwide
            </p>
          </div>
        </div>
      )}

      {/* Secret Easter Egg Dialogue */}
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />
    </>
  );
}
