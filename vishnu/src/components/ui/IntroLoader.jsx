import { useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";

const TIMELINE = {
  logoIn: 0,
  textLetters: 0.6,
  backgroundGlow: 2,
  revealSite: 2.8,
};

const INTRO_TEXT = "Creative Developer";

export default function IntroLoader({ onFinish }) {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const lettersRef = useRef([]);
  const glowRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;
    const letters = lettersRef.current.filter(Boolean);
    const glow = glowRef.current;
    if (!loader || !logo || !glow) return;

    let cancelled = false;
    let safetyTimeoutId;

    const finish = () => {
      if (cancelled) return;
      clearTimeout(safetyTimeoutId);
      setLoading(false);
      onFinish?.();
    };

    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;

      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;

      // Logo: scale from 0 with glow emerge
      tl.fromTo(
        logo,
        { scale: 0, opacity: 0, filter: "blur(8px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.2)" },
        TIMELINE.logoIn
      );

      // Letter-by-letter text
      if (letters.length) {
        tl.fromTo(
          letters,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.035,
            ease: "sine.out",
          },
          TIMELINE.textLetters
        );
      }

      // Background glow
      tl.to(
        glow,
        { opacity: 1, scale: 1.25, duration: 0.9, ease: "sine.inOut" },
        TIMELINE.backgroundGlow
      );

      // Reveal site
      tl.to(loader, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, TIMELINE.revealSite);
    });

    safetyTimeoutId = setTimeout(finish, 5000);

    return () => {
      cancelled = true;
      clearTimeout(safetyTimeoutId);
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
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(108,123,255,0.2) 0%, rgba(255,78,205,0.06) 40%, transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center">
        <h1
          ref={logoRef}
          className="loader-logo font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(108,123,255,0.4)]"
          style={{ opacity: 0, transformOrigin: "center" }}
        >
          Vichu
        </h1>
        <p
          className="loader-text mt-4 font-mono text-sm uppercase tracking-[0.25em] text-white/70"
          aria-hidden
        >
          {INTRO_TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el; }}
              className="inline-block"
              style={{ opacity: 0 }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
