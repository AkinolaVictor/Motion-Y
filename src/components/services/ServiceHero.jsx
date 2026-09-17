// ServiceHero — The high-impact entry point for a service page.
// Focuses on clarity, the accent color, and a professional technical feel.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ServiceHero({ service }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 overflow-hidden"
    >
      {/* Subtle background grid to maintain consistency with Home page */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <Container className="relative z-10 flex flex-col gap-6">
        <div className="hero-animate flex items-center gap-3">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            Service Detail
          </span>
          <div className="h-px w-8 bg-[var(--accent)] opacity-50" />
        </div>

        <h1 className="hero-animate overpass text-4xl w7:text-6xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.1]">
          {service.title}
        </h1>

        <p className="hero-animate text-lg w7:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
          {service.lead}
        </p>

        <div className="hero-animate mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-1.5 text-sm text-[var(--text-primary)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span className="mono uppercase tracking-wider opacity-80">System Ready</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
