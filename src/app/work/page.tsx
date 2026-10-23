"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Filter, Layers, Search, X, LayoutGrid, List, Sparkles } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category match
      const matchesCat =
        selectedCat === "All Works" || project.cats.includes(selectedCat);

      if (!matchesCat) return false;

      // Search match
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = project.title.toLowerCase().includes(q);
      const inClient = project.client.toLowerCase().includes(q);
      const inRole = project.role.toLowerCase().includes(q);
      const inDesc = project.desc.toLowerCase().includes(q);
      const inTags = project.tags?.some((t) => t.toLowerCase().includes(q));
      const inDeliverables = project.deliverables?.some((d) =>
        d.toLowerCase().includes(q)
      );

      return inTitle || inClient || inRole || inDesc || inTags || inDeliverables;
    });
  }, [selectedCat, searchQuery]);

  const hasActiveFilters = selectedCat !== "All Works" || searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedCat("All Works");
    setSearchQuery("");
  };

  return (
    <div className="pt-28 pb-24 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 pb-8 border-b border-graphite/60">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
              Portfolio Archive · {projectsData.length} Selected Case Studies
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm tracking-tight">
              Selected Works
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              A comprehensive survey of brand identities, large-format outdoor environments, high-conversion social collateral, and tactile editorial publications.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-graphite/40">
            <div className="rounded-xl border border-graphite bg-charcoal/40 p-3 sm:p-4 text-center">
              <span className="block font-heading text-xl sm:text-2xl font-black text-lime">
                {projectsData.length}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted uppercase tracking-wider">
                Projects
              </span>
            </div>
            <div className="rounded-xl border border-graphite bg-charcoal/40 p-3 sm:p-4 text-center">
              <span className="block font-heading text-xl sm:text-2xl font-black text-warm">
                100%
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted uppercase tracking-wider">
                Bespoke
              </span>
            </div>
            <div className="rounded-xl border border-graphite bg-charcoal/40 p-3 sm:p-4 text-center">
              <span className="block font-heading text-xl sm:text-2xl font-black text-warm">
                {CATEGORIES.length - 1}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted uppercase tracking-wider">
                Disciplines
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Controls Bar: Search + Filter Tabs + View Mode Toggle */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, client, or category..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-graphite bg-charcoal/70 text-xs text-warm placeholder-muted/60 focus:outline-none focus:border-lime/70 focus:ring-1 focus:ring-lime transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-warm p-1"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Layout Toggle (Grid vs List) */}
            <div className="flex items-center justify-between md:justify-end space-x-3 shrink-0">
              <span className="text-xs font-mono text-muted">
                Showing {filteredProjects.length} of {projectsData.length}
              </span>

              <div className="inline-flex rounded-lg border border-graphite bg-charcoal/80 p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
                    viewMode === "grid"
                      ? "bg-lime text-obsidian font-bold shadow-sm"
                      : "text-muted hover:text-warm"
                  }`}
                  title="Compact 3-Column Grid View"
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="text-[11px] hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-all ${
                    viewMode === "list"
                      ? "bg-lime text-obsidian font-bold shadow-sm"
                      : "text-muted hover:text-warm"
                  }`}
                  title="Compact Horizontal List View"
                  aria-label="List view"
                >
                  <List className="h-3.5 w-3.5" />
                  <span className="text-[11px] hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
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
                  className={`rounded-full px-3.5 py-1.5 text-xs font-heading font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-lime text-obsidian font-bold shadow-[0_0_15px_rgba(215,255,100,0.25)]"
                      : "border border-graphite bg-charcoal/70 text-muted hover:border-lime/40 hover:text-warm"
                  }`}
                  data-cursor={category.toUpperCase()}
                >
                  <span>{category}</span>
                  <span
                    className={`ml-1.5 text-[10px] font-mono ${
                      isSelected ? "text-obsidian/80 font-bold" : "text-muted"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center space-x-1 rounded-full border border-dashed border-muted/50 px-3 py-1.5 text-xs font-mono text-muted hover:text-lime hover:border-lime transition-colors"
                title="Reset all active filters"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Content (Compact 3-column Grid or List) */}
        {filteredProjects.length > 0 ? (
          viewMode === "grid" ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
                  >
                    <ProjectCard project={project} layout="grid" featured={false} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div layout className="flex flex-col space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.15) }}
                  >
                    <ProjectCard project={project} layout="list" featured={false} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )
        ) : (
          /* Empty State */
          <div className="text-center py-20 border border-dashed border-graphite rounded-2xl bg-charcoal/30">
            <Layers className="w-10 h-10 text-muted mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-warm">
              No matching projects found
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1 max-w-sm mx-auto">
              No results found for &ldquo;{searchQuery || selectedCat}&rdquo;. Try another discipline or clear your search term.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 rounded-full bg-lime text-obsidian text-xs font-heading font-bold shadow-md hover:bg-lime-hover transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
