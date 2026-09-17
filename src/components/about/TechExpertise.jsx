// TechExpertise — The technical stack and specialized AI knowledge.
// Organized into clear categories with a technical feel.

import Container from "../primitives/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TechExpertise() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".tech-category", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const STACK = [
    {
      label: "AI / ML",
      skills: ["LLMs", "RAG", "Autonomous Agents", "Multimodal AI", "Embeddings", "AI Evaluation"]
    },
    {
      label: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"]
    },
    {
      label: "Backend",
      skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      label: "Infra & Tools",
      skills: ["Docker", "GitHub Actions", "Ollama", "Vector DBs", "LangChain", "LlamaIndex"]
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[var(--bg-surface)]">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
            Expertise
          </span>
          <h2 className="overpass text-3xl font-semibold text-[var(--text-primary)]">
            Technology Stack.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STACK.map((cat, i) => (
            <div key={i} className="tech-category flex flex-col gap-6 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]">
              <h3 className="mono text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="mono text-[11px] px-2 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
