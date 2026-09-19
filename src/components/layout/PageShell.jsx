// PageShell — flex column wrapper used at the top of every page.
// Renders: Navbar → <main>{children}</main> → Footer.

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatTrigger from "./ChatTrigger";
import ChatSuggestion from "../chat/ChatSuggestion";
import ChatWindow from "../chat/ChatWindow";

export default function PageShell({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setShowSuggestion(false); // Automatically disappear when chat is opened
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />
      <main className="flex flex-col">{children}</main>
      <Footer />

      <ChatSuggestion
        isVisible={showSuggestion}
        onClose={() => setShowSuggestion(false)}
      />

      {isChatOpen && (
        <ChatWindow onClose={() => setIsChatOpen(false)} />
      )}

      <ChatTrigger
        isOpen={isChatOpen}
        onToggle={handleToggleChat}
      />
    </div>
  );
}
