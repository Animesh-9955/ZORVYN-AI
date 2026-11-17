import React from 'react';
import { motion } from 'framer-motion';
import ZorvynLogo from '../brand/ZorvynLogo';

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-3 my-4 px-4 max-w-4xl mx-auto"
    >
      {/* Mini Brand Avatar */}
      <div className="w-8 h-8 rounded-xl bg-zorvyn-surface border border-zorvyn-primary/30 flex items-center justify-center shrink-0 shadow-glow-subtle">
        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-zorvyn-primary to-zorvyn-cyan animate-pulse" />
      </div>

      {/* Synthesis Bubble */}
      <div className="glass-panel px-4 py-3 rounded-2xl rounded-tl-sm border border-zorvyn-primary/30 shadow-glow-subtle flex items-center gap-3">
        {/* Pulsing Dots */}
        <div className="flex items-center gap-1.5">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 rounded-full bg-zorvyn-primary"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-zorvyn-accent"
          />
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-zorvyn-cyan"
          />
        </div>
        <span className="text-xs font-mono text-zorvyn-muted tracking-wider">
          Synthesizing simulated response...
        </span>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;

