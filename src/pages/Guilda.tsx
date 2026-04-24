import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FileWarning, Skull, Terminal, Zap } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, query, where, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const Avatar = ({ member, getGithubUrl, currentUser }: { member: any, getGithubUrl: (v: string) => string, currentUser: any }) => {
  const [imageIndex, setImageIndex] = useState(0);
  
  const sources = [];
  
  // Prefer member.photoURL from database, fallback to currentUser.photoURL if looking at own profile
  const photoUrlToUse = member.photoURL || (currentUser && currentUser.uid === member.id ? currentUser.photoURL : null);

  if (photoUrlToUse) {
    // googleusercontent URLs default to 96x96, replace with 400x400 for better quality
    let photo = photoUrlToUse;
    if (photo.includes('googleusercontent.com') && photo.includes('=s96-c')) {
      photo = photo.replace('=s96-c', '=s400-c');
    } else if (photo.includes('googleusercontent.com') && !photo.includes('=')) { // some urls don't have the size param
      photo = `${photo}=s400-c`;
    }
    sources.push(photo);
  }
  if (member.github) {
    sources.push(`${getGithubUrl(member.github)}.png`);
  }

  const currentSrc = sources[imageIndex];

  if (!currentSrc) {
    return <div className="w-full h-full flex items-center justify-center font-black">{member.name?.[0] || "?"}</div>;
  }

  return (
    <img 
      src={currentSrc} 
      alt={member.name} 
      className="w-full h-full object-cover" 
      referrerPolicy="no-referrer"
      onError={() => setImageIndex(i => i + 1)}
    />
  );
};

export default function Guilda() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const { user } = useAuth();
  const [loadingRoast, setLoadingRoast] = useState(false);

  useEffect(() => {
    if (!user) return; // Note we only fetch if logged in

    const q = query(collection(db, "members"), where("guildId", "==", "TECH_FLORIPA_2026"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMembers(data);
    });

    return () => unsub();
  }, [user]);

  const getColor = (index: number) => {
    const colors = ["lime", "pink", "cyan", "yellow"];
    return colors[index % colors.length];
  };

  const mapSkillsToArray = (skillsInfo: any) => {
    if (!skillsInfo) return [];
    return Object.entries(skillsInfo)
      .sort((a, b) => (b[1] as number) - (a[1] as number)) // Sort descending by score
      .slice(0, 3) // Top 3 skills
      .map(([key]) => key.toUpperCase().replace("_", " "));
  };

  const getGithubUrl = (val: string) => {
    if (!val) return "";
    const clean = val.trim()
      .replace(/^(?:https?:\/\/)?(?:www\.)?github\.com\//i, "")
      .replace(/\/$/, "")
      .replace(/^@/, "");
    return `https://github.com/${clean}`;
  };

  const getLinkedinUrl = (val: string) => {
    if (!val) return "";
    const clean = val.trim()
      .replace(/^(?:https?:\/\/)?(?:[\w-]+\.)?linkedin\.com\/(?:in|profile)\//i, "")
      .replace(/\/$/, "")
      .replace(/^@/, "");
    return `https://linkedin.com/in/${clean}`;
  };

  const handleRoast = async (m: any) => {
    if (m.roast) {
      setSelectedMember(m);
      return;
    }
    
    setLoadingRoast(true);
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: m.id, memberData: m })
      });
      const data = await res.json();
      
      if (data.roast) {
        // Updated state will come from Firestore onSnapshot automatically
        // because the server saved it
        setSelectedMember({ ...m, roast: data.roast });
      } else {
        alert("Erro no backend: " + JSON.stringify(data));
      }
    } catch (e: any) {
      console.error(e);
      alert("Erro ao chamar o roast.");
    } finally {
      setLoadingRoast(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-12 px-6"
    >
      <div className="mb-12 border-b-8 border-neo-black pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-5xl md:text-7xl font-heading mb-4 text-neo-black uppercase">O Quartel_</h1>
          <p className="text-xl font-bold bg-white inline-block px-3 py-1 neo-border">Esquadrão Operacional Tech Floripa '26</p>
        </div>
        <div className="hidden md:flex gap-4">
           {/* Decorative */}
           <div className="bg-neo-black text-white neo-border px-4 py-2 font-heading text-xl">
             MEMBROS_ONLINE: [ {members.length} ]
           </div>
        </div>
      </div>

      {!user ? (
        <div className="text-center p-12 bg-white neo-border shadow-[8px_8px_0_0_#000]">
           <h2 className="text-3xl font-heading text-neo-pink uppercase mb-4">ACESSO NEGADO</h2>
           <p className="font-bold">Protocolo de segurança exige que você se cadastre no Onboarding primeiro.</p>
        </div>
      ) : members.length === 0 ? (
        <div className="text-center p-12 bg-white neo-border shadow-[8px_8px_0_0_#000]">
           <h2 className="text-3xl font-heading text-neo-black uppercase animate-pulse">AGUARDANDO OPERADORES...</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <Card key={m.id} variant={getColor(i) as any} padding="none" className="flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-24 h-24 rounded-full neo-border neo-shadow bg-white flex items-center justify-center font-heading text-4xl uppercase overflow-hidden">
                     <Avatar member={m} getGithubUrl={getGithubUrl} currentUser={user} />
                  </div>
                  <span className="font-heading text-xs uppercase bg-black text-white px-2 py-1 flex items-center gap-1">
                     <span className="w-2 h-2 rounded-full bg-neo-lime animate-pulse inline-block"></span> ID_{m.id.slice(0,4)}
                  </span>
                </div>
                <h2 className="text-3xl font-heading font-black mb-2 uppercase break-words">{m.name}</h2>
                <div className="flex gap-2 overflow-hidden mb-4">
                  {m.github && <a href={getGithubUrl(m.github)} target="_blank" rel="noreferrer" className="text-xs bg-black text-white px-2 py-1 lowercase">github</a>}
                  {m.linkedin && <a href={getLinkedinUrl(m.linkedin)} target="_blank" rel="noreferrer" className="text-xs bg-[#0077b5] text-white px-2 py-1 lowercase">in</a>}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {mapSkillsToArray(m.skills).map(s => (
                    <span key={s} className="bg-white/50 neo-border px-2 py-1 font-bold text-xs uppercase">{s}</span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t-4 border-neo-black bg-white">
                <Button 
                  variant="primary" 
                  className="w-full gap-2 flex items-center justify-center font-black"
                  onClick={() => handleRoast(m)}
                  disabled={loadingRoast}
                >
                  <Skull className="w-5 h-5" /> 
                  {loadingRoast ? "ANALISANDO..." : "LER MINHA SINA"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neo-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="max-w-2xl w-full"
            >
              <Card variant="white" className="relative overflow-visible p-0 border-8 border-neo-black">
                <div className="absolute -top-6 -right-6 lg:-right-12">
                   <Button variant="primary" className="rounded-full w-16 h-16 text-2xl !p-0" onClick={() => setSelectedMember(null)}>X</Button>
                </div>
                
                <div className="bg-neo-black p-6 border-b-4 border-neo-black flex items-center gap-4 text-neo-lime">
                  <Terminal className="w-10 h-10" />
                  <h2 className="text-3xl font-heading uppercase m-0 leading-none">Análise Mestre</h2>
                </div>
                
                <div className="p-10 text-lg font-bold font-sans whitespace-pre-wrap">
                  {selectedMember.roast}
                </div>

                <div className="bg-neo-black text-white p-4 font-heading tracking-widest text-xs">
                  [SISTEMA ROASTED & TOASTED] &copy; 2026
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
