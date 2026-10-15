"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Filter, Layers } from "lucide-react";

const CATEGORIES = [
  "All Works",
  "Brand Identity",
  "Print Design",
  "Posters & Campaigns",
  "Social Media Design",
  "Event Branding",
  "Presentation & Pitch Decks",
];

export default function WorkGalleryPage() {
  const [selectedCat, setSelectedCat] = useState("All Works");

  const filteredProjects = useMemo(() => {
    if (selectedCat === "All Works") return projectsData;
    return projectsData.filter((p) => p.cats.includes(selectedCat));
  }, [selectedCat]);

  return (
    <div className="pt-32 pb-24 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
            Portfolio Archive
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm tracking-tight">
            Selected Works
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
            An extensive index of identity systems, large-scale commercial billboards, editorial publications, and high-impact digital campaigns crafted for forward-thinking clients.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 border-b border-graphite pb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-muted uppercase tracking-wider mb-3">
            <Filter className="w-3.5 h-3.5 text-lime" />
            <span>Filter By Discipline:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCat === category;
              const count =
                category === "All Works"
                  ? projectsData.length
                  : projectsData.filter((p) => p.cats.includes(category)).length;

              if (count === 0) return null;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCat(category)}
                  className={`rounded-full px-4 py-2 text-xs font-heading font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-lime text-obsidian shadow-[0_0_15px_rgba(215,255,100,0.25)]"
                      : "border border-graphite bg-charcoal/70 text-muted hover:border-lime/40 hover:text-warm"
                  }`}
                  data-cursor={category.toUpperCase()}
                >
                  <span>{category}</span>
                  <span className={`ml-1.5 text-[10px] font-mono ${isSelected ? "text-obsidian/80" : "text-muted"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid with Framer Motion Animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard project={project} featured={false} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-graphite rounded-xl">
            <Layers className="w-10 h-10 text-muted mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-warm">No projects found in this category</h3>
            <p className="text-sm text-muted mt-1">Try selecting another discipline above or reset to All Works.</p>
            <button
              onClick={() => setSelectedCat("All Works")}
              className="mt-4 px-4 py-2 rounded-full bg-lime text-obsidian text-xs font-heading font-bold"
            >
              Reset to All Works
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
