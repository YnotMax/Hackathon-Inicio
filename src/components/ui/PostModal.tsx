import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

interface Media {
  type: "image" | "video";
  url: string;
  description: string;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    title: string;
    phase: string;
    media: Media[];
  } | null;
}

export function PostModal({ isOpen, onClose, post }: PostModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !post) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % post.media.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + post.media.length) % post.media.length);
  };

  const currentMedia = post.media[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neo-black/80 backdrop-blur-sm"
          />

          {/* Modal Content - Insta Style but Neo-Brutalist */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-[500px] bg-white neo-border neo-shadow flex flex-col max-h-[95vh] overflow-hidden rounded-md"
          >
            {/* Header (Instagram Style) */}
            <div className="flex items-center justify-between p-3 border-b-[3px] border-neo-black bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neo-lime border-[2px] border-neo-black overflow-hidden relative">
                   <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold font-sans text-sm tracking-tight hover:text-neo-pink cursor-pointer">
                    equipe_alfa_bunker
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{post.phase} &bull; {post.title}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-neo-pink hover:text-white border-2 border-transparent hover:border-neo-black transition-colors md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Carousel Content Main */}
            {post.media.length > 0 ? (
              <div className="relative w-full aspect-square bg-neo-bg flex items-center justify-center overflow-hidden group border-b-[3px] border-neo-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center bg-black"
                  >
                    {currentMedia.type === "image" ? (
                      <img
                        src={currentMedia.url}
                        alt="Post media"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={currentMedia.url}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {post.media.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 p-1.5 bg-white/80 hover:bg-white text-black rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 p-1.5 bg-white/80 hover:bg-white text-black rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full aspect-square flex items-center justify-center bg-gray-100 text-gray-500 font-mono border-b-[3px] border-neo-black">
                [ SEM MÍDIA DISPONÍVEL ]
              </div>
            )}

            {/* Action Bar */}
            <div className="p-3 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <button className="hover:opacity-50 transition-opacity"><Heart className="w-7 h-7" /></button>
                  <button className="hover:opacity-50 transition-opacity"><MessageCircle className="w-7 h-7" /></button>
                  <button className="hover:opacity-50 transition-opacity"><Send className="w-7 h-7" /></button>
                </div>
                <button className="hover:opacity-50 transition-opacity"><Bookmark className="w-7 h-7" /></button>
              </div>

              {/* Indicators / Pagination dots (centered under actions) */}
              {post.media.length > 1 && (
                <div className="flex justify-center gap-1.5 mb-3">
                  {post.media.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentIndex ? "w-1.5 bg-neo-black" : "w-1.5 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Likes Text */}
              <div className="font-bold text-sm tracking-tight mb-2">
                1.337 curtidas
              </div>

              {/* Description */}
              <div className="text-sm border-l-2 border-neo-pink pl-2 mb-2 max-h-32 overflow-y-auto">
                <span className="font-bold mr-2">equipe_alfa_bunker</span>
                <span>
                  {currentMedia?.description || "Registro do sistema atualizado."}
                </span>
              </div>
              
              <div className="text-xs text-gray-400 mt-2 uppercase font-mono tracking-wider">
                HÁ 42 MINUTOS
              </div>
            </div>

            {/* Close button for desktop (outside the frame) */}
            <button
               onClick={onClose}
               className="hidden md:flex absolute -right-12 top-0 p-2 text-white hover:text-neo-pink transition-colors"
            >
               <X className="w-8 h-8" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
