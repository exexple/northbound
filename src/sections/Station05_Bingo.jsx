import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import bingoItems from '../data/bingo';
import { RotateCcw } from 'lucide-react';

const Station05_Bingo = () => {
  const [stamped, setStamped] = useState({});

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('northbound_bingo_board');
    if (saved) {
      setStamped(JSON.parse(saved));
    } else {
      // Stamp the center square (index 12 in 0-indexed list) as a free space by default
      const initial = { 12: true };
      setStamped(initial);
      localStorage.setItem('northbound_bingo_board', JSON.stringify(initial));
    }
  }, []);

  const handleTileClick = (index) => {
    if (index === 12) return; // Center "Free Space" is always checked
    
    const updated = { ...stamped, [index]: !stamped[index] };
    setStamped(updated);
    localStorage.setItem('northbound_bingo_board', JSON.stringify(updated));
  };

  const resetBoard = () => {
    const initial = { 12: true };
    setStamped(initial);
    localStorage.setItem('northbound_bingo_board', JSON.stringify(initial));
  };

  // Build grid: indices 0-24
  // We modify index 12 to be the custom "Free Space: Bound North"
  const getTileText = (index) => {
    if (index === 12) return "FREE SPACE: BOUND NORTH";
    return bingoItems[index];
  };

  return (
    <StationWrapper
      id="bingo"
      stationNumber="05"
      title="Freshman Bingo"
      subtitle="A checklist of moments waiting for you in the hills"
    >
      <div className="max-w-xl w-full mx-auto">
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-6 text-center max-w-sm mx-auto">
          Tap items as you experience them during your first semester. Your progress will be saved automatically.
        </p>

        {/* 5x5 Bingo Grid */}
        <div className="grid grid-cols-5 gap-2 md:gap-3 aspect-square w-full bg-brand-surface border border-brand-surface-light/45 p-3 rounded-lg shadow-xl relative">
          {Array.from({ length: 25 }).map((_, index) => {
            const isStamped = !!stamped[index];
            const isCenter = index === 12;
            
            return (
              <button
                key={index}
                onClick={() => handleTileClick(index)}
                className={`relative flex items-center justify-center p-1.5 md:p-3 rounded text-center overflow-hidden transition-all duration-300 outline-none select-none cursor-pointer border ${
                  isCenter
                    ? 'bg-brand-surface-light/40 border-brand-earth/30 text-brand-earth font-semibold'
                    : isStamped
                    ? 'bg-brand-surface-light/20 border-brand-surface-light/80 text-brand-muted/75'
                    : 'bg-brand-bg/40 border-brand-surface-light/40 hover:border-brand-earth/30 text-brand-text'
                }`}
                style={{
                  height: '100%',
                }}
              >
                {/* Tile Text */}
                <span className={`text-[8px] md:text-[10px] leading-tight font-sans tracking-wide ${isCenter ? 'font-serif tracking-widest text-[9px] md:text-xs' : 'font-light'}`}>
                  {getTileText(index)}
                </span>

                {/* Tactile Stamp Overlay */}
                <AnimatePresence>
                  {isStamped && (
                    <motion.div
                      initial={{ scale: 2, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: index * 13 % 20 - 10 }} // pseudo-random rotation
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none p-1.5"
                    >
                      {/* Stylized organic ink stamp (looks like rubber stamp) */}
                      <svg 
                        className={`w-full h-full stroke-[2] ${isCenter ? 'text-brand-earth/30' : 'text-brand-earth/70'}`}
                        viewBox="0 0 100 100" 
                        fill="none"
                      >
                        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeDasharray="5,2" />
                        <path d="M 25,50 L 75,50" stroke="currentColor" strokeWidth="1.5" />
                        <text 
                          x="50" 
                          y="42" 
                          textAnchor="middle" 
                          fill="currentColor" 
                          fontSize="10" 
                          fontWeight="bold" 
                          letterSpacing="1"
                          stroke="none"
                        >
                          DEHRA
                        </text>
                        <text 
                          x="50" 
                          y="62" 
                          textAnchor="middle" 
                          fill="currentColor" 
                          fontSize="9" 
                          fontWeight="bold" 
                          letterSpacing="2"
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

export default Station05_Bingo;
