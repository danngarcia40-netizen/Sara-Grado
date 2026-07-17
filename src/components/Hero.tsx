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
          <img 
            src="https://i.pinimg.com/originals/30/8a/be/308abe81c5d0ba92120e2908f902dc67.png" 
            alt="Dra Juguetes" 
            className="w-16 md:w-20 h-auto opacity-80 hover:opacity-100 transition-opacity drop-shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://m.media-amazon.com/images/I/71rB58hP0FL._AC_SL1500_.jpg';
            }}
          />
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
