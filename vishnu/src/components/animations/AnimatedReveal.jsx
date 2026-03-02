import { memo } from "react";
import { motion } from "framer-motion";
import { scrollReveal, viewportOnce, motionTransition } from "../../utils/motion";

/**
 * Reusable stagger reveal wrapper. Animates in when entering viewport.
 * GPU-friendly: opacity + y (transform). Use only transform & opacity.
 */
function AnimatedReveal({ children, delayIndex = 0 }) {
  const transition = {
    duration: motionTransition.medium.duration,
    delay: delayIndex * 0.08,
    ease: motionTransition.medium.ease,
  };

  return (
    <motion.div
      initial={scrollReveal.initial}
      whileInView={scrollReveal.visible}
      viewport={viewportOnce}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export default memo(AnimatedReveal);
