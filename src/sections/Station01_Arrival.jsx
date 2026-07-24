import React from 'react';
import { motion } from 'framer-motion';

const Station01_Arrival = ({ onStartJourney }) => {
  return (
    <section
      id="arrival"
      className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden px-6 py-20"
    >
      {/* Cinematic Background — layered fog and atmospheric light */}
      <div className="absolute inset-0 bg-[#070708] z-0 pointer-events-none">
        {/* Glowing Rail Line Energy (SVG lines fading into the distance) */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] opacity-[0.06] text-brand-earth" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 50,100 L 0,0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50,100 L 100,0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50,100 L 25,0" stroke="currentColor" strokeWidth="0.25" />
          <path d="M 50,100 L 75,0" stroke="currentColor" strokeWidth="0.25" />
          <path d="M 50,100 L 50,0" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" />
        </svg>

        {/* CSS-animated ambient fog layers — performant, no JS */}
        <div
          className="absolute w-[500px] h-[250px] rounded-full top-1/4 left-[-100px] opacity-[0.06] blur-[80px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(168, 124, 102, 0.4), transparent)',
            animation: 'ambient-float 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[200px] rounded-full bottom-1/4 right-[-80px] opacity-[0.04] blur-[80px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(235, 220, 185, 0.3), transparent)',
            animation: 'ambient-float 30s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] blur-[100px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(168, 124, 102, 0.3), transparent)',
            animation: 'ambient-drift 20s ease-in-out infinite',
          }}
        />

        {/* Subtle twinkling stars / particles */}
        <div className="absolute top-[15%] left-[20%] w-1 h-1 rounded-full bg-brand-cream/20" style={{ animation: 'twinkle 4s ease-in-out infinite' }} />
        <div className="absolute top-[25%] right-[30%] w-0.5 h-0.5 rounded-full bg-brand-cream/15" style={{ animation: 'twinkle 5s ease-in-out infinite 1s' }} />
        <div className="absolute top-[10%] right-[15%] w-1 h-1 rounded-full bg-brand-cream/10" style={{ animation: 'twinkle 6s ease-in-out infinite 2s' }} />
        <div className="absolute top-[30%] left-[40%] w-0.5 h-0.5 rounded-full bg-brand-cream/20" style={{ animation: 'twinkle 4.5s ease-in-out infinite 0.5s' }} />
      </div>

      {/* Hero Content */}
      <div className="max-w-2xl mx-auto text-center z-10 flex flex-col items-center" style={{ perspective: '1000px' }}>
        {/* Soft compass icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <div className="w-12 h-12 rounded-full border border-brand-earth/20 bg-brand-surface/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-brand-earth/5">
            <svg className="w-5 h-5 text-brand-earth animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.3" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl font-normal text-brand-text tracking-wide mb-6 leading-tight"
        >
          Northbound
        </motion.h1>

        {/* Poetic description — warmer, more intimate */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-brand-muted font-light text-base md:text-lg leading-relaxed max-w-md mb-12"
        >
          <p className="mb-4">
            A small, curated companion for the next chapter.
          </p>
          <p className="text-sm italic font-serif text-brand-cream/60">
            The tracks begin to climb. The air grows cooler, smelling of pine and the first rain of the valley.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={onStartJourney}
          className="group relative px-8 py-3.5 bg-brand-surface border border-brand-earth/30 hover:border-brand-earth text-brand-text text-xs tracking-[0.2em] uppercase font-medium rounded transition-all duration-500 overflow-hidden cursor-pointer shadow-lg hover:shadow-brand-earth/10"
        >
          <span className="absolute inset-0 bg-brand-earth/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative flex items-center gap-2">
            Begin the Journey
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </div>

      {/* Soft Scroll Down Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 select-none pointer-events-none"
        style={{ animation: 'gentle-pulse 3s ease-in-out infinite' }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-brand-muted/50">Scroll</span>
        <div className="w-[1px] h-8 bg-brand-muted/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-earth/60"
            style={{ animation: 'ambient-drift 2s ease-in-out infinite alternate' }}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Station01_Arrival);
