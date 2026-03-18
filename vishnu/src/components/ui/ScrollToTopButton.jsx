import { memo, useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const VISIBILITY_SCROLL_THRESHOLD = 300;
const TOP_THRESHOLD = 50;

function ScrollToTopButton({ waveRef }) {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const isScrollingToTopRef = useRef(false);
  const isHandlingClickRef = useRef(false);
  const fallbackScrollListenerRef = useRef(null);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const updateVisibility = () => {
      ticking = false;
      const scrollY = window.scrollY;

      if (isScrollingToTopRef.current) {
        if (scrollY <= TOP_THRESHOLD) {
          isScrollingToTopRef.current = false;
          setIsVisible(false);
        }
        return;
      }

      const shouldShow = scrollY > VISIBILITY_SCROLL_THRESHOLD;
      setIsVisible((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const clearFallbackListener = useCallback(() => {
    if (fallbackScrollListenerRef.current) {
      window.removeEventListener("scroll", fallbackScrollListenerRef.current, { passive: true });
      fallbackScrollListenerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearFallbackListener;
  }, [clearFallbackListener]);

  const handleScrollToTop = useCallback(() => {
    if (isHandlingClickRef.current) return;
    isHandlingClickRef.current = true;

    setShowRipple(true);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    const triggerWave = waveRef?.current?.triggerWave;
    const waveStarted =
      typeof triggerWave === "function" &&
      triggerWave({
        onCover: scrollToTop,
        onComplete: () => {
          isScrollingToTopRef.current = false;
          setIsVisible(false);
          isHandlingClickRef.current = false;
          clearFallbackListener();
        },
      }) === true;

    if (!waveStarted) {
      isScrollingToTopRef.current = true;
      scrollToTop();

      const onScrollForFallback = () => {
        if (window.scrollY <= TOP_THRESHOLD) {
          clearFallbackListener();
          isScrollingToTopRef.current = false;
          setIsVisible(false);
          isHandlingClickRef.current = false;
        }
      };
      fallbackScrollListenerRef.current = onScrollForFallback;
      window.addEventListener("scroll", onScrollForFallback, { passive: true });
    }
  }, [waveRef, prefersReducedMotion, clearFallbackListener]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed bottom-6 right-6 z-[90] sm:bottom-7 sm:right-7 md:bottom-8 md:right-8"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            onClick={handleScrollToTop}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.1,
                    boxShadow:
                      "0 18px 38px -16px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.14), 0 0 40px -8px rgba(0,240,255,0.78), 0 0 72px -18px rgba(255,78,205,0.45)",
                  }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[rgba(12,14,24,0.55)] text-[var(--color-text)] shadow-[0_14px_34px_-16px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:h-12 sm:w-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
            style={{
              boxShadow:
                "0 14px 34px -16px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08), 0 0 28px -10px rgba(0,240,255,0.5)",
            }}
            aria-label="Scroll back to top"
          >
            <AnimatePresence>
              {showRipple && (
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-[var(--color-accent-cyan)]"
                  style={{
                    background: "radial-gradient(circle, rgba(0,240,255,0.25) 0%, transparent 70%)",
                    boxShadow: "0 0 24px rgba(0,240,255,0.4)",
                  }}
                  initial={{ scale: 0.6, opacity: 1 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.2 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onAnimationComplete={() => setShowRipple(false)}
                  aria-hidden
                />
              )}
            </AnimatePresence>
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-80 blur-[10px] transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 60%, rgba(0,240,255,0.34) 0%, rgba(108,123,255,0.14) 45%, rgba(255,78,205,0.08) 70%, transparent 100%)",
              }}
              aria-hidden
            />
            <svg
              viewBox="0 0 24 24"
              className="relative z-10 h-[19px] w-[19px] sm:h-5 sm:w-5"
              fill="none"
              aria-hidden
            >
              <path
                d="M6.5 13.5L12 8l5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default memo(ScrollToTopButton);
