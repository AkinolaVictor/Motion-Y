// Challenges — three-column "what broke / what we tried / what worked" rows.

import Container from "../primitives/Container";

export default function Challenges({ items }) {
  if (!items?.length) return null;
  return (
    <section
      aria-labelledby="challenges-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-24"
    >
      <Container className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">08</span>
            <span className="mx-2 text-[var(--text-muted)]/60">/</span>
            Challenges
          </p>
          <h2
            id="challenges-title"
            className="overpass font-semibold tracking-tight leading-[1.05] text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--text-primary)]"
          >
            What almost broke us.
          </h2>
        </header>

        <ul className="flex flex-col gap-3">
          {items.map((c, i) => (
            <li
              key={c.title}
              className="grid grid-cols-1 w7:grid-cols-12 gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 w7:p-6"
            >
              <div className="w7:col-span-3 flex flex-col gap-1">
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="overpass text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {c.title}
                </p>
              </div>
              <div className="w7:col-span-4">
                <p className="mono mb-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  What happened
                </p>
                <p className="text-[13.5px] leading-[1.6] text-[var(--text-muted)]">{c.what}</p>
              </div>
              <div className="w7:col-span-5">
                <p className="mono mb-1 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  What we did
                </p>
                <p className="text-[13.5px] leading-[1.6] text-[var(--text-primary)]/90">{c.fix}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
