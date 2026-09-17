// OurStory — Narrative about the agency's evolution.
// Maps the agency's growth from technical roots to AI leadership.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OurStory() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".story-reveal", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 border-b border-[var(--border-subtle)]">
      <Container className="grid grid-cols-1 w9:grid-cols-12 gap-16">
        <div className="w9:col-span-5 flex flex-col gap-6">
          <div className="story-reveal flex items-center gap-3">
            <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
              The Genesis
            </span>
            <div className="h-px w-8 bg-[var(--accent)] opacity-50" />
          </div>
          <h2 className="story-reveal overpass text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
            Bridging Engineering <br />and Intelligence.
          </h2>
          <p className="story-reveal text-[16px] leading-relaxed text-[var(--text-muted)]">
            Motion-Y is founded on a collective obsession with technical efficiency. With a deep foundation
            in building complex full-stack systems, we specialize in scalable architecture and
            seamless user experiences that prioritize performance and reliability.
          </p>
          <p className="story-reveal text-[16px] leading-relaxed text-[var(--text-muted)]">
            As AI capabilities evolve toward autonomous agentic systems, we focus on the critical gap:
            making AI truly production-ready. Our approach blends software rigor with model intelligence
            to build systems that go beyond conversation to deliver actual, reliable execution.
          </p>
        </div>

        <div className="w9:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { phase: "01", label: "Software Core", desc: "Foundation in full-stack engineering and scalable systems." },
            { phase: "02", "label": "AI Pivot", desc: "Integrating LLMs and RAG into production environments." },
            { phase: "03", label: "Agentic Era", desc: "Building autonomous systems that reason and execute." },
          ].map((step, i) => (
            <div
              key={i}
              className="story-reveal p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col gap-4 hover:border-[var(--accent)] transition-colors duration-300"
            >
              <span className="mono text-2xl font-bold text-[var(--accent)] opacity-50">{step.phase}</span>
              <h3 className="overpass font-semibold text-[var(--text-primary)]">{step.label}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
