import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { InteriorHero } from "@/components/InteriorHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a Plano & Terra, empresa de topografia e agrimensura com foco em precisão, clareza técnica e regularização territorial.",
  openGraph: {
    title: "Plano & Terra | Sobre",
    description:
      "Precisão técnica, leitura territorial e documentação clara para imóveis urbanos e rurais.",
    images: ["/assets/og-plano-terra.svg"],
  },
};

const principles = [
  {
    title: "Precisão em campo",
    description:
      "A leitura começa no território, com tecnologia e método compatíveis com a finalidade do imóvel.",
  },
  {
    title: "Clareza documental",
    description:
      "As entregas são organizadas para serem entendidas, analisadas e usadas sem ruído desnecessário.",
  },
  {
    title: "Postura técnica",
    description:
      "Cada projeto é conduzido com atenção ao contexto, limites, confrontações e necessidade do cliente.",
  },
];

export default function SobrePage() {
  return (
    <>
      <InteriorHero
        eyebrow="Sobre a Plano & Terra"
        kicker="Topografia e agrimensura"
        title="Precisão técnica com apresentação clara."
        description="A Plano & Terra atua na leitura, medição e organização de informações territoriais para apoiar regularização, cadastro e decisão."
        image="/assets/hero-drone-photo.png"
        secondaryHref="/projetos"
        secondaryLabel="Ver projetos"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-premium backdrop-blur">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-ink-900">
            <Image
              src="/assets/logo-plano-terra.svg"
              alt="Plano & Terra"
              fill
              sizes="40vw"
              className="object-contain p-14"
            />
            <div className="absolute inset-0 precision-grid opacity-20" />
          </div>
        </div>
      </InteriorHero>

      <section className="section-padding bg-mineral-50">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Posicionamento"
              title="Um escritório técnico para demandas que pedem segurança."
              description="A proposta é simples: transformar áreas, limites e documentos em uma base confiável para o próximo passo."
            />
          </ScrollReveal>

          <div className="grid gap-5">
            {principles.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 90}>
                <article className="border-t border-ink-950/10 pt-6">
                  <h2 className="text-2xl font-semibold text-ink-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-ink-500">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f0eadf]">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 shadow-premium">
                <Image
                  src="/drone.avif"
                  alt="Vista aérea usada como referência de leitura territorial"
                  width={1200}
                  height={800}
                  className="aspect-[4/3] w-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <span className="eyebrow text-forest-700">Como trabalhamos</span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink-950 md:text-5xl">
                Menos ruído visual, mais leitura técnica.
              </h2>
              <p className="mt-6 text-base leading-8 text-ink-500">
                A experiência foi redesenhada para refletir o mesmo princípio
                da entrega em campo: informação organizada, hierarquia clara e
                confiança no detalhe.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["área urbana", "área rural", "drone + RTK", "peças técnicas"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-2xl border border-ink-950/10 bg-mineral-50 px-4 py-3 text-sm font-semibold text-ink-700"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Traga a demanda. A Plano & Terra ajuda a organizar o caminho técnico."
        description="Atendimento direto para entender área, finalidade, documentos e próximos passos."
      />
    </>
  );
}

