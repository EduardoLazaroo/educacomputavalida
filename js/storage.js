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
  tema: "Laços de Repetição",
  descricao: "Desafio formativo sobre estruturas de repetição, contadores, condições de parada e laços aninhados em Computação.",
  objetivo: "Compreender e analisar estruturas de repetição (for e while), identificando condições de parada, contadores e avaliando laços aninhados.",
  dataCriacao: "2026-09-24T10:00:00.000Z",
  questoes: [
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
  ],
  participantes: []
};

const StorageService = {
  /**
   * Inicializa o repositório. Carrega dados do localStorage ou semeia a atividade limpa de teste.
   */
  async init() {
    try {
      const SEED_VERSION = "v2_clean_prod";
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
