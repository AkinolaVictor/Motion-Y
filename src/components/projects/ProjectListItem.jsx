// ProjectListItem — editorial listing card for the projects page.
// Distinct from the home ProjectCard: thinner border, more text-forward, "Read case study →"
// CTA, status badge. Each item animates in on scroll.

import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { CATEGORIES } from "../../data/projects";
import Pill from "../primitives/Pill";

const STATUS_STYLES = {
  live:          { label: "Shipped",     dot: "bg-[var(--accent)]" },
  experimental:  { label: "Experimental", dot: "bg-amber-400" },
  "open-source": { label: "Open Source", dot: "bg-sky-400" },
};

function categoryLabels(project) {
  return project.categories
    .map((k) => CATEGORIES.find((c) => c.key === k)?.label)
    .filter(Boolean);
}

export default function ProjectListItem({ project, index }) {
  const cardRef = useRef(null);
  const status = STATUS_STYLES[project.status] ?? STATUS_STYLES["experimental"];
  const labels = categoryLabels(project);

  useEffect(() => {
    if (typeof window === "undefined" || !cardRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        autoAlpha: 0,
        y: 14,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 88%" },
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={cardRef}
      className="group relative grid grid-cols-1 w7:grid-cols-12 gap-6 w9:gap-8 border-t border-[var(--border-subtle)] py-8 w7:py-10"
    >
      {/* Index + meta */}
      <div className="w7:col-span-3 flex flex-col gap-2">
        <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-[var(--text-muted)]/60">/</span>
          {labels[0] ?? "Project"}
        </span>
        <span className="mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        <span className="mono hidden w7:inline text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
          /{project.slug}
        </span>
      </div>

      {/* Body */}
      <div className="w7:col-span-9 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h2 className="overpass text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-tight leading-[1.05] text-[var(--text-primary)]">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors duration-200 hover:text-[var(--accent)]"
            >
              {project.name}
            </Link>
          </h2>
          <p className="text-[15.5px] leading-[1.65] text-[var(--text-muted)] max-w-[64ch]">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <Link
            href={`/projects/${project.slug}`}
            className="mono group/cta inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
          >
            Read case study
            <span className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
          </Link>
          <div className="hidden w7:flex items-center gap-3">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
