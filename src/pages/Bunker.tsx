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
    <div className="flex min-h-screen bg-neo-bg bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:32px_32px]">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative w-full pt-16"> {/* Removed sidebar, expanded main */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Box */}
          <div className="bg-neo-pink neo-border neo-shadow p-6 md:p-12 relative overflow-hidden group">
             {/* Tech grid overlay */}
             <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#000_2px,transparent_2px),linear-gradient(to_bottom,#000_2px,transparent_2px)] bg-[size:32px_32px]"></div>

             {/* Decorative Rocket/Shape */}
             <div className="absolute -right-10 -bottom-10 opacity-30 mix-blend-multiply group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 3.86-12A2 2 0 0 1 15 4a22 22 0 0 1 12 3.86l-3 3"></path><path d="m14 11 3 3"></path><path d="m11 14-3-3"></path><path d="m9 9 3 3"></path></svg>
             </div>
             
             <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white leading-none uppercase relative z-10 tracking-tight" style={{ textShadow: '4px 4px 0 #000' }}>
               OPERAÇÃO HACKATHON<br/>TECH FLORIPA - VISÃO GERAL
             </h1>
          </div>

          {/* Countdown & Status Row */}
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 bg-white neo-border neo-shadow p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 relative overflow-hidden group bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:16px_16px]">
              <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-100 italic font-mono text-[8px] bg-neo-lime border-b-[3px] border-l-[3px] border-neo-black z-10 transition-opacity">
                ENCRYPTED_STREAM_ON
              </div>
              <div className="font-mono space-y-2 text-center lg:text-left z-10 flex-shrink-0">
                <div className="flex items-center justify-center lg:justify-start gap-2 bg-neo-black text-white px-3 py-2 neo-border shadow-[4px_4px_0px_#FF2E93]">
                  <Activity className="w-4 h-4 text-neo-pink animate-pulse" />
                  <p className="font-black text-xs md:text-sm tracking-widest">TEMPO_RESTANTE</p>
                </div>
                <p className="text-[10px] text-neo-black uppercase font-bold bg-neo-lime px-2 py-1 inline-block neo-border mt-2">Aguardando gatilho de início da fase 02</p>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl pb-6 lg:pb-0 z-10 lg:pr-4 flex-shrink" style={{ textShadow: '4px 4px 0px #000' }}>
                <div className="bg-neo-lime neo-border border-[4px] px-2 sm:px-4 py-3 min-w-[70px] sm:min-w-[90px] text-white text-center flex flex-col relative transition-transform hover:-translate-y-1">
                  <span className="relative z-10">{timeLeft.days.toString().padStart(2, '0')}</span>
                  <span className="font-sans font-bold text-[11px] text-center absolute -bottom-7 left-0 right-0 tracking-widest" style={{ textShadow: 'none', color: '#000' }}>DIAS</span>
                </div>
                <span className="relative -top-2 text-neo-black" style={{ textShadow: 'none' }}>:</span>
                <div className="bg-white neo-border border-[4px] px-2 sm:px-4 py-3 min-w-[70px] sm:min-w-[90px] text-neo-black text-center flex flex-col relative transition-transform hover:-translate-y-1" style={{ textShadow: '4px 4px 0px #f0f0f0' }}>
                  <span className="relative z-10">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="font-sans font-bold text-[11px] text-center absolute -bottom-7 left-0 right-0 tracking-widest" style={{ textShadow: 'none', color: '#000' }}>HORAS</span>
                </div>
                <span className="relative -top-2 xl:hidden 2xl:block text-neo-black" style={{ textShadow: 'none' }}>:</span>
                <div className="bg-neo-pink text-white neo-border border-[4px] px-2 sm:px-4 py-3 min-w-[70px] sm:min-w-[90px] text-center flex flex-col relative transition-transform hover:-translate-y-1 xl:hidden 2xl:flex">
                  <div className="overflow-hidden relative h-full flex items-center justify-center">
                    <motion.div
                      key={timeLeft.minutes}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="relative z-10"
                    >
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </motion.div>
                  </div>
                  <span className="font-sans font-bold text-[11px] text-center absolute -bottom-7 left-0 right-0 tracking-widest" style={{ textShadow: 'none', color: '#000' }}>MINUTOS</span>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-64 bg-neo-cyan neo-border neo-shadow p-6 flex flex-col items-center justify-center text-center gap-1 group relative overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[size:250%_250%,100%_100%] animate-[scan_3s_linear_infinite] z-0"></div>
               <Zap className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform relative z-10" strokeWidth={3} />
               <p className="font-mono text-[11px] uppercase font-bold text-gray-800 tracking-wider relative z-10 bg-white px-2 neo-border">PRÓXIMO_GATILHO</p>
               <h3 className="font-heading font-black text-4xl relative z-10 mt-2 mb-2 tracking-tighter" style={{ textShadow: '2px 2px 0 #fff' }}>FASE 02</h3>
               <div className="w-full border-t-[3px] border-neo-black mt-2 pt-3 space-y-3 relative z-10">
                 <p className="font-mono text-[12px] uppercase font-bold bg-neo-black text-white px-2 py-1 inline-block">27/Jun &bull; 00:00</p>
                 <Button size="sm" className="w-full text-[10px] font-black neo-border h-10 bg-neo-black text-white hover:bg-white hover:text-neo-black tracking-widest shadow-[2px_2px_0px_#fff]">VER_BRIEFING</Button>
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
                          w-full bg-white neo-border border-[4px] p-6 md:p-8 relative transition-all duration-200 cursor-pointer group text-left
                          ${isCompleted ? 'neo-shadow hover:neo-shadow-hover hover:-translate-y-2' : 'opacity-80 grayscale hover:grayscale-0 hover:opacity-100 hover:-translate-y-1'}
                        `} onClick={() => setSelectedPost(item)}>
                           
                           {/* Decorative Tab pointing to the line */}
                           {isCompleted && (
                             isEven ? (
                               <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-10 bg-neo-lime border-[4px] border-l-0 border-neo-black hidden md:block" />
                             ) : (
                               <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-10 bg-neo-lime border-[4px] border-r-0 border-neo-black hidden md:block" />
                             )
                           )}
                           
                           <div className="flex justify-between items-start mb-6">
                              <span className={`font-mono text-sm tracking-widest font-black px-3 py-1 border-[3px] border-neo-black ${isCompleted ? 'bg-neo-lime text-black shadow-[2px_2px_0_#000]' : 'bg-neo-black text-white'}`}>
                                {item.phase}
                              </span>
                              <span className={`text-[10px] font-black font-mono px-3 py-1 uppercase ${item.status === 'EM ANDAMENTO' ? 'bg-neo-pink text-white flex items-center gap-2 neo-border shadow-[2px_2px_0_#000]' : 'text-gray-500 bg-neo-bg border-2 border-dashed border-gray-400'}`}>
                                {item.status === 'EM ANDAMENTO' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse border border-neo-black"></span>}
                                {item.status}
                              </span>
                           </div>

                           <h3 className={`font-heading font-black text-3xl md:text-4xl leading-tight mb-6 uppercase tracking-tight ${!isCompleted ? 'text-gray-400' : 'drop-shadow-[2px_2px_0_#f0f0f0]'}`}>{item.title}</h3>

                           {item.tasks && item.tasks.length > 0 && (
                             <ul className="space-y-3 mb-6">
                               {item.tasks.map((task, i) => (
                                 <li key={i} className="flex items-start gap-3 font-mono text-xs font-bold uppercase tracking-wider">
                                   <CheckCircle className="w-5 h-5 text-neo-lime mt-[-2px] shrink-0 drop-shadow-[1px_1px_0_#000]" />
                                   <span className="mt-0.5">{task}</span>
                                 </li>
                               ))}
                             </ul>
                           )}

                           {item.log && (
                             <div className="bg-neo-bg border-[3px] border-neo-black p-4 font-mono text-[11px] font-bold text-gray-800 whitespace-pre-line uppercase mt-4 shadow-inner">
                               <div className="flex items-center gap-2 mb-2 pb-2 border-b-2 border-dashed border-gray-400 text-neo-pink">
                                 <Server className="w-4 h-4" /> SYS_LOG
                               </div>
                               {item.log}
                             </div>
                           )}

                           {/* View Post Button indicator */}
                           {item.media && item.media.length > 0 && (
                             <div className="absolute -bottom-5 right-6 md:-right-6 w-14 h-14 bg-neo-yellow neo-border text-black flex items-center justify-center hover:bg-neo-cyan transition-colors shadow-[4px_4px_0_#000] rotate-3 group-hover:rotate-12 group-hover:scale-110">
                               <Plus className="w-8 h-8 font-black" strokeWidth={3} />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-16">
            <div className="bg-white neo-border neo-shadow-hover p-6 md:p-8 group transition-all duration-300 relative">
              <div className="absolute -top-3 -left-3 bg-neo-yellow neo-border px-2 font-black text-xs transform -rotate-2">
                 SYS_PERF
              </div>
              <h4 className="font-mono font-black border-b-[3px] border-black pb-3 mb-5 uppercase flex items-center justify-between tracking-tight text-lg">
                RECURSOS
                <div className="flex gap-1 bg-neo-bg border-2 border-black p-1.5">
                  <div className="w-1.5 h-1.5 bg-neo-lime animate-pulse border border-black" />
                  <div className="w-1.5 h-1.5 bg-neo-lime animate-pulse [animation-delay:200ms] border border-black" />
                  <div className="w-1.5 h-1.5 bg-neo-lime animate-pulse [animation-delay:400ms] border border-black" />
                </div>
              </h4>
              <div className="space-y-5 font-mono text-xs">
                 <div className="space-y-1">
                    <div className="flex justify-between font-black"><span className="bg-neo-black text-white px-1">LINK_EXT</span><strong className="text-neo-lime drop-shadow-[1px_1px_0_#000]">99.9%</strong></div>
                    <div className="h-4 w-full bg-gray-100 border-[3px] border-neo-black p-[2px] overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '99%' }}
                        className="h-full bg-neo-lime border-r-2 border-neo-black relative overflow-hidden" 
                       >
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_50%,transparent_75%)] bg-[size:16px_16px]"></div>
                       </motion.div>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between font-black"><span className="bg-neo-black text-white px-1">GEMINI_API</span><strong className="text-neo-pink drop-shadow-[1px_1px_0_#000]">72%</strong></div>
                    <div className="h-4 w-full bg-gray-100 border-[3px] border-neo-black p-[2px] overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '72%' }}
                        className="h-full bg-neo-pink border-r-2 border-neo-black relative overflow-hidden" 
                       >
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_50%,transparent_75%)] bg-[size:16px_16px]"></div>
                       </motion.div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3 pt-3">
                    <div className="border-[3px] border-neo-black p-3 bg-neo-yellow shadow-[2px_2px_0px_#000]">
                       <p className="text-[9px] text-gray-800 mb-1 font-bold">COFFEE_REQ</p>
                       <p className="font-black text-sm">PENDENTE</p>
                    </div>
                    <div className="border-[3px] border-neo-black p-3 bg-white shadow-[2px_2px_0px_#000]">
                       <p className="text-[9px] text-gray-800 mb-1 font-bold">ERR_LOGS</p>
                       <p className="font-black text-sm text-neo-pink drop-shadow-[1px_1px_0_#000]">0.00%</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-neo-lime neo-border neo-shadow-hover p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                <Users className="w-32 h-32 -mr-8 -mt-8 rotate-12" />
              </div>
              <div>
                <div className="flex justify-between items-start mb-6 border-b-[3px] border-black pb-3 relative z-10">
                  <h4 className="font-mono font-black uppercase text-xl tacking-tight">EQUIPE_ALFA</h4>
                  <div className="bg-neo-black text-white text-[9px] px-2 py-1 font-bold tracking-widest flex items-center gap-2 neo-border shadow-[2px_2px_0_#fff]">
                    <span className="w-2 h-2 bg-neo-lime border border-neo-black rounded-full animate-pulse" />
                    VOICE_SYNC
                  </div>
                </div>
                <div className="flex -space-x-4 mb-6 relative z-10">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="relative group/avatar">
                        <img 
                          src={`https://i.pravatar.cc/100?img=${i+14}`} 
                          alt="avatar" 
                          className="w-14 h-14 rounded-full border-[3px] border-neo-black transition-transform group-hover/avatar:-translate-y-2 group-hover/avatar:shadow-[0_4px_0_#000]" 
                        />
                     </div>
                   ))}
                   <div className="w-14 h-14 rounded-full border-[3px] border-neo-black bg-neo-black text-white flex items-center justify-center text-sm font-black z-10 hover:bg-neo-pink hover:-translate-y-2 transition-all hover:shadow-[0_4px_0_#000] cursor-pointer">
                      +4
                   </div>
                </div>
              </div>
              <div className="font-mono space-y-2 relative z-10 bg-white p-3 neo-border shadow-[4px_4px_0_#000]">
                <div className="flex justify-between text-[11px] font-black">
                   <span className="bg-neo-black text-white px-1">BPM_SQUAD</span>
                   <span className="text-neo-pink drop-shadow-[1px_1px_0_#000]">74 BPM</span>
                </div>
                <div className="flex gap-[2px] h-3 items-end">
                   {[...Array(30)].map((_, i) => (
                     <motion.div 
                      key={i} 
                      animate={{ height: [4, 12, 4] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.5 + Math.random(), 
                        delay: i * 0.1 
                      }}
                      className={`flex-1 ${i < 24 ? 'bg-neo-black' : 'bg-neo-black/20'}`} 
                     />
                   ))}
                </div>
              </div>
            </div>

            <div className="bg-neo-black text-white neo-border neo-shadow-hover p-6 md:p-8 transform rotate-1 md:-translate-y-4 hover:rotate-0 transition-transform duration-300 flex flex-col justify-between relative overflow-hidden pattern-dots">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10">
                <h4 className="font-mono font-black border-b-[3px] border-neo-pink text-neo-pink pb-3 mb-5 uppercase text-xl flex items-center gap-2">
                   <AlertTriangle className="w-6 h-6 animate-pulse" /> ALERTA
                </h4>
                <p className="font-mono text-sm leading-relaxed mb-6 font-bold bg-white text-neo-black p-3 neo-border shadow-[4px_4px_0_#FF2E93]">
                  &gt; VERIFIQUE O ESTADO DA VPN ANTES DO KICKOFF.<br/><br/>
                  &gt; POSSÍVEIS INTERFERÊNCIAS NO SETOR SUL.
                </p>
              </div>
              
              <Button className="w-full bg-neo-pink text-white font-black text-lg hover:bg-white hover:text-neo-black neo-border relative z-10 py-6 hover:shadow-[4px_4px_0_#B8FF29]">
                RESOLVER_AGORA
              </Button>
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

