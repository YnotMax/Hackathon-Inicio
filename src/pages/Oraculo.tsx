import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function Oraculo() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [challenge, setChallenge] = useState("");
  const [results, setResults] = useState<any>(null);

  // Sync members
  const [members, setMembers] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "members"), where("guildId", "==", "TECH_FLORIPA_2026"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMembers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [user]);

  const handleAnalyze = async () => {
    if (!challenge) {
      alert("Insira os dados do desafio antes de invocar o oráculo.");
      return;
    }
    if (members.length === 0) {
      alert("A Guilda está vazia. Cadastre-se primeiro.");
      return;
    }

    setAnalyzing(true);
    setLoaderText("Iniciando RAG e processamento cerebral...");
    
    try {
      const res = await fetch("/api/oraculo/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          challengeDesc: challenge,
          members: members.map(m => ({ name: m.name, skills: m.skills, canvas: m.canvas }))
        })
      });

      setLoaderText("Recebendo telemetria...");
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);

      setResults(data);
      setShowResults(true);
    } catch(err: any) {
      alert("Ocorreu um erro ao invocar o oráculo: " + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto py-12 px-6 flex flex-col min-h-[calc(100vh-100px)]"
    >
      <div className="mb-10 text-center">
        <h1 className="text-5xl md:text-8xl font-heading mb-4 text-neo-black uppercase tracking-tighter mix-blend-color-burn">O Oráculo_</h1>
        <p className="text-2xl font-bold uppercase border-y-4 border-neo-black py-2 md:w-max mx-auto shadow-[4px_4px_0_0_#000] bg-neo-cyan px-4">
          Data do Match: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>

      {!showResults ? (
        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
          <Card variant="white" className="flex-1 flex flex-col p-2 space-y-2 relative">
             <div className="bg-neo-black text-white px-4 py-2 font-heading font-bold flex justify-between">
                <span>INSERIR_DADOS_DO_DESAFIO (RAG)</span>
                <span className="text-neo-lime blur-[1px]">SYSTEM ROOT</span>
             </div>
             <textarea 
               value={challenge}
               onChange={(e) => setChallenge(e.target.value)}
               className="flex-1 w-full bg-neo-bg font-mono p-6 font-bold text-lg resize-none outline-none neo-border border-dashed focus:border-solid hover:bg-white transition-colors"
               placeholder="> Cole aqui os desafios oficiais, patrocínios e regras do Hackathon Tech Floripa via GitHub.
> O Cérebro da Guilda vai processar..."
             ></textarea>
             
             {analyzing && (
                <div className="absolute inset-0 bg-neo-black/90 p-12 flex flex-col items-center justify-center text-center">
                   <div className="w-32 h-32 border-[16px] border-neo-black border-t-neo-lime rounded-full animate-spin mb-8" />
                   <h2 className="text-4xl font-heading text-white uppercase animate-pulse">{loaderText}</h2>
                </div>
             )}
          </Card>
          
          <div className="mt-8">
            <Button 
               size="xl" 
               variant="primary" 
               className="w-full bg-black text-neo-lime text-3xl font-black group h-24 hover:bg-neo-black overflow-hidden relative"
               onClick={handleAnalyze}
               disabled={analyzing}
            >
               <span className="relative z-10 transition-transform group-hover:scale-110 inline-block">CRUZAR DADOS E GERAR ESTRATÉGIA</span>
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMiLz4KPC9zdmc+')] opacity-20"></div>
            </Button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4"
        >
          {/* Card 1: Seguro */}
          {results?.seguro && (
            <Card variant="lime" className="flex flex-col">
              <div className="bg-neo-black text-neo-lime font-heading px-4 py-2 border-b-4 border-neo-black flex justify-between">
                <span>OPÇÃO 1_</span>
                <span className="font-sans font-bold">MATCH: {results.seguro.match}%</span>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <h2 className="text-4xl font-heading font-black leading-tight uppercase">{results.seguro.title}</h2>
                <div className="bg-white neo-border p-4 font-bold text-sm">
                  <span className="opacity-60 text-xs block mb-1">A Escolha Segura</span>
                  {results.seguro.reason}
                </div>
                <ul className="space-y-2 font-bold text-sm">
                  <li><span className="text-neo-black">▶ Viabilidade TRL3:</span> {results.seguro.viability}</li>
                  <li><span className="text-neo-black">▶ Risco Técnico:</span> {results.seguro.risk}</li>
                  <li><span className="text-neo-black">▶ Banca alvo:</span> {results.seguro.banca}</li>
                </ul>
              </div>
              <div className="p-4 bg-white border-t-8 border-black">
                <p className="font-heading uppercase text-xs break-words">Alocação: {results.seguro.allocation}</p>
              </div>
            </Card>
          )}

          {/* Card 2: Inovacao */}
          {results?.inovacao && (
            <Card variant="pink" className="flex flex-col relative top-0 lg:-top-8">
              <div className="bg-white text-neo-pink font-heading px-4 py-2 border-b-4 border-neo-black flex justify-between">
                <span>OPÇÃO 2_</span>
                <span className="font-sans font-bold text-neo-black">MATCH: {results.inovacao.match}%</span>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <h2 className="text-4xl font-heading font-black leading-tight uppercase text-white">{results.inovacao.title}</h2>
                <div className="bg-neo-black/20 neo-border p-4 font-bold text-sm text-white">
                  <span className="opacity-80 text-xs block mb-1">Inovador e Difícil</span>
                  {results.inovacao.reason}
                </div>
                <ul className="space-y-2 font-bold text-sm opacity-90">
                  <li><span className="text-white">▶ Viabilidade TRL3:</span> {results.inovacao.viability}</li>
                  <li><span className="text-white">▶ Risco Técnico:</span> {results.inovacao.risk}</li>
                  <li><span className="text-white">▶ Banca alvo:</span> {results.inovacao.banca}</li>
                </ul>
              </div>
               <div className="p-4 bg-neo-black border-t-8 border-white text-white">
                <p className="font-heading uppercase text-xs break-words">Alocação: {results.inovacao.allocation}</p>
              </div>
            </Card>
          )}

          {/* Card 3: Surpresa */}
          {results?.surpresa && (
            <Card variant="yellow" className="flex flex-col">
              <div className="bg-neo-black text-neo-yellow font-heading px-4 py-2 border-b-4 border-black flex justify-between">
                <span>OPÇÃO 3_</span>
                <span className="font-sans font-bold">MATCH: {results.surpresa.match}%</span>
              </div>
              <div className="p-8 space-y-6 flex-1">
                <h2 className="text-4xl font-heading font-black leading-tight uppercase">{results.surpresa.title}</h2>
                <div className="bg-white neo-border p-4 font-bold text-sm">
                  <span className="opacity-60 text-xs block mb-1">A Carta na Manga</span>
                  {results.surpresa.reason}
                </div>
                <ul className="space-y-2 font-bold text-sm">
                  <li><span className="text-neo-black">▶ Viabilidade TRL3:</span> {results.surpresa.viability}</li>
                  <li><span className="text-neo-black">▶ Risco Operacional:</span> {results.surpresa.risk}</li>
                  <li><span className="text-neo-black">▶ Banca alvo:</span> {results.surpresa.banca}</li>
                </ul>
              </div>
               <div className="p-4 bg-white border-t-8 border-black">
                <p className="font-heading uppercase text-xs break-words">Alocação: {results.surpresa.allocation}</p>
              </div>
            </Card>
          )}

        </motion.div>
      )}
    </motion.div>
  );
}
