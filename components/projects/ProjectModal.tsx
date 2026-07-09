"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  buildProjectWhatsappLink,
  hasPublished3D,
  Project,
} from "@/data/projects";
import { ModelViewer3D } from "@/components/projects/ModelViewer3D";
import { modalVariants, motionDurations, premiumEase } from "@/lib/motion";

type ProjectModalProps = {
  project: Project;
  initialVisual: "image" | "3d";
  onClose: () => void;
};

export function ProjectModal({ project, initialVisual, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [activeVisual, setActiveVisual] = useState<"image" | "3d">("image");
  const [activeImage, setActiveImage] = useState(0);
  const reduceMotion = useReducedMotion();

  const published3D = hasPublished3D(project);

  useEffect(() => {
    setActiveImage(0);
    setActiveVisual(initialVisual === "3d" && hasPublished3D(project) ? "3d" : "image");
    window.setTimeout(() => closeRef.current?.focus(), 80);
  }, [project, initialVisual]);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  // Accessibility Focus Trap and Escape Key Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const modalEl = document.querySelector('[role="dialog"]');
        if (!modalEl) return;
        const focusables = modalEl.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex="0"]'
        );
        if (focusables.length === 0) return;
        const first = focusables[0] as HTMLElement;
        const last = focusables[focusables.length - 1] as HTMLElement;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const stageImage = useMemo(() => {
    return project.gallery[activeImage] || project.coverImage;
  }, [activeImage, project]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: motionDurations.overlay, ease: premiumEase }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink-950/70 backdrop-blur-xl md:px-6 md:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        variants={modalVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        exit="exit"
        transition={{ duration: motionDurations.overlay, ease: premiumEase }}
        className="relative mx-auto min-h-full w-full max-w-7xl overflow-hidden bg-mineral-50 text-ink-950 shadow-premium flex flex-col md:rounded-[2rem]"
      >
        {/* Sticky Close Button (Always visible on scroll, aligned to card margins) */}
        <div className="sticky top-0 z-30 h-0 w-full flex justify-end">
          <motion.button
            ref={closeRef}
            type="button"
            onClick={onClose}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            className="mr-4 mt-4 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-950/80 text-mineral-50 backdrop-blur shadow-premium transition hover:bg-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 md:mr-6 md:mt-6"
            aria-label="Fechar detalhes do projeto"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6 6 18"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-[1.08fr_.92fr] flex-1">
          {/* Visual Column (Dynamic vertical stretching) */}
          <section className="bg-ink-950 p-3 text-mineral-50 md:p-5 flex flex-col justify-between h-full min-h-0 md:min-h-[500px] lg:min-h-[600px]">
            <div className="relative flex-1 min-h-[52svh] overflow-hidden rounded-[1.35rem] border border-white/10 bg-ink-900 flex flex-col md:min-h-[420px] md:rounded-[1.55rem]">
              <motion.div
                key={`${activeVisual}-${activeImage}`}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, ease: premiumEase }}
                className="relative flex-1 w-full h-full min-h-[52svh] md:min-h-[420px] flex flex-col"
              >
                {activeVisual === "3d" && published3D && project.model3dUrl ? (
                  <ModelViewer3D
                    src={project.model3dUrl}
                    poster={project.coverImage}
                    alt={`Modelo 3D do projeto ${project.title}`}
                    config={project.model3dViewerConfig}
                  />
                ) : (
                  <img
                    src={stageImage}
                    alt={`${project.title} - visual técnico`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </motion.div>

              {/* Technical overlay info */}
              <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-white/15 bg-ink-950/70 p-3 backdrop-blur shadow-premium md:inset-x-5 md:bottom-5 md:p-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mineral-300 md:text-xs">
                  {activeVisual === "3d" && published3D
                    ? project.modelBadgeLabel || "Visualização 3D"
                    : project.has3dModel
                      ? project.modelReadyLabel
                      : "Galeria técnica"}
                </span>
                <p className="mt-1.5 hidden text-xs leading-5 text-mineral-100/80 sm:block md:mt-2">
                  {activeVisual === "3d" && published3D
                    ? project.modelSupportText ||
                      "Use mouse ou toque para orbitar, aproximar e afastar."
                    : project.viewerHint}
                </p>
              </div>
            </div>

            {/* Media Selector Hub (Tactile tabs and gallery list) */}
            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shrink-0">
              <div className="flex gap-2">
                {published3D ? (
                  <motion.button
                    type="button"
                    onClick={() => setActiveVisual("3d")}
                    aria-pressed={activeVisual === "3d"}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300 ${
                      activeVisual === "3d"
                        ? "border-mineral-200 bg-mineral-200 text-ink-950"
                        : "border-white/10 bg-white/[0.06] text-mineral-100/75 hover:bg-white/10"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    Modelo 3D
                  </motion.button>
                ) : null}
                <motion.button
                  type="button"
                  onClick={() => setActiveVisual("image")}
                  aria-pressed={activeVisual === "image"}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300 ${
                    activeVisual === "image"
                      ? "border-mineral-200 bg-mineral-200 text-ink-950"
                      : "border-white/10 bg-white/[0.06] text-mineral-100/75 hover:bg-white/10"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  Imagens
                </motion.button>
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full md:max-w-[320px] lg:max-w-[400px]">
                {project.gallery.map((image, index) => (
                  <motion.button
                    key={image}
                    type="button"
                    onClick={() => {
                      setActiveVisual("image");
                      setActiveImage(index);
                    }}
                    aria-label={`Ver imagem ${index + 1} do projeto`}
                    aria-pressed={activeVisual === "image" && activeImage === index}
                    className={`h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition ${
                      activeVisual === "image" && activeImage === index
                        ? "border-mineral-200 scale-95"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Details Column */}
          <aside className="p-5 pb-3 md:p-9 md:pb-9 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-forest-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-mineral-50">
                  {project.category}
                </span>
                <span className="rounded-full border border-ink-950/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                  {project.status}
                </span>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-forest-700 md:mt-8">
                {project.id} · {project.location}
              </p>
              <h2
                id="project-modal-title"
                className="mt-2 font-display text-3xl font-semibold leading-tight md:mt-3 md:text-5xl"
              >
                {project.title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-ink-500">
                {project.fullDescription}
              </p>

              {/* Project Summary Cards */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {project.summary.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-2xl border border-ink-950/10 bg-white/65 p-4"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                      {item.label}
                    </span>
                    <strong className="mt-2 block text-base text-ink-950">
                      {item.value}
                    </strong>
                  </article>
                ))}
              </div>

              {/* Technical parameters */}
              <div className="mt-8">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-700">
                  Informações técnicas
                </span>
                <div className="mt-4 grid gap-3">
                  {project.technicalInfo.map((item) => (
                    <article
                      key={item.label}
                      className="rounded-2xl border border-ink-950/10 bg-white/55 p-4"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                        {item.label}
                      </span>
                      <strong className="mt-2 block text-xs leading-5 text-ink-950">
                        {item.value}
                      </strong>
                    </article>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="mt-8">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-700">
                  Entregáveis
                </span>
                <ul className="mt-4 grid gap-3 text-xs leading-5 text-ink-600">
                  {project.deliverables.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sticky bottom-0 -mx-5 mt-7 border-t border-ink-950/10 bg-mineral-50/95 px-5 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 backdrop-blur md:static md:m-0 md:mt-9 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
              <a
                className="btn btn-primary w-full justify-center min-h-[48px]"
                href={buildProjectWhatsappLink(project)}
                target="_blank"
                rel="noreferrer"
              >
                Falar sobre este projeto
              </a>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}
