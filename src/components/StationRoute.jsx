import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const STATIONS = [
  { id: 'arrival', label: '01', title: 'Arrival' },
  { id: 'soundtrack', label: '02', title: 'Soundtrack' },
  { id: 'settling', label: '03', title: 'Settling In' },
  { id: 'postcard', label: '04', title: 'Postcard' },
  { id: 'bingo', label: '05', title: 'Bingo' },
  { id: 'writers-corner', label: '06', title: "Writer's" },
  { id: 'bookshelf', label: '07', title: 'Bookshelf' },
  { id: 'open-when', label: '08', title: 'Open When' },
  { id: 'departure', label: '09', title: 'Departure' }
];

const StationRoute = () => {
  const [activeStation, setActiveStation] = useState('arrival');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      }

      // Check which station is currently in viewport center
      const viewCenter = window.scrollY + window.innerHeight / 2;
      for (let i = STATIONS.length - 1; i >= 0; i--) {
        const stationEl = document.getElementById(STATIONS[i].id);
        if (stationEl) {
          const rect = stationEl.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          if (viewCenter >= absoluteTop - 100) {
            setActiveStation(STATIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStation = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Left Rail Route (Visible above 1024px) */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center z-40 h-[60vh] select-none">
        {/* Track Line */}
        <div className="absolute w-[2px] h-full bg-brand-surface-light rounded">
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 w-full bg-brand-earth rounded"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          {/* Glowing Train Icon tracking progress */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-earth border-2 border-brand-bg rounded-full shadow-[0_0_8px_#a87c66] flex items-center justify-center"
            style={{ top: `calc(${scrollProgress * 100}% - 8px)` }}
          >
            <div className="w-1.5 h-1.5 bg-brand-cream rounded-full animate-ping" />
          </motion.div>
        </div>

        {/* Stations Nodes */}
        <div className="h-full flex flex-col justify-between items-center w-8 relative py-4">
          {STATIONS.map((station) => {
            const isActive = activeStation === station.id;
            return (
              <button
                key={station.id}
                onClick={() => scrollToStation(station.id)}
                className="group relative flex items-center justify-center w-6 h-6 outline-none cursor-pointer"
                aria-label={`Go to ${station.title}`}
              >
                {/* Node Dot */}
                <motion.div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-bg border-brand-earth scale-125 shadow-[0_0_6px_#a87c66]'
                      : 'bg-brand-surface-light border-brand-muted/40 group-hover:border-brand-earth/80'
                  }`}
                />
                
                {/* Tooltip text */}
                <div className="absolute left-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 whitespace-nowrap bg-brand-surface/90 border border-brand-surface-light/50 px-3 py-1.5 rounded backdrop-blur-md shadow-xl text-xs font-medium">
                  <span className="text-brand-earth font-serif">{station.label}</span>
                  <span className="text-brand-text">{station.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Top Horizontal Subway Route (Visible under 1024px) */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-brand-bg/85 border-b border-brand-surface-light/40 backdrop-blur-md z-40 py-3.5 px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="text-xs font-serif text-brand-earth font-semibold tracking-wider">NORTHBOUND</span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-earth animate-pulse" />
        </div>
        
        {/* Horizontal Progress Track */}
        <div className="flex-1 max-w-[50%] mx-3 h-[2px] bg-brand-surface-light relative rounded">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-earth rounded"
            style={{ width: `${scrollProgress * 100}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-brand-earth border border-brand-bg rounded-full shadow-[0_0_4px_#a87c66]"
            style={{ left: `calc(${scrollProgress * 100}% - 5px)` }}
          />
        </div>

        <div className="text-xs font-medium text-brand-cream bg-brand-surface/80 border border-brand-surface-light/35 px-2 py-1 rounded">
          {STATIONS.find(s => s.id === activeStation)?.title || 'Arrival'}
        </div>
      </div>
    </>
  );
};

export default StationRoute;
