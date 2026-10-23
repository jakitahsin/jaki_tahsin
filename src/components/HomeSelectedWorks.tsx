"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, LayoutGrid, List, Sparkles } from "lucide-react";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

const FILTER_TABS = [
  { id: "featured", label: "Featured" },
  { id: "brand", label: "Brand Identity", cat: "Brand Identity" },
  { id: "event", label: "Event Branding", cat: "Event Branding" },
  { id: "print", label: "Print Design", cat: "Print Design" },
  { id: "all", label: "All Works" },
];

export function HomeSelectedWorks() {
  const [activeTab, setActiveTab] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = useMemo(() => {
    if (activeTab === "featured") {
      return projectsData.filter((p) => p.featured).slice(0, 6);
    }
    if (activeTab === "all") {
      return projectsData.slice(0, 6);
    }
    const tab = FILTER_TABS.find((t) => t.id === activeTab);
    if (!tab?.cat) return projectsData.slice(0, 6);
    return projectsData.filter((p) => p.cats.includes(tab.cat)).slice(0, 6);
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Controls Bar: Interactive Category Filter Tabs + View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-graphite/60">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative rounded-full px-3.5 py-1.5 text-xs font-heading font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-lime text-obsidian shadow-[0_0_16px_rgba(215,255,100,0.3)] font-bold"
                    : "border border-graphite bg-charcoal/70 text-muted hover:border-lime/40 hover:text-warm"
                }`}
                data-cursor={tab.label.toUpperCase()}
              >
                <span className="flex items-center space-x-1.5">
                  {tab.id === "featured" && (
                    <Sparkles className={`w-3 h-3 ${isActive ? "text-obsidian" : "text-lime"}`} />
                  )}
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Switcher (Grid / List) */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[11px] font-mono text-muted mr-1 hidden sm:inline">
            Display:
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
              <span className="text-[11px]">Grid</span>
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
              <span className="text-[11px]">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Container (Compact 3-column Grid or List) */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key={`grid-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                layout="grid"
                featured={false}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`list-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col space-y-3"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                layout="list"
                featured={false}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Footer Indicator & Navigation */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-graphite/60">
        <div className="text-xs font-mono text-muted flex items-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
          <span>
            Displaying {filteredProjects.length} of {projectsData.length} indexed case studies
          </span>
        </div>

        <Link
          href="/work"
          className="group inline-flex items-center space-x-2 rounded-full border border-graphite bg-charcoal/90 px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider text-warm hover:border-lime hover:text-lime transition-all"
          data-cursor="ALL WORKS"
        >
          <span>Explore Complete Archive ({projectsData.length})</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
