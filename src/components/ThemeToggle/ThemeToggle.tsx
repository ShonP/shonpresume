"use client";

import { FC, useEffect, useState, useLayoutEffect } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

interface IThemeToggleProps {
  withLabel?: string;
}

// Use useLayoutEffect on client, useEffect on server for SSR compatibility
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const ThemeToggle: FC<IThemeToggleProps> = ({ withLabel }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("light", savedTheme === "light");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (!systemPrefersDark) {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
        aria-label="Toggle theme"
      >
        <Moon size={20} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={
        withLabel
          ? "flex items-center gap-2 w-full py-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
          : "p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
      }
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      {withLabel && <span className="text-sm">{withLabel}</span>}
    </button>
  );
};
