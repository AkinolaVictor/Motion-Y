// Services Dynamic Page — Renders detailed view based on slug.
// Implements a clean, data-driven approach for maintainability.

import Head from "next/head";
import { useRouter } from "next/router";
// import PageShell from "../components/layout/PageShell";
import { SERVICES } from "../../data/services";

import ServiceHero from "../../components/services/ServiceHero";
import ServiceDetailedBreakdown from "../../components/services/ServiceDetailedBreakdown";
import ServiceFeatureGrid from "../../components/services/ServiceFeatureGrid";
import ServiceCTA from "../../components/services/ServiceCTA";
import PageShell from "@/components/layout/PageShell";

export default function ServicePage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return null; // Wait for router to hydrate

  const service = SERVICES[slug];

  if (!service) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <h1 className="overpass text-4xl font-semibold">Service Not Found</h1>
          <p className="text-[var(--text-muted)] mt-4">The requested service does not exist.</p>
        </div>
      </PageShell>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} — Motion-Y</title>
        <meta name="description" content={service.description} />
      </Head>

      <PageShell>
        <ServiceHero service={service} />
        <ServiceDetailedBreakdown section={service.sections.breakdown} />
        <ServiceFeatureGrid features={service.sections.features} />
        <ServiceCTA />
      </PageShell>
    </>
  );
}
