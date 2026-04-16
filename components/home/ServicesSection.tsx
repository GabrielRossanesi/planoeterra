import Image from "next/image";
import { services } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function ServicesSection() {
  return (
    <section id="servicos" className="section-padding bg-[#f0eadf]">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Atuação principal"
              title="Serviços que estruturam a leitura territorial."
              description="Frentes centrais para regularizar, delimitar e documentar imóveis com segurança técnica."
            />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="max-w-xl text-sm leading-7 text-ink-500 lg:ml-auto">
              O desenho da entrega varia conforme objetivo, área e exigência
              documental. A apresentação final privilegia clareza, precisão e
              material útil para decisão.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 90}>
              <a
                href={service.href}
                target="_blank"
                rel="noreferrer"
                className={`group block h-full overflow-hidden rounded-[1.7rem] border border-ink-950/10 bg-mineral-50 shadow-[0_18px_55px_rgba(8,10,9,.08)] outline-none transition duration-300 hover:-translate-y-1 hover:border-forest-700/25 focus-visible:ring-2 focus-visible:ring-forest-700 ${
                  index === 0 ? "lg:mt-10" : index === 2 ? "lg:mt-20" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-forest-900">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover opacity-92 transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 rounded-full bg-mineral-50/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest-800">
                    {service.kicker}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-ink-950">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-ink-500">
                    {service.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink-950/10 px-3 py-1 text-xs font-medium text-ink-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                    Conversar sobre o serviço
                    <span
                      aria-hidden="true"
                      className="transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


