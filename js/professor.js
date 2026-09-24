/**
 * educacaoComputacionalvalidador - Módulo do Criador / Professor
 * 
 * Gerencia a criação de atividades com 5 questões iniciais,
 * acesso administrativo por código do criador,
 * edição dinâmica da atividade e visualização completa dos analíticos pedagógicos.
 */

const ProfessorModule = {
  currentActivity: null,
  activeTab: "tab-analytics",
  creationQuestions: [],

  /**
   * Inicializa o formulário de criação de nova atividade
   */
  initCreationForm() {
    const heroSelect = document.getElementById("criar-select-heroi");
    HeroesModule.populateHeroSelect(heroSelect, { isCreator: true });

    // Inicia com 5 questões pedagógicas estruturadas por padrão
    this.creationQuestions = [
      AtividadeModule.createEmptyQuestion(1, "Compreender"),
      AtividadeModule.createEmptyQuestion(2, "Aplicar"),
      AtividadeModule.createEmptyQuestion(3, "Analisar"),
      AtividadeModule.createEmptyQuestion(4, "Analisar"),
      AtividadeModule.createEmptyQuestion(5, "Avaliar")
    ];

    // Limpa campos básicos
    const temaInput = document.getElementById("criar-input-tema");
    const descInput = document.getElementById("criar-input-descricao");
    const objInput = document.getElementById("criar-input-objetivo");

    if (temaInput) temaInput.value = "";
    if (descInput) descInput.value = "";
    if (objInput) objInput.value = "";

    this.renderCreationQuestions();
  },

  /**
   * Preenche o formulário de criação com exemplo pré-pronto (atalho didático)
   */
  fillExampleCreation() {
    const heroSelect = document.getElementById("criar-select-heroi");
    if (heroSelect) heroSelect.value = "Batman";

    const temaInput = document.getElementById("criar-input-tema");
    if (temaInput) temaInput.value = "Laços de Repetição";

    const descInput = document.getElementById("criar-input-descricao");
    if (descInput) descInput.value = "Desafio formativo sobre estruturas de repetição, contadores, condições de parada e laços aninhados em Computação.";

    const objInput = document.getElementById("criar-input-objetivo");
    if (objInput) objInput.value = "Compreender e analisar estruturas de repetição (for e while), identificando condições de parada, contadores e avaliando laços aninhados.";

    this.creationQuestions = [
      {
        id: 1,
        enunciado: "Em linguagens estruturadas como JavaScript e Python, quando utilizamos um laço `for (let i = 0; i < 5; i++)`, qual é o papel específico da expressão `i++` (ou incremento)?",
        alternativas: [
          "Inicializar a variável contadora antes do laço iniciar sua primeira repetição.",
          "Atualizar o valor do contador ao final de cada iteração para permitir o avanço do laço.",
          "Definir a condição lógica que interrompe imediatamente o laço.",
          "Reiniciar a contagem sempre que o valor atingir o limite estipulado."
        ],
        respostaCorreta: 1,
        explicacao: "O incremento (i++) é executado ao término de cada iteração. Sua função é atualizar a variável de controle para que a condição (i < 5) seja reavaliada, evitando laços infinitos.",
        dica: "Pense no que precisa mudar a cada volta do laço para que a contagem progrida até a condição de término.",
        conceito: "Estrutura do for e incremento",
        bloom: "Compreender"
      },
      {
        id: 2,
        enunciado: "Considere o seguinte trecho de código em execução:\n\n```javascript\nlet x = 10;\nwhile (x > 4) {\n    x = x - 2;\n}\n```\n\nQual será o valor final da variável `x` imediatamente após o laço finalizar?",
        alternativas: [
          "2",
          "4",
          "6",
          "0"
        ],
        respostaCorreta: 1,
        explicacao: "Na 1ª iteração x passa a ser 8. Na 2ª, x passa a ser 6. Na 3ª, x passa a ser 4. Em seguida, a condição (4 > 4) é avaliada como falsa, e o laço encerra mantendo x = 4.",
        dica: "Simule o teste de mesa passo a passo: verifique o valor de x em cada iteração até que a condição torne-se falsa.",
        conceito: "Estrutura do while",
        bloom: "Aplicar"
      },
      {
        id: 3,
        enunciado: "Observe o algoritmo a seguir:\n\n```javascript\nlet total = 0;\nlet i = 1;\nwhile (i !== 10) {\n    total += i;\n    i += 2;\n}\n```\n\nAo executar este trecho, o que acontecerá com a condição de parada do laço?",
        alternativas: [
          "O laço executará exatamente 5 vezes e terminará com total igual a 25.",
          "O laço entrará em repetição infinita pois a variável 'i' assume apenas valores ímpares (1, 3, 5, 7, 9, 11...) e nunca será estritamente igual a 10.",
          "Ocorrerá um erro de sintaxe imediatamente na declaração do operador de desigualdade.",
          "O laço parará no valor 9, pois 9 é o último número antes de 10."
        ],
        respostaCorreta: 1,
        explicacao: "Como i começa com 1 e cresce de 2 em 2, a sequência de valores é estritamente ímpar (1, 3, 5, 7, 9, 11, 13...). O valor 10 nunca é alcançado, mantendo a condição `i !== 10` permanentemente verdadeira.",
        dica: "Observe a paridade da sequência gerada pelo incremento (+2 a partir de 1).",
        conceito: "Condição de parada",
        bloom: "Analisar"
      },
      {
        id: 4,
        enunciado: "Quantas vezes a mensagem \"Computação\" será impressa no console ao executar o seguinte laço?\n\n```javascript\nfor (let k = 3; k <= 7; k++) {\n    console.log(\"Computação\");\n}\n```",
        alternativas: [
          "4 vezes",
          "3 vezes",
          "5 vezes",
          "7 vezes"
        ],
        respostaCorreta: 2,
        explicacao: "O contador k assume os valores: 3, 4, 5, 6 e 7. Como o operador relacional é menor ou igual (<=), ambos os limites estão inclusos, totalizando (7 - 3 + 1) = 5 iterações.",
        dica: "Escreva no papel os valores assumidos por k: k=3, k=4, ..., e conte quantas vezes a condição k <= 7 é satisfeita.",
        conceito: "Contador e número de iterações",
        bloom: "Analisar"
      },
      {
        id: 5,
        enunciado: "Analise a estrutura de laços aninhados abaixo:\n\n```javascript\nlet operacoes = 0;\nfor (let i = 0; i < 3; i++) {\n    for (let j = 0; j < 4; j++) {\n        operacoes++;\n    }\n}\n```\n\nAvalie o comportamento e determine quantas vezes a instrução `operacoes++` é executada:",
        alternativas: [
          "7 vezes, pois somam-se as repetições dos laços externo e interno (3 + 4).",
          "12 vezes, pois para cada ciclo do laço externo (3 vezes), o laço interno executa 4 iterações completas (3 × 4 = 12).",
          "4 vezes, pois apenas o laço interno controla a variável operacoes.",
          "9 vezes, pois a contagem encerra no índice anterior ao limite 3."
        ],
        respostaCorreta: 1,
        explicacao: "Laços aninhados multiplicam o número de execuções: para cada uma das 3 iterações de 'i', o laço 'j' executa 4 iterações. Logo, o total de operações é 3 × 4 = 12.",
        dica: "Lembre-se da regra multiplicativa: cada repetição do laço externo dispara o laço interno do início ao fim.",
        conceito: "Laços aninhados",
        bloom: "Avaliar"
      }
    ];

    this.renderCreationQuestions();
    UtilsModule.showToast("Exemplo de Laços de Repetição preenchido com sucesso!", "success");
  },

  /**
   * Renderiza a lista de questões no formulário de criação
   */
  renderCreationQuestions() {
    const container = document.getElementById("criar-questoes-container");
    if (!container) return;

    container.innerHTML = "";

    this.creationQuestions.forEach((q, idx) => {
      const qNum = idx + 1;
      const card = document.createElement("div");
      card.className = "question-editor-card animate-fade-in";
      card.id = `editor-q-${idx}`;

      card.innerHTML = `
        <div class="q-editor-header">
          <div class="q-editor-title">
            <span class="q-badge-num">#${qNum}</span>
            <strong>Questão ${qNum}</strong>
          </div>
          <div class="q-editor-actions">
            ${this.creationQuestions.length > 1 ? `
              <button type="button" class="btn btn-sm btn-outline-danger" onclick="ProfessorModule.removeCreationQuestion(${idx})" title="Remover questão">
                Excluir
              </button>
            ` : ''}
          </div>
        </div>

        <div class="q-editor-body">
          <div class="form-row form-row-2">
            <div class="form-group">
              <label>Conceito Relacionado *</label>
              <input type="text" class="input-text" placeholder="Ex: Contagem de iterações, Laços aninhados" 
                     value="${q.conceito || ''}" oninput="ProfessorModule.updateCreationQuestion(${idx}, 'conceito', this.value)">
            </div>
            <div class="form-group">
              <label>Nível da Taxonomia de Bloom *</label>
              <select class="input-select" onchange="ProfessorModule.updateCreationQuestion(${idx}, 'bloom', this.value)">
                ${["Lembrar", "Compreender", "Aplicar", "Analisar", "Avaliar"].map(lvl => `
                  <option value="${lvl}" ${q.bloom === lvl ? 'selected' : ''}>${lvl}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Enunciado da Pergunta * (suporta markdown e blocos de código com \`\`\`javascript)</label>
            <textarea class="input-textarea" rows="3" placeholder="Digite a questão..." 
                      oninput="ProfessorModule.updateCreationQuestion(${idx}, 'enunciado', this.value)">${q.enunciado || ''}</textarea>
          </div>

          <div class="form-group">
            <label>4 Alternativas (Selecione o botão da alternativa correta) *</label>
            <div class="alternativas-editor-grid">
              ${[0, 1, 2, 3].map(aIdx => `
                <div class="alt-editor-row">
                  <label class="alt-radio-label">
                    <input type="radio" name="correta-q-${idx}" value="${aIdx}" 
                           ${q.respostaCorreta === aIdx ? 'checked' : ''} 
                           onchange="ProfessorModule.updateCreationQuestion(${idx}, 'respostaCorreta', ${aIdx})">
                    <span class="alt-letter-tag">${String.fromCharCode(65 + aIdx)}</span>
                  </label>
                  <input type="text" class="input-text alt-text-input" placeholder="Texto da alternativa ${String.fromCharCode(65 + aIdx)}" 
                         value="${q.alternativas[aIdx] || ''}" 
                         oninput="ProfessorModule.updateCreationAlternative(${idx}, ${aIdx}, this.value)">
                </div>
              `).join('')}
            </div>
          </div>

          <div class="form-row form-row-2">
            <div class="form-group">
              <label>Explicação da Resposta Correta *</label>
              <textarea class="input-textarea" rows="5" placeholder="Explique por que esta resposta é a correta..." 
                        oninput="ProfessorModule.updateCreationQuestion(${idx}, 'explicacao', this.value)">${q.explicacao || ''}</textarea>
            </div>
            <div class="form-group">
              <label>Dica para o Aluno (exibida se errar) *</label>
              <textarea class="input-textarea" rows="5" placeholder="Dica construtiva para orientar o raciocínio..." 
                        oninput="ProfessorModule.updateCreationQuestion(${idx}, 'dica', this.value)">${q.dica || ''}</textarea>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  },

  /**
   * Adiciona uma nova questão vazia
   */
  addCreationQuestion() {
    const nextId = this.creationQuestions.length + 1;
    this.creationQuestions.push(AtividadeModule.createEmptyQuestion(nextId, "Analisar"));
    this.renderCreationQuestions();
    UtilsModule.showToast(`Questão ${nextId} adicionada com sucesso.`, "info");
  },

  /**
   * Remove uma questão
   */
  removeCreationQuestion(index) {
    if (this.creationQuestions.length <= 1) {
      UtilsModule.showToast("A atividade deve ter no mínimo 1 questão.", "warning");
      return;
    }
    this.creationQuestions.splice(index, 1);
    // Reindexar IDs
    this.creationQuestions.forEach((q, idx) => q.id = idx + 1);
    this.renderCreationQuestions();
  },

  /**
   * Atualiza propriedades de uma questão durante a criação
   */
  updateCreationQuestion(qIndex, field, value) {
    if (this.creationQuestions[qIndex]) {
      this.creationQuestions[qIndex][field] = value;
    }
  },

  /**
   * Atualiza o texto de uma alternativa específica
   */
  updateCreationAlternative(qIndex, aIndex, value) {
    if (this.creationQuestions[qIndex] && this.creationQuestions[qIndex].alternativas) {
      this.creationQuestions[qIndex].alternativas[aIndex] = value;
    }
  },

  /**
   * Salva a nova atividade no repositório persistente
   */
  async submitCreationForm() {
    const heroSelect = document.getElementById("criar-select-heroi");
    const temaInput = document.getElementById("criar-input-tema");
    const descInput = document.getElementById("criar-input-descricao");
    const objInput = document.getElementById("criar-input-objetivo");

    const activityData = {
      id: "ativ_" + Date.now().toString(36),
      codigoAtividade: UtilsModule.generateCode(6),
      codigoCriador: UtilsModule.generateCode(6),
      criador: {
        nome: heroSelect ? heroSelect.value : ""
      },
      tema: temaInput ? temaInput.value.trim() : "",
      descricao: descInput ? descInput.value.trim() : "",
      objetivo: objInput ? objInput.value.trim() : "",
      dataCriacao: new Date().toISOString(),
      questoes: this.creationQuestions,
      participantes: []
    };

    const validation = AtividadeModule.validateActivity(activityData);
    if (!validation.isValid) {
      UtilsModule.showToast(validation.errors[0], "error", 5000);
      return;
    }

    try {
      const saved = await StorageService.saveActivity(activityData);
      this.currentActivity = saved;
      
      // Exibe tela de sucesso com os dois códigos
      this.showCreationSuccess(saved);
    } catch (err) {
      console.error("Erro ao salvar atividade:", err);
      UtilsModule.showToast("Falha ao salvar a atividade. Tente novamente.", "error");
    }
  },

  /**
   * Exibe a tela de confirmação com os dois códigos gerados
   */
  showCreationSuccess(activity) {
    document.getElementById("sucesso-codigo-atividade").textContent = activity.codigoAtividade;
    document.getElementById("sucesso-codigo-criador").textContent = activity.codigoCriador;
    document.getElementById("sucesso-tema").textContent = activity.tema;
    document.getElementById("sucesso-criador-nome").textContent = activity.criador.nome;

    AppRouter.navigateTo("view-criado-sucesso");
  },

  /**
   * Inicializa a tela de login do criador (acesso por chave administrativa)
   */
  initLogin(prefillCode = "") {
    const codeInput = document.getElementById("criador-input-codigo");
    if (codeInput) {
      codeInput.value = prefillCode ? prefillCode.trim().toUpperCase() : "";
      codeInput.focus();
    }
  },

  /**
   * Valida e autentica a chave do criador
   */
  async loginCreator(codeToUse = null) {
    const input = document.getElementById("criador-input-codigo");
    const code = (codeToUse || input?.value || "").trim().toUpperCase();

    if (!code) {
      UtilsModule.showToast("Por favor, digite o código do criador.", "warning");
      return;
    }

    const activity = await StorageService.getActivityByCreatorCode(code);

    if (!activity) {
      UtilsModule.showToast(`Código do criador "${code}" não encontrado. Verifique sua chave administrativa.`, "error");
      return;
    }

    this.currentActivity = activity;
    UtilsModule.showToast(`Bem-vindo, ${activity.criador?.nome || 'Criador'}! Painel carregado.`, "success");
    
    this.openDashboard(activity);
  },

  /**
   * Abre e popula o painel do criador
   */
  openDashboard(activity) {
    this.currentActivity = activity;

    const elTema = document.getElementById("painel-tema");
    if (elTema) elTema.textContent = activity.tema;

    const elAtiv = document.getElementById("painel-codigo-atividade");
    if (elAtiv) elAtiv.textContent = activity.codigoAtividade;

    const elCriadorCod = document.getElementById("painel-codigo-criador");
    if (elCriadorCod) elCriadorCod.textContent = activity.codigoCriador;
    
    const heroDetails = HeroesModule.getHeroDetails(activity.criador?.nome);
    const elCriadorEmoji = document.getElementById("painel-criador-emoji");
    if (elCriadorEmoji) elCriadorEmoji.textContent = heroDetails.emoji;

    const elCriadorNome = document.getElementById("painel-criador-nome");
    if (elCriadorNome) elCriadorNome.textContent = activity.criador?.nome || "Professor";

    const elDataCriacao = document.getElementById("painel-data-criacao");
    if (elDataCriacao) elDataCriacao.textContent = UtilsModule.formatDate(activity.dataCriacao);

    // Seleciona a aba de analíticos por padrão
    this.switchTab("tab-analytics");
    AppRouter.navigateTo("view-criador-painel");
  },

  /**
   * Alterna entre as abas do painel administrativo
   */
  switchTab(tabId) {
    this.activeTab = tabId;

    // Atualiza botões da tab bar
    const tabBtns = document.querySelectorAll(".tab-nav-btn");
    tabBtns.forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Oculta e exibe seções correspondentes
    const tabContents = document.querySelectorAll(".tab-content-panel");
    tabContents.forEach(p => {
      if (p.id === tabId) {
        p.classList.remove("hidden");
      } else {
        p.classList.add("hidden");
      }
    });

    if (tabId === "tab-analytics") {
      this.renderAnalyticsView();
    } else if (tabId === "tab-editor") {
      this.renderEditorView();
    } else if (tabId === "tab-export") {
      this.renderExportView();
    }
  },

  /**
   * Renderiza a visualização analítica pedagógica completa
   */
  renderAnalyticsView() {
    if (!this.currentActivity) return;

    const stats = AnalyticsModule.computeActivityAnalytics(this.currentActivity);

    // KPI Cards
    document.getElementById("kpi-participantes").textContent = stats.totalParticipantes;
    document.getElementById("kpi-tentativas").textContent = stats.totalTentativas;
    document.getElementById("kpi-media-turma").textContent = `${stats.mediaGeralTurma}%`;
    document.getElementById("kpi-dominio-completo").textContent = stats.distribuicaoDominio.completo;

    // Resumo de distribuição
    document.getElementById("kpi-dist-quasela").textContent = stats.distribuicaoDominio.quaseLa;
    document.getElementById("kpi-dist-desenv").textContent = stats.distribuicaoDominio.desenvolvimento;
    document.getElementById("kpi-dist-praticar").textContent = stats.distribuicaoDominio.praticar;
    document.getElementById("kpi-dist-recomecar").textContent = stats.distribuicaoDominio.recomecar;

    // 1. Desempenho por Taxonomia de Bloom
    const bloomContainer = document.getElementById("analytics-bloom-container");
    bloomContainer.innerHTML = "";

    stats.desempenhoBloom.forEach(b => {
      const hasQuestions = b.totalQuestoesNaAtividade > 0;
      const taxa = b.taxaAcerto !== null ? b.taxaAcerto : 0;

      const row = document.createElement("div");
      row.className = "bloom-stat-row";

      row.innerHTML = `
        <div class="bloom-stat-info">
          <div class="bloom-stat-name">
            <span class="bloom-color-dot" style="background-color: ${b.info.cor}"></span>
            <strong>${b.nivel}</strong>
            <span class="text-xs text-muted">(${b.totalQuestoesNaAtividade} na atividade)</span>
          </div>
          <div class="bloom-stat-pct">
            ${hasQuestions ? `${taxa}% de acertos` : 'Não avaliado'}
          </div>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${taxa}%; background-color: ${b.info.cor}"></div>
        </div>
      `;

      bloomContainer.appendChild(row);
    });

    // 2. Desempenho por Questão
    const questoesContainer = document.getElementById("analytics-questoes-container");
    questoesContainer.innerHTML = "";

    stats.desempenhoQuestoes.forEach(q => {
      const bloomInfo = UtilsModule.getBloomInfo(q.bloom);
      const card = document.createElement("div");
      card.className = "quest-stat-card";

      // Determina cor com base no acerto
      let statusColor = "#10b981";
      if (q.taxaAcerto < 50) statusColor = "#ef4444";
      else if (q.taxaAcerto < 75) statusColor = "#f59e0b";

      card.innerHTML = `
        <div class="quest-stat-header">
          <span class="quest-num-badge">Questão ${q.numero}</span>
          <span class="badge" style="background-color: ${bloomInfo.fundo}; color: ${bloomInfo.cor}; border: 1px solid ${bloomInfo.cor}">
            ${q.bloom}
          </span>
        </div>
        <div class="quest-stat-body">
          <div class="quest-stat-concept">${q.conceito}</div>
          <div class="quest-stat-rate">
            <span class="quest-stat-number" style="color: ${statusColor}">${q.taxaAcerto}%</span>
            <span class="text-xs text-muted">de acertos (${q.totalAcertos}/${q.totalRespostas} respostas)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${q.taxaAcerto}%; background-color: ${statusColor}"></div>
          </div>
        </div>
      `;

      questoesContainer.appendChild(card);
    });

    // 3. Conceitos com Maior Dificuldade
    const conceitosContainer = document.getElementById("analytics-conceitos-container");
    conceitosContainer.innerHTML = "";

    if (stats.rankingDificuldade.length === 0) {
      conceitosContainer.innerHTML = `<p class="text-sm text-muted">Ainda não há dados suficientes para calcular o ranking de conceitos.</p>`;
    } else {
      stats.rankingDificuldade.forEach((c, idx) => {
        const item = document.createElement("div");
        item.className = "conceito-rank-item";

        item.innerHTML = `
          <div class="conceito-rank-left">
            <span class="rank-pos">${idx + 1}º</span>
            <div>
              <strong>${c.conceito}</strong>
              <div class="text-xs text-muted">${c.totalErros} erros em ${c.totalRespostas} respostas</div>
            </div>
          </div>
          <div class="conceito-rank-right">
            <span class="badge badge-error">${c.taxaErro}% de erro</span>
          </div>
        `;

        conceitosContainer.appendChild(item);
      });
    }

    // 4. Tabela de Participantes
    const tabelaBody = document.getElementById("tabela-participantes-body");
    tabelaBody.innerHTML = "";

    if (stats.participantesTabela.length === 0) {
      tabelaBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Nenhum aluno participou desta atividade ainda. Compartilhe o código <strong>${this.currentActivity.codigoAtividade}</strong> com sua turma!</td></tr>`;
    } else {
      stats.participantesTabela.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>
            <div class="part-hero-cell">
              <span class="part-emoji">${p.emoji}</span>
              <strong>${p.nome}</strong>
            </div>
          </td>
          <td><span class="badge badge-neutral">${p.totalTentativas}</span></td>
          <td><strong>${p.melhorAcertos}</strong> (${p.melhorPercentual}%)</td>
          <td><span class="badge badge-mastery-tag">${p.ultimaClassificacao}</span></td>
          <td class="text-xs text-muted">${UtilsModule.formatDate(p.ultimaData)}</td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="ProfessorModule.viewParticipantDetail('${p.nome}')">
              Ver Tentativas
            </button>
          </td>
        `;

        tabelaBody.appendChild(tr);
      });
    }
  },

  /**
   * Modal com detalhes das tentativas de um participante específico
   */
  viewParticipantDetail(heroName) {
    const p = this.currentActivity?.participantes?.find(
      part => part.nome.toLowerCase() === heroName.toLowerCase()
    );

    if (!p) return;

    const modal = document.getElementById("modal-participante");
    if (!modal) return;

    const heroDetails = HeroesModule.getHeroDetails(p.nome);
    document.getElementById("modal-part-title").innerHTML = `${heroDetails.emoji} Tentativas de <strong>${p.nome}</strong>`;

    const body = document.getElementById("modal-part-body");
    body.innerHTML = "";

    if (!p.tentativas || p.tentativas.length === 0) {
      body.innerHTML = `<p class="text-muted">Nenhuma tentativa concluída.</p>`;
    } else {
      p.tentativas.forEach((t, idx) => {
        const attemptBox = document.createElement("div");
        attemptBox.className = "attempt-detail-card mb-3";

        const mast = UtilsModule.calculateMastery(t.acertos, t.total);

        let questoesHtml = `<div class="attempt-respostas-list mt-2">`;
        if (Array.isArray(t.respostas)) {
          t.respostas.forEach((r, rIdx) => {
            questoesHtml += `
              <div class="resp-item ${r.correta ? 'resp-correta' : 'resp-incorreta'}">
                <span class="resp-icon">${r.correta ? '✓' : '✗'}</span>
                <span class="resp-conceito"><strong>Q${rIdx + 1} (${r.conceito || 'Conceito'}):</strong> ${r.correta ? 'Acertou' : 'Errou'}</span>
              </div>
            `;
          });
        }
        questoesHtml += `</div>`;

        attemptBox.innerHTML = `
          <div class="attempt-detail-header">
            <strong>Tentativa ${idx + 1}</strong>
            <span class="badge ${mast.badgeClass}">${mast.label}</span>
          </div>
          <div class="attempt-detail-summary text-sm text-muted">
            <span>Pontuação: <strong>${t.acertos}/${t.total} (${t.percentual}%)</strong></span>
            <span>Realizada em: ${UtilsModule.formatDate(t.data)}</span>
          </div>
          ${questoesHtml}
        `;

        body.appendChild(attemptBox);
      });
    }

    modal.classList.remove("hidden");
    
    // Foco no botão fechar para acessibilidade
    const closeBtn = modal.querySelector(".modal-close-btn");
    if (closeBtn) closeBtn.focus();

    // Listener para fechar com tecla ESC
    this._modalEscListener = (e) => {
      if (e.key === "Escape") {
        ProfessorModule.closeParticipantModal();
      }
    };
    window.addEventListener("keydown", this._modalEscListener);
  },

  /**
   * Fecha o modal do participante e remove listeners
   */
  closeParticipantModal() {
    const modal = document.getElementById("modal-participante");
    if (modal) modal.classList.add("hidden");
    if (this._modalEscListener) {
      window.removeEventListener("keydown", this._modalEscListener);
      this._modalEscListener = null;
    }
  },

  /**
   * Renderiza a aba de edição da atividade
   */
  renderEditorView() {
    if (!this.currentActivity) return;

    document.getElementById("edit-input-tema").value = this.currentActivity.tema || "";
    document.getElementById("edit-input-descricao").value = this.currentActivity.descricao || "";
    document.getElementById("edit-input-objetivo").value = this.currentActivity.objetivo || "";

    const container = document.getElementById("edit-questoes-container");
    container.innerHTML = "";

    this.currentActivity.questoes.forEach((q, idx) => {
      const qNum = idx + 1;
      const card = document.createElement("div");
      card.className = "question-editor-card";
      card.id = `edit-card-${idx}`;

      card.innerHTML = `
        <div class="q-editor-header">
          <div class="q-editor-title">
            <span class="q-badge-num">#${qNum}</span>
            <strong>Questão ${qNum}</strong>
          </div>
          <div class="q-editor-actions">
            ${this.currentActivity.questoes.length > 1 ? `
              <button type="button" class="btn btn-sm btn-outline-danger" onclick="ProfessorModule.deleteEditorQuestion(${idx})">
                🗑️ Excluir
              </button>
            ` : ''}
          </div>
        </div>

        <div class="q-editor-body">
          <div class="form-row form-row-2">
            <div class="form-group">
              <label>Conceito Relacionado *</label>
              <input type="text" class="input-text" value="${q.conceito || ''}" 
                     oninput="ProfessorModule.updateEditorQuestionField(${idx}, 'conceito', this.value)">
            </div>
            <div class="form-group">
              <label>Nível da Taxonomia de Bloom *</label>
              <select class="input-select" onchange="ProfessorModule.updateEditorQuestionField(${idx}, 'bloom', this.value)">
                ${["Lembrar", "Compreender", "Aplicar", "Analisar", "Avaliar"].map(lvl => `
                  <option value="${lvl}" ${q.bloom === lvl ? 'selected' : ''}>${lvl}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Enunciado da Pergunta *</label>
            <textarea class="input-textarea" rows="3" 
                      oninput="ProfessorModule.updateEditorQuestionField(${idx}, 'enunciado', this.value)">${q.enunciado || ''}</textarea>
          </div>

          <div class="form-group">
            <label>4 Alternativas (Selecione a resposta correta) *</label>
            <div class="alternativas-editor-grid">
              ${[0, 1, 2, 3].map(aIdx => `
                <div class="alt-editor-row">
                  <label class="alt-radio-label">
                    <input type="radio" name="edit-correta-q-${idx}" value="${aIdx}" 
                           ${q.respostaCorreta === aIdx ? 'checked' : ''} 
                           onchange="ProfessorModule.updateEditorQuestionField(${idx}, 'respostaCorreta', ${aIdx})">
                    <span class="alt-letter-tag">${String.fromCharCode(65 + aIdx)}</span>
                  </label>
                  <input type="text" class="input-text alt-text-input" 
                         value="${q.alternativas[aIdx] || ''}" 
                         oninput="ProfessorModule.updateEditorAlternative(${idx}, ${aIdx}, this.value)">
                </div>
              `).join('')}
            </div>
          </div>

          <div class="form-row form-row-2">
            <div class="form-group">
              <label>Explicação da Resposta Correta *</label>
              <textarea class="input-textarea" rows="5" 
                        oninput="ProfessorModule.updateEditorQuestionField(${idx}, 'explicacao', this.value)">${q.explicacao || ''}</textarea>
            </div>
            <div class="form-group">
              <label>Dica para o Aluno *</label>
              <textarea class="input-textarea" rows="5" 
                        oninput="ProfessorModule.updateEditorQuestionField(${idx}, 'dica', this.value)">${q.dica || ''}</textarea>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  },

  /**
   * Adiciona nova questão no modo de edição
   */
  addEditorQuestion() {
    if (!this.currentActivity) return;
    const nextId = this.currentActivity.questoes.length + 1;
    this.currentActivity.questoes.push(AtividadeModule.createEmptyQuestion(nextId, "Analisar"));
    this.renderEditorView();
    UtilsModule.showToast(`Nova questão ${nextId} adicionada. Lembre-se de salvar as alterações.`, "info");
  },

  /**
   * Exclui uma questão no modo de edição
   */
  deleteEditorQuestion(idx) {
    if (!this.currentActivity || this.currentActivity.questoes.length <= 1) {
      UtilsModule.showToast("A atividade não pode ter menos de 1 questão.", "warning");
      return;
    }
    this.currentActivity.questoes.splice(idx, 1);
    this.currentActivity.questoes.forEach((q, i) => q.id = i + 1);
    this.renderEditorView();
    UtilsModule.showToast("Questão removida. Clique em Salvar Alterações para confirmar.", "info");
  },

  /**
   * Atualiza campo da questão em edição
   */
  updateEditorQuestionField(qIdx, field, value) {
    if (this.currentActivity?.questoes[qIdx]) {
      this.currentActivity.questoes[qIdx][field] = value;
    }
  },

  /**
   * Atualiza texto da alternativa em edição
   */
  updateEditorAlternative(qIdx, aIdx, value) {
    if (this.currentActivity?.questoes[qIdx]?.alternativas) {
      this.currentActivity.questoes[qIdx].alternativas[aIdx] = value;
    }
  },

  /**
   * Salva todas as edições realizadas na atividade
   */
  async saveEditorChanges() {
    if (!this.currentActivity) return;

    this.currentActivity.tema = document.getElementById("edit-input-tema").value.trim();
    this.currentActivity.descricao = document.getElementById("edit-input-descricao").value.trim();
    this.currentActivity.objetivo = document.getElementById("edit-input-objetivo").value.trim();

    const validation = AtividadeModule.validateActivity(this.currentActivity);
    if (!validation.isValid) {
      UtilsModule.showToast(validation.errors[0], "error", 5000);
      return;
    }

    try {
      this.currentActivity = await StorageService.saveActivity(this.currentActivity);
      UtilsModule.showToast("Atividade e questões salvas com sucesso!", "success");
      
      // Atualiza cabeçalho do painel
      document.getElementById("painel-tema").textContent = this.currentActivity.tema;
    } catch (err) {
      console.error("Erro ao salvar alterações:", err);
      UtilsModule.showToast("Falha ao salvar edições.", "error");
    }
  },

  /**
   * Renderiza a aba de backup e exportação JSON
   */
  renderExportView() {
    if (!this.currentActivity) return;

    const rawArea = document.getElementById("export-json-raw");
    if (rawArea) {
      rawArea.value = JSON.stringify(this.currentActivity, null, 2);
    }
  },

  /**
   * Copia o JSON da atividade para a área de transferência
   */
  async copyActivityJSON(btn) {
    if (!this.currentActivity) return;
    const jsonStr = JSON.stringify(this.currentActivity, null, 2);
    await UtilsModule.copyToClipboard(jsonStr, btn, "JSON Copiado!");
  },

  /**
   * Faz o download do arquivo .json da atividade
   */
  downloadActivityJSON() {
    if (!this.currentActivity) return;
    const jsonStr = JSON.stringify(this.currentActivity, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `atividade-${this.currentActivity.codigoAtividade}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    UtilsModule.showToast(`Arquivo atividade-${this.currentActivity.codigoAtividade}.json baixado.`, "success");
  },

  /**
   * Importa um JSON colado pelo professor
   */
  async importActivityJSON() {
    const inputArea = document.getElementById("import-json-input");
    const jsonStr = inputArea?.value?.trim();

    if (!jsonStr) {
      UtilsModule.showToast("Cole o conteúdo JSON válido no campo abaixo.", "warning");
      return;
    }

    try {
      const imported = await StorageService.importActivityJSON(jsonStr);
      this.currentActivity = imported;
      UtilsModule.showToast("Atividade importada com sucesso!", "success");
      this.openDashboard(imported);
      if (inputArea) inputArea.value = "";
    } catch (err) {
      UtilsModule.showToast(err.message || "Erro ao importar JSON.", "error");
    }
  },

  /**
   * Limpa tentativas de participantes para reiniciar uma nova turma
   */
  async resetParticipants() {
    if (!this.currentActivity) return;

    const confirmReset = confirm(`Deseja realmente limpar as tentativas de todos os alunos da atividade "${this.currentActivity.tema}"? O conteúdo das questões será mantido.`);
    if (!confirmReset) return;

    try {
      this.currentActivity = await StorageService.resetActivityParticipants(this.currentActivity.codigoAtividade);
      UtilsModule.showToast("Participantes e tentativas reiniciados com sucesso.", "success");
      this.renderAnalyticsView();
    } catch (err) {
      console.error("Erro ao resetar participantes:", err);
      UtilsModule.showToast("Falha ao resetar participantes.", "error");
    }
  }
};

window.ProfessorModule = ProfessorModule;
