# Visão da Plataforma: Painel de Comando da Guilda (Hackathon 2026)

Este documento detalha a arquitetura, o design e a lógica de inteligência artificial da plataforma central que servirá como o "cérebro" da equipe durante o Hackathon Tech Floripa 2026.

---

## 1. O Conceito: A "Bunker" Digital
A plataforma não é apenas um site de apresentação, mas uma ferramenta de suporte à decisão e gestão de talentos. Ela une a identidade visual da equipe, o mapeamento de competências e um Agente de IA Estratégico.

---

## 2. Experiência do Usuário (UI/UX) - Estilo Neubrutalist
Para fugir da estética comum de "IA genérica", a plataforma utilizará o **Neo-Brutalismo**.

*   **Impacto Visual:**
    *   **Hero Section:** Vídeo de fundo em loop com elementos interativos (Three.js) se movendo sobre a tela.
    *   **Cores Gritantes:** Uso de Neon Green, Cyan, e Hot Pink com fundo Off-White/Grey.
    *   **Bordas e Sombras:** Bordas pretas sólidas (4px) e sombras rígidas sem desfoque.
*   **Engagement:** Menus agressivos, tipografia gigante e micro-interações táteis que fazem o usuário querer explorar cada card.

---

## 3. Arquitetura de Dados: O Mapeamento de Talentos
A plataforma terá um banco de dados para separar perfis e reunir as seguintes informações de cada membro:

*   **Identidade Digital:** LinkedIn, Portfólio, Repositórios GitHub relevantes.
*   **Hard Skills:** Nível em Frontend, Backend, Dados, Hardware.
*   **Vibe Coding & Criatividade:** Habilidades em IA Generativa, criação de fotos/vídeos, automação de código.
*   **Team Canvas (JSON Estuturado):**
    *   `paixoes`: O que o membro ama fazer (ex: "Criar prompts complexos").
    *   `vetos`: O que o membro odeia/não faria (ex: "Configurar servidores DNS").
    *   `zona_conforto`: Tarefas seguras mas não empolgantes.

---

## 4. O Agente de IA Estratégico (O Cérebro do Dia D)
O coração da plataforma é um Agente de IA que entra em ação no dia 27/06 (Kickoff).

### Mecanismo de Funcionamento:
1.  **Ingestão via RAG (Retrieval-Augmented Generation):** O agente lê os Markdowns do GitHub oficial do evento (regras e novos desafios).
2.  **Cruzamento de Dados:** A IA processa os JSONs de todos os membros da equipe simultaneamente.
3.  **Cálculo de Match:** O sistema avalia o risco e a viabilidade de cada desafio baseado nas skills e vetos do time.

### O "Relatório de Match" (Prompt Mestre):
A IA gera 3 cards gigantes com caminhos possíveis:
*   **Caminho Seguro (High Score):** Projetos que utilizam o "porto seguro" do time (ex: Logística + Android).
*   **Caminho de Inovação (Mid Score):** Projetos que envolvem as paixões do time (IA/Vibe Coding), mesmo com riscos técnicos.
*   **Caminho Surpresa:** Uma solução fora da caixa baseada em skills subutilizadas.

---

## 5. Fator Moral: O Sistema "Roasted & Toasted"
Para manter o clima leve e a moral alta, a IA gera análises personalizadas com humor ácido:

*   **Botão "Ler minha Sina":** Cada membro recebe uma descrição gerada por IA sobre seu papel no desafio escolhido.
*   **Tom de Voz:** Direto, irônico e motivador (estilo Neo-Brutalista).
    *   *Exemplo:* "Você diz que ama IA, então agora prove. Enquanto o resto do time resolve o banco de dados, você tem 4 horas para fazer essa interface conversar com o hardware sem incendiar a sala. Mãos à obra."

---

## 6. Objetivo Técnico Final
Entregar um **Protótipo TRL3** em 28 dias com o menor atrito humano possível, utilizando a IA para orquestrar quem faz o quê, quando e por quê, garantindo que ninguém esteja fazendo algo que "vetou" ou odeia.

---
*Este documento serve como guia de desenvolvimento para a plataforma de comando. O foco é transformar dados humanos em estratégia vencedora.*
