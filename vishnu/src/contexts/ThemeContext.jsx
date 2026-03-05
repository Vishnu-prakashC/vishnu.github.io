import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
  resolved: "dark",
});

function getStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "dark";
  } catch {
    return "dark";
  }
}

function getResolved(theme) {
  if (theme === "system") {
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return theme;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => getStored());
  const [resolved, setResolved] = useState("dark");

  useEffect(() => {
    const next = getResolved(theme);
    setResolved(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handle = () => setResolved(getResolved("system"));
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, [theme]);

  const setTheme = (value) => setThemeState(value);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
