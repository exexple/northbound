import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import prompts from '../data/prompts';
import { BookOpen, RefreshCw, Feather } from 'lucide-react';

const Station06_WritersCorner = () => {
  const [prompt, setPrompt] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const drawRandomPrompt = () => {
    setIsTyping(true);
    // Grab a random prompt that is different from current one if possible
    const available = prompts.filter(p => p !== prompt);
    const selected = available[Math.floor(Math.random() * available.length)];
    
    // Simulate paper typing speed
    setPrompt(selected);
    setTimeout(() => {
      setIsTyping(false);
    }, 800);
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
    if (!prompt) {
      drawRandomPrompt();
    }
  };

  return (
    <StationWrapper
      id="writers-corner"
      stationNumber="06"
      title="Writer's Corner"
      subtitle="Reflective prompts for quiet valley evenings"
    >
      <div className="max-w-xl w-full mx-auto flex flex-col items-center">
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-8 text-center max-w-sm">
          Keep a journal in Dehradun. These prompts are designed to act as starting points for your thoughts.
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
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group w-full max-w-xs h-36 bg-gradient-to-b from-[#16171a] to-[#111214] border border-brand-surface-light/60 rounded-lg shadow-2xl flex flex-col items-center justify-center gap-3 relative cursor-pointer overflow-hidden"
              >
                {/* Brass drawer handle design */}
                <div className="absolute top-2 w-12 h-1 bg-[#1a1b1e] rounded-full" />
                <div className="w-16 h-4 border-2 border-brand-earth/30 rounded-full flex items-center justify-center relative shadow-inner group-hover:border-brand-earth transition-colors duration-300">
                  <div className="w-8 h-1 bg-brand-earth/20 group-hover:bg-brand-earth/50 rounded" />
                </div>
                <div className="text-[10px] tracking-[0.25em] font-sans font-bold text-brand-muted group-hover:text-brand-cream transition-colors duration-300 uppercase mt-2">
                  Open Desk Drawer
                </div>
                <Feather className="w-4 h-4 text-brand-earth/40 group-hover:text-brand-earth transition-colors duration-300" />
              </motion.button>
            ) : (
              /* OPENED NOTEBOOK STATE */
              <motion.div
                key="drawer-opened"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="w-full bg-[#151619] border border-brand-surface-light/50 rounded-lg p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[320px] relative overflow-hidden"
              >
                {/* Gold binding lines for notebooks */}
                <div className="absolute top-0 left-0 w-2.5 h-full bg-brand-earth/25 border-r border-brand-earth/10" />

                {/* Notebook Header */}
                <div className="flex justify-between items-center pl-4 mb-4 select-none">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-brand-earth">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>JOURNAL_PROMPT.MD</span>
                  </div>
                  <button
                    onClick={drawRandomPrompt}
                    disabled={isTyping}
                    className="flex items-center gap-1.5 text-brand-muted hover:text-brand-earth text-[9px] tracking-wider uppercase font-semibold transition-colors duration-300 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTyping ? 'animate-spin' : ''}`} />
                    Draw prompt
                  </button>
                </div>

                {/* Lined Paper Content Area */}
                <div className="flex-1 pl-4 flex flex-col justify-center min-h-[140px]">
                  <div className="notebook-lines py-2 text-brand-text font-serif italic text-sm md:text-base leading-8 pr-2">
                    {/* Render typing effect */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={prompt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="inline"
                      >
                        {prompt}
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-1.5 h-4 ml-1 bg-brand-earth align-middle"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Notebook footer decoration */}
                <div className="pl-4 pt-4 border-t border-brand-surface-light/35 flex justify-between items-center text-[9px] font-sans text-brand-muted/70 select-none">
                  <span>DEHRADUN DIARY • STATION 06</span>
                  <span className="italic">Write it down in a notebook tonight</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </StationWrapper>
  );
};

export default Station06_WritersCorner;
