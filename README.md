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

## 🌟 Principais Recursos e Diferenciais Pedagógicos

1. **Sem Telas Tradicionais de Login:**
   - O professor cria a atividade e o sistema gera automaticamente dois códigos curtos e sem caracteres ambíguos:
     - **Código da Atividade** (ex: `LOOP7K`): compartilhado publicamente com os alunos.
     - **Código do Criador** (ex: `ADMIN7`): chave administrativa restrita do professor.
2. **Seleção de Nomes por Heróis com Validação de Exclusividade:**
   - Nomes selecionados a partir de um `<select>` pré-definido (Batman, Superman, Homem-Aranha, Mulher-Maravilha, etc.).
   - Dois alunos **não** podem escolher o mesmo herói na mesma atividade. O sistema valida e avisa: *"Esse herói já está participando desta atividade. Escolha outro."*
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
7. **Painel Analítico do Professor:**
   - Métricas globais (Participantes, Tentativas, Média, Domínio Completo).
   - Desempenho por Taxonomia de Bloom (identificação dos níveis com maior defasagem).
   - Desempenho por Questão (% de acerto individual).
   - Ranking de Conceitos com Maior Dificuldade.
   - Tabela individualizada de participantes com visualização detalhada de tentativas.
   - Editor em tempo real e exportação/importação de JSON.

---

## ⚡ Atividade de Demonstração Pré-Configurada

Para testes imediatos, o sistema já vem com a seguinte atividade semeada:

| Campo | Valor |
|---|---|
| **Tema** | Laços de Repetição |
| **Código da Atividade (Aluno)** | `LOOP7K` |
| **Código do Criador (Admin)** | `ADMIN7` |
| **Criador** | Batman |
| **Questões** | 5 questões sobre `for`, `while`, condições de parada, contadores e laços aninhados |
| **Dados Prévios** | Participantes de teste simulando histórico real para análise de métricas |

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
1. Acesse a aplicação e clique no botão **[ ⚡ Demo LOOP7K ]** ou clique em **[ PARTICIPAR DE UMA ATIVIDADE ]**.
2. Digite o código `LOOP7K` e clique em **Verificar**.
3. O sistema carregará a prévia da atividade e filtrará a lista de heróis.
4. Escolha um herói livre (ex: *Thor*, *Hulk*, *Flash*, *Supergirl*, etc.).
5. Clique em **[ Iniciar Desafio de Aprendizagem ]**.
6. Responda às 5 questões:
   - Observe o feedback imediato após clicar em **[ Responder Questão ]**.
   - Note as dicas construtivas e os conceitos em caso de erro.
7. Na tela final de resultado:
   - Verifique a classificação (ex: *Quase Lá*, *Domínio Completo*).
   - Analise os *Conceitos Dominados* vs *Conceitos para Revisar*.
   - Clique em **[ Tentar Novamente ]** para ver as questões e alternativas reembaralhadas, registrando uma nova tentativa no seu histórico!

### Testando o Fluxo do Criador / Professor:
1. Clique em **[ ÁREA DO CRIADOR ]** no menu superior.
2. Digite a chave administrativa `ADMIN7` (ou clique no atalho para preencher).
3. Clique em **[ Acessar Painel ]**:
   - Visualize a taxa de acerto por nível da Taxonomia de Bloom (*Compreender*, *Aplicar*, *Analisar*, *Avaliar*).
   - Veja o ranking dos conceitos com maior dificuldade.
   - Veja a tabela de participantes e clique em **[ Ver Tentativas ]** para inspecionar cada resposta de um aluno.
4. Vá para a aba **[ Editar Atividade ]** para alterar enunciados, explicações ou adicionar novas questões.
5. Vá para a aba **[ Exportar & Backup JSON ]** para baixar ou copiar o JSON completo da atividade.

### Testando a Criação de Nova Atividade:
1. Clique em **[ CRIAR ATIVIDADE ]**.
2. Escolha seu herói criador (ex: *Batman* ou *Superman*).
3. Clique em **[ Preencher Exemplo Didático ]** para testar rapidamente com uma atividade pré-formatada de *Condicionais e Controle de Fluxo*, ou digite suas próprias 5 questões.
4. Clique em **[ Gerar Códigos e Criar Atividade ]**.
5. Copie os dois códigos gerados e teste ambos imediatamente!

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
