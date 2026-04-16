import Image from "next/image";
import Link from "next/link";
import { primaryWhatsappLink, withBasePath } from "@/lib/site";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Hero() {
  return (
    <section className="relative isolate min-h-[94svh] overflow-hidden border-b border-ink-950/10 bg-ink-950 text-mineral-50">
      <Image
        src={withBasePath("/drone.avif")}
        alt="Vista aérea de área mapeada por drone"
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-[0.84]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,8,.88),rgba(5,10,8,.58)_42%,rgba(5,10,8,.16)_78%),linear-gradient(0deg,rgba(5,10,8,.34),rgba(5,10,8,.08)_34%,rgba(5,10,8,.28))]" />
      <div className="absolute inset-0 precision-grid opacity-[0.13]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950/52 via-ink-950/10 to-transparent" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-mineral-200/35 to-transparent" />

      <div className="relative mx-auto flex min-h-[94svh] w-full max-w-7xl flex-col justify-center px-5 pb-16 pt-32 md:px-8 lg:pb-20">
        <div className="max-w-4xl">
          <ScrollReveal initialVisible className="min-w-0 max-w-full">
            <span className="eyebrow text-mineral-200">Plano & Terra</span>
            <p className="mt-5 text-sm uppercase tracking-[0.34em] text-mineral-100/70 md:text-base">
              Topografia e agrimensura
            </p>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-6xl font-semibold leading-[0.95] tracking-normal md:text-8xl lg:text-9xl">
              Base técnica para decisões seguras.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-mineral-100/80 md:text-xl">
              Regularização, georreferenciamento e levantamentos com leitura
              clara de áreas urbanas e rurais.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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

        <ScrollReveal
          initialVisible
          delay={180}
          className="mt-14 grid gap-3 text-sm text-mineral-100/75 sm:grid-cols-3 lg:max-w-3xl"
        >
          {["Usucapião", "Georreferenciamento", "Drone + RTK"].map((item) => (
            <div
              key={item}
              className="border-t border-mineral-100/25 pt-4 font-medium"
            >
              {item}
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}


