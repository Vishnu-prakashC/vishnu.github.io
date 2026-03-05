import { memo } from "react";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "../../utils/motion";

function About() {
  return (
    <motion.section
      id="about"
      className="min-h-screen flex items-center justify-center px-6"
      initial="initial"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        initial: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
    >
      <div className="max-w-3xl text-center">
        <motion.h2
          className="font-heading text-4xl font-bold mb-6 md:text-5xl"
          variants={scrollReveal}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-[var(--color-text)]/60 text-lg leading-relaxed"
          variants={scrollReveal}
        >
          I design and build immersive digital experiences — from scalable web
          applications and real-time systems to 3D and interactive interfaces —
          using modern frontend technologies.
        </motion.p>
      </div>
    </motion.section>
  );
}

export default memo(About);
