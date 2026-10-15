"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Terminal, Code2, Palette } from "lucide-react";

interface EasterEggProps {
  clickCount: number;
  onReset: () => void;
}

export function EasterEggModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-xl border border-lime/40 bg-charcoal p-6 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="easter-egg-title"
        >
          {/* Accent Glow Top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-muted hover:text-warm hover:bg-elevated transition-colors"
            aria-label="Close message"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/10 text-lime border border-lime/30">
              <Sparkles className="h-5 w-5 animate-spin-slow" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-lime">Easter Egg Unlocked</p>
              <h3 id="easter-egg-title" className="font-heading text-lg font-bold text-warm">
                Design Intelligence × Software Engineering
              </h3>
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-5">
            You found the developer handshake! As a graphic designer completing a BSc in Software Engineering at Daffodil International University, I view typography, spatial systems, and visual identity through both an aesthetic and algorithmic lens.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-warm/80 mb-5">
            <div className="flex items-center space-x-2 rounded border border-graphite bg-elevated/80 p-2">
              <Palette className="w-4 h-4 text-lime" />
              <span>Obsidian + Lime</span>
            </div>
            <div className="flex items-center space-x-2 rounded border border-graphite bg-elevated/80 p-2">
              <Code2 className="w-4 h-4 text-lime" />
              <span>Next.js App Router</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-lg bg-lime py-2.5 text-center text-xs font-heading font-bold uppercase tracking-wider text-obsidian hover:bg-lime-hover transition-colors"
          >
            Return to Exploration
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
