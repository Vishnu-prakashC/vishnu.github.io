import { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScroll } from "../../contexts/ScrollContext";
import { useLocation } from "react-router-dom";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const dotTransition = { duration: 0.25, ease: [0.4, 0, 0.2, 1] };

function SectionIndicators() {
  const [activeId, setActiveId] = useState("hero");
  const { scrollToSection } = useScroll();
  const location = useLocation();
  const tickingRef = useRef(false);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionIds = SECTIONS.map((s) => s.id);

    const updateActive = () => {
      tickingRef.current = false;
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.4;
      let current = "hero";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;
        if (viewportMid >= top && viewportMid <= bottom) {
          current = sectionIds[i];
          break;
        }
        if (viewportMid > bottom) {
          current = sectionIds[i];
          break;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateActive);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const handleClick = (id) => {
    if (id === "hero") {
      const el = document.getElementById("hero");
      if (el) scrollToSection("hero", { duration: 1.2, offset: 0 });
      return;
    }
    scrollToSection(id, { duration: 1.2 });
  };

  if (location.pathname !== "/") return null;

  return (
    <nav
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      aria-label="Page sections"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <motion.button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            className="group flex items-center justify-end gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
            aria-label={`Go to ${label}`}
            aria-current={isActive ? "true" : undefined}
            initial={false}
            animate={{
              scale: isActive ? 1.2 : 1,
            }}
            transition={dotTransition}
          >
            <span
              className={`text-right font-mono text-[10px] uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text)]/50"
              }`}
            >
              {label}
            </span>
            <span
              className={`relative h-2 w-2 shrink-0 rounded-full transition-colors duration-200 ${
                isActive
                  ? "bg-[var(--color-primary)] shadow-[0_0_12px_var(--color-primary)]"
                  : "bg-[var(--color-text)]/30 group-hover:bg-[var(--color-text)]/50"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="section-indicator-ring"
                  className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]"
                  transition={dotTransition}
                  initial={false}
                />
              )}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}

export default memo(SectionIndicators);
