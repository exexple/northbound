import React, { useRef, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import playlists from '../data/playlists';
import { Music, Play } from 'lucide-react';

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
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="bg-brand-surface border border-brand-surface-light/40 hover:border-brand-earth/40 p-6 rounded-lg relative overflow-hidden flex flex-col justify-between h-[360px] shadow-xl shadow-black/30 group transition-colors duration-500 cursor-pointer"
    >
      {/* Subtle glowing sphere */}
      <div
        className="absolute top-0 right-0 w-28 h-28 blur-[50px] opacity-10 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: playlist.themeColor }}
      />

      <div style={{ transform: 'translateZ(20px)' }}>
        {/* Category Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold font-sans text-brand-muted group-hover:text-brand-earth transition-colors duration-300">
            SOUNDSCAPE
          </span>
          <Music className="w-4 h-4 text-brand-muted/50 group-hover:text-brand-earth transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-serif text-brand-text mb-3 leading-tight group-hover:text-brand-cream transition-colors duration-300">
          {playlist.title}
        </h3>

        {/* Description */}
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-6">
          {playlist.description}
        </p>

        {/* Track Preview list */}
        <div className="space-y-2 border-t border-brand-surface-light/35 pt-4">
          {playlist.songs.map((song, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-mono text-brand-muted/70">
              <span className="text-brand-earth font-bold">0{i + 1}</span>
              <span>{song}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button Row */}
      <div 
        className="flex items-center justify-between mt-6 w-full"
        style={{ transform: 'translateZ(15px)' }}
      >
        {/* Soft floating equalizer bars */}
        <div className="flex items-end gap-0.5 h-3">
          <div className="w-0.5 bg-brand-earth/30 group-hover:bg-brand-earth/60 transition-all duration-300" style={{ height: '8px', animation: 'gentle-pulse 1.5s ease-in-out infinite' }} />
          <div className="w-0.5 bg-brand-earth/40 group-hover:bg-brand-earth/70 transition-all duration-300" style={{ height: '12px', animation: 'gentle-pulse 1.2s ease-in-out infinite 0.2s' }} />
          <div className="w-0.5 bg-brand-earth/25 group-hover:bg-brand-earth/50 transition-all duration-300" style={{ height: '6px', animation: 'gentle-pulse 1.8s ease-in-out infinite 0.5s' }} />
        </div>

        {/* Listen Button */}
        <a
          href={playlist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 bg-brand-surface-light/50 hover:bg-brand-earth hover:text-brand-bg border border-brand-surface-light/60 text-brand-text text-[10px] tracking-widest uppercase font-medium rounded transition-all duration-300"
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
        <p className="text-brand-muted font-light text-sm leading-relaxed mb-8 max-w-xl">
          Music carries the texture of a place. These playlists are curated to match the shifting seasons of the valley — misty mornings, rainy afternoons, quiet nights.
        </p>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </StationWrapper>
  );
};

export default React.memo(Station02_Soundtrack);
