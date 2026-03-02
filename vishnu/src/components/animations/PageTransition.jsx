import { motion, AnimatePresence } from "framer-motion";
import { motionTransition } from "../../utils/motion";

/**
 * Page-level fade transition wrapper.
 * Use around route content or main app content for fade in/out.
 * GPU-friendly: opacity only, duration ≤ 400ms.
 */
export default function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={motionTransition.page}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
