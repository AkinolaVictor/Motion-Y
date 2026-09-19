// ChatTrigger — A floating action button to toggle the AI Chat interface.
// Positioned statically at the bottom right. Toggles between Logo and X icon.

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import cn from "../../utils/cn";
import useThemeToggle from "@/hooks/useThemeToggle";

export default function ChatTrigger({ isOpen, onToggle }) {
  const { resolvedTheme } = useThemeToggle()
  const [shake, setShake] = useState(false);
  // Logic:
  // Light mode theme -> logo_dark.png
  // Dark mode theme -> logo_light.png
  const logoSrc = resolvedTheme === "light" ? "/logo_dark.png" : "/logo_light.png";
  

  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-14 h-14 rounded-full flex items-center justify-center cursor-pointer",
        "transition-all duration-300 ease-out",
        "shadow-xl border border-[var(--border-subtle)]",
        "bg-[var(--bg-surface)] text-[var(--text-primary)]",
        "hover:scale-110 active:scale-95 hover:border-[var(--accent)]",
        isOpen ? "rotate-90" : "rotate-0"
      )}
    >
      {isOpen ? (
        <X size={24} className="text-[var(--text-primary)]" />
      ) : (
        <img
          src={logoSrc}
          alt="Motion-Y Logo"
          className="w-7 h-7 object-contain"
        />
      )}
    </button>
  );
}
