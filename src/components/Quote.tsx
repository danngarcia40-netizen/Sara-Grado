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
    <section className="py-24 md:py-32 px-6 flex justify-center items-center relative overflow-hidden bg-white">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 text-gold/20"
      >
        <Sparkles size={48} />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-10 text-medical/20"
      >
        <Sparkles size={64} />
      </motion.div>

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
