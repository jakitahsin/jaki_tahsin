import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Briefcase, Award, CheckCircle2, Code2, Sparkles, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "About Jaki Tahsin — Graphic Designer & Visual Communicator",
  description:
    "Learn about Jaki Tahsin, his design philosophy, experience with leading Bangladeshi brands, and his studies in Software Engineering at Daffodil International University.",
};

const EXPERIENCES = [
  {
    role: "Graphic Designer",
    company: "Dacca Retro",
    period: "2024–Present",
    description:
      "Crafted lifestyle campaign visuals, nostalgic apparel brand assets, and multi-channel social media creative direction celebrating Bangladeshi cultural heritage.",
  },
  {
    role: "Lead Visual & Marketing Designer",
    company: "Fides Properties",
    period: "2024–Present",
    description:
      "Art directed large-scale outdoor highway billboards for the Fides Nurjahan Tower, executive promotional print brochures, and event X-banners.",
  },
  {
    role: "Visual Identity Designer",
    company: "Eventizer",
    period: "2025–Present",
    description:
      "Conceptualized brand identity, user interface visual direction, and digital presentation materials for an modern event management platform.",
  },
  {
    role: "Creative Consultant & Brand Lead",
    company: "EcoEcho Bangladesh & Youth Initiatives",
    period: "2024–2026",
    description:
      "Designed brand identities, guidelines, and event collateral for environmental advocacy, science olympiads, and university cultural festivals.",
  },
];

const SKILL_GROUPS = [
  {
    title: "Brand Systems & Identity",
    skills: [
      "Logo & Wordmark Design",
      "Bilingual Typography (Bangla & English)",
      "Comprehensive Brand Guidelines",
      "Color Architecture & Contrast",
      "Vector Iconography Systems",
    ],
  },
  {
    title: "Print & Outdoor Production",
    skills: [
      "Large-Format Highway Billboards",
      "Exhibition & Event X-Banners",
      "Editorial Magazines & Tri-folds",
      "Prepress CMYK & Color Separation",
      "Executive Stationery & Packaging",
    ],
  },
  {
    title: "Software & Technical Toolkit",
    skills: [
      "Adobe Illustrator (Mastery)",
      "Adobe Photoshop (Mastery)",
      "Adobe InDesign",
      "Figma",
      "Git, HTML/CSS, Systematic UI Components",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
            Biography & Philosophy
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm tracking-tight">
            Design thinking, engineered for impact.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
            I am a graphic designer and visual communicator from Dhaka, Bangladesh, exploring the dynamic intersection between visual culture, precision typography, and digital engineering systems.
          </p>
        </div>

        {/* Editorial Split: Portrait & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 pb-16 border-b border-graphite">
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-2xl border border-graphite bg-charcoal p-3 shadow-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-elevated">
                <Image
                  src="/assets/portrait.webp"
                  alt="Jaki Tahsin portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="mt-3 p-2 text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-lime block font-bold">
                  BSc Software Engineering
                </span>
                <span className="text-xs text-muted">Daffodil International University</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-muted leading-relaxed">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-warm">
              The Intersection of Design & Code
            </h2>
            <p>
              Growing up in Dhaka, I developed an early fascination with visual culture—the energy of hand-painted rickshaw typography, the bold geometry of architectural facades, and the precision of modern Swiss grid systems.
            </p>
            <p>
              Pursuing a degree in <span className="text-warm font-medium">Software Engineering</span> at Daffodil International University gave me a deep appreciation for structural integrity, computational rules, and modular systems. While my heart and primary craft remain firmly rooted in graphic design, this technical foundation shapes how I build brands: not as isolated decorative graphics, but as robust, adaptable design systems that scale flawlessly across physical ink and digital screens.
            </p>
            <p>
              Whether engineering a bilingual Bangla-English wordmark that honors authentic linguistic curves or laying out a 60-foot outdoor billboard that commuters can read in two seconds, my priority is always <span className="text-lime font-medium">clarity, purpose, and unmistakable presence</span>.
            </p>
          </div>
        </div>

        {/* Professional Experience Timeline */}
        <section className="mb-20 pb-16 border-b border-graphite">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
            Career Track
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-warm mb-8">
            Experience & Client Roles
          </h2>

          <div className="space-y-6">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-graphite bg-charcoal/60 p-6 sm:p-8 transition-colors hover:border-lime/60"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-warm">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-lime font-bold">{exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-muted rounded-full border border-graphite bg-elevated px-3 py-1 self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Academic Rigor */}
        <section className="mb-20 pb-16 border-b border-graphite">
          <div className="rounded-2xl border border-graphite bg-charcoal/80 p-8 sm:p-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/10 text-lime border border-lime/30">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-lime">Education</span>
                <h3 className="font-heading text-xl font-bold text-warm">
                  Daffodil International University (DIU)
                </h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              <strong className="text-warm">Bachelor of Science in Software Engineering</strong>. 
              My curriculum reinforces algorithmic problem-solving, database logic, human-computer interaction, and object-oriented architectures. This dual fluency gives me a distinct edge when collaborating with digital agencies, engineering teams, and startup founders.
            </p>
          </div>
        </section>

        {/* Skills & Disciplines Matrix */}
        <section className="mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
            Toolbox & Methods
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-warm mb-8">
            Skills & Creative Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-graphite bg-charcoal/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-heading text-base font-bold text-warm mb-4 pb-2 border-b border-graphite">
                    {group.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center space-x-2 text-xs sm:text-sm text-muted">
                        <CheckCircle2 className="h-3.5 w-3.5 text-lime shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Contact Action */}
        <div className="rounded-2xl border border-lime/40 bg-gradient-to-r from-charcoal to-obsidian p-8 sm:p-12 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-warm">
            Looking for a designer who understands both craft and systems?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-muted max-w-lg mx-auto">
            I am currently considering select branding, packaging, and campaign identity inquiries for the upcoming quarter.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-full bg-lime px-8 py-3.5 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-lg hover:bg-lime-hover transition-all"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
