import React from 'react';

export const ZorvynLogo = ({ size = 'default', showTagline = false, className = '' }) => {
  const iconSizes = {
    small: 'w-7 h-7',
    default: 'w-9 h-9',
    large: 'w-14 h-14',
  };

  const textSizes = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Prismatic Z Emblem */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-zorvyn-primary via-zorvyn-accent to-zorvyn-cyan rounded-xl opacity-40 blur-md animate-pulse-slow" />
        
        {/* Crisp SVG mark */}
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="zorvynGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <polygon
            points="50,6 88,28 88,72 50,94 12,72 12,28"
            stroke="url(#zorvynGradLogo)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-60"
          />
          <path
            d="M 28 26 L 72 26 L 72 35 L 42 65 L 72 65 L 72 74 L 28 74 L 28 65 L 58 35 L 28 35 Z"
            fill="url(#zorvynGradLogo)"
          />
          <circle cx="28" cy="26" r="3.5" fill="#C084FC" />
          <circle cx="72" cy="26" r="3.5" fill="#8B5CF6" />
          <circle cx="50" cy="50" r="4" fill="#06B6D4" />
          <circle cx="28" cy="74" r="3.5" fill="#6366F1" />
          <circle cx="72" cy="74" r="3.5" fill="#A855F7" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-wider ${textSizes[size]} text-gradient-zorvyn uppercase font-sans`}>
            ZORVYN
          </span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-zorvyn-primary/20 text-zorvyn-primary border border-zorvyn-primary/30 tracking-widest uppercase">
            AI
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-zorvyn-muted tracking-widest uppercase font-mono font-medium -mt-0.5">
            Intelligence Reimagined
          </span>
        )}
      </div>
    </div>
  );
};

export default ZorvynLogo;

