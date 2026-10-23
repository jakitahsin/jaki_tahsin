"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Copy, Check, X, ZoomIn } from "lucide-react";

interface Mascot {
  name: string;
  desc: string;
  color: string;
  img: string;
}

const MASCOTS: Mascot[] = [
  {
    name: "Dog Hero",
    desc: "Golden retriever in a red mask and cape, one paw raised and the carnival badge on its chest.",
    color: "#F1981C",
    img: "/work/1st-pet-carnival/assets/dog3d.webp",
  },
  {
    name: "Cat Hero",
    desc: "Tabby in a blue mask, cape and wristbands, standing proud on a blue-tiled roof.",
    color: "#1D6BAF",
    img: "/work/1st-pet-carnival/assets/cat3d.webp",
  },
  {
    name: "Bunny Hero",
    desc: "White bunny with a blue cape and gold-trimmed mask, waving from the rooftop.",
    color: "#FFC80C",
    img: "/work/1st-pet-carnival/assets/bunny.webp",
  },
  {
    name: "Bird Hero",
    desc: "A blue jay mid-flourish, wings spread, with a gold-trimmed cape.",
    color: "#324298",
    img: "/work/1st-pet-carnival/assets/bird.webp",
  },
];

const PALETTE = [
  { name: "Carnival Orange", hex: "#F1981C", rgb: "RGB 241 · 152 · 28", text: "#2B1608" },
  { name: "Deep Orange", hex: "#ED8419", rgb: "RGB 237 · 132 · 25", text: "#2B1608" },
  { name: "Sunburst Yellow", hex: "#FFC80C", rgb: "RGB 255 · 200 · 12", text: "#2B1608" },
  { name: "Pet Blue", hex: "#1D6BAF", rgb: "RGB 29 · 107 · 175", text: "#FFFFFF" },
  { name: "Royal Indigo", hex: "#324298", rgb: "RGB 50 · 66 · 152", text: "#FFFFFF" },
  { name: "Cocoa Brown", hex: "#A0612B", rgb: "RGB 160 · 97 · 43", text: "#FFFFFF" },
  { name: "Cream", hex: "#F4F2E5", rgb: "RGB 244 · 242 · 229", text: "#2B1608" },
];

const COLLATERALS = [
  { title: "Facebook Poster", tag: "Digital", src: "/work/1st-pet-carnival/assets/fb.webp" },
  { title: "Social Media Post", tag: "Digital", src: "/work/1st-pet-carnival/assets/post.webp" },
  { title: "X-Banner", tag: "Print", src: "/work/1st-pet-carnival/assets/xb.webp" },
  { title: "Entrance Gate", tag: "On-site", src: "/work/1st-pet-carnival/assets/gate.webp" },
  { title: "Gate Layout 4×8", tag: "On-site", src: "/work/1st-pet-carnival/assets/gate2.webp" },
  { title: "Photo Frame", tag: "Photo-op", src: "/work/1st-pet-carnival/assets/frame.webp" },
  { title: "Event Jersey", tag: "Apparel", src: "/work/1st-pet-carnival/assets/jersey.webp" },
  { title: "Square Posters", tag: "Print", src: "/work/1st-pet-carnival/assets/sq.webp" },
  { title: "360° Backdrop", tag: "On-site", src: "/work/1st-pet-carnival/assets/bd.webp" },
  { title: "Cat Cutout 2×2", tag: "Photo-op", src: "/work/1st-pet-carnival/assets/cat.webp" },
  { title: "Dog Cutout 2×2", tag: "Photo-op", src: "/work/1st-pet-carnival/assets/dog.webp" },
  { title: "Bird Cutout 2×2", tag: "Photo-op", src: "/work/1st-pet-carnival/assets/bird.webp" },
  { title: "Hanging Banner", tag: "Print", src: "/work/1st-pet-carnival/assets/hang.webp" },
];

