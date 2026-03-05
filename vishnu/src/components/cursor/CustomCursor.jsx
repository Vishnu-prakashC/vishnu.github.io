import { memo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const CURSOR_STATES = {
  default: "default",
  hover: "hover",
  viewProject: "view-project",
};

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [state, setState] = useState(CURSOR_STATES.default);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const isTouch = () => !window.matchMedia("(pointer: fine)").matches;
    if (isTouch()) return;

    const handleMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!visible) setVisible(true);
        rafRef.current = null;
      });
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    document.body.addEventListener("mousemove", handleMove);
    document.body.addEventListener("mouseleave", handleLeave);
    document.body.addEventListener("mouseenter", handleEnter);

    return () => {
      document.body.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("mouseleave", handleLeave);
      document.body.removeEventListener("mouseenter", handleEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  useEffect(() => {
    const isTouch = () => !window.matchMedia("(pointer: fine)").matches;
    if (isTouch()) return;

    const handleOver = (e) => {
      const target = e.target.closest("[data-cursor-label]");
      if (target) {
        setState(CURSOR_STATES.viewProject);
        setLabel(target.getAttribute("data-cursor-label") || "View");
        return;
      }
      const hoverTarget = e.target.closest("[data-cursor-hover]");
      if (hoverTarget) {
        setState(CURSOR_STATES.hover);
        setLabel("");
        return;
      }
      setState(CURSOR_STATES.default);
      setLabel("");
    };

    document.body.addEventListener("mouseover", handleOver);
    return () => document.body.removeEventListener("mouseover", handleOver);
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, [visible]);

  if (typeof window === "undefined") return null;
  const isTouch = !window.matchMedia("(pointer: fine)").matches;
  if (isTouch) return null;

  const scale = state === CURSOR_STATES.viewProject ? 1.8 : state === CURSOR_STATES.hover ? 1.4 : 1;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: position.x, y: position.y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-bg)]/80 backdrop-blur-sm"
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {label ? (
          <span className="font-mono text-xs font-medium text-[var(--color-primary)]">
            {label}
          </span>
        ) : null}
      </motion.div>
      <div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]"
      />
    </motion.div>
  );
}

export default memo(CustomCursor);
