// OurApproach — The agency's delivery loop.
// Visually emphasizes the "Build -> Measure -> Improve" cycle.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OurApproach() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".approach-step", {
        autoAlpha: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const STEPS = [
    {
      label: "Analyze & Build",
      desc: "We map your bottlenecks and prototype a high-leverage AI system that targets the core business friction.",
      icon: "🏗️"
    },
    {
      label: "Measure & Validate",
      desc: "We implement rigorous observability and evaluation gates to ensure the AI behaves predictably in production.",
      icon: "📏"
    },
    {
      label: "Scale & Optimize",
      desc: "We iterate based on empirical data, refining the architecture to maximize ROI and operational efficiency.",
      icon: "🚀"
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[var(--bg-surface)]">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            Our Approach
          </span>
          <h2 className="overpass text-3xl font-semibold text-[var(--text-primary)]">
            The Delivery Loop.
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            We avoid the "AI for AI's sake" trap. Our methodology is rooted in software engineering:
            deploying fast, measuring ruthlessly, and optimizing for business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 w7:grid-cols-3 gap-8 relative">
          {/* Visual connector for desktop */}
          <div className="hidden w7:block absolute top-1/2 left-0 w-full h-px bg-[var(--border-subtle)] -z-10" />

          {STEPS.map((step, i) => (
            <div key={i} className="approach-step flex flex-col items-center text-center gap-6 p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-base)] relative">
              <div className="h-14 w-14 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-2xl shadow-xl">
                {step.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="overpass font-semibold text-xl text-[var(--text-primary)]">{step.label}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
