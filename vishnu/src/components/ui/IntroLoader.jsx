import { useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";

const TIMELINE = {
  logoIn: 0,
  textSlide: 0.5,
  backgroundGlow: 1.5,
  revealSite: 2.5,
};

export default function IntroLoader({ onFinish }) {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const glow = glowRef.current;
    if (!loader || !logo || !text || !glow) return;

    let cancelled = false;
    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          onFinish?.();
        },
      });
      tlRef.current = tl;

      // 0s — black screen, logo fade in
      tl.fromTo(logo, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, TIMELINE.logoIn);

      // 0.5s — text slide in
      tl.fromTo(
        text,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        TIMELINE.textSlide
      );

      // 1.5s — background glow
      tl.to(glow, { opacity: 1, scale: 1.2, duration: 1, ease: "power2.inOut" }, TIMELINE.backgroundGlow);

      // 2.5s — reveal site (fade out loader)
      tl.to(loader, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, TIMELINE.revealSite);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [onFinish]);

  if (!loading) return null;

  return (
    <div
      ref={loaderRef}
      className="loader fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
      aria-hidden="true"
    >
      {/* Subtle background glow (hidden until 1.5s) */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(108,123,255,0.15) 0%, transparent 70%)",
        }}
      />
      <h1
        ref={logoRef}
        className="loader-logo font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white"
        style={{ opacity: 0 }}
      >
        Vichu
      </h1>
      <p
        ref={textRef}
        className="loader-text mt-3 font-mono text-sm uppercase tracking-widest text-white/60"
        style={{ opacity: 0 }}
      >
        Creative Developer
      </p>
    </div>
  );
}
