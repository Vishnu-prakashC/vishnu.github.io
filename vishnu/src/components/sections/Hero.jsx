import { memo, useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroTitle, heroSubtitle, motionTransition } from "../../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Creative Full-Stack Developer";
const MAGNETIC_STRENGTH = 0.2;
const MAGNETIC_RADIUS = 120;

function Hero({ onTriggerWave, isWaveBusy }) {
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const lettersRef = useRef([]);
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > MAGNETIC_RADIUS) return;
    const pull = 1 - dist / MAGNETIC_RADIUS;
    setMagnetic({
      x: dx * MAGNETIC_STRENGTH * pull,
      y: dy * MAGNETIC_STRENGTH * pull,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setMagnetic({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  // Letter-by-letter headline animation
  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    if (!letters.length) return;
    gsap.set(letters, { opacity: 0, y: 24 });
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.03,
      delay: 0.25,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });

    tl.fromTo(
      content,
      { opacity: 0.85, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1 }
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  const handleClick = () => {
    if (isWaveBusy || !onTriggerWave) return;
    gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1 });
    gsap.to(buttonRef.current, { scale: 1, duration: 0.15, delay: 0.05 });
    onTriggerWave();
  };

  return (
    <section
      ref={sectionRef}
      className="hero grid min-h-screen grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16"
    >
      <div ref={contentRef} className="hero-content max-w-2xl">
        <motion.h1
          className="font-heading text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
          variants={heroTitle}
          initial="initial"
          animate="animate"
        >
          Hi, I'm <span className="text-[var(--color-primary)]">Vichu</span>
        </motion.h1>
        <p
          className="font-heading mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)]/90 sm:text-3xl md:text-4xl"
          aria-label={HEADLINE}
        >
          {HEADLINE.split("").map((char, i) => (
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
        <motion.p
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text)]/60 md:text-xl"
          variants={heroSubtitle}
          initial="initial"
          animate="animate"
          transition={{ ...motionTransition.medium, delay: 0.4 }}
        >
          I design and build immersive digital experiences using modern web
          technologies and 3D graphics.
        </motion.p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.25 }}
        >
          <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            disabled={isWaveBusy}
            className="hover-scale-on-hover rounded-full bg-[var(--color-primary)] px-8 py-4 font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              transform: `translate(${magnetic.x}px, ${magnetic.y}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            View Projects
          </button>
        </motion.div>
      </div>
      <div className="hero-visual hidden items-center justify-center lg:flex">
        <div
          className="aspect-square w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-[var(--color-accent)]/20"
          aria-hidden
        />
      </div>
    </section>
  );
}

export default memo(Hero);
