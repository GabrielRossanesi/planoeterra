"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function TrustSection() {
  return (
    <section className="bg-mineral-50 border-t border-ink-950/10 py-14 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <ScrollReveal>
            <span className="eyebrow text-forest-700">Segurança & Conformidade</span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-950 md:mt-4 md:text-5xl">
              Garantia de conformidade técnica e legal.
            </h2>
            <p className="mt-6 text-sm leading-7 text-ink-500">
              Cada laudo, planta e memorial descritivo é estruturado sob rígidos critérios de engenharia, proporcionando a precisão necessária para amparar processos judiciais, extrajudiciais e cadastrais com total segurança.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="grid gap-6 sm:grid-cols-2 md:gap-8">
            <article className="border-t border-ink-950/10 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest-700">Responsabilidade</span>
              <h3 className="mt-3 text-lg font-semibold text-ink-950">Responsabilidade técnica</h3>
              <p className="mt-2 text-xs leading-6 text-ink-500">
                Execução por equipe capacitada, estruturada para emissão de registros de responsabilidade técnica (ART) para garantir a conformidade de cada projeto.
              </p>
            </article>

            <article className="border-t border-ink-950/10 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest-700">Estrutura</span>
              <h3 className="mt-3 text-lg font-semibold text-ink-950">Documentação organizada</h3>
              <p className="mt-2 text-xs leading-6 text-ink-500">
                Elaboração de peças técnicas, memoriais e plantas seguindo as normas vigentes e exigências das prefeituras, cartórios e órgãos públicos.
              </p>
            </article>

            <article className="border-t border-ink-950/10 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest-700">Atendimento</span>
              <h3 className="mt-3 text-lg font-semibold text-ink-950">Perfis atendidos</h3>
              <p className="mt-2 text-xs leading-6 text-ink-500">
                Soluções focadas para proprietários particulares, advogados imobiliários, construtoras, empreendedores e investidores de áreas urbanas e rurais.
              </p>
            </article>

            <article className="border-t border-ink-950/10 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest-700">Apoio técnico</span>
              <h3 className="mt-3 text-lg font-semibold text-ink-950">Apoio a processos</h3>
              <p className="mt-2 text-xs leading-6 text-ink-500">
                Suporte completo para regularização fundiária (como usucapião e REURB), levantamentos planialtimétricos e georreferenciamento com leitura técnica clara.
              </p>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
