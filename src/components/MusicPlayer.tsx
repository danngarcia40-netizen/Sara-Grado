import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-hide tooltip after 6 seconds if playing
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setShowTooltip(false);
          })
          .catch((err) => {
            console.log("Reproducción automática bloqueada o fallida:", err);
          });
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3">
      {/* Hidden Audio Element with local static file */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Elegant Left-Pointing Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gold/40 shadow-[0_4px_15px_rgba(212,175,55,0.15)] text-xs text-gray-700 font-medium whitespace-nowrap select-none flex items-center gap-1.5"
          >
            <span className="text-[13px]">🌻</span>
            {isPlaying ? "Música de fondo activa" : "Toca el girasol para escuchar música"}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-white/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sunflower Button */}
      <motion.button
        type="button"
        onClick={handlePlayPause}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          if (isPlaying) setShowTooltip(false);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full focus:outline-none drop-shadow-[0_4px_10px_rgba(212,175,55,0.35)] cursor-pointer group"
        title={isPlaying ? "Pausar música" : "Escuchar música"}
      >
        {/* Soft Golden Pulsing Ambient Halo (Only when paused to invite clicks) */}
        {!isPlaying && (
          <span className="absolute inset-[-4px] rounded-full bg-gold/20 animate-ping" />
        )}

        {/* Sunflower Petals (Rotates continuously when playing) */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 16, repeat: Infinity, ease: "linear" } : { duration: 0 }}
          className="absolute inset-0 w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <g transform="translate(50,50)">
              {/* Outer Layer of Golden Petals */}
              {[...Array(16)].map((_, i) => (
                <path
                  key={`outer-${i}`}
                  d="M 0 -11 C -5 -21 -8 -31 0 -39 C 8 -31 5 -21 0 -11"
                  fill="#FFD700"
                  stroke="#D4AF37"
                  strokeWidth="0.75"
                  transform={`rotate(${i * 22.5})`}
                />
              ))}
              {/* Inner Layer of Warm Orange Petals for depth */}
              {[...Array(16)].map((_, i) => (
                <path
                  key={`inner-${i}`}
                  d="M 0 -9 C -4 -17 -6 -25 0 -31 C 6 -25 4 -17 0 -9"
                  fill="#FFA500"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  transform={`rotate(${i * 22.5 + 11.25})`}
                  opacity="0.9"
                />
              ))}
              {/* Dark Brown Seed Center Disc */}
              <circle cx="0" cy="0" r="16" fill="#4A2E1B" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="12" fill="#2E1C10" />
            </g>
          </svg>
        </motion.div>

        {/* Play / Pause Icon Centered Over the Seed Disc */}
        <div className="absolute z-10 flex items-center justify-center text-white transition-all duration-300 group-hover:text-gold">
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-[1.5px]" />
          )}
        </div>

        {/* Small Active Sound Ripple Visualizer overlay when playing */}
        {isPlaying && (
          <div className="absolute -bottom-1 -right-1 bg-medical border border-gold/40 text-white rounded-full p-1 shadow-md scale-90 flex items-center gap-[2px] h-5 w-5 justify-center">
            <span className="w-[2px] h-2 bg-white rounded-full animate-wave-1" />
            <span className="w-[2px] h-3 bg-white rounded-full animate-wave-2" />
            <span className="w-[2px] h-1.5 bg-white rounded-full animate-wave-3" />
          </div>
        )}
      </motion.button>
    </div>
  );
}

