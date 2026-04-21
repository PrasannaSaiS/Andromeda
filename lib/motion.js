// Andromeda — Motion System

export const easing = {
  outExpo:  [0.16, 1, 0.3, 1],
  inOut:    [0.45, 0, 0.55, 1],
  spring:   [0.34, 1.56, 0.64, 1],
  smooth:   [0.25, 0.46, 0.45, 0.94],
};

export const duration = {
  instant:   0.1,
  fast:      0.2,
  normal:    0.45,
  slow:      0.75,
  cinematic: 1.1,
};

// ── Reveal variants ──────────────────────────────────────────────

export const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.outExpo },
  },
};

export const slideRight = {
  hidden:  { opacity: 0, x: 72, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
};

export const slideLeft = {
  hidden:  { opacity: 0, x: -72, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
};

export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
};

// ── Stagger containers ───────────────────────────────────────────

export const staggerContainer = (staggerDelay = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  },
});

export const staggerItem = {
  hidden:  { opacity: 0, y: 36, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
};

// ── Viewport config ──────────────────────────────────────────────

export const viewportConfig = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -60px 0px",
};

// ── Hover micro-interactions ─────────────────────────────────────

export const buttonHover = {
  scale: 1.03,
  y: -2,
  transition: { duration: 0.22, ease: easing.spring },
};

export const buttonTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

export const cardHover = {
  y: -8,
  transition: { duration: 0.35, ease: easing.outExpo },
};

export const arrowHover = {
  x: 6,
  transition: { duration: duration.fast, ease: easing.spring },
};
