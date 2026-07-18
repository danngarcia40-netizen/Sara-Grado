import { useState } from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function Invitation() {
  const [parentsPhotoError, setParentsPhotoError] = useState(false);
  return (
    <section className="py-20 px-4 relative flex flex-col items-center justify-center overflow-hidden bg-texture">
      
      {/* Glamorous floating bokeh lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[25%] w-32 h-32 rounded-full bg-gold/15 blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 90, -70, 0],
            scale: [1, 0.85, 1.1, 1],
            opacity: [0.1, 0.22, 0.1],
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[30%] w-36 h-36 rounded-full bg-medical/15 blur-3xl"
        />
      </div>
      
      {/* Fun Medical Background Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-4 md:left-12 text-medical/10 pointer-events-none hidden sm:block"
      >
        {/* Stethoscope SVG */}
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h14c0-2.31-1-4.24-2.5-5.5" />
          <path d="M12 2v10a4 4 0 0 0 8 0V2" />
          <path d="M12 6h8" />
          <circle cx="6" cy="11" r="3" />
          <path d="M6 14v2.5" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-4 md:right-12 text-gold/15 pointer-events-none hidden sm:block"
      >
        {/* DNA/Double Helix / Sparkles */}
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M4.5 10.5C4.5 5.25 12 3 12 3s7.5 2.25 7.5 7.5c0 5.25-7.5 10.5-7.5 10.5s-7.5-5.25-7.5-10.5Z" />
          <path d="M12 3v18" />
          <path d="M8 8h8" />
          <path d="M6.5 13h11" />
          <path d="M8 18h8" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-8 text-gold/10 pointer-events-none hidden md:block"
      >
        {/* Doctor Cap / Graduation Cap */}
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      </motion.div>

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
          {CONFIG.parents.photo && (
            <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-8 flex items-center justify-center">
              {/* Spinning decorative sunflower ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-gold/40 animate-[spin_40s_linear_infinite]" />
              {/* Soft decorative background glow */}
              <div className="absolute inset-2 bg-gradient-to-tr from-medical/10 to-gold/10 rounded-full blur-xl animate-pulse" />
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-gold shadow-[0_15px_35px_rgba(212,175,55,0.3)] group z-10 bg-white/80"
              >
                {!parentsPhotoError ? (
                  <img 
                    src={CONFIG.parents.photo} 
                    alt="Padres de Sara Lucía" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setParentsPhotoError(true);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-gold/15 via-white to-medical/15 flex flex-col items-center justify-center p-4">
                    <svg className="w-12 h-12 md:w-14 md:h-14 text-gold animate-pulse mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-medical/80">Con Amor</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-medical/20 via-transparent to-transparent pointer-events-none opacity-60" />
              </motion.div>

              {/* Floating micro sunflower accents */}
              <div className="absolute -top-2 -right-2 w-8 h-8 pointer-events-none drop-shadow-md select-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <g transform="translate(50,50)">
                    {[...Array(8)].map((_, i) => (
                      <path 
                        key={i} 
                        d="M 0 -12 C -6 -22 -10 -32 0 -40 C 10 -32 6 -22 0 -12" 
                        fill="#FFD700" 
                        transform={`rotate(${i * 45})`} 
                      />
                    ))}
                    <circle cx="0" cy="0" r="13" fill="#4A2E1B" />
                  </g>
                </svg>
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 pointer-events-none drop-shadow-md select-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <g transform="translate(50,50)">
                    {[...Array(8)].map((_, i) => (
                      <path 
                        key={i} 
                        d="M 0 -12 C -6 -22 -10 -32 0 -40 C 10 -32 6 -22 0 -12" 
                        fill="#FFD700" 
                        transform={`rotate(${i * 45})`} 
                      />
                    ))}
                    <circle cx="0" cy="0" r="13" fill="#4A2E1B" />
                  </g>
                </svg>
              </div>
            </div>
          )}

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

      {/* Inspirational Childhood Dream Card with Dra Juguetes and Sunflowers */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, type: "spring" }}
        className="w-full max-w-2xl mx-auto mt-24 px-4 relative z-10"
      >
        {/* Floating Sunflowers around the Card */}
        <div className="absolute -top-12 -left-8 w-20 h-20 pointer-events-none drop-shadow-lg select-none">
          <motion.div
            animate={{ rotate: 360, y: [0, -10, 0] }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <g transform="translate(50,50)">
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
                <circle cx="0" cy="0" r="13" fill="#4A2E1B" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="0" cy="0" r="9" fill="#2E1C10" />
              </g>
            </svg>
          </motion.div>
        </div>

        <div className="absolute -bottom-8 -right-8 w-24 h-24 pointer-events-none drop-shadow-xl select-none">
          <motion.div
            animate={{ rotate: -360, y: [0, 10, 0] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
          >
            <svg viewBox="0 0 100 100" className="w-20 h-20">
              <g transform="translate(50,50)">
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
                <circle cx="0" cy="0" r="13" fill="#4A2E1B" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="0" cy="0" r="9" fill="#2E1C10" />
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Card content with rainbow color changing glow */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/95 to-white/70 backdrop-blur-xl border border-white/80 p-8 md:p-12 shadow-[0_20px_50px_rgba(212,175,55,0.12)] text-center group">
          {/* Animated color shifting glow border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-medical/10 via-gold/10 to-pink-300/10 opacity-60 pointer-events-none animate-[pulse_6s_infinite_alternate]" />
          
          <span className="font-sans text-xs tracking-[0.3em] text-medical uppercase font-bold block mb-3">La Inspiración Detrás del Sueño</span>
          
          {/* Polaroid style beautifully integrated image */}
          <div className="relative w-48 md:w-56 mx-auto mb-8 bg-white p-3 rounded-xl shadow-xl border border-gray-100 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
            <img 
              src="https://es.web.img2.acsta.net/c_310_420/pictures/14/03/06/11/41/025077.jpg" 
              alt="Dra Juguetes Inspiración" 
              className="w-full h-auto rounded-lg object-cover aspect-[3/4]"
              referrerPolicy="no-referrer"
            />
            {/* Little cute gold flower pin/tape effect at the top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold/90 text-white font-sans text-[8px] tracking-widest uppercase px-3 py-1 rounded shadow-sm flex items-center gap-1 font-semibold">
              <span className="animate-pulse">★</span> Con Amor <span>★</span>
            </div>
          </div>

          <h3 className="font-script text-4xl md:text-5xl text-glow-gold text-gold mb-4 leading-normal font-medium">
            "Donde todo comenzó..."
          </h3>
          
          <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed max-w-md mx-auto italic">
            "Desde pequeña, sanando juguetes con amor e ilusión; hoy, lista para cuidar vidas con todo el conocimiento y el corazón."
          </p>

          <div className="flex justify-center items-center gap-2 mt-6 text-medical/40">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span className="h-[1px] w-12 bg-gray-200"></span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2"/></svg>
            <span className="h-[1px] w-12 bg-gray-200"></span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
