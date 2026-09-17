// FeaturedArticle — the "thesis" block for /writing.
// Editorial layout: large issue number, mono byline, big title, lede with
// signature drop-cap (accent-colored first letter + paragraph mark above it),
// pull-quote set as a margin rule, and a "Read article" CTA.
//
// Drop-cap treatment is the page's signature element — justified as
// "premium publication + engineering journal". The mono "¶" pilcrow sits
// above the lede and gives the block a printerly anchor that no other
// section on the site has.

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import Pill from "../primitives/Pill";
import { CATEGORIES } from "../../data/writing";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

export default function FeaturedArticle({ article }) {
  const ref = useRef(null);
  const category = CATEGORIES.find((c) => c.key === article.category);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-feat]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
      // Drop-cap fade
      gsap.from("[data-dropcap]", {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
        delay: 0.25,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="featured-article-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        {/* Header strip */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">★</span>
            <span className="text-[var(--accent)]">FEATURED ESSAY</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>Issue {article.issue}</span>
          </p>
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/70">
            {formatDate(article.date)} · {article.readTime} read
          </p>
        </div>

        {/* Card */}
        <article
          data-feat
          className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 w7:p-8 w9:p-12 flex flex-col gap-8"
        >
          {/* Category + tags */}
          <div className="flex flex-wrap items-center gap-2">
            <Pill variant="accent">{category?.label ?? article.category}</Pill>
            {article.tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>

          {/* Title */}
          <h2
            id="featured-article-title"
            className="overpass text-[clamp(2rem,4.4vw,3.25rem)] font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--text-primary)] max-w-[22ch]"
          >
            {article.title}
          </h2>

          {/* Byline */}
          <p className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/80 border-y border-[var(--border-subtle)] py-3">
            <span>By Akinola Victor</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>{category?.label}</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>{formatDate(article.date)}</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>{article.readTime} read</span>
          </p>

          {/* Lede with signature drop-cap */}
          <div className="flex flex-col gap-4">
            <p className="mono text-[var(--accent)]/70 text-[18px] leading-none">¶</p>
            <p className="text-[18px] w8:text-[19px] leading-[1.75] text-[var(--text-muted)]">
              <span
                data-dropcap
                aria-hidden="true"
                className="overpass float-left mr-3 mt-1 text-[78px] w8:text-[92px] leading-[0.85] font-semibold text-[var(--accent)]"
              >
                {article.lede.charAt(0)}
              </span>
              <span className="text-[var(--text-primary)]">
                {article.lede.slice(1)}
              </span>
            </p>
          </div>

          {/* Pull-quote — editorial extract */}
          <blockquote className="relative my-2 border-l-2 border-[var(--accent)] pl-5 w7:pl-6">
            <span
              aria-hidden="true"
              className="mono absolute -left-[1px] -top-3 text-[var(--accent)]/60 text-[20px] leading-none"
            >
              &ldquo;
            </span>
            <p className="overpass text-[clamp(1.125rem,2vw,1.4rem)] leading-[1.5] text-[var(--text-primary)] italic">
              {article.pullQuote}
            </p>
          </blockquote>

          {/* CTA */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-[var(--border-subtle)]">
            <a
              href={`/writing/${article.slug}`}
              className="mono group/cta inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
            >
              Read article
              <span className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
            </a>
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]/60">
              /{article.slug}
            </span>
          </div>
        </article>
      </Container>
    </section>
  );
}
