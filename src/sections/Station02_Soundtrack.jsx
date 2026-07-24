import React, { useRef, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import playlists from '../data/playlists';
import { Disc3, Play } from 'lucide-react';

const PlaylistCard = memo(({ playlist }) => {
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseSpringConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), mouseSpringConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), mouseSpringConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="glass-panel p-6 md:p-7 rounded-xl relative overflow-hidden flex flex-col justify-between h-[380px] group transition-all duration-500 cursor-pointer select-none"
    >
      {/* Subtle glowing color sphere */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 blur-[60px] opacity-15 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: playlist.themeColor }}
      />

      {/* Decorative Vinyl Groove Rings (SVG overlay inside card background) */}
      <svg className="absolute -bottom-16 -right-16 w-52 h-52 text-white/[0.03] group-hover:text-brand-earth/[0.08] transition-colors duration-700 pointer-events-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.3" />
      </svg>

      <div style={{ transform: 'translateZ(24px)' }}>
        {/* Category Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold font-sans text-brand-earth bg-brand-earth/10 px-2 py-0.5 rounded border border-brand-earth/20">
            SOUNDSCAPE
          </span>
          <Disc3 className="w-4 h-4 text-brand-muted/60 group-hover:text-brand-earth group-hover:rotate-180 transition-all duration-700" />
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif text-brand-text mb-3 leading-tight group-hover:text-brand-cream transition-colors duration-300">
          {playlist.title}
        </h3>

        {/* Description */}
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-6">
          {playlist.description}
        </p>

        {/* Track Preview list */}
        <div className="space-y-2 border-t border-brand-surface-light/50 pt-4">
          {playlist.songs.map((song, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-mono text-brand-muted/80 group-hover:text-brand-text/90 transition-colors">
              <span className="text-brand-earth font-bold">0{i + 1}</span>
              <span className="truncate">{song}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button Row */}
      <div 
        className="flex items-center justify-between mt-6 w-full relative z-10"
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Equalizer animation */}
        <div className="flex items-end gap-1 h-3.5">
          <div className="w-0.5 bg-brand-earth/40 group-hover:bg-brand-earth transition-all duration-300 rounded-full" style={{ height: '10px', animation: 'gentle-pulse 1.4s ease-in-out infinite' }} />
          <div className="w-0.5 bg-brand-earth/60 group-hover:bg-brand-earth transition-all duration-300 rounded-full" style={{ height: '14px', animation: 'gentle-pulse 1.1s ease-in-out infinite 0.2s' }} />
          <div className="w-0.5 bg-brand-earth/30 group-hover:bg-brand-earth transition-all duration-300 rounded-full" style={{ height: '7px', animation: 'gentle-pulse 1.7s ease-in-out infinite 0.4s' }} />
          <div className="w-0.5 bg-brand-earth/50 group-hover:bg-brand-earth transition-all duration-300 rounded-full" style={{ height: '12px', animation: 'gentle-pulse 1.3s ease-in-out infinite 0.6s' }} />
        </div>

        {/* Spotify Listen Button */}
        <a
          href={playlist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 bg-brand-surface-light/60 hover:bg-brand-earth hover:text-brand-bg border border-brand-earth/30 hover:border-brand-earth text-brand-text text-[10px] tracking-widest uppercase font-semibold rounded-md transition-all duration-300 shadow-md"
        >
          <Play className="w-3 h-3 fill-current" />
          Spotify
        </a>
      </div>
    </motion.div>
  );
});

const Station02_Soundtrack = () => {
  return (
    <StationWrapper
      id="soundtrack"
      stationNumber="02"
      title="Soundtrack"
      subtitle="Moods for the room and the road"
    >
      <div className="max-w-4xl w-full">
        <p className="text-brand-muted font-light text-sm leading-relaxed mb-10 max-w-xl">
          Music carries the texture of a place. These playlists are curated to match the shifting seasons of the valley — misty mornings, rainy afternoons, and quiet nights.
        </p>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </StationWrapper>
  );
};

export default React.memo(Station02_Soundtrack);

