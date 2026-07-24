import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import bingoItems from '../data/bingo';
import { RotateCcw } from 'lucide-react';

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
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-4 text-center max-w-sm mx-auto">
          Tap items as you experience them. Your progress is saved automatically.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 text-[10px] text-brand-muted select-none">
          <span className="font-mono text-brand-earth font-bold">{stampedCount}/25</span>
          <span>stamped</span>
          <div className="w-20 h-1 bg-brand-surface-light rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-earth rounded-full transition-all duration-500"
              style={{ width: `${(stampedCount / 25) * 100}%` }}
            />
          </div>
        </div>

        {/* 5x5 Bingo Grid */}
        <div className="grid grid-cols-5 gap-1.5 md:gap-2.5 aspect-square w-full bg-brand-surface border border-brand-surface-light/40 p-3 rounded-lg shadow-xl shadow-black/30 relative">
          {/* Paper texture */}
          <div className="absolute inset-0 paper-texture pointer-events-none rounded-lg" />

          {Array.from({ length: 25 }).map((_, index) => {
            const isStamped = !!stamped[index];
            const isCenter = index === 12;
            const isJustStamped = lastStamped === index;
            
            return (
              <button
                key={index}
                onClick={() => handleTileClick(index)}
                className={`relative flex items-center justify-center p-1 md:p-2.5 rounded text-center overflow-hidden transition-all duration-300 outline-none select-none cursor-pointer border ${
                  isCenter
                    ? 'bg-brand-earth/10 border-brand-earth/25 text-brand-earth font-semibold'
                    : isStamped
                    ? 'bg-brand-surface-light/15 border-brand-surface-light/60 text-brand-muted/60'
                    : 'bg-brand-bg/40 border-brand-surface-light/30 hover:border-brand-earth/25 text-brand-text'
                }`}
              >
                {/* Tile Text */}
                <span className={`text-[7px] md:text-[10px] leading-tight tracking-wide ${
                  isCenter 
                    ? 'font-serif tracking-widest text-[8px] md:text-xs' 
                    : 'font-light'
                }`}>
                  {getTileText(index)}
                </span>

                {/* Tactile Stamp Overlay */}
                <AnimatePresence>
                  {isStamped && (
                    <motion.div
                      initial={isJustStamped ? { scale: 2.5, opacity: 0, rotate: -30 } : { scale: 1, opacity: 1, rotate: (index * 13) % 20 - 10 }}
                      animate={{ scale: 1, opacity: 1, rotate: (index * 13) % 20 - 10 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={isJustStamped ? { type: 'spring', stiffness: 200, damping: 12 } : { duration: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none p-1"
                    >
                      <svg 
                        className={`w-full h-full ${isCenter ? 'text-brand-earth/20' : 'text-brand-earth/50'}`}
                        viewBox="0 0 100 100" 
                        fill="none"
                      >
                        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="6,3" />
                        <text 
                          x="50" 
                          y="44" 
                          textAnchor="middle" 
                          fill="currentColor" 
                          fontSize="11" 
                          fontWeight="bold" 
                          letterSpacing="1.5"
                          stroke="none"
                        >
                          DEHRA
                        </text>
                        <line x1="28" y1="50" x2="72" y2="50" stroke="currentColor" strokeWidth="1" />
                        <text 
                          x="50" 
                          y="64" 
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
              </button>
            );
          })}
        </div>

        {/* Board Action Options */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={resetBoard}
            className="flex items-center gap-1.5 text-brand-muted hover:text-brand-earth text-[10px] tracking-widest uppercase font-semibold transition-colors duration-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Board
          </button>
        </div>
      </div>
    </StationWrapper>
  );
};

export default React.memo(Station05_Bingo);
