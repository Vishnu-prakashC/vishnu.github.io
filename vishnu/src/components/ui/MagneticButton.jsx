import { useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({ children }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      btnRef.current.getBoundingClientRect();

    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    gsap.to(btnRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium border border-white/25 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_24px_rgba(99,102,241,0.25)] transition-all duration-300"
    >
      {children}
    </button>
  );
}
