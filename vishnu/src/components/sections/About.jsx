import { memo } from "react";
import { motion } from "framer-motion";
import {
  scrollRevealGentle,
  viewportOnceSmooth,
  motionTransitionGentle,
  motionEasingGentle,
} from "../../utils/motion";

const sectionVariants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTransitionGentle.staggerNormal,
      delayChildren: motionTransitionGentle.delayChildren,
    },
  },
};

const itemVariants = scrollRevealGentle;

function About() {
  return (
    <motion.section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial="initial"
      whileInView="visible"
      viewport={viewportOnceSmooth}
      variants={sectionVariants}
    >
      <div className="section-content max-w-3xl text-center">
        <motion.h2
          className="font-heading text-4xl font-bold mb-6 md:text-5xl"
          variants={itemVariants}
        >
          About Me
        </motion.h2>
        <motion.div
          className="mx-auto mb-8 h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnceSmooth}
          transition={{ duration: 0.5, ease: motionEasingGentle.inOut }}
        />
        <motion.p
          className="text-[var(--color-text)]/60 text-lg leading-relaxed"
          variants={itemVariants}
        >
          I am an Information Technology student at Kongu Engineering College, specializing in the intersection of Robust Development and User-Centric Design. My goal is to build secure, scalable applications that solve real-world problems through a combination of technical logic and visual precision.

Development: I leverage Java to architect efficient, backend-driven solutions, focusing on clean structure and data integrity.

Design: Using Figma, I translate complex IT requirements into high-fidelity, interactive prototypes that prioritize the user journey.

The IT Advantage: My background in Information Technology allows me to look beyond just the code; I consider security, networking, and system performance to ensure every project is enterprise-ready.
        </motion.p>
      </div>
    </motion.section>
  );
}

export default memo(About);
