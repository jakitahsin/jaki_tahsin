"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, RotateCcw, Check, X, Flame, Eye, ArrowRight, Play } from "lucide-react";

interface ColorQuestion {
  id: number;
  name: string;
  targetHex: string;
  options: { hex: string; isCorrect: boolean }[];
  hint: string;
}

// Curated pool of high-end design palette colors
const COLOR_POOL = [
  { name: "Electric Lime", hex: "#D7FF64", hint: "Signature studio luminescent acid lime" },
  { name: "Obsidian Black", hex: "#101010", hint: "Ultra-deep mineral studio ground" },
  { name: "International Klein Blue", hex: "#002FA7", hint: "Iconic saturated ultramarine pigment" },
  { name: "Swiss Vermilion", hex: "#E63946", hint: "High-contrast modernist editorial red" },
  { name: "Neo Mint", hex: "#06D6A0", hint: "Futuristic digital botanical turquoise" },
  { name: "Cyber Tangerine", hex: "#FF6B35", hint: "Energetic warm chromatic focal point" },
  { name: "Tokyo Neon Purple", hex: "#8338EC", hint: "Deep nocturnal digital synthwave hue" },
  { name: "Bauhaus Gold", hex: "#FFBE0B", hint: "Primary architectural canary pigment" },
  { name: "Deep Charcoal", hex: "#1D1D1D", hint: "Subtle neutral surface container" },
  { name: "Nordic Ice Blue", hex: "#3A86FF", hint: "Crisp technical interface blue" },
  { name: "Acid Chartreuse", hex: "#C7F464", hint: "High-visibility luminescent print ink" },
  { name: "Terracotta Brick", hex: "#E07A5F", hint: "Warm tactile Old Dhaka heritage clay" },
  { name: "Emerald Glaze", hex: "#2A9D8F", hint: "Subdued organic architectural green" },
  { name: "Raw Umber", hex: "#4A4E69", hint: "Muted dusk editorial neutral tone" },
  { name: "Flamingo Coral", hex: "#F28482", hint: "Soft tactile editorial highlight" },
  { name: "Titanium Graphite", hex: "#303030", hint: "Refined structural dividing border" },
];

// Helper to shift a hex color slightly to generate smart distractors
function shiftHexColor(hex: string, deltaPercent: number): string {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split("").map((c) => c + c).join("");
  }
  const num = parseInt(cleanHex, 16);
  let r = (num >> 16) + Math.round(255 * deltaPercent);
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * (deltaPercent * 0.7));
  let b = (num & 0x0000ff) + Math.round(255 * (deltaPercent * 1.2));

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function generateQuestions(): ColorQuestion[] {
  // Shuffle color pool
  const shuffled = [...COLOR_POOL].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);

  return selected.map((item, idx) => {
    // Generate 3 plausible distractors that look in the realm of design colors
    const distractor1 = shiftHexColor(item.hex, 0.18);
    const distractor2 = shiftHexColor(item.hex, -0.22);
    // Grab another random color from pool as 3rd distractor
    const other = COLOR_POOL[(idx + 4) % COLOR_POOL.length].hex;

    const options = [
      { hex: item.hex, isCorrect: true },
      { hex: distractor1, isCorrect: false },
      { hex: distractor2, isCorrect: false },
      { hex: other, isCorrect: false },
    ].sort(() => 0.5 - Math.random());

    return {
      id: idx + 1,
      name: item.name,
      targetHex: item.hex,
      options,
      hint: item.hint,
    };
  });
}

