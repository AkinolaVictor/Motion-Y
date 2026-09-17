// ArticleTakeaways — numbered key-insights block at the end of the body.
// Reads like a TL;DR / "if you only read three lines" recap.

import Container from "../primitives/Container";

export default function ArticleTakeaways({ takeaways }) {
  if (!takeaways?.length) return null;
  return (
    <section
      aria-labelledby="takeaways"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container>
        <div className="mx-auto max-w-[68ch]">
          <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-[var(--border-subtle)] pb-3">
            <h2
              id="takeaways"
              className="overpass text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight leading-[1.1] text-[var(--text-primary)]"
            >
              Key takeaways.
            </h2>
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]/80">
              {String(takeaways.length).padStart(2, "0")} points
            </span>
          </div>

          <ol className="flex flex-col gap-5">
            {takeaways.map((t, i) => (
              <li
                key={i}
                className="flex gap-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 w9:p-6"
              >
                <span className="mono flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[13px] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[16.5px] leading-[1.65] text-[var(--text-primary)]/90">
                  {t}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
