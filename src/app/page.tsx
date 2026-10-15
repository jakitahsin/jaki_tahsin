import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles, Layers, ShieldCheck, Compass, Eye, CheckCircle2 } from "lucide-react";
import { projectsData } from "@/data/projects";
import { clientsData } from "@/data/clients";
import { servicesData } from "@/data/services";
import { ProjectCard } from "@/components/ProjectCard";
import { Marquee } from "@/components/Marquee";
import { MagneticButton } from "@/components/MagneticButton";
import { PalettePlayground } from "@/components/PalettePlayground";
import { ColorMatchGame } from "@/components/ColorMatchGame";
import { HeroAvatar } from "@/components/HeroAvatar";

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION A — HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 md:py-32 px-6 sm:px-8 border-b border-graphite/60 overflow-hidden">
        {/* Ambient Subtle Radial Glow */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-lime/5 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-lime/5 blur-[160px]" />

        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center space-x-2.5 rounded-full border border-graphite bg-charcoal/80 px-3.5 py-1.5 text-xs font-mono tracking-wider text-lime mb-6 w-fit backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
              <span>INDEPENDENT GRAPHIC DESIGNER · BANGLADESH</span>
            </div>

            {/* Oversized Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-warm leading-[1.05]">
              Making ideas <br className="hidden sm:inline" />
              <span className="text-lime underline decoration-lime/30 underline-offset-8">
                impossible
              </span>{" "}
              to ignore.
            </h1>

            {/* Positioning Statement */}
            <p className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed">
              I am Jaki Tahsin, a graphic designer and visual communicator merging rigorous brand identity, bold outdoor advertising, and tactile editorial design with structured digital engineering thinking.
            </p>

            {/* CTA Group */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Link
                  href="/work"
                  className="group inline-flex items-center space-x-2.5 rounded-full bg-lime px-7 py-3.5 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-[0_0_25px_rgba(215,255,100,0.3)] transition-all hover:bg-lime-hover hover:scale-105"
                  data-cursor="EXPLORE"
                >
                  <span>Explore My Work</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 rounded-full border border-graphite bg-charcoal/90 px-6 py-3.5 text-xs font-heading font-semibold uppercase tracking-wider text-warm transition-all hover:border-lime/60 hover:text-lime"
                  data-cursor="CONTACT"
                >
                  <span>Let&apos;s Work Together</span>
                </Link>
              </MagneticButton>
            </div>

            {/* Editorial Quick Metadata */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-graphite/60 max-w-lg">
              <div>
                <span className="block text-[11px] font-mono text-muted uppercase">Base</span>
                <span className="font-heading text-sm font-semibold text-warm">Dhaka, BD</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-muted uppercase">Focus</span>
                <span className="font-heading text-sm font-semibold text-warm">Brand & Print</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-muted uppercase">Availability</span>
                <span className="font-heading text-sm font-semibold text-lime">Open Q4/Q1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero 3D Avatar with Float & Toggle */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroAvatar />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-1 text-muted/60">
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-lime/70" />
        </div>
      </section>

      {/* SECTION B — INTERACTIVE PHILOSOPHY INTRODUCTION */}
      <section className="py-20 md:py-28 px-6 sm:px-8 bg-charcoal/30 border-b border-graphite">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-4 inline-block">
            Design Philosophy
          </span>
          <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-warm leading-snug">
            “Design is not aesthetic ornamentation. It is{" "}
            <span className="text-lime">visual intelligence</span> made visible—translating ambitious ideas into commanding, enduring cultural presence.”
          </p>
          <div className="mt-8 flex justify-center items-center space-x-6 text-xs font-mono text-muted">
            <span>CLARITY OVER NOISE</span>
            <span>✦</span>
            <span>STRUCTURE OVER NOVELTY</span>
            <span>✦</span>
            <span>AUTHENTIC STORYTELLING</span>
          </div>
        </div>
      </section>

      {/* SECTION C — SELECTED WORK */}
      <section className="py-24 px-6 sm:px-8 border-b border-graphite">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
                Portfolio Showcase
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-warm tracking-tight">
                Selected Works
              </h2>
              <p className="mt-2 text-sm md:text-base text-muted max-w-xl">
                A curated survey of brand identity systems, high-density outdoor campaigns, and tactical social media narratives.
              </p>
            </div>

            <Link
              href="/work"
              className="group inline-flex items-center space-x-2 text-xs font-heading font-bold uppercase tracking-wider text-lime hover:text-warm transition-colors"
              data-cursor="ALL WORKS"
            >
              <span>View All Projects ({projectsData.length})</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Varied Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={idx === 0}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="inline-flex items-center space-x-2 rounded-full border border-graphite bg-charcoal px-8 py-4 text-xs font-heading font-bold uppercase tracking-wider text-warm hover:border-lime hover:text-lime transition-all"
            >
              <span>Explore Complete Gallery</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION D — CREATIVE MARQUEE */}
      <Marquee />

      {/* SECTION E & F — SERVICES & ABOUT PREVIEWS */}
      <section className="py-24 px-6 sm:px-8 border-b border-graphite bg-charcoal/20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Services Column */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
              Capabilities
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-warm tracking-tight mb-8">
              Core Creative Disciplines
            </h2>

            <div className="space-y-4">
              {servicesData.slice(0, 4).map((service, idx) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-graphite bg-charcoal/60 p-6 transition-all duration-200 hover:border-lime/60 hover:bg-charcoal"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-lime font-bold">0{idx + 1} //</span>
                      <h3 className="font-heading text-xl font-bold text-warm mt-1">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="shrink-0 rounded-full border border-graphite p-2 text-muted hover:border-lime hover:text-lime hover:bg-elevated transition-colors"
                      title={`Inquire about ${service.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/services"
                className="inline-flex items-center space-x-2 text-xs font-heading font-bold uppercase tracking-wider text-lime hover:underline"
              >
                <span>Read Detailed Deliverables & Processes →</span>
              </Link>
            </div>
          </div>

          {/* About Column */}
          <div className="lg:col-span-5 rounded-2xl border border-graphite bg-charcoal/80 p-8">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
              About Jaki
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-warm tracking-tight mb-4">
              Where Graphic Design Meets Software Engineering
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              I am currently pursuing a BSc in Software Engineering at Daffodil International University. Rather than treating code and design as separate worlds, I use technical frameworks to bring systematic rigor, precision, and structural balance to branding and editorial craft.
            </p>
            <p className="text-sm text-muted leading-relaxed mb-6">
              My client collaborations span reputable developers like Fides Properties, cultural apparel brands like Dacca Retro, youth tech carnivals, and university initiatives across Bangladesh.
            </p>

            <div className="space-y-3 border-t border-graphite pt-6 mb-8">
              <div className="flex items-center space-x-2 text-xs font-mono text-warm">
                <CheckCircle2 className="h-4 w-4 text-lime" />
                <span>Bilingual Wordmarks (English & Bangla)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-warm">
                <CheckCircle2 className="h-4 w-4 text-lime" />
                <span>Large-Scale Highway Billboards & Prepress</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-warm">
                <CheckCircle2 className="h-4 w-4 text-lime" />
                <span>High-Engagement Social Media Campaigns</span>
              </div>
            </div>

            <Link
              href="/about"
              className="block w-full text-center rounded-xl border border-graphite bg-elevated py-3 text-xs font-heading font-bold uppercase tracking-wider text-warm hover:border-lime/60 hover:text-lime transition-all"
            >
              Explore Full Biography & Skills
            </Link>
          </div>
        </div>
      </section>

      {/* THE CREATIVE PLAYGROUND — MINI-GAME & PALETTE LAB */}
      <section className="py-24 px-6 sm:px-8 border-b border-graphite bg-obsidian relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 inline-block font-bold">
              Interactive Lab
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-warm tracking-tight">
              The Creative Playground
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted">
              “Design is more than what you see. It’s what you notice.”
            </p>
          </div>

          {/* Color Match Game Component */}
          <div className="mb-14">
            <ColorMatchGame />
          </div>

          {/* Palette Specimen Lab */}
          <PalettePlayground />
        </div>
      </section>

      {/* SECTION G — SELECTED CLIENTS & COLLABORATIONS */}
      <section className="py-24 px-6 sm:px-8 border-b border-graphite bg-charcoal/30">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 inline-block">
            Collaborations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-warm tracking-tight">
            Selected Clients & Collaborations
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted max-w-2xl mx-auto">
            A selection of brands, organizations and teams I&apos;ve had the opportunity to work with.
          </p>

          {/* Real Logos Grid */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {clientsData.map((client) => {
              const content = (
                <div className="group relative flex flex-col items-center justify-center rounded-xl border border-graphite bg-charcoal/80 p-6 md:p-8 transition-all duration-300 hover:border-lime/60 hover:bg-elevated hover:shadow-lg">
                  <div className="relative h-14 w-full flex items-center justify-center">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-4 font-heading text-xs md:text-sm font-bold text-warm/90 group-hover:text-lime transition-colors">
                    {client.name}
                  </span>
                  <span className="mt-1 text-[11px] font-mono text-muted text-center line-clamp-1">
                    {client.relationship}
                  </span>
                </div>
              );

              return client.url ? (
                <a
                  key={client.id}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus-visible:ring-2 focus-visible:ring-lime rounded-xl"
                  data-cursor="VISIT"
                >
                  {content}
                </a>
              ) : (
                <div key={client.id}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION H — FINAL CTA */}
      <section className="relative py-28 md:py-36 px-6 sm:px-8 overflow-hidden bg-gradient-to-b from-obsidian to-charcoal">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full bg-lime/10 blur-[180px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-3 inline-block">
            Start a Conversation
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm tracking-tight leading-tight">
            Have an idea worth <br className="hidden sm:inline" />
            <span className="text-lime">making real?</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Whether you need a distinctive brand identity, high-visibility outdoor marketing campaigns, or cohesive digital collateral, let&apos;s build work that stands apart.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/contact"
                className="group inline-flex items-center space-x-2.5 rounded-full bg-lime px-8 py-4 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-[0_0_35px_rgba(215,255,100,0.35)] transition-all hover:bg-lime-hover hover:scale-105"
                data-cursor="LET'S TALK"
              >
                <span>Initiate a Project</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MagneticButton>

            <a
              href="mailto:jakitahsin@gmail.com"
              className="inline-flex items-center space-x-2 rounded-full border border-graphite bg-elevated px-6 py-4 text-xs font-heading font-semibold uppercase tracking-wider text-warm hover:border-lime/60 hover:text-lime transition-all"
              data-cursor="EMAIL"
            >
              <span>jakitahsin@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
