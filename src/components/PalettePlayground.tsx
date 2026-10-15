"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Palette, RefreshCw, Check } from "lucide-react";

interface PaletteScheme {
  id: string;
  name: string;
  bg: string;
  surface: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
  description: string;
}

const PALETTES: PaletteScheme[] = [
  {
    id: "obsidian-lime",
    name: "Obsidian + Lime (Default)",
    bg: "#101010",
    surface: "#1D1D1D",
    accent: "#D7FF64",
    text: "#F5F5F0",
    muted: "#A3A3A3",
    border: "#303030",
    description: "The signature studio theme. Deep mineral black with sharp luminescent acid lime.",
  },
  {
    id: "cyber-coral",
    name: "Tokyo Midnight + Neon Coral",
    bg: "#0B0E14",
    surface: "#151B26",
    accent: "#FF5E5B",
    text: "#F0F4FC",
    muted: "#8C9BB4",
    border: "#243044",
    description: "High-contrast editorial night palette with vivid energetic coral accents.",
  },
  {
    id: "monochrome-pure",
    name: "Swiss Studio Monochrome",
    bg: "#141414",
    surface: "#222222",
    accent: "#FFFFFF",
    text: "#F8F8F8",
    muted: "#888888",
    border: "#383838",
    description: "Strict minimalist archival aesthetic reminiscent of classic Zurich editorial prints.",
  },
  {
    id: "dacca-heritage",
    name: "Dacca Retro & Terracotta",
    bg: "#130E0D",
    surface: "#211A18",
    accent: "#E27D60",
    text: "#F7EDE2",
    muted: "#9E8E89",
    border: "#3D2E2A",
    description: "Warm tactile clay and brick tones inspired by Old Dhaka heritage architecture.",
  },
];

export function PalettePlayground() {
  const [activePalette, setActivePalette] = useState<PaletteScheme>(PALETTES[0]);

  return (
    <div className="w-full rounded-2xl border border-graphite bg-charcoal/60 p-6 md:p-8 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-graphite">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-lime mb-2">
            <Palette className="w-4 h-4" />
            <span>Interactive Laboratory</span>
          </div>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-warm">
            Play with the Palette
          </h3>
          <p className="text-xs md:text-sm text-muted mt-1 max-w-xl">
            Test how different color harmonics transform visual energy. Note: this preview is isolated to this specimen card and does not modify the global portfolio theme.
          </p>
        </div>

        <button
          onClick={() => setActivePalette(PALETTES[0])}
          className="self-start md:self-auto inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-graphite bg-elevated text-xs text-muted hover:text-warm hover:border-lime/40 transition-colors"
          title="Reset to default Obsidian + Lime"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Default</span>
        </button>
      </div>

      {/* Palette Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {PALETTES.map((p) => {
          const isSelected = activePalette.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePalette(p)}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? "border-lime bg-elevated shadow-[0_0_15px_rgba(215,255,100,0.15)] ring-1 ring-lime"
                  : "border-graphite bg-obsidian/40 hover:border-muted/40"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex items-center space-x-1.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/30"
                    style={{ backgroundColor: p.bg }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/30"
                    style={{ backgroundColor: p.surface }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-sm"
                    style={{ backgroundColor: p.accent }}
                  />
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-lime" />}
              </div>
              <span className="text-xs font-medium text-warm line-clamp-1">{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Contained Specimen Card */}
      <motion.div
        key={activePalette.id}
        initial={{ opacity: 0.8, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border p-6 md:p-8 transition-colors duration-300"
        style={{
          backgroundColor: activePalette.bg,
          borderColor: activePalette.border,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span
            className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold"
            style={{
              backgroundColor: activePalette.accent,
              color: activePalette.bg,
            }}
          >
            EDITORIAL SPECIMEN
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: activePalette.muted }}
          >
            {activePalette.id}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h4
              className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight mb-2"
              style={{ color: activePalette.text }}
            >
              “Good design is obvious. Great design is transparent.”
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{ color: activePalette.muted }}
            >
              {activePalette.description}
            </p>
          </div>

          <div
            className="rounded-lg p-5 border flex flex-col justify-between"
            style={{
              backgroundColor: activePalette.surface,
              borderColor: activePalette.border,
            }}
          >
            <div className="text-xs uppercase font-mono mb-3" style={{ color: activePalette.muted }}>
              Accent Response
            </div>
            <div
              className="text-3xl font-heading font-black mb-4"
              style={{ color: activePalette.accent }}
            >
              #D7FF64
            </div>
            <button
              className="w-full py-2 px-3 rounded text-xs font-bold font-heading uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{
                backgroundColor: activePalette.accent,
                color: activePalette.bg,
              }}
            >
              Interactive State
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
