"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { motionDurations, premiumEase } from "@/lib/motion";

export function FAQ() {
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="section-padding bg-mineral-50">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Dúvidas comuns, resposta direta."
            description="Um bloco objetivo para orientar a conversa inicial e reduzir incertezas antes do atendimento."
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="divide-y divide-ink-950/10 border-y border-ink-950/10">
            {faqs.map((item, index) => {
              const active = open === index;
              return (
                <motion.article layout key={item.question}>
                  <motion.button
                    type="button"
                    whileHover={reduceMotion ? undefined : { x: 2 }}
                    transition={{ duration: motionDurations.micro, ease: premiumEase }}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                    aria-expanded={active}
                    aria-controls={`faq-${index}`}
                    onClick={() => setOpen(active ? -1 : index)}
                  >
                    <span className="text-base font-semibold text-ink-950 md:text-lg">
                      {item.question}
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-950/10 text-forest-700 transition group-hover:border-forest-700/40 group-hover:bg-white">
                      <motion.svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        animate={{ rotate: active ? 45 : 0 }}
                        transition={{
                          duration: motionDurations.short,
                          ease: premiumEase,
                        }}
                        className="h-4 w-4"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.8"
                        />
                      </motion.svg>
                    </span>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.div
                        id={`faq-${index}`}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: motionDurations.overlay,
                          ease: premiumEase,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-sm leading-7 text-ink-500 md:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
