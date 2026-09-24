/**
 * educacaoComputacionalvalidador - Lógica do Aluno e Fluxo do Desafio
 * 
 * Gerencia a entrada do aluno com código, validação de heróis únicos,
 * execução do questionário com feedback formativo imediato,
 * relatório diagnóstico por conceito e múltiplas tentativas com embaralhamento.
 */

const AlunoModule = {
  // Estado atual da sessão do aluno
  currentActivity: null,
  currentHero: null,
  preparedQuestions: [],
  currentQuestionIndex: 0,
  selectedAlternativeIndex: null,
  isAnswerSubmitted: false,
  attemptResponses: [], // Respostas da tentativa atual
  attemptNumber: 1,

  /**
   * Inicializa a tela de entrada do aluno
   * @param {string} prefillCode Código opcional vindo da URL ou de atalho
   */
  async initEntry(prefillCode = "") {
    const codeInput = document.getElementById("aluno-input-codigo");
    const heroSelect = document.getElementById("aluno-select-heroi");
    const activityInfoCard = document.getElementById("aluno-atividade-previa");
    const btnStart = document.getElementById("btn-aluno-iniciar");
    const validationMsg = document.getElementById("aluno-feedback-validacao");

    if (activityInfoCard) activityInfoCard.classList.add("hidden");
    if (validationMsg) validationMsg.innerHTML = "";
    if (btnStart) btnStart.disabled = true;

    // Preenche select com heróis genéricos inicialmente
    HeroesModule.populateHeroSelect(heroSelect);

    if (codeInput) {
      if (prefillCode) {
        codeInput.value = prefillCode.trim().toUpperCase();
        await this.verifyActivityCode(prefillCode);
      }

      // Adiciona listener para validação em tempo real
      codeInput.oninput = async (e) => {
        const val = e.target.value.trim().toUpperCase();
        e.target.value = val;
        if (val.length >= 4) {
          await this.verifyActivityCode(val);
        } else {
          if (activityInfoCard) activityInfoCard.classList.add("hidden");
          if (validationMsg) validationMsg.innerHTML = "";
          if (btnStart) btnStart.disabled = true;
          HeroesModule.populateHeroSelect(heroSelect);
        }
      };
    }

    if (heroSelect) {
      heroSelect.onchange = () => {
        this.validateHeroSelection();
      };
    }
  },

  /**
   * Verifica o código da atividade digitado pelo aluno
   * @param {string} code 
   */
  async verifyActivityCode(code) {
    const activityInfoCard = document.getElementById("aluno-atividade-previa");
    const validationMsg = document.getElementById("aluno-feedback-validacao");
    const heroSelect = document.getElementById("aluno-select-heroi");
    const btnStart = document.getElementById("btn-aluno-iniciar");

    const activity = await StorageService.getActivityByCode(code);

    if (!activity) {
      if (activityInfoCard) activityInfoCard.classList.add("hidden");
      if (validationMsg) {
        validationMsg.innerHTML = `<span class="text-error">⚠️ Atividade com código "<strong>${code}</strong>" não encontrada. Verifique com seu professor.</span>`;
      }
      if (btnStart) btnStart.disabled = true;
      HeroesModule.populateHeroSelect(heroSelect);
      this.currentActivity = null;
      return false;
    }

    this.currentActivity = activity;

    // Atualiza o select de heróis filtrando/bloqueando os já participantes
    HeroesModule.populateHeroSelect(heroSelect, { atividade: activity });

    // Exibe prévia formativa da atividade
    if (activityInfoCard) {
      activityInfoCard.classList.remove("hidden");
      document.getElementById("aluno-previa-tema").textContent = activity.tema;
      document.getElementById("aluno-previa-objetivo").textContent = activity.objetivo || activity.descricao;
      document.getElementById("aluno-previa-criador").textContent = `Criado por: ${activity.criador?.nome || 'Professor'}`;
      document.getElementById("aluno-previa-questoes-qtd").textContent = `${activity.questoes?.length || 0} questões`;
    }

    if (validationMsg) {
      validationMsg.innerHTML = `<span class="text-success">✓ Atividade localizada com sucesso! Escolha seu herói para iniciar.</span>`;
    }

    this.validateHeroSelection();
    return true;
  },

  /**
   * Valida se o herói selecionado está pronto
   */
  validateHeroSelection() {
    const heroSelect = document.getElementById("aluno-select-heroi");
    const btnStart = document.getElementById("btn-aluno-iniciar");
    const validationMsg = document.getElementById("aluno-feedback-validacao");

    if (!heroSelect || !this.currentActivity) {
      if (btnStart) btnStart.disabled = true;
      return;
    }

    const selectedHero = heroSelect.value;
    if (!selectedHero) {
      if (btnStart) btnStart.disabled = true;
      return;
    }

    if (validationMsg) {
      validationMsg.innerHTML = `<span class="text-success">Herói <strong>${selectedHero}</strong> selecionado. Pronto para iniciar o desafio com anonimato garantido!</span>`;
    }
    if (btnStart) btnStart.disabled = false;
  },

  /**
   * Inicia o desafio para o aluno com o herói escolhido
   */
  async startChallenge() {
    const heroSelect = document.getElementById("aluno-select-heroi");
    const heroName = heroSelect ? heroSelect.value : "";

    if (!this.currentActivity) {
      UtilsModule.showToast("Informe um código de atividade válido.", "warning");
      return;
    }

    if (!heroName) {
      UtilsModule.showToast("Escolha seu herói para participar.", "warning");
      return;
    }

    // Gera ID único de sessão para esta nova participação de herói
    this.participantId = "part_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 7);
    this.currentHero = heroName;
    this.attemptNumber = 1;
    this.attemptResponses = [];
    this.currentQuestionIndex = 0;

    // Na primeira tentativa, podemos manter a ordem padrão ou embaralhada
    this.preparedQuestions = AtividadeModule.prepareQuestionsForAttempt(this.currentActivity, false);

    // Navega para a tela de desafio
    AppRouter.navigateTo("view-desafio");
    this.renderCurrentQuestion();
  },

  /**
   * Renderiza a questão atual do desafio
   */
  renderCurrentQuestion() {
    const q = this.preparedQuestions[this.currentQuestionIndex];
    if (!q) {
      this.finishChallenge();
      return;
    }

    this.selectedAlternativeIndex = null;
    this.isAnswerSubmitted = false;

    // Header info
    document.getElementById("desafio-tema").textContent = this.currentActivity.tema;
    document.getElementById("desafio-heroi-nome").textContent = this.currentHero;
    
    const heroDetails = HeroesModule.getHeroDetails(this.currentHero);
    const heroEmojiEl = document.getElementById("desafio-heroi-emoji");
    if (heroEmojiEl) heroEmojiEl.textContent = heroDetails?.emoji || "🦸";

    document.getElementById("desafio-tentativa-badge").textContent = `Tentativa ${this.attemptNumber}`;

    // Progresso
    const total = this.preparedQuestions.length;
    const currentNum = this.currentQuestionIndex + 1;
    document.getElementById("desafio-contador").textContent = `Questão ${currentNum} de ${total}`;
    
    const progressPercent = Math.round(((currentNum - 1) / total) * 100);
    const progressBar = document.getElementById("desafio-progresso-bar");
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    // Metadados da questão (Bloom e Conceito)
    const bloomInfo = UtilsModule.getBloomInfo(q.bloom);
    const bloomBadge = document.getElementById("desafio-bloom-badge");
    if (bloomBadge) {
      bloomBadge.textContent = `Bloom: ${q.bloom}`;
      bloomBadge.style.backgroundColor = bloomInfo.fundo;
      bloomBadge.style.color = bloomInfo.cor;
      bloomBadge.style.borderColor = bloomInfo.cor;
      bloomBadge.title = bloomInfo.descricao;
    }

    const conceitoTag = document.getElementById("desafio-conceito-tag");
    if (conceitoTag) {
      conceitoTag.textContent = q.conceito || 'Conceito Computacional';
    }

    // Enunciado com suporte a código formatado
    const enunciadoContainer = document.getElementById("desafio-enunciado");
    if (enunciadoContainer) {
      enunciadoContainer.innerHTML = UtilsModule.formatMarkdownCode(q.enunciado);
    }

    // Render das 4 alternativas com Acessibilidade (ARIA + Teclado)
    const alternativasContainer = document.getElementById("desafio-alternativas");
    alternativasContainer.innerHTML = "";

    const letras = ["A", "B", "C", "D"];
    q.alternativas.forEach((altTexto, idx) => {
      const altCard = document.createElement("div");
      altCard.className = "alternative-card";
      altCard.id = `alt-card-${idx}`;
      altCard.setAttribute("role", "radio");
      altCard.setAttribute("aria-checked", "false");
      altCard.setAttribute("tabindex", "0");
      altCard.setAttribute("aria-label", `Alternativa ${letras[idx]}: ${altTexto.replace(/[\n\r]/g, ' ')}`);
      
      altCard.onclick = () => this.selectAlternative(idx);
      altCard.onkeydown = (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          this.selectAlternative(idx);
        }
      };

      altCard.innerHTML = `
        <div class="alt-letter" aria-hidden="true">${letras[idx]}</div>
        <div class="alt-text">${UtilsModule.formatMarkdownCode(altTexto)}</div>
        <div class="alt-check-icon" aria-hidden="true"></div>
      `;

      alternativasContainer.appendChild(altCard);
    });

    // Reset botões e card de feedback
    const btnResponder = document.getElementById("btn-desafio-responder");
    if (btnResponder) {
      btnResponder.disabled = true;
      btnResponder.classList.remove("hidden");
    }

    const feedbackCard = document.getElementById("desafio-feedback-card");
    if (feedbackCard) {
      feedbackCard.classList.add("hidden");
      feedbackCard.className = "feedback-card hidden";
    }

    // Inicializa suporte a atalhos de teclado (1-4, A-D, Enter)
    this.setupKeyboardShortcuts();

    // Rolagem suave para o topo do card da questão
    document.getElementById("view-desafio")?.scrollIntoView({ behavior: "smooth", block: "start" });
  },

  /**
   * Aluno clica ou navega via teclado em uma alternativa
   * @param {number} index 
   */
  selectAlternative(index) {
    if (this.isAnswerSubmitted) return;

    this.selectedAlternativeIndex = index;

    // Atualiza classes visuais e atributos de acessibilidade ARIA
    const cards = document.querySelectorAll(".alternative-card");
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add("selected");
        card.setAttribute("aria-checked", "true");
      } else {
        card.classList.remove("selected");
        card.setAttribute("aria-checked", "false");
      }
    });

    // Habilita botão responder
    const btnResponder = document.getElementById("btn-desafio-responder");
    if (btnResponder) {
      btnResponder.disabled = false;
      btnResponder.focus();
    }
  },

  /**
   * Configura atalhos rápidos de teclado para acessibilidade e UX fluida
   */
  setupKeyboardShortcuts() {
    if (this._keyboardBound) return;
    this._keyboardBound = true;

    window.addEventListener("keydown", (e) => {
      if (AppRouter.currentView !== "view-desafio") return;

      // Não interceptar se o foco estiver em campo de texto
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      const key = e.key.toUpperCase();

      // Teclas 1, 2, 3, 4 ou A, B, C, D para selecionar alternativas
      if (!this.isAnswerSubmitted) {
        if (key === "1" || key === "A") { this.selectAlternative(0); }
        else if (key === "2" || key === "B") { this.selectAlternative(1); }
        else if (key === "3" || key === "C") { this.selectAlternative(2); }
        else if (key === "4" || key === "D") { this.selectAlternative(3); }
        else if (key === "ENTER" && this.selectedAlternativeIndex !== null) {
          e.preventDefault();
          this.submitAnswer();
        }
      } else {
        // Se a resposta já foi enviada, Enter ou Barra de Espaço avançam
        if (key === "ENTER" || e.key === " ") {
          e.preventDefault();
          this.nextQuestion();
        }
      }
    });
  },

  /**
   * Aluno clica no botão RESPONDER
   */
  submitAnswer() {
    if (this.selectedAlternativeIndex === null || this.isAnswerSubmitted) return;

    this.isAnswerSubmitted = true;
    const q = this.preparedQuestions[this.currentQuestionIndex];
    const isCorreta = this.selectedAlternativeIndex === q.respostaCorreta;

    // Registra resposta para o diagnóstico final
    this.attemptResponses.push({
      questaoId: q.id,
      respostaEscolhida: this.selectedAlternativeIndex,
      respostaCorreta: q.respostaCorreta,
      correta: isCorreta,
      conceito: q.conceito,
      bloom: q.bloom,
      enunciado: q.enunciado
    });

    // Destaca as alternativas (verde para correta, vermelho suave para a errada se o aluno errou)
    const cards = document.querySelectorAll(".alternative-card");
    cards.forEach((card, idx) => {
      card.classList.remove("selected");
      if (idx === q.respostaCorreta) {
        card.classList.add("card-correct");
      } else if (idx === this.selectedAlternativeIndex && !isCorreta) {
        card.classList.add("card-incorrect");
      } else {
        card.classList.add("card-disabled");
      }
    });

    // Oculta o botão RESPONDER
    const btnResponder = document.getElementById("btn-desafio-responder");
    if (btnResponder) btnResponder.classList.add("hidden");

    // Prepara e exibe o feedback imediato formativo
    const feedbackCard = document.getElementById("desafio-feedback-card");
    const isLast = this.currentQuestionIndex === this.preparedQuestions.length - 1;
    const nextBtnText = isLast ? "Visualizar Diagnóstico &rarr;" : "Próxima Questão &rarr;";

    let motivationalPhrase = "";
    if (isCorreta) {
      const boas = [
        "Excelente raciocínio lógico! Você aplicou o conceito com exatidão.",
        "Muito bem! Sua compreensão sobre essa estrutura está sólida.",
        "Ótima resposta! Você identificou os parâmetros corretos do algoritmo.",
        "Correto! Essa análise reflete um bom domínio conceitual."
      ];
      motivationalPhrase = boas[Math.floor(Math.random() * boas.length)];
    } else {
      motivationalPhrase = "Não se preocupe com o erro: ele indica exatamente onde sua compreensão pode se aprofundar.";
    }

    feedbackCard.innerHTML = `
      <div class="feedback-header ${isCorreta ? 'feedback-header-success' : 'feedback-header-warning'}">
        <div class="feedback-title">
          ${isCorreta ? '✓ Resposta Correta!' : '✗ Ainda não!'}
        </div>
        <div class="feedback-motivation">${motivationalPhrase}</div>
      </div>
      <div class="feedback-body">
        <div class="feedback-section">
          <strong>Explicação Pedagógica:</strong>
          <p>${UtilsModule.formatMarkdownCode(q.explicacao)}</p>
        </div>
        ${!isCorreta ? `
          <div class="feedback-section feedback-hint">
            <strong>Dica Formativa:</strong>
            <p>${UtilsModule.formatMarkdownCode(q.dica)}</p>
          </div>
          <div class="feedback-section feedback-concept">
            <strong>Conceito Relacionado:</strong>
            <span class="badge badge-concept">${q.conceito}</span>
          </div>
        ` : ''}
      </div>
      <div class="feedback-footer">
        <button id="btn-desafio-proxima" class="btn btn-primary btn-lg" onclick="AlunoModule.nextQuestion()">
          ${nextBtnText}
        </button>
      </div>
    `;

    feedbackCard.className = `feedback-card ${isCorreta ? 'feedback-success' : 'feedback-warning'} animate-fade-in-up`;
    feedbackCard.classList.remove("hidden");

    // Rola para o feedback
    feedbackCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  },

  /**
   * Avança para a próxima questão ou finaliza
   */
  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.preparedQuestions.length) {
      this.renderCurrentQuestion();
    } else {
      this.finishChallenge();
    }
  },

  /**
   * Finaliza o desafio e registra a tentativa
   */
  async finishChallenge() {
    const total = this.preparedQuestions.length;
    const acertos = this.attemptResponses.filter(r => r.correta).length;
    const mastery = UtilsModule.calculateMastery(acertos, total);

    const attemptData = {
      data: new Date().toISOString(),
      respostas: this.attemptResponses,
      acertos: acertos,
      total: total,
      percentual: mastery.percentual,
      classificacao: mastery.label
    };

    // Salva a tentativa no repositório persistente com suporte a concorrência e sessão anônima
    try {
      const regResult = await StorageService.registerAttempt(
        this.currentActivity.codigoAtividade,
        this.currentHero,
        attemptData,
        this.participantId
      );
      if (regResult && regResult.activity) {
        this.currentActivity = regResult.activity;
        if (regResult.participant) {
          this.participantId = regResult.participant.id;
          if (regResult.participant.nome) {
            this.currentHero = regResult.participant.nome;
          }
        }
      } else if (regResult && regResult.codigoAtividade) {
        this.currentActivity = regResult;
      }
    } catch (err) {
      console.error("Erro ao salvar tentativa:", err);
      UtilsModule.showToast("Aviso: Falha ao sincronizar tentativa localmente.", "warning");
    }

    // Renderiza a tela de resultados
    this.renderResults(attemptData, mastery);
    AppRouter.navigateTo("view-resultado");
  },

  /**
   * Renderiza a tela de diagnóstico do resultado
   */
  renderResults(attemptData, mastery) {
    const heroDetails = HeroesModule.getHeroDetails(this.currentHero);
    
    const resEmojiEl = document.getElementById("resultado-heroi-emoji");
    if (resEmojiEl) resEmojiEl.textContent = heroDetails?.emoji || "🦸";
    document.getElementById("resultado-heroi-nome").textContent = this.currentHero;
    document.getElementById("resultado-tema").textContent = this.currentActivity.tema;

    // Pontuação e categoria
    document.getElementById("resultado-pontuacao").textContent = `${attemptData.acertos} / ${attemptData.total}`;
    document.getElementById("resultado-percentual").textContent = `${attemptData.percentual}% de Acerto`;

    const badgeCategory = document.getElementById("resultado-categoria-badge");
    if (badgeCategory) {
      badgeCategory.textContent = mastery.label;
      badgeCategory.className = `badge badge-mastery ${mastery.badgeClass}`;
      badgeCategory.style.backgroundColor = mastery.cor;
    }

    document.getElementById("resultado-categoria-desc").textContent = mastery.descricao;

    // Separação de conceitos: Dominados vs Para Revisar
    const conceitosDominadosSet = new Set();
    const conceitosRevisarSet = new Set();

    this.attemptResponses.forEach(r => {
      const c = r.conceito || "Conceito Geral";
      if (r.correta) {
        conceitosDominadosSet.add(c);
      } else {
        conceitosRevisarSet.add(c);
      }
    });

    const listaDominados = document.getElementById("resultado-lista-dominados");
    listaDominados.innerHTML = "";
    if (conceitosDominadosSet.size > 0) {
      conceitosDominadosSet.forEach(c => {
        const item = document.createElement("li");
        item.className = "concept-item concept-item-mastered";
        item.innerHTML = `<span class="concept-icon">✓</span> <span class="concept-name">${c}</span>`;
        listaDominados.appendChild(item);
      });
    } else {
      listaDominados.innerHTML = `<li class="concept-item text-muted">Nenhum conceito consolidado totalmente nesta tentativa. Pratique novamente!</li>`;
    }

    const listaRevisar = document.getElementById("resultado-lista-revisar");
    listaRevisar.innerHTML = "";
    if (conceitosRevisarSet.size > 0) {
      conceitosRevisarSet.forEach(c => {
        const item = document.createElement("li");
        item.className = "concept-item concept-item-review";
        item.innerHTML = `<span class="concept-icon">!</span> <span class="concept-name">${c}</span>`;
        listaRevisar.appendChild(item);
      });
    } else {
      listaRevisar.innerHTML = `<li class="concept-item concept-item-mastered"><span class="concept-icon">✓</span> Nenhum conceito pendente de revisão. Domínio integral!</li>`;
    }

    // Histórico de tentativas do aluno atual
    this.renderAttemptHistory();
  },

  /**
   * Renderiza a linha do tempo das tentativas realizadas por este herói nesta atividade
   */
  renderAttemptHistory() {
    const container = document.getElementById("resultado-historico-tentativas");
    if (!container) return;

    const participante = this.participantId
      ? this.currentActivity?.participantes?.find(p => p.id === this.participantId)
      : this.currentActivity?.participantes?.find(
          p => p.nome.toLowerCase() === this.currentHero.toLowerCase()
        );

    const tentativas = participante?.tentativas || [];

    if (tentativas.length <= 1) {
      container.innerHTML = `<p class="text-sm text-muted">Esta foi sua 1ª tentativa nesta atividade. Clique em "Tentar Novamente" abaixo para consolidar seu aprendizado!</p>`;
      return;
    }

    let html = `<div class="attempts-history-list">`;
    tentativas.forEach((t, idx) => {
      const num = idx + 1;
      const isCurrent = idx === tentativas.length - 1;
      const mast = UtilsModule.calculateMastery(t.acertos, t.total);

      html += `
        <div class="attempt-history-row ${isCurrent ? 'attempt-current' : ''}">
          <div class="attempt-row-header">
            <strong>Tentativa ${num} ${isCurrent ? '(Atual)' : ''}</strong>
            <span class="badge ${mast.badgeClass}">${mast.label}</span>
          </div>
          <div class="attempt-row-score">
            <span>${t.acertos}/${t.total} acertos (${t.percentual}%)</span>
            <span class="text-xs text-muted">${UtilsModule.formatDate(t.data)}</span>
          </div>
        </div>
      `;
    });
    html += `</div>`;

    container.innerHTML = html;
  },

  /**
   * Aluno clica em [ TENTAR NOVAMENTE ]
   * Reembaralha as questões e as alternativas, incrementa o número da tentativa
   * e reinicia o desafio mantendo o histórico de progresso.
   */
  retryChallenge() {
    this.attemptNumber++;
    this.attemptResponses = [];
    this.currentQuestionIndex = 0;

    // Embaralha questões e alternativas a cada nova tentativa
    this.preparedQuestions = AtividadeModule.prepareQuestionsForAttempt(this.currentActivity, true);

    UtilsModule.showToast(`Iniciando Tentativa ${this.attemptNumber}. Questões e alternativas reembaralhadas!`, "info");
    
    AppRouter.navigateTo("view-desafio");
    this.renderCurrentQuestion();
  }
};

window.AlunoModule = AlunoModule;
