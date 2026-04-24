import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { calculateTimeLeft } from "../utils/timer";
import { Clock, Server, Users, Radio, Zap, Presentation, Code, Plus, CheckCircle, AlertTriangle, Activity, MapPin, Trophy } from "lucide-react";
import { PostModal, PostData } from "../components/ui/PostModal";
import { useAuth } from "../contexts/AuthContext";

export type TimelineEvent = PostData & {
  status: string;
  tasks: string[];
  log: string;
  icon: any;
};

const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: "phase1",
    phase: "PHASE_01",
    title: "PRONTIDÃO",
    status: "EM ANDAMENTO",
    tasks: ["TEAM CANVAS: COMPLETO", "RAG ANALYSIS: PROCESSANDO"],
    log: "> LOG: INICIANDO SINCRONIZAÇÃO DE PERFIS...\n> ESTADO: 87% OPERACIONAL",
    icon: Zap,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=800&q=80",
        description: "Foto horizontal: Equipe em prontidão. Todos os sistemas iniciais online e operacionais."
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&h=1200&q=80",
        description: "Foto vertical: Foco no código e infraestrutura do servidor."
      },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Vídeo: Teste de stream de vídeo de alinhamento."
      }
    ]
  },
  {
    id: "phase2",
    phase: "PHASE_02",
    title: "KICKOFF & MATCHMAKING",
    // @ts-ignore
    status: "AGUARDANDO",
    tasks: [],
    log: "",
    icon: Users,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1200&q=80",
        description: "Palco principal sendo preparado para o grande kickoff do Hackathon."
      }
    ]
  },
  {
    id: "phase3",
    phase: "PHASE_03",
    title: "DESENVOLVIMENTO TÁTICO",
    // @ts-ignore
    status: "AGUARDANDO",
    tasks: [],
    log: "",
    icon: Code,
    media: []
  },
  {
    id: "phase4",
    phase: "PHASE_04",
    title: "PITCH & ENTREGA",
    // @ts-ignore
    status: "AGUARDANDO",
    tasks: [],
    log: "",
    icon: Presentation,
    media: []
  }
];

