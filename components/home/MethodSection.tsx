import { methodSteps } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function MethodSection() {
  return (
    <section id="metodo" className="section-padding bg-mineral-50">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Método aplicado"
            title="Um fluxo técnico para ler, medir e entregar com clareza."
            description="Três movimentos conectam diagnóstico, captação precisa e documentação final, sem ruído para o cliente."
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {methodSteps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 90}>
              <article className="group relative h-full overflow-hidden rounded-[1.7rem] border border-ink-950/10 bg-white/70 p-6 shadow-[0_16px_50px_rgba(8,10,9,.06)] transition duration-300 hover:-translate-y-1 hover:border-forest-700/25 hover:bg-white">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-mineral-300 to-transparent opacity-70" />
                <div className="flex items-start justify-between gap-6">
                  <span className="font-display text-6xl leading-none text-forest-700/15">
                    {step.number}
                  </span>
                  <span className="rounded-full border border-forest-700/10 bg-forest-700/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-forest-700">
                    {step.eyebrow}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-ink-950">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-500">
                  {step.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {step.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-full bg-mineral-100 px-3 py-1 text-xs font-medium text-ink-700"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


