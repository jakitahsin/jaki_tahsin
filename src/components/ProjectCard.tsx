"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  layout?: "grid" | "list";
  featured?: boolean;
}

export function ProjectCard({
  project,
  layout = "grid",
  featured = false,
}: ProjectCardProps) {
  if (layout === "list") {
    return (
      <Link
        href={`/work/${project.slug}`}
        className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-graphite bg-charcoal/60 transition-all duration-300 hover:border-lime/60 hover:bg-charcoal hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] focus-visible:ring-2 focus-visible:ring-lime"
        data-cursor="VIEW"
      >
        <div className="flex items-center space-x-4 min-w-0">
          {/* Thumbnail */}
          <div className="relative w-24 sm:w-32 aspect-[16/10] shrink-0 overflow-hidden rounded-lg bg-obsidian border border-graphite/60">
            {project.cover ? (
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="130px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-elevated text-[9px] font-mono text-muted">
                PREVIEW
              </div>
            )}
          </div>

          {/* Meta text */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-muted">
              <span className="text-lime font-bold">{project.client}</span>
              <span>·</span>
              <span>{project.role}</span>
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-warm transition-colors group-hover:text-lime truncate mt-0.5">
              {project.title}
            </h3>
            <p className="text-xs text-muted/80 line-clamp-1 mt-1 max-w-xl">
              {project.desc}
            </p>
          </div>
        </div>

        {/* Right side tags & arrow */}
        <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-graphite/40">
          <div className="flex items-center space-x-2">
            <span className="rounded-md border border-graphite bg-obsidian/80 px-2 py-0.5 text-[10px] font-mono text-lime">
              {project.cats[0]}
            </span>
            {project.year && (
              <span className="text-[10px] font-mono text-muted">
                {project.year}
              </span>
            )}
          </div>

          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-graphite bg-obsidian/80 text-warm transition-all duration-300 group-hover:bg-lime group-hover:text-obsidian group-hover:scale-110">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    );
  }

  // Grid layout (compact, refined, proportional)
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-graphite/90 bg-charcoal/80 transition-all duration-300 hover:border-lime/70 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.55)] focus-visible:ring-2 focus-visible:ring-lime ${
        featured ? "md:col-span-2" : "col-span-1"
      }`}
      data-cursor="VIEW"
    >
      {/* Artwork Container */}
      <div
        className={`relative w-full overflow-hidden bg-obsidian ${
          featured ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            priority={featured}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-elevated text-xs font-mono tracking-widest text-muted">
            ARTWORK PREVIEW
          </div>
        )}

        {/* Ambient Dark Gradient on Artwork Base */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category & Year Badge Overlay */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 z-10">
          <span className="rounded-md border border-white/10 bg-obsidian/85 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-lime backdrop-blur-md">
            {project.cats[0]}
          </span>
          {project.year && (
            <span className="rounded-md border border-white/10 bg-obsidian/85 px-2 py-0.5 text-[10px] font-mono text-muted backdrop-blur-md">
              {project.year}
            </span>
          )}
        </div>

        {/* Top Right Arrow Indicator */}
        <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-obsidian/85 text-warm backdrop-blur-md transition-all duration-300 group-hover:bg-lime group-hover:text-obsidian group-hover:scale-110 z-10">
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Interactive Hover Pill in Center-Bottom */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-3 py-1 rounded-full bg-obsidian/90 backdrop-blur-md border border-lime/40 text-lime text-[11px] font-mono font-medium flex items-center space-x-1 shadow-lg z-10 whitespace-nowrap">
          <span>View Project</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>

      {/* Project Meta Information */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-1 flex items-center justify-between">
            <span className="text-lime/90 font-medium truncate max-w-[200px]">
              {project.client}
            </span>
            <span className="text-[9px] text-muted/60 hidden sm:inline">
              {project.role.split("&")[0].trim()}
            </span>
          </div>

          <h3 className="font-heading text-base sm:text-lg font-bold text-warm transition-colors group-hover:text-lime line-clamp-1">
            {project.title}
          </h3>

          <p className="mt-1.5 text-xs text-muted/80 leading-relaxed line-clamp-2">
            {project.desc}
          </p>
        </div>

        {/* Deliverables snippet */}
        {project.deliverables && project.deliverables.length > 0 && (
          <div className="mt-3 pt-3 border-t border-graphite/60 flex flex-wrap gap-1">
            {project.deliverables.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className="text-[9px] font-mono text-muted/80 bg-elevated/80 px-2 py-0.5 rounded border border-graphite/40 truncate max-w-[160px]"
              >
                {item}
              </span>
            ))}
            {project.deliverables.length > 2 && (
              <span className="text-[9px] font-mono text-muted/60 px-1 py-0.5">
                +{project.deliverables.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
