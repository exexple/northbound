import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import openWhenData from '../data/openWhen';
import { X, Check } from 'lucide-react';

const Envelope = ({ item, onOpen }) => {
  return (
    <motion.button
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onClick={() => onOpen(item)}
      className="bg-brand-surface border border-brand-surface-light/40 hover:border-brand-earth/40 p-5 rounded-lg shadow-xl shadow-black/20 relative w-full h-[170px] flex flex-col justify-between items-start text-left cursor-pointer group transition-colors duration-500 overflow-hidden"
    >
      {/* Envelope fold lines */}
      <svg className="absolute inset-0 w-full h-full text-brand-surface-light/15 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0,0 L 50,40 L 100,0" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M 0,100 L 38,52" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M 100,100 L 62,52" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Wax Seal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-brand-earth/70 shadow-[0_0_6px_rgba(168,124,102,0.3)] flex items-center justify-center border border-brand-cream/15 group-hover:scale-110 group-hover:bg-brand-earth/85 transition-transform duration-300">
        <div className="w-4 h-4 rounded-full border border-dashed border-brand-bg/25 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-brand-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="relative z-0 select-none">
        <span className="text-[8px] tracking-[0.25em] font-sans font-bold text-brand-earth/70 uppercase">
          LETTER
        </span>
      </div>

      <div className="relative z-0 w-full pr-8 select-none">
        <h4 className="text-sm font-serif font-medium text-brand-cream tracking-wide group-hover:text-brand-text transition-colors leading-snug">
          Open when {item.trigger}
        </h4>
        <span className="text-[9px] font-mono text-brand-muted/60 mt-1 block">
          Tap to unseal
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
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-8 max-w-lg">
          These envelopes contain short messages for particular moments. Open them only when you truly feel the state written on the seal. They'll be here whenever you need them.
        </p>

        {/* Envelope Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
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
              className="fixed inset-0 bg-brand-bg/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.9, rotateX: 20, y: 20 }}
                animate={{ scale: 1, rotateX: 0, y: 0 }}
                exit={{ scale: 0.9, rotateX: 20, y: 20 }}
                transition={{ type: 'spring', damping: 22, stiffness: 150 }}
                className="w-full max-w-lg bg-[#faf8f2] border border-[#e5dfce] text-stone-800 p-6 md:p-8 rounded-lg shadow-2xl relative"
                style={{ perspective: '1000px' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Paper texture */}
                <div className="absolute inset-0 paper-texture pointer-events-none rounded-lg" />

                {/* Close */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition-colors p-1.5 rounded-full hover:bg-stone-200 cursor-pointer z-10"
                  aria-label="Close letter"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Letter Header */}
                <div className="border-b border-stone-200 pb-3 mb-5 select-none relative">
                  <span className="text-[9px] tracking-[0.25em] font-sans font-bold text-stone-500 uppercase block mb-1">
                    UNSEALED LETTER
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-800 italic leading-snug">
                    {selectedLetter.title}
                  </h3>
                </div>

                {/* Letter Body */}
                <div className="font-serif text-stone-700 text-sm md:text-base leading-relaxed text-justify space-y-4 mb-6 italic relative">
                  <p>{selectedLetter.message}</p>
                </div>

                {/* Suggested Action */}
                <div className="bg-[#ede7d8] border border-[#dacfb7] rounded p-4 text-stone-800 select-none relative">
                  <div className="flex items-center gap-1.5 text-[9px] font-sans font-bold text-stone-600 uppercase tracking-widest mb-1.5">
                    <Check className="w-3.5 h-3.5 text-stone-600 stroke-[3]" />
                    A Small Ritual
                  </div>
                  <p className="text-xs font-serif font-medium italic text-stone-700 leading-relaxed">
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
