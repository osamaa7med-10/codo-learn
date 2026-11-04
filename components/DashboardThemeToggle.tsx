"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "../context/LanguageContext";

export default function DashboardThemeToggle() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  if (!pathname.includes("dashboard")) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Soft dark mode"}
      className="fixed bottom-5 right-5 z-[100] flex h-12 w-12 items-center justify-center rounded-2xl border border-[#869CFF]/40 bg-white text-xl shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-600 dark:bg-slate-800"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
