import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Network, Sparkles, ArrowUpRight } from 'lucide-react';
import { SUGGESTION_CARDS } from '../../data/mockData';
import { useChat } from '../../context/ChatContext';

const iconMap = {
  Cpu,
  Code2,
  Network,
  Sparkles,
};

export const SuggestionCards = ({ onSelectPrompt }) => {
  const { sendMessage } = useChat();

  const handleCardClick = (prompt) => {
    if (onSelectPrompt) {
      onSelectPrompt(prompt);
    } else {
      sendMessage(prompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 pb-6">
      {SUGGESTION_CARDS.map((card, index) => {
        const IconComponent = iconMap[card.icon] || Sparkles;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            onClick={() => handleCardClick(card.prompt)}
            className="group relative p-4 rounded-2xl glass-card cursor-pointer border border-zorvyn-border-subtle hover:border-zorvyn-primary/50 text-left transition-all duration-300"
          >
            {/* Top row: Category tag & Action Icon */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zorvyn-primary/10 border border-zorvyn-primary/20 text-zorvyn-primary group-hover:bg-zorvyn-primary/20 group-hover:scale-105 transition-all">
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-zorvyn-muted group-hover:text-zorvyn-primary transition-colors">
                  {card.category}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zorvyn-muted group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-zorvyn-primary transition-colors">
              {card.title}
            </h3>

            {/* Prompt preview */}
            <p className="text-xs text-zorvyn-muted/80 line-clamp-2 leading-relaxed">
              {card.prompt}
            </p>

            {/* Subtle glow border effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-zorvyn-primary/0 via-zorvyn-primary/10 to-zorvyn-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default SuggestionCards;

