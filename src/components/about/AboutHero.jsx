// AboutHero — Elegant introduction for the Agency.
// Focuses on a high-end B2B identity and technical scale.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutHero() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        autoAlpha: 0,
        y: 30,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <Container className="relative z-10 flex flex-col gap-8">
        <div className="hero-animate flex items-center gap-3">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            Our Agency
          </span>
          <div className="h-px w-8 bg-[var(--accent)] opacity-50" />
        </div>

        <h1 className="hero-animate overpass text-5xl w7:text-7xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.1]">
          Architecting the <br />
          <span className="text-[var(--accent)]">Intelligence Layer.</span>
        </h1>

        <p className="hero-animate max-w-2xl text-lg w7:text-xl text-[var(--text-muted)] leading-relaxed">
          Motion-Y is an AI engineering agency dedicated to transforming business operations
          through autonomous agents, intelligent software, and scalable automation.
          We don't just implement AI; we engineer competitive advantages.
        </p>
      </Container>
    </section>
  );
}
