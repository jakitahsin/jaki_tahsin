"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, User, Camera } from "lucide-react";

export function HeroAvatar() {
  const [use3DAvatar, setUse3DAvatar] = useState(true);

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      {/* Decorative framing glow */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-b from-lime/25 via-graphite/40 to-transparent opacity-70 blur-md pointer-events-none" />

      {/* Floating 3D Character Container */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 0.8, -0.8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.025,
          transition: { duration: 0.3 },
        }}
        className="group relative overflow-hidden rounded-2xl border border-graphite bg-charcoal shadow-2xl transition-all duration-300 hover:border-lime/60 hover:shadow-[0_12px_40px_rgba(215,255,100,0.18)]"
      >
        {/* Avatar View Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-obsidian">
          <Image
            src={use3DAvatar ? "/images/portrait/3d-avatar.png" : "/assets/portrait.webp"}
            alt="Jaki Tahsin — Graphic Designer & Visual Communicator"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 420px"
            className={`transition-all duration-500 ease-out ${
              use3DAvatar
                ? "object-cover object-center group-hover:scale-105"
                : "object-cover object-top group-hover:scale-105"
            }`}
          />

          {/* Ambient Lighting Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />

          {/* Top Badge Overlay */}
          <div className="absolute top-3 left-3 z-10 flex items-center space-x-2">
            <span className="rounded-md border border-lime/40 bg-obsidian/80 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-lime backdrop-blur-md flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-lime" />
              <span>{use3DAvatar ? "3D Stylized Avatar" : "Original Photograph"}</span>
            </span>
          </div>

          {/* Quick Toggle Button between 3D Avatar and Original Portrait */}
          <button
            onClick={() => setUse3DAvatar(!use3DAvatar)}
            className="absolute top-3 right-3 z-10 rounded-full border border-graphite/80 bg-obsidian/85 p-2 text-muted hover:text-lime hover:border-lime/60 backdrop-blur-md transition-all duration-200"
            title={use3DAvatar ? "View Original Reference Portrait" : "View 3D Cartoon Avatar"}
            aria-label="Toggle avatar mode"
            data-cursor="SWITCH"
          >
            {use3DAvatar ? <Camera className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Bottom Avatar Caption Bar */}
        <div className="p-4 bg-charcoal/95 border-t border-graphite flex items-center justify-between">
          <div>
            <h3 className="font-heading text-sm font-bold text-warm flex items-center space-x-1.5">
              <span>Jaki Tahsin</span>
              <span className="text-[10px] font-mono text-lime font-normal">✦</span>
            </h3>
            <p className="text-xs text-muted font-mono">Visual Communicator & 3D Identity</p>
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-mono text-lime">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-ping" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
