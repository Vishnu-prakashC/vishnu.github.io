import { memo } from "react";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce } from "../../utils/motion";

function Contact() {
  return (
    <motion.section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
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
      <motion.h2
        className="font-heading text-4xl font-bold md:text-5xl mb-4"
        variants={scrollReveal}
      >
        Let's work together
      </motion.h2>
      <motion.p
        className="text-[var(--color-text)]/60 mb-12 max-w-lg text-center text-lg"
        variants={scrollReveal}
      >
        Open to collaborations, freelance projects, and full-time opportunities.
      </motion.p>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6"
        variants={scrollReveal}
      >
        <a
          href="mailto:hello@vichu.dev"
          className="rounded-full bg-[var(--color-primary)] px-8 py-4 font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          Get in touch
        </a>
        <a
          href="#"
          className="rounded-full border border-white/20 px-8 py-4 font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          View resume
        </a>
      </motion.div>
    </motion.section>
  );
}

export default memo(Contact);
