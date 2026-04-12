const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const homeHero = document.querySelector(".home-hero");
const homeDetailTriggers = document.querySelectorAll("[data-home-detail]");

const homeDetailContent = {
  "method-diagnostico": {
    code: "01",
    kicker: "Metodo aplicado",
    category: "Etapa inicial",
    title: "Diagnostico",
    visualTitle: "Leitura inicial da area",
    description:
      "Leitura inicial da area, entendimento do cenario e definicao do escopo tecnico mais adequado para a demanda. Nesta etapa, sao avaliados os objetivos do cliente, as caracteristicas do terreno e o tipo de material necessario para orientar o trabalho com seguranca.",
    highlights: [
      "leitura da area",
      "definicao do escopo",
      "alinhamento tecnico inicial",
    ],
    visual: "a",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ola,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20diagnostico%20tecnico%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "method-captacao": {
    code: "02",
    kicker: "Metodo aplicado",
    category: "Etapa de campo",
    title: "Levantamento / Captacao",
    visualTitle: "Tecnologia aplicada em campo",
    description:
      "Execucao em campo com uso de tecnologia compativel com a exigencia do projeto, como drone, RTK e metodos de medicao complementares. O foco e obter dados confiaveis para delimitacao, leitura territorial e desenvolvimento do material tecnico.",
    highlights: ["drone", "RTK", "medicao em campo"],
    visual: "b",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ola,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20captacao%20em%20campo%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "method-entrega": {
    code: "03",
    kicker: "Metodo aplicado",
    category: "Etapa final",
    title: "Entrega",
    visualTitle: "Pecas tecnicas organizadas",
    description:
      "Organizacao das informacoes levantadas e preparacao das pecas tecnicas com clareza, consistencia e finalidade pratica. O material final e estruturado para apoiar regularizacao, analise territorial e tomada de decisao com mais seguranca.",
    highlights: [
      "pecas tecnicas",
      "documentacao organizada",
      "apoio a decisao",
    ],
    visual: "c",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ola,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20entrega%20tecnica%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "service-usucapiao": {
    code: "01",
    kicker: "Atuacao principal",
    category: "Servico",
    title: "Levantamento para Usucapiao",
    visualTitle: "Perimetro e base tecnica clara",
    description:
      "Leitura de perimetro, confrontacoes e apoio tecnico para processos de usucapiao que exigem clareza territorial e seguranca documental. O objetivo e reunir base tecnica confiavel para instrucao do processo e conferencia da area.",
    highlights: [
      "perimetro e confrontacoes",
      "apoio documental",
      "base tecnica clara",
    ],
    visual: "a",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ola,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20levantamento%20de%20usucapiao%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "service-geo-urbano": {
    code: "02",
    kicker: "Atuacao principal",
    category: "Servico",
    title: "Georreferenciamento Urbano",
    visualTitle: "Leitura espacial urbana",
    description:
      "Atuacao em areas urbanas com foco em atualizacao cadastral, conferencia de limites, leitura espacial e organizacao tecnica do imovel. Indicado para situacoes que exigem maior precisao territorial e documentacao confiavel.",
    highlights: [
      "atualizacao cadastral",
      "conferencia de limites",
      "leitura espacial",
    ],
    visual: "b",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ola,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20georreferenciamento%20urbano%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "service-geo-rural": {
    code: "03",
    kicker: "Atuacao principal",
    category: "Servico",
    title: "Georreferenciamento Rural",
    visualTitle: "Organizacao territorial rural",
    description:
      "Mapeamento e leitura tecnica de areas rurais com foco em gestao territorial, regularizacao e organizacao precisa das informacoes do terreno. O trabalho busca gerar material consistente e confiavel para uso tecnico e documental.",
    highlights: [
      "mapeamento rural",
      "regularizacao",
      "organizacao territorial",
    ],
    visual: "c",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ola,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20georreferenciamento%20rural%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
};

const homeDetailState = {
  modal: null,
  refs: null,
  activeTrigger: null,
};

revealItems.forEach((item, index) => {
  item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 320)}ms`);
});

const syncHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 24);

  if (homeHero) {
    const heroShift = Math.min(window.scrollY, 180);
    document.documentElement.style.setProperty("--hero-shift", `${heroShift}`);
  }
};

const closeMenu = () => {
  if (!menuToggle) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
};

const createHomeDetailModal = () => {
  const modal = document.createElement("dialog");
  modal.className = "home-detail-modal";
  modal.id = "home-detail-modal";
  modal.setAttribute("aria-labelledby", "home-detail-title");
  modal.innerHTML = `
    <div class="home-detail-modal-shell">
      <button class="home-detail-modal-close" type="button" id="home-detail-close" aria-label="Fechar detalhes">
        <span></span>
        <span></span>
      </button>

      <div class="home-detail-modal-grid">
        <section class="home-detail-visual-panel">
          <div class="home-detail-visual-frame">
            <div class="home-detail-visual-media" id="home-detail-visual-media" aria-hidden="true"></div>
            <div class="home-detail-visual-copy">
              <span class="home-detail-kicker" id="home-detail-kicker"></span>
              <strong id="home-detail-visual-title"></strong>
            </div>
          </div>
        </section>

        <aside class="home-detail-content-panel">
          <div class="home-detail-topbar">
            <span class="home-detail-code" id="home-detail-code"></span>
            <span class="home-detail-category" id="home-detail-category"></span>
          </div>

          <div class="home-detail-copy">
            <h2 id="home-detail-title"></h2>
            <p id="home-detail-description"></p>
          </div>

          <div class="home-detail-highlights-wrap">
            <span class="home-detail-label">Destaques</span>
            <ul class="home-detail-highlights" id="home-detail-highlights"></ul>
          </div>

          <div class="home-detail-actions">
            <a
              class="button button-primary"
              id="home-detail-primary-action"
              href="https://wa.me/5511985222291?text=Ola,%20gostaria%20de%20solicitar%20um%20atendimento%20da%20Plano%20%26%20Terra"
              target="_blank"
              rel="noreferrer"
            >
              Solicitar atendimento
            </a>
            <a class="button button-secondary" id="home-detail-secondary-action" href="./projetos.html">
              Ver projetos
            </a>
          </div>
        </aside>
      </div>
    </div>
  `;

  document.body.append(modal);

  const refs = {
    close: modal.querySelector("#home-detail-close"),
    code: modal.querySelector("#home-detail-code"),
    category: modal.querySelector("#home-detail-category"),
    kicker: modal.querySelector("#home-detail-kicker"),
    visualTitle: modal.querySelector("#home-detail-visual-title"),
    title: modal.querySelector("#home-detail-title"),
    description: modal.querySelector("#home-detail-description"),
    highlights: modal.querySelector("#home-detail-highlights"),
    visualMedia: modal.querySelector("#home-detail-visual-media"),
    primary: modal.querySelector("#home-detail-primary-action"),
    secondary: modal.querySelector("#home-detail-secondary-action"),
  };

  refs.close.addEventListener("click", () => closeHomeDetailModal());
  refs.primary.addEventListener("click", () => closeHomeDetailModal());
  refs.secondary.addEventListener("click", () => closeHomeDetailModal());

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeHomeDetailModal();
    }
  });

  modal.addEventListener("close", () => {
    body.classList.remove("modal-open");
    if (homeDetailState.activeTrigger instanceof HTMLElement) {
      homeDetailState.activeTrigger.focus();
    }
  });

  homeDetailState.modal = modal;
  homeDetailState.refs = refs;
};

const openHomeDetailModal = (detailKey, trigger) => {
  const detail = homeDetailContent[detailKey];
  if (!detail) {
    return;
  }

  if (!homeDetailState.modal) {
    createHomeDetailModal();
  }

  const { modal, refs } = homeDetailState;
  homeDetailState.activeTrigger = trigger || document.activeElement;

  refs.code.textContent = detail.code;
  refs.category.textContent = detail.category;
  refs.kicker.textContent = detail.kicker;
  refs.visualTitle.textContent = detail.visualTitle;
  refs.title.textContent = detail.title;
  refs.description.textContent = detail.description;
  refs.highlights.innerHTML = detail.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");
  refs.visualMedia.className = `home-detail-visual-media modal-visual-${detail.visual}`;
  refs.primary.textContent = detail.primaryText;
  refs.primary.href = detail.primaryHref;
  refs.secondary.textContent = detail.secondaryText;
  refs.secondary.href = detail.secondaryHref;

  body.classList.add("modal-open");

  if (typeof modal.showModal === "function") {
    if (!modal.open) {
      modal.showModal();
    }
  } else {
    modal.setAttribute("open", "true");
  }
};

function closeHomeDetailModal() {
  if (!homeDetailState.modal) {
    return;
  }

  body.classList.remove("modal-open");

  if (typeof homeDetailState.modal.close === "function" && homeDetailState.modal.open) {
    homeDetailState.modal.close();
  } else {
    homeDetailState.modal.removeAttribute("open");
  }
}

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    body.classList.toggle("menu-open", !isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      closeMenu();
    }
  });
}

homeDetailTriggers.forEach((trigger) => {
  trigger.classList.add("is-interactive");
  trigger.addEventListener("click", () => {
    openHomeDetailModal(trigger.dataset.homeDetail, trigger);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeHomeDetailModal();
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
