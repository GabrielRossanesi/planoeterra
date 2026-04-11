(() => {
  const projectsGrid = document.getElementById("projects-grid");
  const modal = document.getElementById("project-modal");

  if (!projectsGrid || !modal) {
    return;
  }

  const fallbackProjects = {
    "sitio-santa-rita": {
      id: "PT-001",
      category: "Usucapiao",
      status: "Concluido",
      title: "Sitio Santa Rita",
      location: "Mairipora, SP",
      serviceType: "Levantamento para usucapiao",
      description:
        "Leitura do perimetro, apoio documental e organizacao tecnica para um processo de regularizacao mais seguro.",
      areaLabel: "18,4 ha",
      contactText: "Ola, gostaria de falar sobre o projeto Sitio Santa Rita da Plano & Terra.",
      summary: [
        { label: "Servico", value: "Usucapiao" },
        { label: "Area", value: "18,4 ha" },
        { label: "Ano", value: "2026" },
        { label: "Status", value: "Concluido" },
      ],
      technicalInfo: [
        { label: "Escopo", value: "Perimetro e confrontacoes da area" },
        { label: "Captacao", value: "Leitura tecnica em campo e consolidacao visual" },
        { label: "Entrega", value: "Memorial e pecas de apoio para regularizacao" },
        { label: "Midia", value: "Galeria visual com fallback premium" },
      ],
      deliverables: [
        "Levantamento do perimetro",
        "Pecas tecnicas de apoio",
        "Memorial descritivo",
        "Sintese territorial para tomada de decisao",
      ],
    },
    "residencial-vista-alta": {
      id: "PT-002",
      category: "Georreferenciamento urbano",
      status: "Entregue",
      title: "Residencial Vista Alta",
      location: "Franco da Rocha, SP",
      serviceType: "Georreferenciamento urbano",
      description:
        "Atualizacao cadastral com leitura visual clara, compatibilizacao espacial e suporte para apresentacao tecnica.",
      areaLabel: "42 lotes",
      contactText: "Ola, gostaria de falar sobre o projeto Residencial Vista Alta da Plano & Terra.",
      summary: [
        { label: "Servico", value: "Georreferenciamento urbano" },
        { label: "Escala", value: "42 lotes" },
        { label: "Ano", value: "2025" },
        { label: "Status", value: "Entregue" },
      ],
      technicalInfo: [
        { label: "Escopo", value: "Revisao cadastral e consolidacao de base urbana" },
        { label: "Precisao", value: "Referenciamento posicional para conferencias" },
        { label: "Apresentacao", value: "Leitura premium para contexto tecnico e comercial" },
        { label: "Midia", value: "Preparado para preview 3D e fallback estatico" },
      ],
      deliverables: [
        "Mapeamento tecnico de lotes e frentes",
        "Base vetorial organizada",
        "Painel visual para apresentacao",
        "Estrutura pronta para visualizacao 3D",
      ],
    },
    "fazenda-boa-esperanca": {
      id: "PT-003",
      category: "Georreferenciamento rural",
      status: "Concluido",
      title: "Fazenda Boa Esperanca",
      location: "Atibaia, SP",
      serviceType: "Georreferenciamento rural",
      description:
        "Consolidacao de leitura territorial rural com delimitacao precisa e material tecnico para consulta rapida.",
      areaLabel: "126 ha",
      contactText: "Ola, gostaria de falar sobre o projeto Fazenda Boa Esperanca da Plano & Terra.",
      summary: [
        { label: "Servico", value: "Georreferenciamento rural" },
        { label: "Area", value: "126 ha" },
        { label: "Ano", value: "2026" },
        { label: "Status", value: "Concluido" },
      ],
      technicalInfo: [
        { label: "Escopo", value: "Perimetro rural com organizacao territorial" },
        { label: "Captacao", value: "Levantamento com leitura visual do terreno" },
        { label: "Entrega", value: "Sintese tecnica e pecas de apoio" },
        { label: "Midia", value: "Vitrine premium com galeria estatica" },
      ],
      deliverables: [
        "Perimetro tecnico consolidado",
        "Painel visual de area e confrontacoes",
        "Resumo tecnico para comunicacao",
        "Estrutura pronta para detalhamento futuro",
      ],
    },
  };

  const elements = {
    closeButton: document.getElementById("project-modal-close"),
    category: document.getElementById("modal-project-category"),
    status: document.getElementById("modal-project-status"),
    id: document.getElementById("modal-project-id"),
    title: document.getElementById("project-modal-title"),
    location: document.getElementById("project-modal-location"),
    description: document.getElementById("project-modal-description"),
    summary: document.getElementById("project-detail-summary"),
    tech: document.getElementById("project-tech-grid"),
    deliverables: document.getElementById("project-deliverables"),
    contact: document.getElementById("project-contact-button"),
    tabs: document.getElementById("project-visual-tabs"),
    stage: document.getElementById("project-visual-stage"),
    gallery: document.getElementById("project-gallery-strip"),
  };

  const fallbackImage = "./drone.avif";

  const buildWhatsappLink = (text) =>
    `https://wa.me/5511985222291?text=${encodeURIComponent(text)}`;

  const openModal = () => {
    document.body.classList.add("modal-open");
    if (typeof modal.showModal === "function") {
      if (!modal.open) {
        modal.showModal();
      }
    } else {
      modal.setAttribute("open", "true");
    }
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    if (typeof modal.close === "function" && modal.open) {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
  };

  const renderFallbackProject = (project) => {
    elements.category.textContent = project.category;
    elements.status.textContent = project.status;
    elements.id.textContent = project.id;
    elements.title.textContent = project.title;
    elements.location.textContent = `${project.location} • ${project.serviceType}`;
    elements.description.textContent = project.description;
    elements.contact.href = buildWhatsappLink(project.contactText);

    elements.summary.innerHTML = project.summary
      .map(
        (item) => `
          <article class="project-summary-card">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
          </article>
        `
      )
      .join("");

    elements.tech.innerHTML = project.technicalInfo
      .map(
        (item) => `
          <article class="project-tech-card">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
          </article>
        `
      )
      .join("");

    elements.deliverables.innerHTML = project.deliverables
      .map((item) => `<li>${item}</li>`)
      .join("");

    elements.tabs.innerHTML = `
      <div class="project-visual-hint">
        <span class="project-visual-chip">Imagem tecnica</span>
        <p>Preview local ativo para manter a vitrine funcional.</p>
      </div>
    `;

    elements.stage.innerHTML = `
      <div class="project-stage-frame is-image">
        <img class="project-stage-image" src="${fallbackImage}" alt="${project.title} - visual tecnico" decoding="async">
        <div class="project-stage-caption">
          <span>Leitura visual</span>
          <strong>${project.areaLabel}</strong>
        </div>
        <p class="project-stage-note">Visual de apoio exibido no modo local. O catalogo dinamico substitui este fallback quando o modulo estiver ativo.</p>
      </div>
    `;

    elements.gallery.innerHTML = Array.from({ length: 3 }, (_, index) => `
      <button
        class="project-gallery-thumb ${index === 0 ? "is-active" : ""}"
        type="button"
        aria-label="Imagem ${index + 1} do projeto ${project.title}"
        aria-pressed="${index === 0 ? "true" : "false"}"
      >
        <img src="${fallbackImage}" alt="${project.title} - preview ${index + 1}" loading="lazy" decoding="async">
      </button>
    `).join("");

    openModal();
  };

  projectsGrid.addEventListener("click", (event) => {
    if (window.__projectsCatalogReady) {
      return;
    }

    const button = event.target.closest("[data-fallback-project]");
    if (!button) {
      return;
    }

    const project = fallbackProjects[button.dataset.fallbackProject];
    if (!project) {
      return;
    }

    renderFallbackProject(project);
  });

  if (elements.closeButton) {
    elements.closeButton.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.hasAttribute("open")) {
      closeModal();
    }
  });
})();
