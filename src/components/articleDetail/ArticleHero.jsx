// ArticleHero — top of /writing/[slug].
// Back link, eyebrow (issue + category + read time + date), display title,
// dek (lede), tag chips, and a procedural cover. Mirrors ProjectHero rhythm
// but reads as editorial — single-column on the body side, cover pinned right.

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import Pill from "../primitives/Pill";
import Portrait from "../primitives/Portrait";
import { CATEGORIES } from "../../data/writing";

function ArticleCover({ article }) {
  // Deterministic procedural cover — same family as ProjectCover so the
  // visual language stays consistent across the site.
  const seed = article.slug.length + (article.tags?.length ?? 0);
  const circles = Array.from({ length: 7 }).map((_, i) => ({
    cx: ((seed * (i + 1)) % 100),
    cy: ((seed * (i + 3)) % 100),
    r: 6 + ((seed * (i + 2)) % 18),
  }));

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id={`art-${article.slug}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill={`url(#art-${article.slug})`} />
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r / 6} fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="0.25" />
        ))}
        {circles.slice(0, 3).map((c, i) => (
          <circle key={`d-${i}`} cx={c.cx} cy={c.cy} r="0.7" fill="var(--accent)" />
        ))}
        {/* "text lines" — horizontal hairlines to evoke a manuscript page */}
        {[20, 35, 50, 65, 80].map((y, i) => (
          <line key={i} x1="14" y1={y} x2="86" y2={y} stroke="var(--accent)" strokeOpacity={0.18 - i * 0.025} strokeWidth="0.15" strokeDasharray="0.6 1.2" />
        ))}
      </svg>
      <span className="mono absolute left-4 top-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur">
        ISSUE {article.issue}
      </span>
      <span className="mono absolute right-4 bottom-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] backdrop-blur">
        /{article.slug}
      </span>
    </div>
  );
}

export default function ArticleHero({ article }) {
  const ref = useRef(null);
  const categoryLabel =
    CATEGORIES.find((c) => c.key === article.category)?.label ?? "Writing";

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-ad-line]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
      gsap.from("[data-ad-cover]", {
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
      aria-labelledby="article-title"
      className="relative overflow-hidden border-b border-[var(--border-subtle)]"
    >
      <Container className="relative pt-12 pb-16 w7:pt-20 w9:pt-24">
        <Link
          href="/writing"
          className="mono group mb-8 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          All articles
        </Link>

        <div className="grid grid-cols-1 w9:grid-cols-12 gap-10 w9:gap-12">
          <div className="w9:col-span-7 flex flex-col gap-6">
            <p
              data-ad-line
              className="mono flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
            >
              <span className="text-[var(--accent)]">Issue {article.issue}</span>
              <span className="text-[var(--text-muted)]/60">/</span>
              <span>{categoryLabel}</span>
              <span className="text-[var(--text-muted)]/60">/</span>
              <span>{article.readTime}</span>
              <span className="text-[var(--text-muted)]/60">/</span>
              <span>{article.date}</span>
              <span className="text-[var(--text-muted)]/60">/</span>
              {/* <Portrait /> */}
            </p>

            <h1
              id="article-title"
              data-ad-line
              className="overpass font-semibold tracking-[-0.02em] leading-[1.04] text-[clamp(2.25rem,5.5vw,4.25rem)] text-[var(--text-primary)]"
            >
              {article.title}
            </h1>

            <p
              data-ad-line
              className="max-w-[60ch] text-[18px] w8:text-[20px] leading-[1.6] text-[var(--text-muted)]"
            >
              {article.lede}
            </p>

            {article.tags?.length > 0 && (
              <div data-ad-line className="flex flex-wrap gap-1.5">
                {article.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            )}
          </div>

          <div data-ad-cover className="w9:col-span-5 flex flex-col gap-4">
            <ArticleCover article={article} />
            {/* Reading strip — small notebook-style metadata under the cover */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3">
              <span className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--accent)] accent-pulse" />
                  <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
                </span>
                published · {article.date}
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
                {(article.tags ?? []).slice(0, 3).join(" · ")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
