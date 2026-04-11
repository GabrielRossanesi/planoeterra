import {
  buildProjectWhatsappLink,
  projectCategories,
  projects,
} from "./projects-data.js";

const MODEL_VIEWER_SRC =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js";

const projectsGrid = document.getElementById("projects-grid");
const filtersContainer = document.getElementById("project-filters");
const resultsCount = document.getElementById("projects-results-count");
const resultsLabel = document.getElementById("projects-results-label");

const modal = document.getElementById("project-modal");
const closeModalButton = document.getElementById("project-modal-close");
const modalCategory = document.getElementById("modal-project-category");
const modalStatus = document.getElementById("modal-project-status");
const modalProjectId = document.getElementById("modal-project-id");
const modalTitle = document.getElementById("project-modal-title");
const modalLocation = document.getElementById("project-modal-location");
const modalDescription = document.getElementById("project-modal-description");
const modalSummary = document.getElementById("project-detail-summary");
const modalTechGrid = document.getElementById("project-tech-grid");
const modalDeliverables = document.getElementById("project-deliverables");
const modalContactButton = document.getElementById("project-contact-button");
const visualTabs = document.getElementById("project-visual-tabs");
const visualStage = document.getElementById("project-visual-stage");
const galleryStrip = document.getElementById("project-gallery-strip");

const state = {
  activeCategory: "Todos",
  activeProject: null,
  activeImageIndex: 0,
  activeVisual: "image",
};

let modelViewerPromise = null;
let stageRenderToken = 0;

const cubeIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2 4.5 6.25v11.5L12 22l7.5-4.25V6.25L12 2Zm0 1.96 5.66 3.2L12 10.36 6.34 7.16 12 3.96Zm-6 4.58 5.1 2.9v7.64L6 16.2V8.54Zm12 0v7.66l-5.1 2.88v-7.64L18 8.54Z" />
  </svg>
