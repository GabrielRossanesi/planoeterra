"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionDurations, premiumEase } from "@/lib/motion";

type MotionSurfaceProps = {
  children: ReactNode;
  className?: string;
  lift?: number;
};

export function MotionSurface({
  children,
  className = "",
  lift = 5,
}: MotionSurfaceProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -lift,
              scale: 1.004,
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: motionDurations.short, ease: premiumEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
