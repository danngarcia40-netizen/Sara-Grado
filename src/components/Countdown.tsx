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
    <section className="py-16 md:py-24 px-6 relative overflow-hidden flex justify-center bg-medical/5">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", damping: 20 }}
          className="text-center bg-white/40 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(46,125,90,0.1)] border-2 border-white relative"
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
