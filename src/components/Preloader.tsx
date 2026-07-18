import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader({ onComplete, onStartMusic }: { onComplete: () => void, onStartMusic: () => void, key?: string }) {
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3500); // Show button after EKG animation completes
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    onStartMusic();
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="w-full max-w-2xl px-8 relative">
            {/* EKG SVG */}
            <svg viewBox="0 0 1000 200" className="w-full drop-shadow-[0_0_10px_rgba(46,125,90,0.8)]">
              <motion.path
                d="M 0 100 L 200 100 L 220 100 L 250 100 L 270 70 L 300 130 L 330 40 L 370 160 L 400 100 L 450 100 L 550 100 L 570 100 L 600 100 L 620 70 L 650 130 L 680 40 L 720 160 L 750 100 L 800 100 L 1000 100"
                fill="transparent"
                stroke="#2E7D5A" /* Medical Green */
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              {/* Glow effect path */}
              <motion.path
                d="M 0 100 L 200 100 L 220 100 L 250 100 L 270 70 L 300 130 L 330 40 L 370 160 L 400 100 L 450 100 L 550 100 L 570 100 L 600 100 L 620 70 L 650 130 L 680 40 L 720 160 L 750 100 L 800 100 L 1000 100"
                fill="transparent"
                stroke="#2E7D5A"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={{ filter: "blur(4px)" }}
              />
            </svg>
          </div>

          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mt-16"
              >
                <button
                  type="button"
                  onClick={handleEnter}
                  className="px-10 py-4 rounded-full border border-white/20 text-white font-sans tracking-[0.3em] text-sm font-semibold uppercase hover:bg-white hover:text-medical hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-500 flex flex-col items-center gap-2 transform active:scale-95 hover:scale-105 cursor-pointer"
                >
                  <span>Ingresar</span>
                  <span className="font-script text-2xl normal-case tracking-normal text-gold opacity-80 mt-1">
                    a la celebración
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
