/**
 * educacaoComputacionalvalidador - Modelos e Lógica de Negócio da Atividade
 * 
 * Responsável por:
 * - Validação e estruturação de novas atividades criadas pelo professor
 * - Embaralhamento de questões e alternativas para novas tentativas do aluno
 * - Rastreamento preciso do índice correto ao embaralhar alternativas
 */

const AtividadeModule = {
  /**
   * Retorna um modelo padrão de atividade com 5 questões prontas para edição
   * @param {string} criadorNome 
   * @param {string} tema 
   * @returns {Object}
   */
  createDefaultActivityTemplate(criadorNome = "Batman", tema = "") {
    return {
      id: "ativ_" + Date.now().toString(36),
      codigoAtividade: UtilsModule.generateCode(6),
      codigoCriador: UtilsModule.generateCode(6),
      criador: {
        nome: criadorNome
      },
      tema: tema || "",
      descricao: "",
      objetivo: "",
      dataCriacao: new Date().toISOString(),
      questoes: [
        this.createEmptyQuestion(1, "Compreender"),
        this.createEmptyQuestion(2, "Aplicar"),
        this.createEmptyQuestion(3, "Analisar"),
        this.createEmptyQuestion(4, "Analisar"),
        this.createEmptyQuestion(5, "Avaliar")
      ],
      participantes: []
    };
  },

  /**
   * Cria uma estrutura vazia para uma questão individual
   * @param {number} id 
   * @param {string} defaultBloom 
   * @returns {Object}
   */
  createEmptyQuestion(id = 1, defaultBloom = "Compreender") {
    return {
      id: id,
      enunciado: "",
      alternativas: [
        "",
        "",
        "",
        ""
      ],
      respostaCorreta: 0,
      explicacao: "",
      dica: "",
      conceito: "",
      bloom: defaultBloom
    };
  },

  /**
   * Valida os dados de uma atividade antes de salvar
   * @param {Object} atividade 
   * @returns {Object} { isValid: boolean, errors: Array<string> }
   */
  validateActivity(atividade) {
    const errors = [];

    if (!atividade.criador || !atividade.criador.nome) {
      errors.push("Por favor, selecione o seu herói criador.");
    }

    if (!atividade.tema || atividade.tema.trim().length < 3) {
      errors.push("O tema da atividade deve possuir pelo menos 3 caracteres.");
    }

    if (!atividade.descricao || atividade.descricao.trim().length < 5) {
      errors.push("Por favor, forneça uma breve descrição da atividade.");
    }

    if (!atividade.objetivo || atividade.objetivo.trim().length < 5) {
      errors.push("Por favor, defina o objetivo pedagógico de aprendizagem.");
    }

    if (!Array.isArray(atividade.questoes) || atividade.questoes.length === 0) {
      errors.push("A atividade deve possuir pelo menos 1 questão cadastrada.");
    } else {
      atividade.questoes.forEach((q, idx) => {
        const num = idx + 1;
        if (!q.enunciado || q.enunciado.trim().length < 5) {
          errors.push(`Questão ${num}: Enunciado incompleto ou vazio.`);
        }

        if (!Array.isArray(q.alternativas) || q.alternativas.length !== 4) {
          errors.push(`Questão ${num}: Deve possuir exatamente 4 alternativas.`);
        } else {
          q.alternativas.forEach((alt, aIdx) => {
            if (!alt || alt.trim().length === 0) {
              errors.push(`Questão ${num}: A alternativa ${String.fromCharCode(65 + aIdx)} está em branco.`);
            }
          });
        }

        if (q.respostaCorreta === undefined || q.respostaCorreta < 0 || q.respostaCorreta > 3) {
          errors.push(`Questão ${num}: Selecione a alternativa correta (A, B, C ou D).`);
        }

        if (!q.explicacao || q.explicacao.trim().length < 5) {
          errors.push(`Questão ${num}: A explicação pedagógica da resposta é obrigatória.`);
        }

        if (!q.dica || q.dica.trim().length < 3) {
          errors.push(`Questão ${num}: Forneça uma dica formativa para orientar o estudante em caso de dúvida.`);
        }

        if (!q.conceito || q.conceito.trim().length < 2) {
          errors.push(`Questão ${num}: Informe o conceito computacional relacionado.`);
        }

        if (!q.bloom) {
          errors.push(`Questão ${num}: Selecione o nível da Taxonomia de Bloom.`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Prepara o conjunto de questões para uma tentativa do aluno.
   * Se for uma nova tentativa (retry), embaralha as questões e embaralha as 4 alternativas de cada questão,
   * recalculando com precisão o novo índice da alternativa correta.
   * 
   * @param {Object} atividade 
   * @param {boolean} shuffle Se deve embaralhar (padrão true para novas tentativas)
   * @returns {Array} Lista de questões preparadas para execução
   */
  prepareQuestionsForAttempt(atividade, shuffle = false) {
    if (!atividade || !Array.isArray(atividade.questoes)) return [];

    let questoes = atividade.questoes.map(q => {
      // Clona questão e prepara alternativas com mapeamento de índice original
      const alternativasMapeadas = q.alternativas.map((texto, originalIdx) => ({
        originalIndex: originalIdx,
        texto: texto,
        isCorreta: originalIdx === q.respostaCorreta
      }));

      // Se shuffle solicitado, embaralha as alternativas
      const alternativasFinais = shuffle 
        ? UtilsModule.shuffleArray(alternativasMapeadas) 
        : alternativasMapeadas;

      // Localiza onde ficou a resposta correta após o shuffle
      const novoIndiceCorreto = alternativasFinais.findIndex(alt => alt.isCorreta);

      return {
        id: q.id,
        enunciado: q.enunciado,
        conceito: q.conceito,
        bloom: q.bloom,
        explicacao: q.explicacao,
        dica: q.dica,
        alternativas: alternativasFinais.map(a => a.texto),
        respostaCorreta: novoIndiceCorreto,
        // Mantém referência do mapeamento interno para conferência
        _mapeamento: alternativasFinais
      };
    });

    if (shuffle) {
      questoes = UtilsModule.shuffleArray(questoes);
    }

    return questoes;
  }
};

window.AtividadeModule = AtividadeModule;
