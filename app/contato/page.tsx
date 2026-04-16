import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { InteriorHero } from "@/components/InteriorHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { primaryWhatsappLink, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Plano & Terra pelo WhatsApp, telefone ou Instagram para serviços de topografia e regularização.",
  openGraph: {
    title: "Plano & Terra | Contato",
    description:
      "Atendimento direto para topografia, georreferenciamento, usucapião e regularização de imóveis.",
    images: ["/assets/og-plano-terra.svg"],
  },
};

const channels = [
  {
    label: "WhatsApp",
    title: "Atendimento direto",
    description: "Envie a demanda, localização e finalidade do serviço.",
    href: primaryWhatsappLink,
    action: "Abrir WhatsApp",
  },
  {
    label: "Telefone",
    title: site.phoneLabel,
    description: "Contato rápido para alinhamento inicial.",
    href: `tel:${site.phone}`,
    action: "Ligar agora",
  },
  {
    label: "Instagram",
    title: "@planoeterra",
    description: "Acompanhe bastidores, projetos e atualizações.",
    href: site.instagram,
    action: "Abrir Instagram",
  },
];

const preparation = [
  "cidade e bairro da área",
  "finalidade do serviço",
  "documentos ou matrícula disponíveis",
  "prazo desejado para análise inicial",
];

export default function ContatoPage() {
  return (
    <>
      <InteriorHero
        eyebrow="Contato"
        kicker="Atendimento direto"
        title="Converse com quem entende a leitura técnica do terreno."
        description="Envie sua demanda para uma orientação inicial sobre regularização, georreferenciamento ou levantamento topográfico."
        secondaryHref={`tel:${site.phone}`}
        secondaryLabel="Ligar agora"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-premium backdrop-blur">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mineral-300">
            Canal principal
          </span>
          <strong className="mt-4 block font-display text-5xl font-semibold">
            WhatsApp
          </strong>
          <p className="mt-4 text-sm leading-7 text-mineral-100/70">
            O melhor ponto de partida é uma mensagem objetiva com localização,
            tipo de área e finalidade da regularização.
          </p>
          <a
            className="btn btn-primary mt-8 w-full justify-center"
            href={whatsappLink(
              "Olá, gostaria de falar com a Plano & Terra sobre uma demanda técnica."
            )}
            target="_blank"
            rel="noreferrer"
          >
            Iniciar conversa
          </a>
        </div>
      </InteriorHero>

      <section className="section-padding bg-mineral-50">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Canais"
              title="Escolha o melhor caminho para falar conosco."
              description="A Plano & Terra mantém contato direto e objetivo para acelerar o entendimento inicial da demanda."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {channels.map((channel, index) => (
              <ScrollReveal key={channel.label} delay={index * 90}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group block h-full rounded-[1.7rem] border border-ink-950/10 bg-white/70 p-6 shadow-soft outline-none transition hover:-translate-y-1 hover:border-forest-700/25 focus-visible:ring-2 focus-visible:ring-forest-700"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-700">
                    {channel.label}
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold text-ink-950">
                    {channel.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-ink-500">
                    {channel.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                    {channel.action}
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ink-950 text-mineral-50">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Antes do contato"
              title="Algumas informações aceleram a análise inicial."
              description="Não precisa chegar com tudo pronto. Estes pontos ajudam a orientar a primeira conversa."
              tone="dark"
            />
          </ScrollReveal>
          <div className="grid gap-4">
            {preparation.map((item, index) => (
              <ScrollReveal key={item} delay={index * 80}>
                <div className="flex items-center gap-4 border-t border-white/10 py-5">
                  <span className="font-display text-4xl text-mineral-300/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Quer começar agora?"
        description="Envie uma mensagem pelo WhatsApp com a localização da área e o objetivo do serviço."
      />
    </>
  );
}

