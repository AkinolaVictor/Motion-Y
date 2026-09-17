// PageShell — flex column wrapper used at the top of every page.
// Renders: Navbar → <main>{children}</main> → Footer.

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />
      <main className="flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
