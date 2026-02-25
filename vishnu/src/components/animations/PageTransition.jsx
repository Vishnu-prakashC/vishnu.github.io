import { motion, AnimatePresence } from "framer-motion";

/**
 * Page-level fade transition wrapper.
 * Use around route content or main app content for fade in/out.
 * Duration 0.5s easeInOut; does not alter routing logic.
 */
export default function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
