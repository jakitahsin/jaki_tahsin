import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md rounded-2xl border border-graphite bg-charcoal p-8 sm:p-12 shadow-2xl">
        <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block font-bold">
          Error 404 // Lost Canvas
        </span>
        <h1 className="font-heading text-5xl sm:text-6xl font-black text-warm mb-4">
          404
        </h1>
        <p className="text-sm text-muted leading-relaxed mb-8">
          The project or page you are looking for does not exist or may have been relocated.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 rounded-full bg-lime px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-lg hover:bg-lime-hover transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center space-x-2 rounded-full border border-graphite bg-elevated px-6 py-3 text-xs font-heading font-semibold uppercase tracking-wider text-warm hover:border-lime hover:text-lime transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Works</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
