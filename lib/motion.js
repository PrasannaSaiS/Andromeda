/**
 * Andromeda — Motion System
 *
 * Centralized animation variants and utilities for Framer Motion.
 * Based on the Andromeda design system motion guidelines.
 */

// ============================================
// EASING CURVES
// ============================================

export const easing = {
  outExpo: [0.16, 1, 0.3, 1],
  inOut: [0.45, 0, 0.55, 1],
  spring: [0.34, 1.56, 0.64, 1],
};

// ============================================
// DURATIONS (seconds)
// ============================================

export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
  cinematic: 1.0,
};

// ============================================
// REVEAL VARIANTS
// ============================================

/** Fade up — default for most content */
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.outExpo,
    },
  },
};

/** Fade in — no vertical movement */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease: easing.outExpo,
    },
  },
};

/** Slide from right */
export const slideRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easing.outExpo,
    },
  },
};

/** Slide from left */
export const slideLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easing.outExpo,
    },
  },
};

/** Scale up — for CTA card */
export const scaleUp = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.slow,
      ease: easing.outExpo,
    },
  },
};

// ============================================
// STAGGER CONTAINERS
// ============================================

/** Stagger children with configurable delay */
export const staggerContainer = (staggerDelay = 0.12) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

/** Stagger children — item variant */
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.outExpo,
    },
  },
};

// ============================================
// CHARACTER REVEAL (Hero headline)
// ============================================

export const characterRevealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    },
  },
};

export const characterRevealItem = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.cinematic,
      ease: easing.outExpo,
    },
  },
};

// ============================================
// VIEWPORT CONFIG (IntersectionObserver)
// ============================================

export const viewportConfig = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -50px 0px",
};

// ============================================
// HOVER MICRO-INTERACTIONS
// ============================================

export const buttonHover = {
  scale: 1.02,
  y: -1,
  transition: {
    duration: duration.fast,
    ease: easing.spring,
  },
};

export const buttonTap = {
  scale: 0.98,
  transition: {
    duration: duration.instant,
  },
};

export const arrowHover = {
  x: 6,
  transition: {
    duration: duration.fast,
    ease: easing.spring,
  },
};
