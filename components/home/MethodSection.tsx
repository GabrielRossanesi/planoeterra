import { MethodTimeline } from "@/components/home/MethodTimeline";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export function MethodSection() {
  return (
    <section
      id="metodo"
      className="relative overflow-hidden bg-mineral-50 py-20 md:py-28"
    >
      <div className="absolute inset-0 precision-grid opacity-[0.035]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-950/10 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <ScrollReveal className="max-w-3xl">
          <SectionHeading
            eyebrow="Método aplicado"
            title="Um processo técnico com começo, leitura e entrega clara."
            description="Três movimentos organizam a demanda: entender o terreno, captar dados com precisão e transformar tudo em material técnico útil."
          />
        </ScrollReveal>

        <MethodTimeline />
      </div>
    </section>
  );
}
