import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import bingoItems from '../data/bingo';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

const Station05_Bingo = () => {
  const [stamped, setStamped] = useState({});
  const [lastStamped, setLastStamped] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('northbound_bingo_board');
    if (saved) {
      setStamped(JSON.parse(saved));
    } else {
      const initial = { 12: true };
      setStamped(initial);
      localStorage.setItem('northbound_bingo_board', JSON.stringify(initial));
    }
  }, []);

  const handleTileClick = useCallback((index) => {
    if (index === 12) return;
    
    const updated = { ...stamped, [index]: !stamped[index] };
    setStamped(updated);
    setLastStamped(!stamped[index] ? index : null);
    localStorage.setItem('northbound_bingo_board', JSON.stringify(updated));
  }, [stamped]);

  const resetBoard = useCallback(() => {
    const initial = { 12: true };
    setStamped(initial);
    setLastStamped(null);
    localStorage.setItem('northbound_bingo_board', JSON.stringify(initial));
  }, []);

  const getTileText = (index) => {
    if (index === 12) return "FREE SPACE";
    return bingoItems[index];
  };

  const stampedCount = Object.values(stamped).filter(Boolean).length;

  return (
    <StationWrapper
      id="bingo"
      stationNumber="05"
      title="Freshman Bingo"
      subtitle="Moments waiting for you in the hills"
    >
      <div className="max-w-xl w-full mx-auto">
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-6 text-center max-w-sm mx-auto">
          Tap items as you experience them in Dehradun. Your progress is saved automatically.
        </p>

        {/* Progress indicator bar & badge */}
        <div className="flex items-center justify-between mb-6 px-3 py-2.5 glass-panel rounded-lg select-none">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-brand-cream">
            <CheckCircle2 className="w-4 h-4 text-brand-earth" />
            <span>VALLEY PROGRESS</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 md:w-32 h-1.5 bg-brand-surface-light rounded-full overflow-hidden border border-brand-earth/10">
              <div
                className="h-full bg-gradient-to-r from-brand-earth to-brand-cream rounded-full transition-all duration-500 shadow-[0_0_6px_#a87c66]"
                style={{ width: `${(stampedCount / 25) * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs text-brand-earth font-bold">{stampedCount}/25</span>
          </div>
        </div>

        {/* 5x5 Bingo Grid Container */}
        <div className="grid grid-cols-5 gap-1.5 md:gap-2.5 aspect-square w-full glass-panel p-3 md:p-4 rounded-xl shadow-2xl relative">
          {/* Paper texture */}
          <div className="absolute inset-0 paper-texture pointer-events-none rounded-xl" />

          {Array.from({ length: 25 }).map((_, index) => {
            const isStamped = !!stamped[index];
            const isCenter = index === 12;
            const isJustStamped = lastStamped === index;
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: isCenter ? 1 : 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleTileClick(index)}
                className={`relative flex items-center justify-center p-1.5 md:p-3 rounded-lg text-center overflow-hidden transition-all duration-300 outline-none select-none cursor-pointer border ${
                  isCenter
                    ? 'bg-brand-earth/15 border-brand-earth/40 text-brand-cream font-semibold shadow-inner'
                    : isStamped
                    ? 'bg-brand-surface-light/40 border-brand-earth/30 text-brand-cream/70 shadow-inner'
                    : 'bg-brand-surface/70 border-brand-surface-light/60 hover:border-brand-earth/40 hover:bg-brand-surface-light/30 text-brand-text shadow-md'
                }`}
              >
                {/* Tile Text */}
                <span className={`text-[7px] md:text-[10px] leading-tight tracking-wide ${
                  isCenter 
                    ? 'font-serif tracking-widest text-[8px] md:text-xs font-bold text-brand-earth' 
                    : 'font-light font-sans'
                }`}>
                  {getTileText(index)}
                </span>

                {/* Tactile Stamp Overlay */}
                <AnimatePresence>
                  {isStamped && (
                    <motion.div
                      initial={isJustStamped ? { scale: 2.8, opacity: 0, rotate: -25 } : { scale: 1, opacity: 1, rotate: (index * 13) % 18 - 9 }}
                      animate={{ scale: 1, opacity: 1, rotate: (index * 13) % 18 - 9 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={isJustStamped ? { type: 'spring', stiffness: 220, damping: 14 } : { duration: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none p-1"
                    >
                      <svg 
                        className={`w-full h-full ${isCenter ? 'text-brand-earth/30' : 'text-brand-earth/60'}`}
                        viewBox="0 0 100 100" 
                        fill="none"
                      >
                        <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="2.2" strokeDasharray="5,3" />
                        <text 
                          x="50" 
                          y="43" 
                          textAnchor="middle" 
                          fill="currentColor" 
                          fontSize="11" 
                          fontWeight="bold" 
                          letterSpacing="1.5"
                          stroke="none"
                        >
                          DEHRA
                        </text>
                        <line x1="26" y1="50" x2="74" y2="50" stroke="currentColor" strokeWidth="1.2" />
                        <text 
                          x="50" 
                          y="65" 
                          textAnchor="middle" 
                          fill="currentColor" 
                          fontSize="9" 
                          fontWeight="bold" 
                          letterSpacing="2.5"
                          stroke="none"
                        >
                          PASSED
                        </text>
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Board Action Options */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={resetBoard}
            className="flex items-center gap-2 px-4 py-2 bg-brand-surface-light/40 hover:bg-brand-surface-light border border-brand-surface-light/60 hover:border-brand-earth/30 text-brand-muted hover:text-brand-cream text-[10px] tracking-widest uppercase font-semibold rounded-md transition-all duration-300 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-earth" />
            Reset Board
          </button>
        </div>
      </div>
    </StationWrapper>
  );
};

export default React.memo(Station05_Bingo);

