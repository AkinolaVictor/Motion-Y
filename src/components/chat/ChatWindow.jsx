// ChatWindow — Main orchestrator for the AI Chat interface.
// Refined for precise alignment with reference photos.

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMenu from "./ChatMenu";
import ChatHistory from "./ChatHistory";
import ChatNewState from "./ChatNewState";
import ChatActiveState from "./ChatActiveState";
import ChatInput from "./ChatInput";
import cn from "../../utils/cn";

export default function ChatWindow({ onClose }) {
  const [view, setView] = useState("new"); // 'new' | 'active'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleNewChat = () => {
    setMessages([]);
    setView("new");
  };

  const handleStartChat = (text) => {
    setView("active");
    setMessages([
      { role: "user", content: text },
      { role: "assistant", content: "I'm processing that request... (UI Only Mode)" }
    ]);
  };

  const handleSend = (text) => {
    const newMsgs = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    setIsTyping(true);

    // Simulate a response since backend is not implemented
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "This is a UI demonstration. The agent backend will be connected in the next phase!"
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[580px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-120px)] flex flex-col rounded-[32px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-300">

      <ChatHeader
        onClose={onClose}
        onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Main Content Area - Must have min-h-0 to allow children to scroll */}
      <div className="flex-1 overflow-hidden relative min-h-0 bg-[var(--bg-base)]">
        {view === "new" ? (
          <ChatNewState onStartChat={handleStartChat} />
        ) : (
          <ChatActiveState
            messages={messages}
            isTyping={isTyping}
          />
        )}
      </div>

      {/* Input Section - Now always visible regardless of view */}
      <ChatInput onSend={handleSend} isTyping={isTyping} />

      <ChatMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNewChat={handleNewChat}
        onViewHistory={() => {
          setIsHistoryOpen(true);
          setIsMenuOpen(false);
        }}
      />

      <ChatHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}
