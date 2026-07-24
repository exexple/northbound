import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import './App.css';

// Core UI Components
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import StationRoute from './components/StationRoute';

// Stations — lazy load heavier sections
import Station01_Arrival from './sections/Station01_Arrival';
import Station02_Soundtrack from './sections/Station02_Soundtrack';
const Station03_SettlingIn = lazy(() => import('./sections/Station03_SettlingIn'));
import Station04_Postcard from './sections/Station04_Postcard';
import Station05_Bingo from './sections/Station05_Bingo';
import Station06_WritersCorner from './sections/Station06_WritersCorner';
const Station07_Bookshelf = lazy(() => import('./sections/Station07_Bookshelf'));
import Station08_OpenWhen from './sections/Station08_OpenWhen';
const Station09_Departure = lazy(() => import('./sections/Station09_Departure'));

// Split flap single character utility for loading board
const FlapChar = ({ char, delay = 0 }) => (
  <motion.span
    initial={{ rotateX: -90, opacity: 0 }}
    animate={{ rotateX: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 220, damping: 18, delay: delay * 0.03 }}
    className="inline-block bg-[#16171c] text-[#a87c66] font-mono font-bold border border-brand-surface-light px-1.5 md:px-2.5 py-1 rounded shadow-inner text-sm md:text-base"
  >
    {char}
  </motion.span>
);

// Simple section loading fallback
const SectionFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-1.5 h-1.5 rounded-full bg-brand-earth animate-pulse" />
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadStep, setLoadStep] = useState(0);
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  // Initialize Lenis Smooth Scroll on mount
  useEffect(() => {
    if (isLoading) return;

    lenisRef.current = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const raf = (time) => {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenisRef.current?.destroy();
    };
  }, [isLoading]);

  // Loading flapper board sequences
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadStep(1), 700);
    const timer2 = setTimeout(() => setLoadStep(2), 1400);
    const timer3 = setTimeout(() => setLoadStep(3), 2100);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStartJourney = () => {
    setIsLoading(false);
  };

  const handleScrollToStart = () => {
    document.getElementById('soundtrack')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Paper Grain Overlay */}
      <GrainOverlay />

      {/* Lagging Spring Cursor */}
      <CustomCursor />

      {/* Fullscreen Departure Board Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader-overlay"
            initial={{ opacity: 1 }}
            exit={{ y: '-100vh', opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0a0a0b] z-50 flex flex-col items-center justify-center p-6 select-none"
          >
            {/* Ambient glow behind the board */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand-earth/5 rounded-full blur-[100px] pointer-events-none" />

            {/* The Flap Board Box */}
            <div className="w-full max-w-lg bg-[#111216] border border-brand-surface-light/60 p-6 md:p-8 rounded-lg shadow-2xl relative">
              <div className="absolute top-4 left-6 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-earth animate-pulse" />
                <span className="text-[8px] font-sans tracking-[0.25em] font-bold text-brand-muted uppercase">
                  DEPARTURE CONTROL
                </span>
              </div>

              {/* Split Flap Lines Container */}
              <div className="space-y-5 mt-6">
                {/* Line 1: Service */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-mono text-brand-muted/70 tracking-widest uppercase w-20">SERVICE</span>
                  <div className="flex gap-0.5">
                    {loadStep >= 0 && "NORTHBOUND".split("").map((c, i) => (
                      <FlapChar key={`s-${i}`} char={c} delay={i} />
                    ))}
                  </div>
                </div>

                {/* Line 2: Route Destination */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-mono text-brand-muted/70 tracking-widest uppercase w-20">DEST</span>
                  <div className="flex gap-0.5">
                    {loadStep >= 1 ? (
                      "DEHRADUN".split("").map((c, i) => (
                        <FlapChar key={`d-${i}`} char={c} delay={i} />
                      ))
                    ) : (
                      "--------".split("").map((c, i) => (
                        <FlapChar key={`dd-${i}`} char={c} delay={0} />
                      ))
                    )}
                  </div>
                </div>

                {/* Line 3: Dep Date */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-mono text-brand-muted/70 tracking-widest uppercase w-20">DEPART</span>
                  <div className="flex gap-0.5">
                    {loadStep >= 2 ? (
                      "LATEJULY".split("").map((c, i) => (
                        <FlapChar key={`t-${i}`} char={c} delay={i} />
                      ))
                    ) : (
                      "--------".split("").map((c, i) => (
                        <FlapChar key={`tt-${i}`} char={c} delay={0} />
                      ))
                    )}
                  </div>
                </div>

                {/* Line 4: System status */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-mono text-brand-muted/70 tracking-widest uppercase w-20">STATUS</span>
                  <div className="flex gap-0.5">
                    {loadStep >= 3 ? (
                      "BOARDING".split("").map((c, i) => (
                        <FlapChar key={`b-${i}`} char={c} delay={i} />
                      ))
                    ) : loadStep >= 1 ? (
                      "PREPARE-".split("").map((c, i) => (
                        <FlapChar key={`p-${i}`} char={c} delay={0} />
                      ))
                    ) : (
                      "WAITING-".split("").map((c, i) => (
                        <FlapChar key={`w-${i}`} char={c} delay={0} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Enter Call-To-Action */}
            <div className="mt-12 min-h-[70px] flex flex-col items-center justify-center gap-3">
              {loadStep >= 3 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    onClick={handleStartJourney}
                    className="px-8 py-3.5 bg-brand-surface border border-brand-earth/30 hover:border-brand-earth text-brand-text text-xs tracking-[0.2em] uppercase font-medium rounded transition-all duration-300 cursor-pointer shadow-lg hover:shadow-brand-earth/10"
                  >
                    Enter Platform
                  </motion.button>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-[10px] text-brand-muted/50 font-serif italic"
                  >
                    a small world, made for this moment
                  </motion.span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Digital Journey View */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen bg-brand-bg text-brand-text"
        >
          {/* Vertical/Horizontal Railway Route Tracker */}
          <StationRoute />

          {/* Core Content Track */}
          <main className="w-full">
            {/* Station 01 — Arrival / Landing */}
            <Station01_Arrival onStartJourney={handleScrollToStart} />

            {/* Station 02 — Soundtrack */}
            <Station02_Soundtrack />

            {/* Station 03 — Settling In (Starter & Corners) */}
            <Suspense fallback={<SectionFallback />}>
              <Station03_SettlingIn />
            </Suspense>

            {/* Station 04 — Digital Postcard */}
            <Station04_Postcard />

            {/* Station 05 — Freshman Bingo */}
            <Station05_Bingo />

            {/* Station 06 — Writer's Corner */}
            <Station06_WritersCorner />

            {/* Station 07 — The Bookshelf */}
            <Suspense fallback={<SectionFallback />}>
              <Station07_Bookshelf />
            </Suspense>

            {/* Station 08 — Open When */}
            <Station08_OpenWhen />

            {/* Final Station — Departure */}
            <Suspense fallback={<SectionFallback />}>
              <Station09_Departure />
            </Suspense>
          </main>

          {/* Simple, warm editorial footer */}
          <footer className="py-12 flex flex-col items-center gap-2 select-none text-center px-6 relative">
            <div className="station-divider absolute top-0 left-0 w-full" />
            <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-brand-earth uppercase">
              NORTHBOUND EXP.
            </span>
            <span className="text-[10px] text-brand-muted font-light leading-relaxed max-w-xs font-serif italic">
              A curated send-off for the valley. Made with quiet care.
            </span>
          </footer>
        </motion.div>
      )}
    </>
  );
};

export default App;
