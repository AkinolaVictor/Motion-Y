// ArticleCard — editorial listing card for the /writing article grid.
// Mirrors ProjectListItem's rhythm but reads as a publication: ISSUE-NNN,
// category pill, big title, lede excerpt, date + read time, optional tags.
// `featured` cards get the accent treatment so they read as the editorial pick.

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CATEGORIES } from "../../data/writing";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

export default function ArticleCard({ article, index }) {
  const cardRef = useRef(null);
  const category = CATEGORIES.find((c) => c.key === article.category);

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
        scrollTrigger: { trigger: cardRef.current, start: "top 90%" },
        delay: (index % 6) * 0.04,
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="group relative flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 w7:p-6 transition-colors duration-200 hover:border-[var(--accent)]/40"
    >
      {/* Top row: issue + category + read time */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">Issue {article.issue}</span>
          <span className="mx-1.5 text-[var(--text-muted)]/50">/</span>
          {category?.label ?? article.category}
        </span>
        <span className="mono text-[var(--text-muted)]/40">·</span>
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
          {article.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="overpass text-[20px] w8:text-[22px] font-semibold tracking-tight leading-[1.2] text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
        <a href={`/writing/${article.slug}`}>{article.title}</a>
      </h3>

      {/* Excerpt */}
      <p className="text-[14px] leading-[1.65] text-[var(--text-muted)] line-clamp-3">
        {article.excerpt}
      </p>

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="mono inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between gap-3 pt-2 mt-auto border-t border-[var(--border-subtle)]">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]/70">
          {formatDate(article.date)}
        </span>
        <a
          href={`/insights/${article.slug}`}
          className="mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          Read
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}
