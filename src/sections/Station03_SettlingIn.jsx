import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import starterPack from '../data/starterPack';
import littleCorners from '../data/littleCorners';
import { Check, MapPin } from 'lucide-react';

// Map node positions for SVG schematic map (viewBox 600x450)
const MAP_NODES = {
  'book-depot': { x: 300, y: 220, color: '#a87c66' },
  'pine-tea': { x: 420, y: 80, color: '#ebdcb9' },
  'canal-walk': { x: 370, y: 160, color: '#ebdcb9' },
  'elloras': { x: 280, y: 260, color: '#a87c66' },
  'fri-lawns': { x: 130, y: 260, color: '#ebdcb9' },
  'daias-cafe': { x: 340, y: 195, color: '#c4a882' },
  'blue-tokai': { x: 320, y: 175, color: '#7ba7d1' },
  'silent-bakery': { x: 160, y: 340, color: '#ebdcb9' },
  'crossword': { x: 450, y: 280, color: '#a87c66' },
  'mdda-park': { x: 380, y: 230, color: '#6b9e6b' },
  'deer-park': { x: 460, y: 120, color: '#6b9e6b' },
  'emergency-med': { x: 350, y: 200, color: '#e06060' }
};

// Category icon mapping
const TYPE_ICONS = {
  'Books & Cafe': '📖',
  'Tea Spot': '☕',
  'Rain Walk': '🌿',
  'Comfort Food': '🍰',
  'Weekend Reset': '🌳',
  'Cozy Cafe': '☕',
  'Coffee': '☕',
  'Bakery': '🥐',
  'Bookstore': '📚',
  'Peaceful Park': '🌿',
  'Nature Walk': '🌲',
  'Emergency Spot': '🏥',
};

const ChecklistItem = memo(({ item, isChecked, onToggle }) => (
  <div
    onClick={onToggle}
    className={`p-4 border rounded-md cursor-pointer transition-all duration-300 flex gap-4 ${
      isChecked
        ? 'bg-brand-surface-light/20 border-brand-earth/30 text-brand-muted'
        : 'bg-brand-surface border-brand-surface-light/55 hover:border-brand-earth/40 text-brand-text'
    }`}
  >
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
));

