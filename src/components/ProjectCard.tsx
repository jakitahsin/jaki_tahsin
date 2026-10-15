"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-graphite bg-charcoal/80 transition-all duration-300 hover:border-lime/70 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] focus-visible:ring-2 focus-visible:ring-lime ${
        featured ? "md:col-span-2" : "col-span-1"
      }`}
      data-cursor="VIEW"
    >
      {/* Artwork Container */}
      <div className={`relative w-full overflow-hidden bg-obsidian ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            priority={featured}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-elevated text-xs font-mono tracking-widest text-muted">
            ARTWORK PREVIEW COMING SOON
          </div>
        )}

        {/* Ambient Dark Gradient on Artwork Base */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Year & Category Badge Overlay */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className="rounded-md border border-graphite/80 bg-obsidian/80 px-2.5 py-1 text-[11px] font-mono font-medium uppercase tracking-wider text-lime backdrop-blur-md">
            {project.cats[0]}
          </span>
          {project.year && (
            <span className="rounded-md border border-graphite/80 bg-obsidian/80 px-2 py-1 text-[11px] font-mono text-muted backdrop-blur-md">
              {project.year}
            </span>
          )}
        </div>

        {/* Top Right Arrow Indicator */}
        <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-graphite bg-obsidian/80 text-warm backdrop-blur-md transition-all duration-300 group-hover:bg-lime group-hover:text-obsidian group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Project Meta Information */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-1.5">
            {project.client} · {project.role}
          </div>
          <h3 className="font-heading text-lg md:text-xl font-bold text-warm transition-colors group-hover:text-lime">
            {project.title}
          </h3>
          <p className="mt-2 text-xs md:text-sm text-muted leading-relaxed line-clamp-2">
            {project.desc}
          </p>
        </div>

        {/* Deliverables snippet */}
        {project.deliverables && project.deliverables.length > 0 && (
          <div className="mt-4 pt-4 border-t border-graphite/60 flex flex-wrap gap-1.5">
            {project.deliverables.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono text-muted/80 bg-elevated px-2 py-0.5 rounded border border-graphite/40"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
