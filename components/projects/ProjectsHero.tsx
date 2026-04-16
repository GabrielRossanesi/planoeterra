import Image from "next/image";
import { primaryWhatsappLink } from "@/lib/site";
import { ScrollReveal } from "@/components/ScrollReveal";

export function ProjectsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-32 text-mineral-50">
      <Image
        src="/drone.avif"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-38"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,8,.95),rgba(5,10,8,.72),rgba(5,10,8,.42)),linear-gradient(0deg,rgba(5,10,8,.88),transparent_60%)]" />
      <div className="absolute inset-0 precision-grid opacity-[0.16]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 pb-24 md:px-8 lg:grid-cols-[1fr_.9fr] lg:items-end">
        <ScrollReveal initialVisible className="min-w-0 max-w-full lg:max-w-4xl">
          <span className="eyebrow text-mineral-200">Projetos Plano & Terra</span>
          <p className="mt-5 text-sm uppercase tracking-[0.34em] text-mineral-100/65">
            Portfólio técnico e visual
          </p>
          <h1 className="mt-6 max-w-full text-balance break-words font-display text-4xl font-semibold leading-[1.04] md:text-7xl">
            Projetos apresentados com a mesma precisão da execução.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-mineral-100/75">
            Uma vitrine editorial para ler contexto, categoria, mídia e padrão
            técnico com navegação limpa e foco na decisão.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn btn-primary justify-center"
              href={primaryWhatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar atendimento
            </a>
            <a className="btn btn-dark-secondary justify-center" href="#projetos">
              Explorar projetos
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal initialVisible delay={140} className="hidden lg:block">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-premium backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-ink-900">
              <Image
                src="/assets/hero-drone-photo.png"
                alt="Drone utilizado em projeto de topografia"
                fill
                sizes="40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mineral-300">
                  Galeria + modelo 3D
                </span>
                <strong className="mt-2 block text-2xl">
                  Portfólio técnico refinado
                </strong>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


