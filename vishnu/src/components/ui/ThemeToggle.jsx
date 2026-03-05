import { memo } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const OPTIONS = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-full bg-[var(--color-text)]/10 p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setTheme(opt.value)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
            theme === opt.value
              ? "bg-[var(--color-primary)] text-white"
              : "text-[var(--color-text)]/80 hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/10"
          }`}
          aria-pressed={theme === opt.value}
          aria-label={`Theme: ${opt.label}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default memo(ThemeToggle);
