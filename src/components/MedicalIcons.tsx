import { motion } from 'motion/react';
import { HeartPulse, Stethoscope, Dna, Cross, Activity, Syringe, Pill, Microscope, Thermometer } from 'lucide-react';

export default function MedicalIcons() {
  const iconProps = {
    className: "text-medical/20 absolute drop-shadow-md",
    size: 48,
    strokeWidth: 1.2
  };

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[0]">
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[15%] left-[8%]"
      >
        <Stethoscope {...iconProps} size={56} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        className="absolute top-[35%] right-[10%]"
      >
        <Dna {...iconProps} size={72} className="text-gold/20 absolute drop-shadow-md" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[15%]"
      >
        <HeartPulse {...iconProps} size={64} className="text-red-500/10 absolute drop-shadow-md" />
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-[65%] right-[20%]"
      >
        <Cross {...iconProps} size={40} className="text-medical/20 absolute drop-shadow-md" />
      </motion.div>
      
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
        className="absolute top-[10%] right-[30%]"
      >
        <Activity {...iconProps} size={56} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[15%] right-[12%]"
      >
        <Syringe {...iconProps} size={50} />
      </motion.div>

      <motion.div
        animate={{ x: [0, -20, 0], rotate: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[45%] left-[12%]"
      >
        <Pill {...iconProps} size={42} className="text-gold/20 absolute drop-shadow-md" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 4 }}
        className="absolute top-[80%] left-[30%]"
      >
        <Microscope {...iconProps} size={60} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-[25%] left-[40%]"
      >
        <Thermometer {...iconProps} size={46} />
      </motion.div>
    </div>
  );
}
