import React from 'react';
import { motion } from 'framer-motion';

export const ZorvynOrb = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10">
      {/* Central Neural Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-zorvyn-primary/30 via-zorvyn-secondary/20 to-zorvyn-cyan/15 blur-[120px]"
      />

      {/* Orbiting Quantum Spark */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-[700px] h-[700px] border border-zorvyn-primary/10 rounded-full flex items-center justify-start"
      >
        <div className="w-2 h-2 rounded-full bg-zorvyn-primary shadow-glow-primary" />
      </motion.div>
    </div>
  );
};

export default ZorvynOrb;

