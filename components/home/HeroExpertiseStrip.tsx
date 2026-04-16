"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionDurations, premiumEase } from "@/lib/motion";

const expertiseItems = [
  "Usucapião",
  "Georreferenciamento",
  "Drone + RTK",
];

export function HeroExpertiseStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % expertiseItems.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: motionDurations.hero,
        ease: premiumEase,
        delay: 0.34,
      }}
      className="mt-14 w-full max-w-3xl"
    >
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: premiumEase,
          delay: 0.46,
        }}
        className="h-px origin-left bg-gradient-to-r from-mineral-100/0 via-mineral-100/36 to-mineral-100/0"
      />

      <div className="relative overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-2 hidden rounded-2xl border border-mineral-100/10 bg-mineral-50/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-sm sm:block"
          style={{ width: "33.333%" }}
          animate={{
            x: `${activeIndex * 100}%`,
            opacity: reduceMotion ? 0 : 1,
          }}
          transition={{
            duration: 1.45,
            ease: premiumEase,
          }}
        />

        <motion.ul
          className="relative grid text-sm text-mineral-100/70 sm:grid-cols-3"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.09,
                delayChildren: 0.52,
              },
            },
          }}
        >
          {expertiseItems.map((item, index) => {
            const active = activeIndex === index;

            return (
              <motion.li
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: motionDurations.reveal,
                  ease: premiumEase,
                }}
                onHoverStart={() => setActiveIndex(index)}
                className="group relative min-h-14 px-0 py-4 sm:px-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      active
                        ? "bg-mineral-200"
                        : "bg-mineral-100/34 group-hover:bg-mineral-200/70"
                    }`}
                  />
                  <span
                    className={`font-medium transition duration-300 ${
                      active
                        ? "text-mineral-50"
                        : "text-mineral-100/72 group-hover:text-mineral-50"
                    }`}
                  >
                    {item}
                  </span>
                </div>
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px origin-left bg-gradient-to-r from-mineral-200/0 via-mineral-200/70 to-mineral-200/0 sm:left-5 sm:right-5"
                  initial={false}
                  animate={{
                    scaleX: active ? 1 : 0,
                    opacity: active ? 1 : 0,
                  }}
                  transition={{
                    duration: motionDurations.short,
                    ease: premiumEase,
                  }}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.div>
  );
}
