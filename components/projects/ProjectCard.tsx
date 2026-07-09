"use client";

import { motion, useReducedMotion } from "motion/react";
import { hasPublished3D, Project } from "@/data/projects";
import { motionDurations, premiumEase } from "@/lib/motion";

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project, visual?: "image" | "3d") => void;
};

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const published3D = hasPublished3D(project);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              scale: 1.01,
            }
      }
      transition={{ duration: motionDurations.short, ease: premiumEase }}
      className="group h-full overflow-hidden rounded-[1.7rem] border border-ink-950/10 bg-mineral-50 shadow-[0_18px_55px_rgba(8,10,9,.08)] transition-all duration-300 hover:border-forest-700/35 hover:shadow-[0_24px_65px_rgba(8,10,9,.12)]"
    >
      <button
        type="button"
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
        onClick={() => onSelect(project, published3D ? "3d" : "image")}
        aria-label={`Ver detalhes do projeto ${project.title}`}
      >
        <span className="relative block aspect-[4/3] overflow-hidden bg-ink-950">
          <motion.img
            src={project.coverImage}
            alt={`${project.title} em ${project.location}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
            transition={{ duration: 0.7, ease: premiumEase }}
          />
          {/* Sutil background shade for readability */}
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
          
          {/* Floating Category Badge */}
          <span className="absolute left-4 top-4 rounded-full bg-mineral-50/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-forest-800 shadow-premium">
            {project.category}
          </span>
          
          {/* 3D Indicator overlays */}
          {published3D ? (
            <motion.span
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-ink-950/70 p-3 text-mineral-50 backdrop-blur shadow-premium transition duration-300 group-hover:bg-ink-950/85"
              initial={false}
            >
              <span>
                <strong className="block text-xs uppercase tracking-wider text-mineral-300">
                  {project.modelBadgeLabel || "Visualização 3D"}
                </strong>
                <span className="text-[10px] text-mineral-100/70">
                  {project.modelCtaLabel || "Abrir modelo"}
                </span>
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-mineral-200 text-ink-950 shadow-soft transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
                  <path
                    d="M12 2 4.5 6.25v11.5L12 22l7.5-4.25V6.25L12 2Zm0 1.96 5.66 3.2L12 10.36 6.34 7.16 12 3.96Zm-6 4.58 5.1 2.9v7.64L6 16.2V8.54Zm12 0v7.66l-5.1 2.88v-7.64L18 8.54Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </motion.span>
          ) : project.has3dModel ? (
            <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-ink-950/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-mineral-200 backdrop-blur shadow-premium">
              3D Preparado
            </span>
          ) : null}
        </span>

        {/* Text information */}
        <span className="block p-5 md:p-6">
          <span className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-forest-700">
            <span>{project.id}</span>
            <span>{project.areaLabel}</span>
          </span>
          <span className="mt-3 block text-xs text-ink-500">
            {project.location}
          </span>
          <strong className="mt-2 block text-xl font-semibold leading-tight text-ink-950 transition-colors duration-300 group-hover:text-forest-900">
            {project.title}
          </strong>
          <span className="mt-3 block text-xs font-semibold text-ink-700 uppercase tracking-wide">
            {project.serviceType}
          </span>
          <p className="mt-3 block text-xs leading-6 text-ink-500 line-clamp-3">
            {project.shortDescription}
          </p>
          
          {/* Card footer/CTA */}
          <span className="mt-6 flex items-center justify-between border-t border-ink-950/10 pt-4 text-xs font-semibold">
            <span className="text-ink-500 uppercase tracking-wider text-[10px]">{project.status}</span>
            <strong className="flex items-center gap-1 text-forest-700 group-hover:text-forest-900 transition-colors uppercase tracking-wider text-[10px]">
              {published3D ? "Explorar 3D" : "Ver detalhes"}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </strong>
          </span>
        </span>
      </button>
    </motion.article>
  );
}
