"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { premiumEase, revealVariants, revealViewport } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  initialVisible?: boolean;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  initialVisible = false,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : {
        duration: initialVisible ? 0.78 : 0.62,
        ease: premiumEase,
        delay: delay / 1000,
      };

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      animate={initialVisible || reduceMotion ? "visible" : undefined}
      whileInView={initialVisible || reduceMotion ? undefined : "visible"}
      viewport={revealViewport}
      variants={revealVariants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
