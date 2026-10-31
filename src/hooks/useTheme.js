import { useEffect, useState } from "react";
import { themes, getTheme, DEFAULT_THEME } from "../themes";

// Must match the key read by the inline script in index.html (applies the theme before first paint).
const THEME_KEY = "praveen-portfolio-theme";

function readTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && themes.some((t) => t.id === saved)) return saved;
  } catch {
    /* storage blocked: fall back to default */
  }
  return DEFAULT_THEME;
}

export function useTheme() {
  const [theme, setTheme] = useState(readTheme);
  useEffect(() => {
    const t = getTheme(theme);
    document.documentElement.dataset.theme = t.id;
    document.documentElement.style.colorScheme = t.dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t.scene.bg);
    try {
      localStorage.setItem(THEME_KEY, t.id);
    } catch {
      /* ignore */
    }
  }, [theme]);
  return [theme, setTheme];
}
