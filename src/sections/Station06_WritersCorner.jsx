import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import prompts from '../data/prompts';
import { BookOpen, RefreshCw } from 'lucide-react';

const Station06_WritersCorner = () => {
  const [prompt, setPrompt] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const drawRandomPrompt = useCallback(() => {
    setIsTyping(true);
    const available = prompts.filter(p => p !== prompt);
    const selected = available[Math.floor(Math.random() * available.length)];
    setPrompt(selected);
    setTimeout(() => setIsTyping(false), 600);
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

        <div className="w-full relative min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED DRAWER STATE */
              <motion.button
                key="drawer-closed"
                onClick={handleOpenDrawer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5 }}
                className="group w-full max-w-xs h-40 bg-gradient-to-b from-[#18191d] to-[#111214] border border-brand-surface-light/50 rounded-lg shadow-2xl shadow-black/40 flex flex-col items-center justify-center gap-3 relative cursor-pointer overflow-hidden"
                style={{ perspective: '800px' }}
              >
                {/* Drawer depth shadow */}
                <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Brass drawer handle */}
                <div className="w-16 h-4 border-2 border-brand-earth/25 rounded-full flex items-center justify-center relative shadow-inner group-hover:border-brand-earth/50 transition-colors duration-300">
                  <div className="w-8 h-1 bg-brand-earth/20 group-hover:bg-brand-earth/40 rounded transition-colors duration-300" />
                </div>
                <div className="text-[10px] tracking-[0.25em] font-sans font-bold text-brand-muted group-hover:text-brand-cream transition-colors duration-300 uppercase mt-2">
                  Open Desk Drawer
                </div>
                <svg className="w-4 h-4 text-brand-earth/40 group-hover:text-brand-earth transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V20H4V12" />
                  <path d="M2 7H22L20 12H4L2 7Z" />
                  <path d="M12 22V7" />
                  <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" />
                </svg>
              </motion.button>
            ) : (
              /* OPENED NOTEBOOK STATE */
              <motion.div
                key="drawer-opened"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="w-full bg-[#151619] border border-brand-surface-light/45 rounded-lg p-6 md:p-8 shadow-2xl shadow-black/40 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
              >
                {/* Gold binding line */}
                <div className="absolute top-0 left-0 w-2.5 h-full bg-brand-earth/20 border-r border-brand-earth/10" />

                {/* Page edge shadow on left */}
                <div className="absolute top-0 left-[10px] w-1 h-full bg-gradient-to-r from-black/10 to-transparent" />

                {/* Notebook Header */}
                <div className="flex justify-between items-center pl-5 mb-4 select-none">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-brand-earth">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>JOURNAL_PROMPT.MD</span>
                  </div>
                  <button
                    onClick={drawRandomPrompt}
                    disabled={isTyping}
                    className="flex items-center gap-1.5 text-brand-muted hover:text-brand-earth text-[9px] tracking-wider uppercase font-semibold transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTyping ? 'animate-spin' : ''}`} />
                    New prompt
                  </button>
                </div>

                {/* Lined Paper Content Area */}
                <div className="flex-1 pl-5 flex flex-col justify-center min-h-[140px]">
                  <div className="notebook-lines py-2 text-brand-text font-serif italic text-sm md:text-base leading-8 pr-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={prompt}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline"
                      >
                        {prompt}
                        {isTyping && (
                          <span
                            className="inline-block w-1.5 h-4 ml-1 bg-brand-earth align-middle"
                            style={{ animation: 'gentle-pulse 0.6s ease-in-out infinite' }}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Notebook footer */}
                <div className="pl-5 pt-4 border-t border-brand-surface-light/30 flex justify-between items-center text-[9px] font-sans text-brand-muted/60 select-none">
                  <span>DEHRADUN DIARY • STATION 06</span>
                  <span className="italic font-serif">Write it down tonight</span>
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
