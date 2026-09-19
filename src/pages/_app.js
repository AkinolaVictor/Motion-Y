import "../styles/globals.css";
import { Provider } from "react-redux";
import dataStore from "../redux/store"
import { useRef } from "react";
import Head from "next/head";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger)

export default function App({ Component, pageProps }) {
  const parent = useRef()
  const content = useRef()

  return (
    <Provider store={dataStore}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Default Fallback SEO */}
        <title>Motion-Y | AI Technology Agency</title>
        <meta name="description" content="Motion-Y builds practical AI systems, automations, and intelligent software to help businesses multiply productivity and accelerate growth." />
      </Head>
      <div ref={parent} className="relative" >
        <div ref={content} className="relative">
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}
