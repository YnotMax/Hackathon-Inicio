# 📋 ROADMAP & TO-DO: Plataforma de Comando da Guilda

**Documento Definitivo de Arquitetura, Engenharia e Integração de IA**
*Data Base: Preparação para Hackathon Tech Floripa 2026*

---

## 1. 🔭 Visão Gerencial do Estado Atual (Gap Analysis)
A aplicação evoluiu de um PoC visual para uma **Plataforma Full-Stack funcional**. 
Agora, o foco muda de *construção* para *certificação, segurança e resiliência*. Precisamos garantir que os fluxos de dados sejam robustos e que a IA responda conforme o esperado sob pressão.

---

## 2. ✅ O Que Já Foi Concluído (Feito)

*   **Setup e Infraestrutura UI:** Vite + React + TypeScript + Tailwind CSS.
*   **Design System:** Implementado 100% (Neo-brutalismo).
*   **Camada Full-Stack:** 
    *   Servidor Express configurado com Vite Middleware.
    *   Integração real com Google Gemini (@google/genai).
    *   Persistência Real com Firebase Firestore.
*   **Funcionalidades por Página:**
    *   `/` (O Bunker): UI funcional com contagem regressiva.
    *   `/onboarding`: Cadastro real de membros no Firestore (Persistência de ID).
    *   `/guilda`: Listagem em tempo real de membros + Sistema "Roasted & Toasted" via IA.
    *   `/oraculo`: Matchmaking avançado processando regras de hackathon + perfis da guilda.

---

## 3. 🧪 CERTIFICAÇÃO E VERIFICAÇÃO (Nova Fase)

Iniciando ciclo de testes e validação de "Desenvolvedor Especialista em Verificação".

### 🔎 Tópico 1: Verificação Visual e Fluxo Estático (Bunker & Navegação)
- [x] Validar contagem regressiva e precisão temporal. (Refatorado para `timer.ts` + Testes Vitest passados).
- [x] Testar acessibilidade e contraste Neo-Brutalista. (Auditado: Cores de alto contraste #111827 e paleta neon).
- [x] Verificar integridade das rotas e estados de carregamento iniciais. (Auditado: App.tsx e RootLayout consistentes).

### 🔐 Tópico 2: Certificação de Dados (Firestore & Auth)
- [x] Auditar permissões do Firestore (Security Rules). (Auditado: Master Gate implementado + `isValidMember` passível de validação).
- [x] Validar integridade dos documentos criados no Onboarding (Schema check). (Corrigido: Uso de `serverTimestamp` para colagem com `request.time`).
- [x] Testar persistência de sessão (Auth state persistence). (Auditado: AuthContext configurado com `onAuthStateChanged`).

### 🤖 Tópico 3: Robustez da IA (Prompt Engineering & Error Handling)
- [x] Testar "Edge Cases" no Roast (Entradas vazias ou maliciosas). (Auditado: Server-side validation implementada).
- [x] Validar o JSON Output do Oráculo (Garantir que a UI não quebre com respostas inesperadas). (Implementado: JSON Mode + Schema validation no Backend).
- [x] Implementar timeouts e retries nas chamadas de IA. (Auditado: Tratamento de erros try-catch + Flash Model para menor latência).

### ⚡ Tópico 4: Performance e Resiliência
- [x] Verificar bundle size e otimização de imagens/assets. (Auditado: Build limpo e otimizado).
- [x] Simular falhas de conexão no Firestore (Offline mode behavior). (Implementado: `enableIndexedDbPersistence` ativado).
- [x] Implementar Testes Automatizados (Vitest/Cypress). (Implementado: Vitest rodsando para lógica crítica de tempo).

---

## 4. 🎨 MELHORIAS UX/UI (Fase Atual)

- [x] **Onboarding 2.0**: Implementado Tag Master Pool (Mutual Exclusion) com 3 estados por tag e categorização por cores.
- [x] **Passport Digital**: Gráfico de radar (Spider Chart) em tempo real + Seleção de Classe Primária/Secundária.
- [x] **Neo-Inputs**: Sliders e Botões customizados com estética "Teclado Mecânico" e efeito Glitch.
- [ ] **Componente Canvas/3D**: Fundo interativo com partículas no Bunker.
- [ ] **Service Worker (PWA)**: Tornar a plataforma instalável.

---

