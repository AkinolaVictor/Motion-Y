// Writing — section 07 / WRITING.
// Three article cards. Each: category pill, title, excerpt, date, read time.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import SectionHeader from "../primitives/SectionHeader";
import Pill from "../primitives/Pill";
import { ARTICLES } from "./writingData";

export default function Writing() {
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !listRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-article]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: listRef.current, start: "top 80%" },
      });
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="writing"
      aria-labelledby="writing-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index="07"
          label="WRITING"
          title={<span id="writing-title">Latest writing.</span>}
          lead="Short essays from the workbench. Mostly engineering, a little research, occasional product notes."
        />

        <ul
          ref={listRef}
          className="grid grid-cols-1 w7:grid-cols-3 gap-4 w9:gap-5"
        >
          {ARTICLES.map((a) => (
            <li
              key={a.slug}
              data-article
              className="group flex flex-col gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors duration-200 hover:border-[var(--accent)]/40"
            >
              <div className="flex items-center justify-between">
                <Pill variant="accent">{a.category}</Pill>
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]/70">
                  {a.readTime}
                </span>
              </div>
              <h3 className="overpass text-[19px] w8:text-[20px] font-semibold leading-[1.25] tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                {a.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[var(--text-muted)]">{a.excerpt}</p>
              <span className="mono mt-auto pt-3 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]/70">
                {a.date}
              </span>
            </li>
          ))}
        </ul>

        <a
          href="/writing"
          className="mono group inline-flex w-fit items-center gap-2 self-end text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          Read all
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </Container>
    </section>
  );
}
