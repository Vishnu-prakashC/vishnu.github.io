import { useEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollContext } from "../contexts/ScrollContext";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  const scrollToSection = useCallback((id, options = {}) => {
    const el = document.getElementById(id);
    if (!el) return;
    const { offset = -80, duration = 1.5 } = options;
    const easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    if (lenisRef.current) {
      // Lenis accepts selector string (e.g. "#skills") for reliable scroll-to-element
      lenisRef.current.scrollTo(`#${id}`, {
        offset,
        duration,
        easing,
      });
    } else {
      // Fallback when Lenis isn't ready (e.g. before mount)
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y + offset, behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // proxy the scroll container so ScrollTrigger is aware of Lenis
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Sync ScrollTrigger with Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    // when windows resizes, update ScrollTrigger
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.scrollerProxy(document.body, {});
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToSection, scrollToTop }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
