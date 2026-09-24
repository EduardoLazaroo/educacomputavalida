/**
 * educacaoComputacionalvalidador - Módulo de Analíticos e Estatísticas Pedagógicas
 * 
 * Processa as tentativas e respostas dos alunos para gerar:
 * - Visão geral de participação e tentativas
 * - Distribuição de níveis de domínio formativo
 * - Desempenho percentual por questão
 * - Conceitos com maior índice de dificuldade (para orientar intervenção pedagógica)
 * - Análise de desempenho por nível cognitivo da Taxonomia de Bloom
 * - Tabela analítica individualizada por participante
 */

const AnalyticsModule = {
  /**
   * Processa todos os dados analíticos de uma atividade
   * @param {Object} atividade 
   * @returns {Object} Estatísticas compiladas
   */
  computeActivityAnalytics(atividade) {
    if (!atividade) return null;

    const participantes = atividade.participantes || [];
    const questoes = atividade.questoes || [];

    let totalTentativas = 0;
    const todasTentativas = [];

    // Coleta todas as tentativas
    participantes.forEach(p => {
      if (Array.isArray(p.tentativas)) {
        p.tentativas.forEach(t => {
          totalTentativas++;
          todasTentativas.push({
            participante: p.nome,
            ...t
          });
        });
      }
    });

    // 1. Distribuição de domínio baseada no melhor resultado de cada participante
    const distribuicaoDominio = {
      completo: 0,       // DOMÍNIO COMPLETO
      quaseLa: 0,         // QUASE LÁ
      desenvolvimento: 0, // EM DESENVOLVIMENTO
      praticar: 0,        // PRECISA PRATICAR
      recomecar: 0        // VAMOS TENTAR NOVAMENTE
    };

    let somaMelhoresPercentuais = 0;

    participantes.forEach(p => {
      if (!p.tentativas || p.tentativas.length === 0) return;
      
      // Encontrar a melhor tentativa do participante
      const melhorTentativa = p.tentativas.reduce((best, cur) => 
        (cur.percentual > best.percentual ? cur : best), p.tentativas[0]
      );

      somaMelhoresPercentuais += melhorTentativa.percentual;

      const label = melhorTentativa.classificacao || 
        UtilsModule.calculateMastery(melhorTentativa.acertos, melhorTentativa.total).label;

      if (label === "DOMÍNIO COMPLETO") distribuicaoDominio.completo++;
      else if (label === "QUASE LÁ") distribuicaoDominio.quaseLa++;
      else if (label === "EM DESENVOLVIMENTO") distribuicaoDominio.desenvolvimento++;
      else if (label === "PRECISA PRATICAR") distribuicaoDominio.praticar++;
      else distribuicaoDominio.recomecar++;
    });

    const mediaGeralTurma = participantes.length > 0 
      ? Math.round(somaMelhoresPercentuais / participantes.length) 
      : 0;

    // 2. Desempenho por Questão
    // Cria mapa por ID de questão
    const questaoStatsMap = {};
    questoes.forEach((q, idx) => {
      questaoStatsMap[q.id || (idx + 1)] = {
        id: q.id || (idx + 1),
        numero: idx + 1,
        enunciado: q.enunciado,
        conceito: q.conceito || "Geral",
        bloom: q.bloom || "Compreender",
        totalRespostas: 0,
        totalAcertos: 0,
        totalErros: 0,
        taxaAcerto: 0
      };
    });

    // Analisa cada resposta em cada tentativa
    todasTentativas.forEach(tentativa => {
      if (Array.isArray(tentativa.respostas)) {
        tentativa.respostas.forEach(resp => {
          const qId = resp.questaoId;
          const stat = questaoStatsMap[qId];
          if (stat) {
            stat.totalRespostas++;
            if (resp.correta) {
              stat.totalAcertos++;
            } else {
              stat.totalErros++;
            }
          }
        });
      }
    });

    // Calcula percentuais das questões
    const desempenhoQuestoes = Object.values(questaoStatsMap).map(stat => {
      const taxa = stat.totalRespostas > 0 
        ? Math.round((stat.totalAcertos / stat.totalRespostas) * 100) 
        : 0;
      return {
        ...stat,
        taxaAcerto: taxa
      };
    });

    // 3. Conceitos com Maior Dificuldade
    const conceitosMap = {};
    desempenhoQuestoes.forEach(q => {
      const conc = q.conceito || "Geral";
      if (!conceitosMap[conc]) {
        conceitosMap[conc] = {
          conceito: conc,
          totalQuestoes: 0,
          totalRespostas: 0,
          totalErros: 0,
          totalAcertos: 0
        };
      }
      conceitosMap[conc].totalQuestoes++;
      conceitosMap[conc].totalRespostas += q.totalRespostas;
      conceitosMap[conc].totalErros += q.totalErros;
      conceitosMap[conc].totalAcertos += q.totalAcertos;
    });

    const rankingDificuldade = Object.values(conceitosMap).map(c => {
      const taxaErro = c.totalRespostas > 0 
        ? Math.round((c.totalErros / c.totalRespostas) * 100) 
        : 0;
      const taxaAcerto = c.totalRespostas > 0 
        ? Math.round((c.totalAcertos / c.totalRespostas) * 100) 
        : 0;
      return {
        ...c,
        taxaErro,
        taxaAcerto
      };
    }).sort((a, b) => b.taxaErro - a.taxaErro); // Mais difíceis no topo

    // 4. Analíticos por Nível da Taxonomia de Bloom
    const bloomLevelsList = ["Lembrar", "Compreender", "Aplicar", "Analisar", "Avaliar"];
    const bloomStatsMap = {};

    bloomLevelsList.forEach(level => {
      bloomStatsMap[level] = {
        nivel: level,
        info: UtilsModule.getBloomInfo(level),
        totalRespostas: 0,
        totalAcertos: 0,
        totalQuestoesNaAtividade: 0,
        taxaAcerto: 0
      };
    });

    // Contar quantas questões de cada bloom existem na atividade
    questoes.forEach(q => {
      const bLevel = q.bloom || "Compreender";
      if (bloomStatsMap[bLevel]) {
        bloomStatsMap[bLevel].totalQuestoesNaAtividade++;
      }
    });

    // Contar acertos por Bloom em todas as tentativas
    desempenhoQuestoes.forEach(q => {
      const bLevel = q.bloom || "Compreender";
      if (bloomStatsMap[bLevel]) {
        bloomStatsMap[bLevel].totalRespostas += q.totalRespostas;
        bloomStatsMap[bLevel].totalAcertos += q.totalAcertos;
      }
    });

    const desempenhoBloom = bloomLevelsList.map(level => {
      const b = bloomStatsMap[level];
      const taxa = b.totalRespostas > 0 
        ? Math.round((b.totalAcertos / b.totalRespostas) * 100) 
        : (b.totalQuestoesNaAtividade > 0 ? 0 : null); // null se não houver questão desse nível
      return {
        ...b,
        taxaAcerto: taxa
      };
    });

    // 5. Tabela formatada de participantes
    const participantesTabela = participantes.map(p => {
      const tentativas = p.tentativas || [];
      const totalTentativasPart = tentativas.length;

      let melhorTentativa = null;
      let ultimaTentativa = null;

      if (totalTentativasPart > 0) {
        melhorTentativa = tentativas.reduce((best, cur) => 
          (cur.percentual > best.percentual ? cur : best), tentativas[0]
        );
        ultimaTentativa = tentativas[tentativas.length - 1];
      }

      const heroDetails = HeroesModule.getHeroDetails(p.heroiBase || p.nome);

      return {
        nome: p.nome,
        emoji: heroDetails?.emoji || (p.nome && (p.nome.includes("Mulher") || p.nome.includes("Girl")) ? "🦸‍♀️" : "🦸"),
        cor: heroDetails?.cor || "#06b6d4",
        totalTentativas: totalTentativasPart,
        melhorAcertos: melhorTentativa ? `${melhorTentativa.acertos}/${melhorTentativa.total}` : "-",
        melhorPercentual: melhorTentativa ? melhorTentativa.percentual : 0,
        ultimaClassificacao: ultimaTentativa 
          ? (ultimaTentativa.classificacao || UtilsModule.calculateMastery(ultimaTentativa.acertos, ultimaTentativa.total).label)
          : "Sem tentativas",
        dataEntrada: p.dataEntrada,
        ultimaData: ultimaTentativa ? ultimaTentativa.data : p.dataEntrada,
        tentativas: tentativas
      };
    });

    return {
      totalParticipantes: participantes.length,
      totalTentativas,
      mediaGeralTurma,
      distribuicaoDominio,
      desempenhoQuestoes,
      rankingDificuldade,
      desempenhoBloom,
      participantesTabela
    };
  }
};

window.AnalyticsModule = AnalyticsModule;
