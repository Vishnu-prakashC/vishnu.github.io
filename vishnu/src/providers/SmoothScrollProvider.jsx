import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * Enhances scroll with Lenis smooth scrolling.
 * Uses requestAnimationFrame loop; does not replace native scroll behavior.
 * Wrap the entire app once (e.g. in main.jsx).
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
