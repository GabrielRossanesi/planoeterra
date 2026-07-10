import { whatsappLink } from "@/lib/site";

import { withBasePath } from "@/lib/site";

export type ProjectCategory =
  | "Usucapião"
  | "Georreferenciamento urbano"
  | "Georreferenciamento rural"
  | "Levantamento topográfico"
  | "Regularização de área";

export type ProjectSummaryItem = {
  label: string;
  value: string;
};

export type ModelViewerConfig = {
  orientation?: string;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  minCameraOrbit?: string;
  maxCameraOrbit?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  serviceType: string;
  shortDescription: string;
  fullDescription: string;
  status: string;
  year: string;
  areaLabel: string;
  modelReadyLabel: string;
  has3dModel: boolean;
  usesDroneRTK: boolean;
  model3dUrl?: string;
  modelBadgeLabel?: string;
  modelCtaLabel?: string;
  modelSupportText?: string;
  model3dViewerConfig?: ModelViewerConfig;
  viewerHint: string;
  summary: ProjectSummaryItem[];
  technicalInfo: ProjectSummaryItem[];
  deliverables: string[];
  galleryMetrics: [string, string];
  palette: [string, string, string, string, string];
  coverImage: string;
  gallery: string[];
};

// Real projects supply their own images; palette-based SVGs remain as a
// fallback for any future case added without photography.
type BaseProject = Omit<Project, "coverImage" | "gallery"> & {
  coverImage?: string;
  gallery?: string[];
};

