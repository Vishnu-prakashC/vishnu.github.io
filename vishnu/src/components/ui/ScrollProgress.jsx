import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? scrollTop / height : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-[var(--color-primary)]/20"
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-[var(--color-primary)]"
        style={{ scaleX: progress }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
    </div>
  );
}

export default memo(ScrollProgress);
