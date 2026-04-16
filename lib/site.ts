export const site = {
  name: "Plano & Terra",
  tagline: "Topografia e Agrimensura",
  description:
    "Topografia, agrimensura, regularização de terrenos e georreferenciamento urbano e rural com precisão técnica.",
  url: "https://gabrielrossanesi.github.io/planoeterra",
  phone: "+5511985222291",
  phoneLabel: "(11) 98522-2291",
  instagram: "https://www.instagram.com/planoeterra/",
  creditUrl: "https://moralessolucoes.com.br/tecnologia",
};

export const siteBasePath = "/planoeterra";

export function withBasePath(path: string) {
  if (
    !path ||
    path.startsWith("data:") ||
    path.startsWith("http") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  if (path === siteBasePath || path.startsWith(`${siteBasePath}/`)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}

export function stripBasePath(path: string) {
  if (path === siteBasePath) {
    return "/";
  }

  if (path.startsWith(`${siteBasePath}/`)) {
    return path.slice(siteBasePath.length) || "/";
  }

  return path;
}

export function absoluteUrl(path = "") {
  if (!path || path === "/") {
    return site.url;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalizedPath}`;
}

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

