import Image from "next/image";
import { capabilities, differentials } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CapabilitySection() {
  return (
    <section className="section-padding bg-ink-950 text-mineral-50">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <ScrollReveal className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-premium">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem]">
              <Image
                src="/assets/hero-drone-photo.png"
                alt="Drone utilizado em captação técnica de campo"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {["Drone", "RTK", "Área urbana e rural"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-ink-950/45 px-3 py-1 text-xs font-medium text-mineral-50 backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} className="order-1 lg:order-2">
          <span className="eyebrow text-mineral-200">
            Tecnologia e precisão em campo
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">
            Recursos que sustentam a leitura territorial.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-mineral-100/75 md:text-lg">
            Drone, RTK e documentação técnica organizados para captar, validar
            e apresentar áreas urbanas e rurais com mais segurança.
          </p>

          <div className="mt-10 grid gap-5">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="border-l border-mineral-300/35 pl-5"
              >
                <h3 className="text-lg font-semibold text-mineral-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-mineral-100/65">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="mx-auto mt-16 w-full max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <div className="grid gap-3 border-y border-white/10 py-6 md:grid-cols-4">
            {differentials.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm font-medium text-mineral-100/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-mineral-300" />
                {item}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


