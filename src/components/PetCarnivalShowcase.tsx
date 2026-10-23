"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Copy,
  Check,
  X,
  ZoomIn,
  Sun,
  Moon,
  Sparkles,
  Layers,
  Calendar,
  MapPin,
  User,
  Shield,
  Filter,
} from "lucide-react";
import { Project } from "@/types";

interface Mascot {
  name: string;
  role: string;
  desc: string;
  color: string;
  badgeColor: string;
  img: string;
}

const MASCOTS: Mascot[] = [
  {
    name: "Dog Hero (Captain Bark)",
    role: "The Brave Protector",
    desc: "Golden retriever wearing a crimson mask and cape, one paw raised in courageous solidarity, sporting the official carnival badge on its chest.",
    color: "#F1981C",
    badgeColor: "#ED8419",
    img: "/work/1st-pet-carnival/assets/dog3d.webp",
  },
  {
    name: "Cat Hero (Mighty Meow)",
    role: "The Agile Guardian",
    desc: "Sleek domestic tabby in an athletic blue hero mask, cape and wristbands, standing tall and proud across university rooftops.",
    color: "#1D6BAF",
    badgeColor: "#324298",
    img: "/work/1st-pet-carnival/assets/cat3d.webp",
  },
  {
    name: "Bunny Hero (Cottontail Hopper)",
    role: "The Joyful Scout",
    desc: "Charming white bunny wearing a cobalt cape and gold-trimmed superhero visor, enthusiastically welcoming visitors to the festival.",
    color: "#FFC80C",
    badgeColor: "#F1981C",
    img: "/work/1st-pet-carnival/assets/bunny.webp",
  },
  {
    name: "Bird Hero (Sky Glider)",
    role: "The Aerial Navigator",
    desc: "Vibrant blue jay mid-flight with wings outstretched, draped in a regal gold-accented cape symbolizing freedom and wildlife protection.",
    color: "#324298",
    badgeColor: "#1D6BAF",
    img: "/work/1st-pet-carnival/assets/bird.webp",
  },
];

const PALETTE = [
  { name: "Carnival Orange", hex: "#F1981C", rgb: "RGB 241 · 152 · 28", text: "#101010" },
  { name: "Deep Orange", hex: "#ED8419", rgb: "RGB 237 · 132 · 25", text: "#101010" },
  { name: "Sunburst Yellow", hex: "#FFC80C", rgb: "RGB 255 · 200 · 12", text: "#101010" },
  { name: "Pet Blue", hex: "#1D6BAF", rgb: "RGB 29 · 107 · 175", text: "#FFFFFF" },
  { name: "Royal Indigo", hex: "#324298", rgb: "RGB 50 · 66 · 152", text: "#FFFFFF" },
  { name: "Cocoa Brown", hex: "#A0612B", rgb: "RGB 160 · 97 · 43", text: "#FFFFFF" },
  { name: "Cream Ivory", hex: "#F4F2E5", rgb: "RGB 244 · 242 · 229", text: "#101010" },
];

const COLLATERAL_ITEMS = [
  { title: "Facebook Launch Poster", tag: "Digital", src: "/work/1st-pet-carnival/assets/fb.webp" },
  { title: "Social Feed Campaign Post", tag: "Digital", src: "/work/1st-pet-carnival/assets/post.webp" },
  { title: "Promenade X-Banner", tag: "Print", src: "/work/1st-pet-carnival/assets/xb.webp" },
  { title: "Campus Entrance Portal Gate", tag: "On-site", src: "/work/1st-pet-carnival/assets/gate.webp" },
  { title: "Entrance Gate Architectural Layout (4×8)", tag: "On-site", src: "/work/1st-pet-carnival/assets/gate2.webp" },
  { title: "Selfie Cutout Photo Frame (1800×3069)", tag: "Photo-op", src: "/work/1st-pet-carnival/assets/frame.webp" },
  { title: "Official Micro-Polyester Event Jersey", tag: "Apparel", src: "/work/1st-pet-carnival/assets/jersey.webp" },
  { title: "Square Announcement Posters", tag: "Print", src: "/work/1st-pet-carnival/assets/sq.webp" },
  { title: "360° Circular Video Booth Backdrop", tag: "On-site", src: "/work/1st-pet-carnival/assets/bd.webp" },
  { title: "Mascot Standee — Cat 2×2", tag: "Photo-op", src: "/work/1st-pet-carnival/assets/cat.webp" },
  { title: "Mascot Standee — Dog 2×2", tag: "Photo-op", src: "/work/1st-pet-carnival/assets/dog.webp" },
  { title: "Mascot Standee — Bird 2×2", tag: "Photo-op", src: "/work/1st-pet-carnival/assets/bird.webp" },
  { title: "Lamp Post Hanging Avenue Banners", tag: "Print", src: "/work/1st-pet-carnival/assets/hang.webp" },
];

