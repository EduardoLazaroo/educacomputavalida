# educaComputaValida (educacaoComputacionalvalidador)
### Validador Formativo de Aprendizagem em Computação

> **Princípio Central:**  
> *"Não basta dizer ao estudante se ele acertou ou errou. É necessário utilizar o resultado para identificar o que ele aprendeu, o que ainda precisa compreender e oferecer uma oportunidade para tentar novamente."*

O **educaComputaValida** é uma aplicação web moderna, responsiva e completa voltada para a avaliação formativa contínua em Educação em Computação. Permite que professores criem desafios conceituais baseados na **Taxonomia de Bloom**, gerem códigos fáceis de compartilhar com a turma e acompanhem analíticos detalhados de desempenho, enquanto os estudantes recebem feedback imediato, identificam lacunas de aprendizagem e realizam novas tentativas com questões e alternativas reembaralhadas.

---

## 🚀 Tecnologias Utilizadas

- **HTML5 Semântico:** Acessibilidade, organização estrutural e SEO.
- **CSS3 Puro (Vanilla CSS):** Design system tecnológico, variáveis CSS (tokens), responsividade mobile-first, micro-animações suaves e visual dark acadêmico.
- **JavaScript Puro (Vanilla JS):** Modularizado em camadas (Single Page Application - SPA) sem frameworks pesados como React, Vue ou Angular.
- **Armazenamento em JSON:** Cada atividade é armazenada como um objeto JSON estruturado e autônomo.
- **Repository Pattern (StorageService):** Abstrai o armazenamento local (`localStorage`) via Promises, permitindo que a camada seja substituída futuramente por uma API REST e banco de dados real sem reescrever a interface.
- **Pronto para Vercel:** Deploy estático sem necessidade de servidores backend dedicados.

---

## 🌟 Principais1. **Sem Telas Tradicionais de Login:**
   - O professor cria a atividade e o sistema gera automaticamente dois códigos curtos e sem caracteres ambíguos:
      - **Código da Atividade** (ex: `PYT801`): compartilhado publicamente com os alunos.
      - **Código do Criador** (ex: `ADM801`): chave administrativa restrita do professor.
2. **Seleção de Nomes por Heróis e Heroínas Anônimos:**
   - Nomes selecionados a partir de um `<select>` com mais de 60 heróis e heroínas da cultura pop.
   - Suporte a múltiplos participantes com o mesmo herói simultâneo com desambiguação automática (`#2`, `#3`), preservando o anonimato individual.
3. **5 Questões com Taxonomia de Bloom:**
   - Classificação cognitiva estruturada: *Lembrar, Compreender, Aplicar, Analisar, Avaliar*.
   - Cada questão contém enunciado com suporte a blocos de código formatados, 4 alternativas, explicação da resposta correta, dica formativa e conceito computacional relacionado.
4. **Feedback Imediato e Construtivo:**
   - Feedback sem linguagem punitiva.
   - Em caso de acerto: reforço positivo com explicação conceitual.
   - Em caso de erro: dica formativa e conceito a ser trabalhado.
5. **Diagnóstico Formativo em Vez de Simples Nota:**
   - Níveis de domínio:
     - **5/5:** DOMÍNIO COMPLETO
     - **4/5:** QUASE LÁ
     - **3/5:** EM DESENVOLVIMENTO
     - **2/5:** PRECISA PRATICAR
     - **0-1/5:** VAMOS TENTAR NOVAMENTE
   - Listagem clara de **Conceitos Dominados** vs **Conceitos para Revisar**.
6. **Múltiplas Tentativas com Reembaralhamento Dinâmico:**
   - Ao clicar em *"Tentar Novamente"*, a ordem das questões e a posição das 4 alternativas são embaralhadas (com mapeamento matemático do novo índice correto).
   - O histórico de evolução de cada aluno é registrado tentativa por tentativa.
7. **Painel Analítico do Professor & Temas Dark/Light:**
   - Métricas globais (Participantes, Tentativas, Média, Domínio Completo).
   - Desempenho por Taxonomia de Bloom (identificação dos níveis com maior defasagem).
   - Desempenho por Questão (% de acerto individual).
   - Tabela individualizada de participantes com visualização detalhada de tentativas.
   - Alternância contínua entre Modo Escuro e Modo Claro com persistência local.ização detalhada de tentativas.
   - Editor em tempo real e exportação/importação de JSON.

---

## 📚 Atividade Padrão Inicial (Laços de Repetição em Python)

O sistema disponibiliza inicialmente uma atividade formativa completa com as seguintes credenciais de acesso:

| Campo | Valor |
|---|---|
| **Tema** | Laços de Repetição em Python |
| **Código da Atividade (Aluno)** | `PYT801` |
| **Código do Criador (Admin)** | `ADM801` |
| **Criador** | Prof. Computação |
| **Questões** | 5 questões sobre `for`, `while`, listas (índice 0), `range()` e prevenção de loop infinito |

---

## 📁 Estrutura de Arquivos