export default function Bunker() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft("2026-06-27T00:00:00"));
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft("2026-06-27T00:00:00"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-neo-bg">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative w-full pt-16"> {/* Removed sidebar, expanded main */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Box */}
          <div className="bg-neo-pink neo-border neo-shadow p-6 md:p-10 relative overflow-hidden">
             {/* Decorative Rocket/Shape */}
             <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 3.86-12A2 2 0 0 1 15 4a22 22 0 0 1 12 3.86l-3 3"></path><path d="m14 11 3 3"></path><path d="m11 14-3-3"></path><path d="m9 9 3 3"></path></svg>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight uppercase relative z-10">
               OPERAÇÃO HACKATHON TECH FLORIPA - VISÃO GERAL
             </h1>
          </div>

          {/* Countdown & Status Row */}
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 bg-white neo-border neo-shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-100 italic font-mono text-[8px] bg-neo-lime border-b-2 border-l-2 border-neo-black">
                ENCRYPTED_STREAM_ON
              </div>
              <div className="font-mono space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neo-pink animate-pulse" />
                  <p className="font-black text-sm">TEMPO_RESTANTE_PARA_MATCHMAKING</p>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-bold bg-neo-bg p-1 inline-block">Aguardando gatilho de início da fase 02</p>
              </div>
              <div className="flex items-center gap-2 md:gap-4 font-heading font-black text-5xl md:text-7xl">
                <div className="bg-neo-lime neo-border px-4 py-2 min-w-[90px] text-center flex flex-col relative">
                  <span>{timeLeft.days.toString().padStart(2, '0')}</span>
                  <span className="font-sans font-bold text-[10px] text-center absolute -bottom-6 left-0 right-0">DIAS</span>
                </div>
                <span>:</span>
                <div className="bg-white neo-border px-4 py-2 min-w-[90px] text-center flex flex-col relative">
                  <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="font-sans font-bold text-[10px] text-center absolute -bottom-6 left-0 right-0">HORAS</span>
                </div>
                <span>:</span>
                <div className="bg-neo-pink text-white neo-border px-4 py-2 min-w-[90px] text-center flex flex-col relative overflow-hidden">
                  <motion.div
                    key={timeLeft.minutes}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="relative z-10"
                  >
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </motion.div>
                  <span className="font-sans font-bold text-[10px] text-center absolute -bottom-6 left-0 right-0 text-black">MINUTOS</span>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-64 bg-neo-cyan neo-border neo-shadow p-6 flex flex-col items-center justify-center text-center gap-1 group">
               <Zap className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
               <p className="font-mono text-[10px] uppercase font-bold text-gray-700">PRÓXIMO_GATILHO</p>
               <h3 className="font-heading font-black text-3xl">FASE 02</h3>
               <div className="w-full border-t-2 border-neo-black mt-2 pt-2 space-y-2">
                 <p className="font-mono text-[10px] uppercase font-bold">27/Jun &bull; 00:00</p>
                 <Button size="sm" className="w-full text-[9px] font-black neo-border h-8 bg-neo-black text-white hover:bg-white hover:text-neo-black">VER_BRIEFING</Button>
               </div>
            </div>
          </div>

          {/* Vertical Alternating Timeline */}
          <div className="relative py-12 md:py-24">
             {/* Center Line for Desktop, Left Line for Mobile */}
             <div className="absolute top-0 bottom-0 left-[32px] md:left-1/2 md:-ml-[3px] w-[6px] bg-neo-black z-0"></div>

             <div className="space-y-12 md:space-y-0">
               {TIMELINE_DATA.map((item, index) => {
                 const isCompleted = item.status === "EM ANDAMENTO" || item.status === "CONCLUÍDO";
                 const Icon = item.icon;
                 const isEven = index % 2 === 0;
                 
                 return (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     key={item.id} 
                     className="relative flex flex-col md:flex-row items-center w-full md:mb-16 last:mb-0"
                   >
                     {/* Timeline Node */}
                     <div className="absolute left-[35px] -ml-[24px] md:left-1/2 md:-ml-[32px] z-10 top-0 md:top-1/2 md:-translate-y-1/2">
                        <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center neo-border ${isCompleted ? 'bg-neo-lime' : 'bg-white'} border-[3px]`}>
                           <Icon className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                     </div>

                     {/* Spacer Left for alternating layout on desktop */}
                     {!isEven && <div className="hidden md:block w-1/2" />}

                     {/* Content Card container */}
                     <div className={`w-full pl-[90px] md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 flex md:justify-end' : 'md:pl-16 flex md:justify-start'}`}>
                        <div className={`
                          w-full bg-white neo-border p-6 md:p-8 relative transition-all duration-200 cursor-pointer group text-left
                          ${isCompleted ? 'neo-shadow hover:neo-shadow-hover hover:-translate-y-1' : 'opacity-80 grayscale hover:grayscale-0 hover:opacity-100'}
                        `} onClick={() => setSelectedPost(item)}>
                           
                           {/* Decorative Tab pointing to the line */}
                           {isCompleted && (
                             isEven ? (
                               <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-10 bg-neo-lime border-[3px] border-l-0 border-neo-black hidden md:block" />
                             ) : (
                               <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-10 bg-neo-lime border-[3px] border-r-0 border-neo-black hidden md:block" />
                             )
                           )}
                           
                           <div className="flex justify-between items-start mb-4">
                              <span className={`font-mono text-xs font-bold px-3 py-1 border-[2px] border-neo-black ${isCompleted ? 'bg-neo-lime text-black' : 'bg-neo-black text-white'}`}>
                                {item.phase}
                              </span>
                              <span className={`text-[10px] font-bold font-mono px-2 py-1 rounded-full ${item.status === 'EM ANDAMENTO' ? 'bg-neo-pink text-white flex items-center gap-1 border border-black' : 'text-gray-500'}`}>
                                {item.status === 'EM ANDAMENTO' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                                {item.status}
                              </span>
                           </div>

                           <h3 className={`font-heading font-black text-2xl md:text-3xl mb-4 ${!isCompleted && 'text-gray-400'}`}>{item.title}</h3>

                           {item.tasks && item.tasks.length > 0 && (
                             <ul className="space-y-2 mb-4">
                               {item.tasks.map((task, i) => (
                                 <li key={i} className="flex items-start gap-2 font-mono text-xs font-bold uppercase">
                                   <CheckCircle className="w-4 h-4 text-neo-lime mt-0.5 shrink-0" />
                                   {task}
                                 </li>
                               ))}
                             </ul>
                           )}

                           {item.log && (
                             <div className="bg-neo-bg border-[2px] border-dashed border-neo-black p-3 font-mono text-[10px] text-gray-700 whitespace-pre-line uppercase mt-4">
                               {item.log}
                             </div>
                           )}

                           {/* View Post Button indicator */}
                           {item.media && item.media.length > 0 && (
                             <div className="absolute -bottom-4 right-6 md:-right-6 w-12 h-12 bg-neo-yellow neo-border text-black flex items-center justify-center hover:bg-neo-lime transition-colors">
                               <Plus className="w-8 h-8" />
                             </div>
                           )}
                        </div>
                     </div>

                     {/* Spacer Right for alternating layout on desktop */}
                     {isEven && <div className="hidden md:block w-1/2" />}
                   </motion.div>
                 );
               })}
             </div>
          </div>

          {/* Bottom Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="bg-white neo-border neo-shadow-hover p-6 group transition-all duration-300 hover:bg-neo-bg">
              <h4 className="font-mono font-bold border-b-2 border-black pb-2 mb-4 uppercase flex items-center justify-between">
                RECURSOS_ALOCADOS
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-neo-lime animate-pulse" />
                  <div className="w-1 h-1 bg-neo-lime animate-pulse [animation-delay:200ms]" />
                  <div className="w-1 h-1 bg-neo-lime animate-pulse [animation-delay:400ms]" />
                </div>
              </h4>
              <div className="space-y-4 font-mono text-[10px]">
                 <div className="space-y-1">
                    <div className="flex justify-between font-bold"><span>LINK_ESTÁVEL</span><strong className="text-neo-lime">99.9%</strong></div>
                    <div className="h-3 w-full bg-gray-100 border-2 border-neo-black p-[2px] overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '99%' }}
                        className="h-full bg-neo-lime" 
                       />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between font-bold"><span>USO_API_GEMINI</span><strong className="text-neo-pink">72%</strong></div>
                    <div className="h-3 w-full bg-gray-100 border-2 border-neo-black p-[2px] overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '72%' }}
                        className="h-full bg-neo-pink" 
                       />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="border-2 border-neo-black p-2 bg-neo-bg-alt">
                       <p className="text-[8px] text-gray-500 mb-1">COFFEE_REQ</p>
                       <p className="font-bold text-xs">PENDENTE</p>
                    </div>
                    <div className="border-2 border-neo-black p-2 bg-neo-bg-alt">
                       <p className="text-[8px] text-gray-500 mb-1">ERR_LOGS</p>
                       <p className="font-bold text-xs text-neo-lime">0.00%</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-neo-lime neo-border neo-shadow-hover p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Users className="w-16 h-16 -mr-4 -mt-4 rotate-12" />
              </div>
              <div className="flex justify-between items-start mb-4 border-b-2 border-black pb-2 relative z-10">
                <h4 className="font-mono font-bold uppercase">EQUIPE_ALFA</h4>
                <div className="bg-neo-black text-white text-[8px] px-2 py-0.5 font-bold tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-neo-lime rounded-full animate-pulse" />
                  VOICE_SYNC
                </div>
              </div>
              <div className="flex -space-x-3 mb-6 relative z-10">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="relative group/avatar">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i+14}`} 
                        alt="avatar" 
                        className="w-12 h-12 rounded-full border-[3px] border-neo-black transition-transform group-hover/avatar:-translate-y-1" 
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-neo-pink border-2 border-neo-black rounded-full flex items-center justify-center">
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-1 h-1 bg-white rounded-full" 
                        />
                      </div>
                   </div>
                 ))}
                 <div className="w-12 h-12 rounded-full border-[3px] border-neo-black bg-neo-black text-white flex items-center justify-center text-xs font-black z-10 hover:bg-neo-pink transition-colors cursor-pointer">
                    +4
                 </div>
              </div>
              <div className="font-mono space-y-1 relative z-10">
                <div className="flex justify-between text-[10px] font-bold">
                   <span>BPM_MÉDIO_SQUAD</span>
                   <span className="text-neo-black">74 BPM</span>
                </div>
                <div className="flex gap-1 h-2 items-end">
                   {[...Array(20)].map((_, i) => (
                     <motion.div 
                      key={i} 
                      animate={{ height: [4, 8, 4] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.5 + Math.random(), 
                        delay: i * 0.1 
                      }}
                      className={`flex-1 ${i < 15 ? 'bg-neo-black' : 'bg-neo-black/20'}`} 
                     />
                   ))}
                </div>
              </div>
            </div>

            <div className="bg-neo-black text-white neo-border neo-shadow-hover p-6 transform rotate-1 md:-translate-y-4">
              <h4 className="font-mono font-bold border-b-2 border-neo-pink text-neo-pink pb-2 mb-4 uppercase">ALERTA_DE_SISTEMA</h4>
              <p className="text-xs font-sans mb-4 leading-relaxed">VERIFIQUE O PONTO DE ACESSO VPN ANTES DO KICKOFF. POSSÍVEIS INTERFERÊNCIAS NO SETOR SUL.</p>
              <Button className="w-full bg-neo-pink text-white hover:bg-white hover:text-neo-black neo-border">RESOLVER_AGORA</Button>
            </div>
          </div>

        </div>
      </main>

      <PostModal 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)} 
        post={selectedPost} 
        userId={user?.uid}
      />
    </div>
  );
}

