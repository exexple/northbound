import React from 'react';
import { motion } from 'framer-motion';

const Station01_Arrival = ({ onStartJourney }) => {
  return (
    <section
      id="arrival"
      className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden px-6 py-20"
    >
      {/* Cinematic Background — layered fog and atmospheric light */}
      <div className="absolute inset-0 bg-[#070709] z-0 pointer-events-none">
        {/* Light beam sweep from top right */}
        <div
          className="absolute -top-[20%] right-[-10%] w-[600px] h-[800px] origin-top-right opacity-[0.04] blur-[60px]"
          style={{
            background: 'linear-gradient(135deg, rgba(235, 220, 185, 0.4) 0%, rgba(168, 124, 102, 0.2) 50%, transparent 100%)',
            animation: 'beam-sweep 18s ease-in-out infinite alternate',
          }}
        />

        {/* Glowing Rail Line Energy (SVG lines fading into the distance) */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] h-[55vh] opacity-[0.08] text-brand-earth" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 50,100 L 0,0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50,100 L 100,0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50,100 L 25,0" stroke="currentColor" strokeWidth="0.25" />
          <path d="M 50,100 L 75,0" stroke="currentColor" strokeWidth="0.25" />
          <path d="M 50,100 L 50,0" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" />
        </svg>

        {/* CSS-animated ambient fog layers */}
        <div
          className="absolute w-[550px] h-[280px] rounded-full top-1/4 left-[-120px] opacity-[0.07] blur-[90px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(168, 124, 102, 0.45), transparent)',
            animation: 'ambient-float 24s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[450px] h-[220px] rounded-full bottom-1/4 right-[-100px] opacity-[0.05] blur-[90px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(235, 220, 185, 0.35), transparent)',
            animation: 'ambient-float 28s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] blur-[110px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(168, 124, 102, 0.35), transparent)',
            animation: 'ambient-drift 22s ease-in-out infinite',
          }}
        />

        {/* Subtle twinkling starlight particles */}
        <div className="absolute top-[14%] left-[18%] w-1 h-1 rounded-full bg-brand-cream/25 shadow-[0_0_6px_#ebdcb9]" style={{ animation: 'twinkle 4s ease-in-out infinite' }} />
        <div className="absolute top-[22%] right-[28%] w-0.5 h-0.5 rounded-full bg-brand-cream/20" style={{ animation: 'twinkle 5s ease-in-out infinite 1s' }} />
        <div className="absolute top-[9%] right-[14%] w-1 h-1 rounded-full bg-brand-cream/15" style={{ animation: 'twinkle 6s ease-in-out infinite 2s' }} />
        <div className="absolute top-[32%] left-[38%] w-0.5 h-0.5 rounded-full bg-brand-cream/25" style={{ animation: 'twinkle 4.5s ease-in-out infinite 0.5s' }} />
        <div className="absolute top-[18%] left-[62%] w-1 h-1 rounded-full bg-brand-cream/20" style={{ animation: 'twinkle 5.5s ease-in-out infinite 1.2s' }} />
      </div>

      {/* Hero Content */}
      <div className="max-w-2xl mx-auto text-center z-10 flex flex-col items-center" style={{ perspective: '1000px' }}>
        {/* Soft compass icon with glowing ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative group cursor-pointer"
        >
          <div className="absolute -inset-1 rounded-full bg-brand-earth/20 blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
          <div className="w-14 h-14 rounded-full border border-brand-earth/30 bg-brand-surface/40 backdrop-blur-md flex items-center justify-center shadow-2xl relative">
            <svg className="w-6 h-6 text-brand-earth animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.35" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          </div>
        </motion.div>

        {/* Small station departure badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface/60 border border-brand-earth/20 text-[10px] tracking-[0.25em] text-brand-earth uppercase font-semibold mb-6 shadow-inner"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-earth animate-pulse" />
          Platform 01 • Northbound Line
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl md:text-8xl font-normal text-transparent bg-clip-text bg-gradient-to-b from-brand-text via-brand-text/95 to-brand-cream/70 tracking-wide mb-6 leading-none select-none drop-shadow-sm"
        >
          Northbound
        </motion.h1>

        {/* Poetic description — warm and editorial */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-brand-muted font-light text-base md:text-lg leading-relaxed max-w-md mb-10"
        >
          <p className="mb-3 text-brand-text/90 font-medium">
            A small, curated companion for the next chapter.
          </p>
          <p className="text-sm italic font-serif text-brand-cream/70 leading-normal">
            The tracks begin to climb. The air grows cooler, smelling of pine needles and the first rain of the valley.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={onStartJourney}
          className="group relative px-9 py-4 bg-brand-surface/90 border border-brand-earth/40 hover:border-brand-earth text-brand-text text-xs tracking-[0.25em] uppercase font-semibold rounded-md transition-all duration-500 overflow-hidden cursor-pointer shadow-xl shadow-black/40 hover:shadow-brand-earth/15"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-brand-earth/10 via-brand-earth/20 to-brand-earth/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative flex items-center gap-2.5">
            Begin the Journey
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="text-brand-earth text-sm"
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
        <span className="text-[9px] tracking-[0.3em] uppercase text-brand-muted/60 font-semibold">Scroll</span>
        <div className="w-[1px] h-9 bg-brand-muted/20 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-brand-earth to-brand-cream/60"
            style={{ animation: 'ambient-drift 2.2s ease-in-out infinite alternate' }}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Station01_Arrival);

