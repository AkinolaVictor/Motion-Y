import "../styles/globals.css";
import { Provider } from "react-redux";
import dataStore from "../redux/store"
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";


gsap.registerPlugin(ScrollTrigger)

export default function App({ Component, pageProps }) {
  const parent = useRef()
  const content = useRef()

  return (
    <Provider store={dataStore}>
      <div ref={parent} className="relative" >
        <div ref={content} className="relative">
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}
