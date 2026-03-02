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
          className="text-4xl md:text-5xl font-bold mb-6"
          variants={scrollReveal}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-white/60 text-lg leading-relaxed"
          variants={scrollReveal}
        >
          I am an engineering student passionate about building scalable web
          applications, real-time systems, and immersive experiences using
          modern frontend technologies.
        </motion.p>
      </div>
    </motion.section>
  );
}

export default memo(About);
