import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function Invitation() {
  return (
    <section className="py-20 px-4 relative flex flex-col items-center justify-center overflow-hidden bg-texture">
      
      {/* Premium Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: "spring", damping: 20 }}
        className="relative w-full max-w-3xl mx-auto"
      >
        <div className="glass-panel p-8 md:p-16 rounded-3xl text-center relative z-10 border-t-2 border-l-2 border-white/80 shadow-[0_30px_60px_rgba(46,125,90,0.15)] bg-white/60 backdrop-blur-xl">
          
          <div className="mb-12 flex justify-center">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="w-[2px] bg-gradient-to-b from-medical via-gold to-transparent"
            ></motion.div>
          </div>
          
          {/* Parents Block */}
          <p className="font-sans text-lg md:text-xl text-gray-700 italic mb-2 text-center">
            {CONFIG.parents.father} <span className="font-sans text-sm mx-2 not-italic font-bold text-medical">&</span> {CONFIG.parents.mother}
          </p>
          <p className="font-sans text-sm text-gray-500 tracking-widest uppercase mb-12 text-center font-semibold">
            tienen el honor de invitarte
          </p>
          
          {/* Academic Block */}
          <p className="font-sans text-lg md:text-xl text-gray-700 font-medium mb-12 max-w-xl mx-auto leading-relaxed text-center">
            "{CONFIG.invitationTexts.academic}"
          </p>
          
          <h3 className="font-sans text-4xl md:text-6xl text-gray-900 mb-2 tracking-widest uppercase text-glow-gold text-center">
            {CONFIG.name.first}
          </h3>
          <h4 className="font-script text-7xl md:text-9xl text-medical mb-8 -rotate-2 drop-shadow-sm text-center capitalize">
            {CONFIG.name.last}
          </h4>
          <div className="flex justify-center mb-16">
            <p className="font-sans text-gold tracking-[0.4em] text-sm md:text-base font-bold uppercase border-b-2 border-gold/30 inline-block pb-2 text-center">
              {CONFIG.profession}
            </p>
          </div>

          {/* Celebration Block */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-12 border border-white shadow-xl text-center">
            <p className="font-sans text-sm md:text-base text-gray-600 tracking-widest uppercase mb-10 leading-relaxed max-w-lg mx-auto font-medium">
              {CONFIG.invitationTexts.celebration}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-r-0 md:border-r border-gray-200">
                <p className="font-sans text-xs tracking-widest text-medical uppercase mb-3 font-bold">Cuándo</p>
                <p className="font-sans text-xl tracking-wide text-gray-800 mb-1">{CONFIG.displayDate}</p>
                <p className="font-sans text-sm text-gray-500">{CONFIG.displayTime}</p>
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest text-medical uppercase mb-3 font-bold">Dónde</p>
                <p className="font-sans text-xl tracking-wide text-gray-800 mb-1">{CONFIG.location.name}</p>
                <p className="font-sans text-sm text-gray-500">{CONFIG.location.address}</p>
                <p className="font-sans text-xs text-gray-400 mt-1">{CONFIG.location.city}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-script text-4xl text-gray-600 mb-8">
              {CONFIG.invitationTexts.rsvpMessage}
            </p>
            <a 
              href={CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-medical text-white font-sans text-xs tracking-[0.2em] uppercase py-4 px-10 rounded-full hover:bg-[#1f5e42] transition-colors duration-300 shadow-[0_4px_20px_rgba(46,125,90,0.3)] hover:shadow-[0_6px_25px_rgba(46,125,90,0.4)] hover:-translate-y-1 transform font-semibold"
            >
              Confirmar asistencia
            </a>
          </div>
        </div>
        
        {/* Decorative background blur behind card */}
        <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full z-0 transform scale-110"></div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full max-w-4xl mx-auto mt-20 text-center"
      >
        <span className="font-sans text-gold text-sm tracking-widest uppercase mb-8 block">Ubicación</span>
        
        <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] mb-8 border-2 border-white relative group">
          <iframe 
            src={CONFIG.location.mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-2xl"></div>
        </div>

        <a 
          href={CONFIG.location.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-gray-300 text-gray-700 font-sans text-xs tracking-widest uppercase py-3 px-8 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors duration-300 bg-white"
        >
          Abrir en Google Maps
        </a>
      </motion.div>

    </section>
  );
}
