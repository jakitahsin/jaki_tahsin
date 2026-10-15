import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { ArrowUpRight, Check, Layers, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Deliverables — Jaki Tahsin",
  description:
    "Explore the visual communication and graphic design services offered by Jaki Tahsin: brand identity systems, large-format print, social media campaigns, pitch decks, and event identity.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 px-6 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
            Capabilities & Deliverables
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm tracking-tight">
            Strategic design disciplines.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
            I partner with international clients, startups, creative agencies, and event organizers to produce memorable visual experiences engineered with typographic mastery and production precision.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {servicesData.map((service, idx) => (
            <article
              key={service.id}
              id={service.slug}
              className="rounded-2xl border border-graphite bg-charcoal/50 p-8 sm:p-12 transition-all hover:border-lime/60"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-graphite">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-lime block font-bold">
                    Discipline 0{idx + 1}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-warm mt-1">
                    {service.title}
                  </h2>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="self-start md:self-auto inline-flex items-center space-x-2 rounded-full bg-lime px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-md hover:bg-lime-hover transition-colors"
                  data-cursor="INQUIRE"
                >
                  <span>Inquire for This Service</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Full Description */}
              <div className="mt-8 mb-10 max-w-3xl">
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {service.fullDesc}
                </p>
              </div>

              {/* Grid: Deliverables & Suited For */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-graphite">
                {/* Deliverables Column */}
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-warm mb-4 flex items-center space-x-2">
                    <span className="text-lime">✦</span>
                    <span>Typical Deliverables</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-muted">
                        <Check className="h-4 w-4 text-lime shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal Briefs / Client Fit */}
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-warm mb-4 flex items-center space-x-2">
                    <span className="text-lime">✦</span>
                    <span>Best Suited For</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {service.suitedFor.map((item, sIdx) => (
                      <li key={sIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Process Stages if available */}
              {service.process && service.process.length > 0 && (
                <div className="mt-10 pt-8 border-t border-graphite">
                  <h3 className="font-heading text-xs font-mono uppercase tracking-widest text-lime mb-4">
                    Execution Workflow
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {service.process.map((step, pIdx) => (
                      <div key={pIdx} className="rounded-xl border border-graphite/70 bg-elevated/40 p-4">
                        <span className="text-[11px] font-mono text-lime font-bold block mb-1">
                          {step.step}
                        </span>
                        <h4 className="font-heading text-xs font-bold text-warm mb-1">
                          {step.title}
                        </h4>
                        <p className="text-[11px] text-muted leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* General Inquiry CTA */}
        <div className="mt-20 rounded-2xl border border-graphite bg-charcoal/80 p-8 sm:p-12 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-warm">
            Need a custom scope or ongoing retainer?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-muted max-w-lg mx-auto">
            If your project crosses multiple disciplines—such as an event needing both branding and stage graphics—let&apos;s build a tailored collaboration package.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-full bg-lime px-8 py-3.5 text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-lg hover:bg-lime-hover transition-all"
            >
              <span>Discuss a Custom Brief</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
