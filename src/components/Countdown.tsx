import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  });

  useEffect(() => {
    const targetDate = new Date(CONFIG.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden flex justify-center bg-gradient-to-tr from-medical/10 via-white to-gold/10">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      
      {/* Glamorous floating bokeh lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-32 h-32 rounded-full bg-gold/15 blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -60, 50, 0],
            y: [0, 120, -80, 0],
            scale: [1, 0.7, 1.2, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] right-[25%] w-40 h-40 rounded-full bg-medical/15 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, 80, -60, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[60%] left-[5%] w-24 h-24 rounded-full bg-gold/10 blur-xl"
        />
      </div>
      
      {/* Animated floating stethoscope/pills vectors in background */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 md:left-20 text-medical/15 pointer-events-none"
      >
        {/* Cute Band-aid outline */}
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="6" width="20" height="12" rx="3" transform="rotate(-45 12 12)" />
          <path d="M9 15 l6-6" />
          <circle cx="10.5" cy="10.5" r="1" fill="currentColor" />
          <circle cx="13.5" cy="13.5" r="1" fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 md:right-20 text-gold/20 pointer-events-none"
      >
        {/* Medicine Pill Capsule outline */}
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="5" width="14" height="14" rx="7" transform="rotate(45 12 12)" />
          <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" stroke="currentColor" />
        </svg>
      </motion.div>

      {/* Pulsing red-cross heartbeat heart in countdown container background */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/4 text-medical/5 pointer-events-none"
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </motion.div>

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", damping: 20 }}
          className="text-center bg-white/70 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(46,125,90,0.1)] border-2 border-white relative"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-medical/20 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="font-sans text-3xl md:text-5xl text-gray-800 font-light tracking-widest uppercase mb-12 flex flex-col gap-4">
            <span className="text-sm font-semibold text-medical">La espera termina en</span>
            <span className="font-script text-6xl md:text-8xl text-gold capitalize normal-case -rotate-2">El Gran Día</span>
          </h2>

          <div className="flex flex-row justify-center gap-2 sm:gap-6 md:gap-12 relative z-10">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-16 h-20 sm:w-20 sm:h-24 md:w-28 md:h-32 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center mb-3 md:mb-4 relative overflow-hidden">
                  <div className="absolute w-full h-[1px] bg-gray-100 top-1/2 left-0 -translate-y-1/2"></div>
                  
                  <motion.span 
                    key={value}
                    initial={{ y: -20, opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="font-sans text-4xl sm:text-5xl md:text-7xl text-medical font-light tracking-tighter"
                  >
                    {value.toString().padStart(2, '0')}
                  </motion.span>
                </div>
                <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold">
                  {unit}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