export function ColorMatchGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [questions, setQuestions] = useState<ColorQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHex, setSelectedHex] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const startNewGame = useCallback(() => {
    const freshQuestions = generateQuestions();
    setQuestions(freshQuestions);
    setCurrentIndex(0);
    setSelectedHex(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setIsAnswered(false);
    setIsGameOver(false);
    setIsPlaying(true);
  }, []);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (hex: string, isCorrect: boolean) => {
    if (isAnswered) return;

    setSelectedHex(hex);
    setIsAnswered(true);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount((prev) => prev + 1);
      // Base 100 points + 25 points per streak count
      setScore((prev) => prev + 100 + (newStreak - 1) * 25);
    } else {
      setStreak(0);
    }

    // Auto proceed to next question after 900ms
    setTimeout(() => {
      if (currentIndex + 1 < 10) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedHex(null);
        setIsAnswered(false);
      } else {
        setIsGameOver(true);
      }
    }, 950);
  };

  const getEvaluation = (accuracy: number) => {
    if (accuracy >= 90) {
      return {
        title: "Exceptional Color Vision",
        desc: "Mastery level chromatic discernment. You spot subtle optical nuances like a veteran art director.",
        badge: "Diamond Eye",
      };
    }
    if (accuracy >= 70) {
      return {
        title: "Strong Design Instinct",
        desc: "Sharp, intuitive color perception. You reliably distinguish brand contrast and palette harmony.",
        badge: "Senior Eye",
      };
    }
    if (accuracy >= 40) {
      return {
        title: "Creative in Progress",
        desc: "Good eye for dominant tones. With more color calibration training, your precision will peak.",
        badge: "Developing Eye",
      };
    }
    return {
      title: "Time to Train Your Eye",
      desc: "Color is subtle, deceptive, and context-dependent. Spend time studying hex values and try another round!",
      badge: "Apprentice Eye",
    };
  };

  return (
    <div className="w-full rounded-2xl border border-graphite bg-charcoal/80 p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-lime/10 blur-[90px]" />

      {!isPlaying ? (
        /* Welcome / Start Screen */
        <div className="text-center py-8 md:py-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-lime bg-lime/10 border border-lime/30 px-3.5 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Designer Challenge</span>
          </div>
          <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-warm tracking-tight">
            Color Match
          </h3>
          <p className="mt-2 text-lg sm:text-xl font-heading font-medium text-lime">
            “Think you have a designer’s eye?”
          </p>
          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            Every graphic designer must distinguish between subtle variations in tint, saturation, and luminance. Match the displayed target color swatch with the exact HEX code across 10 rapid challenges.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={startNewGame}
              className="group inline-flex items-center space-x-2.5 rounded-full bg-lime px-8 py-4 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-[0_0_25px_rgba(215,255,100,0.3)] transition-all hover:bg-lime-hover hover:scale-105"
              data-cursor="PLAY"
            >
              <Play className="h-4 w-4 fill-obsidian" />
              <span>Start the Challenge</span>
            </button>
          </div>

          <div className="mt-8 flex justify-center items-center space-x-6 text-xs font-mono text-muted/80">
            <span>10 QUESTIONS</span>
            <span>✦</span>
            <span>STREAK BONUSES</span>
            <span>✦</span>
            <span>ACCURACY RATING</span>
          </div>
        </div>
      ) : isGameOver ? (
        /* Results Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6 max-w-xl mx-auto"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime/10 text-lime border border-lime/40 shadow-[0_0_30px_rgba(215,255,100,0.2)]">
            <Trophy className="h-8 w-8" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-lime font-bold">
            Evaluation Complete
          </span>

          {(() => {
            const accuracy = Math.round((correctCount / 10) * 100);
            const evalData = getEvaluation(accuracy);
            return (
              <>
                <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-warm mt-2">
                  {evalData.title}
                </h3>
                <p className="text-sm text-muted mt-2 max-w-md mx-auto leading-relaxed">
                  {evalData.desc}
                </p>

                {/* Score Stats Grid */}
                <div className="grid grid-cols-3 gap-3 my-8 text-left">
                  <div className="rounded-xl border border-graphite bg-elevated p-4">
                    <span className="block text-[10px] font-mono uppercase text-muted">Final Score</span>
                    <span className="font-heading text-2xl font-black text-lime mt-1 block">
                      {score}
                    </span>
                  </div>
                  <div className="rounded-xl border border-graphite bg-elevated p-4">
                    <span className="block text-[10px] font-mono uppercase text-muted">Accuracy</span>
                    <span className="font-heading text-2xl font-black text-warm mt-1 block">
                      {accuracy}%
                    </span>
                    <span className="text-[10px] font-mono text-muted">{correctCount}/10 correct</span>
                  </div>
                  <div className="rounded-xl border border-graphite bg-elevated p-4">
                    <span className="block text-[10px] font-mono uppercase text-muted">Max Streak</span>
                    <span className="font-heading text-2xl font-black text-warm mt-1 flex items-center space-x-1">
                      <span>{maxStreak}</span>
                      {maxStreak >= 3 && <Flame className="h-4 w-4 text-orange-400" />}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={startNewGame}
                    className="inline-flex items-center space-x-2 rounded-full bg-lime px-8 py-3.5 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-lg hover:bg-lime-hover transition-all"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Play Again</span>
                  </button>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="inline-flex items-center space-x-2 rounded-full border border-graphite bg-elevated px-6 py-3.5 text-xs font-heading font-semibold uppercase tracking-wider text-warm hover:border-lime/60 hover:text-lime transition-all"
                  >
                    <span>Close Game</span>
                  </button>
                </div>
              </>
            );
          })()}
        </motion.div>
      ) : (
        /* Active Game Arena */
        <div>
          {/* Header Bar: Progress, Score, Streak */}
          <div className="flex items-center justify-between pb-4 border-b border-graphite mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-warm">
                Round {currentIndex + 1} <span className="text-muted font-normal">/ 10</span>
              </span>
              {streak >= 2 && (
                <div className="flex items-center space-x-1 rounded-full bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 text-xs font-mono text-orange-400 animate-pulse">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{streak} Streak!</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-muted block">Score</span>
                <span className="font-heading text-sm md:text-base font-bold text-lime">
                  {score} pts
                </span>
              </div>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-xs font-mono text-muted hover:text-warm transition-colors"
                title="Exit game"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-elevated rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full bg-lime"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Target Color Presentation */}
          <div className="flex flex-col items-center justify-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-muted mb-2">
              Identify this exact shade:
            </span>

            {/* Target Swatch Box */}
            <motion.div
              key={currentQ.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl border-2 border-graphite shadow-2xl flex flex-col justify-end p-4 overflow-hidden"
              style={{ backgroundColor: currentQ.targetHex }}
            >
              {/* Internal Hex Pill with Backdrop Contrast */}
              <div className="rounded-lg bg-obsidian/85 px-3 py-1.5 backdrop-blur-md border border-graphite/60 flex items-center justify-between w-full">
                <span className="text-xs font-mono font-bold tracking-wider text-warm">
                  {currentQ.targetHex}
                </span>
                <span className="text-[10px] font-mono uppercase text-lime/90 font-semibold truncate ml-2">
                  {currentQ.name}
                </span>
              </div>
            </motion.div>
          </div>

          {/* 4 Answer Option Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedHex === opt.hex;
              const showResult = isAnswered;

              let cardStyles = "border-graphite bg-elevated hover:border-lime/60";
              if (showResult) {
                if (opt.isCorrect) {
                  cardStyles = "border-lime bg-lime/15 ring-2 ring-lime shadow-[0_0_20px_rgba(215,255,100,0.3)]";
                } else if (isSelected && !opt.isCorrect) {
                  cardStyles = "border-red-500 bg-red-500/15 ring-2 ring-red-500";
                } else {
                  cardStyles = "border-graphite/40 opacity-40";
                }
              }

              return (
                <button
                  key={`${currentQ.id}-${optIdx}`}
                  onClick={() => handleSelectOption(opt.hex, opt.isCorrect)}
                  disabled={isAnswered}
                  className={`group relative flex flex-col items-center p-3.5 rounded-xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-lime ${cardStyles}`}
                  data-cursor="SELECT"
                >
                  {/* Swatch Preview */}
                  <div
                    className="w-full aspect-square rounded-lg border border-black/20 shadow-md mb-2.5 transition-transform group-hover:scale-102 flex items-center justify-center"
                    style={{ backgroundColor: opt.hex }}
                  >
                    {showResult && opt.isCorrect && (
                      <div className="h-7 w-7 rounded-full bg-obsidian/80 text-lime flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    {showResult && isSelected && !opt.isCorrect && (
                      <div className="h-7 w-7 rounded-full bg-obsidian/80 text-red-400 flex items-center justify-center shadow-lg">
                        <X className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-warm font-medium">
                    Option 0{optIdx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <span className="text-[11px] font-mono text-muted">
              Select the option matching {currentQ.targetHex}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
