import { memo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroTitle, heroSubtitle } from "../../utils/motion";
import MagneticButton from "../ui/MagneticButton";

// Use high‑res source (e.g. 1000px+ wide) for sharp display at 340px; replace src/assets/images/profile.jpeg if blurry
const profileImage = new URL("../../assets/images/profile.jpeg", import.meta.url).href;

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Creative Full-Stack Developer";

function Hero({ onTriggerWave, isWaveBusy }) {
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;
    const runAnimation = () => {
      if (cancelled) return;
      const letters = lettersRef.current.filter(Boolean);
      if (letters.length !== HEADLINE.length) return;
      gsap.set(letters, { opacity: 0, y: 14 });
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.02,
        delay: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    };
    const tick = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          runAnimation();
          if (lettersRef.current.filter(Boolean).length !== HEADLINE.length) {
            timeoutId = setTimeout(runAnimation, 120);
          }
        });
      });
    };
    tick();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
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
      className="hero flex min-h-screen flex-col items-center justify-center gap-[60px] pl-0 pr-6 sm:pl-1 sm:pr-10 md:flex-row md:items-center md:justify-between md:gap-[60px] md:pl-1 lg:max-w-6xl lg:mx-auto lg:pl-2"
    >
      {/* Left: text content */}
      <div ref={contentRef} className="hero-content -ml-3 max-w-2xl text-center md:-ml-4 md:text-left lg:-ml-6">
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
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text)]/60 md:text-xl mx-auto md:mx-0"
          variants={heroSubtitle}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.36, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          I design and build immersive digital experiences using modern web
          technologies and 3D graphics.
        </motion.p>
        <motion.div
          className="mt-12 flex justify-center md:justify-start"
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

      {/* Right: profile image card — 340px desktop, 28px radius, sharp rendering */}
      <div className="hero-visual flex shrink-0 justify-center items-center w-full md:w-auto">
        <motion.div
          className="profile-card w-[240px] sm:w-[300px] md:w-[340px] aspect-[3/4] bg-transparent shadow-xl"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)",
          }}
          aria-hidden
        >
          <img
            src={profileImage}
            alt="Vichu — Creative Developer"
            className="profile-image object-center"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