const Station03_SettlingIn = () => {
  const [activeSubTab, setActiveSubTab] = useState('starter');
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedSpot, setSelectedSpot] = useState(littleCorners[0]);

  const essentials = useMemo(() => starterPack.filter(item => item.category === 'Essentials'), []);
  const habits = useMemo(() => starterPack.filter(item => item.category === 'Habits'), []);

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

  return (
    <StationWrapper
      id="settling"
      stationNumber="03"
      title="Settling In"
      subtitle="Essentials for your bag and quiet corners of the valley"
    >
      <div className="max-w-4xl w-full">
        {/* Sub-Tabs */}
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
                  <span className="text-brand-earth text-base">✦</span>
                  First-Week Essentials
                </h3>
                <div className="space-y-4">
                  {essentials.map((item) => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      isChecked={!!checkedItems[item.id]}
                      onToggle={() => toggleCheckItem(item.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Grounding Habits */}
              <div>
                <h3 className="text-lg font-serif text-brand-cream mb-4 flex items-center gap-2 select-none">
                  <span className="text-brand-earth text-base">✦</span>
                  Grounding Habits
                </h3>
                <div className="space-y-4">
                  {habits.map((item) => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      isChecked={!!checkedItems[item.id]}
                      onToggle={() => toggleCheckItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="corners-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row gap-6 items-stretch"
            >
              {/* Interactive Vector Map */}
              <div className="flex-1 bg-brand-surface border border-brand-surface-light/40 rounded-lg p-4 relative overflow-hidden flex flex-col justify-center min-h-[350px]">
                <div className="absolute top-4 left-4 z-10 select-none">
                  <span className="text-[9px] font-sans tracking-[0.25em] text-brand-earth font-bold uppercase block">
                    VALLEY SCHEMATIC
                  </span>
                  <span className="text-[10px] text-brand-muted italic font-serif">
                    Tap pins to explore spots
                  </span>
                </div>

                {/* Place count badge */}
                <div className="absolute top-4 right-4 z-10 text-[9px] font-mono text-brand-muted/60 select-none">
                  {littleCorners.length} PLACES
                </div>

                {/* Dehradun Custom SVG Map */}
                <svg className="w-full h-[320px] md:h-[360px] text-brand-muted/10" viewBox="0 0 600 450" fill="none">
                  {/* Winding roads */}
                  <path d="M 300,440 C 300,320 310,250 340,180 C 360,130 400,80 430,0" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4,3" />
                  <path d="M 340,180 C 340,160 360,130 380,110 C 400,90 420,60 440,20" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 300,260 C 240,260 180,265 0,270" stroke="currentColor" strokeWidth="2.0" />
                  {/* Rajpur Road main artery */}
                  <path d="M 300,440 C 310,380 320,340 330,300 C 340,270 350,240 360,210" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2" />
                  {/* Clement Town fork */}
                  <path d="M 280,300 C 240,320 200,340 160,350" stroke="currentColor" strokeWidth="1.5" />
                  {/* Pacific Mall road */}
                  <path d="M 360,260 C 400,270 430,275 460,280" stroke="currentColor" strokeWidth="1.5" />

                  {/* Valley contour lines */}
                  <path d="M 50,440 C 100,370 90,220 70,0" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
                  <path d="M 550,440 C 500,350 490,180 520,0" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />

                  {/* Pine trees */}
                  <g opacity="0.08" stroke="#ebdcb9" strokeWidth="0.8">
                    <polygon points="440,60 445,70 435,70" />
                    <polygon points="441,50 445,58 437,58" />
                    <polygon points="100,80 105,90 95,90" />
                    <polygon points="120,110 125,120 115,120" />
                    <polygon points="500,100 505,110 495,110" />
                    <polygon points="80,180 85,190 75,190" />
                  </g>

                  {/* Area Labels */}
                  <text x="440" y="35" fill="#8e919a" fontSize="9" fontFamily="serif" fontStyle="italic" opacity="0.5">to Mussoorie</text>
                  <text x="130" y="285" fill="#8e919a" fontSize="9" fontFamily="sans-serif" opacity="0.4">Chakrata Rd</text>
                  <text x="310" y="410" fill="#8e919a" fontSize="9" fontFamily="sans-serif" opacity="0.4">Rajpur Rd</text>
                  <text x="130" y="360" fill="#8e919a" fontSize="8" fontFamily="sans-serif" opacity="0.35">Clement Town</text>
                  <text x="440" y="295" fill="#8e919a" fontSize="8" fontFamily="sans-serif" opacity="0.35">Pacific Mall</text>

                  {/* Interactive Pins */}
                  {littleCorners.map((spot) => {
                    const node = MAP_NODES[spot.id] || { x: 300, y: 225, color: '#a87c66' };
                    const isSelected = selectedSpot.id === spot.id;
                    return (
                      <g
                        key={spot.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedSpot(spot)}
                      >
                        {/* Ripple ring for selected */}
                        {isSelected && (
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="14"
                            fill="transparent"
                            stroke={node.color}
                            strokeWidth="1"
                            opacity="0.3"
                          >
                            <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                        {/* Outer ring */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 7 : 5}
                          fill="transparent"
                          stroke={node.color}
                          strokeWidth="1.5"
                          opacity={isSelected ? 0.7 : 0.4}
                          className="transition-all duration-300"
                        />
                        {/* Center pin */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 3.5 : 2.5}
                          fill={node.color}
                          opacity={isSelected ? 1 : 0.7}
                          className="transition-all duration-300"
                        />
                        {/* Small label on hover / selected */}
                        {isSelected && (
                          <text
                            x={node.x}
                            y={node.y - 14}
                            fill={node.color}
                            fontSize="7"
                            fontFamily="sans-serif"
                            fontWeight="600"
                            textAnchor="middle"
                            letterSpacing="0.5"
                          >
                            {spot.name.length > 18 ? spot.name.substring(0, 18) + '…' : spot.name}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Spot Description Detail Box */}
              <div className="w-full lg:w-[360px] flex flex-col justify-between bg-brand-surface border border-brand-surface-light/40 rounded-lg p-6 relative">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] tracking-[0.25em] font-bold text-brand-earth uppercase bg-brand-earth/10 px-2 py-0.5 rounded select-none flex items-center gap-1.5">
                      <span>{TYPE_ICONS[selectedSpot.type] || '📍'}</span>
                      {selectedSpot.type}
                    </span>
                    <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-earth" />
                      {selectedSpot.area}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedSpot.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-serif text-brand-cream mb-3 font-normal">
                        {selectedSpot.name}
                      </h3>
                      <p className="text-brand-muted text-xs leading-relaxed font-light mb-6">
                        {selectedSpot.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Curator recommendation */}
                <div className="border-t border-brand-surface-light/40 pt-4">
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-brand-muted uppercase block mb-1.5">
                    CURATOR'S NOTE
                  </span>
                  
                  {selectedSpot.id === 'emergency-med' ? (
                    <div className="flex items-center gap-2 text-brand-text font-medium text-xs bg-red-500/10 border border-red-500/20 p-2.5 rounded">
                      <span className="text-red-400">📞</span>
                      <span className="font-mono text-red-300">{selectedSpot.recommendation}</span>
                    </div>
                  ) : (
                    <p className="text-brand-text text-xs italic font-serif leading-relaxed">
                      "{selectedSpot.recommendation}"
                    </p>
                  )}
                </div>

                {/* Quick spot navigation — scrollable list */}
                <div className="border-t border-brand-surface-light/40 pt-4 mt-4">
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-brand-muted uppercase block mb-2">
                    ALL SPOTS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {littleCorners.map((spot) => (
                      <button
                        key={spot.id}
                        onClick={() => setSelectedSpot(spot)}
                        className={`text-[9px] px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
                          selectedSpot.id === spot.id
                            ? 'bg-brand-earth/20 text-brand-earth border border-brand-earth/30'
                            : 'bg-brand-surface-light/30 text-brand-muted/70 border border-transparent hover:text-brand-text hover:border-brand-surface-light/60'
                        }`}
                      >
                        {spot.name.length > 16 ? spot.name.substring(0, 16) + '…' : spot.name}
                      </button>
                    ))}
                  </div>
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
