import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONFIG } from '../config';
import { X } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Vogue-style asymmetrical layout classes
  const getLayoutClass = (index: number) => {
    switch (index % 4) {
      case 0: return "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[16/9] md:-mt-12";
      case 1: return "col-span-12 md:col-span-5 aspect-[4/5] md:mt-24";
      case 2: return "col-span-12 md:col-span-5 aspect-[4/5] md:aspect-square md:-mt-16 md:ml-12";
      case 3: return "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[3/2] md:mt-12";
      default: return "col-span-12 aspect-[4/5]";
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 max-w-7xl mx-auto relative bg-texture">
      
      {/* Glamorous floating bokeh lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 80, -120, 0],
            scale: [1, 1.25, 0.85, 1],
            opacity: [0.12, 0.3, 0.12],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] w-36 h-36 rounded-full bg-gold/15 blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, 70, -50, 0],
            y: [0, -90, 60, 0],
            scale: [1, 0.8, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] left-[15%] w-44 h-44 rounded-full bg-medical/15 blur-3xl"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: "spring", damping: 20 }}
        className="mb-16 text-center"
      >
        <span className="font-sans text-gold text-sm tracking-widest uppercase mb-4 font-semibold flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-gold"></span>
          Memorias
          <span className="w-8 h-[1px] bg-gold"></span>
        </span>
        <h2 className="font-sans text-4xl md:text-6xl text-gray-900 font-light tracking-wide mt-4">
          Instantes de <span className="font-script text-7xl md:text-9xl text-medical font-normal ml-2 capitalize">dedicación</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {CONFIG.galleryImages.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, filter: "blur(15px)", scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: index * 0.15, type: "spring", damping: 25 }}
            className={`relative overflow-hidden group cursor-none rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] ${getLayoutClass(index)}`}
            onClick={() => setSelectedImage(src)}
          >
            <div className="w-full h-full bg-gray-200 overflow-hidden">
              <motion.img 
                whileHover={{ scale: 1.1, rotate: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src={src} 
                alt={`Galería ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-medical/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="text-white font-sans tracking-widest text-xs uppercase border-b border-gold pb-1 font-semibold"
              >
                Ver imagen
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-none"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              src={selectedImage}
              alt="Pantalla completa"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
