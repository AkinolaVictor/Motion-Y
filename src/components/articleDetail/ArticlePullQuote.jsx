// ArticlePullQuote — editorial pull-out block. Big, centered, accent-on.
// Renders between body blocks as a visual breath.

import Container from "../primitives/Container";

export default function ArticlePullQuote({ quote }) {
  if (!quote) return null;
  return (
    <section
      aria-label="Pull quote"
      className="relative border-b border-[var(--border-subtle)] py-12 w9:py-16"
    >
      <Container>
        <figure className="mx-auto flex max-w-[58ch] flex-col items-center gap-4 text-center">
          <span
            aria-hidden="true"
            className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]"
          >
            pull quote
          </span>
          <blockquote className="overpass text-[26px] w8:text-[32px] font-medium leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)]">
            "{quote}"
          </blockquote>
        </figure>
      </Container>
    </section>
  );
}
