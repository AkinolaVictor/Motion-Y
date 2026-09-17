// Home page — composes PageShell + the 8 home sections defined in src/components/home.
// Each section is its own file per dev_rules.md (separation of concerns).

import Head from "next/head";
import PageShell from "../components/layout/PageShell";
import Hero from "../components/home/Hero";
import WhatIBuild from "../components/home/WhatIBuild";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Capabilities from "../components/home/Capabilities";
import HowIBuild from "../components/home/HowIBuild";
import Exploring from "../components/home/Exploring";
import Writing from "../components/home/Writing";
import FinalCTA from "../components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Head>
        <title>Motion-Y — AI Agents and Automation Experts</title>
        <meta
          name="description"
          content="Motion-Y builds AI agents, intelligent software, and automation solutions that help businesses streamline operations, increase productivity, and accelerate growth."
        />
        <meta property="og:title" content="Motion-Y — AI Agency" />
        <meta
          property="og:description"
          content="We build intelligent applications, AI agents, and AI-powered workflows that turn complex business challenges into practical solutions."
        />
        <meta property="og:type" content="website" />
      </Head>

      <PageShell>
        <Hero />
        <WhatIBuild />
        {/* <FeaturedProjects /> */}
        <Capabilities />
        <HowIBuild />
        {/* <Exploring /> */}
        {/* <Writing /> */}
        <FinalCTA />
      </PageShell>
    </>
  );
}
