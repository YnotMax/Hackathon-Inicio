# Especificações de Front-End: Plataforma de Comando da Guilda

Este documento é um guia de implementação ("Blueprint") para agentes de Front-End e UI/UX designers. Ele detalha a estrutura de páginas, componentes e regras estéticas para a plataforma de gestão de equipe do Hackathon Tech Floripa 2026.

---

## 1. Contexto do Projeto e Stack Tecnológica
*   **Objetivo:** Construir um "Bunker Digital" que servirá como painel de controle da equipe. Ele mapeará as competências dos membros e usará uma IA (no dia 27/06) para cruzar esses perfis com os desafios do evento e decidir o melhor projeto.
*   **Stack Sugerida:** Next.js (App Router), React, Tailwind CSS (para estilização rápida), Framer Motion ou GSAP (para animações pesadas) e Three.js (para o Hero de fundo).

---

## 2. Design System: A Estética Neo-Brutalista
O objetivo é que a plataforma **NÃO** pareça um template genérico feito por IA. Ela deve gritar "engenharia de software hardcore", com muita personalidade e ousadia.

*   **Paleta de Cores (Alto Contraste):**
    *   **Fundo Principal:** Off-White/Creme (`#F4F4F0`) ou Cinza Claro (`#E5E5E5`). Nunca branco puro.
    *   **Bordas e Textos:** Preto Absoluto (`#000000`).
    *   **Acentos (Cores Gritantes):**
        *   Amarelo Mostarda (`#FFC900`)
        *   Verde Limão/Menta (`#B8FF29`)
        *   Rosa Choque (`#FF2E93`)
        *   Ciano (`#00E5FF`)
*   **Tipografia:**
    *   **Títulos:** `Space Grotesk`, `Syne` ou `Archivo Black` (Maiúsculas, peso extra-bold, letter-spacing negativo).
    *   **Corpo de Texto:** `Inter` ou `DM Sans` (Legível, mas sempre contrastando fortemente com os títulos).
*   **A Regra Sagrada do Neo-Brutalismo:**
    *   Bordas sólidas de `2px` a `4px` em **absolutamente tudo** (botões, cards, modais).
    *   **Sombras Sólidas (Sem Blur):** Deslocamento no eixo X e Y (ex: `box-shadow: 6px 6px 0px 0px #000;`).
    *   **Interatividade Tátil:** Ao clicar (estado `:active`), o botão deve "afundar" (translacionar `x: 6px, y: 6px`) e perder a sombra, simulando um botão físico.
    *   Cantos pontiagudos (`rounded-none`) ou perfeitamente ovais (`rounded-full`), evite o padrão arredondado leve (`rounded-md`).

---

## 3. Mapeamento de Páginas (Wireframe Lógico)

Abaixo estão as especificações das páginas (Rotas) que precisam ser desenvolvidas.

### 📄 Página 1: O "Bunker" (Dashboard / Hero)
**A primeira impressão. Deve ser caótica, viva e altamente tecnológica.**
*   **Hero Section:** 
    *   **Fundo:** Um vídeo em loop (pode ser algo abstrato sobre logística, códigos, ou cyber-cidade).
    *   **Camada Interativa:** Elementos em Three.js (como partículas ou blocos 3D com física) que interagem sutilmente com o mouse do usuário.
    *   **Texto Central:** Tipografia gigantesca (ex: "SISTEMA DE SUPORTE A DECISÃO: ONLINE").
*   **Status do Hackathon:** Um relógio de contagem regressiva gigante e brutalista até o dia 27/06 (Kickoff).

### 📄 Página 2: Onboarding (O Mapeamento do Membro)
**Formulário onde a mágica dos dados acontece. Deve ser divertido de preencher.**
*   **Campos de Identidade:** Foto, Nome, Links (LinkedIn, GitHub).
*   **Sliders Geométricos:** Barras grossas para o membro definir seu nível (1 a 10) em: Frontend, Backend, UX, Dados, IA (Vibe Coding), Criação de Mídia.
*   **O "Team Canvas" (Inputs de Texto Grandes):**
    *   *Card 1 (Verde Limão):* "O que você ama fazer?" (Paixões).
    *   *Card 2 (Amarelo):* "Onde você se garante?" (Zona de Conforto).
    *   *Card 3 (Rosa Choque):* "Nem fudendo." (Veto Total - O que a pessoa não faria de jeito nenhum).

### 📄 Página 3: A Guilda (O Quartel General)
**Visualização da equipe já montada e perfil de cada um.**
*   **Layout:** Uma grade (Grid) de cartões gigantes e coloridos (estilo Bento Box, mas agressivo).
*   **Card do Membro:** Mostra foto, principais skills e as barras de nível.
*   **Botão "Ler minha Sina" (O Sistema Roasted & Toasted):** Um botão de ação primária em cada card. Ao clicar, abre um Modal estrondoso onde a IA exibe uma análise cômica, ácida e motivacional sobre as responsabilidades daquela pessoa (baseada nas skills dela).

### 📄 Página 4: O Oráculo (Painel do Dia D - 27/06)
**A página mais importante. Só deve ser "desbloqueada" no dia do evento.**
*   **Área de Input (RAG):** Um grande campo de texto (ou upload de markdown) onde alguém colará as Regras e os Desafios propostos pelo Hackathon (que a organização liberar no GitHub deles).
*   **Botão Mestre:** Um botão colossal escrito "CRUZAR DADOS E GERAR ESTRATÉGIA".
*   **Resultado (O Relatório de Match):** A tela transita para exibir 3 Cards Gigantes de Projetos:
    *   **Card 1 (A Escolha Segura - Ex: Logística com Android Embarcado).**
    *   **Card 2 (A Escolha de Risco - Inovação/IA).**
    *   **Card 3 (A Escolha Surpresa).**
    *   *Conteúdo Interno de cada Card:* Score de Match (%), Escopo para TRL3, Riscos mapeados, e a alocação exata de quem vai codar/fazer o que.

---

## 4. Animações e Comportamentos Desejados
*   **Entrada das Páginas:** Blocos caindo do topo ou deslizando agressivamente das laterais (framer-motion).
*   **Hover States:** Quando o mouse passa sobre os cards, eles devem inclinar levemente ou as bordas devem ficar ainda mais grossas, emitindo sons sutis se possível (para dar feedback).
*   **Loaders:** Esqueça o "spinner" girando. Use blocos empilhando ou mensagens textuais rápidas piscando tipo terminal ("Compilando vetos...", "Calculando o caos...", "Analisando fraquezas...").
