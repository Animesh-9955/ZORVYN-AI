import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Shield, Cpu } from 'lucide-react';
import ZorvynLogo from '../brand/ZorvynLogo';
import ZorvynOrb from '../brand/ZorvynOrb';

export const WelcomeHero = () => {
  return (
    <div className="relative text-center px-4 max-w-3xl mx-auto pt-6 pb-4">
      {/* Background Ambient Orb */}
      <ZorvynOrb />

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-zorvyn-primary/30 mb-6 shadow-glow-subtle"
      >
        <Sparkles className="w-3.5 h-3.5 text-zorvyn-primary animate-pulse" />
        <span className="text-xs font-mono font-medium text-zorvyn-muted tracking-wider uppercase">
          Next-Generation Cognitive Architecture
        </span>
      </motion.div>

      {/* Brand Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center mb-5"
      >
        <ZorvynLogo size="large" showTagline={false} />
      </motion.div>

      {/* Animated Welcome Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
      >
        <span className="text-white">Intelligence </span>
        <span className="text-gradient-zorvyn">Reimagined.</span>
      </motion.h1>

      {/* Introduction paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-zorvyn-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal mb-6"
      >
        Welcome to <strong className="text-white font-semibold">ZORVYN</strong> — an autonomous neural console designed for deep technical reasoning, algorithmic synthesis, and distributed architecture.
      </motion.p>
    </div>
  );
};

export default WelcomeHero;

