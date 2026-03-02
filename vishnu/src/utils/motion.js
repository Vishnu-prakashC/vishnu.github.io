/**
 * Minimal motion system — performance first.
 * Only transform + opacity. No animation longer than 350ms.
 * Use will-change only on hover (via component logic or CSS).
 */

const MAX_DURATION = 0.35;

export const motionDurations = {
  fast: 120,
  medium: 200,
  slow: 350,
};

export const motionEasing = {
  easeOut: [0.25, 0.46, 0.45, 0.94],
};

export const motionTransition = {
  fast: { duration: motionDurations.fast / 1000, ease: motionEasing.easeOut },
  medium: { duration: motionDurations.medium / 1000, ease: motionEasing.easeOut },
  slow: { duration: motionDurations.slow / 1000, ease: motionEasing.easeOut },
  page: { duration: 0.28, ease: motionEasing.easeOut },
};

export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
};

export const heroTitle = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: MAX_DURATION, ease: motionEasing.easeOut } },
};

export const heroSubtitle = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: MAX_DURATION, delay: 0.08, ease: motionEasing.easeOut },
  },
};

export const hoverScaleSubtle = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export const navLinkUnderline = {
  rest: { opacity: 0, scaleX: 0 },
  hover: { opacity: 1, scaleX: 1 },
};

export const scrollReveal = {
  initial: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MAX_DURATION, ease: motionEasing.easeOut },
  },
};

export const viewportOnce = { once: true, margin: "-40px", amount: 0.15 };
