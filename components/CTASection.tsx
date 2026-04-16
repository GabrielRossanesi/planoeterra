import { primaryWhatsappLink, site } from "@/lib/site";

type CTASectionProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
};

export function CTASection({
  eyebrow = "Contato direto",
  title = "Fale com a Plano & Terra e avance com mais segurança técnica.",
  description = "Atendimento objetivo para regularização, georreferenciamento e levantamento topográfico.",
}: CTASectionProps) {
  return (
    <section id="contato" className="section-padding bg-mineral-50">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-12 text-mineral-50 shadow-premium md:px-12 md:py-16">
          <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_18%_18%,rgba(214,182,122,.34),transparent_34%),radial-gradient(circle_at_85%_42%,rgba(79,118,87,.32),transparent_32%)]" />
          <div className="absolute inset-0 precision-grid opacity-20" />
          <div className="relative max-w-3xl">
            <span className="eyebrow text-mineral-200">{eyebrow}</span>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-mineral-100/75 md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="btn btn-primary justify-center"
                href={primaryWhatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar via WhatsApp
              </a>
              <a className="btn btn-dark-secondary justify-center" href={`tel:${site.phone}`}>
                Ligar agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


