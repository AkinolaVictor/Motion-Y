// useThemeToggle — hydration-safe theme manager with three modes.
//
// Modes: "system" | "light" | "dark".
//   - The user's chosen mode is persisted to localStorage as one of the three.
//   - The *resolved* theme is what actually gets applied to <html>:
//       system → whichever of light/dark the OS prefers
//       light   → "light"
//       dark    → "dark"
//   - When mode is "system", a live listener on prefers-color-scheme keeps
//     the resolved theme in sync if the user changes their OS setting.
//
// Priority on first visit (no stored choice): "dark" — dark is the default
// for this portfolio. A stored choice, once made, always wins.

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function isValidMode(v) {
  return v === "system" || v === "light" || v === "dark";
}

function readStored() {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return isValidMode(v) ? v : null;
  } catch {
    return null;
  }
}

function writeStored(mode) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* ignore — Safari private mode etc. */
  }
}

function readSystemPref() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

// What theme to actually paint to <html> for a given chosen mode.
function resolveTheme(mode) {
  if (mode === "light" || mode === "dark") return mode;
  return readSystemPref();
}

function applyTheme(resolved) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

const CYCLE_ORDER = ["dark", "light", "system"];

export default function useThemeToggle() {
  // Render neutral on server + first client paint to avoid hydration mismatch.
  const [mode, setMode] = useState("dark");
  const [resolved, setResolved] = useState("dark");
  const [hydrated, setHydrated] = useState(false);

  // Initial mount: read stored choice (or fall back to dark), resolve it,
  // apply to <html>, and subscribe to OS changes for system mode.
  useEffect(() => {
    const initialMode = readStored() ?? "dark";
    const initialResolved = resolveTheme(initialMode);
    setMode(initialMode);
    setResolved(initialResolved);
    applyTheme(initialResolved);

    const mql = window.matchMedia?.("(prefers-color-scheme: light)");
    const onSystemChange = () => {
      if (initialMode === "system") applyTheme(readSystemPref());
    };
    if (mql && mql.addEventListener) mql.addEventListener("change", onSystemChange);
    else if (mql && mql.addListener) mql.addListener(onSystemChange);

    setHydrated(true);
    return () => {
      if (mql && mql.removeEventListener) mql.removeEventListener("change", onSystemChange);
      else if (mql && mql.removeListener) mql.removeListener(onSystemChange);
    };
  }, []);

  // Live re-apply when the chosen mode changes.
  useEffect(() => {
    if (!hydrated) return;
    const next = resolveTheme(mode);
    setResolved(next);
    applyTheme(next);
    writeStored(mode);
  }, [mode, hydrated]);

  // Keep resolved in sync when the OS preference changes while in system mode.
  useEffect(() => {
    if (typeof window === "undefined" || !hydrated) return;
    const mql = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!mql) return;
    const onChange = () => {
      if (mode === "system") {
        const next = readSystemPref();
        setResolved(next);
        applyTheme(next);
      }
    };
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [mode, hydrated]);

  const setTheme = useCallback((next) => {
    if (!isValidMode(next)) return;
    setMode(next);
  }, []);

  const cycle = useCallback(() => {
    setMode((prev) => {
      const i = CYCLE_ORDER.indexOf(prev);
      const next = CYCLE_ORDER[(i + 1) % CYCLE_ORDER.length];
      return next;
    });
  }, []);

  // Back-compat alias — old callers (Navbar) still see a `toggle` action.
  const toggle = cycle;

  return { theme: resolved, mode, resolvedTheme: resolved, setTheme, cycle, toggle, hydrated };
}
