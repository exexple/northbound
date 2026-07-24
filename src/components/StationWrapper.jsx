import React from 'react';
import { motion } from 'framer-motion';

const StationWrapper = ({ id, stationNumber, title, subtitle, children, className = '' }) => {
  return (
    <section
      id={id}
      className={`min-h-screen py-24 lg:py-32 flex flex-col justify-center relative ${className}`}
    >
      {/* Atmospheric section divider */}
      <div className="station-divider absolute top-0 left-0 w-full" />

      {/* Editorial Station Header */}
      <div className="max-w-4xl mx-auto w-full px-6 mb-12 lg:mb-16 select-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 text-xs tracking-[0.25em] font-medium"
        >
          <span className="text-brand-earth font-semibold font-sans uppercase">STATION {stationNumber}</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-surface-light via-brand-surface-light/60 to-transparent" />
          <span className="text-brand-cream/70 font-serif italic text-sm">{subtitle}</span>
        </motion.div>
        
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl lg:text-4xl font-serif text-brand-text mt-3 font-normal tracking-wide"
          >
            {title}
          </motion.h2>
        )}
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto w-full px-6 flex-1 flex flex-col justify-center"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default React.memo(StationWrapper);
