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

type BaseProject = Omit<Project, "coverImage" | "gallery">;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const createProjectVisual = ({
  index,
  title,
  location,
  category,
  palette,
  phase,
  metric,
}: {
  index: string;
  title: string;
  location: string;
  category: string;
  palette: Project["palette"];
  phase: string;
  metric: string;
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
        <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.08" />
          <stop offset="50%" stop-color="${accent}" stop-opacity="0.84" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0.12" />
        </linearGradient>
        <radialGradient id="glow" cx="72%" cy="18%" r="48%">
          <stop offset="0%" stop-color="${glow}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="${glow}" stop-opacity="0" />
        </radialGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="22" /></filter>
      </defs>
      <rect width="1600" height="900" rx="42" fill="url(#bg)" />
      <rect width="1600" height="900" rx="42" fill="url(#glow)" />
      <g opacity="0.26">
        <path d="M-80 184C130 110 280 122 430 166C580 210 714 252 922 224C1130 196 1318 90 1680 146" fill="none" stroke="${accent}" stroke-width="2"/>
        <path d="M-40 282C162 208 336 228 486 274C636 320 766 354 962 336C1158 318 1324 242 1670 268" fill="none" stroke="${accent}" stroke-width="2"/>
        <path d="M-90 388C142 312 304 334 468 390C632 446 790 486 1000 462C1210 438 1362 366 1700 410" fill="none" stroke="${accent}" stroke-width="2"/>
        <path d="M-60 516C186 454 334 476 510 534C686 592 850 626 1050 610C1250 594 1390 542 1710 596" fill="none" stroke="${accent}" stroke-width="2"/>
        <path d="M-60 654C170 602 332 626 502 684C672 742 856 778 1080 754C1304 730 1436 688 1700 732" fill="none" stroke="${accent}" stroke-width="2"/>
      </g>
      <g opacity="0.11">
        <path d="M110 118h1380v664H110z" fill="none" stroke="#ffffff" stroke-width="2"/>
        <path d="M230 182v518M410 182v518M590 182v518M770 182v518M950 182v518M1130 182v518M1310 182v518" fill="none" stroke="#ffffff" stroke-width="1"/>
        <path d="M110 278h1380M110 438h1380M110 598h1380" fill="none" stroke="#ffffff" stroke-width="1"/>
      </g>
      <g opacity="0.9">
        <path d="M316 242L590 214L864 278L1008 250L1258 330L1126 608L864 674L620 614L360 642L250 452Z" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-width="4"/>
        <path d="M330 256L562 236L830 294L982 270L1214 338" fill="none" stroke="${accent}" stroke-width="5"/>
        <path d="M302 444L482 422L650 478L864 446L1030 494L1182 470" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.62"/>
        <circle cx="864" cy="446" r="12" fill="${accent}" />
        <circle cx="1126" cy="608" r="10" fill="#ffffff" fill-opacity="0.72" />
      </g>
      <g transform="translate(124,118)">
        <text x="0" y="0" fill="${accent}" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="800" letter-spacing="8">${escapeXml(
          category.toUpperCase()
        )}</text>
        <text x="0" y="86" fill="#f8f3e8" font-size="74" font-family="Georgia, serif" font-weight="700">${escapeXml(
          title
        )}</text>
        <text x="0" y="138" fill="#d7dfd9" font-size="28" font-family="Inter, Arial, sans-serif">${escapeXml(
          location
        )}</text>
      </g>
      <g transform="translate(1166,120)">
        <rect width="274" height="180" rx="28" fill="#0d1712" fill-opacity="0.58" stroke="#ffffff" stroke-opacity="0.18"/>
        <text x="28" y="46" fill="#f3ebd6" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="800" letter-spacing="4">PROJETO ${escapeXml(
          index
        )}</text>
        <text x="28" y="92" fill="#ffffff" font-size="18" font-family="Inter, Arial, sans-serif">Fase</text>
        <text x="28" y="124" fill="${accent}" font-size="34" font-family="Inter, Arial, sans-serif" font-weight="800">${escapeXml(
          phase
        )}</text>
        <text x="28" y="160" fill="#d7dfd9" font-size="18" font-family="Inter, Arial, sans-serif">${escapeXml(
          metric
        )}</text>
      </g>
      <rect x="124" y="724" width="1320" height="1" fill="url(#line)" />
      <circle cx="1306" cy="222" r="88" fill="${accent}" fill-opacity="0.18" filter="url(#soft)" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const createGallery = (project: Project) => [
  project.coverImage,
  createProjectVisual({
    index: project.id,
    title: `${project.title} | Malha técnica`,
    location: project.location,
    category: project.category,
    palette: project.palette,
    phase: "Mapeamento",
    metric: project.galleryMetrics[0],
  }),
  createProjectVisual({
    index: project.id,
    title: `${project.title} | Consolidação documental`,
    location: project.location,
    category: project.category,
    palette: project.palette,
    phase: "Entrega",
    metric: project.galleryMetrics[1],
  }),
];

const baseProjects: BaseProject[] = [
  {
    id: "PT-001",
    slug: "sitio-santa-rita-usucapiao",
    title: "Sítio Santa Rita",
    location: "Mairiporã, SP",
    category: "Usucapião",
    serviceType: "Levantamento para usucapião",
    shortDescription:
      "Levantamento técnico e consolidação documental para regularização possessória em área mista.",
    fullDescription:
      "Projeto estruturado para apoiar o processo de usucapião, com leitura topográfica do perímetro, organização das informações territoriais e preparação técnica da documentação necessária para instrução jurídica com mais clareza.",
    status: "Concluído",
    year: "2026",
    areaLabel: "18,4 ha",
    modelReadyLabel: "Preparado para mídia 3D",
    has3dModel: false,
    viewerHint:
      "Este projeto exibe imagens técnicas. Um arquivo .glb pode ser incorporado futuramente sem alterar a experiência do catálogo.",
    summary: [
      { label: "Serviço", value: "Usucapião" },
      { label: "Área", value: "18,4 ha" },
      { label: "Ano", value: "2026" },
      { label: "Status", value: "Concluído" },
    ],
    technicalInfo: [
      { label: "Escopo", value: "Perímetro, confrontações e peças técnicas de apoio" },
      { label: "Base", value: "Levantamento planialtimétrico com organização territorial" },
      { label: "Documentação", value: "Memorial descritivo e peças gráficas de suporte" },
      { label: "Entrega", value: "Material técnico preparado para instrução do processo" },
    ],
    deliverables: [
      "Levantamento do perímetro, com conferência de confrontações",
      "Peças técnicas para instrução da regularização possessória",
      "Memorial descritivo com leitura territorial consolidada",
      "Apoio técnico para alinhamento documental do processo",
    ],
    galleryMetrics: ["Confrontações revisadas", "Memorial e peças gráficas"],
    palette: ["#07110d", "#10231b", "#2b4c3b", "#d6b67a", "#89a993"],
  },
  {
    id: "PT-002",
    slug: "residencial-vista-alta-urbano",
    title: "Residencial Vista Alta",
    location: "Franco da Rocha, SP",
    category: "Georreferenciamento urbano",
    serviceType: "Georreferenciamento urbano",
    shortDescription:
      "Atualização cadastral e georreferenciamento em loteamento urbano, com foco em precisão posicional.",
    fullDescription:
      "Projeto voltado à atualização cadastral de um conjunto urbano, com conferência de limites, leitura territorial precisa e padronização das entregas técnicas para apoiar regularização, cadastro e tomada de decisão com segurança.",
    status: "Entregue",
    year: "2025",
    areaLabel: "42 lotes",
    modelReadyLabel: "Pipeline 3D preparado",
    has3dModel: true,
    viewerHint:
      "A área de visualização aceita modelos .glb ou .gltf. Nesta seleção, a galeria técnica mantém a experiência estável.",
    summary: [
      { label: "Serviço", value: "Georreferenciamento urbano" },
      { label: "Escala", value: "42 lotes" },
      { label: "Ano", value: "2025" },
      { label: "Status", value: "Entregue" },
    ],
    technicalInfo: [
      { label: "Escopo", value: "Atualização cadastral e consolidação de base urbana" },
      { label: "Precisão", value: "Referenciamento posicional para conferência de limites" },
      { label: "Compatibilização", value: "Ajuste de informações para leitura documental" },
      { label: "Visualização", value: "Pronto para incorporar modelo 3D do conjunto" },
    ],
    deliverables: [
      "Mapeamento técnico de quadras, lotes e frentes urbanas",
      "Base vetorial organizada para revisão documental",
      "Painel visual pronto para apresentação técnica do projeto",
      "Estrutura compatível com visualização 3D futura",
    ],
    galleryMetrics: ["Malha cadastral revisada", "Compatibilização urbana"],
    palette: ["#08131c", "#102737", "#2d5875", "#c4ab78", "#8fb8d2"],
  },
  {
    id: "PT-003",
    slug: "fazenda-boa-esperanca-rural",
    title: "Fazenda Boa Esperança",
    location: "Atibaia, SP",
    category: "Georreferenciamento rural",
    serviceType: "Georreferenciamento rural",
    shortDescription:
      "Leitura territorial e organização técnica do imóvel rural para delimitação precisa.",
    fullDescription:
      "Desenvolvido para consolidar uma base territorial confiável em área rural, este projeto reuniu levantamento, organização das referências espaciais e padronização dos dados para fortalecer o controle técnico do imóvel.",
    status: "Concluído",
    year: "2026",
    areaLabel: "126 ha",
    modelReadyLabel: "Pronto para modelo 3D",
    has3dModel: true,
    viewerHint:
      "Quando o arquivo 3D estiver disponível, este espaço passa a exibir rotação, zoom e enquadramento do modelo sem alterar o restante da interface.",
    summary: [
      { label: "Serviço", value: "Georreferenciamento rural" },
      { label: "Área", value: "126 ha" },
      { label: "Ano", value: "2026" },
      { label: "Status", value: "Concluído" },
    ],
    technicalInfo: [
      { label: "Escopo", value: "Perímetro rural com leitura territorial consolidada" },
      { label: "Organização", value: "Base georreferenciada para gestão técnica do imóvel" },
      { label: "Entregas", value: "Peças visuais e síntese documental do projeto" },
      { label: "Mídia", value: "Compatível com apresentação 3D e fallback estático" },
    ],
    deliverables: [
      "Perímetro técnico consolidado, com referências espaciais claras",
      "Painel visual com leitura de áreas e confrontações",
      "Documentação resumida para comunicação com segurança",
      "Estrutura pronta para anexar mídia tridimensional do terreno",
    ],
    galleryMetrics: ["126 ha analisados", "Referências territoriais"],
    palette: ["#06120a", "#0e2517", "#33553a", "#d3bc88", "#8fb28c"],
  },
  {
    id: "PT-004",
    slug: "condominio-pedra-branca-topografia",
    title: "Condomínio Pedra Branca",
    location: "Bragança Paulista, SP",
    category: "Levantamento topográfico",
    serviceType: "Levantamento topográfico planialtimétrico",
    shortDescription:
      "Levantamento planialtimétrico para implantação, compatibilização técnica e leitura refinada do terreno.",
    fullDescription:
      "Projeto conduzido para organizar as informações topográficas de um condomínio em expansão, permitindo leitura clara da área, planejamento técnico e visão consolidada das condições do terreno para as próximas etapas de implantação.",
    status: "Em portfólio",
    year: "2025",
    areaLabel: "11,7 ha",
    modelReadyLabel: "Modelo 3D publicado",
    has3dModel: true,
    model3dUrl: withBasePath("/ex3d.glb"),
    modelBadgeLabel: "Topografia 3D",
    modelCtaLabel: "Ver topografia 3D",
    modelSupportText: "Modelo demonstrativo de visualização topográfica em 3D.",
    model3dViewerConfig: {
      orientation: "-90deg 0deg 0deg",
      cameraOrbit: "38deg 68deg auto",
      cameraTarget: "10m 80m 174m",
      fieldOfView: "32deg",
      minCameraOrbit: "auto 45deg auto",
      maxCameraOrbit: "auto 88deg auto",
    },
    viewerHint:
      "Este case já conta com um modelo .glb publicado, com rotação, zoom e fallback seguro para visualização técnica.",
    summary: [
      { label: "Serviço", value: "Levantamento topográfico" },
      { label: "Área", value: "11,7 ha" },
      { label: "Ano", value: "2025" },
      { label: "Status", value: "Em portfólio" },
    ],
    technicalInfo: [
      { label: "Escopo", value: "Planialtimetria para suporte de implantação" },
      { label: "Leitura", value: "Camadas técnicas organizadas para interpretação rápida" },
      { label: "Uso", value: "Apoio ao planejamento e compatibilização de projeto" },
      { label: "Mídia", value: "Galeria premium com viewer 3D publicado" },
    ],
    deliverables: [
      "Base topográfica com pontos e curvas organizadas visualmente",
      "Leitura planialtimétrica para apoio ao planejamento",
      "Painel visual para apresentação do terreno ao cliente",
      "Galeria com cenas técnicas orientadas por etapas do levantamento",
    ],
    galleryMetrics: ["Planialtimetria refinada", "Leitura de implantação"],
    palette: ["#0c1017", "#182333", "#435b80", "#d1b57d", "#9ab0d6"],
  },
  {
    id: "PT-005",
    slug: "gleba-serra-verde-regularizacao",
    title: "Gleba Serra Verde",
    location: "Jarinu, SP",
    category: "Regularização de área",
    serviceType: "Regularização de área",
    shortDescription:
      "Estruturação técnica de informações territoriais e documentais para regularização de uma gleba.",
    fullDescription:
      "Neste projeto, a Plano & Terra organizou a leitura territorial de uma gleba com recortes distintos, consolidando informações técnicas, visualização clara das áreas e suporte para comunicação documental de forma objetiva.",
    status: "Concluído",
    year: "2026",
    areaLabel: "32,8 ha",
    modelReadyLabel: "Pronto para mídia complementar",
    has3dModel: false,
    viewerHint:
      "O componente já suporta mídia 3D e permanece estável com imagens estáticas quando o modelo não for necessário.",
    summary: [
      { label: "Serviço", value: "Regularização de área" },
      { label: "Área", value: "32,8 ha" },
      { label: "Ano", value: "2026" },
      { label: "Status", value: "Concluído" },
    ],
    technicalInfo: [
      { label: "Escopo", value: "Regularização com leitura de recortes e limites" },
      { label: "Apoio", value: "Síntese técnica para alinhamento documental" },
      { label: "Organização", value: "Estrutura visual para comunicar cenários de área" },
      { label: "Entrega", value: "Material técnico com linguagem clara e rastreável" },
    ],
    deliverables: [
      "Painel visual das porções analisadas na área",
      "Resumo técnico para comunicação com clareza",
      "Suporte à organização das informações fundiárias",
      "Estrutura preparada para apresentações futuras do projeto",
    ],
    galleryMetrics: ["Recortes consolidados", "Síntese documental"],
    palette: ["#0f0d08", "#201a12", "#5d4930", "#d5bc86", "#d7b788"],
  },
  {
    id: "PT-006",
    slug: "jardim-novo-marco-cadastral",
    title: "Jardim Novo Marco",
    location: "Campo Limpo Paulista, SP",
    category: "Georreferenciamento urbano",
    serviceType: "Atualização cadastral e georreferenciamento urbano",
    shortDescription:
      "Revisão de malha urbana e consolidação de informações para atualização cadastral.",
    fullDescription:
      "Projeto urbano estruturado para revisar a malha cadastral de um bairro em expansão, com foco em leitura precisa dos limites, organização espacial e apresentação visual que facilite análise técnica e comercial.",
    status: "Entregue",
    year: "2024",
    areaLabel: "58 frentes",
    modelReadyLabel: "Pipeline 3D preparado",
    has3dModel: true,
    viewerHint:
      "O modal está pronto para receber um modelo tridimensional do bairro, mantendo lazy load, loading state elegante e fallback estático.",
    summary: [
      { label: "Serviço", value: "Georreferenciamento urbano" },
      { label: "Escala", value: "58 frentes" },
      { label: "Ano", value: "2024" },
      { label: "Status", value: "Entregue" },
    ],
    technicalInfo: [
      { label: "Escopo", value: "Atualização de base urbana com foco cadastral" },
      { label: "Leitura", value: "Delimitação visual de frentes e áreas de apoio" },
      { label: "Apresentação", value: "Detalhamento premium para comunicação técnica" },
      { label: "Mídia", value: "Preparado para incorporar arquivo 3D do conjunto" },
    ],
    deliverables: [
      "Malha urbana revisada com leitura clara do conjunto",
      "Resumo técnico para apresentação comercial do case",
      "Galeria com cenas da evolução visual do projeto",
      "Estrutura pronta para demonstração 3D, quando houver arquivo compatível",
    ],
    galleryMetrics: ["58 frentes analisadas", "Atualização cadastral"],
    palette: ["#07141b", "#112836", "#31556c", "#d0ae73", "#9bc0d7"],
  },
];

export const projects: Project[] = baseProjects.map((project) => {
  const coverImage = createProjectVisual({
    index: project.id,
    title: project.title,
    location: project.location,
    category: project.category,
    palette: project.palette,
    phase: project.status,
    metric: project.areaLabel,
  });

  const projectWithCover = {
    ...project,
    coverImage,
  } as Project;

  return {
    ...projectWithCover,
    gallery: createGallery(projectWithCover),
  };
});

export const projectCategories = [
  "Todos",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export const featuredProjects = projects.slice(0, 4);

export const hasPublished3D = (project: Project) =>
  Boolean(project.has3dModel && project.model3dUrl);

export const buildProjectWhatsappLink = (project: Project) =>
  whatsappLink(`Olá, gostaria de falar sobre o projeto ${project.title} da Plano & Terra.`);

