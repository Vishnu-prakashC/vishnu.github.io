import { memo, useRef, useEffect } from "react";

const SHAPES = [
  { size: 120, left: "8%", top: "20%", delay: 0, duration: 12 },
  { size: 80, left: "85%", top: "15%", delay: 2, duration: 14 },
  { size: 60, left: "75%", top: "70%", delay: 1, duration: 10 },
  { size: 100, left: "15%", top: "65%", delay: 3, duration: 16 },
  { size: 50, left: "50%", top: "85%", delay: 0.5, duration: 11 },
  { size: 70, left: "92%", top: "45%", delay: 1.5, duration: 13 },
];

function FloatingShapes() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapes = container.querySelectorAll("[data-float-shape]");
    let rafId;
    const start = performance.now();

    const tick = () => {
      const t = (performance.now() - start) * 0.001;
      shapes.forEach((el, i) => {
        const d = el.dataset.duration ? parseFloat(el.dataset.duration) : 12;
        const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
        const y = Math.sin(t + delay) * 8;
        const rot = (t * 15 + i * 40) % 360;
        el.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {SHAPES.map((s, i) => (
        <div
          key={i}
          data-float-shape
          data-duration={s.duration}
          data-delay={s.delay}
          className="absolute rounded-full opacity-[0.04]"
          style={{
            width: s.size,
            height: s.size,
            left: s.left,
            top: s.top,
            background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />
      ))}
    </div>
  );
}

export default memo(FloatingShapes);
