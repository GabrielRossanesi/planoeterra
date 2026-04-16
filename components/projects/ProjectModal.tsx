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

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, project]);

  const stageImage = useMemo(() => {
    return project.gallery[activeImage] || project.coverImage;
  }, [activeImage, project]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: motionDurations.overlay, ease: premiumEase }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink-950/70 px-3 py-5 backdrop-blur-xl md:px-6 md:py-8"
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
        className="relative mx-auto min-h-full w-full max-w-7xl overflow-hidden rounded-[2rem] bg-mineral-50 text-ink-950 shadow-premium"
      >
        <motion.button
          ref={closeRef}
          type="button"
          onClick={onClose}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink-950/10 bg-mineral-50/85 text-ink-950 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
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

        <div className="grid lg:grid-cols-[1.08fr_.92fr]">
          <section className="bg-ink-950 p-3 text-mineral-50 md:p-5">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.55rem] border border-white/10 bg-ink-900">
              <motion.div
                key={`${activeVisual}-${activeImage}`}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, ease: premiumEase }}
                className="h-full min-h-[420px]"
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
                    className="h-full min-h-[420px] w-full object-cover"
                  />
                )}
              </motion.div>

              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-ink-950/60 p-4 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mineral-300">
                  {activeVisual === "3d" && published3D
                    ? project.modelBadgeLabel || "Visualização 3D"
                    : project.has3dModel
                      ? project.modelReadyLabel
                      : "Galeria técnica"}
                </span>
                <p className="mt-2 text-sm leading-6 text-mineral-100/80">
                  {activeVisual === "3d" && published3D
                    ? project.modelSupportText ||
                      "Use mouse ou toque para orbitar, aproximar e afastar."
                    : project.viewerHint}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2">
                {published3D ? (
                  <motion.button
                    type="button"
                    onClick={() => setActiveVisual("3d")}
                    aria-pressed={activeVisual === "3d"}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    className={`project-tab ${
                      activeVisual === "3d" ? "is-active" : ""
                    }`}
                  >
                    Modelo 3D
                  </motion.button>
                ) : null}
                <motion.button
                  type="button"
                  onClick={() => setActiveVisual("image")}
                  aria-pressed={activeVisual === "image"}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  className={`project-tab ${
                    activeVisual === "image" ? "is-active" : ""
                  }`}
                >
                  Imagens
                </motion.button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
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
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                      activeVisual === "image" && activeImage === index
                        ? "border-mineral-200"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
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

          <aside className="p-6 md:p-9 lg:p-10">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-forest-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-mineral-50">
                {project.category}
              </span>
              <span className="rounded-full border border-ink-950/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                {project.status}
              </span>
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-forest-700">
              {project.id} · {project.location}
            </p>
            <h2
              id="project-modal-title"
              className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl"
            >
              {project.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-500">
              {project.fullDescription}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {project.summary.map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-ink-950/10 bg-white/65 p-4"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    {item.label}
                  </span>
                  <strong className="mt-2 block text-lg text-ink-950">
                    {item.value}
                  </strong>
                </article>
              ))}
            </div>

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
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                      {item.label}
                    </span>
                    <strong className="mt-2 block text-sm leading-6 text-ink-950">
                      {item.value}
                    </strong>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-700">
                Entregáveis
              </span>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-ink-600">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              className="btn btn-primary mt-9 w-full justify-center"
              href={buildProjectWhatsappLink(project)}
              target="_blank"
              rel="noreferrer"
            >
              Falar sobre este projeto
            </a>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}


