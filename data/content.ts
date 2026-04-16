import { primaryWhatsappLink, whatsappLink } from "@/lib/site";

export const methodSteps = [
  {
    number: "01",
    title: "Diagnóstico",
    eyebrow: "Leitura inicial",
    description:
      "Entendimento do terreno, da finalidade do serviço e do material técnico necessário para orientar a execução com segurança.",
    points: ["escopo técnico", "contexto territorial", "documentos de apoio"],
  },
  {
    number: "02",
    title: "Levantamento",
    eyebrow: "Campo e captura",
    description:
      "Coleta de dados com drone, RTK e métodos compatíveis com a exigência da área urbana ou rural.",
    points: ["drone", "RTK", "medição em campo"],
  },
  {
    number: "03",
    title: "Entrega",
    eyebrow: "Peças finais",
    description:
      "Organização de plantas, memoriais, bases e sínteses técnicas para análise, regularização e decisão.",
    points: ["peças técnicas", "memorial", "base organizada"],
  },
];

export const services = [
  {
    id: "usucapiao",
    title: "Levantamento para usucapião",
    kicker: "Regularização possessória",
    description:
      "Perímetro, confrontações e apoio técnico para instrução documental com base territorial clara.",
    image: "/assets/visual-service-usucapiao.svg",
    href: whatsappLink(
      "Olá, gostaria de solicitar atendimento para levantamento de usucapião da Plano & Terra."
    ),
    tags: ["Perímetro", "Confrontações", "Memorial"],
  },
  {
    id: "geo-urbano",
    title: "Georreferenciamento urbano",
    kicker: "Cadastro e limites",
    description:
      "Atualização cadastral, conferência de limites e leitura espacial para imóveis e conjuntos urbanos.",
    image: "/assets/visual-service-urban.svg",
    href: whatsappLink(
      "Olá, gostaria de solicitar atendimento para georreferenciamento urbano da Plano & Terra."
    ),
    tags: ["Cadastro", "Lotes", "Base urbana"],
  },
  {
    id: "geo-rural",
    title: "Georreferenciamento rural",
    kicker: "Gestão territorial",
    description:
      "Mapeamento confiável para regularização, organização do imóvel rural e tomada de decisão técnica.",
    image: "/assets/visual-service-rural.svg",
    href: whatsappLink(
      "Olá, gostaria de solicitar atendimento para georreferenciamento rural da Plano & Terra."
    ),
    tags: ["Área rural", "Limites", "Regularização"],
  },
];

export const capabilities = [
  {
    title: "Captação aérea",
    description:
      "Leitura ampla do terreno para contexto, limites, relevo e apoio visual ao diagnóstico.",
  },
  {
    title: "Precisão RTK",
    description:
      "Posicionamento confiável para delimitação, conferências em campo e bases georreferenciadas.",
  },
  {
    title: "Material técnico final",
    description:
      "Peças gráficas, memoriais e documentação organizados para reduzir ruído na análise.",
  },
];

export const differentials = [
  "Atuação urbana e rural",
  "Tecnologia RTK e drone",
  "Material técnico organizado",
  "Precisão em campo",
];

export const faqs = [
  {
    question: "Quais serviços a Plano & Terra realiza?",
    answer:
      "A Plano & Terra atua com levantamento para usucapião, georreferenciamento urbano e rural, levantamento topográfico e suporte técnico para regularização de imóveis.",
  },
  {
    question: "Vocês atendem áreas urbanas e rurais?",
    answer:
      "Sim. A leitura técnica é adequada ao contexto de cada área, seja para imóveis urbanos, lotes, glebas, sítios ou propriedades rurais.",
  },
  {
    question: "O que é o levantamento para usucapião?",
    answer:
      "É a leitura técnica do perímetro, confrontações e elementos da área, gerando base confiável para instrução documental e apoio ao processo.",
  },
  {
    question: "O georreferenciamento serve para quais casos?",
    answer:
      "Ele pode apoiar delimitação de áreas, conferência de limites, atualização cadastral, organização territorial e processos de regularização.",
  },
  {
    question: "A Plano & Terra utiliza drone no trabalho de campo?",
    answer:
      "Sim. O drone pode integrar a captação técnica junto a RTK e outros métodos de medição, conforme a necessidade do projeto.",
  },
  {
    question: "Como solicitar atendimento?",
    answer:
      "O contato pode ser feito pelo WhatsApp ou telefone. Uma conversa inicial ajuda a entender a área, a finalidade e os documentos necessários.",
  },
];

export const cta = {
  title: "Avance com uma base técnica mais segura.",
  description:
    "Atendimento direto para regularização, georreferenciamento e levantamento topográfico.",
  href: primaryWhatsappLink,
};