```text
educacomputa/
├── index.html              # Aplicação SPA e marcação semântica
├── vercel.json             # Configuração otimizada para deploy no Vercel
├── README.md               # Documentação técnica e pedagógica
├── css/
│   ├── style.css           # Design tokens, tipografia e layout base
│   ├── components.css      # Botões, cards, badges, quizzes, analíticos e tabelas
│   └── animations.css      # Micro-animações suaves e transições
├── js/
│   ├── heroes.js           # Lista pré-definida de heróis e validação de disponibilidade
│   ├── utils.js            # Gerador de códigos, cálculos de Bloom, formatação e toasts
│   ├── storage.js          # Repositório de persistência JSON / localStorage
│   ├── analytics.js        # Cálculo de métricas, Bloom, dificuldades e histórico
│   ├── atividade.js        # Modelos, validação e embaralhamento com rastreio de índices
│   ├── professor.js        # Fluxo de criação, editor de questões e dashboard administrativo
│   ├── aluno.js            # Fluxo do desafio, feedback formativo e diagnóstico
│   └── app.js              # Roteador SPA, listeners globais e inicialização
└── data/
    └── atividades.json     # Backup inicial e estrutura modelo da atividade
```

---

## 💻 1. Como Executar Localmente

Como a aplicação é 100% estática (Vanilla JS + HTML5 + CSS3), não há compilação ou build pesado.

### Opção A: Usando Node.js (Recomendado)

Você pode iniciar um servidor estático local instantaneamente com `npx serve`:

```bash
# Na raiz do projeto:
npx -y serve ./
```

Abra o navegador no endereço exibido (geralmente `http://localhost:3000`).

### Opção B: Usando Python 3

```bash
# Na raiz do projeto:
python -m http.server 8000
```

Abra `http://localhost:8000` no seu navegador.

### Opção C: Abrir Diretamente no Navegador

Basta dar um duplo clique no arquivo `index.html` ou abri-lo em qualquer navegador moderno. A aplicação conta com fallback automático para carregamento dos dados mesmo sob o protocolo `file://`.

---

## 🧪 2. Roteiro de Testes dos Fluxos

### Testando o Fluxo do Aluno:
1. Acesse a aplicação e clique em **[ Participar ]** na barra de navegação.
2. Digite o código da atividade (ex: `PYT801` ou o código de uma atividade criada) e clique em **Verificar**.
3. O sistema carregará a prévia da atividade e listará os heróis e heroínas disponíveis.
4. Escolha um codinome (ex: *Mulher-Maravilha*, *Tempestade*, *Pantera Negra*, *Homem-Aranha*, etc.).
5. Clique em **[ Iniciar Desafio de Aprendizagem ]**.
6. Responda às questões conceituais:
   - Observe o feedback imediato formativo após clicar em **[ Responder Questão ]**.
   - Note as dicas construtivas e os conceitos em caso de erro, com suporte a blocos de código formatados.
7. Na tela final de resultado:
   - Verifique o diagnóstico pedagógico por domínio de aprendizagem (ex: *Domínio Completo*, *Quase Lá*).
   - Analise a distinção entre *Conceitos Dominados* e *Conceitos para Revisar*.
   - Clique em **[ Tentar Novamente ]** para ver as questões e alternativas reembaralhadas, registrando uma nova tentativa independente no seu histórico!

### Testando o Fluxo do Criador / Professor:
1. Clique em **[ Área do Criador ]** na barra de navegação.
2. Digite a chave administrativa (ex: `ADM801` ou a chave de uma atividade criada).
3. Clique em **[ Acessar Painel da Atividade ]**:
   - Acompanhe analíticos por nível da Taxonomia de Bloom (*Lembrar*, *Compreender*, *Aplicar*, *Analisar*, *Avaliar*).
   - Visualize a taxa de acerto por questão e o ranking de dificuldade conceitual.
   - Consulte a tabela de participantes anônimos e inspecione as tentativas detalhadas de cada aluno.
4. Alterne para a aba **[ Editar Atividade ]** para alterar enunciados, explicações ou adicionar novas questões em tempo real.
5. Use a alternância de tema no topo para alternar confortavelmente entre **Modo Escuro** e **Modo Claro**.

### Testando a Criação de Nova Atividade:
1. Clique em **[ Criar Atividade ]** na barra de navegação.
2. Escolha seu codinome docente e informe tema, descrição e objetivos.
3. Se desejar preencher um modelo prévio, clique em **[ Preencher Exemplo Didático ]** ou elabore manualmente suas 5 questões com taxonomia de Bloom.
4. Clique em **[ Gerar Códigos e Criar Atividade ]**.
5. Copie os códigos gerados (Código do Aluno e Chave do Criador) e realize o teste!

---

## 🌐 3. Como Publicar no Vercel

O projeto já inclui o arquivo `vercel.json` configurado.

### Método 1: Via Vercel CLI (Rápido pelo Terminal)

Se possuir o Vercel CLI instalado:

```bash
# Na pasta do projeto:
npm i -g vercel
vercel
```

Siga as instruções padrão na tela (escolha as opções padrão para projeto estático).

### Método 2: Via GitHub / Dashboard do Vercel

1. Suba este repositório para o seu GitHub (ou GitLab/Bitbucket).
2. Acesse [vercel.com](https://vercel.com) e faça login.
3. Clique em **"Add New..."** ➔ **"Project"**.
4. Selecione o repositório `educacomputa`.
5. No campo **Framework Preset**, selecione **Other**.
6. Como é um projeto estático em Vanilla JS, deixe **Build Command** e **Output Directory** em branco (ou default `./`).
7. Clique em **Deploy**.
8. Sua aplicação estará no ar com HTTPS e CDN global!

---

## 📜 Licença e Propósito Educacional

Desenvolvido com foco no avanço da **Educação em Computação**, avaliação formativa autêntica e autonomia discente.
