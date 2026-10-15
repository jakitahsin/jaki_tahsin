"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Send, CheckCircle2, AlertCircle, ArrowUpRight, ExternalLink, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service or project category"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Please describe your project in at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const SERVICE_OPTIONS = [
  "Brand Identity Design",
  "Campaign & Social Media Design",
  "Print & Editorial Design",
  "Presentation & Pitch Deck Design",
  "Event Visual Identity",
  "Other / Retainer Inquiry",
];

const BUDGET_OPTIONS = [
  "Flexible / To be scoped",
  "$500 – $1,500 (Small Campaign / Wordmark)",
  "$1,500 – $3,500 (Complete Brand Identity)",
  "$3,500+ (Comprehensive Multi-Discipline Package)",
];

const TIMELINE_OPTIONS = [
  "Immediate (Next 1–2 weeks)",
  "Upcoming Month",
  "Next Quarter",
  "Flexible",
];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: preselectedService || "Brand Identity Design",
      budget: "Flexible / To be scoped",
      timeline: "Upcoming Month",
      message: "",
    },
  });

  useEffect(() => {
    if (preselectedService && SERVICE_OPTIONS.includes(preselectedService)) {
      setValue("service", preselectedService);
    }
  }, [preselectedService, setValue]);

  const watchedValues = watch();

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(
      `Project Inquiry: ${watchedValues.service || "Design"} — ${watchedValues.name || "New Client"}`
    );
    const body = encodeURIComponent(
      `Hi Jaki,\n\nName: ${watchedValues.name}\nEmail: ${watchedValues.email}\nCompany: ${watchedValues.company || "N/A"}\nProject Category: ${watchedValues.service}\nBudget: ${watchedValues.budget}\nTimeline: ${watchedValues.timeline}\n\nProject Brief:\n${watchedValues.message}\n`
    );
    return `mailto:jakitahsin@gmail.com?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resJson = await response.json();

      if (response.ok && resJson.success) {
        setStatus("success");
        setSubmittedData(data);
        setFeedbackMessage(resJson.message);
      } else {
        setStatus("error");
        setFeedbackMessage(resJson.message || "Something went wrong while submitting. Please try the mailto fallback below.");
      }
    } catch (err) {
      setStatus("error");
      setFeedbackMessage("Network connection error. You can still reach me directly via email.");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-lime mb-2 block">
                Get In Touch
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-warm tracking-tight">
                Let&apos;s build something memorable.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
                Whether you have an upcoming project brief, require a dedicated design partner, or would like to explore creative possibilities, I&apos;d love to hear from you.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-xl border border-graphite bg-charcoal/70 p-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-lime block">
                Direct Electronic Mail
              </span>
              <a
                href="mailto:jakitahsin@gmail.com"
                className="font-heading text-lg font-bold text-warm hover:text-lime transition-colors inline-flex items-center space-x-2"
                data-cursor="COPY"
              >
                <Mail className="h-5 w-5 text-lime" />
                <span>jakitahsin@gmail.com</span>
              </a>
              <p className="text-xs text-muted">
                Usually replied to within 24–48 hours on business days.
              </p>
            </div>

            {/* Verified Platforms */}
            <div className="rounded-xl border border-graphite bg-charcoal/50 p-6">
              <span className="text-xs font-mono uppercase tracking-widest text-warm mb-3 block font-bold">
                Online Profiles & Portfolios
              </span>
              <ul className="space-y-3 text-xs font-heading uppercase tracking-wider">
                <li>
                  <a
                    href="https://www.behance.net/gallery/249108595/My-Project-Showcase"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-muted hover:text-lime transition-colors"
                  >
                    <span>Behance Project Showcase</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/jakitahsin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-muted hover:text-lime transition-colors"
                  >
                    <span>LinkedIn Network</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Privacy & Studio Commitment */}
            <div className="flex items-start space-x-3 text-xs text-muted rounded-xl border border-graphite/40 bg-elevated/40 p-4">
              <ShieldCheck className="h-5 w-5 text-lime shrink-0 mt-0.5" />
              <p>
                <strong className="text-warm">Privacy Commitment:</strong> Information shared in this inquiry is treated with strict professional confidentiality and used exclusively to assess and respond to your project brief.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl border border-graphite bg-charcoal p-8 sm:p-10 shadow-xl">
            <h2 className="font-heading text-2xl font-bold text-warm mb-6">
              Project Inquiry Brief
            </h2>

            {status === "success" ? (
              <div className="space-y-6 text-center py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime/10 text-lime border border-lime/30">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-warm">
                    Inquiry Received!
                  </h3>
                  <p className="mt-2 text-sm text-muted max-w-md mx-auto">
                    {feedbackMessage || "Thank you for reaching out. Your project specifications have been noted."}
                  </p>
                </div>

                {/* Instant fallback mail client option */}
                <div className="p-4 rounded-xl border border-graphite bg-elevated text-left">
                  <p className="text-xs text-muted mb-3">
                    Want to ensure direct notification in Jaki&apos;s primary inbox? You can also open this message directly in your preferred email client:
                  </p>
                  <a
                    href={generateMailtoLink()}
                    className="inline-flex items-center justify-center space-x-2 w-full py-3 rounded-lg bg-lime text-obsidian text-xs font-heading font-bold uppercase tracking-wider hover:bg-lime-hover transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Pre-filled Email App</span>
                  </a>
                </div>

                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs font-mono text-lime underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                      Your Name <span className="text-lime">*</span>
                    </label>
                    <input
                      {...register("name")}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-lg border border-graphite bg-elevated px-4 py-3 text-sm text-warm placeholder-muted/60 focus:border-lime focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                      Your Email <span className="text-lime">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="alex@company.com"
                      className="w-full rounded-lg border border-graphite bg-elevated px-4 py-3 text-sm text-warm placeholder-muted/60 focus:border-lime focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Company & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                      Company / Brand (Optional)
                    </label>
                    <input
                      {...register("company")}
                      placeholder="e.g. Studio Vertex"
                      className="w-full rounded-lg border border-graphite bg-elevated px-4 py-3 text-sm text-warm placeholder-muted/60 focus:border-lime focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                      Primary Service <span className="text-lime">*</span>
                    </label>
                    <select
                      {...register("service")}
                      className="w-full rounded-lg border border-graphite bg-elevated px-4 py-3 text-sm text-warm focus:border-lime focus:outline-none transition-colors cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-charcoal text-warm">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-xs text-red-400">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                      Approximate Budget (USD/BDT)
                    </label>
                    <select
                      {...register("budget")}
                      className="w-full rounded-lg border border-graphite bg-elevated px-4 py-3 text-sm text-warm focus:border-lime focus:outline-none transition-colors cursor-pointer"
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-charcoal text-warm">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                      Desired Timeline
                    </label>
                    <select
                      {...register("timeline")}
                      className="w-full rounded-lg border border-graphite bg-elevated px-4 py-3 text-sm text-warm focus:border-lime focus:outline-none transition-colors cursor-pointer"
                    >
                      {TIMELINE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-charcoal text-warm">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                    Project Description & Goals <span className="text-lime">*</span>
                  </label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Briefly describe what you are looking to create, your target audience, or any specific deliverables needed..."
                    className="w-full rounded-lg border border-graphite bg-elevated px-4 py-3 text-sm text-warm placeholder-muted/60 focus:border-lime focus:outline-none transition-colors"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Error Banner if any */}
                {status === "error" && (
                  <div className="flex items-center space-x-2 text-xs text-red-400 bg-red-950/40 border border-red-800 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex-1 rounded-xl bg-lime py-3.5 px-6 text-center text-xs font-heading font-bold uppercase tracking-wider text-obsidian shadow-lg hover:bg-lime-hover disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>{status === "submitting" ? "Validating Brief..." : "Submit Inquiry Brief"}</span>
                    <Send className="h-4 w-4" />
                  </button>

                  <a
                    href={generateMailtoLink()}
                    className="rounded-xl border border-graphite bg-elevated py-3.5 px-6 text-center text-xs font-heading font-semibold uppercase tracking-wider text-warm hover:border-lime hover:text-lime transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Open in Email App</span>
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 text-center text-xs font-mono text-muted">
          Loading contact experience...
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
