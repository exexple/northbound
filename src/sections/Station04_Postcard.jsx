import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import postcardData from '../data/postcard';
import { RotateCw } from 'lucide-react';

const Station04_Postcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  // Tilt interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

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
        <p className="text-brand-muted text-xs italic font-serif mb-6 select-none">
          Click the card to flip it over
        </p>

        {/* 3D Card Container */}
        <div 
          ref={cardRef}
          className="w-full h-[320px] md:h-[360px] cursor-pointer relative"
          style={{ perspective: 1200 }}
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* FRONT OF POSTCARD */}
            <div
              className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-brand-surface-light/40 bg-[#0f1013] flex flex-col justify-between p-6 shadow-2xl shadow-black/40"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Paper texture */}
              <div className="absolute inset-0 paper-texture pointer-events-none" />

              {/* Top border text */}
              <div className="flex justify-between items-center select-none relative">
                <span className="text-[9px] tracking-[0.3em] font-sans font-bold text-brand-earth uppercase">
                  POSTCARD / CARTE POSTALE
                </span>
                <span className="text-[10px] font-serif text-brand-cream/70 italic">No. 004</span>
              </div>

              {/* Scenic Vector SVG */}
              <div className="flex-1 my-4 relative rounded-md overflow-hidden bg-brand-bg flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full text-brand-earth/10" viewBox="0 0 300 150" preserveAspectRatio="none" fill="none">
                  <circle cx="150" cy="45" r="14" fill="#ebdcb9" fillOpacity="0.12" />
                  <path d="M 0,150 L 80,60 L 160,110 L 240,40 L 300,100 L 300,150 Z" fill="currentColor" fillOpacity="0.35" />
                  <path d="M 0,150 L 50,90 L 120,50 L 200,120 L 300,70 L 300,150 Z" fill="currentColor" fillOpacity="0.15" />
                  {/* Train silhouette */}
                  <rect x="180" y="105" width="25" height="4" fill="#a87c66" opacity="0.5" rx="1" />
                  <rect x="207" y="106" width="10" height="3" fill="#a87c66" opacity="0.5" rx="1" />
                  <rect x="219" y="106" width="10" height="3" fill="#a87c66" opacity="0.5" rx="1" />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none pointer-events-none px-4">
                  <h3 className="font-serif text-xl md:text-2xl text-brand-text font-normal tracking-widest mb-1">
                    DEHRADUN EXPRESS
                  </h3>
                  <p className="text-[9px] font-sans tracking-[0.25em] text-brand-muted uppercase">
                    Bound for the foothills
                  </p>
                </div>
              </div>

              {/* Flip action footer */}
              <div className="flex justify-between items-center text-brand-muted text-[10px] select-none relative">
                <span className="font-serif italic text-brand-muted/60">© {new Date().getFullYear()}</span>
                <span className="flex items-center gap-1.5 text-brand-earth font-medium">
                  <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                  FLIP TO READ
                </span>
              </div>
            </div>

            {/* BACK OF POSTCARD */}
            <div
              className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-brand-surface-light/40 bg-[#121316] flex flex-col justify-between p-6 shadow-2xl shadow-black/40"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              {/* Paper texture */}
              <div className="absolute inset-0 paper-texture pointer-events-none" />

              <div className="flex-1 flex gap-6 min-h-0 relative">
                {/* Left Side: Message */}
                <div className="flex-[1.2] flex flex-col justify-center border-r border-brand-surface-light/40 pr-6">
                  <span className="text-[9px] font-mono text-brand-earth/70 tracking-wider mb-2 block select-none">
                    {postcardData.date}
                  </span>
                  <span className="text-xs font-serif text-brand-cream italic mb-2 block select-none">
                    {postcardData.recipient},
                  </span>
                  <p className="text-brand-text font-serif text-xs md:text-sm leading-relaxed italic pr-2 overflow-y-auto max-h-[180px]">
                    {postcardData.message}
                  </p>
                  <span className="text-xs font-serif text-brand-earth italic mt-3 text-right block select-none">
                    — {postcardData.signature}
                  </span>
                </div>

                {/* Right Side: Stamp and Address */}
                <div className="flex-1 flex flex-col justify-between py-2 select-none">
                  {/* Vintage Postal Stamp */}
                  <div className="flex justify-end">
                    <div className="w-16 h-20 border-2 border-dashed border-brand-earth/30 rounded p-1 flex flex-col items-center justify-between text-center relative overflow-hidden bg-brand-surface">
                      <div className="w-6 h-6 border border-brand-earth/20 rounded-full flex items-center justify-center text-[7px] font-mono text-brand-earth opacity-50">
                        {postcardData.postmark}
                      </div>
                      <span className="text-[6px] font-sans font-bold text-brand-cream/70 tracking-tighter leading-none mt-1">
                        {postcardData.stampText}
                      </span>
                      <span className="text-[5px] text-brand-muted/60">POSTAGE PAID</span>
                    </div>
                  </div>

                  {/* Address lines */}
                  <div className="space-y-3 font-serif italic text-xs text-brand-muted/90 mt-4">
                    <div className="border-b border-brand-surface-light/50 pb-1">For the Girl Heading North</div>
                    <div className="border-b border-brand-surface-light/50 pb-1">The Cozy Dorm Nook</div>
                    <div className="pb-1">Dehradun, Uttarakhand</div>
                  </div>
                </div>
              </div>

              {/* Footer flip prompt */}
              <div className="flex justify-end text-brand-muted text-[10px] select-none pt-2 border-t border-brand-surface-light/25 relative">
                <span className="flex items-center gap-1 text-brand-earth font-medium">
                  <RotateCw className="w-3 h-3" />
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
