"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";

interface PetCarnivalShowcaseProps {
  prevProject: { slug: string; title: string };
  nextProject: { slug: string; title: string };
}

const colorStripes = [
  { name: "Carnival Orange", hex: "#F1981C", rgb: "RGB 241 · 152 · 28", textDark: true },
  { name: "Deep Orange", hex: "#ED8419", rgb: "RGB 237 · 132 · 25", textDark: true },
  { name: "Sunburst Yellow", hex: "#FFC80C", rgb: "RGB 255 · 200 · 12", textDark: true },
  { name: "Pet Blue", hex: "#1D6BAF", rgb: "RGB 29 · 107 · 175", textDark: false },
  { name: "Royal Indigo", hex: "#324298", rgb: "RGB 50 · 66 · 152", textDark: false },
  { name: "Cocoa Brown", hex: "#A0612B", rgb: "RGB 160 · 97 · 43", textDark: false },
  { name: "Cream", hex: "#F4F2E5", rgb: "RGB 244 · 242 · 229", textDark: true },
];

const mascots = [
  {
    title: "Dog Hero",
    desc: "Golden retriever in a red mask and cape, one paw raised and the carnival badge on its chest.",
    color: "#F1981C",
    img: "/assets/works/pet-carnival/showcase/mascot-dog.webp",
  },
  {
    title: "Cat Hero",
    desc: "Tabby in a blue mask, cape and wristbands, standing proud on a blue-tiled roof.",
    color: "#1D6BAF",
    img: "/assets/works/pet-carnival/showcase/mascot-cat.webp",
  },
  {
    title: "Bunny Hero",
    desc: "White bunny with a blue cape and gold-trimmed mask, waving from the rooftop.",
    color: "#FFC80C",
    img: "/assets/works/pet-carnival/showcase/mascot-bunny.webp",
  },
  {
    title: "Bird Hero",
    desc: "A blue jay mid-flourish, wings spread, with a gold-trimmed cape.",
    color: "#324298",
    img: "/assets/works/pet-carnival/showcase/mascot-bird.webp",
  },
];

const collateralItems = [
  { title: "Facebook Poster", type: "Digital", img: "/assets/works/pet-carnival/showcase/fb-poster.webp" },
  { title: "Social Media Post", type: "Digital", img: "/assets/works/pet-carnival/showcase/social-post.webp" },
  { title: "X-Banner", type: "Print", img: "/assets/works/pet-carnival/showcase/x-banner.webp" },
  { title: "Entrance Gate", type: "On-site", img: "/assets/works/pet-carnival/showcase/entrance-gate.webp" },
  { title: "Gate Layout 4×8", type: "On-site", img: "/assets/works/pet-carnival/showcase/gate-layout-4x8.webp" },
  { title: "Photo Frame", type: "Photo-op", img: "/assets/works/pet-carnival/showcase/photo-frame.webp" },
  { title: "Event Jersey", type: "Apparel", img: "/assets/works/pet-carnival/showcase/event-jersey.webp" },
  { title: "Square Posters", type: "Print", img: "/assets/works/pet-carnival/showcase/square-posters.webp" },
  { title: "360° Backdrop", type: "On-site", img: "/assets/works/pet-carnival/showcase/360-backdrop.webp" },
  { title: "Cat Cutout 2×2", type: "Photo-op", img: "/assets/works/pet-carnival/showcase/cat-cutout-2x2.webp" },
  { title: "Dog Cutout 2×2", type: "Photo-op", img: "/assets/works/pet-carnival/showcase/dog-cutout-2x2.webp" },
  { title: "Bird Cutout 2×2", type: "Photo-op", img: "/assets/works/pet-carnival/showcase/bird-cutout-2x2.webp" },
  { title: "Hanging Banner", type: "Print", img: "/assets/works/pet-carnival/showcase/hanging-banner.webp" },
];

const presentationBoards = [
  { title: "Hero Cover & Credentials", img: "/assets/works/pet-carnival/01-hero-cover-showcase.webp" },
  { title: "Color Spectrum & Typography", img: "/assets/works/pet-carnival/02-color-system-and-typography.webp" },
  { title: "3D Mascots Universe", img: "/assets/works/pet-carnival/03-3d-mascots-universe.webp" },
  { title: "Architectural Gate & Campus Mockup", img: "/assets/works/pet-carnival/04-architectural-gate-and-entrance.webp" },
  { title: "Main Stage & 4K Backdrop Experience", img: "/assets/works/pet-carnival/05-main-stage-and-backdrop-experience.webp" },
  { title: "Apparel & Merchandise", img: "/assets/works/pet-carnival/06-apparel-and-merchandise.webp" },
  { title: "Environmental Signage & Cutouts", img: "/assets/works/pet-carnival/07-environmental-signage-and-cutouts.webp" },
  { title: "Digital Campaign & Social Grid", img: "/assets/works/pet-carnival/08-digital-campaign-and-marketing.webp" },
];

