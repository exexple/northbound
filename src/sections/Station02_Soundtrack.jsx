import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import StationWrapper from '../components/StationWrapper';
import playlists from '../data/playlists';
import { Music, Play } from 'lucide-react';

const PlaylistCard = ({ playlist }) => {
  const cardRef = useRef(null);
  
  // Custom 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseSpringConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), mouseSpringConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), mouseSpringConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
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
      className="bg-brand-surface border border-brand-surface-light/40 hover:border-brand-earth/50 p-6 rounded-lg relative overflow-hidden flex flex-col justify-between h-[360px] shadow-xl group transition-colors duration-500 cursor-pointer"
    >
      {/* Subtle glowing sphere inside the card */}
      <div
        className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-15 rounded-full pointer-events-none transition-colors duration-500 group-hover:opacity-25"
        style={{ backgroundColor: playlist.themeColor }}
      />

      <div style={{ transform: 'translateZ(20px)' }}>
        {/* Category Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold font-sans text-brand-muted group-hover:text-brand-earth transition-colors duration-300">
            SOUNDSCAPE
          </span>
          <Music className="w-4 h-4 text-brand-muted/65 group-hover:text-brand-earth transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-serif text-brand-text mb-3 leading-tight group-hover:text-brand-cream transition-colors duration-300">
          {playlist.title}
        </h3>

        {/* Description */}
        <p className="text-brand-muted text-xs font-light leading-relaxed mb-6">
          {playlist.description}
        </p>

        {/* Simulated Track Preview list */}
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
        {/* Soft floating equalizer bars (visual-only effect) */}
        <div className="flex items-end gap-0.5 h-3">
          <div className="w-0.5 h-2 bg-brand-earth/40 group-hover:h-3 transition-all duration-300 group-hover:animate-[pulse_1.2s_infinite]" />
          <div className="w-0.5 h-3 bg-brand-earth/60 group-hover:h-1 transition-all duration-300 group-hover:animate-[pulse_1.5s_infinite_delay-200]" />
          <div className="w-0.5 h-1.5 bg-brand-earth/30 group-hover:h-2 transition-all duration-300 group-hover:animate-[pulse_1s_infinite_delay-500]" />
        </div>

        {/* Listen Button */}
        <a
          href={playlist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Prevent card click conflict
          className="flex items-center gap-2 px-4 py-2 bg-brand-surface-light/60 hover:bg-brand-earth hover:text-brand-bg border border-brand-surface-light text-brand-text text-[10px] tracking-widest uppercase font-medium rounded transition-all duration-300"
        >
          <Play className="w-3 h-3 fill-current" />
          Spotify
        </a>
      </div>
    </motion.div>
  );
};

const Station02_Soundtrack = () => {
  return (
    <StationWrapper
      id="soundtrack"
      stationNumber="02"
      title="Soundtrack"
      subtitle="Selected moods for the room and route"
    >
      <div className="max-w-4xl w-full">
        {/* Curated list introduction text */}
        <p className="text-brand-muted font-light text-sm leading-relaxed mb-8 max-w-xl">
          Music carries the texture of a place. These playlists are curated to capture the shifting seasons of the valley — from morning mists to rainy afternoons.
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

export default Station02_Soundtrack;
