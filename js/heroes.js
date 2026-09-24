/**
 * educacaoComputacionalvalidador - Lista e Helpers de Heróis e Heroínas
 * 
 * Contém mais de 50 heróis e heroínas equilibrados para turmas de 40+ estudantes e docentes.
 * Focado no anonimato pedagógico autêntico e sem poluição visual.
 */

const HEROES_LIST = [
  // Heroínas
  { nome: "Mulher-Maravilha", universo: "DC", genero: "F" },
  { nome: "Capitã Marvel", universo: "Marvel", genero: "F" },
  { nome: "Supergirl", universo: "DC", genero: "F" },
  { nome: "Viúva Negra", universo: "Marvel", genero: "F" },
  { nome: "Feiticeira Escarlate", universo: "Marvel", genero: "F" },
  { nome: "Tempestade", universo: "Marvel", genero: "F" },
  { nome: "Batgirl", universo: "DC", genero: "F" },
  { nome: "Mulher-Gato", universo: "DC", genero: "F" },
  { nome: "Ravena", universo: "DC", genero: "F" },
  { nome: "Estelar", universo: "DC", genero: "F" },
  { nome: "Jean Grey", universo: "Marvel", genero: "F" },
  { nome: "Vampira", universo: "Marvel", genero: "F" },
  { nome: "Jessica Jones", universo: "Marvel", genero: "F" },
  { nome: "Vespa", universo: "Marvel", genero: "F" },
  { nome: "Gamora", universo: "Marvel", genero: "F" },
  { nome: "Mulher-Hulk", universo: "Marvel", genero: "F" },
  { nome: "Zatanna", universo: "DC", genero: "F" },
  { nome: "Canário Negro", universo: "DC", genero: "F" },
  { nome: "Shuri", universo: "Marvel", genero: "F" },
  { nome: "Gwen-Aranha", universo: "Marvel", genero: "F" },
  { nome: "Kate Bishop", universo: "Marvel", genero: "F" },
  { nome: "Kamala Khan", universo: "Marvel", genero: "F" },
  { nome: "Mantis", universo: "Marvel", genero: "F" },
  { nome: "Mera", universo: "DC", genero: "F" },
  { nome: "Valquíria", universo: "Marvel", genero: "F" },
  { nome: "Elektra", universo: "Marvel", genero: "F" },
  { nome: "Mulher-Invisível", universo: "Marvel", genero: "F" },
  { nome: "Polaris", universo: "Marvel", genero: "F" },

  // Heróis
  { nome: "Batman", universo: "DC", genero: "M" },
  { nome: "Superman", universo: "DC", genero: "M" },
  { nome: "Homem-Aranha", universo: "Marvel", genero: "M" },
  { nome: "Homem de Ferro", universo: "Marvel", genero: "M" },
  { nome: "Capitão América", universo: "Marvel", genero: "M" },
  { nome: "Thor", universo: "Marvel", genero: "M" },
  { nome: "Hulk", universo: "Marvel", genero: "M" },
  { nome: "Flash", universo: "DC", genero: "M" },
  { nome: "Robin", universo: "DC", genero: "M" },
  { nome: "Aquaman", universo: "DC", genero: "M" },
  { nome: "Pantera Negra", universo: "Marvel", genero: "M" },
  { nome: "Doutor Estranho", universo: "Marvel", genero: "M" },
  { nome: "Arqueiro Verde", universo: "DC", genero: "M" },
  { nome: "Ciborgue", universo: "DC", genero: "M" },
  { nome: "Lanterna Verde", universo: "DC", genero: "M" },
  { nome: "Wolverine", universo: "Marvel", genero: "M" },
  { nome: "Demolidor", universo: "Marvel", genero: "M" },
  { nome: "Noturno", universo: "Marvel", genero: "M" },
  { nome: "Visão", universo: "Marvel", genero: "M" },
  { nome: "Falcão", universo: "Marvel", genero: "M" },
  { nome: "Soldado Invernal", universo: "Marvel", genero: "M" },
  { nome: "Senhor das Estrelas", universo: "Marvel", genero: "M" },
  { nome: "Homem-Formiga", universo: "Marvel", genero: "M" },
  { nome: "Máquina de Combate", universo: "Marvel", genero: "M" },
  { nome: "Gavião Arqueiro", universo: "Marvel", genero: "M" },
  { nome: "Shazam", universo: "DC", genero: "M" },
  { nome: "Besouro Azul", universo: "DC", genero: "M" },
  { nome: "Raio Negro", universo: "DC", genero: "M" },
  { nome: "Asa Noturna", universo: "DC", genero: "M" },
  { nome: "Constantine", universo: "DC", genero: "M" },
  { nome: "Motoqueiro Fantasma", universo: "Marvel", genero: "M" },
  { nome: "Namor", universo: "Marvel", genero: "M" },
  { nome: "Colossus", universo: "Marvel", genero: "M" },
  { nome: "Ciclope", universo: "Marvel", genero: "M" },
  { nome: "Senhor Fantástico", universo: "Marvel", genero: "M" }
];

