// Social — section 09 / ELSEWHERE.
// Compact rail of icon-only links for GitHub, LinkedIn, X, and email.
// Lives just above the Footer so the user can connect from any section.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "../primitives/Container";

const LINKS = [
  // {
  //   label: "GitHub",
  //   href: "https://github.com/AkinolaVictor",
  //   icon: (
  //     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  //       <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.18c-3.2.7-3.87-1.37-3.87-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.39.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.25 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
  //     </svg>
  //   ),
  // },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victoral/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.71h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.45c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21h-4V9z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/MoreThanAVictor",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.79-6.262L4.8 22H2.043l6.98-7.972L2 2h6.914l4.34 5.74L18.244 2zm-1.193 18.293h1.51L7.07 3.61H5.45l11.6 16.683z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:akinolavictor50@gmail.com",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export default function Social() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll("[data-link]"), {
        y: 8,
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="elsewhere"
      aria-labelledby="elsewhere-title"
      className="relative border-b border-[var(--border-subtle)] py-16 w9:py-20"
    >
      <Container className="flex flex-col gap-6 w7:flex-row w7:items-center w7:justify-between">
        <div className="flex flex-col gap-2">
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            {/* <span className="text-[var(--accent)]">09</span> */}
            {/* <span className="mx-2 text-[var(--text-muted)]/60">/</span> */}
            Elsewhere
          </p>
          <h3
            id="elsewhere-title"
            className="overpass text-[20px] font-semibold tracking-tight text-[var(--text-primary)]"
          >
            Find us around the web.
          </h3>
        </div>

        <ul ref={ref} className="flex items-center gap-2">
          {LINKS.map((l) => (
            <li key={l.label} data-link>
              <a
                href={l.href}
                aria-label={l.label}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"
              >
                {l.icon}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
