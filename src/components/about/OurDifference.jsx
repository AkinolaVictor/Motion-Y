// OurDifference — Competitive edge and unique value proposition.
// Focuses on the intersection of software engineering and AI.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OurDifference() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".diff-reveal", {
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
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            What Makes Us Different
          </span>
          <h2 className="overpass text-3xl font-semibold text-[var(--text-primary)]">
            Engineering over Prompting.
          </h2>
        </div>

        <div className="grid grid-cols-1 w9:grid-cols-2 gap-12">
          <div className="diff-reveal flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              <h3 className="overpass font-semibold text-lg text-[var(--text-primary)]">Software Rigor</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-[var(--text-muted)]">
              Many "AI experts" can write a prompt. We build production systems. This means implementing
              version control for prompts, automated evaluation pipelines, and robust error handling that
              prevents LLM hallucinations from crashing your business logic.
            </p>
          </div>
          <div className="diff-reveal flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              <h3 className="overpass font-semibold text-lg text-[var(--text-primary)]">End-to-End Ownership</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-[var(--text-muted)]">
              We don't just deliver a model; We deliver a product. From the vector database architecture and
              API middleware to the final React frontend, We ensure that the AI capability is perfectly
              integrated into the user experience.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
