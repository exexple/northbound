import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Core UI Components
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import StationRoute from './components/StationRoute';

// Stations
import Station01_Arrival from './sections/Station01_Arrival';
import Station02_Soundtrack from './sections/Station02_Soundtrack';
import Station03_SettlingIn from './sections/Station03_SettlingIn';
import Station04_Postcard from './sections/Station04_Postcard';
import Station05_Bingo from './sections/Station05_Bingo';
import Station06_WritersCorner from './sections/Station06_WritersCorner';
import Station07_Bookshelf from './sections/Station07_Bookshelf';
import Station08_OpenWhen from './sections/Station08_OpenWhen';
import Station09_Departure from './sections/Station09_Departure';

// Split flap single character utility for loading board
const FlapChar = ({ char }) => (
  <motion.span
    initial={{ rotateX: -90, opacity: 0 }}
    animate={{ rotateX: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    className="inline-block bg-[#16171c] text-[#a87c66] font-mono font-bold border border-brand-surface-light px-1.5 md:px-2.5 py-1 rounded shadow-inner"
  >
    {char}
  </motion.span>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadStep, setLoadStep] = useState(0);

  // Initialize Lenis Smooth Scroll on mount
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // spring-like easing
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [isLoading]);

  // Loading flapper board sequences
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadStep(1), 800);
    const timer2 = setTimeout(() => setLoadStep(2), 1600);
    const timer3 = setTimeout(() => setLoadStep(3), 2400);
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
            {/* The Flap Board Box */}
            <div className="w-full max-w-lg bg-[#111216] border border-brand-surface-light p-6 md:p-8 rounded-lg shadow-2xl relative">
              <div className="absolute top-4 left-6 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-earth animate-pulse" />
                <span className="text-[8px] font-sans tracking-[0.25em] font-bold text-brand-muted uppercase">
                  DEPARTURE CONTROL SYSTEM
                </span>
              </div>

              {/* Split Flap Lines Container */}
              <div className="space-y-5 mt-4">
                {/* Line 1: Service */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-mono text-brand-muted/70 tracking-widest uppercase w-20">SERVICE</span>
                  <div className="flex gap-0.5">
                    {loadStep >= 0 && "NORTHBOUND".split("").map((c, i) => (
                      <FlapChar key={i} char={c} />
                    ))}
                  </div>
                </div>

                {/* Line 2: Route Destination */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-mono text-brand-muted/70 tracking-widest uppercase w-20">DEST</span>
                  <div className="flex gap-0.5">
                    {loadStep >= 1 ? (
                      "DEHRADUN".split("").map((c, i) => (
                        <FlapChar key={i} char={c} />
                      ))
                    ) : (
                      "--------".split("").map((c, i) => (
                        <FlapChar key={i} char={c} />
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
                        <FlapChar key={i} char={c} />
                      ))
                    ) : (
                      "--------".split("").map((c, i) => (
                        <FlapChar key={i} char={c} />
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
                        <FlapChar key={i} char={c} />
                      ))
                    ) : loadStep >= 1 ? (
                      "PREPARE-".split("").map((c, i) => (
                        <FlapChar key={i} char={c} />
                      ))
                    ) : (
                      "OFFLINE-".split("").map((c, i) => (
                        <FlapChar key={i} char={c} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Enter Call-To-Action */}
            <div className="mt-12 min-h-[50px] flex items-center justify-center">
              {loadStep >= 3 && (
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={handleStartJourney}
                  className="px-8 py-3.5 bg-brand-surface border border-brand-earth/30 hover:border-brand-earth text-brand-text text-xs tracking-[0.2em] uppercase font-medium rounded transition-all duration-300 cursor-pointer shadow-lg"
                >
                  Enter Platform
                </motion.button>
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
            <Station03_SettlingIn />

            {/* Station 04 — Digital Postcard */}
            <Station04_Postcard />

            {/* Station 05 — Freshman Bingo */}
            <Station05_Bingo />

            {/* Station 06 — Writer's Corner */}
            <Station06_WritersCorner />

            {/* Station 07 — The Bookshelf */}
            <Station07_Bookshelf />

            {/* Station 08 — Open When */}
            <Station08_OpenWhen />

            {/* Final Station — Departure */}
            <Station09_Departure />
          </main>

          {/* Simple, premium editorial footer */}
          <footer className="py-12 border-t border-brand-surface-light/35 flex flex-col items-center gap-2 select-none text-center px-6">
            <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-brand-earth uppercase">
              NORTHBOUND EXP.
            </span>
            <span className="text-[10px] text-brand-muted font-light leading-relaxed max-w-xs">
              A curated send-off experience. Designed with warm wishes for the valley.
            </span>
          </footer>
        </motion.div>
      )}
    </>
  );
};

export default App;