export function PetCarnivalShowcase() {
  const [activeMascot, setActiveMascot] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-[#FFF7E8] text-[#2B1608] selection:bg-[#F1981C] selection:text-white font-sans antialiased">
      {/* External Fonts Link */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;700&display=swap"
      />

      {/* Top Floating Portfolio Back Bar */}
      <div className="sticky top-0 z-40 bg-[#FFF7E8]/90 backdrop-blur-md border-b border-[#2B1608]/10 px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2B1608] hover:text-[#ED8419] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-wider text-[#7A5230]">
            <span className="hidden sm:inline">DUCSU × CARE DU</span>
            <span className="text-[#ED8419] font-bold">1st Pet Carnival</span>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <header className="relative bg-gradient-to-br from-[#F5AC2B] to-[#ED8419] text-[#2B1608] px-6 py-16 md:py-24 overflow-hidden">
        {/* Ambient SVG pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 60% 50%, rgba(255,226,140,0.8), transparent 60%)`,
          }}
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <span className="inline-block bg-[#2B1608] text-[#FFC80C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Brand Identity · Event Collateral
            </span>

            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-normal text-white leading-none tracking-tight mb-6"
              style={{
                fontFamily: "'Bagel Fat One', cursive, sans-serif",
                textShadow:
                  "0 3px 0 #A0612B, 0 6px 0 #A0612B, 0 9px 0 #A0612B, 0 20px 30px rgba(60,25,0,0.35)",
              }}
            >
              <span className="block text-[#FFC80C] text-4xl sm:text-5xl mb-2">1st</span>
              Pet Carnival
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#2B1608]/90 max-w-xl leading-relaxed mb-8">
              A joyful sunburst identity, four caped pet heroes and every piece of collateral for a historic day celebrating pets and animal welfare at the University of Dhaka.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#palette"
                className="inline-flex items-center space-x-2 bg-[#2B1608] text-white hover:bg-[#324298] text-sm font-bold px-7 py-3.5 rounded-full transition-all shadow-[0_6px_0_rgba(43,22,8,0.35)] hover:-translate-y-0.5"
              >
                <span>Explore the identity</span>
                <span>↓</span>
              </a>

              <Link
                href="/work"
                className="inline-flex items-center space-x-1.5 text-sm font-bold text-[#2B1608] hover:text-white px-5 py-3.5 rounded-full transition-colors"
              >
                <span>Return to Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Floating Logo Artwork with Spin Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-[340px] sm:max-w-[400px]">
              <div className="relative rounded-[32px] border-[6px] border-white shadow-[0_24px_0_rgba(43,22,8,0.2),0_40px_70px_rgba(60,25,0,0.35)] rotate-2 overflow-hidden bg-white">
                <Image
                  src="/work/1st-pet-carnival/assets/logo.webp"
                  alt="1st Pet Carnival Official Logo"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Rotating Circular Seal Badge */}
              <div className="absolute -bottom-8 -right-6 w-32 h-32 rounded-full bg-[#324298] text-[#FFC80C] flex items-center justify-center shadow-[0_8px_0_rgba(43,22,8,0.3)]">
                <svg
                  viewBox="0 0 150 150"
                  className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]"
                >
                  <defs>
                    <path
                      id="badgeCircle"
                      d="M75 75m-56 0a56 56 0 1 1 112 0a56 56 0 1 1-112 0"
                    />
                  </defs>
                  <text
                    fontSize="12.5"
                    fontWeight="800"
                    letterSpacing="3"
                    fill="currentColor"
                  >
                    <textPath href="#badgeCircle">
                      20 JANUARY 2026 ✦ TSC DHAKA UNIVERSITY ✦
                    </textPath>
                  </text>
                </svg>
                <span className="text-3xl select-none relative z-10">🐾</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE RIBBON */}
      <div className="bg-[#324298] text-[#FFC80C] py-4 border-y-4 border-[#2B1608] overflow-hidden whitespace-nowrap -rotate-1 shadow-md">
        <div className="inline-block animate-[marquee_25s_linear_infinite] text-base sm:text-xl font-extrabold uppercase tracking-wider">
          Pet Ramp Walk ✦ Fun Games ✦ Educational Sessions ✦ Training &amp; Awareness ✦ Veterinary Consultation ✦ Adoption Drive ✦ Pet Ramp Walk ✦ Fun Games ✦ Educational Sessions ✦ Training &amp; Awareness ✦ Veterinary Consultation ✦ Adoption Drive ✦
        </div>
      </div>

      {/* QUICK STATS */}
      <section className="bg-[#324298] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span
              className="block text-5xl md:text-6xl font-normal text-[#FFC80C]"
              style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
            >
              7
            </span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-85 mt-1 block">
              Brand Colours
            </span>
          </div>
          <div>
            <span
              className="block text-5xl md:text-6xl font-normal text-[#FFC80C]"
              style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
            >
              4
            </span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-85 mt-1 block">
              Hero Mascots
            </span>
          </div>
          <div>
            <span
              className="block text-5xl md:text-6xl font-normal text-[#FFC80C]"
              style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
            >
              13
            </span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-85 mt-1 block">
              Collateral Pieces
            </span>
          </div>
          <div>
            <span
              className="block text-5xl md:text-6xl font-normal text-[#FFC80C]"
              style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
            >
              20.01
            </span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-85 mt-1 block">
              Event Day 2026
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE PROJECT */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-4">
          <span
            className="text-5xl font-normal text-transparent"
            style={{
              fontFamily: "'Bagel Fat One', cursive",
              WebkitTextStroke: "2px #ED8419",
            }}
          >
            01
          </span>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#ED8419]">
            The Project
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl text-[#2B1608]">
          One identity, from first post to front gate.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#7A5230] max-w-3xl leading-relaxed">
          The brief was a carnival that feels instantly friendly. I built the system around a hand-lettered wordmark, a warm sunburst and a camera-and-paw emblem, then carried it across print, digital, on-site and mascot work.
        </p>

        {/* Project Metadata Cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-[#2B1608]/15 bg-white p-5 shadow-sm">
            <span className="block text-[11px] font-extrabold uppercase tracking-widest text-[#ED8419] mb-1">
              My Role
            </span>
            <span className="font-bold text-base text-[#2B1608]">Lead Designer</span>
          </div>
          <div className="rounded-2xl border border-[#2B1608]/15 bg-white p-5 shadow-sm">
            <span className="block text-[11px] font-extrabold uppercase tracking-widest text-[#ED8419] mb-1">
              Presented By
            </span>
            <span className="font-bold text-base text-[#2B1608]">CARE DU</span>
          </div>
          <div className="rounded-2xl border border-[#2B1608]/15 bg-white p-5 shadow-sm">
            <span className="block text-[11px] font-extrabold uppercase tracking-widest text-[#ED8419] mb-1">
              Organized By
            </span>
            <span className="font-bold text-base text-[#2B1608]">DUCSU</span>
          </div>
          <div className="rounded-2xl border border-[#2B1608]/15 bg-white p-5 shadow-sm">
            <span className="block text-[11px] font-extrabold uppercase tracking-widest text-[#ED8419] mb-1">
              Date
            </span>
            <span className="font-bold text-base text-[#2B1608]">20 Jan 2026</span>
          </div>
          <div className="rounded-2xl border border-[#2B1608]/15 bg-white p-5 shadow-sm col-span-2 md:col-span-1">
            <span className="block text-[11px] font-extrabold uppercase tracking-widest text-[#ED8419] mb-1">
              Venue
            </span>
            <span className="font-bold text-base text-[#2B1608]">TSC, Dhaka Univ.</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: COLOUR PALETTE */}
      <section id="palette" className="py-20 px-6 bg-[#FFEBC9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <span
              className="text-5xl font-normal text-transparent"
              style={{
                fontFamily: "'Bagel Fat One', cursive",
                WebkitTextStroke: "2px #ED8419",
              }}
            >
              02
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#ED8419]">
              Colour System
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2B1608]">
            Warm, loud and impossible to miss.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#7A5230] max-w-2xl leading-relaxed">
            Seven colours sampled from the logo and artwork. Orange carries the energy, blue and indigo add contrast and trust. Click any stripe to copy its HEX value.
          </p>

          {/* Interactive Stripes */}
          <div className="mt-8 flex flex-col md:flex-row h-auto md:h-96 rounded-3xl overflow-hidden shadow-xl border border-[#2B1608]/10">
            {PALETTE.map((swatch) => (
              <button
                key={swatch.hex}
                onClick={() => copyToClipboard(swatch.hex)}
                className="group relative flex-1 p-6 flex md:flex-col justify-between items-center md:items-start text-left transition-all duration-300 md:hover:flex-[2.5] cursor-pointer"
                style={{ backgroundColor: swatch.hex, color: swatch.text }}
                title={`Click to copy ${swatch.hex}`}
              >
                <div>
                  <span className="block text-xs font-mono opacity-80">{swatch.rgb}</span>
                  <span className="block text-xl font-extrabold mt-1">{swatch.name}</span>
                </div>

                <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-mono">
                  {copiedHex === swatch.hex ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-lime-400" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                      <span>{swatch.hex}</span>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          {copiedHex && (
            <div className="mt-4 text-center text-xs font-mono font-bold text-[#324298]">
              ✓ Copied {copiedHex} to clipboard!
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: MASCOTS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-4">
          <span
            className="text-5xl font-normal text-transparent"
            style={{
              fontFamily: "'Bagel Fat One', cursive",
              WebkitTextStroke: "2px #ED8419",
            }}
          >
            03
          </span>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#ED8419]">
            3D Character Mascots
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2B1608]">
          Four pet heroes, one emblem.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#7A5230] max-w-2xl leading-relaxed">
          Each hero wears the 1st Pet Carnival badge on its chest, so the brand travels with the characters. Select a hero below to view their model.
        </p>

        {/* Mascot Interactive Showcase */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 border border-[#2B1608]/10 shadow-lg">
          {/* Mascot Image Display */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-6 transition-all duration-500"
              style={{
                backgroundColor: `${MASCOTS[activeMascot].color}15`,
                border: `2px solid ${MASCOTS[activeMascot].color}40`,
              }}
            >
              <Image
                src={MASCOTS[activeMascot].img}
                alt={MASCOTS[activeMascot].name}
                width={500}
                height={500}
                className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-300"
              />
            </div>
          </div>

          {/* Mascot Selector & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span
                className="inline-block text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-white mb-3"
                style={{ backgroundColor: MASCOTS[activeMascot].color }}
              >
                Hero Mascot {activeMascot + 1} of 4
              </span>
              <h3 className="text-3xl font-extrabold text-[#2B1608]">
                {MASCOTS[activeMascot].name}
              </h3>
              <p className="mt-3 text-sm text-[#7A5230] leading-relaxed">
                {MASCOTS[activeMascot].desc}
              </p>
            </div>

            {/* Selector Buttons */}
            <div className="mt-8 pt-6 border-t border-[#2B1608]/10">
              <span className="text-xs font-mono font-bold text-[#7A5230] block mb-3 uppercase tracking-wider">
                Select Mascot:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {MASCOTS.map((m, idx) => (
                  <button
                    key={m.name}
                    onClick={() => setActiveMascot(idx)}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeMascot === idx
                        ? "bg-[#2B1608] text-white shadow-md scale-102"
                        : "border border-[#2B1608]/20 bg-[#FFF7E8] text-[#2B1608] hover:border-[#ED8419]"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: m.color }}
                    />
                    <span className="truncate">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Turnaround Sheet */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-[#2B1608]/10 shadow-lg bg-white p-4">
          <div
            className="cursor-zoom-in relative group"
            onClick={() => setLightboxSrc("/work/1st-pet-carnival/assets/turn.webp")}
          >
            <Image
              src="/work/1st-pet-carnival/assets/turn.webp"
              alt="Mascot Turnaround Sheet"
              width={1200}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
              <span className="bg-white/90 text-[#2B1608] px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-md">
                <ZoomIn className="w-4 h-4" />
                <span>Tap to enlarge turnaround sheet</span>
              </span>
            </div>
          </div>
          <div className="mt-3 px-2 flex justify-between text-xs text-[#7A5230] font-mono">
            <span>Mascot Front &amp; Back Turnaround</span>
            <span>Orthographic 3D Model Sheets</span>
          </div>
        </div>
      </section>

      {/* SECTION 4: IN CONTEXT */}
      <section className="py-20 px-6 bg-[#FFEBC9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <span
              className="text-5xl font-normal text-transparent"
              style={{
                fontFamily: "'Bagel Fat One', cursive",
                WebkitTextStroke: "2px #ED8419",
              }}
            >
              04
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#ED8419]">
              In Context
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2B1608]">
            The gate, on campus.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#7A5230] max-w-2xl leading-relaxed">
            A photorealistic mockup of the 16-foot entrance gate installed in front of Dhaka University landmark, welcoming thousands of pet owners.
          </p>

          <div
            className="mt-8 rounded-3xl overflow-hidden shadow-2xl border border-[#2B1608]/15 cursor-zoom-in relative group"
            onClick={() => setLightboxSrc("/work/1st-pet-carnival/assets/site.webp")}
          >
            <Image
              src="/work/1st-pet-carnival/assets/site.webp"
              alt="Entrance Gate Mockup on University Campus"
              width={1200}
              height={700}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white/95 text-[#2B1608] px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg">
                <ZoomIn className="w-4 h-4" />
                <span>View Full Resolution Mockup</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COLLATERAL GALLERY */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-4">
          <span
            className="text-5xl font-normal text-transparent"
            style={{
              fontFamily: "'Bagel Fat One', cursive",
              WebkitTextStroke: "2px #ED8419",
            }}
          >
            05
          </span>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#ED8419]">
            Collateral Systems
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2B1608]">
          Every touchpoint, covered.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#7A5230] max-w-2xl leading-relaxed">
          Digital posters, banners, on-site structures, apparel, stage backdrops, and photo-op installations. Click any item to inspect.
        </p>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {COLLATERALS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxSrc(item.src)}
              className="group cursor-zoom-in rounded-2xl overflow-hidden border border-[#2B1608]/15 bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                  {item.tag}
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#2B1608]">{item.title}</h4>
                <ZoomIn className="w-4 h-4 text-[#ED8419] opacity-70 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="bg-[#324298] text-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-4xl sm:text-6xl font-normal text-white mb-4 leading-tight"
            style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
          >
            Let&apos;s make your brand this loud.
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">
            Need an identity system that captivates audiences? I design comprehensive brand universes, 3D campaigns, and print environments.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contact"
              className="bg-[#FFC80C] text-[#2B1608] hover:bg-white text-sm font-bold px-8 py-4 rounded-full transition-all shadow-lg font-heading"
            >
              Start a Conversation →
            </Link>
            <Link
              href="/work"
              className="border border-white/30 text-white hover:bg-white/10 text-sm font-bold px-8 py-4 rounded-full transition-all font-heading"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="bg-[#150D06] text-[#D3AE82] py-8 px-6 text-center text-xs font-mono border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            1st Pet Carnival · Art Direction &amp; Design by Jaki Tahsin · Presented by CARE DU · Organized by DUCSU
          </span>
          <Link
            href="/work"
            className="text-[#FFC80C] hover:underline font-bold"
          >
            Return to Portfolio Archive ↑
          </Link>
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-6 right-6 text-white hover:text-[#FFC80C] p-2 rounded-full bg-white/10 backdrop-blur-md"
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
