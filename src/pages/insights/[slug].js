// /writing/[slug] — individual article page. Pre-renders all known slugs at
// build time and falls back to a 404 for unknown ones. Composes the
// articleDetail component family — same pattern as /projects/[slug].

import Head from "next/head";
import PageShell from "../../components/layout/PageShell";
import ArticleHero from "../../components/articleDetail/ArticleHero";
import ArticleBody from "../../components/articleDetail/ArticleBody";
import ArticlePullQuote from "../../components/articleDetail/ArticlePullQuote";
import ArticleTakeaways from "../../components/articleDetail/ArticleTakeaways";
import RelatedArticles from "../../components/articleDetail/RelatedArticles";
import NextArticle from "../../components/articleDetail/NextArticle";
import {
  ARTICLES,
  getArticleBySlug,
  getAdjacentArticles,
  getRelatedArticles,
} from "../../data/writing";

export default function ArticleDetailPage({ article, prev, next, related }) {
  if (!article) return null; // getStaticProps returns notFound for unknowns

  // Place the pull quote after the first 2 body blocks so it reads as a
  // mid-article breath rather than a header.
  const headBlocks = article.body.slice(0, 2);
  const tailBlocks = article.body.slice(2);

  return (
    <>
      <Head>
        <title>{article.title} — Motion-Y</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} — Motion-Y`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
      </Head>

      <PageShell>
        <ArticleHero article={article} />

        <ArticleBody blocks={headBlocks} />

        <ArticlePullQuote quote={article.pullQuote} />

        <ArticleBody blocks={tailBlocks} />

        <ArticleTakeaways takeaways={article.takeaways} />

        <RelatedArticles articles={related} />

        <NextArticle prev={prev} next={next} />
      </PageShell>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ARTICLES.map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { notFound: true };
  const { prev, next } = getAdjacentArticles(params.slug);
  const related = getRelatedArticles(params.slug, 2);
  return { props: { article, prev, next, related } };
}
