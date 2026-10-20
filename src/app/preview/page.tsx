import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Film } from "lucide-react";
import { MotionVideoPromo } from "@/components/MotionVideoPromo";

export const metadata: Metadata = {
  title: "30-Second 4K Motion Graphics Video Promo — Jaki Tahsin",
  description:
    "Pro-level After Effects-style 30-second website preview promo with kinetic typography, 3D perspective camera motion, animated cursor interaction, and 120 BPM sound design.",
};

export default function VideoPreviewPage() {
  return (
    <div className="min-h-screen bg-obsidian text-warm flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8">
      {/* Top Header */}
      <div className="mx-auto max-w-6xl w-full flex items-center justify-between pb-6 border-b border-graphite/60">
        <Link
          href="/"
          className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-lime transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio Home</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Film className="h-4 w-4 text-lime" />
          <span className="text-xs font-mono uppercase tracking-wider text-warm font-bold">
            Interactive Video Showcase
          </span>
        </div>
      </div>

      {/* Main Center Video Theater Stage */}
      <main className="mx-auto max-w-6xl w-full my-8">
        <MotionVideoPromo />
      </main>

      {/* Bottom Editorial Caption */}
      <footer className="mx-auto max-w-6xl w-full pt-6 border-t border-graphite/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted gap-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-3.5 w-3.5 text-lime" />
          <span>Turn sound on for rich synthesized audio and interactive sound effects.</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/work" className="hover:text-lime transition-colors">
            View All Projects
          </Link>
          <span>✦</span>
          <Link href="/contact" className="hover:text-lime transition-colors">
            Hire Jaki Tahsin
          </Link>
        </div>
      </footer>
    </div>
  );
}
