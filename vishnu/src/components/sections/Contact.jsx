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
      viewport={{ ...viewportOnce, amount: 0.2 }}
      variants={{
        initial: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.08 },
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
        className="mx-auto mb-10 h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
        variants={scrollReveal}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6"
        variants={{ initial: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
      >
        <motion.a
          href="mailto:hello@vichu.dev"
          variants={scrollReveal}
          whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(108,123,255,0.25)" }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full bg-[var(--color-primary)] px-8 py-4 font-medium text-white transition-colors hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          Get in touch
        </motion.a>
        <motion.a
          href="#"
          variants={scrollReveal}
          whileHover={{ scale: 1.05, borderColor: "rgba(255,78,205,0.5)" }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full border border-white/20 px-8 py-4 font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          View resume
        </motion.a>
      </motion.div>
    </motion.section>
  );
}

export default memo(Contact);
