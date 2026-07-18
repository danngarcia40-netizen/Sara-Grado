import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CONFIG } from '../config';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={CONFIG.heroImage} 
          alt="Sara Lucía Muñoz Damián" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center flex flex-col items-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.2 }}
            className="absolute -top-20 -left-10 w-40 h-40 bg-medical/30 rounded-full blur-[80px]"
          ></motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.4 }}
            className="absolute -bottom-20 -right-10 w-40 h-40 bg-gold/20 rounded-full blur-[80px]"
          ></motion.div>
          
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-widest leading-tight drop-shadow-2xl uppercase">
            {CONFIG.name.first}
          </h1>
          <h2 className="font-script text-7xl md:text-8xl lg:text-9xl text-gold mt-2 -rotate-2 drop-shadow-xl font-normal capitalize">
            {CONFIG.name.last}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          className="mt-8 md:mt-12"
        >
          <p className="font-sans text-gold text-sm md:text-xl tracking-[0.4em] md:tracking-[0.6em] font-medium text-glow-gold uppercase">
            {CONFIG.profession}
          </p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut" 
            }}
            className="w-14 h-14 flex items-center justify-center drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
          >
            <svg viewBox="0 0 100 100" className="w-12 h-12">
              <g transform="translate(50,50)">
                {/* Petals */}
                {[...Array(12)].map((_, i) => (
                  <path 
                    key={i} 
                    d="M 0 -12 C -6 -22 -10 -32 0 -40 C 10 -32 6 -22 0 -12" 
                    fill="#FFD700" 
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    transform={`rotate(${i * 30})`} 
                  />
                ))}
                {/* Center */}
                <circle cx="0" cy="0" r="13" fill="#4A2E1B" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="0" cy="0" r="9" fill="#2E1C10" />
                {/* Seeds texture dots */}
                <circle cx="-3" cy="-3" r="1.5" fill="#E5A93C" opacity="0.7" />
                <circle cx="3" cy="3" r="1.5" fill="#E5A93C" opacity="0.7" />
                <circle cx="4" cy="-2" r="1" fill="#E5A93C" opacity="0.6" />
                <circle cx="-2" cy="4" r="1" fill="#E5A93C" opacity="0.6" />
              </g>
            </svg>
          </motion.div>
          <span className="font-sans text-white/70 text-[10px] tracking-[0.2em] uppercase font-medium mt-1">Deslizar</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-6 bg-gradient-to-b from-gold to-transparent mt-1"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
