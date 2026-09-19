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

  const handleStartChat = async (text) => {
    setView("active");
    // Directly call handleSend to initiate the real AI interaction
    await handleSend(text);
  };

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.content
      }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later."
      }]);
    } finally {
      setIsTyping(false);
    }
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
