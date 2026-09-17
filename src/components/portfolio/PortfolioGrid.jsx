// Portfolio Grid — wrapper for the project cards.
// Implements the responsive grid layout.

import PortfolioCard from "./PortfolioCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PortfolioGrid({ projects }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-card-wrap", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((p) => (
        <div key={p.slug} className="portfolio-card-wrap">
          <PortfolioCard project={p} />
        </div>
      ))}
    </div>
  );
}
