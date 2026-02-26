import { useRef } from "react";

export default function MagneticButton({ children }) {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();

    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    buttonRef.current.style.transform =
      `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    buttonRef.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-4 bg-[#6C7BFF] text-white rounded-full transition-transform duration-300"
    >
      {children}
    </button>
  );
}
