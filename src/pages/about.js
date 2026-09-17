// About page — composes PageShell + the core agency sections.
// Refactored to focus on the Agency identity and professional delivery.

import Head from "next/head";
import PageShell from "../components/layout/PageShell";
import AboutHero from "../components/about/AboutHero";
import OurStory from "../components/about/OurStory";
import VisionMission from "../components/about/VisionMission";
import OurValues from "../components/about/OurValues";
import OurApproach from "../components/about/OurApproach";
import OurDifference from "../components/about/OurDifference";
import TechExpertise from "../components/about/TechExpertise";
import Social from "../components/about/Social";
import FinalCTA from "@/components/home/FinalCTA";

export default function About() {
  return (
    <>
      <Head>
        <title>About — Motion-Y AI Agency</title>
        <meta
          name="description"
          content="Motion-Y is an AI engineering agency dedicated to transforming business operations through autonomous agents and scalable automation."
        />
        <meta property="og:title" content="About — Motion-Y" />
        <meta
          property="og:description"
          content="Architecting the intelligence layer for the modern enterprise."
        />
        <meta property="og:type" content="profile" />
      </Head>

      <PageShell>
        <AboutHero />
        <OurStory />
        <VisionMission />
        <OurValues />
        <OurApproach />
        <OurDifference />
        <TechExpertise />
        <FinalCTA env/>
        <Social />
      </PageShell>
    </>
  );
}
