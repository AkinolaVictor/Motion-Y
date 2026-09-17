// WritingBio — quiet closing block for /writing. Mirrors LabManifesto /
// ProjectsBio rhythm: eyebrow, bold tagline, and a few inline links.
// Communicates what the writing is and isn't.

import Link from "next/link";
import Container from "../primitives/Container";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/lab",      label: "Lab" },
  { href: "/about",    label: "About" },
  { href: "/contact",  label: "Contact" },
];

export default function WritingBio() {
  return (
    <section
      aria-labelledby="writing-bio"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-8">
        <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">/</span>
          <span className="mx-2">engineering journal</span>
          <span className="text-[var(--text-muted)]/60">/</span>
          <span className="ml-2">ongoing</span>
        </p>

        <h2
          id="writing-bio"
          className="overpass max-w-[22ch] font-semibold tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,5vw,3.5rem)] text-[var(--text-primary)]"
        >
          I learn by building, experimenting, and sharing what I discover.
        </h2>

        <p className="max-w-[58ch] text-[15px] leading-[1.7] text-[var(--text-muted)]">
          The essays here are the slow part of the work — what I noticed while shipping, what I
          tried that didn&apos;t work, the framings that ended up sticking. Long-form when it
          earns the room, short when it doesn&apos;t.
        </p>

        <nav aria-label="More from me" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="mono group inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="text-[var(--accent)]/70">0{i + 1}</span>
              <span className="mx-1 text-[var(--text-muted)]/50">·</span>
              {l.label}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
