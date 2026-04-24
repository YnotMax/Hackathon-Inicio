# Hackathon Base Camp: Tech Floripa 2026

An intelligent, interactive headquarters built for Hackathon teams. This project serves as a central hub (Bunker) to map team members, track the timeline, roast team compositions, and use AI to cross-reference hackathon challenges with the team's actual skills to generate winning strategies.

Styled in a distinctive, high-energy **Neo-Brutalist** design language.

## 🚀 Core Modules

### 1. 🛡️ Bunker \_ (Timeline / Dashboard)

The main "Command Center" providing a real-time overview:

- **Operation Countdown:** Tracks time until kickoff or deadline.
- **Tactical Timeline:** Alternating timeline tracking phases (Prontidão, Kickoff, Dev, Pitch) with status markers, subtasks, server logs, and image/video modal galleries securely loaded via Firebase.
- **Vitals & Telemetry:** Visual indicators for Squad BPM, APIs usage stability, and active alerts.

### 2. 🪪 Onboarding \_ (Member Mapping)

A secure gateway for team members to register their specific tactical roles.

- **Authentication:** Google Auth integration via Firebase.
- **Role Selection:** Primary and secondary classes (Frontend, Backend, AI Master, etc).
- **Arsenal Calibration:** A Tinder-like "Loves/Comforts/Vetos" selector for tech stacks to map real-world tech compatibility within the team.
- **Identity Radar:** Generates a real-time spider chart outlining a member's skill polygon (Frontend, UX, DB, Hardware, Vibe Coding).

### 3. 👥 A Guilda \_ (Team Hub)

A roster showing every active squad member synced in real-time.

- Displays unique operator passports.
- Shows synced top skills, roles, and connected GitHub/LinkedIn profiles.
- **Mestre Roast:** An AI-powered function that brutally (and playfully) analyzes a member's tech choices and skill ratios, pinpointing their exact persona on the team.

### 4. 🔮 O Oráculo \_ (AI Strategist)

The defining feature of this basecamp.

- The Oráculo uses **Retrieval-Augmented Generation (RAG) concepts** via the Gemini API.
- **Input:** Paste the official hackathon challenges, rules, and sponsor bounties.
- **Processing:** The system cross-references the challenge against the real, live data of the team's _mapped skills, comfort zones, and vetos_ from the Guilda.
- **Output:** Three distinct strategies are generated:
  - **Opção 1 (A Escolha Segura):** High match rate, low risk, guaranteed TRL3 delivery based on existing team comfort zones.
  - **Opção 2 (Inovação):** Medium-high risk, high reward. A bold take on the challenge.
  - **Opção 3 (A Carta na Manga):** The surprise element, wildcard strategy.

Provides specific target juries, risk metrics, and suggests how to allocate specific team members for each strategy.

## 💻 Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS V4 (Neo-Brutalist design tokens: lime, pink, cyan, yellow, thick borders, sharp shadows)
- **Animations:** `motion/react` for smooth layout transitions and micro-interactions
- **Icons & Charts:** Lucide React, Recharts (Radar / Spider charts)
- **Backend / BaaS:** Express SSR (dev server), Firebase Firestore (Real-time NoSQL persistence), Firebase Auth
- **AI Core:** Google Gemini SDK (`@google/genai`) for real-time strategy matching and member "roasting"
- **Build System:** Production-ready ESM compilation

## 🔧 Local Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your environment variables in `.env` (requires `GEMINI_API_KEY` for the Oráculo / Roast endpoints and Firebase Config if running standalone).
4. Start the dev server:
   ```bash
   npm run dev
   ```

## 🔒 Firebase Security

This project uses highly constrained Firebase Security rules to enforce data integrity across the `members` and `posts` collections. Document writes adhere strictly to defined schema validations preventing data poisoning.

_(Built exclusively for Hackathon Tech Floripa 2026)_
