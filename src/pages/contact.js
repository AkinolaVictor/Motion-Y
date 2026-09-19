// Contact page — composes PageShell + the contact sections defined in src/components/contact.
// Each section is its own file per dev_rules.md (separation of concerns).

import Head from "next/head";
import PageShell from "../components/layout/PageShell";
import Container from "../components/primitives/Container";
import ContactHero from "../components/contact/ContactHero";
import ContactDetails from "../components/contact/ContactDetails";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Motion-Y | AI Consulting & Engineering</title>
        <meta
          name="description"
          content="Start a conversation with Motion-Y. We are open to collaborations, AI product consultations, and enterprise automation opportunities."
        />
        <meta property="og:title" content="Contact Motion-Y | AI Consulting" />
        <meta
          property="og:description"
          content="Have an interesting AI problem? Let's build a solution together. Contact the Motion-Y team today."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://motion-y.ai/contact" />
      </Head>

      <PageShell>
        <ContactHero />

        {/* Combined contact band — Details (left) + Form (right) share a grid. */}
        <section
          id="contact"
          aria-label="Start a conversation"
          className="relative border-b border-[var(--border-subtle)] py-20 w9:py-28"
        >
          <Container>
            <div className="grid grid-cols-1 w9:grid-cols-12 gap-12 w9:gap-16 items-start">
              <ContactDetails />
              <ContactForm />
            </div>
          </Container>
        </section>
      </PageShell>
    </>
  );
}
