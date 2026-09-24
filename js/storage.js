/**
 * educacaoComputacionalvalidador - Camada de Armazenamento (Storage Repository)
 * 
 * Implementa o padrão Repository para abstrair a persistência dos dados em JSON.
 * Atualmente utiliza localStorage para execução autônoma no navegador (preparado para Vercel),
 * mas estruturado com métodos assíncronos (Promises) para que, no futuro, possa ser substituído
 * por chamadas fetch() a uma API REST ou banco de dados externo sem alterar os componentes da UI.
 */

const STORAGE_KEY = "educaComputaValida_atividades_v1";

// Dados da atividade de demonstração padrão (LOOP7K / ADMIN7)
const DEMO_ACTIVITY_SEED = {
  id: "ativ_loop7k",
  codigoAtividade: "LOOP7K",
  codigoCriador: "ADMIN7",
  criador: {
    nome: "Batman"
  },
  tema: "Laços de Repetição em Python",
  descricao: "Desafio formativo sobre laços de repetição (while e for), listas, regra do índice zero, range() e prevenção de loop infinito em Python.",
  objetivo: "Compreender e aplicar estruturas de repetição em Python, diferenciando o laço condicional (while) do laço de coleções (for), manipulando listas e a função range(), e identificando a prevenção de loops infinitos.",
  dataCriacao: "2026-09-24T10:00:00.000Z",
  questoes: [
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
  ],
  participantes: []
};

