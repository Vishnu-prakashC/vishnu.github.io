import { memo, useRef, useEffect, useState } from "react";

const RING_LERP = 0.16;
const AURA_LERP = 0.07;
const CURSOR_STATES = {
  default: "default",
  hover: "hover",
  viewProject: "view-project",
};

const CLASS_CUSTOM_CURSOR_ACTIVE = "custom-cursor-active";

function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(CURSOR_STATES.default);
  const [label, setLabel] = useState("");
  const [ripples, setRipples] = useState([]);
  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const auraRef = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isTouch = () => !window.matchMedia("(pointer: fine)").matches;
    if (isTouch()) return;
    document.documentElement.classList.add(CLASS_CUSTOM_CURSOR_ACTIVE);
    return () => document.documentElement.classList.remove(CLASS_CUSTOM_CURSOR_ACTIVE);
  }, []);

  useEffect(() => {
    const isTouch = () => !window.matchMedia("(pointer: fine)").matches;
    if (isTouch()) return;

    const handleMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    const handleDown = () => {
      const { x, y } = posRef.current;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 500);
    };

    document.body.addEventListener("mousemove", handleMove);
    document.body.addEventListener("mouseleave", handleLeave);
    document.body.addEventListener("mouseenter", handleEnter);
    document.body.addEventListener("mousedown", handleDown);

    return () => {
      document.body.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("mouseleave", handleLeave);
      document.body.removeEventListener("mouseenter", handleEnter);
      document.body.removeEventListener("mousedown", handleDown);
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

  const targetScale = state === CURSOR_STATES.viewProject ? 1.65 : state === CURSOR_STATES.hover ? 1.3 : 1;

  useEffect(() => {
    if (!visible || !containerRef.current) return;

    ringRef.current = { x: posRef.current.x, y: posRef.current.y };
    auraRef.current = { x: posRef.current.x, y: posRef.current.y };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      const target = posRef.current;
      const ring = ringRef.current;
      const aura = auraRef.current;

      ring.x = lerp(ring.x, target.x, RING_LERP);
      ring.y = lerp(ring.y, target.y, RING_LERP);
      aura.x = lerp(aura.x, target.x, AURA_LERP);
      aura.y = lerp(aura.y, target.y, AURA_LERP);
      scaleRef.current = lerp(scaleRef.current, targetScale, 0.18);

      const ringEl = containerRef.current?.querySelector("[data-cursor-ring]");
      if (ringEl) ringEl.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${scaleRef.current})`;
      const auraEl = containerRef.current?.querySelector("[data-cursor-aura]");
      if (auraEl) auraEl.style.transform = `translate(${aura.x}px, ${aura.y}px) translate(-50%, -50%) scale(${scaleRef.current * 1.4})`;
      const leadEl = containerRef.current?.querySelector("[data-cursor-lead]");
      if (leadEl) leadEl.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`;
      const labelEl = containerRef.current?.querySelector("[data-cursor-label-wrap]");
      if (labelEl) labelEl.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -100%) translateY(-12px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [visible, targetScale]);

  if (typeof window === "undefined") return null;
  if (!window.matchMedia("(pointer: fine)").matches) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease-out" }}
      aria-hidden
    >
      {/* Outer aura — soft gradient, blurred, lags behind */}
      <div
        data-cursor-aura
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: 72,
          height: 72,
          transform: `translate(${auraRef.current.x}px, ${auraRef.current.y}px) translate(-50%, -50%) scale(${scaleRef.current * 1.4})`,
          background: "radial-gradient(circle, rgba(108,123,255,0.18) 0%, rgba(255,78,205,0.08) 40%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* Inner ring — gradient stroke */}
      <div
        data-cursor-ring
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: 36,
          height: 36,
          transform: `translate(${ringRef.current.x}px, ${ringRef.current.y}px) translate(-50%, -50%) scale(${scaleRef.current})`,
          padding: "2px",
          background: "linear-gradient(135deg, #6C7BFF 0%, #FF4ECD 45%, #00F0FF 100%)",
          boxShadow: "0 0 28px -6px rgba(108,123,255,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <div className="h-full w-full rounded-full bg-[var(--color-bg)]" style={{ background: "var(--color-bg)" }} />
      </div>

      {/* Center dot */}
      <div
        data-cursor-lead
        className="absolute left-0 top-0 rounded-full bg-white"
        style={{
          width: 5,
          height: 5,
          transform: `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.15), 0 0 16px 3px rgba(255,255,255,0.45), 0 0 24px 0 rgba(108,123,255,0.2)",
        }}
      />

      {/* Click ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute left-0 top-0"
          style={{
            transform: `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)`,
          }}
        >
          <div
            className="cursor-ripple rounded-full border-2 border-[var(--color-primary)]"
            style={{
              width: 40,
              height: 40,
              opacity: 0.6,
            }}
          />
        </div>
      ))}

      {label && (
        <div
          data-cursor-label-wrap
          className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/20 bg-[var(--color-bg)]/95 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/95 backdrop-blur-md"
          style={{
            transform: `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -100%) translateY(-12px)`,
            boxShadow: "0 4px 24px -4px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export default memo(CustomCursor);
