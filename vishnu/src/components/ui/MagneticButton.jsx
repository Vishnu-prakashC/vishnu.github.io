import { memo, useRef, useState, useCallback, forwardRef } from "react";

const DEFAULT_STRENGTH = 0.22;
const DEFAULT_RADIUS = 140;

/**
 * Magnetic button: slightly follows cursor within radius for premium micro-interaction.
 */
const MagneticButton = memo(forwardRef(function MagneticButton(
  {
    children,
    className = "",
    strength = DEFAULT_STRENGTH,
    radius = DEFAULT_RADIUS,
    as: Component = "button",
    ...props
  },
  ref
) {
  const innerRef = useRef(null);
  const setRefs = useCallback(
    (el) => {
      innerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref]
  );
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius) {
        setOffset({ x: 0, y: 0 });
        return;
      }
      const pull = 1 - dist / radius;
      setOffset({
        x: dx * strength * pull,
        y: dy * strength * pull,
      });
    },
    [radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <Component
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.22s cubic-bezier(0.4, 0.2, 0.2, 1)",
      }}
      {...props}
    >
      {children}
    </Component>
  );
}));

export default MagneticButton;
