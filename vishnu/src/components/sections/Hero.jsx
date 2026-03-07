import { memo, useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroTitle, heroSubtitle } from "../../utils/motion";
import MagneticButton from "../ui/MagneticButton";
import Hero3D from "../three/Hero3D";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Creative Full-Stack Developer";

function Hero({ onTriggerWave, isWaveBusy }) {
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    if (!letters.length) return;
    gsap.set(letters, { opacity: 0, y: 18 });
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.38,
      stagger: 0.025,
      delay: 0.22,
      ease: "sine.out",
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
      { opacity: 0.9, scale: 0.99 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "sine.out" }
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  const handleClick = () => {
    if (isWaveBusy || !onTriggerWave) return;
    gsap.to(buttonRef.current, { scale: 0.97, duration: 0.12, ease: "sine.out" });
    gsap.to(buttonRef.current, { scale: 1, duration: 0.28, delay: 0.06, ease: "sine.out" });
    onTriggerWave();
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
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
          transition={{ delay: 0.36, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          I design and build immersive digital experiences using modern web
          technologies and 3D graphics.
        </motion.p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        >
          <MagneticButton
            ref={buttonRef}
            as="button"
            type="button"
            onClick={handleClick}
            disabled={isWaveBusy}
            className="hover-scale-on-hover rounded-full bg-[var(--color-primary)] px-8 py-4 font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:cursor-not-allowed disabled:opacity-70"
          >
            View Projects
          </MagneticButton>
        </motion.div>
      </div>
      <div className="hero-visual hidden items-center justify-center lg:flex">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden
        >
          <Hero3D />
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
