// useReducedMotion — SSR-safe media query hook for prefers-reduced-motion.
// Returns null on the server and during the first client render, then the real value.

import { useEffect, useState } from "react";

export default function useReducedMotion() {
  const [reduced, setReduced] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    // Safari < 14 uses addListener; modern uses addEventListener.
    if (mql.addEventListener) mql.addEventListener("change", update);
    else mql.addListener(update);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", update);
      else mql.removeListener(update);
    };
  }, []);

  return reduced;
}
