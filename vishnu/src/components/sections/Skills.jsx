import { memo } from "react";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "../../utils/motion";

const SKILLS = [
  "React",
  "Node",
  "Three.js",
  "MongoDB",
  "Tailwind",
  "GSAP",
  "WebGL",
];

function Skills() {
  return (
    <motion.section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial="initial"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        initial: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      }}
    >
      <motion.h2
        className="font-heading text-4xl font-bold md:text-5xl mb-4"
        variants={scrollReveal}
      >
        Skills & Tech
      </motion.h2>
      <motion.p
        className="text-[var(--color-text)]/60 mb-16 max-w-md text-center text-lg"
        variants={scrollReveal}
      >
        Technologies I use to build immersive experiences
      </motion.p>
      <div className="relative flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        <span className="font-mono text-sm uppercase tracking-widest text-[var(--color-primary)]/80">
          You
        </span>
        {SKILLS.map((skill, i) => (
          <motion.span
            key={skill}
            variants={scrollReveal}
            className="font-mono rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--color-text)]/90 transition-colors hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10"
          >
            {skill}
          </motion.span>
        ))}
      </div>
      <p className="mt-12 text-center text-sm text-[var(--color-text)]/40">
        Interactive 3D orbit coming next
      </p>
    </motion.section>
  );
}

export default memo(Skills);
