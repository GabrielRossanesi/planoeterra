export const site = {
  name: "Plano & Terra",
  tagline: "Topografia e Agrimensura",
  description:
    "Topografia, agrimensura, regularização de terrenos e georreferenciamento urbano e rural com precisão técnica.",
  url: "https://planoeterra.com.br",
  phone: "+5511985222291",
  phoneLabel: "(11) 98522-2291",
  instagram: "https://www.instagram.com/planoeterra/",
  creditUrl: "https://moralessolucoes.com.br/tecnologia",
};

export function whatsappLink(message: string) {
  return `https://wa.me/5511985222291?text=${encodeURIComponent(message)}`;
}

export const primaryWhatsappLink = whatsappLink(
  "Olá, gostaria de solicitar um atendimento da Plano & Terra."
);

export const navigation = [
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

