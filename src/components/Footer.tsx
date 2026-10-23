"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-graphite bg-charcoal/30 pt-16 pb-12 text-muted">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-graphite">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 font-heading text-xl font-black tracking-widest text-warm hover:text-lime transition-colors"
            >
              <span>JAKI TAHSIN</span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted leading-relaxed">
              Graphic Designer & Visual Communicator based in Dhaka, Bangladesh. Specializing in brand identity, high-visibility outdoor media, editorial publications, and strategic digital campaigns.
            </p>
            <div className="mt-5 flex items-center space-x-2 text-xs font-mono text-warm/70">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
              <span>Available for Select International Projects</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-warm mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-heading uppercase tracking-wider">
              <li>
                <Link href="/" className="hover:text-lime transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-lime transition-colors">
                  Selected Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-lime transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-lime transition-colors">
                  Services & Deliverables
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-lime transition-colors">
                  Project Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-warm mb-4">
              Connect & Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs font-heading uppercase tracking-wider">
              <li>
                <a
                  href="mailto:jakitahsin@gmail.com"
                  className="inline-flex items-center space-x-1.5 hover:text-lime transition-colors"
                  data-cursor="EMAIL"
                >
                  <Mail className="h-3.5 w-3.5 text-lime" />
                  <span>jakitahsin@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/gallery/249108595/My-Project-Showcase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 hover:text-lime transition-colors"
                  data-cursor="BEHANCE"
                >
                  <span>Behance Showcase</span>
                  <ExternalLink className="h-3 w-3 text-muted/60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jakitahsin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 hover:text-lime transition-colors"
                  data-cursor="LINKEDIN"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="h-3 w-3 text-muted/60" />
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[11px] font-mono text-muted/80 block">
                  Dhaka, Bangladesh · UTC+6
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted/80">
          <p>© {currentYear} Jaki Tahsin. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Crafted with Next.js & Obsidian Theme</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 rounded-full border border-graphite bg-elevated px-3 py-1.5 text-warm hover:border-lime/60 hover:text-lime transition-all"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
