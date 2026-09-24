/**
 * educaComputaValida - Aplicação Principal e Roteador (App Orchestrator)
 * 
 * Gerencia a navegação entre as telas (SPA), ciclo de vida,
 * alternância de temas (Dark / Light) e inicialização dos serviços.
 */

const AppRouter = {
  currentView: "view-home",
  views: [
    "view-home",
    "view-criar",
    "view-criado-sucesso",
    "view-participar-entrar",
    "view-desafio",
    "view-resultado",
    "view-criador-login",
    "view-criador-painel"
  ],

  /**
   * Navega para a tela indicada
   * @param {string} viewId ID do elemento de visualização
   * @param {Object} options Parâmetros extras para a tela
   */
  navigateTo(viewId, options = {}) {
    if (!this.views.includes(viewId)) {
      viewId = "view-home";
    }

    this.currentView = viewId;

    // Atualiza visibilidade dos contêineres de view
    this.views.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === viewId) {
          el.classList.remove("hidden");
          el.classList.add("view-active");
        } else {
          el.classList.add("hidden");
          el.classList.remove("view-active");
        }
      }
    });

    // Atualiza links ativos no menu de navegação
    document.querySelectorAll(".nav-link").forEach(link => {
      const target = link.getAttribute("data-target");
      if (target === viewId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Rola para o topo suavemente
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Atualiza hash da URL sem disparar recarregamento
    window.location.hash = viewId.replace("view-", "");

    // Inicialização específica de cada tela
    if (viewId === "view-criar") {
      ProfessorModule.initCreationForm();
    } else if (viewId === "view-participar-entrar") {
      AlunoModule.initEntry(options.code || "");
    } else if (viewId === "view-criador-login") {
      ProfessorModule.initLogin(options.code || "");
    }
  }
};

/**
 * Gerenciador de Tema (Dark / Light) com persistência local
 */
const ThemeManager = {
  THEME_KEY: "educacomputa_theme",

  init() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || "dark";
    this.applyTheme(savedTheme);

    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        this.applyTheme(next);
      });
    }
  },

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (e) {
      console.warn("Não foi possível salvar tema no localStorage", e);
    }

    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (toggleBtn) {
      const isDark = theme === "dark";
      toggleBtn.setAttribute("title", isDark ? "Mudar para modo claro" : "Mudar para modo escuro");
      toggleBtn.setAttribute("aria-label", isDark ? "Mudar para modo claro" : "Mudar para modo escuro");
    }
  }
};

// Inicialização após carregamento do DOM
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Inicializa o tema (Dark / Light)
  ThemeManager.init();

  // 2. Inicializa o serviço de armazenamento
  await StorageService.init();

  // 3. Configura listener para mudanças de hash na URL (botão voltar/avançar do navegador)
  window.addEventListener("hashchange", () => {
    const rawHash = window.location.hash.replace("#", "");
    if (rawHash) {
      const viewId = `view-${rawHash}`;
      if (AppRouter.views.includes(viewId) && viewId !== AppRouter.currentView) {
        AppRouter.navigateTo(viewId);
      }
    }
  });

  // 4. Verifica hash inicial
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash) {
    const target = `view-${initialHash}`;
    if (AppRouter.views.includes(target)) {
      AppRouter.navigateTo(target);
    } else {
      AppRouter.navigateTo("view-home");
    }
  } else {
    AppRouter.navigateTo("view-home");
  }

  // 5. Configuração do menu mobile
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu-links");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("nav-menu-open");
      const isOpen = navMenu.classList.contains("nav-menu-open");
      mobileToggle.setAttribute("aria-expanded", isOpen);
    });

    // Fecha menu ao clicar em qualquer link
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav-menu-open");
      });
    });
  }

  console.log("educaComputaValida inicializado com sucesso.");
});

window.AppRouter = AppRouter;
window.ThemeManager = ThemeManager;
