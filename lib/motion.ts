export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  micro: 0.18,
  short: 0.26,
  reveal: 0.62,
  hero: 0.86,
  overlay: 0.34,
} as const;

export const revealViewport = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -72px 0px",
} as const;

export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
} as const;

export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
} as const;

export const heroItemVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
} as const;

export const menuPanelVariants = {
  hidden: {
    opacity: 0,
    y: -14,
    scale: 0.98,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.985,
    filter: "blur(8px)",
  },
} as const;

export const modalVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.99,
    filter: "blur(8px)",
  },
} as const;
