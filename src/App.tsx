import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONFIG } from './config';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Quote from './components/Quote';
import Gallery from './components/Gallery';
import Countdown from './components/Countdown';
import Invitation from './components/Invitation';
import MedicalIcons from './components/MedicalIcons';
import CustomCursor from './components/CustomCursor';
import MusicPlayer from './components/MusicPlayer';
import MedicalArkanoid from './components/MedicalArkanoid';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  // Scroll to top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fallback to start music on first user touch/click anywhere on screen
  useEffect(() => {
    const handleUserInteractionFallback = () => {
      if (hasInteracted.current) return;
      if (audioRef.current && !isPlaying) {
        audioRef.current.load();
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
            removeListeners();
          })
          .catch(() => {
            // Still locked or not loaded, will retry on next touch or manual click
          });
      }
    };

    const removeListeners = () => {
      document.removeEventListener('click', handleUserInteractionFallback);
      document.removeEventListener('touchstart', handleUserInteractionFallback);
    };

    document.addEventListener('click', handleUserInteractionFallback);
    document.addEventListener('touchstart', handleUserInteractionFallback);

    return () => {
      removeListeners();
    };
  }, [isPlaying]);

  const handleStartMusic = () => {
    if (audioRef.current) {
      hasInteracted.current = true; // Mark as interacted since we clicked the enter button
      audioRef.current.load(); // Force load inside synchronous gesture block
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.log("Reproducción automática de música bloqueada por el navegador:", err);
        });
    }
  };

  return (
    <>
      <CustomCursor />
      
      {/* Root-level Audio element using absolute path from config */}
      <audio
        ref={audioRef}
        src={CONFIG.musicUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} onStartMusic={handleStartMusic} />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="bg-texture min-h-screen"
          >
            <MedicalIcons />
            <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
            
            <Hero />
            <Quote />
            <Gallery />
            <Countdown />
            <Invitation />
            <MedicalArkanoid />
            
            {/* Footer */}
            <footer className="py-20 md:py-24 px-6 text-center bg-medical border-t border-gray-100 relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                <p className="font-script text-4xl md:text-5xl text-gold mb-6 -rotate-2">
                  Gracias por acompañarnos
                </p>
                <p className="font-sans text-sm md:text-base text-white/80 font-medium tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
                  en uno de los días más importantes de nuestra vida
                </p>
                <div className="w-16 h-[2px] bg-gold mx-auto mt-10 rounded-full"></div>
              </motion.div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
