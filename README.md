# Hackathon Base Camp: Tech Floripa 2026

Um quartel-general inteligente e interativo construído para equipes de Hackathon. Este projeto serve como um hub central (Bunker) para mapear membros da equipe, acompanhar a linha do tempo, fazer "roast" das composições da equipe e usar IA para cruzar os desafios do hackathon com as habilidades reais da equipe para gerar estratégias vencedoras.

Estilizado em uma linguagem de design **Neo-Brutalista** marcante e com alta energia.

## 🚀 Módulos Principais

### 1. 🛡️ Bunker \_ (Linha do Tempo / Dashboard)
O principal "Centro de Comando" oferecendo uma visão geral em tempo real:
- **Contagem Regressiva da Operação:** Acompanha o tempo até o início ("kickoff") ou prazo final.
- **Linha do Tempo Tática:** Linha do tempo alternada mapeando as fases (Prontidão, Kickoff, Dev, Pitch) com marcadores de status, subtarefas, logs de servidor e galerias modais de imagens/vídeos carregadas de forma segura via Firebase.
- **Sinais Vitais e Telemetria:** Indicadores visuais do BPM do Squad, estabilidade de APIs e alertas ativos.

### 2. 🪪 Integração \_ (Mapeamento de Membros)
Uma porta de entrada segura para os membros registrarem seus papéis táticos.
- **Autenticação:** Integração do Google OAuth utilizando o Firebase.
- **Seleção de Papéis:** Classes principais e secundárias (Frontend, Backend, AI Master, etc).
- **Calibração de Arsenal:** Um seletor de "Amo/Conforto/Veto" estilo Tinder para stacks de tecnologia para mapear a compatibilidade técnica do mundo real dentro da equipe.
- **Radar de Identidade:** Gera um gráfico de aranha (spider chart) em tempo real destacando o polígono de habilidades (Frontend, UX, DB, Hardware, Vibe Coding).

### 3. 👥 A Guilda \_ (Hub da Equipe)
Uma lista mostrando cada membro ativo do squad sincronizado em tempo real.
- Exibe os "passaportes" de operadores únicos.
- Mostra as principais habilidades, funções e links para contas do GitHub/LinkedIn conectadas.
- **Mestre Roast:** Uma função com inteligência artificial que fatia (brutal e ludicamente) as escolhas de tecnologia e o ratio de habilidades de membros, definindo com exatidão a sua "persona" da equipe. 

### 4. 🔮 O Oráculo \_ (Estrategista de IA)
O diferencial deste acampamento base.
- O Oráculo usa o conceito de **Geração Aumentada de Recuperação (RAG)** através da API Gemini.
- **Entrada:** Cole as regras, desafios e bounties oficiais do evento.
- **Processamento:** O sistema cruza o desafio contra os dados dinâmicos das _habilidades mapeadas, zonas de conforto e as restrições (vetos)_ vindos das fichas dos membros na seção Guilda.
- **Saída:** Três estratégias únicas e distintas são detalhadas e geradas.
  - **Opção 1 (A Escolha Segura):** Alto matching rate, baixo risco, garantir um MVP funcional voltado para a zona atual de conforto da equipe.
  - **Opção 2 (Inovação):** Risco médio-alto e alta recompensa tecnológica / impacto agressivo contra problemas locais.
  - **Opção 3 (A Carta na Manga):** Elemento surpresa e "hackeio" puro de lógicas propostas.
  
(Isto dá estimativas e indicies alvos aos juri visando a maximização e qual membro focar em dada funcionalidade de código e apresentação).

## 💻 Stack Tecnológica & Arquitetura

- **Frontend:** React 19, TypeScript, Vite
- **Estilo:** Tailwind CSS V4 (Tipografia Neo-Brutalista, Lime, Rosa/Cyan, borders duplos marcadas)
- **Animações:** `motion/react` para animações fluidas estruturais. 
- **Ícones & Gráficos:** Lucide React, Recharts (Radar / Spider charts)
- **Backend / BaaS:** Firebase Firestore (Persistência noSQL), Firebase Auth
- **AI Core:** Google Gemini SDK (`@google/genai`) para pareamento de inteligências estratégicas.
- **Build System:** ESM pronta pra deploy (Via Vite & Express).

## 🔧 Como Rodar Localmente

Siga estas instruções para colocar seu Bunker no ar na sua máquina local.

**1. Clone o repositório**
```bash
git clone <url-do-repositorio>
cd <nome-da-pasta>
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as Variáveis de Ambiente da API AI (Gemini)**
- Crie um arquivo `.env` na raiz do seu projeto (pode copiar/renomear `.env.example`).
- Adicione a sua chave da API do Google Gemini:
```env
GEMINI_API_KEY="SUA-CHAVE-AQUI"
```

## 🗄️ Configuração do Banco de Dados (Firebase)

Este projeto usa Firebase Auth (Google) para autenticação e Firestore (NoSQL) para salvar perfis e telemetria.

**Modo 1: Usando as configurações predefinidas**
Se o projeto já possui o arquivo `firebase-applet-config.json` ou as configurações em variáveis de ambiente, nenhuma configuração extra deve ser necessária — a Firebase está hospedada.

**Modo 2: Configurando o seu próprio Banco Firebase (Para Deploy próprio)**
1. Crie um projeto em `console.firebase.google.com`.
2. Em Firestore Database, **Crie um banco de dados**.
3. Em Authentication, habilite o provider **Google**.
4. Crie um app para Web nas configurações de seu projeto no Firebase.
5. Copie suas chaves para o arquivo `firebase-applet-config.json` na raiz da source.
   Exemplo da estrutura:
   ```json
   {
      "apiKey": "SUA_API_KEY",
      "authDomain": "seu-app.firebaseapp.com",
      "projectId": "seu-app",
      "storageBucket": "seu-app.appspot.com",
      "messagingSenderId": "0000000000",
      "appId": "1:000000000:web:01234abcd",
      "firestoreDatabaseId": "(default)"
   }
   ```

**Regras de Firestore:**
Para garantir integridade e que o App rode como local, adicione o seguinte aos `Security Rules` do Firestore, ou edite os arquivos de rules existentes (`firestore.rules`):
```javascript
rules_version = '2';
match /databases/{database}/documents {
  match /{document=**} {
    // Estas regras são flexíveis para ambiente local/hackathon fast test.
    // Em produção real, você deve reforçar com roles e matchings de request.auth.uid!
    allow read, write: if request.auth != null; 
  }
}
```

**4. Inicie o Servidor Dev**
```bash
npm run dev
```
O projeto estará rodando no endereço listado pelo servidor Express/Vite (normalmente em `http://localhost:3000`).

## 🔒 Segurança

Este acampamento base adere a regras de segurança RLS (Row Level Security) pelo Firebase para manter o rastreamento das sub-missões da _A Guilda_. Interceptores verificam cada update contra injeção de esquemas.

_(Criado Exclusivamente Para Missão Tech Floripa 2026)_
