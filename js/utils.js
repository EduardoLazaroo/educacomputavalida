/**
 * educacaoComputacionalvalidador - Utilitários Gerais
 * Funções auxiliares para geração de códigos seguros, formatação de código,
 * categorização pedagógica de Bloom e feedback visual.
 */

// Conjunto de caracteres não ambíguos para códigos (sem O, 0, I, 1, S, 5)
const SAFE_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/**
 * Gera um código curto, legível e seguro contra ambiguidades
 * @param {number} length Comprimento do código (padrão: 6)
 * @returns {string} Código gerado (ex: PYT801, X7K9P2)
 */
function generateCode(length = 6) {
  let result = "";
  const charsLength = SAFE_CODE_CHARS.length;
  for (let i = 0; i < length; i++) {
    result += SAFE_CODE_CHARS.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}

/**
 * Embaralha uma cópia de um array utilizando o algoritmo de Fisher-Yates
 * @param {Array} array 
 * @returns {Array} Novo array embaralhado
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Calcula a classificação pedagógica e dados formativos de domínio
 * @param {number} acertos 
 * @param {number} total 
 * @returns {Object} { percentual, label, badgeClass, cor, descricao }
 */
function calculateMastery(acertos, total) {
  if (!total || total <= 0) {
    return {
      acertos: 0,
      total: 0,
      percentual: 0,
      label: "SEM DADOS",
      badgeClass: "badge-neutral",
      cor: "#64748b",
      descricao: "Nenhuma questão respondida ainda."
    };
  }

  const percentual = Math.round((acertos / total) * 100);

  if (acertos === total) {
    return {
      acertos,
      total,
      percentual,
      label: "DOMÍNIO COMPLETO",
      badgeClass: "badge-mastery-complete",
      cor: "#10b981", // verde esmeralda
      descricao: "Excelente! Você consolidou com sucesso todos os conceitos avaliados nesta atividade."
    };
  } else if (acertos === total - 1 && total >= 3) {
    return {
      acertos,
      total,
      percentual,
      label: "QUASE LÁ",
      badgeClass: "badge-mastery-almost",
      cor: "#06b6d4", // ciano vibrante
      descricao: "Muito bom desempenho! Revise os detalhes conceituais apontados abaixo para alcançar o domínio completo."
    };
  } else if (percentual >= 50) {
    return {
      acertos,
      total,
      percentual,
      label: "EM DESENVOLVIMENTO",
      badgeClass: "badge-mastery-developing",
      cor: "#f59e0b", // âmbar
      descricao: "Você já compreende aspectos fundamentais, mas alguns conceitos críticos ainda demandam consolidação."
    };
  } else if (acertos >= 2) {
    return {
      acertos,
      total,
      percentual,
      label: "PRECISA PRATICAR",
      badgeClass: "badge-mastery-practice",
      cor: "#f97316", // laranja
      descricao: "Identificamos lacunas conceituais importantes. Releia atentamente as explicações e realize uma nova tentativa."
    };
  } else {
    return {
      acertos,
      total,
      percentual,
      label: "VAMOS TENTAR NOVAMENTE",
      badgeClass: "badge-mastery-retry",
      cor: "#ef4444", // vermelho coral suave
      descricao: "O erro faz parte do aprendizado! Analise as dicas de cada questão para construir sua compreensão e tente de novo."
    };
  }
}

/**
 * Níveis da Taxonomia de Bloom suportados
 */
const BLOOM_LEVELS = {
  "Lembrar": {
    nome: "Lembrar",
    cor: "#3b82f6",
    fundo: "rgba(59, 130, 246, 0.15)",
    descricao: "Reconhecer e recordar fatos, termos e conceitos básicos de computação."
  },
  "Compreender": {
    nome: "Compreender",
    cor: "#06b6d4",
    fundo: "rgba(6, 182, 212, 0.15)",
    descricao: "Explicar ideias, sintetizar significados e interpretar algoritmos."
  },
  "Aplicar": {
    nome: "Aplicar",
    cor: "#10b981",
    fundo: "rgba(16, 185, 129, 0.15)",
    descricao: "Executar ou usar procedimentos em situações dadas e testes de mesa."
  },
  "Analisar": {
    nome: "Analisar",
    cor: "#f59e0b",
    fundo: "rgba(245, 158, 11, 0.15)",
    descricao: "Distinguir partes, examinar interações, laços, condições e encontrar comportamentos lógicos."
  },
  "Avaliar": {
    nome: "Avaliar",
    cor: "#8b5cf6",
    fundo: "rgba(139, 92, 246, 0.15)",
    descricao: "Fazer julgamentos com base em critérios, estimar número de operações e criticar algoritmos."
  }
};

/**
 * Retorna as informações do nível Bloom
 */
function getBloomInfo(bloomName) {
  return BLOOM_LEVELS[bloomName] || {
    nome: bloomName || "Geral",
    cor: "#64748b",
    fundo: "rgba(100, 116, 139, 0.15)",
    descricao: "Habilidade cognitiva avaliada"
  };
}

/**
 * Converte blocos de código markdown (```javascript ... ```) e inline (`code`) para HTML estilizado
 * @param {string} text 
 * @returns {string} HTML sanitizado com blocos de código
 */
function formatMarkdownCode(text) {
  if (!text) return "";

  // 1. Escapar caracteres HTML básicos primeiro para segurança
  let safe = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Substituir blocos de código com ```lang? ... ```
  safe = safe.replace(/```([a-zA-Z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<div class="code-block-wrapper"><div class="code-block-header"><span>${lang || 'código'}</span><button class="btn-copy-code" type="button" onclick="UtilsModule.copyCodeBlock(this)">Copiar</button></div><pre><code class="code-block language-${lang || 'plaintext'}">${code.trim()}</code></pre></div>`;
  });

  // 3. Substituir inline `code`
  safe = safe.replace(/`([^`]+)`/g, '<code class="code-inline">$1</code>');

  // 4. Substituir quebras de linha fora de pre/code por <br> se não forem múltiplas
  // Apenas preservando parágrafos simples
  const parts = safe.split(/(<div class="code-block-wrapper">[\s\S]*?<\/div>)/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<div class="code-block-wrapper">')) {
      parts[i] = parts[i].replace(/\n\n/g, '<p class="mt-2"></p>').replace(/\n/g, '<br>');
    }
  }

  return parts.join("");
}

/**
 * Copia texto do bloco de código
 */
function copyCodeBlock(btn) {
  const wrapper = btn.closest(".code-block-wrapper");
  if (!wrapper) return;
  const codeEl = wrapper.querySelector("code");
  if (!codeEl) return;
  const text = codeEl.innerText;
  copyToClipboard(text, btn, "Copiado!");
}

/**
 * Copia texto para a área de transferência com feedback visual no botão
 * @param {string} text 
 * @param {HTMLElement} btnElement 
 * @param {string} feedbackMessage 
 */
async function copyToClipboard(text, btnElement, feedbackMessage = "Copiado!") {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback para navegadores legados ou contextos não-seguros
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    showToast(`Código copiado com sucesso: "${text}"`, "success");

    if (btnElement) {
      const originalText = btnElement.innerHTML;
      btnElement.innerHTML = `✓ ${feedbackMessage}`;
      btnElement.classList.add("btn-copied");
      setTimeout(() => {
        btnElement.innerHTML = originalText;
        btnElement.classList.remove("btn-copied");
      }, 2000);
    }
  } catch (err) {
    console.error("Erro ao copiar texto:", err);
    showToast("Não foi possível copiar automaticamente.", "warning");
  }
}

/**
 * Exibe notificação flutuante (Toast)
 * @param {string} message 
 * @param {string} type 'success' | 'warning' | 'error' | 'info'
 * @param {number} duration Milissegundos
 */
function showToast(message, type = "info", duration = 3500) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type} animate-fade-in-up`;
  
  const icon = {
    success: "✓",
    warning: "⚠️",
    error: "✕",
    info: "ℹ️"
  }[type] || "ℹ️";

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-fade-out");
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 400);
  }, duration);
}

/**
 * Formata data ISO para exibição amigável em pt-BR
 */
function formatDate(isoString) {
  if (!isoString) return "-";
  try {
    const d = new Date(isoString);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return isoString;
  }
}

// Exportação global
window.UtilsModule = {
  SAFE_CODE_CHARS,
  generateCode,
  shuffleArray,
  calculateMastery,
  BLOOM_LEVELS,
  getBloomInfo,
  formatMarkdownCode,
  copyCodeBlock,
  copyToClipboard,
  showToast,
  formatDate
};
