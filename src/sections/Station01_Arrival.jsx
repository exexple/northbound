import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

const Station01_Arrival = ({ onStartJourney }) => {
  return (
    <section
      id="arrival"
      className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden px-6 py-20 border-b border-brand-surface-light/30"
    >
      {/* Cinematic Background Light & Fog */}
      <div className="absolute inset-0 bg-[#070708] z-0 pointer-events-none">
        {/* Glowing Rail Line Energy (SVG lines fading into the distance) */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] opacity-[0.06] text-brand-earth" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 50,100 L 0,0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50,100 L 100,0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50,100 L 25,0" stroke="currentColor" strokeWidth="0.25" />
          <path d="M 50,100 L 75,0" stroke="currentColor" strokeWidth="0.25" />
          <path d="M 50,100 L 50,0" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" />
        </svg>

        {/* Slow Ambient Floating Fog Layers (Framer Motion) */}
        <motion.div
          className="glow-effect w-[600px] h-[300px] bg-brand-earth/10 top-1/4 left-[-100px]"
          animate={{
            x: [0, 80, -20, 0],
            y: [0, 30, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="glow-effect w-[500px] h-[250px] bg-brand-cream/5 bottom-1/4 right-[-100px]"
          animate={{
            x: [0, -60, 40, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="max-w-2xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Soft, premium brand header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 p-3 rounded-full border border-brand-earth/20 bg-brand-surface/40 backdrop-blur-md"
        >
          <Compass className="w-5 h-5 text-brand-earth animate-spin-slow" />
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

        {/* Poetic description */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-brand-muted font-light text-base md:text-lg leading-relaxed max-w-lg mb-12"
        >
          <p className="mb-4">
            A digital companion for a new chapter in the valley.
          </p>
          <p className="text-sm italic font-serif text-brand-cream/70">
            The train rolls out of the plains. As the tracks begin to climb, the air grows cooler, smelling of rain and fresh pine.
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ delay: 1.5, duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 select-none pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-brand-muted">Scroll</span>
        <div className="w-[1px] h-8 bg-brand-muted/30 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-earth"
            animate={{ y: ['0%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Station01_Arrival;
