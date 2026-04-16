import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { InteriorHero } from "@/components/InteriorHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { methodSteps, services } from "@/data/content";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços de topografia, usucapião, georreferenciamento urbano e rural da Plano & Terra.",
  openGraph: {
    title: "Plano & Terra | Serviços",
    description:
      "Levantamentos, georreferenciamento e regularização com precisão técnica para áreas urbanas e rurais.",
    images: ["/assets/og-plano-terra.svg"],
  },
};

const serviceDetails = [
  {
    id: "usucapiao",
    scope: "Indicado para processos que exigem leitura clara de perímetro, confrontações e documentação técnica de apoio.",
    deliverables: ["planta técnica", "memorial descritivo", "base de confrontações"],
  },
  {
    id: "geo-urbano",
    scope: "Para imóveis, lotes e conjuntos urbanos que precisam de conferência de limites, atualização cadastral ou base georreferenciada.",
    deliverables: ["base urbana", "conferência de limites", "síntese cartográfica"],
  },
  {
    id: "geo-rural",
    scope: "Voltado a propriedades rurais, glebas e áreas maiores que pedem organização territorial e precisão posicional.",
    deliverables: ["perímetro rural", "referências espaciais", "material para regularização"],
  },
];

export default function ServicosPage() {
  return (
    <>
      <InteriorHero
        eyebrow="Serviços"
        kicker="Regularização, campo e documentação"
        title="Leitura territorial precisa para cada etapa do imóvel."
        description="A Plano & Terra organiza levantamentos, georreferenciamento e peças técnicas para reduzir incertezas em áreas urbanas e rurais."
        secondaryHref="#escopos"
        secondaryLabel="Ver escopos"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-premium backdrop-blur">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem]">
            <Image
              src="/assets/hero-drone-photo.png"
              alt="Drone aplicado em levantamento de campo"
              fill
              sizes="40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mineral-300">
                Campo + documentação
              </span>
              <strong className="mt-2 block text-2xl">
                Escopo técnico claro desde o início.
              </strong>
            </div>
          </div>
        </div>
      </InteriorHero>

      <section id="escopos" className="section-padding bg-mineral-50">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Escopos principais"
              title="Serviços estruturados para decisão técnica."
              description="Cada frente preserva clareza de finalidade: medir, regularizar, organizar ou comunicar a área com precisão."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-6">
            {services.map((service, index) => {
              const detail = serviceDetails.find((item) => item.id === service.id);
              return (
                <ScrollReveal key={service.id} delay={index * 90}>
                  <article className="grid overflow-hidden rounded-[1.8rem] border border-ink-950/10 bg-white/70 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-72 bg-ink-950">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 md:p-9">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-700">
                        {service.kicker}
                      </span>
                      <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight text-ink-950">
                        {service.title}
                      </h2>
                      <p className="mt-5 text-base leading-8 text-ink-500">
                        {detail?.scope || service.description}
                      </p>
                      <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {(detail?.deliverables || service.tags).map((item) => (
                          <span
                            key={item}
                            className="rounded-2xl border border-ink-950/10 bg-mineral-50 px-4 py-3 text-sm font-semibold text-ink-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <a
                        className="btn btn-secondary mt-8"
                        href={service.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Solicitar este serviço
                      </a>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ink-950 text-mineral-50">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Como acontece"
              title="Um processo objetivo, da leitura inicial à entrega final."
              description="O atendimento começa entendendo a finalidade da área e termina com material técnico organizado para análise."
              tone="dark"
            />
          </ScrollReveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {methodSteps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 90}>
                <article className="h-full border-l border-mineral-300/35 pl-6">
                  <span className="font-display text-5xl text-mineral-300/45">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-mineral-100/70">
                    {step.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Explique sua área e receba uma orientação inicial."
        description="A conversa ajuda a definir o serviço correto, os documentos necessários e a melhor sequência técnica."
      />
    </>
  );
}

