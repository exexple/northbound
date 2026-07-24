import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import prompts from '../data/prompts';
import { BookOpen, RefreshCw, PenTool } from 'lucide-react';

const Station06_WritersCorner = () => {
  const [prompt, setPrompt] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const drawRandomPrompt = useCallback(() => {
    setIsTyping(true);
    const available = prompts.filter(p => p !== prompt);
    const selected = available[Math.floor(Math.random() * available.length)];
    setPrompt(selected);
    setTimeout(() => setIsTyping(false), 500);
  }, [prompt]);

  const handleOpenDrawer = useCallback(() => {
    setIsOpen(true);
    if (!prompt) drawRandomPrompt();
  }, [prompt, drawRandomPrompt]);

  return (
    <StationWrapper
      id="writers-corner"
      stationNumber="06"
      title="Writer's Corner"
      subtitle="Prompts for quiet valley evenings"
    >
      <div className="max-w-xl w-full mx-auto flex flex-col items-center">
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-8 text-center max-w-sm">
          Keep a journal in Dehradun. These prompts are gentle starting points for your thoughts — best paired with a warm cup and a window seat.
        </p>

        <div className="w-full relative min-h-[360px] flex items-center justify-center select-none">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED DESK DRAWER STATE */
              <motion.button
                key="drawer-closed"
                onClick={handleOpenDrawer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 25 }}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.5 }}
                className="group w-full max-w-sm h-48 bg-gradient-to-b from-[#191a1f] via-[#121316] to-[#0a0b0d] border border-brand-earth/30 rounded-xl shadow-2xl shadow-black/60 flex flex-col items-center justify-center gap-3 relative cursor-pointer overflow-hidden p-6"
                style={{ perspective: '900px' }}
              >
                {/* Inner shadow & edge depth */}
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-2 border border-brand-earth/15 rounded-lg pointer-events-none" />

                {/* Vintage Brass drawer handle */}
                <div className="w-20 h-5 border-2 border-brand-earth/40 rounded-full flex items-center justify-center relative shadow-inner group-hover:border-brand-earth transition-colors duration-500 bg-brand-surface/80">
                  <div className="w-10 h-1.5 bg-brand-earth/30 group-hover:bg-brand-earth/60 rounded transition-colors duration-500" />
                </div>
                
                <div className="text-[10px] tracking-[0.3em] font-sans font-bold text-brand-cream group-hover:text-brand-cream transition-colors duration-300 uppercase mt-2 flex items-center gap-2">
                  <PenTool className="w-3.5 h-3.5 text-brand-earth" />
                  Open Desk Drawer
                </div>

                <span className="text-[10px] font-serif italic text-brand-muted/70">
                  a private desk nook for your journal
                </span>
              </motion.button>
            ) : (
              /* OPENED LEATHER NOTEBOOK STATE */
              <motion.div
                key="drawer-opened"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                className="w-full glass-panel rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[340px] relative overflow-hidden border border-brand-earth/30"
              >
                {/* Gold binding edge line */}
                <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-r from-brand-earth/40 to-brand-earth/10 border-r border-brand-earth/20" />

                {/* Page spine shadow */}
                <div className="absolute top-0 left-[12px] w-1.5 h-full bg-gradient-to-r from-black/20 to-transparent" />

                {/* Notebook Header */}
                <div className="flex justify-between items-center pl-6 mb-4 select-none relative z-10">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-brand-earth font-bold tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>DEHRADUN_JOURNAL.MD</span>
                  </div>
                  <button
                    onClick={drawRandomPrompt}
                    disabled={isTyping}
                    className="flex items-center gap-1.5 px-3 py-1 bg-brand-surface-light/60 hover:bg-brand-earth hover:text-brand-bg border border-brand-earth/30 text-brand-cream text-[9px] tracking-wider uppercase font-bold rounded transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTyping ? 'animate-spin' : ''}`} />
                    New prompt
                  </button>
                </div>

                {/* Lined Paper Content Area */}
                <div className="flex-1 pl-6 flex flex-col justify-center min-h-[150px] relative z-10">
                  <div className="notebook-lines py-2 text-brand-text font-serif italic text-base md:text-lg leading-9 pr-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={prompt}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline text-brand-cream/95"
                      >
                        "{prompt}"
                        {isTyping && (
                          <span
                            className="inline-block w-2 h-4 ml-1 bg-brand-earth align-middle rounded-sm"
                            style={{ animation: 'gentle-pulse 0.6s ease-in-out infinite' }}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Notebook footer */}
                <div className="pl-6 pt-4 border-t border-brand-surface-light/40 flex justify-between items-center text-[9px] font-sans text-brand-muted/70 select-none relative z-10">
                  <span className="font-mono text-brand-earth font-semibold uppercase">DEHRADUN DIARY • STATION 06</span>
                  <span className="italic font-serif text-brand-cream/70 text-xs">Write it down tonight</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </StationWrapper>
  );
};

export default React.memo(Station06_WritersCorner);

