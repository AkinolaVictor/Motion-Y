// ProjectHero — top of /projects/[slug].
// Eyebrow (category / case study) + status badge, display title, tagline,
// tech chips, GitHub + Live Demo CTAs, plus a large procedural cover.

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import Button from "../primitives/Button";
import Pill from "../primitives/Pill";
import Portrait from "../primitives/Portrait";
import { CATEGORIES } from "../../data/projects";

const STATUS_STYLES = {
  live:          { label: "Shipped",      dot: "bg-[var(--accent)]" },
  experimental:  { label: "Experimental", dot: "bg-amber-400" },
  "open-source": { label: "Open Source",  dot: "bg-sky-400" },
};

function ProjectCover({ project }) {
  const seed = project.slug.length + project.tags.length;
  const circles = Array.from({ length: 7 }).map((_, i) => ({
    cx: ((seed * (i + 1)) % 100),
    cy: ((seed * (i + 3)) % 100),
    r: 8 + ((seed * (i + 2)) % 28),
  }));

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id={`cov-${project.slug}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={project.accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={project.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill={`url(#cov-${project.slug})`} />
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r / 6} fill="none" stroke={project.accent} strokeOpacity="0.6" strokeWidth="0.25" />
        ))}
        {circles.slice(0, 3).map((c, i) => (
          <circle key={`d-${i}`} cx={c.cx} cy={c.cy} r="0.7" fill={project.accent} />
        ))}
        {/* Diagonal "data flow" */}
        <path d="M0 80 Q 30 60 50 70 T 100 50" fill="none" stroke={project.accent} strokeOpacity="0.5" strokeWidth="0.3" strokeDasharray="2 2" />
      </svg>
      <span className="mono absolute left-4 top-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur">
        /{project.slug}
      </span>
    </div>
  );
}

export default function ProjectHero({ project }) {
  const ref = useRef(null);
  const status = STATUS_STYLES[project.status] ?? STATUS_STYLES.experimental;
  const labels = project.categories
    .map((k) => CATEGORIES.find((c) => c.key === k)?.label)
    .filter(Boolean);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-pd-line]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
      gsap.from("[data-pd-cover]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="project-title"
      className="relative overflow-hidden border-b border-[var(--border-subtle)]"
    >
      <Container className="relative pt-12 pb-16 w7:pt-20 w9:pt-24">
        <Link
          href="/projects"
          className="mono group mb-8 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          All projects
        </Link>

        <div className="grid grid-cols-1 w9:grid-cols-12 gap-10 w9:gap-12">
          <div className="w9:col-span-7 flex flex-col gap-6">
            <p
              data-pd-line
              className="mono flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
            >
              <span>
                <span className="text-[var(--accent)]">{labels[0] ?? "Case Study"}</span>
                <span className="mx-2 text-[var(--text-muted)]/60">/</span>
                Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <span className="text-[var(--text-muted)]/70">/ {project.year}</span>
              {/* <Portrait /> */}
            </p>

            <h1
              id="project-title"
              data-pd-line
              className="overpass font-semibold tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,6.5vw,5rem)] text-[var(--text-primary)]"
            >
              {project.name}
            </h1>

            <p
              data-pd-line
              className="max-w-[58ch] text-[18px] w8:text-[19px] leading-[1.6] text-[var(--text-muted)]"
            >
              {project.tagline}
            </p>

            <div data-pd-line className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>

            <div data-pd-line className="flex flex-wrap items-center gap-3 pt-2">
              <Button href={project.github} external size="md" variant="primary">
                GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </Button>
              <Button href={project.demo} external size="md" variant="ghost">
                Live Demo
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>

            {/* <div data-pd-line className="mono mt-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]/70">
              {project.role}
            </div> */}
          </div>

          <div data-pd-cover className="w9:col-span-5 flex flex-col gap-4">
            <ProjectCover project={project} />
            {/* Online status strip */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3">
              <span className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--accent)] accent-pulse" />
                  <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
                </span>
                {project.name.toLowerCase()} / online
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
                {project.tags.slice(0, 4).join(" · ")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
