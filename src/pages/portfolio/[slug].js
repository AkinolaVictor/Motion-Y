// Portfolio Detail Page — Case study view for a specific project.
// Focuses on outcomes, technical challenge, and the AI solution.

import Head from "next/head";
import { useRouter } from "next/router";
import PageShell from "../../components/layout/PageShell";
import Container from "../../components/primitives/Container";
import Button from "../../components/primitives/Button";
import { PORTFOLIO_PROJECTS } from "../../data/portfolio";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PortfolioDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!slug) return null;

  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <h1 className="overpass text-4xl font-semibold">Project Not Found</h1>
          <p className="text-[var(--text-muted)] mt-4">The requested portfolio piece does not exist.</p>
        </div>
      </PageShell>
    );
  }

  return (
    <>
      <Head>
        <title>{project.company} — {project.title} · Motion-Y</title>
        <meta name="description" content={project.description} />
      </Head>

      <PageShell>
        <div ref={ref} className="flex flex-col gap-0">
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <Container className="relative z-10 flex flex-col gap-8">
              <div className="flex flex-col w9:flex-row w9:items-center w9:justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div data-reveal className="flex items-center gap-3">
                    <span className="mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] font-medium">
                      Case Study
                    </span>
                    <div className="h-px w-8 bg-[var(--accent)] opacity-50" />
                  </div>
                  <h1 data-reveal className="overpass text-4xl w7:text-6xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.1]">
                    {project.title}
                  </h1>
                </div>

                {/* Company Logo Area */}
                <div data-reveal className="flex items-center justify-center h-20 w-20 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-2xl font-bold mono">
                  {project.logo}
                </div>
              </div>

              {/* <div data-reveal className="flex flex-wrap items-center gap-6 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 backdrop-blur-sm"> */}
              <div data-reveal className="flex w10:max-w-140 flex-wrap items-center gap-6 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 backdrop-blur-sm">
                <span className="mono text-sm text-[var(--text-muted)]">Client: <span className="text-[var(--text-primary)] font-medium">{project.company}</span></span>
                <span className="mono text-sm text-[var(--text-muted)]">Year: <span className="text-[var(--text-primary)] font-medium">{project.year}</span></span>
                <span className="mono text-sm text-[var(--text-muted)]">Outcome: <span className="text-[var(--accent)] font-bold">{project.metrics}</span></span>
              </div>
            </Container>
          </section>

          {/* Main Content */}
          <section className="py-20 border-t border-[var(--border-subtle)]">
            <Container className="grid grid-cols-1 w9:grid-cols-12 gap-16">
              {/* Left Column: Narrative */}
              <div className="w9:col-span-8 flex flex-col gap-16">

                {/* Challenge Section */}
                <div data-reveal className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-xs font-bold mono">01</div>
                    <h2 className="overpass text-2xl font-semibold text-[var(--text-primary)]">The Challenge</h2>
                  </div>
                  <p className="text-[16px] leading-relaxed text-[var(--text-muted)]">
                    {project.details.challenge}
                  </p>
                </div>

                {/* Solution Section */}
                <div data-reveal className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-xs font-bold mono">02</div>
                    <h2 className="overpass text-2xl font-semibold text-[var(--text-primary)]">The AI Solution</h2>
                  </div>
                  <div className="flex flex-col gap-6">
                    <p className="text-[16px] leading-relaxed text-[var(--text-muted)]">
                      {project.details.solution.paragraph}
                    </p>
                    <ul className="flex flex-col gap-4">
                      {project.details.solution.list.map((item, i) => (
                        <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-[var(--text-muted)]">
                          <span className="text-[var(--accent)] mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Result Section */}
                <div data-reveal className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-xs font-bold mono">03</div>
                    <h2 className="overpass text-2xl font-semibold text-[var(--text-primary)]">The Result</h2>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {project.details.result.map((item, i) => (
                      <li key={i} className="flex gap-4 text-[16px] leading-relaxed text-[var(--text-primary)] font-medium">
                        <span className="text-[var(--accent)] mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Meta */}
              <div className="w9:col-span-4 flex flex-col gap-8">
                <div data-reveal className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                  <h3 className="mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="mono text-[10px] px-2 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div data-reveal className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                  <h3 className="mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Project Category</h3>
                  <span className="text-[var(--accent)] font-medium text-sm uppercase tracking-wide">
                    {project.category.replace("-", " ")}
                  </span>
                </div>
              </div>
            </Container>
          </section>

          {/* Footer CTA */}
          <section className="py-24 border-t border-[var(--border-subtle)]">
            <Container className="flex flex-col items-center text-center gap-8">
              <h2 data-reveal className="overpass text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Want similar results for your business?
              </h2>
              <Button variant="primary" size="lg" href="/contact">
                Let's Talk
              </Button>
            </Container>
          </section>
        </div>
      </PageShell>
    </>
  );
}
