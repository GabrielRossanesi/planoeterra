"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { methodSteps } from "@/data/content";
import { motionDurations, premiumEase, revealViewport } from "@/lib/motion";

type TimelineIcon = "diagnostic" | "capture" | "delivery";

const timelineDetails = [
  {
    icon: "diagnostic" as const,
    title: "Diagnóstico",
    shortDescription:
      "A demanda é lida antes da medição: finalidade, contexto, documentos e risco técnico.",
    expanded:
      "A etapa inicial organiza o que precisa ser medido, conferido e entregue. Isso reduz retrabalho e define o melhor caminho técnico para a área.",
    detailPoints: ["escopo técnico", "documentos disponíveis", "contexto da área"],
    result: "Direção clara para iniciar campo com segurança.",
    side: "left" as const,
  },
  {
    icon: "capture" as const,
    title: "Levantamento / Captação",
    shortDescription:
      "Coleta de dados em campo com drone, RTK e método compatível com o imóvel.",
    expanded:
      "A leitura territorial combina equipamentos, referências e conferências em campo para formar uma base confiável, seja urbana, rural ou mista.",
    detailPoints: ["drone", "RTK", "conferência de limites"],
    result: "Base territorial precisa para análise e documentação.",
    side: "right" as const,
  },
  {
    icon: "delivery" as const,
    title: "Entrega",
    shortDescription:
      "Peças técnicas e sínteses visuais organizadas para análise, decisão e regularização.",
    expanded:
      "A entrega transforma a leitura do terreno em material técnico claro: plantas, memoriais, bases e documentação de apoio para o próximo passo.",
    detailPoints: ["plantas", "memorial", "síntese técnica"],
    result: "Material final pronto para leitura objetiva.",
    side: "left" as const,
  },
];

function StepIcon({ type }: { type: TimelineIcon }) {
  if (type === "capture") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M12 8.5v7M8.5 12h7M5 5l3.2 3.2M19 5l-3.2 3.2M5 19l3.2-3.2M19 19l-3.2-3.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.55"
        />
        <circle
          cx="12"
          cy="12"
          r="3.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
        />
      </svg>
    );
  }

  if (type === "delivery") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M6.5 4.5h7.2l3.8 3.8v11.2h-11z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.55"
        />
        <path
          d="M13.5 4.8v4h3.8M8.8 13h6.4M8.8 16h4.6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.55"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle
        cx="11"
        cy="11"
        r="5.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <path
        d="m15.4 15.4 3.9 3.9M11 8.2v5.6M8.2 11h5.6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.55"
      />
    </svg>
  );
}

export function MethodTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mt-16 lg:mt-20"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={revealViewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.13,
          },
        },
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-[1.55rem] top-4 w-px origin-top bg-gradient-to-b from-transparent via-forest-700/26 to-transparent lg:left-1/2"
        initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={revealViewport}
        transition={{ duration: 1.1, ease: premiumEase }}
      />

      <div className="grid gap-10 lg:gap-5">
        {methodSteps.map((step, index) => {
          const detail = timelineDetails[index];
          const active = activeStep === index;
          const cardColumn =
            detail.side === "left" ? "lg:col-start-1" : "lg:col-start-3";
          const panelColumn =
            detail.side === "left" ? "lg:col-start-3" : "lg:col-start-1";

          return (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: motionDurations.reveal, ease: premiumEase }}
              className="relative grid min-h-[11.5rem] gap-4 pl-16 lg:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] lg:items-center lg:gap-0 lg:pl-0"
            >
              <motion.div
                className="absolute left-0 top-2 z-10 flex h-12 w-12 items-center justify-center lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:h-20 lg:w-20"
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                transition={{ duration: motionDurations.short, ease: premiumEase }}
              >
                <div
                  className={`grid h-full w-full place-items-center rounded-full border shadow-soft backdrop-blur ${
                    active
                      ? "border-forest-700/25 bg-forest-800 text-mineral-50"
                      : "border-ink-950/10 bg-mineral-50/90 text-forest-800"
                  }`}
                >
                  <motion.span
                    animate={active && !reduceMotion ? { scale: [1, 1.06, 1] } : {}}
                    transition={{
                      duration: 1.8,
                      repeat: active && !reduceMotion ? Infinity : 0,
                      ease: premiumEase,
                    }}
                    className="font-display text-xl font-semibold lg:text-3xl"
                  >
                    {step.number}
                  </motion.span>
                </div>
              </motion.div>

              <motion.button
                type="button"
                aria-expanded={active}
                aria-controls={`method-popover-${step.number}`}
                onClick={() => setActiveStep(active ? null : index)}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.006,
                      }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: motionDurations.short, ease: premiumEase }}
                className={`group relative w-full overflow-hidden rounded-[1.45rem] border p-5 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-forest-700 md:p-6 ${cardColumn} ${
                  active
                    ? "border-forest-700/22 bg-white shadow-[0_22px_70px_rgba(8,10,9,.12)]"
                    : "border-ink-950/10 bg-white/68 shadow-[0_16px_50px_rgba(8,10,9,.06)] hover:border-forest-700/20 hover:bg-white"
                }`}
              >
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-mineral-300/80 to-transparent" />
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-forest-700/12 bg-forest-700/[0.04] text-forest-800 transition group-hover:bg-forest-800 group-hover:text-mineral-50">
                    <StepIcon type={detail.icon} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-700">
                    {step.eyebrow}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold leading-tight text-ink-950">
                  {detail.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-500">
                  {detail.shortDescription}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                  {active ? "ocultar etapa" : "ver etapa"}
                  <motion.span
                    aria-hidden="true"
                    animate={active ? { rotate: 45 } : { rotate: 0 }}
                    transition={{
                      duration: motionDurations.short,
                      ease: premiumEase,
                    }}
                  >
                    +
                  </motion.span>
                </span>
              </motion.button>

              <AnimatePresence>
                {active ? (
                  <motion.aside
                    id={`method-popover-${step.number}`}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 14, scale: 0.975, filter: "blur(8px)" }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.985,
                      filter: "blur(8px)",
                    }}
                    transition={{
                      duration: motionDurations.overlay,
                      ease: premiumEase,
                    }}
                    className={`relative mt-2 rounded-[1.35rem] border border-ink-950/10 bg-ink-950 p-5 text-mineral-50 shadow-premium lg:row-start-1 lg:mt-0 lg:max-w-md ${panelColumn}`}
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute top-8 hidden h-px w-14 bg-gradient-to-r from-forest-700/0 via-mineral-300/60 to-forest-700/0 lg:block ${
                        detail.side === "left" ? "-left-14" : "-right-14"
                      }`}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mineral-300">
                          Etapa {step.number}
                        </span>
                        <h4 className="mt-3 text-2xl font-semibold">
                          {detail.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        aria-label="Fechar detalhe da etapa"
                        onClick={() => setActiveStep(null)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-mineral-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mineral-300"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-mineral-100/72">
                      {detail.expanded}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {detail.detailPoints.map((point) => (
                        <span
                          key={point}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-mineral-100"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-4 text-sm font-medium text-mineral-200">
                      {detail.result}
                    </div>
                  </motion.aside>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
