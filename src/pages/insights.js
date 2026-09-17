// /writing — Victor's technical blog and learning journal.
//
// Composes PageShell + WritingHero + FeaturedArticle + ArticleList + WritingBio.
// Filter state (category) lives here; ArticleList re-derives the visible list.

import Head from "next/head";
import { useMemo, useState } from "react";
import PageShell from "../components/layout/PageShell";
import WritingHero from "../components/writing/WritingHero";
import FeaturedArticle from "../components/writing/FeaturedArticle";
import ArticleList from "../components/writing/ArticleList";
import WritingBio from "../components/writing/WritingBio";
import {
  ARTICLES,
  CATEGORIES,
  getFeaturedArticle,
  listArticlesByCategory,
} from "../data/writing";

export default function WritingPage() {
  const [active, setActive] = useState("all");

  const counts = useMemo(() => {
    const byCategory = { all: ARTICLES.length };
    for (const c of CATEGORIES) {
      if (c.key === "all") continue;
      byCategory[c.key] = ARTICLES.filter((a) => a.category === c.key).length;
    }
    return { total: ARTICLES.length, byCategory };
  }, []);

  // Featured essay is excluded from the filterable list so the page
  // always shows the same headline essay and a clean chronological
  // list below it.
  const featured = useMemo(() => getFeaturedArticle(), []);
  const filtered = useMemo(
    () => listArticlesByCategory(active).filter((a) => a.slug !== featured.slug),
    [active, featured.slug],
  );

  return (
    <>
      <Head>
        <title>Insights — Motion-Y</title>
        <meta
          name="description"
          content="Notes on AI engineering, software development, experiments, and lessons learned while building intelligent systems."
        />
      </Head>

      <PageShell>
        <WritingHero active={active} onChange={setActive} counts={counts} />

        {/* <FeaturedArticle article={featured} /> */}

        <ArticleList articles={filtered} />

        {/* <WritingBio /> */}
      </PageShell>
    </>
  );
}
