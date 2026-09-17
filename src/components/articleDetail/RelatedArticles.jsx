// RelatedArticles — two related-article cards under the body.
// Picks same-category articles first, falls back to most-recent in other
// categories. Mirrors the editorial card language of the /writing list.

import Link from "next/link";
import Container from "../primitives/Container";
import Pill from "../primitives/Pill";
import { CATEGORIES } from "../../data/writing";

export default function RelatedArticles({ articles }) {
  if (!articles?.length) return null;
  return (
    <section
      aria-labelledby="related"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
          <h2
            id="related"
            className="overpass text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight leading-[1.1] text-[var(--text-primary)]"
          >
            Related writing.
          </h2>
          <Link
            href="/writing"
            className="mono group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            All articles
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <ul className="grid grid-cols-1 w7:grid-cols-2 gap-4 w9:gap-5">
          {articles.map((a) => {
            const cat = CATEGORIES.find((c) => c.key === a.category)?.label ?? a.category;
            return (
              <li key={a.slug}>
                <Link
                  href={`/writing/${a.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--accent)]/40"
                >
                  <div className="flex items-center justify-between">
                    <Pill variant="accent">{cat}</Pill>
                    <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]/70">
                      ISSUE {a.issue}
                    </span>
                  </div>
                  <h3 className="overpass text-[20px] font-semibold leading-[1.25] tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    {a.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[var(--text-muted)]">
                    {a.excerpt}
                  </p>
                  <span className="mono mt-auto pt-3 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]/70">
                    {a.date} · {a.readTime}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
