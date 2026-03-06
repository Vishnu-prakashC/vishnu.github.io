import { memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

const OPTIONS = [
  { value: "dark", label: "Dark", icon: "☽" },
  { value: "light", label: "Light", icon: "☀" },
  { value: "system", label: "System", icon: "◐" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const index = OPTIONS.findIndex((o) => o.value === theme);

  return (
    <div
      className="relative flex min-w-[8rem] rounded-full border border-[var(--color-text)]/15 bg-[var(--color-bg)] p-0.5"
      role="group"
      aria-label="Theme"
    >
      <motion.div
        className="absolute top-0.5 bottom-0.5 w-[calc(33.333%-0.125rem)] rounded-full bg-[var(--color-primary)]"
        style={{ left: "0.125rem" }}
        layout
        initial={false}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        animate={{ x: `${index * 100}%` }}
      />
      {OPTIONS.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setTheme(opt.value)}
          className="relative z-10 flex flex-1 items-center justify-center py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] min-w-0"
          style={{
            color: theme === opt.value ? "white" : "var(--color-text)",
            opacity: theme === opt.value ? 1 : 0.7,
          }}
          aria-pressed={theme === opt.value}
          aria-label={`Theme: ${opt.label}`}
        >
          <span className="text-base leading-none" aria-hidden>
            {opt.icon}
          </span>
        </button>
      ))}
    </div>
  );
}

export default memo(ThemeToggle);
