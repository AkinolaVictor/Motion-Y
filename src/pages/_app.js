
import "../styles/globals.css";
import { Provider } from "react-redux";
import dataStore from "../redux/store";
import { useRef } from "react";
import Head from "next/head";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }) {
  const parent = useRef();
  const content = useRef();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://motion-y.com/#organization",
    name: "Motion-Y",
    alternateName: "Motion Y",
    url: "https://motion-y.com/",
    description:
      "Motion-Y is an AI systems and business automation agency helping businesses streamline operations through process automation, AI agents, API integrations, AI consultancy, and intelligent software.",
    logo: "YOUR_PUBLIC_LOGO_URL",
    sameAs: [
      "https://www.linkedin.com/company/motion-y/",
      "https://x.com/motion_y_ai"
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Business Automation",
      "AI Agents",
      "Process Automation",
      "API Integrations",
      "AI Consultancy",
      "Intelligent Software Development"
    ]
  };

  return (
    <Provider store={dataStore}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Default Fallback SEO */}
        <title>Motion-Y | AI Technology Agency</title>
        <meta
          name="description"
          content="Motion-Y builds practical AI systems, automations, and intelligent software to help businesses multiply productivity and accelerate growth."
        />

        {/* Organization Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </Head>

      <div ref={parent} className="relative">
        <div ref={content} className="relative">
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}
