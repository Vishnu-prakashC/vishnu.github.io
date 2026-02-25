import { memo } from "react";
import { motion } from "framer-motion";

/**
 * Reusable stagger reveal wrapper for project cards (or any list item).
 * Animates in when entering viewport; delay is driven by delayIndex for stagger.
 * Does not alter children content or structure.
 */
function AnimatedReveal({ children, delayIndex = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: delayIndex * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

export default memo(AnimatedReveal);
