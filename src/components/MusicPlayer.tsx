import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ isPlaying, togglePlay }: { isPlaying: boolean, togglePlay: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0, rotate: -90 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1, duration: 1, type: "spring" }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-[999] p-4 rounded-full glass-panel bg-white/80 backdrop-blur-xl border-2 border-gold/30 hover:border-gold/80 hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 group"
      aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <Volume2 className="w-7 h-7 text-medical drop-shadow-md" />
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <VolumeX className="w-7 h-7 text-gray-400 group-hover:text-medical transition-colors drop-shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border-2 border-medical/40 animate-ping" style={{ animationDuration: '2s' }}></span>
      )}
    </motion.button>
  );
}