/**
 * Retorna todos os heróis configurados
 */
function getHeroesList() {
  return [...HEROES_LIST];
}

/**
 * Busca detalhes de um herói pelo nome
 */
function getHeroDetails(nome) {
  const baseName = (nome || "").split("#")[0].trim();
  const hero = HEROES_LIST.find(h => h.nome.toLowerCase() === baseName.toLowerCase());
  return hero || { nome: nome || "Participante Anônimo", universo: "Educa", genero: "N" };
}

/**
 * Preenche um elemento <select> com os heróis disponíveis.
 * Se houver alunos concorrentes selecionando o mesmo herói, o sistema permite a seleção
 * e garante que cada um receba uma instância anônima individual (ex: Batman, Batman #2),
 * nunca travando a turma em sala de aula.
 * 
 * @param {HTMLSelectElement} selectEl - Elemento select
 * @param {Object} options - { atividade, currentHero, isCreator }
 */
function populateHeroSelect(selectEl, options = {}) {
  if (!selectEl) return;
  const { atividade, currentHero = "" } = options;

  // Mapa de contagem de heróis já em uso para fornecer feedback discreto
  const usageCountMap = {};
  if (atividade && Array.isArray(atividade.participantes)) {
    atividade.participantes.forEach(p => {
      const base = (p.heroiBase || p.nome || "").split("#")[0].trim().toLowerCase();
      usageCountMap[base] = (usageCountMap[base] || 0) + 1;
    });
  }

  selectEl.innerHTML = '<option value="">-- Selecione seu Codinome de Herói --</option>';

  // Agrupa em Heroínas e Heróis para organização limpa
  const optGroupF = document.createElement("optgroup");
  optGroupF.label = "Heroínas";

  const optGroupM = document.createElement("optgroup");
  optGroupM.label = "Heróis";

  HEROES_LIST.forEach(hero => {
    const opt = document.createElement("option");
    opt.value = hero.nome;

    const count = usageCountMap[hero.nome.toLowerCase()] || 0;
    if (count > 0) {
      opt.textContent = `${hero.nome} (${count} em atividade)`;
    } else {
      opt.textContent = hero.nome;
    }

    if (currentHero && (hero.nome.toLowerCase() === currentHero.toLowerCase() || currentHero.startsWith(hero.nome))) {
      opt.selected = true;
    }

    if (hero.genero === "F") {
      optGroupF.appendChild(opt);
    } else {
      optGroupM.appendChild(opt);
    }
  });

  selectEl.appendChild(optGroupF);
  selectEl.appendChild(optGroupM);
}

/**
 * Valida a disponibilidade do herói.
 * Em ambiente de sala de aula com múltiplos alunos conectados juntos,
 * o sistema permite a seleção mesmo se concorrente, gerando um codinome
 * anônimo sequencial seguro (ex: Homem-Aranha #2) na persistência.
 * 
 * @param {Object} atividade 
 * @param {string} heroName 
 * @returns {boolean} Sempre permite para não travar alunos em envio simultâneo
 */
function isHeroAvailable(atividade, heroName) {
  if (!heroName || !heroName.trim()) return false;
  return true;
}

// Exportação global
window.HeroesModule = {
  HEROES_LIST,
  getHeroesList,
  getHeroDetails,
  populateHeroSelect,
  isHeroAvailable
};
