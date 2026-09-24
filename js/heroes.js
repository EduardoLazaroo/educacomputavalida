/**
 * educacaoComputacionalvalidador - Lista e Helpers de Heróis e Heroínas
 * 
 * Contém mais de 60 heróis e heroínas equilibrados para turmas de 40+ estudantes e docentes.
 * Focado no anonimato pedagógico autêntico, cada herói possui seu emoji temático.
 */

const HEROES_LIST = [
  // Heroínas
  { nome: "Mulher-Maravilha", emoji: "👑", universo: "DC", genero: "F" },
  { nome: "Capitã Marvel", emoji: "⭐", universo: "Marvel", genero: "F" },
  { nome: "Supergirl", emoji: "🦸‍♀️", universo: "DC", genero: "F" },
  { nome: "Viúva Negra", emoji: "🕷️", universo: "Marvel", genero: "F" },
  { nome: "Feiticeira Escarlate", emoji: "🔮", universo: "Marvel", genero: "F" },
  { nome: "Tempestade", emoji: "⚡", universo: "Marvel", genero: "F" },
  { nome: "Batgirl", emoji: "🦇", universo: "DC", genero: "F" },
  { nome: "Mulher-Gato", emoji: "🐱", universo: "DC", genero: "F" },
  { nome: "Ravena", emoji: "🌙", universo: "DC", genero: "F" },
  { nome: "Estelar", emoji: "✨", universo: "DC", genero: "F" },
  { nome: "Jean Grey", emoji: "🔥", universo: "Marvel", genero: "F" },
  { nome: "Vampira", emoji: "🧤", universo: "Marvel", genero: "F" },
  { nome: "Jessica Jones", emoji: "🕵️‍♀️", universo: "Marvel", genero: "F" },
  { nome: "Vespa", emoji: "🐝", universo: "Marvel", genero: "F" },
  { nome: "Gamora", emoji: "🗡️", universo: "Marvel", genero: "F" },
  { nome: "Mulher-Hulk", emoji: "💚", universo: "Marvel", genero: "F" },
  { nome: "Zatanna", emoji: "🎩", universo: "DC", genero: "F" },
  { nome: "Canário Negro", emoji: "🎵", universo: "DC", genero: "F" },
  { nome: "Shuri", emoji: "🐾", universo: "Marvel", genero: "F" },
  { nome: "Gwen-Aranha", emoji: "🕸️", universo: "Marvel", genero: "F" },
  { nome: "Kate Bishop", emoji: "🏹", universo: "Marvel", genero: "F" },
  { nome: "Kamala Khan", emoji: "⚡", universo: "Marvel", genero: "F" },
  { nome: "Mantis", emoji: "🌿", universo: "Marvel", genero: "F" },
  { nome: "Mera", emoji: "🌊", universo: "DC", genero: "F" },
  { nome: "Valquíria", emoji: "🛡️", universo: "Marvel", genero: "F" },
  { nome: "Elektra", emoji: "⚔️", universo: "Marvel", genero: "F" },
  { nome: "Mulher-Invisível", emoji: "💫", universo: "Marvel", genero: "F" },
  { nome: "Polaris", emoji: "🧲", universo: "Marvel", genero: "F" },

  // Heróis
  { nome: "Batman", emoji: "🦇", universo: "DC", genero: "M" },
  { nome: "Superman", emoji: "🦸‍♂️", universo: "DC", genero: "M" },
  { nome: "Homem-Aranha", emoji: "🕷️", universo: "Marvel", genero: "M" },
  { nome: "Homem de Ferro", emoji: "🤖", universo: "Marvel", genero: "M" },
  { nome: "Capitão América", emoji: "🛡️", universo: "Marvel", genero: "M" },
  { nome: "Thor", emoji: "🔨", universo: "Marvel", genero: "M" },
  { nome: "Hulk", emoji: "🟢", universo: "Marvel", genero: "M" },
  { nome: "Flash", emoji: "⚡", universo: "DC", genero: "M" },
  { nome: "Robin", emoji: "🎭", universo: "DC", genero: "M" },
  { nome: "Aquaman", emoji: "🔱", universo: "DC", genero: "M" },
  { nome: "Pantera Negra", emoji: "🐾", universo: "Marvel", genero: "M" },
  { nome: "Doutor Estranho", emoji: "👁️", universo: "Marvel", genero: "M" },
  { nome: "Arqueiro Verde", emoji: "🏹", universo: "DC", genero: "M" },
  { nome: "Ciborgue", emoji: "🦾", universo: "DC", genero: "M" },
  { nome: "Lanterna Verde", emoji: "💍", universo: "DC", genero: "M" },
  { nome: "Wolverine", emoji: "🐺", universo: "Marvel", genero: "M" },
  { nome: "Demolidor", emoji: "🦯", universo: "Marvel", genero: "M" },
  { nome: "Noturno", emoji: "💨", universo: "Marvel", genero: "M" },
  { nome: "Visão", emoji: "💎", universo: "Marvel", genero: "M" },
  { nome: "Falcão", emoji: "🦅", universo: "Marvel", genero: "M" },
  { nome: "Soldado Invernal", emoji: "🦾", universo: "Marvel", genero: "M" },
  { nome: "Senhor das Estrelas", emoji: "🚀", universo: "Marvel", genero: "M" },
  { nome: "Homem-Formiga", emoji: "🐜", universo: "Marvel", genero: "M" },
  { nome: "Máquina de Combate", emoji: "🛡️", universo: "Marvel", genero: "M" },
  { nome: "Gavião Arqueiro", emoji: "🏹", universo: "Marvel", genero: "M" },
  { nome: "Shazam", emoji: "⚡", universo: "DC", genero: "M" },
  { nome: "Besouro Azul", emoji: "🪲", universo: "DC", genero: "M" },
  { nome: "Raio Negro", emoji: "⚡", universo: "DC", genero: "M" },
  { nome: "Asa Noturna", emoji: "🎭", universo: "DC", genero: "M" },
  { nome: "Constantine", emoji: "🧥", universo: "DC", genero: "M" },
  { nome: "Motoqueiro Fantasma", emoji: "🔥", universo: "Marvel", genero: "M" },
  { nome: "Namor", emoji: "🌊", universo: "Marvel", genero: "M" },
  { nome: "Colossus", emoji: "🛡️", universo: "Marvel", genero: "M" },
  { nome: "Ciclope", emoji: "🕶️", universo: "Marvel", genero: "M" },
  { nome: "Senhor Fantástico", emoji: "🔬", universo: "Marvel", genero: "M" }
];

/**
 * Retorna todos os heróis configurados
 */
function getHeroesList() {
  return [...HEROES_LIST];
}

/**
 * Busca detalhes de um herói pelo nome com garantia de emoji válido
 */
function getHeroDetails(nome) {
  if (!nome) {
    return { nome: "Participante Anônimo", emoji: "🦸", universo: "Educa", genero: "N" };
  }
  const baseName = nome.split("#")[0].trim();
  const hero = HEROES_LIST.find(h => h.nome.toLowerCase() === baseName.toLowerCase());
  if (hero) {
    return {
      ...hero,
      emoji: hero.emoji || (hero.genero === "F" ? "🦸‍♀️" : "🦸‍♂️")
    };
  }
  const isFemale = nome.toLowerCase().includes("mulher") || nome.toLowerCase().includes("girl");
  return {
    nome: nome,
    emoji: isFemale ? "🦸‍♀️" : "🦸‍♂️",
    universo: "Educa",
    genero: isFemale ? "F" : "M"
  };
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
      opt.textContent = `${hero.emoji} ${hero.nome} (${count} em atividade)`;
    } else {
      opt.textContent = `${hero.emoji} ${hero.nome}`;
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
