import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Heart, MoreHorizontal, Loader2 } from "lucide-react";
import { toggleLike, subscribeToLikes, subscribeToUserLike } from "../../services/likesService";

export interface Media {
  type: "image" | "video";
  url: string;
  description?: string;
}

export interface PostData {
  id: string;
  title: string;
  phase: string;
  media: Media[];
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string | null;
  post: PostData | null;
}

export function PostModal({ isOpen, onClose, post, userId }: PostModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isLoadingMedia, setIsLoadingMedia] = useState(true);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && post?.id) {
        const unsubLikes = subscribeToLikes(post.id, setLikesCount);
        let unsubUserLike = () => {};
        if (userId) {
          unsubUserLike = subscribeToUserLike(post.id, userId, setIsLiked);
        }
        return () => {
          unsubLikes();
          unsubUserLike();
        };
    }
  }, [isOpen, post?.id, userId]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = "hidden";
      document.body.classList.add("hide-nav");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("hide-nav");
      setIsLoadingMedia(true);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("hide-nav");
    };
  }, [isOpen]);

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (!post || post.media.length <= 1) return;
    setIsLoadingMedia(true);
    setCurrentIndex((prev) => (prev + 1) % post.media.length);
  }, [post]);

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (!post || post.media.length <= 1) return;
    setIsLoadingMedia(true);
    setCurrentIndex((prev) => (prev - 1 + post.media.length) % post.media.length);
  }, [post]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !post) return null;

  const handleLike = async () => {
    if (!userId || isLiking || !post.id) return;
    
    // Optimistic UI updates handled implicitly by Firebase SDK, but let's lock button
    setIsLiking(true);
    try {
      await toggleLike(post.id, userId, isLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      handleLike();
    }
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 800);
  };

  const currentMedia = post.media?.[currentIndex];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-center items-center md:p-8" onClick={onClose}>
          {/* Backdrop with strong blur for Brutalist focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-neo-black/90 backdrop-blur-md"
          />

          {/* Desktop Close Button outside container */}
          <button
             onClick={onClose}
             className="hidden md:flex absolute top-6 right-6 p-3 text-white bg-black/50 hover:bg-neo-pink hover:text-white rounded-full transition-all z-50 border-2 border-transparent hover:border-neo-black"
             title="Fechar (Esc)"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          {/* Modal Container: Solid Neo-Brutalist Layout */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full h-full md:h-[750px] md:max-h-[90vh] max-w-[500px] bg-white md:border-4 md:border-neo-black md:shadow-[12px_12px_0_0_rgba(0,0,0,1)] flex flex-col md:rounded-lg overflow-hidden"
          >
            {/* Header */}
            <header className="flex-none h-[64px] flex items-center justify-between px-4 border-b-4 border-neo-black bg-white select-none">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-neo-lime border-[2px] border-neo-black overflow-hidden relative flex-shrink-0">
                   <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold font-sans text-sm tracking-tight truncate">
                    equipe_alfa_bunker
                  </span>
                  <span className="text-xs text-gray-500 font-mono truncate">{post.phase} &bull; {post.title}</span>
                </div>
              </div>
              <div className="flex items-center flex-shrink-0 ml-2">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex md:hidden active:scale-95" title="Fechar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:flex" title="Opções">
                  <MoreHorizontal className="w-6 h-6 text-neo-black" />
                </button>
              </div>
            </header>

            {/* Media Area (Flex-1 allows it to take remaining space, absolutely contained) */}
            <main className="flex-1 relative bg-neo-black w-full min-h-0 flex items-center justify-center overflow-hidden select-none group" onDoubleClick={handleDoubleTap}>
              {post.media?.length > 0 && currentMedia ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
                    >
                      {currentMedia.type === "image" ? (
                        <>
                           {isLoadingMedia && (
                             <div className="absolute inset-0 flex items-center justify-center text-white/50">
                               <Loader2 className="w-8 h-8 animate-spin" />
                             </div>
                           )}
                           <img
                             src={currentMedia.url}
                             alt="Post media"
                             className={`w-full h-full object-contain transition-opacity duration-300 ${isLoadingMedia ? 'opacity-0' : 'opacity-100'}`}
                             onLoad={() => setIsLoadingMedia(false)}
                           />
                        </>
                      ) : (
                        <video
                          ref={videoRef}
                          src={currentMedia.url}
                          className="w-full h-full object-contain"
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          onLoadedData={() => setIsLoadingMedia(false)}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Double Tap Heart Overlay */}
                  <AnimatePresence>
                    {showHeartOverlay && (
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        exit={{ scale: 2, opacity: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="absolute z-20 pointer-events-none drop-shadow-2xl"
                      >
                        <Heart className="w-24 h-24 text-neo-pink fill-neo-pink" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Overlays */}
                  {post.media.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 hover:bg-white border-2 border-transparent hover:border-neo-black text-black rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 custom-focus z-10 active:scale-90"
                        aria-label="Anterior"
                      >
                        <ChevronLeft className="w-6 h-6 stroke-[3px]" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 hover:bg-white border-2 border-transparent hover:border-neo-black text-black rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 custom-focus z-10 active:scale-90"
                        aria-label="Próximo"
                      >
                        <ChevronRight className="w-6 h-6 stroke-[3px]" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 font-mono text-sm uppercase gap-2">
                  <div className="w-12 h-12 border-4 border-gray-500 rounded-sm flex items-center justify-center">?</div>
                  <span>[ MÍDIA CORROMPIDA ]</span>
                </div>
              )}
            </main>

            {/* Footer Area */}
            <footer className="flex-none bg-white border-t-4 border-neo-black w-full overflow-y-auto max-h-[35vh]">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleLike}
                      disabled={!userId || isLiking}
                      className={`group flex items-center justify-center transition-transform active:scale-90 ${isLiked ? 'text-neo-pink' : 'text-neo-black hover:text-gray-600'}`}
                      aria-label={isLiked ? "Descurtir" : "Curtir"}
                    >
                      <Heart className={`w-8 h-8 transition-colors ${isLiked ? 'fill-current' : 'fill-transparent group-hover:fill-gray-100'}`} />
                    </button>
                  </div>
                  
                  {/* Pagination dots aligned to right/center */}
                  {post.media && post.media.length > 1 && (
                    <div className="flex justify-center gap-1.5 flex-1">
                      {post.media.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? "w-3 bg-neo-pink" : "w-1.5 bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <div className="w-8" />{/* Spacer to balance flex wrapper */}
                </div>

                <div className="font-bold text-sm tracking-tight mb-2">
                  {likesCount.toLocaleString()} {likesCount === 1 ? 'curtida' : 'curtidas'}
                </div>

                <div className="text-sm border-l-4 border-neo-pink pl-3 mb-2">
                  <span className="font-black mr-2 font-mono">equipe_alfa_bunker</span>
                  <span className="text-gray-800 leading-relaxed text-[13px]">
                    {currentMedia?.description || "Registro codificado salvo nos arquivos do sistema."}
                  </span>
                </div>
                
                <div className="text-[10px] text-gray-400 mt-3 uppercase font-mono tracking-widest font-bold">
                  HÁ 42 MINUTOS
                </div>
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
