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
    if (temaInput) temaInput.value = "Laços de Repetição em Python";

    const descInput = document.getElementById("criar-input-descricao");
    if (descInput) descInput.value = "Desafio formativo sobre laços de repetição (while e for), listas, regra do índice zero, range() e prevenção de loop infinito em Python.";

    const objInput = document.getElementById("criar-input-objetivo");
    if (objInput) objInput.value = "Compreender e aplicar estruturas de repetição em Python, diferenciando o laço condicional (while) do laço de coleções (for), manipulando listas e a função range(), e identificando a prevenção de loops infinitos.";

    this.creationQuestions = [
      {
        id: 1,
        enunciado: "Na aula, aprendemos que uma lista em Python funciona como uma caixa com compartimentos organizados para guardar vários itens juntos. Considere a lista abaixo:\n\n```python\namigos = [\"Lucas\", \"Beatriz\", \"Carlos\", \"Diana\"]\n```\n\nSeguindo a **Regra de Ouro** do Python para a contagem de posições, qual comando acessa exatamente o primeiro elemento (\"Lucas\")?",
        alternativas: [
          "amigos[1]",
          "amigos[0]",
          "amigos.primeiro()",
          "amigos[\"Lucas\"]"
        ],
        respostaCorreta: 1,
        explicacao: "Em Python, a contagem de posições na memória sempre começa no índice zero (0). Portanto, amigos[0] acessa o primeiro item (\"Lucas\"), enquanto amigos[1] acessa o segundo item (\"Beatriz\").",
        dica: "Lembre-se da \"Regra de Ouro\" das listas em Python: o primeiro compartimento da caixa sempre começa no índice zero (0).",
        conceito: "Regra de ouro do índice zero em listas",
        bloom: "Lembrar"
      },
      {
        id: 2,
        enunciado: "A função `range()` é um recurso essencial do Python para gerar sequências numéricas dinâmicas para o laço `for`, evitando a criação manual de listas. Observe o código abaixo:\n\n```python\nfor numero in range(5):\n    print(numero)\n```\n\nQuais números serão impressos no terminal pelo comando `print()`, na ordem exata de execução?",
        alternativas: [
          "1, 2, 3, 4, 5",
          "0, 1, 2, 3, 4",
          "0, 1, 2, 3, 4, 5",
          "1, 2, 3, 4"
        ],
        respostaCorreta: 1,
        explicacao: "A função range(5) gera uma sequência de 5 elementos iniciando sempre em 0 e parando uma unidade antes do número informado (ou seja: 0, 1, 2, 3 e 4). O limite superior 5 nunca é incluído.",
        dica: "Em Python, range(n) sempre inicia no zero e para imediatamente antes do limite informado n.",
        conceito: "Comportamento da função range()",
        bloom: "Compreender"
      },
      {
        id: 3,
        enunciado: "No exercício prático de construção da tabuada com o laço condicional `while`, foi proposto o seguinte algoritmo em Python:\n\n```python\nmultiplicador = 1\nwhile multiplicador <= 4:\n    resultado = 7 * multiplicador\n    print(resultado)\n    multiplicador = multiplicador + 1\n```\n\nQuais valores serão impressos no terminal e qual será o valor final da variável `multiplicador` assim que o laço finalizar sua execução?",
        alternativas: [
          "Imprime 7, 14, 21, 28 e o valor final de multiplicador é 4.",
          "Imprime 7, 14, 21, 28 e o valor final de multiplicador é 5.",
          "Imprime 7, 14, 21 e o valor final de multiplicador é 4.",
          "Imprime 1, 2, 3, 4 e o laço entra em repetição infinita."
        ],
        respostaCorreta: 1,
        explicacao: "O laço executa 4 iterações: para multiplicador = 1, 2, 3 e 4, imprimindo os múltiplos 7, 14, 21 e 28. Na 4ª volta, multiplicador é incrementado para 5. Ao retestar a condição (5 <= 4), o resultado é False e o laço encerra mantendo multiplicador = 5.",
        dica: "Simule o teste de mesa passo a passo: acompanhe o valor de multiplicador em cada volta e identifique qual valor faz a condição (multiplicador <= 4) se tornar falsa.",
        conceito: "Execução do while e variável de controle",
        bloom: "Aplicar"
      },
      {
        id: 4,
        enunciado: "Durante a aula prática, um aluno tentou simular uma contagem de passos com o laço `while`, mas seu programa travou imprimindo a mesma mensagem sem parar:\n\n```python\npassos = 1\nwhile passos <= 5:\n    print(f\"Passo número: {passos}\")\n```\n\nAo analisar o código, qual é a causa raiz desse comportamento (loop infinito) e como corrigi-lo corretamente?",
        alternativas: [
          "O laço while não aceita a condição <=, devendo ser substituído obrigatoriamente pela função range().",
          "A variável de controle 'passos' nunca é alterada dentro do laço, fazendo com que a condição 1 <= 5 seja sempre verdadeira (True); a solução é adicionar 'passos = passos + 1' no interior do laço.",
          "O comando print() com formatação f\"...\" cria um ciclo contínuo na memória que impede o término do programa.",
          "O laço while só funciona para percorrer listas fechadas, gerando travamento com números inteiros."
        ],
        respostaCorreta: 1,
        explicacao: "Um loop infinito ocorre quando a condição do while nunca se torna falsa. Como a variável passos não é incrementada dentro do laço, ela permanece sempre valendo 1, mantendo a condição (1 <= 5) eternamente verdadeira (True). A solução é atualizar a variável a cada repetição.",
        dica: "Lembre-se do ponto crítico ensinado no Slide 5: esquecer de atualizar a variável de controle dentro do laço faz o computador rodar a repetição eternamente!",
        conceito: "Identificação e prevenção de loop infinito",
        bloom: "Analisar"
      },
      {
        id: 5,
        enunciado: "Analise os dois desafios de automação apresentados a seguir:\n\n- **Desafio 1 (Lista de Amigos):** Percorrer uma coleção predefinida de nomes `amigos = [\"Ana\", \"Pedro\", \"Sofia\"]` para exibir uma mensagem de boas-vindas para cada amigo, utilizando uma variável temporária (\"apelido\").\n- **Desafio 2 (Caminhada do Robô):** Fazer um robô dar passos *enquanto* não houver obstáculo detectado pelo sensor, sem saber com antecedência quantos passos serão necessários.\n\nConsultando a **Matriz Comparativa** de tomada de decisão (Slide 10), qual é a estrutura de repetição mais recomendada e natural para cada desafio?",
        alternativas: [
          "Desafio 1: while (pois listas exigem contadores manuais); Desafio 2: for (pois sensores têm limites fixos).",
          "Desafio 1: for (laço de coleções para conjunto determinado de itens); Desafio 2: while (laço condicional para repetição indeterminada baseada em condição lógica).",
          "Ambos devem usar obrigatoriamente while, pois o laço for não existe na sintaxe padrão do Python.",
          "Ambos devem usar for, pois o while só pode ser utilizado quando conhecemos o número exato de repetições."
        ],
        respostaCorreta: 1,
        explicacao: "O laço 'for' é a escolha ideal para iterar sobre coleções determinadas (como listas), extraindo elemento por elemento com uma variável temporária. Já o 'while' é a ferramenta indicada para situações indeterminadas, onde a repetição depende de uma condição lógica dinâmica.",
        dica: "Consulte a Matriz Comparativa do Slide 10: quando temos uma coleção de itens definidos usamos for; quando a repetição depende de uma condição que não sabemos quantas voltas dará, usamos while.",
        conceito: "Critério de escolha entre while e for",
        bloom: "Avaliar"
      }
    ];

    this.renderCreationQuestions();
    UtilsModule.showToast("Exemplo de Laços de Repetição em Python preenchido com sucesso!", "success");
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