const COLLATERAL_CATEGORIES = ["All", "Digital", "Print", "On-site", "Photo-op", "Apparel"];

interface Props {
  prevProject?: Project;
  nextProject?: Project;
}

export function PetCarnivalShowcase({ prevProject, nextProject }: Props) {
  // Theme toggle: defaults to dark to match the main portfolio
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeMascot, setActiveMascot] = useState(0);
  const [selectedCollateralFilter, setSelectedCollateralFilter] = useState("All");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const isDark = theme === "dark";

  const copyToClipboard = (hex: string) => {
    try {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCollaterals =
    selectedCollateralFilter === "All"
      ? COLLATERAL_ITEMS
      : COLLATERAL_ITEMS.filter((item) => item.tag === selectedCollateralFilter);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-obsidian text-warm"
          : "bg-[#FFF7E8] text-[#2B1608]"
      }`}
    >
      <div className="pt-28 pb-24 px-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Top Bar: Breadcrumb + Theme Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-graphite/60">
            <Link
              href="/work"
              className={`group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                isDark ? "text-muted hover:text-lime" : "text-[#7A5230] hover:text-[#ED8419]"
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Works</span>
            </Link>

            {/* Theme Switcher Pill */}
            <div className="flex items-center space-x-3">
              <span className={`text-[11px] font-mono ${isDark ? "text-muted" : "text-[#7A5230]"}`}>
                Theme Preview:
              </span>
              <div
                className={`inline-flex rounded-full p-1 border transition-all ${
                  isDark
                    ? "border-graphite bg-charcoal/90"
                    : "border-[#2B1608]/20 bg-white/80 shadow-sm"
                }`}
              >
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs font-mono transition-all ${
                    isDark
                      ? "bg-lime text-obsidian font-bold shadow-sm"
                      : "text-muted hover:text-warm"
                  }`}
                  title="Dark Theme (Portfolio Native)"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark (Portfolio)</span>
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs font-mono transition-all ${
                    !isDark
                      ? "bg-[#F1981C] text-white font-bold shadow-sm"
                      : "text-muted hover:text-warm"
                  }`}
                  title="Carnival Light Theme (Event Brand)"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Carnival Light</span>
                </button>
              </div>
            </div>
          </div>

          {/* Header Metadata & Title */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="rounded-md border border-lime/50 bg-lime/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-lime">
                Brand Identity
              </span>
              <span className="rounded-md border border-graphite bg-charcoal/80 px-3 py-1 text-xs font-mono text-muted">
                Event Branding
              </span>
              <span className="rounded-md border border-graphite bg-charcoal/80 px-3 py-1 text-xs font-mono text-muted">
                3D Mascots
              </span>
              <span className="rounded-md border border-graphite bg-charcoal/80 px-3 py-1 text-xs font-mono text-lime font-bold">
                2026
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  1st Pet Carnival —{" "}
                  <span className="text-lime">DUCSU &amp; CARE DU</span> Brand Identity
                </h1>
                <p
                  className={`mt-4 text-base sm:text-lg leading-relaxed ${
                    isDark ? "text-muted" : "text-[#7A5230]"
                  }`}
                >
                  Complete 360-degree brand identity and environmental design universe for the historic 1st Pet Carnival at University of Dhaka (TSC Promenade). Jointly organized by DUCSU and CARE DU, supported by the Ministry of Fisheries and Livestock.
                </p>
              </div>

              {/* 3D Mascot Orb Card with Orbiting Seal */}
              <div className="shrink-0 flex justify-center">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48">
                  <div
                    className={`relative w-full h-full rounded-3xl border overflow-hidden p-3 transition-all flex items-center justify-center ${
                      isDark
                        ? "border-graphite bg-charcoal/90 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                        : "border-[#2B1608]/15 bg-white shadow-xl"
                    }`}
                  >
                    <Image
                      src="/work/1st-pet-carnival/assets/logo.webp"
                      alt="1st Pet Carnival Logo"
                      width={300}
                      height={300}
                      className="w-full h-auto object-contain rounded-2xl"
                      priority
                    />
                  </div>

                  {/* Orbiting Rotating Seal Badge */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#324298] text-[#FFC80C] flex items-center justify-center shadow-lg border-2 border-obsidian">
                    <svg
                      viewBox="0 0 150 150"
                      className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite]"
                    >
                      <defs>
                        <path
                          id="sealCircle"
                          d="M75 75m-54 0a54 54 0 1 1 108 0a54 54 0 1 1-108 0"
                        />
                      </defs>
                      <text fontSize="12" fontWeight="800" letterSpacing="3" fill="currentColor">
                        <textPath href="#sealCircle">
                          20 JAN 2026 ✦ TSC DU ✦
                        </textPath>
                      </text>
                    </svg>
                    <span className="text-xl select-none relative z-10">🐾</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Project Metadata Matrix */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-5 gap-4 p-5 sm:p-6 rounded-2xl border mb-14 transition-all ${
              isDark
                ? "border-graphite bg-charcoal/70 shadow-lg"
                : "border-[#2B1608]/15 bg-white shadow-md"
            }`}
          >
            <div>
              <span className="flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest text-lime mb-1">
                <Shield className="w-3 h-3 text-lime" />
                <span>Presented By</span>
              </span>
              <span className="font-heading text-sm sm:text-base font-bold block truncate">
                CARE DU
              </span>
            </div>

            <div>
              <span className="flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest text-lime mb-1">
                <Layers className="w-3 h-3 text-lime" />
                <span>Organized By</span>
              </span>
              <span className="font-heading text-sm sm:text-base font-bold block truncate">
                DUCSU
              </span>
            </div>

            <div>
              <span className="flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest text-lime mb-1">
                <User className="w-3 h-3 text-lime" />
                <span>My Role</span>
              </span>
              <span className="font-heading text-sm sm:text-base font-bold block truncate">
                Lead Designer
              </span>
            </div>

            <div>
              <span className="flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest text-lime mb-1">
                <Calendar className="w-3 h-3 text-lime" />
                <span>Event Date</span>
              </span>
              <span className="font-heading text-sm sm:text-base font-bold block truncate">
                20 Jan 2026
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest text-lime mb-1">
                <MapPin className="w-3 h-3 text-lime" />
                <span>Venue</span>
              </span>
              <span className="font-heading text-sm sm:text-base font-bold block truncate">
                TSC, Dhaka Univ.
              </span>
            </div>
          </div>

          {/* MARQUEE RIBBON */}
          <div className="mb-14 rounded-2xl overflow-hidden border border-graphite bg-[#324298] text-[#FFC80C] py-3.5 shadow-md">
            <div className="flex animate-[marquee_24s_linear_infinite] whitespace-nowrap text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest">
              <span className="mx-4">Pet Ramp Walk ✦</span>
              <span className="mx-4">Fun Games &amp; Contests ✦</span>
              <span className="mx-4">Educational &amp; Veterinary Sessions ✦</span>
              <span className="mx-4">Animal Welfare Training &amp; Awareness ✦</span>
              <span className="mx-4">Pet Ramp Walk ✦</span>
              <span className="mx-4">Fun Games &amp; Contests ✦</span>
              <span className="mx-4">Educational &amp; Veterinary Sessions ✦</span>
            </div>
          </div>

          {/* KEY METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div
              className={`rounded-2xl border p-5 text-center transition-all ${
                isDark ? "border-graphite bg-charcoal/50" : "border-[#2B1608]/15 bg-white shadow-sm"
              }`}
            >
              <span className="font-heading text-4xl sm:text-5xl font-black text-[#F1981C] block">
                7
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted mt-1 block">
                Brand Colours
              </span>
            </div>

            <div
              className={`rounded-2xl border p-5 text-center transition-all ${
                isDark ? "border-graphite bg-charcoal/50" : "border-[#2B1608]/15 bg-white shadow-sm"
              }`}
            >
              <span className="font-heading text-4xl sm:text-5xl font-black text-lime block">
                4
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted mt-1 block">
                3D Hero Mascots
              </span>
            </div>

            <div
              className={`rounded-2xl border p-5 text-center transition-all ${
                isDark ? "border-graphite bg-charcoal/50" : "border-[#2B1608]/15 bg-white shadow-sm"
              }`}
            >
              <span className="font-heading text-4xl sm:text-5xl font-black text-[#1D6BAF] block">
                13
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted mt-1 block">
                Collateral Pieces
              </span>
            </div>

            <div
              className={`rounded-2xl border p-5 text-center transition-all ${
                isDark ? "border-graphite bg-charcoal/50" : "border-[#2B1608]/15 bg-white shadow-sm"
              }`}
            >
              <span className="font-heading text-4xl sm:text-5xl font-black text-[#FFC80C] block">
                20.01
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted mt-1 block">
                Historic Festival Day
              </span>
            </div>
          </div>

          {/* EDITORIAL BRIEF: CHALLENGE & APPROACH */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div
              className={`rounded-2xl border p-7 transition-all ${
                isDark ? "border-graphite bg-charcoal/60" : "border-[#2B1608]/15 bg-white shadow-sm"
              }`}
            >
              <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block font-bold">
                01 // The Creative Challenge
              </span>
              <h2 className="font-heading text-2xl font-bold mb-3">
                Balancing Carnival Warmth with Campus Protocol
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? "text-muted" : "text-[#7A5230]"}`}>
                Designing an identity that radiates warm carnival joy and child-friendly playfulness while upholding serious animal welfare awareness, vaccination protocols, and physical safety at the nation&apos;s premier university. The identity had to scale flawlessly from massive 16-foot entrance gates down to delicate collar ID badges.
              </p>
            </div>

            <div
              className={`rounded-2xl border p-7 transition-all ${
                isDark ? "border-graphite bg-charcoal/60" : "border-[#2B1608]/15 bg-white shadow-sm"
              }`}
            >
              <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block font-bold">
                02 // The Design System
              </span>
              <h2 className="font-heading text-2xl font-bold mb-3">
                Sunburst Triad, 3D Mascots &amp; Environmental Architecture
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? "text-muted" : "text-[#7A5230]"}`}>
                Anchored by a vibrant color palette (Amber Gold, Sunburst Orange, Cobalt Hero Blue), four superhero pet mascots (Captain Bark, Mighty Meow, Cottontail Hopper, Sky Glider), and high-contrast comic typography. Engineered to draw thousands of students and pet enthusiasts into a cohesive, unforgettable brand universe.
              </p>
            </div>
          </div>

          {/* SECTION 2: INTERACTIVE COLOR PALETTE */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-lime mb-1 block font-bold">
                  03 // Identity Palette
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                  Color System &amp; Brand Swatches
                </h2>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? "text-muted" : "text-[#7A5230]"}`}>
                  Click on any color stripe below to copy its exact HEX code directly to your clipboard.
                </p>
              </div>

              {copiedHex && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-lime text-obsidian text-xs font-mono font-bold animate-fade-in shadow-md">
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied {copiedHex}!</span>
                </div>
              )}
            </div>

            {/* Clickable Swatch Stripes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {PALETTE.map((swatch) => (
                <button
                  key={swatch.hex}
                  onClick={() => copyToClipboard(swatch.hex)}
                  className={`group relative rounded-xl p-4 flex flex-col justify-between min-h-[140px] text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border ${
                    isDark ? "border-graphite" : "border-black/10"
                  }`}
                  style={{ backgroundColor: swatch.hex, color: swatch.text }}
                  title={`Click to copy ${swatch.hex}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">
                      {swatch.hex}
                    </span>
                    <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div>
                    <span className="block font-heading text-sm font-extrabold leading-tight">
                      {swatch.name}
                    </span>
                    <span className="block text-[9px] font-mono opacity-75 mt-0.5">
                      {swatch.rgb}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 3: 3D CHARACTER MASCOTS STUDIO */}
          <section className="mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-1 block font-bold">
              04 // Character Design
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
              Four Superhero Mascots &amp; Turnaround Sheets
            </h2>
            <p className={`text-xs sm:text-sm mb-6 ${isDark ? "text-muted" : "text-[#7A5230]"}`}>
              Every hero wears the 1st Pet Carnival seal on their chest, so brand equity travels with each mascot across digital campaigns and life-size cutouts.
            </p>

            <div
              className={`rounded-2xl border p-6 sm:p-8 transition-all ${
                isDark ? "border-graphite bg-charcoal/70" : "border-[#2B1608]/15 bg-white shadow-md"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* 3D Model Display */}
                <div className="lg:col-span-6 flex justify-center">
                  <div
                    className="relative w-full max-w-sm aspect-square rounded-2xl p-6 flex items-center justify-center transition-all duration-300 shadow-inner"
                    style={{
                      backgroundColor: `${MASCOTS[activeMascot].color}18`,
                      border: `2px solid ${MASCOTS[activeMascot].color}50`,
                    }}
                  >
                    <Image
                      src={MASCOTS[activeMascot].img}
                      alt={MASCOTS[activeMascot].name}
                      width={450}
                      height={450}
                      className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Mascot Info & Tab Selector */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded text-white"
                        style={{ backgroundColor: MASCOTS[activeMascot].badgeColor }}
                      >
                        Hero Mascot 0{activeMascot + 1}
                      </span>
                      <span className="text-xs font-mono text-muted">
                        {MASCOTS[activeMascot].role}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-warm">
                      {MASCOTS[activeMascot].name}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isDark ? "text-muted" : "text-[#7A5230]"
                      }`}
                    >
                      {MASCOTS[activeMascot].desc}
                    </p>
                  </div>

                  {/* Tab Selector Buttons */}
                  <div className="mt-8 pt-6 border-t border-graphite/60">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted block mb-3">
                      Select Superhero:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {MASCOTS.map((m, idx) => (
                        <button
                          key={m.name}
                          onClick={() => setActiveMascot(idx)}
                          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-heading font-bold transition-all text-left ${
                            activeMascot === idx
                              ? "bg-lime text-obsidian shadow-sm font-extrabold"
                              : isDark
                              ? "border border-graphite bg-charcoal hover:border-lime/40 text-warm"
                              : "border border-[#2B1608]/20 bg-[#FFF7E8] text-[#2B1608] hover:border-[#ED8419]"
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: m.color }}
                          />
                          <span className="truncate">{m.name.split("(")[0].trim()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Turnaround Sheet Preview */}
              <div className="mt-8 pt-6 border-t border-graphite/60">
                <div
                  onClick={() => setLightboxSrc("/work/1st-pet-carnival/assets/turn.webp")}
                  className={`group relative rounded-xl overflow-hidden border cursor-zoom-in transition-all ${
                    isDark ? "border-graphite bg-obsidian" : "border-[#2B1608]/20 bg-white"
                  }`}
                >
                  <Image
                    src="/work/1st-pet-carnival/assets/turn.webp"
                    alt="Mascot Turnaround Sheet"
                    width={1200}
                    height={500}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="rounded-full bg-lime text-obsidian px-4 py-2 text-xs font-heading font-bold flex items-center space-x-1.5 shadow-lg">
                      <ZoomIn className="w-4 h-4" />
                      <span>Inspect 3D Orthographic Turnaround Sheet</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: IN CONTEXT CAMPUS GATE MOCKUP */}
          <section className="mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-1 block font-bold">
              05 // Environmental Staging
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
              Campus Entrance Gate Installation
            </h2>
            <p className={`text-xs sm:text-sm mb-6 ${isDark ? "text-muted" : "text-[#7A5230]"}`}>
              Photorealistic architectural preview of the arched portal gate standing in front of Dhaka University landmark on the TSC promenade.
            </p>

            <div
              onClick={() => setLightboxSrc("/work/1st-pet-carnival/assets/site.webp")}
              className={`group relative rounded-2xl overflow-hidden border cursor-zoom-in shadow-2xl transition-all ${
                isDark ? "border-graphite bg-obsidian" : "border-[#2B1608]/20 bg-white"
              }`}
            >
              <Image
                src="/work/1st-pet-carnival/assets/site.webp"
                alt="1st Pet Carnival Entrance Gate Mockup"
                width={1200}
                height={700}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="rounded-full bg-lime text-obsidian px-5 py-2.5 text-xs font-heading font-bold flex items-center space-x-2 shadow-xl">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to Enlarge Environmental Gate Mockup</span>
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 5: COLLATERAL GALLERY WITH DISCIPLINE FILTER */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-lime mb-1 block font-bold">
                  06 // Production Collateral
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                  13 Multi-Format Campaign Outputs
                </h2>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? "text-muted" : "text-[#7A5230]"}`}>
                  Digital posters, promenade banners, architectural gateways, jerseys, and life-size cutouts.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {COLLATERAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCollateralFilter(cat)}
                    className={`rounded-full px-3 py-1 text-xs font-mono transition-all ${
                      selectedCollateralFilter === cat
                        ? "bg-lime text-obsidian font-bold shadow-sm"
                        : isDark
                        ? "border border-graphite bg-charcoal text-muted hover:text-warm"
                        : "border border-[#2B1608]/20 bg-white text-[#7A5230] hover:text-[#2B1608]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCollaterals.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxSrc(item.src)}
                  className={`group relative rounded-xl overflow-hidden border cursor-zoom-in transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? "border-graphite bg-charcoal/80"
                      : "border-[#2B1608]/15 bg-white shadow-sm"
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-obsidian overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-lime text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-lime/30">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between">
                    <h4 className="font-heading font-bold text-xs sm:text-sm truncate mr-2">
                      {item.title}
                    </h4>
                    <ZoomIn className="w-4 h-4 text-lime shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECT FOOTER NAVIGATION (PREV / NEXT) */}
          <div className="pt-10 border-t border-graphite/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="group flex items-center space-x-3 text-xs font-mono uppercase tracking-wider text-muted hover:text-lime transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <span className="block text-[10px] text-muted/60">Previous Project</span>
                  <span className="font-heading font-bold text-sm text-warm group-hover:text-lime">
                    {prevProject.title.split("—")[0].trim()}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/work"
              className="px-6 py-2.5 rounded-full border border-graphite bg-charcoal/80 text-xs font-heading font-bold uppercase tracking-wider text-warm hover:border-lime hover:text-lime transition-all"
            >
              All Projects Index
            </Link>

            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex items-center space-x-3 text-xs font-mono uppercase tracking-wider text-muted hover:text-lime transition-colors text-right"
              >
                <div className="text-right">
                  <span className="block text-[10px] text-muted/60">Next Project</span>
                  <span className="font-heading font-bold text-sm text-warm group-hover:text-lime">
                    {nextProject.title.split("—")[0].trim()}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-6 right-6 text-white hover:text-lime p-2 rounded-full bg-white/10 backdrop-blur-md transition-colors"
            title="Close Lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="Enlarged Showcase Item"
              width={1600}
              height={1200}
              className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
