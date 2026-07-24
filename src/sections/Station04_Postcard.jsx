import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import postcardData from '../data/postcard';
import { RotateCw, Stamp } from 'lucide-react';

const Station04_Postcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  // Tilt interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <StationWrapper
      id="postcard"
      stationNumber="04"
      title="Digital Postcard"
      subtitle="A keepsake to carry in your pocket"
    >
      <div className="max-w-xl w-full mx-auto flex flex-col items-center">
        <p className="text-brand-muted text-xs italic font-serif mb-8 select-none flex items-center gap-2">
          <RotateCw className="w-3.5 h-3.5 text-brand-earth animate-spin-slow" />
          Click the card to flip it over
        </p>

        {/* 3D Card Container */}
        <div 
          ref={cardRef}
          className="w-full h-[340px] md:h-[380px] cursor-pointer relative select-none"
          style={{ perspective: 1400 }}
          onClick={() => setIsFlipped(!isFlipped)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="w-full h-full relative"
            style={{
              transformStyle: 'preserve-3d',
              rotateX: isFlipped ? 0 : rotateX,
              rotateY: isFlipped ? 0 : rotateY,
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* FRONT OF POSTCARD */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-brand-earth/30 bg-[#0f1013] flex flex-col justify-between p-6 md:p-7 shadow-2xl shadow-black/60"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Paper texture */}
              <div className="absolute inset-0 paper-texture pointer-events-none" />

              {/* Gold foil border rim */}
              <div className="absolute inset-2 border border-brand-earth/20 rounded-xl pointer-events-none" />

              {/* Top header */}
              <div className="flex justify-between items-center select-none relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-earth" />
                  <span className="text-[9px] tracking-[0.3em] font-sans font-bold text-brand-earth uppercase">
                    POSTCARD / CARTE POSTALE
                  </span>
                </div>
                <span className="text-[10px] font-serif text-brand-cream/80 italic bg-brand-surface/80 px-2 py-0.5 rounded border border-brand-surface-light/40">
                  No. 004
                </span>
              </div>

              {/* Scenic Vector SVG Art */}
              <div className="flex-1 my-4 relative rounded-lg overflow-hidden bg-gradient-to-b from-[#090a0d] to-[#12141a] border border-brand-surface-light/40 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full text-brand-earth/15" viewBox="0 0 300 150" preserveAspectRatio="none" fill="none">
                  {/* Moon / Sun */}
                  <circle cx="150" cy="40" r="16" fill="#ebdcb9" fillOpacity="0.15" />
                  <circle cx="150" cy="40" r="24" fill="#ebdcb9" fillOpacity="0.05" />
                  
                  {/* Mountain peaks */}
                  <path d="M 0,150 L 80,55 L 160,110 L 240,35 L 300,100 L 300,150 Z" fill="currentColor" fillOpacity="0.4" />
                  <path d="M 0,150 L 50,85 L 120,45 L 200,120 L 300,65 L 300,150 Z" fill="currentColor" fillOpacity="0.2" />

                  {/* Railway track perspective */}
                  <line x1="150" y1="110" x2="0" y2="150" stroke="#a87c66" strokeWidth="0.5" opacity="0.3" />
                  <line x1="150" y1="110" x2="300" y2="150" stroke="#a87c66" strokeWidth="0.5" opacity="0.3" />
                  
                  {/* Train silhouette */}
                  <rect x="175" y="102" width="28" height="5" fill="#a87c66" opacity="0.6" rx="1" />
                  <rect x="206" y="103" width="12" height="4" fill="#a87c66" opacity="0.6" rx="1" />
                  <rect x="220" y="103" width="12" height="4" fill="#a87c66" opacity="0.6" rx="1" />
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none pointer-events-none px-4 z-10">
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-cream font-normal tracking-widest mb-1.5 drop-shadow-md">
                    DEHRADUN EXPRESS
                  </h3>
                  <div className="w-12 h-[1px] bg-brand-earth/40 mx-auto mb-1.5" />
                  <p className="text-[9px] font-sans tracking-[0.3em] text-brand-earth uppercase font-semibold">
                    Bound for the foothills
                  </p>
                </div>
              </div>

              {/* Flip action footer */}
              <div className="flex justify-between items-center text-brand-muted text-[10px] select-none relative z-10">
                <span className="font-serif italic text-brand-muted/70">© {new Date().getFullYear()} Northbound Keepsake</span>
                <span className="flex items-center gap-1.5 text-brand-earth font-bold tracking-wider">
                  <RotateCw className="w-3.5 h-3.5" />
                  FLIP TO READ
                </span>
              </div>
            </div>

            {/* BACK OF POSTCARD */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-brand-earth/30 bg-[#121317] flex flex-col justify-between p-6 md:p-7 shadow-2xl shadow-black/60"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              {/* Paper texture */}
              <div className="absolute inset-0 paper-texture pointer-events-none" />

              {/* Gold border */}
              <div className="absolute inset-2 border border-brand-earth/15 rounded-xl pointer-events-none" />

              <div className="flex-1 flex gap-6 min-h-0 relative z-10">
                {/* Left Side: Message */}
                <div className="flex-[1.35] flex flex-col justify-center border-r border-brand-surface-light/60 pr-5">
                  <span className="text-[9px] font-mono text-brand-earth font-semibold tracking-wider mb-1.5 block select-none">
                    {postcardData.date}
                  </span>
                  <span className="text-xs font-serif text-brand-cream italic mb-2 block select-none">
                    {postcardData.recipient},
                  </span>
                  <p className="text-brand-text font-serif text-xs md:text-sm leading-relaxed italic pr-2 overflow-y-auto max-h-[190px]">
                    {postcardData.message}
                  </p>
                  <span className="text-xs font-serif text-brand-earth italic mt-3 text-right block select-none font-semibold">
                    — {postcardData.signature}
                  </span>
                </div>

                {/* Right Side: Vintage Stamp & Address */}
                <div className="flex-1 flex flex-col justify-between py-1 select-none">
                  {/* Vintage Postal Stamp */}
                  <div className="flex justify-end">
                    <div className="w-18 h-22 border-2 border-dashed border-brand-earth/40 rounded-md p-1.5 flex flex-col items-center justify-between text-center relative overflow-hidden bg-brand-surface/90 shadow-inner">
                      <div className="w-7 h-7 border border-brand-earth/30 rounded-full flex items-center justify-center text-[7px] font-mono text-brand-earth opacity-70">
                        {postcardData.postmark}
                      </div>
                      <span className="text-[7px] font-sans font-bold text-brand-cream tracking-tighter leading-none mt-1">
                        {postcardData.stampText}
                      </span>
                      <span className="text-[6px] text-brand-earth font-mono font-bold">POSTAGE PAID</span>
                    </div>
                  </div>

                  {/* Address lines */}
                  <div className="space-y-3 font-serif italic text-xs text-brand-muted/90 mt-2">
                    <div className="border-b border-brand-surface-light/60 pb-1 text-brand-cream/90">For the Girl Heading North</div>
                    <div className="border-b border-brand-surface-light/60 pb-1 text-brand-cream/80">The Cozy Dorm Nook</div>
                    <div className="pb-1 text-brand-cream/70">Dehradun, Uttarakhand</div>
                  </div>
                </div>
              </div>

              {/* Footer flip prompt */}
              <div className="flex justify-end text-brand-muted text-[10px] select-none pt-2 border-t border-brand-surface-light/30 relative z-10">
                <span className="flex items-center gap-1.5 text-brand-earth font-bold tracking-wider">
                  <RotateCw className="w-3.5 h-3.5" />
                  FLIP OVER
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </StationWrapper>
  );
};

export default React.memo(Station04_Postcard);

