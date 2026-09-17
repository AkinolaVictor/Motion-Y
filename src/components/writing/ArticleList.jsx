// ArticleList — chronological grid of ArticleCards.
// Two-column at w7 (728px), three at w9 (900px). Heading reads
// "Recent issues" to reinforce the quarterly-publication metaphor.

import Container from "../primitives/Container";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  return (
    <section
      aria-labelledby="list-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
          <h2
            id="list-title"
            className="overpass text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight leading-[1.1] text-[var(--text-primary)]"
          >
            Recent issues.
          </h2>
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/80">
            {articles.length} {articles.length === 1 ? "essay" : "essays"}
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mono text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              No essays in this category — try another.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 w7:grid-cols-2 w9:grid-cols-3 gap-5 w7:gap-6">
            {articles.map((a, i) => (
              <li key={a.slug}>
                <ArticleCard article={a} index={i} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
