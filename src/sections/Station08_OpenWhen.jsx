import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import openWhenData from '../data/openWhen';
import { X, Check, Mail, Heart } from 'lucide-react';

const Envelope = ({ item, onOpen }) => {
  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onClick={() => onOpen(item)}
      className="glass-panel p-6 rounded-xl shadow-2xl relative w-full h-[180px] flex flex-col justify-between items-start text-left cursor-pointer group transition-all duration-500 overflow-hidden border border-brand-earth/30 select-none"
    >
      {/* Envelope triangular fold lines */}
      <svg className="absolute inset-0 w-full h-full text-brand-earth/20 pointer-events-none group-hover:text-brand-earth/35 transition-colors duration-500" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0,0 L 50,42 L 100,0" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M 0,100 L 40,50" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <path d="M 100,100 L 60,50" stroke="currentColor" strokeWidth="0.6" fill="none" />
      </svg>

      {/* Central Wax Seal Medallion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-gradient-to-br from-brand-earth to-[#8c624e] shadow-[0_0_12px_rgba(168,124,102,0.4)] flex items-center justify-center border border-brand-cream/30 group-hover:scale-115 group-hover:shadow-[0_0_16px_rgba(168,124,102,0.6)] transition-all duration-300">
        <div className="w-5 h-5 rounded-full border border-dashed border-brand-bg/40 flex items-center justify-center">
          <Mail className="w-3 h-3 text-brand-bg fill-current" />
        </div>
      </div>

      {/* Label header */}
      <div className="relative z-0">
        <span className="text-[8px] tracking-[0.25em] font-sans font-bold text-brand-earth uppercase bg-brand-earth/10 px-2 py-0.5 rounded border border-brand-earth/20">
          SEALED NOTE
        </span>
      </div>

      {/* Title */}
      <div className="relative z-0 w-full pr-6">
        <h4 className="text-sm font-serif font-medium text-brand-cream tracking-wide group-hover:text-brand-text transition-colors leading-snug">
          Open when {item.trigger}
        </h4>
        <span className="text-[9px] font-mono text-brand-muted/70 mt-1 block">
          Tap to unseal note
        </span>
      </div>
    </motion.button>
  );
};

const Station08_OpenWhen = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleClose = useCallback(() => setSelectedLetter(null), []);

  return (
    <StationWrapper
      id="open-when"
      stationNumber="08"
      title="Open When"
      subtitle="Folded notes for specific crossings"
    >
      <div className="max-w-4xl w-full mx-auto">
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-10 max-w-lg">
          These envelopes contain short messages for particular moments. Open them only when you truly feel the state written on the seal. They'll be waiting here whenever you need them.
        </p>

        {/* Envelope Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {openWhenData.map((item) => (
            <Envelope
              key={item.id}
              item={item}
              onOpen={setSelectedLetter}
            />
          ))}
        </div>

        {/* Letter Modal */}
        <AnimatePresence>
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-bg/95 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.9, rotateX: 18, y: 25 }}
                animate={{ scale: 1, rotateX: 0, y: 0 }}
                exit={{ scale: 0.9, rotateX: 18, y: 25 }}
                transition={{ type: 'spring', damping: 24, stiffness: 180 }}
                className="w-full max-w-lg bg-[#f8f6ee] border-2 border-[#e6e0d0] text-stone-900 p-7 md:p-9 rounded-xl shadow-2xl relative"
                style={{ perspective: '1100px' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 paper-texture pointer-events-none rounded-xl" />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 transition-colors p-1.5 rounded-full hover:bg-stone-200 cursor-pointer z-20"
                  aria-label="Close letter"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Letter Header */}
                <div className="border-b border-stone-300 pb-3 mb-6 relative z-10">
                  <span className="text-[9px] tracking-[0.25em] font-sans font-bold text-stone-500 uppercase block mb-1">
                    UNSEALED LETTER
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 italic leading-snug">
                    {selectedLetter.title}
                  </h3>
                </div>

                {/* Letter Body */}
                <div className="font-serif text-stone-800 text-sm md:text-base leading-relaxed text-justify space-y-4 mb-7 italic relative z-10">
                  <p>{selectedLetter.message}</p>
                </div>

                {/* Suggested Action */}
                <div className="bg-[#ebdcb9]/40 border border-[#d8c59c] rounded-lg p-4 text-stone-900 relative z-10">
                  <div className="flex items-center gap-1.5 text-[9px] font-sans font-bold text-stone-700 uppercase tracking-widest mb-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-earth stroke-[3]" />
                    A Small Ritual
                  </div>
                  <p className="text-xs font-serif font-medium italic text-stone-800 leading-relaxed">
                    {selectedLetter.action}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StationWrapper>
  );
};

export default React.memo(Station08_OpenWhen);

