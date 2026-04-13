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
    kicker: "Método aplicado",
    category: "Etapa inicial",
    title: "Diagnóstico",
    visualTitle: "Leitura inicial da área",
    description:
      "Leitura inicial da área, entendimento do cenário e definição do escopo técnico mais adequado para a demanda. Nesta etapa, são avaliados os objetivos do cliente, as características do terreno e o tipo de material necessário para orientar o trabalho com segurança.",
    highlights: [
      "leitura da área",
      "definição do escopo",
      "alinhamento técnico inicial",
    ],
    visual: "a",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ol%C3%A1,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20diagn%C3%B3stico%20t%C3%A9cnico%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "method-captacao": {
    code: "02",
    kicker: "Método aplicado",
    category: "Etapa de campo",
    title: "Levantamento / Captação",
    visualTitle: "Tecnologia aplicada em campo",
    description:
      "Execução em campo, com uso de tecnologia compatível com a exigência do projeto, como drone, RTK e métodos de medição complementares. O foco é obter dados confiáveis para delimitação, leitura territorial e desenvolvimento do material técnico.",
    highlights: ["drone", "RTK", "medição em campo"],
    visual: "b",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ol%C3%A1,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20capta%C3%A7%C3%A3o%20em%20campo%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "method-entrega": {
    code: "03",
    kicker: "Método aplicado",
    category: "Etapa final",
    title: "Entrega",
    visualTitle: "Peças técnicas organizadas",
    description:
      "Organização das informações levantadas e preparação das peças técnicas com clareza, consistência e finalidade prática. O material final é estruturado para apoiar regularização, análise territorial e tomada de decisão com mais segurança.",
    highlights: [
      "peças técnicas",
      "documentação organizada",
      "apoio à decisão",
    ],
    visual: "c",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ol%C3%A1,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20entrega%20t%C3%A9cnica%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "service-usucapiao": {
    code: "01",
    kicker: "Atuação principal",
    category: "Serviço",
    title: "Levantamento para Usucapião",
    visualTitle: "Perímetro e base técnica clara",
    description:
      "Leitura de perímetro, confrontações e apoio técnico para processos de usucapião que exigem clareza territorial e segurança documental. O objetivo é reunir base técnica confiável para instrução do processo e conferência da área.",
    highlights: [
      "perímetro e confrontações",
      "apoio documental",
      "base técnica clara",
    ],
    visual: "a",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ol%C3%A1,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20levantamento%20de%20usucapi%C3%A3o%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "service-geo-urbano": {
    code: "02",
    kicker: "Atuação principal",
    category: "Serviço",
    title: "Georreferenciamento Urbano",
    visualTitle: "Leitura espacial urbana",
    description:
      "Atuação em áreas urbanas, com foco em atualização cadastral, conferência de limites, leitura espacial e organização técnica do imóvel. Indicado para situações que exigem maior precisão territorial e documentação confiável.",
    highlights: [
      "atualização cadastral",
      "conferência de limites",
      "leitura espacial",
    ],
    visual: "b",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ol%C3%A1,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20georreferenciamento%20urbano%20da%20Plano%20%26%20Terra",
    secondaryText: "Ver projetos",
    secondaryHref: "./projetos.html",
  },
  "service-geo-rural": {
    code: "03",
    kicker: "Atuação principal",
    category: "Serviço",
    title: "Georreferenciamento Rural",
    visualTitle: "Organização territorial rural",
    description:
      "Mapeamento e leitura técnica de áreas rurais, com foco em gestão territorial, regularização e organização precisa das informações do terreno. O trabalho busca gerar material consistente e confiável para uso técnico e documental.",
    highlights: [
      "mapeamento rural",
      "regularização",
      "organização territorial",
    ],
    visual: "c",
    primaryText: "Solicitar atendimento",
    primaryHref:
      "https://wa.me/5511985222291?text=Ol%C3%A1,%20gostaria%20de%20solicitar%20um%20atendimento%20para%20georreferenciamento%20rural%20da%20Plano%20%26%20Terra",
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
              href="https://wa.me/5511985222291?text=Ol%C3%A1,%20gostaria%20de%20solicitar%20um%20atendimento%20da%20Plano%20%26%20Terra"
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
