// FeaturedProjects — section 03 / OUTPUTS.
// The 5 most recent projects in a varied 12-column bento grid.
// Older work is one click away via the "View all projects" link.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";
import SectionHeader from "../primitives/SectionHeader";
import ProjectCard from "./ProjectCard";
import { FEATURED_PROJECTS } from "./projectData";

export default function FeaturedProjects() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-project-card]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured-projects"
      aria-labelledby="featured-projects-title"
      className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeader
          index="03"
          label="OUTPUTS"
          title={<span id="featured-projects-title">Featured projects.</span>}
          lead="A selection of recent systems I've designed and built end-to-end — research, retrieval, agents, evaluation, and developer experience."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 w6:grid-cols-2 w9:grid-cols-12 gap-4 w9:gap-5"
        >
          {FEATURED_PROJECTS.map((p) => (
            <div data-project-card key={p.slug} className={p.span}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        <a
          href="/projects"
          className="mono group inline-flex w-fit items-center gap-2 self-end text-[12px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          View all projects
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </Container>
    </section>
  );
}
