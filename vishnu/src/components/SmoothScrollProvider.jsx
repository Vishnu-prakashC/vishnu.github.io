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
    const section = document.getElementById(id);
    if (!section) return;

    const { offset = 0 } = options;
    const content = section.querySelector(".section-content") || section;
    const rect = content.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const viewportHeight = window.innerHeight;
    const contentHeight = rect.height;

    const ratio = Math.min(contentHeight / viewportHeight, 1);
    const isTallContent = contentHeight >= viewportHeight * 0.9;
    const navHeight =
      document.querySelector('nav[aria-label="Main"]')?.getBoundingClientRect().height ?? 72;

    // Fine-tune specific sections without breaking reusable behavior.
    const sectionAdjustments = {
      skills: -22, // Skills was landing too high; push content slightly down.
      projects: 34, // Projects should land a little higher (like your reference).
    };

    let targetY;
    if (isTallContent) {
      // For tall content blocks, top-anchor below navbar is visually more stable than centering.
      targetY = absoluteTop - (navHeight + 18);
    } else {
      // For shorter blocks, center with a dynamic upward bias.
      const centeredY = absoluteTop - (viewportHeight - contentHeight) / 2;
      const dynamicBias = 44 - ratio * 24;
      targetY = centeredY - dynamicBias;
    }

    targetY = targetY + (sectionAdjustments[id] ?? 0) + offset;

    const maxScroll =
      document.documentElement.scrollHeight - viewportHeight;
    const clampedTarget = Math.max(0, Math.min(targetY, maxScroll));

    window.scrollTo({
      top: clampedTarget,
      behavior: "smooth",
    });
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