`;

const hasPublished3D = (project) => Boolean(project.has3dModel && project.model3dUrl);

const filteredProjects = () =>
  state.activeCategory === "Todos"
    ? projects
    : projects.filter((project) => project.category === state.activeCategory);

const createCardMarkup = (project) => {
  const projectHasPublished3D = hasPublished3D(project);
  const badgeLabel = project.modelBadgeLabel || "Visualização 3D";
  const ctaLabel = project.modelCtaLabel || "Abrir modelo";

  return `
    <article class="project-card ${projectHasPublished3D ? "has-3d" : ""}">
      <button class="project-card-main" type="button" data-project-slug="${project.slug}" aria-label="Ver detalhes do projeto ${project.title}">
        <span class="project-card-media">
          <img src="${project.coverImage}" alt="${project.title} em ${project.location}" loading="lazy" decoding="async">
          <span class="project-card-glow"></span>
          ${
            projectHasPublished3D
              ? `
                <span class="project-card-3d-preview" data-open-visual="3d" aria-hidden="true">
                  <span class="project-card-3d-icon">${cubeIcon}</span>
                  <span class="project-card-3d-copy">
                    <strong>${badgeLabel}</strong>
                    <span>${ctaLabel}</span>
                  </span>
                </span>
              `
              : ""
          }
        </span>
        <span class="project-card-body">
          <span class="project-card-meta">
            <span class="project-card-badge">${project.category}</span>
            <span class="project-card-tag">${project.areaLabel}</span>
          </span>
          <span class="project-card-location">${project.location}</span>
          <strong class="project-card-title">${project.title}</strong>
          <span class="project-card-service">${project.serviceType}</span>
          <span class="project-card-description">${project.shortDescription}</span>
          <span class="project-card-footer">
            <span>${project.status}</span>
            <strong>${projectHasPublished3D ? "Detalhes e mídia" : "Ver projeto"}</strong>
          </span>
        </span>
      </button>
      ${
        projectHasPublished3D
          ? `
            <div class="project-card-actions">
              <button
                class="project-card-3d-button"
                type="button"
                data-project-slug="${project.slug}"
                data-open-visual="3d"
                aria-label="Abrir modelo 3D do projeto ${project.title}"
              >
                <span class="project-card-3d-button-icon">${cubeIcon}</span>
                <span class="project-card-3d-button-copy">
                  <strong>${ctaLabel}</strong>
                  <span>Modelo demonstrativo disponível</span>
                </span>
              </button>
            </div>
          `
          : ""
      }
    </article>
  `;
};

const applyGridEntrance = () => {
  const cards = projectsGrid.querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    card.style.setProperty("--card-delay", `${Math.min(index * 60, 240)}ms`);
    requestAnimationFrame(() => card.classList.add("is-visible"));
  });
};

const renderProjects = () => {
  const items = filteredProjects();

  resultsCount.textContent = String(items.length).padStart(2, "0");
  resultsLabel.textContent =
    state.activeCategory === "Todos"
      ? "Projetos disponíveis na seleção atual"
      : `${state.activeCategory} • ${items.length} projeto(s) exibido(s)`;

  if (!items.length) {
    projectsGrid.innerHTML = `
      <article class="projects-empty-state">
        <span class="project-card-badge">Sem resultados</span>
        <h3>Nenhum projeto encontrado para esta categoria.</h3>
        <p>Altere o filtro para visualizar novamente o portfólio demonstrativo.</p>
      </article>
    `;
    return;
  }

  projectsGrid.innerHTML = items.map(createCardMarkup).join("");
  applyGridEntrance();
};

const renderFilters = () => {
  filtersContainer.innerHTML = projectCategories
    .map(
      (category) => `
        <button
          class="project-filter ${category === state.activeCategory ? "is-active" : ""}"
          type="button"
          data-category="${category}"
          aria-pressed="${String(category === state.activeCategory)}"
        >
          ${category}
        </button>
      `
    )
    .join("");
};

const renderGallery = (project) => {
  galleryStrip.innerHTML = project.gallery
    .map(
      (image, index) => `
        <button
          class="project-gallery-thumb ${index === state.activeImageIndex && state.activeVisual === "image" ? "is-active" : ""}"
          type="button"
          data-gallery-index="${index}"
          aria-label="Ver imagem ${index + 1} do projeto ${project.title}"
          aria-pressed="${String(index === state.activeImageIndex && state.activeVisual === "image")}"
        >
          <img src="${image}" alt="${project.title} - imagem ${index + 1}" loading="lazy" decoding="async">
        </button>
      `
    )
    .join("");
};

const renderVisualTabs = (project) => {
  const projectHasPublished3D = hasPublished3D(project);

  if (!projectHasPublished3D) {
    visualTabs.innerHTML = `
      <div class="project-visual-hint">
        <span class="project-visual-chip">Imagem técnica</span>
        ${
          project.has3dModel
            ? `<p>${project.modelReadyLabel}</p>`
            : "<p>Fallback estático premium ativo</p>"
        }
      </div>
    `;
    return;
  }

  visualTabs.innerHTML = `
    <div class="project-visual-tab-group">
      <button
        class="project-visual-tab ${state.activeVisual === "3d" ? "is-active" : ""}"
        type="button"
        data-visual-mode="3d"
        aria-pressed="${String(state.activeVisual === "3d")}"
      >
        Modelo 3D
      </button>
      <button
        class="project-visual-tab ${state.activeVisual === "image" ? "is-active" : ""}"
        type="button"
        data-visual-mode="image"
        aria-pressed="${String(state.activeVisual === "image")}"
      >
        Imagens
      </button>
    </div>
    <p class="project-visual-support">${project.modelSupportText || "Modelo demonstrativo de visualização topográfica em 3D."}</p>
  `;
};

const renderImageStage = (project, note = project.viewerHint) => {
  const image = project.gallery[state.activeImageIndex] || project.coverImage;
  const projectHasPublished3D = hasPublished3D(project);
  const caption = projectHasPublished3D
    ? project.modelBadgeLabel || "Visualização 3D disponível"
    : project.has3dModel
      ? "Área preparada para mídia 3D"
      : "Galeria estática premium";

  visualStage.innerHTML = `
    <div class="project-stage-frame is-image">
      <img class="project-stage-image" src="${image}" alt="${project.title} - visual técnico em ${project.location}" decoding="async">
      <div class="project-stage-caption">
        <span>${caption}</span>
        <strong>${project.areaLabel}</strong>
      </div>
      <p class="project-stage-note">${note}</p>
    </div>
  `;
};

const ensureModelViewer = () => {
  if (window.customElements?.get("model-viewer")) {
    return Promise.resolve();
  }

  if (modelViewerPromise) {
    return modelViewerPromise;
  }

  modelViewerPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector("script[data-model-viewer-loader='true']");

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("model-viewer unavailable")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = MODEL_VIEWER_SRC;
    script.async = true;
    script.dataset.modelViewerLoader = "true";

    script.addEventListener(
      "load",
      () => {
        if (window.customElements?.whenDefined) {
          window.customElements
            .whenDefined("model-viewer")
            .then(() => resolve())
            .catch(() => resolve());
        } else {
          resolve();
        }
      },
      { once: true }
    );

    script.addEventListener(
      "error",
      () => reject(new Error("model-viewer unavailable")),
      { once: true }
    );

    document.head.append(script);
  });

  return modelViewerPromise;
};

const render3DStage = async (project) => {
  const token = ++stageRenderToken;

  visualStage.innerHTML = `
    <div class="project-stage-frame is-loading">
      <div class="project-stage-loader"></div>
      <div class="project-stage-loading-copy">
        <span class="project-stage-loading-label">Carregando visualização 3D</span>
        <p>Preparando uma camada leve e interativa para o projeto.</p>
      </div>
    </div>
  `;

  try {
    await ensureModelViewer();
  } catch (error) {
    if (token !== stageRenderToken) {
      return;
    }
    renderImageStage(
      project,
      "O visualizador 3D não pôde ser carregado nesta demonstração. Exibindo a imagem técnica como fallback."
    );
    return;
  }

  if (
    token !== stageRenderToken ||
    !state.activeProject ||
    state.activeProject.slug !== project.slug ||
    state.activeVisual !== "3d"
  ) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "project-stage-frame is-model";

  const modelViewer = document.createElement("model-viewer");
  modelViewer.className = "project-model-viewer";
  modelViewer.setAttribute("src", project.model3dUrl);
  modelViewer.setAttribute("poster", project.coverImage);
  modelViewer.setAttribute("camera-controls", "");
  modelViewer.setAttribute("auto-rotate", "");
  modelViewer.setAttribute("auto-rotate-delay", "1800");
  modelViewer.setAttribute("interaction-prompt-threshold", "1500");
  modelViewer.setAttribute("touch-action", "pan-y");
  modelViewer.setAttribute("shadow-intensity", "1");
  modelViewer.setAttribute("exposure", "1.08");
  modelViewer.setAttribute("loading", "eager");
  modelViewer.setAttribute("alt", `Modelo 3D do projeto ${project.title}`);
  modelViewer.style.setProperty("--poster-color", "transparent");
  modelViewer.style.setProperty("--progress-bar-color", "#d6b67a");

  const caption = document.createElement("div");
  caption.className = "project-stage-caption";
  caption.innerHTML = `
    <span>${project.modelBadgeLabel || "Visualização 3D interativa"}</span>
    <strong>Rotação suave, zoom e leitura topográfica</strong>
  `;

  const note = document.createElement("p");
  note.className = "project-stage-note";
  note.textContent =
    `${project.modelSupportText || "Modelo demonstrativo de visualização topográfica em 3D."} Use o mouse ou o toque para orbitar, aproximar e afastar com fluidez.`;

  modelViewer.addEventListener(
    "error",
    () => {
      if (
        !state.activeProject ||
        state.activeProject.slug !== project.slug ||
        state.activeVisual !== "3d"
      ) {
        return;
      }
      renderImageStage(
        project,
        "O arquivo 3D ainda não está disponível nesta demonstração. A área permanece estável com a imagem técnica de fallback."
      );
    },
    { once: true }
  );

  wrapper.append(modelViewer, caption, note);
  visualStage.replaceChildren(wrapper);
};

const renderVisualStage = (project) => {
  const projectHasPublished3D = hasPublished3D(project);

  if (state.activeVisual === "3d" && projectHasPublished3D) {
    render3DStage(project);
    return;
  }

  renderImageStage(project);
};

const populateModal = (project, options = {}) => {
  state.activeProject = project;
  state.activeImageIndex = 0;
  state.activeVisual =
    options.visual === "image"
      ? "image"
      : hasPublished3D(project)
        ? "3d"
        : "image";

  modalCategory.textContent = project.category;
  modalStatus.textContent = project.status;
  modalProjectId.textContent = project.id;
  modalTitle.textContent = project.title;
  modalLocation.textContent = `${project.location} • ${project.serviceType}`;
  modalDescription.textContent = project.fullDescription;
  modalContactButton.href = buildProjectWhatsappLink(project);

  modalSummary.innerHTML = project.summary
    .map(
      (item) => `
        <article class="project-summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");

  modalTechGrid.innerHTML = project.technicalInfo
    .map(
      (item) => `
        <article class="project-tech-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");

  modalDeliverables.innerHTML = project.deliverables
    .map((item) => `<li>${item}</li>`)
    .join("");

  renderVisualTabs(project);
  renderGallery(project);
  renderVisualStage(project);
};

const resetModalState = () => {
  stageRenderToken += 1;
  state.activeProject = null;
  visualStage.innerHTML = "";
};

const openModal = (project, options = {}) => {
  populateModal(project, options);
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
  resetModalState();
  document.body.classList.remove("modal-open");

  if (typeof modal.close === "function" && modal.open) {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
};

filtersContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) {
    return;
  }

  state.activeCategory = button.dataset.category;
  renderFilters();
  renderProjects();
});

projectsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project-slug]");
  if (!button) {
    return;
  }

  const project = projects.find((item) => item.slug === button.dataset.projectSlug);
  if (!project) {
    return;
  }

  const preferredVisual = event.target.closest("[data-open-visual]")?.dataset.openVisual;
  openModal(project, preferredVisual ? { visual: preferredVisual } : {});
});

visualTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-visual-mode]");
  if (!button || !state.activeProject) {
    return;
  }

  state.activeVisual = button.dataset.visualMode;
  renderVisualTabs(state.activeProject);
  renderGallery(state.activeProject);
  renderVisualStage(state.activeProject);
});

galleryStrip.addEventListener("click", (event) => {
  const button = event.target.closest("[data-gallery-index]");
  if (!button || !state.activeProject) {
    return;
  }

  state.activeImageIndex = Number(button.dataset.galleryIndex);
  state.activeVisual = "image";
  renderVisualTabs(state.activeProject);
  renderGallery(state.activeProject);
  renderVisualStage(state.activeProject);
});

closeModalButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  resetModalState();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.hasAttribute("open")) {
    closeModal();
  }
});

renderFilters();
renderProjects();
