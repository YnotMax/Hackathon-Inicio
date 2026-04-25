import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/roast", async (req, res) => {
  try {
    const { memberId, memberData } = req.body;
    if (!memberId || !memberData) return res.status(400).json({ error: "Missing memberId or memberData" });
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Aja como um tech lead sênior sarcástico, brutal e extremamente exigente no meio de um hackathon.
Analise as skills e os inputs deste membro. Critique sem dó suas piores habilidades, faça piada onde ele diz que "se garante", e traga realismo se os vetos ("nem fudendo") forem exatamente o que precisamos.
NÃO seja polido. Seja irônico e direto. Máximo de 3 parágrafos.
DADOS DO MEMBRO: \n${JSON.stringify(memberData, null, 2)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    const roastText = response.text;

    // Persist to DB using Admin SDK (Server-side bypasses rules)
    const { db: adminDb } = await import("../src/lib/firebase-admin");
    await adminDb.collection("members").doc(memberId).update({ roast: roastText });

    res.json({ roast: roastText });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/oraculo/match", async (req, res) => {
  try {
    const { challengeDesc, members } = req.body;
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `
Contexto do Hackathon Tech Floripa:
${challengeDesc}

Membros da Equipe:
${JSON.stringify(members, null, 2)}

Sua Tarefa (A Inteligência do Oráculo):
Gere três opções estratégicas de projetos para o hackathon:
1. Uma Escolha Segura (Viabilidade altíssima, risco baixo, foco no que a equipe domina).
2. Uma Escolha de Inovação (Viabilidade média, risco alto, usa as vontades/paixões da equipe em coisas novas).
3. A Carta na Manga / Surpresa (Baixa viabilidade, altíssimo risco operacional, inovação louca arrastando as pessoas pro limite).

IMPORTANTE: 
Para cada estratégia, indique o nível de "Match" com a equipe em porcentagem e liste precisamente quais membros estarão alocados nela (nunca aloque alguém no que eles deram 'veto').

Responda OBRIGATORIAMENTE em JSON no formato:
{
  "seguro": { "title": "STRING", "match": "NUMBER", "reason": "STRING", "allocation": "STRING", "viability": "STRING", "risk": "STRING", "banca": "STRING" },
  "inovacao": { "title": "STRING", "match": "NUMBER", "reason": "STRING", "allocation": "STRING", "viability": "STRING", "risk": "STRING", "banca": "STRING" },
  "surpresa": { "title": "STRING", "match": "NUMBER", "reason": "STRING", "allocation": "STRING", "viability": "STRING", "risk": "STRING", "banca": "STRING" }
}
Respond JSON and nothing else.`;

    const response = await ai.models.generateContent({ 
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    const responseText = response.text;
    
    try {
      const parsed = JSON.parse(responseText || "{}");
      if (!parsed.seguro || !parsed.inovacao || !parsed.surpresa) {
        throw new Error("Invalid schema from AI");
      }
      res.json(parsed);
    } catch (parseError) {
      console.error("AI JSON Parse Error:", responseText);
      res.status(500).json({ error: "O Oráculo alucinou um formato inválido. Tente novamente." });
    }
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

export default app;
