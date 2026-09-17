// /projects/[slug] — individual case study. Pre-renders all known slugs at build time
// and falls back to a 404 for unknown ones.

import Head from "next/head";
import PageShell from "../../components/layout/PageShell";
import ProjectHero from "../../components/projectDetail/ProjectHero";
import ProblemSolution from "../../components/projectDetail/ProblemSolution";
import Workflow from "../../components/projectDetail/Workflow";
import Architecture from "../../components/projectDetail/Architecture";
import Tech from "../../components/projectDetail/Tech";
import Decisions from "../../components/projectDetail/Decisions";
import Metrics from "../../components/projectDetail/Metrics";
import Challenges from "../../components/projectDetail/Challenges";
import Results from "../../components/projectDetail/Results";
import NextProject from "../../components/projectDetail/NextProject";
import {
  PROJECTS,
  getProjectBySlug,
  getAdjacentProjects,
} from "../../data/projects";
import FinalCTA from "@/components/home/FinalCTA";

export default function ProjectDetailPage({ project, prev, next }) {
  if (!project) return null; // getStaticProps returns notFound for unknowns

  return (
    <>
      <Head>
        <title>{project.name} — Akinola Victor</title>
        <meta name="description" content={project.tagline} />
        <meta property="og:title" content={`${project.name} — Akinola Victor`} />
        <meta property="og:description" content={project.tagline} />
      </Head>

      <PageShell>
        <ProjectHero project={project} />
        <ProblemSolution problem={project.problem} solution={project.solution} />
        <Workflow steps={project.workflow} />
        <Architecture nodes={project.architecture} />
        <Tech tech={project.tech} />
        <Decisions items={project.decisions} />
        <Metrics items={project.metrics} />
        <Challenges items={project.challenges} />
        <Results body={project.results} future={project.future} />
        <NextProject project={project} prev={prev} next={next} />
        <FinalCTA env />
      </PageShell>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: PROJECTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { notFound: true };
  const { prev, next } = getAdjacentProjects(params.slug);
  return { props: { project, prev, next } };
}
