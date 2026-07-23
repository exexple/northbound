import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import { ShieldCheck } from 'lucide-react';

const Station09_Departure = () => {
  const [departureState, setDepartureState] = useState('idle'); // 'idle' | 'departing' | 'departed'
  const [steamPuffs, setSteamPuffs] = useState([]);

  const triggerDeparture = () => {
    if (departureState !== 'idle') return;
    setDepartureState('departing');

    // Spawn steam puffs periodically
    let puffCount = 0;
    const interval = setInterval(() => {
      if (puffCount > 15) {
        clearInterval(interval);
        return;
      }
      setSteamPuffs((prev) => [
        ...prev,
        {
          id: puffCount++,
          x: 200 + (puffCount * 12), // moves with engine position
          y: 110,
        },
      ]);
    }, 250);

    // Transition to fully departed
    setTimeout(() => {
      setDepartureState('departed');
      clearInterval(interval);
    }, 4500);
  };

  return (
    <StationWrapper
      id="departure"
      stationNumber="09"
      title="Final Station // Departure"
      subtitle="The end of the line is where the loop begins"
    >
      <div className="max-w-3xl w-full mx-auto flex flex-col items-center select-none">
        
        {/* Cinematic Animation Terminal Frame */}
        <div className="w-full h-[280px] bg-[#070709] border border-brand-surface-light/50 rounded-lg relative overflow-hidden shadow-2xl flex flex-col justify-end">
          
          {/* Night Sky & Distant Mussoorie Ridge Silhouette */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0b0c10] to-[#040405] flex items-end">
            <svg className="w-full h-[80px] text-[#0d0e12] opacity-80" viewBox="0 0 500 80" preserveAspectRatio="none" fill="currentColor">
              <path d="M 0,80 L 0,40 C 50,30 80,45 120,35 C 170,25 210,50 280,30 C 350,15 400,35 500,20 L 500,80 Z" />
            </svg>
            {/* Shimmering stars (twinkles) */}
            <div className="absolute top-4 left-1/4 w-1 h-1 rounded-full bg-brand-cream/40 animate-pulse" />
            <div className="absolute top-10 right-1/3 w-0.5 h-0.5 rounded-full bg-brand-cream/30 animate-pulse delay-500" />
            <div className="absolute top-6 right-12 w-1.5 h-1.5 rounded-full bg-brand-cream/20 animate-pulse delay-1000" />
          </div>

          {/* Platform Lantern Glow (Warm diagonal light beams) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div 
              className="absolute top-0 left-12 w-32 h-[220px] origin-top opacity-10 transition-opacity duration-[3000ms]"
              style={{
                background: 'linear-gradient(135deg, rgba(235, 220, 185, 0.4) 0%, rgba(0,0,0,0) 80%)',
                opacity: departureState === 'departed' ? 0.03 : 0.12
              }}
            />
            <div 
              className="absolute top-0 right-24 w-32 h-[220px] origin-top opacity-10 transition-opacity duration-[3000ms]"
              style={{
                background: 'linear-gradient(135deg, rgba(235, 220, 185, 0.4) 0%, rgba(0,0,0,0) 80%)',
                opacity: departureState === 'departed' ? 0.03 : 0.12
              }}
            />
          </div>

          {/* Steam Puffs (Framer Motion circles floating up) */}
          <div className="absolute inset-0 z-25 pointer-events-none">
            {steamPuffs.map((puff) => (
              <motion.div
                key={puff.id}
                initial={{ x: puff.x, y: puff.y, scale: 0.4, opacity: 0.8 }}
                animate={{
                  x: puff.x - 60 - (departureState === 'departing' ? 120 : 0),
                  y: puff.y - 70,
                  scale: [0.4, 2.5, 4],
                  opacity: [0.8, 0.4, 0]
                }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                className="absolute w-5 h-5 bg-[#b5a396]/25 rounded-full blur-[4px]"
              />
            ))}
          </div>

          {/* SVG Train Carriage Rig */}
          <motion.div
            className="absolute bottom-[28px] left-0 z-20 flex items-end h-[60px]"
            animate={
              departureState === 'departing' 
                ? { x: [0, 20, 80, 240, 650] } 
                : departureState === 'departed' 
                ? { x: 650 } 
                : { x: 0 }
            }
            transition={
              departureState === 'departing' 
                ? { duration: 4.5, ease: [0.42, 0, 0.58, 1] } 
                : { duration: 0.1 }
            }
          >
            {/* The locomotive (Front Right) */}
            <div className="w-[120px] h-[50px] relative shrink-0">
              {/* Train Engine body */}
              <svg className="w-full h-full text-[#14161a]" viewBox="0 0 120 50" fill="currentColor">
                <rect x="0" y="10" width="80" height="32" rx="1" />
                <rect x="80" y="20" width="30" height="22" rx="1" />
                {/* Smokestack */}
                <rect x="95" y="5" width="8" height="15" rx="1" />
                <rect x="93" y="2" width="12" height="3" fill="#a87c66" />
                {/* Cabin roof */}
                <path d="M 0,10 L 40,10 L 35,5 L 5,5 Z" fill="#a87c66" />
                {/* Cabin Windows (Glowing warm light) */}
                <rect x="10" y="15" width="15" height="12" fill="#ebdcb9" rx="1" />
                <rect x="35" y="15" width="15" height="12" fill="#ebdcb9" rx="1" />
                {/* Iron wheels */}
                <circle cx="25" cy="45" r="5" fill="#2d3039" />
                <circle cx="55" cy="45" r="5" fill="#2d3039" />
                <circle cx="95" cy="45" r="5" fill="#2d3039" />
                {/* Connecting rod */}
                <line x1="25" y1="45" x2="95" y2="45" stroke="#a87c66" strokeWidth="1.5" />
              </svg>
              {/* Headlight beam */}
              <div 
                className="absolute right-[-60px] top-[18px] w-[60px] h-[20px] origin-left opacity-35"
                style={{
                  background: 'linear-gradient(to right, rgba(235, 220, 185, 0.8) 0%, rgba(0,0,0,0) 100%)',
                  clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 70%)'
                }}
              />
            </div>

            {/* Coupling link */}
            <div className="w-3 h-1 bg-[#23262f] mb-3 shrink-0" />

            {/* Passenger Carriage (Left) */}
            <div className="w-[160px] h-[46px] relative shrink-0">
              <svg className="w-full h-full text-[#14161a]" viewBox="0 0 160 46" fill="currentColor">
                <rect x="0" y="4" width="160" height="36" rx="2" stroke="#222" strokeWidth="0.5" />
                {/* Roof strip */}
                <rect x="5" y="0" width="150" height="4" fill="#a87c66" rx="1" />
                {/* Glowing Passenger Windows */}
                <rect x="15" y="12" width="18" height="14" fill="#ebdcb9" rx="1" />
                <rect x="42" y="12" width="18" height="14" fill="#ebdcb9" rx="1" />
                <rect x="69" y="12" width="18" height="14" fill="#ebdcb9" rx="1" />
                <rect x="96" y="12" width="18" height="14" fill="#ebdcb9" rx="1" />
                <rect x="123" y="12" width="18" height="14" fill="#ebdcb9" rx="1" />
                {/* Carriage Wheels */}
                <circle cx="30" cy="42" r="4" fill="#2d3039" />
                <circle cx="130" cy="42" r="4" fill="#2d3039" />
              </svg>
            </div>
          </motion.div>

          {/* Platform Floor & Rails */}
          <div className="h-[28px] w-full bg-[#111216] z-30 border-t border-brand-surface-light/45 flex flex-col justify-between py-1 relative">
            {/* Wooden ties and iron rail lines */}
            <div className="w-full h-[4px] bg-[#1a1b22] border-y border-[#000]" />
            <div className="w-full h-[2px] bg-brand-surface-light/45" />

            {/* Platform Silhouettes (Lamppost on left and right) */}
            <div className="absolute bottom-6 left-12 w-6 h-56 z-25 text-[#131417]">
              <svg className="w-full h-full" viewBox="0 0 20 180" fill="currentColor">
                <rect x="9" y="0" width="2" height="180" />
                {/* Lantern fixture */}
                <path d="M 5,20 L 15,20 L 12,0 L 8,0 Z" fill="#ebdcb9" fillOpacity={departureState === 'departed' ? 0.3 : 1} />
                <polygon points="10,0 5,20 15,20" />
              </svg>
            </div>
            <div className="absolute bottom-6 right-24 w-6 h-56 z-25 text-[#131417]">
              <svg className="w-full h-full" viewBox="0 0 20 180" fill="currentColor">
                <rect x="9" y="0" width="2" height="180" />
                <path d="M 5,20 L 15,20 L 12,0 L 8,0 Z" fill="#ebdcb9" fillOpacity={departureState === 'departed' ? 0.3 : 1} />
                <polygon points="10,0 5,20 15,20" />
              </svg>
            </div>
          </div>
        </div>

        {/* Console Controls */}
        <div className="mt-8 min-h-[80px] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {departureState === 'idle' && (
              <motion.button
                key="lever-idle"
                onClick={triggerDeparture}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="px-6 py-2.5 bg-brand-surface-light border border-brand-earth/30 hover:border-brand-earth text-brand-text text-[10px] tracking-widest uppercase font-semibold rounded cursor-pointer transition-all duration-300"
              >
                Pull Departure Lever
              </motion.button>
            )}

            {departureState === 'departing' && (
              <motion.div
                key="lever-departing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] tracking-[0.25em] font-sans font-bold text-brand-earth uppercase animate-pulse"
              >
                THE DEHRADUN MAIL IS DEPARTING...
              </motion.div>
            )}

            {departureState === 'departed' && (
              <motion.div
                key="lever-departed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="flex flex-col items-center text-center max-w-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-earth mb-3 animate-ping" />
                <p className="font-serif text-brand-text italic text-base md:text-lg mb-1 leading-relaxed">
                  "The tracks disappear into the hills."
                </p>
                <p className="text-[10px] tracking-widest font-sans font-medium text-brand-muted uppercase">
                  Safe journey. A new chapter begins.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </StationWrapper>
  );
};

export default Station09_Departure;
