import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { ProjectsCatalog } from "@/components/projects/ProjectsCatalog";
import { ProjectsHero } from "@/components/projects/ProjectsHero";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos da Plano & Terra com apresentação premium, precisão técnica, galeria e suporte para visualização 3D.",
  openGraph: {
    title: "Plano & Terra | Projetos",
    description:
      "Uma vitrine técnica e sofisticada dos projetos conduzidos pela Plano & Terra.",
    images: ["/assets/og-plano-terra.svg"],
  },
  twitter: {
    title: "Plano & Terra | Projetos",
    description:
      "Projetos executados com precisão técnica, leitura territorial e visual premium.",
    images: ["/assets/og-plano-terra.svg"],
  },
};

export default function ProjetosPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsCatalog />
      <CTASection
        title="Converse com a Plano & Terra sobre o seu projeto."
        description="Atendimento objetivo para regularização, georreferenciamento e levantamento topográfico."
      />
    </>
  );
}