const photo = (name: string) => withBasePath(`/photos/${name}`);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const createProjectVisual = ({
  title,
  location,
  palette,
}: {
  title: string;
  location: string;
  palette: Project["palette"];
}) => {
  const [deep, dark, mid, accent, glow] = palette;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${escapeXml(
      `${title} - ${location}`
    )}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${deep}" />
          <stop offset="46%" stop-color="${dark}" />
          <stop offset="100%" stop-color="${mid}" />
        </linearGradient>
        <radialGradient id="glow" cx="72%" cy="18%" r="48%">
          <stop offset="0%" stop-color="${glow}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="${glow}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" rx="42" fill="url(#bg)" />
      <rect width="1600" height="900" rx="42" fill="url(#glow)" />
      <g opacity="0.9">
        <path d="M316 242L590 214L864 278L1008 250L1258 330L1126 608L864 674L620 614L360 642L250 452Z" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-width="4"/>
        <circle cx="864" cy="446" r="12" fill="${accent}" />
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const baseProjects: BaseProject[] = [
  {
    id: "PT-001",
    slug: "jardim-margareth-reurb",
    title: "Jardim Margareth",
    location: "Suzano, SP",
    category: "Georreferenciamento urbano",
    serviceType: "Levantamento planialtimétrico cadastral — REURB",
    shortDescription:
      "Levantamento aerofotogramétrico e cadastral do bairro para Regularização Fundiária Urbana (REURB), com modelo 3D real navegável.",
    fullDescription:
      "Levantamento planialtimétrico cadastral do Jardim Margareth, em Suzano/SP, para instruir o processo de Regularização Fundiária Urbana (REURB). A captação combinou aerofotogrametria com drone e apoio GNSS/RTK, gerando ortofoto, modelo tridimensional do bairro e a planta cadastral com quadras, lotes, arruamento e confrontações — base para a titulação dos moradores e a atualização do cadastro municipal.",
    status: "Entregue",
    year: "2025",
    areaLabel: "Bairro · REURB",
    modelReadyLabel: "Modelo 3D publicado",
    has3dModel: true,
    usesDroneRTK: true,
    model3dUrl: withBasePath("/models/jd-margareth-reurb.glb"),
    modelBadgeLabel: "REURB em 3D",
    modelCtaLabel: "Ver o bairro em 3D",
    modelSupportText:
      "Modelo 3D real gerado por aerofotogrametria com drone. Arraste para girar e use pinça ou scroll para aproximar.",
    model3dViewerConfig: {
      orientation: "0deg -90deg 0deg",
      cameraOrbit: "0deg 60deg auto",
      fieldOfView: "30deg",
      minCameraOrbit: "auto 22deg auto",
      maxCameraOrbit: "auto 84deg auto",
    },
    viewerHint:
      "Modelo tridimensional real do levantamento, com rotação, zoom e fallback estático seguro.",
    summary: [
      { label: "Serviço", value: "REURB" },
      { label: "Local", value: "Suzano, SP" },
      { label: "Ano", value: "2025" },
      { label: "Status", value: "Entregue" },
    ],
    technicalInfo: [
      { label: "Escopo", value: "Levantamento planialtimétrico cadastral para REURB" },
      { label: "Captação", value: "Aerofotogrametria com drone e apoio GNSS/RTK" },
      { label: "Leitura", value: "Quadras, lotes, arruamento e confrontações" },
      { label: "Mídia", value: "Ortofoto, planta cadastral e modelo 3D navegável" },
    ],
    deliverables: [
      "Modelo tridimensional do bairro gerado por fotogrametria",
      "Ortofoto e planta cadastral com quadras e lotes",
      "Base técnica para instrução do processo de REURB",
      "Material de apresentação para prefeitura e moradores",
    ],
    galleryMetrics: ["Cadastro urbano REURB", "Modelo 3D publicado"],
    palette: ["#07141b", "#112836", "#31556c", "#d0ae73", "#9bc0d7"],
    coverImage: photo("ortofoto-bairro.webp"),
    gallery: [
      photo("ortofoto-bairro.webp"),
      photo("aerea-bairro-01.webp"),
      photo("planta-margareth.webp"),
      photo("campo-rtk-01.webp"),
    ],
  },
  {
    id: "PT-002",
    slug: "jardim-gardenia-azul-reurb",
    title: "Jardim Gardênia Azul",
    location: "Suzano, SP",
    category: "Georreferenciamento urbano",
    serviceType: "Levantamento planialtimétrico com curvas de nível — REURB",
    shortDescription:
      "Levantamento planialtimétrico cadastral com curvas de nível para regularização fundiária urbana de todo o bairro.",
    fullDescription:
      "Levantamento planialtimétrico cadastral do Jardim Gardênia Azul, em Suzano/SP, com aproximadamente 18,5 hectares mapeados para o processo de Regularização Fundiária Urbana (REURB). O trabalho incluiu a demarcação de quadras, lotes e sistema viário, além do modelamento do relevo com curvas de nível — consolidando a base cadastral e altimétrica do bairro para titulação e aprovação nos órgãos competentes.",
    status: "Entregue",
    year: "2025",
    areaLabel: "18,5 ha",
    modelReadyLabel: "Planta cadastral entregue",
    has3dModel: false,
    usesDroneRTK: true,
    viewerHint:
      "Este case exibe a planta cadastral real e imagens técnicas do levantamento.",
    summary: [
      { label: "Serviço", value: "REURB" },
      { label: "Área", value: "18,5 ha" },
      { label: "Ano", value: "2025" },
      { label: "Status", value: "Entregue" },
    ],
    technicalInfo: [
      { label: "Escopo", value: "Levantamento planialtimétrico cadastral com curvas de nível" },
      { label: "Captação", value: "Poligonais GNSS/RTK e apoio topográfico em campo" },
      { label: "Leitura", value: "Quadras, lotes, sistema viário e relevo" },
      { label: "Entrega", value: "Planta cadastral e memorial para REURB" },
    ],
    deliverables: [
      "Planta planialtimétrica cadastral com curvas de nível",
      "Quadro de áreas de quadras, lotes e sistema viário",
      "Base altimétrica e cadastral para o processo de REURB",
      "Material técnico para aprovação junto aos órgãos públicos",
    ],
    galleryMetrics: ["18,5 ha mapeados", "Planta com curvas de nível"],
    palette: ["#0f0d08", "#201a12", "#5d4930", "#d5bc86", "#d7b788"],
    coverImage: photo("planta-gardenia.webp"),
    gallery: [
      photo("planta-gardenia.webp"),
      photo("aerea-bairro-02.webp"),
      photo("equip-rtk-01.webp"),
      photo("campo-rtk-02.webp"),
    ],
  },
  {
    id: "PT-003",
    slug: "demonstracao-topografia-3d",
    title: "Demonstração topográfica 3D",
    location: "Modelo interativo",
    category: "Levantamento topográfico",
    serviceType: "Visualização topográfica tridimensional",
    shortDescription:
      "Demonstração interativa de um levantamento topográfico em 3D — gire, aproxime e explore o relevo direto no navegador.",
    fullDescription:
      "Modelo demonstrativo que ilustra como um levantamento topográfico pode ser entregue em 3D navegável. Serve para mostrar a leitura de relevo, edificações e elementos do terreno em perspectiva, com rotação e zoom — a mesma experiência aplicada aos projetos reais da Plano & Terra que contam com captação aérea.",
    status: "Demonstração",
    year: "—",
    areaLabel: "Modelo interativo",
    modelReadyLabel: "Modelo 3D demonstrativo",
    has3dModel: true,
    usesDroneRTK: false,
    model3dUrl: withBasePath("/models/topografia-demo.glb"),
    modelBadgeLabel: "Topografia 3D",
    modelCtaLabel: "Explorar em 3D",
    modelSupportText:
      "Modelo demonstrativo de visualização topográfica em 3D. Arraste para girar e use pinça ou scroll para aproximar.",
    model3dViewerConfig: {
      cameraOrbit: "38deg 68deg auto",
      cameraTarget: "10m 80m 174m",
      fieldOfView: "32deg",
      minCameraOrbit: "auto 45deg auto",
      maxCameraOrbit: "auto 88deg auto",
    },
    viewerHint:
      "Demonstração de visualização topográfica em 3D, com rotação, zoom e fallback estático.",
    summary: [
      { label: "Tipo", value: "Demonstração" },
      { label: "Mídia", value: "Modelo 3D" },
      { label: "Interação", value: "Girar e ampliar" },
      { label: "Uso", value: "Exemplo técnico" },
    ],
    technicalInfo: [
      { label: "Objetivo", value: "Ilustrar a entrega de topografia em 3D navegável" },
      { label: "Leitura", value: "Relevo, edificações e elementos do terreno" },
      { label: "Interação", value: "Rotação, zoom e enquadramento livre" },
      { label: "Aplicação", value: "Mesma experiência dos projetos reais com voo" },
    ],
    deliverables: [
      "Visualização tridimensional navegável do terreno",
      "Leitura de relevo e implantação em perspectiva",
      "Exemplo do padrão de entrega 3D da Plano & Terra",
    ],
    galleryMetrics: ["Modelo demonstrativo", "Visualização 3D"],
    palette: ["#0c1017", "#182333", "#435b80", "#d1b57d", "#9ab0d6"],
    coverImage: photo("planejamento-voo.webp"),
    gallery: [photo("planejamento-voo.webp"), photo("aerea-bairro-01.webp")],
  },
];

export const projects: Project[] = baseProjects.map((project) => {
  const coverImage =
    project.coverImage ||
    createProjectVisual({
      title: project.title,
      location: project.location,
      palette: project.palette,
    });

  return {
    ...project,
    coverImage,
    gallery: project.gallery && project.gallery.length ? project.gallery : [coverImage],
  } as Project;
});

export const projectCategories = [
  "Todos",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export const hasPublished3D = (project: Project) =>
  Boolean(project.has3dModel && project.model3dUrl);

// Real 3D-published cases lead the home preview.
export const featuredProjects = [
  ...projects.filter(hasPublished3D),
  ...projects.filter((project) => !hasPublished3D(project)),
].slice(0, 4);

export const buildProjectWhatsappLink = (project: Project) =>
  whatsappLink(`Olá, gostaria de falar sobre o projeto ${project.title} da Plano & Terra.`);
