import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import openWhenData from '../data/openWhen';
import { Mail, X, Check } from 'lucide-react';

const Envelope = ({ item, onOpen }) => {
  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={() => onOpen(item)}
      className="bg-brand-surface border border-brand-surface-light/50 hover:border-brand-earth/60 p-6 rounded-lg shadow-xl relative w-full h-[180px] flex flex-col justify-between items-start text-left cursor-pointer group transition-colors duration-500 overflow-hidden"
    >
      {/* Visual background lines mimicking envelope folds */}
      <svg className="absolute inset-0 w-full h-full text-brand-surface-light/20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0,0 L 50,45 L 100,0" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M 0,100 L 40,55" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M 100,100 L 60,55" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>

      {/* Wax Seal icon button in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-brand-earth/80 shadow-[0_0_8px_rgba(168,124,102,0.4)] flex items-center justify-center border border-brand-cream/20 group-hover:scale-110 group-hover:bg-brand-earth transition-transform duration-300">
        <div className="w-5 h-5 rounded-full border border-dashed border-brand-bg/30 flex items-center justify-center">
          <Mail className="w-2.5 h-2.5 text-brand-bg" />
        </div>
      </div>

      {/* Label and triggers */}
      <div className="relative z-0 select-none">
        <span className="text-[9px] tracking-[0.25em] font-sans font-bold text-brand-earth uppercase">
          LETTER
        </span>
      </div>

      <div className="relative z-0 w-full pr-10 select-none">
        <h4 className="text-base font-serif font-medium text-brand-cream tracking-wide group-hover:text-brand-text transition-colors leading-snug">
          Open when {item.trigger}
        </h4>
        <span className="text-[10px] font-mono text-brand-muted/75 mt-1 block">
          Click to unseal
        </span>
      </div>
    </motion.button>
  );
};

const Station08_OpenWhen = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <StationWrapper
      id="open-when"
      stationNumber="08"
      title="Open When"
      subtitle="Folded notes for specific crossings on the road"
    >
      <div className="max-w-4xl w-full mx-auto">
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-8 max-w-lg">
          These envelopes contain short messages for particular moments during your journey. Open them only when you truly encounter the state written on the seal.
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

        {/* Parchment Letter Popup Modal */}
        <AnimatePresence>
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-bg/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedLetter(null)}
            >
              <motion.div
                initial={{ scale: 0.9, rotateX: 30 }}
                animate={{ scale: 1, rotateX: 0 }}
                exit={{ scale: 0.9, rotateX: 30 }}
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                className="w-full max-w-lg bg-[#faf8f2] border border-[#e5dfce] text-stone-850 p-6 md:p-8 rounded-lg shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Paper Lines Grid Graphic */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                  }}
                />

                {/* Close handle */}
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition-colors p-1.5 rounded-full hover:bg-stone-200 cursor-pointer"
                  aria-label="Close letter"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Unfolded Letter Header */}
                <div className="border-b border-stone-200 pb-3 mb-6 select-none">
                  <span className="text-[9px] tracking-[0.25em] font-sans font-bold text-stone-500 uppercase block mb-1">
                    UNSEALED LETTER
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-800 italic leading-snug">
                    {selectedLetter.title}
                  </h3>
                </div>

                {/* Letter Body Text */}
                <div className="font-serif text-stone-800 text-sm md:text-base leading-relaxed text-justify space-y-4 mb-6 italic">
                  <p>{selectedLetter.message}</p>
                </div>

                {/* Supportive Ritual Box */}
                <div className="bg-[#ede7d8] border border-[#dacfb7] rounded p-4 text-stone-800 select-none">
                  <div className="flex items-center gap-1.5 text-[9px] font-sans font-bold text-stone-600 uppercase tracking-widest mb-1.5">
                    <Check className="w-3.5 h-3.5 text-stone-600 stroke-[3]" />
                    Suggested Action
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

export default Station08_OpenWhen;
