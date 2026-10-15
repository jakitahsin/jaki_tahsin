"use client";

import React from "react";

interface MarqueeProps {
  items?: string[];
  className?: string;
  speed?: string;
}

export function Marquee({
  items = [
    "THINK DIFFERENTLY",
    "DESIGN WITH PURPOSE",
    "MAKE IT MATTER",
    "VISUAL INTELLIGENCE",
    "CRAFT THAT COMMUNICATES",
  ],
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border-y border-graphite bg-charcoal/40 py-5 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused]">
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex shrink-0 items-center space-x-12 pr-12">
            {items.map((item, index) => (
              <div key={`${copyIndex}-${index}`} className="flex items-center space-x-12">
                <span className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wider text-warm/40 uppercase transition-colors duration-300 hover:text-lime">
                  {item}
                </span>
                <span className="text-lime text-xl font-bold">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
