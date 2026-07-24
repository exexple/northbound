import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Station09_Departure = () => {
  const [departureState, setDepartureState] = useState('idle'); // 'idle' | 'arriving' | 'boarding' | 'departing' | 'departed'
  const [trainX, setTrainX] = useState(-550); // train starts off-screen left
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const [lanternGlow, setLanternGlow] = useState(1);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  const triggerDeparture = useCallback(() => {
    if (departureState !== 'idle') return;
    setDepartureState('arriving');

    // Phase 1: Train arrives from left (0-3s)
    setTrainX(-550);
    startTimeRef.current = performance.now();

    const animate = (now) => {
      const elapsed = (now - startTimeRef.current) / 1000;

      if (elapsed < 3) {
        // Arriving: train slides in from left to center
        const progress = Math.min(elapsed / 3, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setTrainX(-550 + (550 * eased)); // moves to x=0 (centered)
        animFrameRef.current = requestAnimationFrame(animate);
      } else if (elapsed < 5) {
        // Boarding: train sits at platform (3s-5s)
        setTrainX(0);
        if (departureState !== 'boarding') {
          setDepartureState('boarding');
        }
        animFrameRef.current = requestAnimationFrame(animate);
      } else if (elapsed < 9) {
        // Departing: train accelerates right (5s-9s)
        setDepartureState('departing');
        const departProgress = (elapsed - 5) / 4;
        const eased = departProgress * departProgress * departProgress; // ease-in cubic (acceleration)
        setTrainX(eased * 1300); // accelerates off screen right
        setLanternGlow(Math.max(0.2, 1 - departProgress * 0.8));
        animFrameRef.current = requestAnimationFrame(animate);
      } else if (elapsed < 11) {
        // Post-departure: quiet platform (9s-11s)
        setTrainX(1300);
        setDepartureState('departed');
        setLanternGlow(0.25);
        setSceneOpacity(Math.max(0.6, 1 - (elapsed - 9) * 0.2));
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Final: show message
        setShowFinalMessage(true);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [departureState]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const isDeparting = departureState === 'departing';
  const trainBlur = isDeparting ? Math.min(trainX / 300, 3) : 0;

  return (
    <section
      id="departure"
      className="min-h-screen py-24 lg:py-32 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Atmospheric section divider */}
      <div className="station-divider absolute top-0 left-0 w-full z-10" />

      {/* Subtle ambient station glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-earth/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto w-full px-6 mb-10 lg:mb-14 select-none relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 text-xs tracking-[0.25em] font-medium"
        >
          <span className="text-brand-earth font-semibold font-sans uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-earth animate-pulse inline-block" />
            FINAL STATION
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-earth/30 via-brand-surface-light/60 to-transparent" />
          <span className="text-brand-cream/80 font-serif italic text-sm md:text-base">The end of the line is where the loop begins</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-serif text-brand-text mt-3 font-normal tracking-wide leading-tight"
        >
          Departure
        </motion.h2>
      </div>

      {/* Cinematic Scene Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto w-full px-6 relative z-10"
      >
        <div className="max-w-3xl w-full mx-auto flex flex-col items-center select-none">
          
          {/* Cinematic Animation Frame Box */}
          <div
            className="w-full h-[320px] md:h-[380px] bg-[#050508] border border-brand-earth/25 rounded-2xl relative overflow-hidden shadow-2xl shadow-black/80"
            style={{ opacity: sceneOpacity, transition: 'opacity 2s ease' }}
          >
            
            {/* Night Sky */}
            <div className="absolute inset-0 z-0">
              {/* Sky gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#070912] via-[#090b14] to-[#050508]" />
              
              {/* Stars */}
              <div className="absolute top-[8%] left-[15%] w-1 h-1 rounded-full bg-brand-cream/30 shadow-[0_0_6px_#ebdcb9]" style={{ animation: 'twinkle 4s ease-in-out infinite' }} />
              <div className="absolute top-[12%] right-[25%] w-0.5 h-0.5 rounded-full bg-brand-cream/25" style={{ animation: 'twinkle 5s ease-in-out infinite 1s' }} />
              <div className="absolute top-[5%] right-[10%] w-1 h-1 rounded-full bg-brand-cream/20" style={{ animation: 'twinkle 6s ease-in-out infinite 2s' }} />
              <div className="absolute top-[15%] left-[45%] w-0.5 h-0.5 rounded-full bg-brand-cream/25" style={{ animation: 'twinkle 4.5s ease-in-out infinite 0.5s' }} />
              <div className="absolute top-[7%] left-[70%] w-1 h-1 rounded-full bg-brand-cream/15" style={{ animation: 'twinkle 5.5s ease-in-out infinite 1.5s' }} />
              <div className="absolute top-[18%] left-[30%] w-0.5 h-0.5 rounded-full bg-brand-cream/20" style={{ animation: 'twinkle 7s ease-in-out infinite 0.8s' }} />
            </div>

            {/* Mountain Silhouettes — layered parallax */}
            <div className="absolute inset-0 z-[1]">
              {/* Far mountains (dark) */}
              <svg className="absolute bottom-[30%] w-full h-[40%] text-[#090b12]" viewBox="0 0 600 100" preserveAspectRatio="none" fill="currentColor">
                <path d="M 0,100 L 0,55 C 40,45 70,60 120,40 C 180,20 230,55 300,30 C 370,10 420,40 500,25 C 550,18 580,35 600,28 L 600,100 Z" />
              </svg>
              {/* Near mountains */}
              <svg className="absolute bottom-[25%] w-full h-[35%] text-[#0c0e17]" viewBox="0 0 600 100" preserveAspectRatio="none" fill="currentColor">
                <path d="M 0,100 L 0,60 C 50,50 90,65 150,45 C 210,30 260,50 320,35 C 380,25 430,45 500,30 C 560,22 590,38 600,32 L 600,100 Z" />
              </svg>
              {/* Tree line */}
              <svg className="absolute bottom-[22%] w-full h-[15%] text-[#0f111c]" viewBox="0 0 600 40" preserveAspectRatio="none" fill="currentColor">
                <path d="M 0,40 L 0,20 C 10,18 15,8 20,15 C 25,5 30,12 35,8 C 40,15 45,10 50,18 C 55,5 60,15 65,8 C 70,18 75,12 80,15 C 85,5 90,18 95,10 C 100,20 105,8 110,15 C 120,5 130,18 140,10 C 150,15 160,5 170,18 C 180,8 190,15 200,10 C 210,18 220,5 230,15 C 240,10 250,18 260,8 C 270,15 280,10 290,18 C 300,5 310,15 320,8 C 330,18 340,10 350,15 C 360,5 370,18 380,10 C 390,15 400,8 410,18 C 420,5 430,15 440,10 C 450,18 460,8 470,15 C 480,5 490,18 500,10 C 510,15 520,8 530,18 C 540,5 550,15 560,10 C 570,18 580,12 590,15 C 595,10 598,18 600,15 L 600,40 Z" />
              </svg>
            </div>

            {/* Platform Lantern Light Beams */}
            <div className="absolute inset-0 z-[5] pointer-events-none" style={{ opacity: lanternGlow, transition: 'opacity 1s ease' }}>
              <div
                className="absolute top-0 left-[8%] w-32 h-[75%] origin-top"
                style={{
                  background: 'linear-gradient(170deg, rgba(235, 220, 185, 0.1) 0%, rgba(0,0,0,0) 70%)',
                }}
              />
              <div
                className="absolute top-0 right-[15%] w-28 h-[70%] origin-top"
                style={{
                  background: 'linear-gradient(190deg, rgba(235, 220, 185, 0.08) 0%, rgba(0,0,0,0) 70%)',
                }}
              />
            </div>

            {/* Subtle smoke / mist near tracks */}
            <div className="absolute bottom-[18%] left-0 w-full h-[15%] z-[8] pointer-events-none">
              <div
                className="absolute bottom-0 left-[-10%] w-[40%] h-full bg-brand-cream/[0.03] rounded-full blur-[25px]"
                style={{ animation: 'ambient-drift 15s ease-in-out infinite' }}
              />
              <div
                className="absolute bottom-0 right-[-5%] w-[35%] h-full bg-brand-cream/[0.02] rounded-full blur-[30px]"
                style={{ animation: 'ambient-drift 20s ease-in-out infinite reverse' }}
              />
            </div>

            {/* Train Assembly */}
            <div
              className="absolute bottom-[14%] z-[10] flex items-end h-[60px] md:h-[70px]"
              style={{
                left: `calc(18% + ${trainX}px)`,
                filter: `blur(${trainBlur}px)`,
                transition: isDeparting ? 'none' : 'filter 0.3s ease',
              }}
            >
              {/* Passenger Carriage */}
              <div className="w-[145px] md:w-[175px] h-[44px] md:h-[50px] relative shrink-0">
                <svg className="w-full h-full" viewBox="0 0 170 48" fill="none">
                  {/* Body */}
                  <rect x="0" y="6" width="170" height="34" rx="3" fill="#12141a" stroke="#1c1e25" strokeWidth="0.5" />
                  {/* Roof */}
                  <rect x="5" y="2" width="160" height="4" rx="2" fill="#a87c66" opacity="0.85" />
                  {/* Windows — warm glow */}
                  <rect x="12" y="14" width="16" height="13" rx="1.5" fill="#ebdcb9" opacity="0.9" />
                  <rect x="35" y="14" width="16" height="13" rx="1.5" fill="#ebdcb9" opacity="0.8" />
                  <rect x="58" y="14" width="16" height="13" rx="1.5" fill="#ebdcb9" opacity="0.85" />
                  <rect x="81" y="14" width="16" height="13" rx="1.5" fill="#ebdcb9" opacity="0.75" />
                  <rect x="104" y="14" width="16" height="13" rx="1.5" fill="#ebdcb9" opacity="0.9" />
                  <rect x="127" y="14" width="16" height="13" rx="1.5" fill="#ebdcb9" opacity="0.8" />
                  <rect x="150" y="14" width="14" height="13" rx="1.5" fill="#ebdcb9" opacity="0.85" />
                  {/* Bottom detail */}
                  <rect x="0" y="38" width="170" height="2" fill="#0a0b0e" />
                  {/* Wheels */}
                  <circle cx="25" cy="44" r="4" fill="#1c1e25" stroke="#2a2c33" strokeWidth="0.5" />
                  <circle cx="55" cy="44" r="4" fill="#1c1e25" stroke="#2a2c33" strokeWidth="0.5" />
                  <circle cx="115" cy="44" r="4" fill="#1c1e25" stroke="#2a2c33" strokeWidth="0.5" />
                  <circle cx="145" cy="44" r="4" fill="#1c1e25" stroke="#2a2c33" strokeWidth="0.5" />
                  {/* Connecting rod */}
                  <line x1="25" y1="44" x2="145" y2="44" stroke="#a87c66" strokeWidth="1" opacity="0.35" />
                </svg>
                {/* Window glow spill */}
                <div className="absolute top-[14px] left-[12px] w-[155px] h-[13px] bg-brand-cream/10 blur-[10px] pointer-events-none" />
              </div>

              {/* Coupling */}
              <div className="w-2 h-1 bg-[#1a1c22] mb-4 shrink-0" />

              {/* Locomotive */}
              <div className="w-[115px] md:w-[135px] h-[50px] md:h-[58px] relative shrink-0">
                <svg className="w-full h-full" viewBox="0 0 130 55" fill="none">
                  {/* Cab body */}
                  <rect x="0" y="12" width="75" height="32" rx="2" fill="#12141a" stroke="#1c1e25" strokeWidth="0.5" />
                  {/* Boiler */}
                  <rect x="75" y="18" width="40" height="26" rx="2" fill="#12141a" stroke="#1c1e25" strokeWidth="0.5" />
                  {/* Smokestack */}
                  <rect x="100" y="6" width="8" height="12" rx="1" fill="#12141a" />
                  <rect x="98" y="3" width="12" height="3" rx="1" fill="#a87c66" opacity="0.8" />
                  {/* Cab roof */}
                  <path d="M 0,12 L 75,12 L 70,6 L 5,6 Z" fill="#a87c66" opacity="0.7" />
                  {/* Cab windows */}
                  <rect x="10" y="17" width="14" height="12" rx="1.5" fill="#ebdcb9" opacity="0.95" />
                  <rect x="32" y="17" width="14" height="12" rx="1.5" fill="#ebdcb9" opacity="0.9" />
                  <rect x="54" y="17" width="14" height="12" rx="1.5" fill="#ebdcb9" opacity="0.85" />
                  {/* Bottom */}
                  <rect x="0" y="42" width="115" height="2" fill="#0a0b0e" />
                  {/* Wheels */}
                  <circle cx="20" cy="49" r="5" fill="#1c1e25" stroke="#2a2c33" strokeWidth="0.5" />
                  <circle cx="50" cy="49" r="5" fill="#1c1e25" stroke="#2a2c33" strokeWidth="0.5" />
                  <circle cx="95" cy="49" r="5" fill="#1c1e25" stroke="#2a2c33" strokeWidth="0.5" />
                  {/* Rod */}
                  <line x1="20" y1="49" x2="95" y2="49" stroke="#a87c66" strokeWidth="1.5" opacity="0.3" />
                  {/* Cowcatcher / front */}
                  <path d="M 115,42 L 125,42 L 130,48 L 115,48 Z" fill="#12141a" />
                </svg>
                {/* Headlight beam */}
                <div 
                  className="absolute right-[-60px] top-[18px] w-[60px] h-[18px] origin-left pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, rgba(235, 220, 185, 0.6) 0%, rgba(0,0,0,0) 100%)',
                    clipPath: 'polygon(0 25%, 100% 0, 100% 100%, 0 75%)',
                    opacity: lanternGlow,
                  }}
                />
              </div>
            </div>

            {/* Light streaks during departure */}
            {isDeparting && (
              <div className="absolute inset-0 z-[9] pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-brand-cream/20 to-transparent"
                    style={{
                      top: `${18 + i * 8}%`,
                      left: 0,
                      width: '100%',
                      animation: `ambient-drift ${1.4 + i * 0.25}s linear infinite`,
                      opacity: 0.35 - i * 0.05,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Platform / Tracks */}
            <div className="absolute bottom-0 w-full z-[15]">
              {/* Platform floor */}
              <div className="h-[14%] w-full bg-[#0e1014] border-t border-brand-surface-light/40 relative">
                {/* Rail lines */}
                <div className="absolute top-1 w-full h-[3px] bg-[#16181f] border-y border-black/60" />
                <div className="absolute top-2.5 w-full h-[1.5px] bg-brand-earth/30" />
                
                {/* Wooden ties */}
                <div className="absolute top-0 w-full h-1.5 flex gap-4 px-2">
                  {[...Array(32)].map((_, i) => (
                    <div key={i} className="w-1.5 h-full bg-[#15171c]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Platform furniture — lampposts */}
            <div className="absolute bottom-[14%] left-[8%] z-[20]" style={{ opacity: lanternGlow + 0.2, transition: 'opacity 1s ease' }}>
              <svg width="14" height="120" viewBox="0 0 14 120" fill="none">
                <rect x="6" y="20" width="2" height="100" fill="#10121a" />
                <rect x="3" y="15" width="8" height="5" rx="1" fill="#ebdcb9" opacity={lanternGlow * 0.95} />
                <rect x="4" y="12" width="6" height="3" fill="#10121a" />
                <circle cx="7" cy="17" r="9" fill="#ebdcb9" opacity={lanternGlow * 0.08} />
              </svg>
            </div>

            <div className="absolute bottom-[14%] right-[15%] z-[20]" style={{ opacity: lanternGlow + 0.2, transition: 'opacity 1s ease' }}>
              <svg width="14" height="110" viewBox="0 0 14 110" fill="none">
                <rect x="6" y="20" width="2" height="90" fill="#10121a" />
                <rect x="3" y="15" width="8" height="5" rx="1" fill="#ebdcb9" opacity={lanternGlow * 0.85} />
                <rect x="4" y="12" width="6" height="3" fill="#10121a" />
                <circle cx="7" cy="17" r="8" fill="#ebdcb9" opacity={lanternGlow * 0.06} />
              </svg>
            </div>

            {/* Platform bench silhouette */}
            <div className="absolute bottom-[15%] left-[25%] z-[18]">
              <svg width="30" height="16" viewBox="0 0 30 16" fill="#10121a">
                <rect x="0" y="6" width="30" height="3" rx="1" />
                <rect x="2" y="9" width="2" height="7" />
                <rect x="26" y="9" width="2" height="7" />
                <rect x="0" y="0" width="30" height="6" rx="1" fill="#12141c" />
              </svg>
            </div>
          </div>

          {/* Controls & Final Message */}
          <div className="mt-8 min-h-[120px] flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {departureState === 'idle' && (
                <motion.button
                  key="lever-idle"
                  onClick={triggerDeparture}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="px-8 py-3 bg-brand-surface border border-brand-earth/40 hover:border-brand-earth text-brand-cream text-[10px] tracking-[0.25em] uppercase font-bold rounded-md cursor-pointer transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-brand-earth/15"
                >
                  Signal Departure
                </motion.button>
              )}

              {(departureState === 'arriving' || departureState === 'boarding') && (
                <motion.div
                  key="lever-arriving"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="text-[10px] tracking-[0.25em] font-sans font-bold text-brand-earth uppercase" style={{ animation: 'gentle-pulse 1.5s ease-in-out infinite' }}>
                    {departureState === 'arriving' ? 'THE DEHRADUN EXPRESS IS ARRIVING...' : 'ALL ABOARD • DOORS CLOSING'}
                  </div>
                </motion.div>
              )}

              {departureState === 'departing' && (
                <motion.div
                  key="lever-departing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] tracking-[0.25em] font-sans font-bold text-brand-earth uppercase"
                  style={{ animation: 'gentle-pulse 1s ease-in-out infinite' }}
                >
                  DEPARTING...
                </motion.div>
              )}

              {departureState === 'departed' && !showFinalMessage && (
                <motion.div
                  key="lever-quiet"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-[10px] tracking-[0.3em] font-sans text-brand-muted uppercase"
                >
                  ...
                </motion.div>
              )}

              {showFinalMessage && (
                <motion.div
                  key="lever-final"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2.2, ease: 'easeOut' }}
                  className="flex flex-col items-center text-center max-w-md"
                >
                  <div className="w-12 h-[1px] bg-brand-earth/50 mb-6" />
                  <p className="font-serif text-brand-text italic text-lg md:text-xl mb-3 leading-relaxed">
                    "The tracks disappear into the hills.
                    <br />
                    But they always lead somewhere good."
                  </p>
                  <div className="w-12 h-[1px] bg-brand-earth/40 my-4" />
                  <p className="text-[10px] tracking-[0.25em] font-sans font-bold text-brand-cream uppercase">
                    Safe journey. A new chapter begins.
                  </p>
                  <p className="text-[10px] font-serif italic text-brand-earth/80 mt-3">
                    — with quiet care, from your digital companion
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Station09_Departure;
