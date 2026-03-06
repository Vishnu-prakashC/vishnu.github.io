import { memo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

const OPTIONS = [
  { value: "dark", label: "Dark", symbol: "◐", desc: "Dark mode" },
  { value: "light", label: "Light", symbol: "○", desc: "Light mode" },
  { value: "system", label: "System", symbol: "◑", desc: "System" },
];

function ThemeFloating() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  const current = OPTIONS.find((o) => o.value === theme) || OPTIONS[0];

  return (
    <div
      ref={ref}
      className="fixed bottom-8 left-8 z-[100] flex flex-col items-start gap-3"
      aria-label="Theme"
    >
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-[var(--color-bg)]/90 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            style={{
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(0,0,0,0.5), 0 0 80px -20px rgba(108,123,255,0.08)",
            }}
          >
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setTheme(opt.value);
                  setOpen(false);
                }}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                  theme === opt.value
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text)]/70 hover:text-[var(--color-text)] hover:bg-white/5"
                }`}
                aria-pressed={theme === opt.value}
                aria-label={opt.desc}
              >
                {theme === opt.value && (
                  <motion.span
                    layoutId="theme-active"
                    className="absolute inset-0 rounded-xl bg-[var(--color-primary)]/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 text-base leading-none opacity-90">{opt.symbol}</span>
                <span className="relative z-10 font-mono text-xs font-medium tracking-wide">{opt.label}</span>
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        style={{
          background: "linear-gradient(135deg, rgba(108,123,255,0.12) 0%, rgba(255,78,205,0.06) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px -8px rgba(0,0,0,0.25), 0 0 40px -12px rgba(108,123,255,0.15)",
        }}
        aria-label={`Theme: ${current.label}. Click to change.`}
      >
        <span className="text-xl leading-none text-[var(--color-text)]/90">{current.symbol}</span>
      </motion.button>
    </div>
  );
}

export default memo(ThemeFloating);
