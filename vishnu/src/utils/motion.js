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
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
  },
};

export const heroSubtitle = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      delay: 0.08,
      ease: [0.4, 0, 0.2, 1],
    },
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

// ——— Advanced portfolio: smoother, longer transitions ———
export const motionEasingAdvanced = {
  smooth: [0.32, 0.72, 0, 1],
  smoothOut: [0.33, 1, 0.68, 1],
  gentle: [0.4, 0, 0.2, 1],
};

export const motionTransitionAdvanced = {
  section: { duration: 0.6, ease: motionEasingAdvanced.smooth },
  element: { duration: 0.5, ease: motionEasingAdvanced.smoothOut },
  staggerShort: 0.08,
  staggerMedium: 0.12,
  staggerLong: 0.16,
  delayChildren: 0.2,
};

export const scrollRevealAdvanced = {
  initial: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: motionEasingAdvanced.smooth,
    },
  },
};

export const scrollRevealScale = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: motionEasingAdvanced.smoothOut },
  },
};

export const viewportOnceSmooth = { once: true, margin: "-60px", amount: 0.2 };

// ——— Gentle + speed: soft easing, quicker but smooth (0.35–0.5s) ———
export const motionEasingGentle = {
  inOut: [0.45, 0, 0.15, 1],
  out: [0.25, 0.1, 0.25, 1],
  soft: [0.4, 0, 0.2, 1],
};

export const motionTransitionGentle = {
  fast: { duration: 0.35, ease: [0.45, 0, 0.15, 1] },
  medium: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  staggerTight: 0.04,
  staggerNormal: 0.06,
  staggerWide: 0.1,
  delayChildren: 0.12,
};

export const scrollRevealGentle = {
  initial: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.4, 0, 0.2, 1] },
  },
};

export const scrollRevealScaleGentle = {
  initial: { opacity: 0, y: 16, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.45, 0, 0.15, 1] },
  },
};

export const fadeInGentle = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};
