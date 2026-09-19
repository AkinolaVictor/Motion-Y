// /lab — Victor's AI Lab. An experimental playground for exploring AI
// systems, testing ideas, and learning through building.
//
// Composes PageShell + LabHero + FeaturedExperiment + ExperimentGrid + LabManifesto.
// Filter state (category + search query) lives here; ExperimentGrid re-derives the visible list.
// Search takes priority when active: typing in the search box overrides the category filter
// and matches against title, ID (EXP-NNN), and tags.

import Head from "next/head";
import { useMemo, useState } from "react";
import PageShell from "../components/layout/PageShell";
import LabHero from "../components/lab/LabHero";
import FeaturedExperiment from "../components/lab/FeaturedExperiment";
import ExperimentGrid from "../components/lab/ExperimentGrid";
import LabManifesto from "../components/lab/LabManifesto";
import {
  CATEGORIES,
  EXPERIMENTS,
  STATUS_LABELS,
  getFeaturedExperiment,
  listExperimentsByCategory,
} from "../data/experiments";

export default function LabPage() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const byCategory = { all: EXPERIMENTS.length };
    for (const c of CATEGORIES) {
      if (c.key === "all") continue;
      byCategory[c.key] = EXPERIMENTS.filter((e) => e.category === c.key).length;
    }
    return { total: EXPERIMENTS.length, byCategory };
  }, []);

  const statusCounts = useMemo(() => {
    const out = {};
    for (const key of Object.keys(STATUS_LABELS)) {
      out[key] = EXPERIMENTS.filter((e) => e.status === key).length;
    }
    return out;
  }, []);

  // Featured specimen is excluded from the filterable grid so the page
  // always shows the same headline experiment and a clean chronological
  // list below it.
  const featured = useMemo(() => getFeaturedExperiment(), []);
  const filtered = useMemo(
    () => listExperimentsByCategory(active).filter((e) => e.id !== featured.id),
    [active, featured.id],
  );

  // Search takes priority: when a query is present we ignore the category filter
  // and match against title / id / tags only.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filtered;
    return filtered.filter((e) => {
      const haystack = [
        e.title,
        e.id,
        ...(e.tech ?? []),
        e.category,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filtered, query]);

  return (
    <>
      <Head>
        <title>AI Lab — Motion-Y | AI Experiments & Innovation</title>
        <meta
          name="description"
          content="Explore the Motion-Y AI Lab: an experimental playground for autonomous agents, LLM testing, and intelligent software research."
        />
        <meta property="og:title" content="AI Lab — Motion-Y Innovation" />
        <meta
          property="og:description"
          content="A deep dive into the experiments, failures, and breakthroughs of the Motion-Y AI laboratory."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://motion-y.ai/lab" />
      </Head>

      <PageShell>
        <LabHero counts={counts} />

        <FeaturedExperiment experiment={featured} />

        <ExperimentGrid
          experiments={visible}
          active={active}
          onChange={setActive}
          counts={counts}
          statusCounts={statusCounts}
          query={query}
          onQueryChange={setQuery}
        />

        <LabManifesto />
      </PageShell>
    </>
  );
}
