// PortfolioCard — A concise project summary card.
// Focuses on the company logo, a clear description, and a technical feel.

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PortfolioCard({ project }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        }
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <Link href={`/portfolio/${project.slug}`} className="block group">
      <article
        ref={cardRef}
        className="relative flex flex-col gap-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_12px_30px_-12px_color-mix(in_srgb,var(--accent)_30%,transparent)]"
      >
        <div className="flex items-start justify-between gap-4">
          {/* Logo / Icon Area */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            <span className="mono text-xs font-bold uppercase">{project.logo}</span>
          </div>

          <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {project.year}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="overpass text-lg font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {project.company}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-muted)] line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <span className="mono text-[10px] uppercase tracking-wider text-[var(--accent)] opacity-80">
            {project.metrics}
          </span>
          <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
