import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import starterPack from '../data/starterPack';
import littleCorners from '../data/littleCorners';
import { Check, Compass, MapPin, Sparkles, PhoneCall } from 'lucide-react';

const Station03_SettlingIn = () => {
  const [activeSubTab, setActiveSubTab] = useState('starter'); // 'starter' | 'corners'
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedSpot, setSelectedSpot] = useState(littleCorners[0]);

  // Load checked items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('northbound_starter_checklist');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  const toggleCheckItem = (id) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    localStorage.setItem('northbound_starter_checklist', JSON.stringify(updated));
  };

  // Define custom map node positions for our SVG schematic map of Dehradun
  // Coordinates are relative to a 500x400 viewBox
  const mapNodes = {
    'book-depot': { x: 260, y: 190, color: '#a87c66' },
    'pine-tea': { x: 340, y: 80, color: '#ebdcb9' },
    'canal-walk': { x: 310, y: 140, color: '#ebdcb9' },
    'elloras': { x: 250, y: 220, color: '#a87c66' },
    'fri-lawns': { x: 130, y: 230, color: '#ebdcb9' },
    'emergency-med': { x: 290, y: 170, color: '#ebdcb9' }
  };

  return (
    <StationWrapper
      id="settling"
      stationNumber="03"
      title="Settling In"
      subtitle="Essentials for your bag and steps in the valley"
    >
      <div className="max-w-4xl w-full">
        {/* Generous Sub-Tabs */}
        <div className="flex gap-4 border-b border-brand-surface-light/45 pb-px mb-8 select-none">
          <button
            onClick={() => setActiveSubTab('starter')}
            className={`pb-4 px-1 text-xs tracking-widest uppercase font-semibold relative cursor-pointer ${
              activeSubTab === 'starter' ? 'text-brand-earth' : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            Starter Pack
            {activeSubTab === 'starter' && (
              <motion.div
                layoutId="subTabLine"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-earth"
              />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('corners')}
            className={`pb-4 px-1 text-xs tracking-widest uppercase font-semibold relative cursor-pointer ${
              activeSubTab === 'corners' ? 'text-brand-earth' : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            Little Corners
            {activeSubTab === 'corners' && (
              <motion.div
                layoutId="subTabLine"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-earth"
              />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeSubTab === 'starter' ? (
            /* STARTER PACK TAB */
            <motion.div
              key="starter-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Left Column: First-Week Essentials */}
              <div>
                <h3 className="text-lg font-serif text-brand-cream mb-4 flex items-center gap-2 select-none">
                  <Sparkles className="w-4 h-4 text-brand-earth" />
                  First-Week Essentials
                </h3>
                <div className="space-y-4">
                  {starterPack
                    .filter((item) => item.category === 'Essentials')
                    .map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleCheckItem(item.id)}
                          className={`p-4 border rounded-md cursor-pointer transition-all duration-300 flex gap-4 ${
                            isChecked
                              ? 'bg-brand-surface-light/20 border-brand-earth/30 text-brand-muted'
                              : 'bg-brand-surface border-brand-surface-light/55 hover:border-brand-earth/40 text-brand-text'
                          }`}
                        >
                          {/* Tactile Checkbox */}
                          <div className="mt-0.5">
                            <div
                              className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                isChecked
                                  ? 'bg-brand-earth border-brand-earth text-brand-bg scale-95'
                                  : 'border-brand-muted/40 bg-transparent'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                          <div>
                            <span
                              className={`text-xs font-semibold text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                item.importance === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-brand-earth/10 text-brand-earth'
                              }`}
                            >
                              {item.importance}
                            </span>
                            <h4 className={`text-sm font-medium mt-1 ${isChecked ? 'line-through opacity-60' : ''}`}>
                              {item.title}
                            </h4>
                            <p className="text-xs text-brand-muted/80 font-light leading-relaxed mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Right Column: Grounding Habits */}
              <div>
                <h3 className="text-lg font-serif text-brand-cream mb-4 flex items-center gap-2 select-none">
                  <Compass className="w-4 h-4 text-brand-earth animate-spin-slow" />
                  Grounding Habits
                </h3>
                <div className="space-y-4">
                  {starterPack
                    .filter((item) => item.category === 'Habits')
                    .map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleCheckItem(item.id)}
                          className={`p-4 border rounded-md cursor-pointer transition-all duration-300 flex gap-4 ${
                            isChecked
                              ? 'bg-brand-surface-light/20 border-brand-earth/30 text-brand-muted'
                              : 'bg-brand-surface border-brand-surface-light/55 hover:border-brand-earth/40 text-brand-text'
                          }`}
                        >
                          {/* Tactile Checkbox */}
                          <div className="mt-0.5">
                            <div
                              className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                isChecked
                                  ? 'bg-brand-earth border-brand-earth text-brand-bg scale-95'
                                  : 'border-brand-muted/40 bg-transparent'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[9px] uppercase tracking-wider bg-brand-earth/10 text-brand-earth px-1.5 py-0.5 rounded">
                              {item.importance}
                            </span>
                            <h4 className={`text-sm font-medium mt-1 ${isChecked ? 'line-through opacity-60' : ''}`}>
                              {item.title}
                            </h4>
                            <p className="text-xs text-brand-muted/80 font-light leading-relaxed mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          ) : (
            /* CURATED LOCAL GUIDE TAB (LITTLE CORNERS) */
            <motion.div
              key="corners-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row gap-8 items-stretch"
            >
              {/* Interactive Vector Map (Left on large screen, top on mobile) */}
              <div className="flex-1 bg-brand-surface border border-brand-surface-light/45 rounded-lg p-4 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
                <div className="absolute top-4 left-4 z-10 select-none">
                  <span className="text-[9px] font-sans tracking-[0.25em] text-brand-earth font-bold uppercase block">
                    VALLEY SCHEMATIC
                  </span>
                  <span className="text-[10px] text-brand-muted italic font-serif">
                    Click pins to explore spots
                  </span>
                </div>

                {/* Dehradun Custom SVG Map Layout */}
                <svg className="w-full h-[280px] text-brand-muted/15" viewBox="0 0 500 350" fill="none">
                  {/* Winding roads (paths) */}
                  {/* Rajpur Road */}
                  <path d="M 250,350 C 250,260 260,200 290,140 C 310,100 330,80 350,0" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3,3" />
                  {/* Canal Road */}
                  <path d="M 290,140 C 290,120 300,100 310,90 C 320,80 330,60 340,30" stroke="currentColor" strokeWidth="1.5" />
                  {/* Chakrata Road */}
                  <path d="M 250,220 C 200,220 150,225 0,230" stroke="currentColor" strokeWidth="2.0" />
                  
                  {/* Valley contour lines or rivers */}
                  <path d="M 50,350 C 120,300 110,180 80,0" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                  <path d="M 450,350 C 400,280 390,150 420,0" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />

                  {/* Topographical pine trees */}
                  <g opacity="0.1" stroke="#ebdcb9" strokeWidth="1">
                    <polygon points="360,60 365,70 355,70" />
                    <polygon points="361,50 365,58 357,58" />
                    <polygon points="120,80 125,90 115,90" />
                    <polygon points="140,110 145,120 135,120" />
                  </g>

                  {/* Styled Labels for Landmark Areas */}
                  <text x="360" y="40" fill="#8e919a" fontSize="10" fontFamily="serif" fontStyle="italic" opacity="0.6">to Mussoorie</text>
                  <text x="140" y="250" fill="#8e919a" fontSize="10" fontFamily="sans-serif" opacity="0.6">Chakrata Rd</text>
                  <text x="280" y="320" fill="#8e919a" fontSize="10" fontFamily="sans-serif" opacity="0.6">Rajpur Rd</text>

                  {/* Animated Interactive Pins */}
                  {littleCorners.map((spot) => {
                    const node = mapNodes[spot.id] || { x: 250, y: 175, color: '#a87c66' };
                    const isSelected = selectedSpot.id === spot.id;
                    return (
                      <g
                        key={spot.id}
                        className="cursor-pointer group"
                        onClick={() => setSelectedSpot(spot)}
                      >
                        {/* Ripple ring for selected/hovered pin */}
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 10 : 6}
                          fill="transparent"
                          stroke={node.color}
                          strokeWidth="1.5"
                          animate={isSelected ? { r: [8, 16, 8] } : { r: 6 }}
                          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        />
                        {/* Small glowing center pin */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 4 : 3}
                          fill={node.color}
                          className="group-hover:fill-brand-earth transition-colors"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Spot Description Detail Box (Right) */}
              <div className="w-full lg:w-[360px] flex flex-col justify-between bg-brand-surface border border-brand-surface-light/45 rounded-lg p-6 relative">
                {/* Spot category info */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] tracking-[0.25em] font-bold text-brand-earth uppercase bg-brand-earth/10 px-2 py-0.5 rounded select-none">
                      {selectedSpot.type}
                    </span>
                    <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-earth" />
                      {selectedSpot.area}
                    </span>
                  </div>

                  {/* Spot title */}
                  <h3 className="text-2xl font-serif text-brand-cream mb-3 font-normal">
                    {selectedSpot.name}
                  </h3>

                  {/* Description */}
                  <p className="text-brand-muted text-xs leading-relaxed font-light mb-6">
                    {selectedSpot.description}
                  </p>
                </div>

                {/* Curator recommendation desk */}
                <div className="border-t border-brand-surface-light/45 pt-4">
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-brand-muted uppercase block mb-1">
                    CURATOR'S NOTE
                  </span>
                  
                  {selectedSpot.id === 'emergency-med' ? (
                    <div className="flex items-center gap-2 text-brand-text font-medium text-xs bg-red-500/10 border border-red-500/20 p-2.5 rounded">
                      <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                      <span className="font-mono text-red-300">{selectedSpot.recommendation}</span>
                    </div>
                  ) : (
                    <p className="text-brand-text text-xs italic font-serif leading-relaxed">
                      "{selectedSpot.recommendation}"
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StationWrapper>
  );
};

export default Station03_SettlingIn;
