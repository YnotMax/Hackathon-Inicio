import React, { useState, useEffect, useRef } from "react";
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

// --- NEO-BRUTALIST PARTICLES COMPONENT ---
const NeoParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number, y: number, size: number, speedX: number, speedY: number, color: string, rotation: number, rotationSpeed: number, type: 'square' | 'triangle' | 'cross' }> = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const colors = ["#B8FF29", "#FF2E93", "#00E5FF", "#FFE600", "#1A1A1A"];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      particles = [];
      const numParticles = Math.min(window.innerWidth / 30, 40); // responsive count
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 20 + 10,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          type: Math.random() > 0.6 ? 'square' : (Math.random() > 0.5 ? 'triangle' : 'cross')
        });
      }
    };

    const drawSquare = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.strokeRect(-size / 2, -size / 2, size, size);
    };

    const drawTriangle = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const drawCross = (ctx: CanvasRenderingContext2D, size: number) => {
      const ts = size / 3;
      ctx.beginPath();
      ctx.moveTo(-ts, -size/2); ctx.lineTo(ts, -size/2); ctx.lineTo(ts, -ts);
      ctx.lineTo(size/2, -ts); ctx.lineTo(size/2, ts); ctx.lineTo(ts, ts);
      ctx.lineTo(ts, size/2); ctx.lineTo(-ts, size/2); ctx.lineTo(-ts, ts);
      ctx.lineTo(-size/2, ts); ctx.lineTo(-size/2, -ts); ctx.lineTo(-ts, -ts);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#000';

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = height + p.size;
        if (p.y > height + p.size) p.y = -p.size;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        ctx.shadowColor = '#000';
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        if (p.type === 'square') drawSquare(ctx, p.size);
        else if (p.type === 'triangle') drawTriangle(ctx, p.size);
        else drawCross(ctx, p.size);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', init);
    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply"
    />
  );
};
// --- END NEO-BRUTALIST PARTICLES COMPONENT ---

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
      <NeoParticles />
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative w-full pt-16"> {/* Removed sidebar, expanded main */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Box */}
          <div className="bg-neo-pink neo-border neo-shadow p-6 md:p-12 relative overflow-hidden group">
             {/* Tech grid overlay */}
             <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#000_2px,transparent_2px),linear-gradient(to_bottom,#000_2px,transparent_2px)] bg-[size:32px_32px]"></div>

             {/* Decorative Animated Rocket */}
             <div className="absolute -right-10 -bottom-10 md:-right-4 md:-top-16 opacity-100 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none z-0 hidden sm:block rotate-12">
                <motion.svg 
                  width="280" 
                  height="280" 
                  viewBox="0 0 100 100"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="drop-shadow-[8px_8px_0_rgba(0,0,0,1)]"
                >
                    {/* Fire Main */}
                    <motion.path 
                        d="M 40 80 L 50 105 L 60 80 Z" 
                        fill="#B8FF29" stroke="#000" strokeWidth="3" strokeLinejoin="round"
                        animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ repeat: Infinity, duration: 0.15 }}
                        style={{ transformOrigin: 'center 80px' }}
                    />
                    {/* Fire Inner */}
                    <motion.path 
                        d="M 44 80 L 50 95 L 56 80 Z" 
                        fill="#fff" stroke="#000" strokeWidth="2" strokeLinejoin="round"
                        animate={{ scaleY: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                        style={{ transformOrigin: 'center 80px' }}
                    />
                    
                    {/* Base */}
                    <path d="M 35 75 L 65 75 L 60 80 L 40 80 Z" fill="#000" />
                    
                    {/* Left Fin */}
                    <path d="M 38 55 L 20 80 L 38 75 Z" fill="#00E5FF" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
                    {/* Right Fin */}
                    <path d="M 62 55 L 80 80 L 62 75 Z" fill="#00E5FF" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
                    
                    {/* Main Body */}
                    <path d="M 50 15 C 75 40 65 65 62 75 L 38 75 C 35 65 25 40 50 15 Z" fill="#fff" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
                    
                    {/* Tip */}
                    <path d="M 43 32 C 45 25 50 15 50 15 C 50 15 55 25 57 32 Z" fill="#FF2E93" stroke="#000" strokeWidth="3" strokeLinejoin="round" />

                    {/* Window Outer */}
                    <circle cx="50" cy="48" r="8" fill="#1A1A1A" stroke="#000" strokeWidth="3" />
                    {/* Window Detail */}
                    <circle cx="52" cy="46" r="2" fill="#fff" />
                    
                    {/* Deco Lines */}
                    <path d="M 42 66 L 58 66 M 40 70 L 60 70" stroke="#000" strokeWidth="3" strokeLinecap="round" />

                    {/* Action Stars/Lines */}
                    <motion.path d="M 15 25 L 25 35" stroke="#000" strokeWidth="4" strokeLinecap="round" animate={{ opacity: [0, 1, 0], x: [-5, 0], y: [5, 0] }} transition={{ repeat: Infinity, duration: 1 }} />
                    <motion.path d="M 85 25 L 75 35" stroke="#000" strokeWidth="4" strokeLinecap="round" animate={{ opacity: [0, 1, 0], x: [5, 0], y: [5, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} />
                    <motion.circle cx="20" cy="55" r="3" fill="#000" animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                    <motion.circle cx="85" cy="65" r="2" fill="#000" animate={{ scale: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                </motion.svg>
             </div>
             
             <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white leading-none uppercase relative z-10 tracking-tight" style={{ textShadow: '4px 4px 0 #000' }}>
               OPERAÇÃO HACKATHON<br/>TECH FLORIPA - VISÃO GERAL
             </h1>
          </div>

          {/* Countdown & Status Row */}
          <div className="flex flex-col gap-6">
            <div className="w-full bg-white neo-border neo-shadow p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 relative overflow-hidden group bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:16px_16px]">
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
                <span className="relative -top-2 text-neo-black" style={{ textShadow: 'none' }}>:</span>
                <div className="bg-neo-pink text-white neo-border border-[4px] px-2 sm:px-4 py-3 min-w-[70px] sm:min-w-[90px] text-center flex flex-col relative transition-transform hover:-translate-y-1">
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

            <div className="w-full bg-neo-cyan neo-border neo-shadow p-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 group relative overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[size:250%_250%,100%_100%] animate-[scan_3s_linear_infinite] z-0"></div>
               <div className="flex items-center gap-4 relative z-10">
                 <Zap className="w-12 h-12 group-hover:scale-110 transition-transform hidden sm:block" strokeWidth={3} />
                 <div>
                   <p className="font-mono text-[11px] uppercase font-bold text-gray-800 tracking-wider bg-white px-2 neo-border inline-block mb-1">PRÓXIMO_GATILHO</p>
                   <h3 className="font-heading font-black text-4xl tracking-tighter" style={{ textShadow: '2px 2px 0 #fff' }}>FASE 02</h3>
                 </div>
               </div>
               <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                 <p className="font-mono text-[14px] uppercase font-bold bg-neo-black text-white px-4 py-2 mt-2 sm:mt-0 shadow-[2px_2px_0px_#fff]">27/Jun &bull; 00:00</p>
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

