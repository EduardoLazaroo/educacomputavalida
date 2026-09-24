/**
 * educacaoComputacionalvalidador - Aplicação Principal e Roteador (App Orchestrator)
 * 
 * Gerencia a navegação entre as telas (SPA), ciclo de vida,
 * atalhos de teste da atividade de demonstração (LOOP7K / ADMIN7)
 * e inicialização dos serviços.
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
  },

  /**
   * Atalho para testar a atividade de demonstração como aluno (LOOP7K)
   */
  testDemoAsStudent() {
    this.navigateTo("view-participar-entrar", { code: "LOOP7K" });
  },

  /**
   * Atalho para testar a área do criador com a chave de demonstração (ADMIN7)
   */
  testDemoAsCreator() {
    this.navigateTo("view-criador-login", { code: "ADMIN7" });
    // Pré-autentica se o usuário desejar entrar direto
    ProfessorModule.loginCreator("ADMIN7");
  }
};

// Inicialização após carregamento do DOM
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Inicializa o serviço de armazenamento
  await StorageService.init();

  // 2. Configura listener para mudanças de hash na URL (botão voltar/avançar do navegador)
  window.addEventListener("hashchange", () => {
    const rawHash = window.location.hash.replace("#", "");
    if (rawHash) {
      const viewId = `view-${rawHash}`;
      if (AppRouter.views.includes(viewId) && viewId !== AppRouter.currentView) {
        AppRouter.navigateTo(viewId);
      }
    }
  });

  // 3. Verifica hash inicial
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

  // 4. Configuração do menu mobile
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

  console.log("educacaoComputacionalvalidador inicializado com sucesso.");
});

window.AppRouter = AppRouter;
