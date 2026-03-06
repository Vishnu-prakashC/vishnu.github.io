import { memo } from "react";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "../../utils/motion";

function About() {
  return (
    <motion.section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      initial="initial"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount: 0.25 }}
      variants={{
        initial: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.12 },
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
        <motion.div
          className="mx-auto mb-8 h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
          variants={scrollReveal}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        />
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
