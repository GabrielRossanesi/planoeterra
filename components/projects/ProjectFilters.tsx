"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionDurations, premiumEase } from "@/lib/motion";

type ProjectFiltersProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export function ProjectFilters({
  categories,
  activeCategory,
  onChange,
}: ProjectFiltersProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="flex flex-wrap gap-2"
      aria-label="Filtrar projetos por categoria"
    >
      {categories.map((category) => {
        const active = activeCategory === category;
        return (
          <motion.button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(category)}
            whileHover={reduceMotion ? undefined : { y: -1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: motionDurations.micro, ease: premiumEase }}
            className={`relative overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 ${
              active
                ? "border-forest-800 bg-forest-800 text-mineral-50 shadow-soft"
                : "border-ink-950/10 bg-white/70 text-ink-700 hover:border-forest-700/25 hover:bg-white"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="project-filter-active"
                className="absolute inset-0 rounded-full bg-forest-800"
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 34,
                  mass: 0.8,
                }}
              />
            ) : null}
            <span className="relative z-10">{category}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