export function PetCarnivalShowcase({ prevProject, nextProject }: PetCarnivalShowcaseProps) {
  const [activeMascot, setActiveMascot] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption?: string } | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const progress = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/showcases/pet-carnival.css";
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const copyHex = (hex: string) => {
    try {
      navigator.clipboard.writeText(hex);
    } catch {
      // fallback
    }
    setToastMsg(`Copied ${hex}`);
    setTimeout(() => setToastMsg(null), 1800);
  };

  return (
    <div className="pet-carnival-scope pt-20">
      {/* Scroll Progress Bar */}
      <div
        id="bar"
        style={{
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: "0 0",
        }}
      />

      {/* Hero Section */}
      <header className="hero">
        <div className="wrap">
          <div className="top">
            <Link
              href="/work"
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider transition-opacity hover:opacity-75"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All Works</span>
            </Link>
            <span>Case Study</span>
          </div>

          <div className="g">
            <div>
              <span className="chip">Brand Identity · Event Collateral</span>
              <h1>
                <span>1st</span>Pet Carnival
              </h1>
              <p className="l">
                A joyful sunburst identity, four caped pet heroes and every piece of collateral for a day built around pets and the people who love them.
              </p>
              <a className="cta" href="#palette">
                Explore the identity ↓
              </a>
            </div>

            <div className="logo">
              <img
                src="/assets/works/pet-carnival/showcase/logo.webp"
                alt="1st Pet Carnival logo"
                width={420}
                height={420}
                className="w-full h-auto"
              />
              <div className="badge">
                <svg viewBox="0 0 150 150">
                  <defs>
                    <path id="c" d="M75 75m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" />
                  </defs>
                  <text
                    fontFamily="Bricolage Grotesque, sans-serif"
                    fontWeight="800"
                    fontSize="13"
                    letterSpacing="3.2"
                    fill="currentColor"
                  >
                    <textPath href="#c">20 JANUARY 2026 ✦ TSC DHAKA UNIVERSITY ✦</textPath>
                  </text>
                </svg>
                <b>🐾</b>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Marquee Banner */}
      <div className="mq">
        <div>
          Pet Ramp Walk ✦ Fun Games ✦ Educational Sessions ✦ Training &amp; Awareness ✦ Pet Ramp Walk ✦ Fun Games ✦ Educational Sessions ✦ Training &amp; Awareness ✦ Pet Ramp Walk ✦ Fun Games ✦ Educational Sessions ✦ Training &amp; Awareness ✦ Pet Ramp Walk ✦ Fun Games ✦ Educational Sessions ✦ Training &amp; Awareness ✦{" "}
        </div>
      </div>

      {/* Key Numbers / Stats Row */}
      <div className="stats">
        <div className="wrap">
          <div>
            <b>7</b>
            <small>Brand colours</small>
          </div>
          <div>
            <b>4</b>
            <small>Hero mascots</small>
          </div>
          <div>
            <b>13</b>
            <small>Collateral pieces</small>
          </div>
          <div>
            <b>20.01</b>
            <small>Event day, 2026</small>
          </div>
        </div>
      </div>

      {/* Main Showcase Content */}
      <main>
        {/* Section 01: Project Overview */}
        <section>
          <div className="wrap">
            <div className="eb">
              <i>01</i>
              <span>The Project</span>
            </div>
            <h2>One identity, from first post to front gate.</h2>
            <p className="lead">
              The brief was a carnival that feels instantly friendly. I built the system around a hand-lettered wordmark, a warm sunburst and a camera-and-paw emblem, then carried it across print, digital, on-site and mascot work.
            </p>
            <div className="meta">
              <div>
                <small>My role</small>
                <b>Lead Graphic Designer &amp; Art Director</b>
              </div>
              <div>
                <small>Presented by</small>
                <b>CARE DU</b>
              </div>
              <div>
                <small>Organized by</small>
                <b>DUCSU</b>
              </div>
              <div>
                <small>Date</small>
                <b>20 January 2026</b>
              </div>
              <div>
                <small>Venue</small>
                <b>TSC &amp; Curzon Hall, University of Dhaka</b>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Colour System */}
        <section className="alt" id="palette">
          <div className="wrap">
            <div className="eb">
              <i>02</i>
              <span>Colour</span>
            </div>
            <h2>Warm, loud and impossible to miss.</h2>
            <p className="lead">
              Seven colours sampled from the logo and artwork. Orange carries the energy, blue and indigo add contrast and trust. Hover to expand, tap to copy a HEX code.
            </p>
            <div className="stripes">
              {colorStripes.map((st) => (
                <button
                  key={st.hex}
                  className="st"
                  style={{
                    backgroundColor: st.hex,
                    color: st.textDark ? "#2B1608" : "#ffffff",
                  }}
                  onClick={() => copyHex(st.hex)}
                  aria-label={`Copy ${st.name} ${st.hex}`}
                >
                  <b>{st.name}</b>
                  <code>{st.hex}</code>
                  <small>{st.rgb}</small>
                </button>
              ))}
            </div>
            <div className="cap">Click any stripe to copy its HEX value.</div>
          </div>
        </section>

        {/* Section 03: Typography */}
        <section>
          <div className="wrap">
            <div className="eb">
              <i>03</i>
              <span>Typography</span>
            </div>
            <h2>Round, chunky and friendly.</h2>
            <p className="lead">
              The wordmark is custom lettering. For the showcase I paired fonts that echo its soft, heavy character.
            </p>
            <div className="type">
              <div className="tc big">
                <small>Display</small>
                <div className="aa" style={{ fontFamily: "var(--d)" }}>
                  Aa
                </div>
                <div>
                  <b style={{ font: "400 26px var(--d)" }}>Bagel Fat One</b>
                  <p>Headlines, numerals, hero moments.</p>
                </div>
              </div>
              <div className="tc">
                <small>Headings</small>
                <div className="aa" style={{ fontFamily: "var(--h)", fontWeight: 800 }}>
                  Aa
                </div>
                <div>
                  <b style={{ font: "800 24px var(--h)" }}>Bricolage Grotesque</b>
                  <p>Titles, labels and navigation.</p>
                </div>
              </div>
              <div className="tc">
                <small>Body</small>
                <div className="aa" style={{ fontFamily: "var(--s)", fontWeight: 700 }}>
                  Aa
                </div>
                <div>
                  <b style={{ font: "700 22px var(--s)" }}>DM Sans</b>
                  <p>Readable copy and details.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Mascots */}
        <section className="alt">
          <div className="wrap">
            <div className="eb">
              <i>04</i>
              <span>Mascots</span>
            </div>
            <h2>Four pet heroes, one emblem.</h2>
            <p className="lead">
              Each hero wears the 1st Pet Carnival badge on its chest, so the brand travels with the characters. Pick a hero to take a closer look.
            </p>

            <div
              className="stage"
              id="stg"
              style={{
                // @ts-expect-error CSS variable
                "--ac": mascots[activeMascot].color,
              }}
            >
              <div className="panel">
                {mascots.map((m, idx) => (
                  <img
                    key={m.title}
                    src={m.img}
                    alt={m.title}
                    className={idx === activeMascot ? "on" : ""}
                    onClick={() => setLightboxImg({ src: m.img, caption: m.title })}
                    style={{ cursor: "zoom-in" }}
                  />
                ))}
              </div>

              <div className="info">
                <h3>{mascots[activeMascot].title}</h3>
                <p>{mascots[activeMascot].desc}</p>
                <div className="tabs">
                  {mascots.map((m, idx) => (
                    <button
                      key={m.title}
                      className={`tab ${idx === activeMascot ? "on" : ""}`}
                      onClick={() => setActiveMascot(idx)}
                      style={{
                        // @ts-expect-error CSS variable
                        "--c": m.color,
                      }}
                    >
                      <i style={{ backgroundColor: m.color }} />
                      <span>{m.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Turnaround Sheet */}
            <figure
              className="full"
              style={{ margin: "60px 0 0" }}
              onClick={() =>
                setLightboxImg({
                  src: "/assets/works/pet-carnival/showcase/dog-turnaround.webp",
                  caption: "Front & back turnaround — Dog mascot",
                })
              }
            >
              <img
                src="/assets/works/pet-carnival/showcase/dog-turnaround.webp"
                alt="Dog mascot front and back turnaround"
              />
              <figcaption>
                <span>Front &amp; back turnaround</span>
                <span>Dog mascot</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Section 05: Architectural Installation In Context */}
        <section>
          <div className="wrap">
            <div className="eb">
              <i>05</i>
              <span>In Context</span>
            </div>
            <h2>The gate, on campus.</h2>
            <p className="lead">
              A mockup of the entrance gate standing in front of a University of Dhaka landmark, with the identity doing what it was designed to do: draw people in.
            </p>
            <figure
              className="full"
              onClick={() =>
                setLightboxImg({
                  src: "/assets/works/pet-carnival/showcase/gate-campus-mockup.webp",
                  caption: "Entrance gate mockup on Curzon Hall university campus",
                })
              }
            >
              <img
                src="/assets/works/pet-carnival/showcase/gate-campus-mockup.webp"
                alt="Entrance gate mockup on the university campus"
              />
              <figcaption>
                <span>Entrance gate mockup</span>
                <span>Tap to enlarge</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Section 06: Full Collateral Suite */}
        <section className="alt">
          <div className="wrap">
            <div className="eb">
              <i>06</i>
              <span>Collateral</span>
            </div>
            <h2>Every touchpoint, covered.</h2>
            <p className="lead">
              Digital posters, banners, on-site structures, apparel and photo-op pieces. Tap any piece to view it larger.
            </p>

            <div className="gal">
              {collateralItems.map((item, idx) => (
                <figure
                  key={idx}
                  onClick={() => setLightboxImg({ src: item.img, caption: `${item.title} (${item.type})` })}
                >
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <figcaption>
                    <span>{item.title}</span>
                    <em>{item.type}</em>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Section 07: High-Resolution Presentation Boards */}
        <section>
          <div className="wrap">
            <div className="eb">
              <i>07</i>
              <span>Presentation Boards</span>
            </div>
            <h2>Master Portfolio Collection</h2>
            <p className="lead">
              The 8 master showcase boards crafted for design review and Behance exhibition. Click any board for full-screen inspection.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {presentationBoards.map((board, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-[rgba(43,22,8,0.15)] bg-white shadow-lg cursor-zoom-in transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  onClick={() => setLightboxImg({ src: board.img, caption: `Board 0${idx + 1}: ${board.title}` })}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#2B1608]/5">
                    <img
                      src={board.img}
                      alt={board.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between font-bold text-sm" style={{ fontFamily: "var(--h)" }}>
                    <span className="text-[#2B1608]">
                      0{idx + 1}. {board.title}
                    </span>
                    <span className="text-xs uppercase font-mono px-2 py-1 rounded bg-[#F1981C]/20 text-[#ED8419]">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* End CTA */}
      <section className="end">
        <div className="wrap">
          <h2>Let’s make your brand this loud.</h2>
          <p>
            Need an identity that people remember? I design logos, events, social campaigns and print with the same care and precision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="cta" href="mailto:jakitahsin@gmail.com">
              jakitahsin@gmail.com →
            </a>
            <Link
              href="/contact?service=Brand%20Identity"
              className="cta"
              style={{
                backgroundColor: "var(--o)",
                color: "#2B1608",
              }}
            >
              Start a Project ✦
            </Link>
          </div>
        </div>
      </section>

      {/* Project Navigation Footer */}
      <div className="bg-[#150D06] border-t border-[rgba(255,241,218,0.1)] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link
            href={`/work/${prevProject.slug}`}
            className="flex items-center space-x-3 text-[#D3AE82] hover:text-[#FFC80C] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <div className="text-left">
              <span className="block text-[10px] font-mono uppercase tracking-wider opacity-60">Previous Project</span>
              <span className="font-bold text-sm" style={{ fontFamily: "var(--h)" }}>
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            href="/work"
            className="text-xs font-mono uppercase tracking-widest text-[#FFC80C] hover:underline"
          >
            ✦ All Works ✦
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="flex items-center space-x-3 text-[#D3AE82] hover:text-[#FFC80C] transition-colors text-right"
          >
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider opacity-60">Next Project</span>
              <span className="font-bold text-sm" style={{ fontFamily: "var(--h)" }}>
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="text-center text-xs text-[#D3AE82]/60 mt-8">
          1st Pet Carnival · Art Direction &amp; Brand Identity by Jaki Tahsin · Presented by CARE DU · Organized by DUCSU
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="lb on"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-label="Image Preview"
        >
          <button
            className="fixed top-6 right-6 z-[70] rounded-full bg-white/20 p-2 text-white hover:bg-white/40 transition-colors"
            onClick={() => setLightboxImg(null)}
            aria-label="Close image modal"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={lightboxImg.src}
              alt={lightboxImg.caption || "Preview"}
              className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {lightboxImg.caption && (
              <span className="mt-3 px-4 py-1.5 rounded-full bg-black/80 text-white text-xs font-mono font-bold tracking-wide">
                {lightboxImg.caption}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`t ${toastMsg ? "on" : ""}`}>{toastMsg}</div>
    </div>
  );
}
