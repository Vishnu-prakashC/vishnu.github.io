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
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left overflow-hidden"
      aria-hidden
    >
      <div
        className="h-full w-full origin-left opacity-30"
        style={{
          background: "linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-accent-cyan) 100%)",
        }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 z-10 origin-left rounded-r-full"
        animate={{ scaleX: progress }}
        transition={{ type: "spring", stiffness: 100, damping: 28 }}
        style={{
          width: "100%",
          background: "linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 70%)",
          boxShadow: "0 0 20px var(--color-primary)",
        }}
      />
    </div>
  );
}

export default memo(ScrollProgress);
