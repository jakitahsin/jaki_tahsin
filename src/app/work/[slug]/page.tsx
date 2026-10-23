import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Share2, Layers } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.desc,
    openGraph: {
      title: `${project.title} — Jaki Tahsin Portfolio`,
      description: project.desc,
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject =
    projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  if (slug === "1st-pet-carnival") {
    return (
      <div className="fixed inset-0 z-40 bg-[#FFF7E8] w-full h-full overflow-hidden">
        <iframe
          src="/work/1st-pet-carnival/index.html"
          className="w-full h-full border-0"
          title="1st Pet Carnival — Brand Identity Case Study"
        />
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 px-6 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/work"
            className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-lime transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Works</span>
          </Link>
        </div>

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.cats.map((cat) => (
              <span
                key={cat}
                className="rounded-md border border-lime/40 bg-lime/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-lime"
              >
                {cat}
              </span>
            ))}
            {project.year && (
              <span className="rounded-md border border-graphite bg-charcoal px-3 py-1 text-xs font-mono text-muted">
                {project.year}
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-warm tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">
            {project.desc}
          </p>
        </header>

        {/* Project Metadata Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl border border-graphite bg-charcoal/80 mb-14">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-lime">Client</span>
            <span className="font-heading text-sm md:text-base font-bold text-warm mt-1 block">
              {project.client}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-lime">My Role</span>
            <span className="font-heading text-sm md:text-base font-bold text-warm mt-1 block">
              {project.role}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-lime">Period</span>
            <span className="font-heading text-sm md:text-base font-bold text-warm mt-1 block">
              {project.year || "Recent"}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-lime">Discipline</span>
            <span className="font-heading text-sm md:text-base font-bold text-warm mt-1 block">
              {project.services}
            </span>
          </div>
        </div>

        {/* Hero Artwork Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-graphite bg-elevated shadow-2xl mb-16">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />
        </div>

        {/* Editorial Body: Challenge & Creative Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-16 border-b border-graphite mb-16">
          <div className="rounded-xl border border-graphite bg-charcoal/40 p-8">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
              01 // The Problem Space
            </span>
            <h2 className="font-heading text-2xl font-bold text-warm mb-4">
              The Creative Challenge
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              {project.challenge || "Balancing distinct brand personality with clear readability across digital and physical execution channels."}
            </p>
          </div>

          <div className="rounded-xl border border-graphite bg-charcoal/40 p-8">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
              02 // The Solution
            </span>
            <h2 className="font-heading text-2xl font-bold text-warm mb-4">
              Design & Typographic Approach
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              {project.approach || "A deliberate typographic and structural layout process engineered to communicate authority and purpose."}
            </p>
          </div>
        </div>

        {/* Deliverables Breakdown */}
        {project.deliverables && project.deliverables.length > 0 && (
          <section className="mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
              03 // Deliverables
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-warm mb-6">
              Production Scope & Outputs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 rounded-lg border border-graphite bg-charcoal/60 p-4"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime/10 text-lime border border-lime/30">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-warm">{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Gallery Items if Available */}
        {project.gallery && project.gallery.length > 1 && (
          <section className="mb-16 space-y-8">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
              04 // Visual Applications
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-warm mb-6">
              Selected Gallery Artifacts
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {project.gallery.slice(1).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-graphite bg-elevated"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} - application ${i + 2}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next / Previous Project Navigation */}
        <nav
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-graphite mb-16"
          aria-label="Project pagination"
        >
          <Link
            href={`/work/${prevProject.slug}`}
            className="group flex flex-col p-6 rounded-xl border border-graphite bg-charcoal/60 hover:border-lime/60 transition-all text-left"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted flex items-center space-x-1.5 mb-2">
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1 text-lime" />
              <span>Previous Project</span>
            </span>
            <span className="font-heading text-lg font-bold text-warm group-hover:text-lime transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col p-6 rounded-xl border border-graphite bg-charcoal/60 hover:border-lime/60 transition-all text-left sm:text-right"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted flex items-center justify-start sm:justify-end space-x-1.5 mb-2">
              <span>Next Project</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 text-lime" />
            </span>
            <span className="font-heading text-lg font-bold text-warm group-hover:text-lime transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </nav>

        {/* Bottom CTA Card */}
        <div className="rounded-2xl border border-lime/40 bg-gradient-to-r from-charcoal to-obsidian p-8 sm:p-12 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-warm">
            Inspired by this design direction?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-muted max-w-lg mx-auto">
            Let&apos;s collaborate to craft an equally memorable visual identity or marketing campaign for your brand.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={`/contact?service=${encodeURIComponent(project.cats[0] || "Brand Identity")}`}
              className="rounded-full bg-lime px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-lg hover:bg-lime-hover transition-colors inline-flex items-center space-x-2"
            >
              <span>Inquire for Similar Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
