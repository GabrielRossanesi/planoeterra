import Image from "next/image";
import Link from "next/link";
import { primaryWhatsappLink, withBasePath } from "@/lib/site";
import { HeroExpertiseStrip } from "@/components/home/HeroExpertiseStrip";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Hero() {
  return (
    <section className="relative isolate min-h-[94svh] overflow-hidden border-b border-ink-950/10 bg-ink-950 text-mineral-50">
      <Image
        src={withBasePath("/photos/aerea-bairro-01.webp")}
        alt="Vista aérea de bairro mapeado por drone pela Plano & Terra"
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-[0.84]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,8,.88),rgba(5,10,8,.58)_42%,rgba(5,10,8,.16)_78%),linear-gradient(0deg,rgba(5,10,8,.34),rgba(5,10,8,.08)_34%,rgba(5,10,8,.28))]" />
      <div className="absolute inset-0 precision-grid opacity-[0.13]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950/52 via-ink-950/10 to-transparent" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-mineral-200/35 to-transparent" />

      <div className="relative mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col justify-center px-5 pb-12 pt-28 md:min-h-[94svh] md:px-8 md:pb-16 md:pt-32 lg:pb-20">
        <div className="max-w-4xl">
          <ScrollReveal initialVisible className="min-w-0 max-w-full">
            <span className="eyebrow text-mineral-200">Plano & Terra</span>
            <p className="mt-4 text-xs uppercase tracking-[0.26em] text-mineral-100/70 md:mt-5 md:text-base md:tracking-[0.34em]">
              Topografia e agrimensura
            </p>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-[2.65rem] font-semibold leading-[1.02] tracking-normal sm:text-6xl md:mt-6 md:text-8xl md:leading-[0.95] lg:text-9xl">
              Base técnica para decisões seguras.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-mineral-100/80 md:mt-7 md:text-xl md:leading-8">
              Regularização, georreferenciamento e levantamentos com leitura
              clara de áreas urbanas e rurais.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
              <a
                className="btn btn-primary justify-center"
                href={primaryWhatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar atendimento
              </a>
              <Link className="btn btn-dark-secondary justify-center" href="/projetos">
                Ver projetos executados
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <HeroExpertiseStrip />
      </div>
    </section>
  );
}