const StorageService = {
  /**
   * Inicializa o repositório. Carrega dados do localStorage ou semeia a atividade limpa de teste.
   */
  async init() {
    try {
      const SEED_VERSION = "v3_python_loops";
      const currentVersion = localStorage.getItem("educaComputaValida_seed_version");

      if (currentVersion !== SEED_VERSION) {
        // Atualiza para o estado limpo de produção
        localStorage.setItem(STORAGE_KEY, JSON.stringify([DEMO_ACTIVITY_SEED]));
        localStorage.setItem("educaComputaValida_seed_version", SEED_VERSION);
        return true;
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([DEMO_ACTIVITY_SEED]));
        localStorage.setItem("educaComputaValida_seed_version", SEED_VERSION);
      }
      return true;
    } catch (e) {
      console.warn("StorageService init warning:", e);
      return false;
    }
  },

  /**
   * Obtém todas as atividades salvas
   * @returns {Promise<Array>}
   */
  async getAllActivities() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [DEMO_ACTIVITY_SEED];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Erro ao ler atividades:", e);
      return [DEMO_ACTIVITY_SEED];
    }
  },

  /**
   * Busca atividade pelo código da atividade (ex: LOOP7K)
   * @param {string} code 
   * @returns {Promise<Object|null>}
   */
  async getActivityByCode(code) {
    if (!code) return null;
    const cleanCode = code.trim().toUpperCase();
    const all = await this.getAllActivities();
    return all.find(a => (a.codigoAtividade || "").toUpperCase() === cleanCode) || null;
  },

  /**
   * Busca atividade pelo código do criador (chave administrativa, ex: ADMIN7 ou X7K9P2)
   * @param {string} creatorCode 
   * @returns {Promise<Object|null>}
   */
  async getActivityByCreatorCode(creatorCode) {
    if (!creatorCode) return null;
    const cleanCode = creatorCode.trim().toUpperCase();
    const all = await this.getAllActivities();
    return all.find(a => (a.codigoCriador || "").toUpperCase() === cleanCode) || null;
  },

  /**
   * Salva ou atualiza uma atividade no armazenamento
   * @param {Object} activity Objeto JSON completo da atividade
   * @returns {Promise<Object>} Atividade salva
   */
  async saveActivity(activity) {
    if (!activity || !activity.codigoAtividade) {
      throw new Error("Objeto de atividade inválido ou sem código.");
    }

    const all = await this.getAllActivities();
    const index = all.findIndex(a => 
      (a.codigoAtividade || "").toUpperCase() === activity.codigoAtividade.toUpperCase()
    );

    if (index >= 0) {
      all[index] = { ...all[index], ...activity, dataAtualizacao: new Date().toISOString() };
    } else {
      if (!activity.dataCriacao) {
        activity.dataCriacao = new Date().toISOString();
      }
      if (!activity.participantes) {
        activity.participantes = [];
      }
      all.push(activity);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return activity;
  },

  /**
   * Exclui uma atividade
   * @param {string} code 
   * @returns {Promise<boolean>}
   */
  async deleteActivity(code) {
    if (!code) return false;
    const cleanCode = code.trim().toUpperCase();
    const all = await this.getAllActivities();
    const filtered = all.filter(a => (a.codigoAtividade || "").toUpperCase() !== cleanCode);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  /**
   * Registra uma tentativa de um participante na atividade
   * Suporta concorrência em sala de aula: se 2 ou mais alunos escolherem o mesmo herói
   * simultaneamente ou intencionalmente, cada aluno recebe uma sessão anônima única e independente.
   * @param {string} activityCode 
   * @param {string} heroName 
   * @param {Object} attemptData { data, respostas, acertos, total, percentual, classificacao }
   * @param {string|null} participantId Identificador único da sessão do aluno
   * @returns {Promise<Object>} { activity, participant }
   */
  async registerAttempt(activityCode, heroName, attemptData, participantId = null) {
    const activity = await this.getActivityByCode(activityCode);
    if (!activity) {
      throw new Error(`Atividade com código ${activityCode} não encontrada.`);
    }

    if (!activity.participantes) {
      activity.participantes = [];
    }

    let participant = null;

    // 1. Busca pelo ID exclusivo de sessão do participante se fornecido
    if (participantId) {
      participant = activity.participantes.find(p => p.id === participantId);
    }

    // 2. Se não encontrou por ID, mas já existe alguém com esse nome exato
    if (!participant) {
      const cleanHero = heroName ? heroName.trim() : "Participante Anônimo";
      let finalDisplayName = cleanHero;

      // Se já houver participante cadastrado com esse mesmo herói base e não for a mesma sessão
      const existingWithSameBase = activity.participantes.filter(
        p => (p.heroiBase || p.nome).toLowerCase() === cleanHero.toLowerCase()
      );

      if (existingWithSameBase.length > 0) {
        finalDisplayName = `${cleanHero} #${existingWithSameBase.length + 1}`;
      }

      const newId = participantId || ("part_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 7));

      participant = {
        id: newId,
        nome: finalDisplayName,
        heroiBase: cleanHero,
        dataEntrada: new Date().toISOString(),
        tentativas: []
      };
      activity.participantes.push(participant);
    }

    participant.tentativas.push({
      ...attemptData,
      data: attemptData.data || new Date().toISOString()
    });

    await this.saveActivity(activity);
    return { activity, participant };
  },

  /**
   * Limpa as tentativas de participantes de uma atividade mantendo o conteúdo da atividade
   * @param {string} activityCode 
   */
  async resetActivityParticipants(activityCode) {
    const activity = await this.getActivityByCode(activityCode);
    if (!activity) return null;
    activity.participantes = [];
    await this.saveActivity(activity);
    return activity;
  },

  /**
   * Exporta uma atividade como string JSON formatada
   * @param {string} activityCode 
   * @returns {Promise<string>}
   */
  async exportActivityJSON(activityCode) {
    const activity = await this.getActivityByCode(activityCode);
    if (!activity) throw new Error("Atividade não encontrada");
    return JSON.stringify(activity, null, 2);
  },

  /**
   * Importa uma atividade a partir de string JSON
   * @param {string} jsonString 
   * @returns {Promise<Object>}
   */
  async importActivityJSON(jsonString) {
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch {
      throw new Error("Arquivo JSON inválido.");
    }

    if (!parsed.codigoAtividade || !parsed.questoes || !Array.isArray(parsed.questoes)) {
      throw new Error("O JSON não contém uma estrutura de atividade válida.");
    }

    await this.saveActivity(parsed);
    return parsed;
  },

  /**
   * Restaura a atividade de demonstração padrão para o estado inicial
   */
  async resetToDemo() {
    const all = await this.getAllActivities();
    const filtered = all.filter(a => a.codigoAtividade !== "LOOP7K");
    filtered.push(JSON.parse(JSON.stringify(DEMO_ACTIVITY_SEED)));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return DEMO_ACTIVITY_SEED;
  }
};

window.StorageService = StorageService;
