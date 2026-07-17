import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CONFIG } from '../config';
import { Sparkles } from 'lucide-react';

export default function Quote() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const words = CONFIG.quote.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-24 md:py-32 px-6 flex justify-center items-center relative overflow-hidden bg-gradient-to-b from-white via-medical/5 to-white">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      
      {/* Decorative medical background elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-12 text-gold/20 pointer-events-none"
      >
        <Sparkles size={48} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 right-12 text-medical/20 pointer-events-none"
      >
        <Sparkles size={64} />
      </motion.div>

      {/* Floating Medical Crosses */}
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 text-medical/15 pointer-events-none"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 text-gold/15 pointer-events-none"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.div>

      {/* Heartbeat path (ECG) in background */}
      <div className="absolute inset-x-0 bottom-6 h-24 text-medical/5 pointer-events-none flex justify-center items-center overflow-hidden">
        <svg className="w-full max-w-lg opacity-30" viewBox="0 0 300 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0 50 h60 l10 -30 l15 70 l10 -55 l10 25 l15 -10 h180" strokeDasharray="300" strokeDashoffset="0" className="animate-[dash_4s_linear_infinite]" />
        </svg>
      </div>

      <motion.div 
        ref={containerRef}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <h2 className="font-script text-5xl md:text-7xl lg:text-8xl leading-snug md:leading-snug text-medical font-normal drop-shadow-sm">
          {words.map((word, index) => (
            <motion.span
              variants={child}
              key={index}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </motion.div>
    </section>
  );
}
