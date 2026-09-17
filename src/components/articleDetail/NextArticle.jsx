// NextArticle — bottom-of-page prev/next navigation strip. Loops at the ends.
// Mirrors NextProject but for articles.

import Link from "next/link";
import Container from "../primitives/Container";

export default function NextArticle({ prev, next }) {
  return (
    <section
      aria-labelledby="next-article"
      className="relative py-16 w9:py-20"
    >
      <Container className="flex flex-col gap-10">
        <div className="hairline" />

        <nav
          id="next-article"
          aria-label="Article navigation"
          className="grid grid-cols-1 w7:grid-cols-2 gap-4"
        >
          {prev && (
            <Link
              href={`/writing/${prev.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--text-muted)]"
            >
              <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                Previous article
              </span>
              <p className="overpass text-[20px] font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                {prev.title}
              </p>
              <p className="text-[13px] leading-[1.55] text-[var(--text-muted)]">{prev.excerpt}</p>
            </Link>
          )}
          {next && (
            <Link
              href={`/writing/${next.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-right transition-colors hover:border-[var(--text-muted)] w7:items-end"
            >
              <span className="mono flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Next article
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
              <p className="overpass text-[20px] font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                {next.title}
              </p>
              <p className="text-[13px] leading-[1.55] text-[var(--text-muted)]">{next.excerpt}</p>
            </Link>
          )}
        </nav>
      </Container>
    </section>
  );
}
