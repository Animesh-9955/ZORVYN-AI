import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  Check, 
  RotateCw, 
  Sparkles, 
  User, 
  AlertTriangle 
} from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useChat } from '../../context/ChatContext';

export const MessageItem = ({ message, isLastMessage = false }) => {
  const { regenerateResponse, isLoading } = useChat();
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render markdown-like content (splits code blocks, lists, and prose)
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const parts = [];
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          value: content.substring(lastIndex, match.index),
        });
      }
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        value: match[2].trim(),
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        value: content.substring(lastIndex),
      });
    }

    return parts.map((part, index) => {
      if (part.type === 'code') {
        return (
          <CodeBlock
            key={index}
            language={part.language}
            code={part.value}
          />
        );
      }

      // Render prose paragraphs with markdown emphasis support
      const paragraphs = part.value.split('\n\n');
      return (
        <div key={index} className="space-y-2.5">
          {paragraphs.map((p, pIdx) => {
            if (!p.trim()) return null;

            // Header level 1, 2, 3
            if (p.startsWith('# ') || p.startsWith('## ') || p.startsWith('### ')) {
              const cleanHeader = p.replace(/^#+\s*/, '');
              return (
                <h4 key={pIdx} className="text-sm sm:text-base font-bold text-white tracking-wide pt-1">
                  {cleanHeader}
                </h4>
              );
            }

            // Blockquote
            if (p.startsWith('> ')) {
              return (
                <blockquote key={pIdx} className="pl-3.5 border-l-2 border-zorvyn-primary/60 text-zorvyn-muted italic text-xs sm:text-sm my-1.5">
                  {p.replace(/^>\s*/, '')}
                </blockquote>
              );
            }

            // Unordered list
            if (p.startsWith('- ') || p.startsWith('* ') || p.includes('\n- ') || p.includes('\n* ')) {
              const items = p.split('\n').filter(Boolean);
              return (
                <ul key={pIdx} className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#E2E8F0]">
                  {items.map((item, iIdx) => (
                    <li key={iIdx} className="leading-relaxed">
                      {item.replace(/^[-*]\s*/, '')}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={pIdx} className="text-xs sm:text-sm leading-relaxed text-[#E2E8F0] whitespace-pre-line">
                {p}
              </p>
            );
          })}
        </div>
      );
    });
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end my-4 px-4 max-w-4xl mx-auto"
      >
        <div className="flex items-start gap-2.5 max-w-[85%] md:max-w-[75%]">
          {/* User Command Pod */}
          <div className="bg-gradient-to-r from-zorvyn-surface to-zorvyn-surface-light border border-zorvyn-primary/30 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
            <div className="text-xs sm:text-sm leading-relaxed font-normal whitespace-pre-wrap">
              {message.content}
            </div>
          </div>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-xl bg-zorvyn-primary/20 border border-zorvyn-primary/40 flex items-center justify-center shrink-0 text-zorvyn-primary">
            <User className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    );
  }

  // AI Response Area: Cognitive Insight Card
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="my-5 px-4 max-w-4xl mx-auto"
    >
      <div className={`glass-panel-elevated rounded-2xl p-4 sm:p-5 border shadow-glass-panel relative group ${
        message.isError ? 'border-amber-500/40 bg-amber-950/20' : 'border-zorvyn-border'
      }`}>
        {/* Top Telemetry Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-zorvyn-border-subtle text-xs select-none">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-zorvyn-primary/20 border border-zorvyn-primary/40 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-zorvyn-primary" />
            </div>
            <span className="font-bold text-gradient-zorvyn tracking-wide">
              ZORVYN AI
            </span>

            {/* Model Badge */}
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-zorvyn-primary/20 text-zorvyn-primary border border-zorvyn-primary/40">
              {message.telemetry?.model || 'Gemini 3.8 Flash'}
            </span>

            {/* Error indicator */}
            {message.isError && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <AlertTriangle className="w-3 h-3" />
                GATEWAY ALERT
              </span>
            )}
          </div>

          {/* Telemetry Chips */}
          {message.telemetry && (
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zorvyn-muted">
              {message.telemetry.latency && (
                <span className="px-1.5 py-0.5 rounded bg-zorvyn-bg border border-zorvyn-border-subtle">
                  {message.telemetry.latency}
                </span>
              )}
              {message.telemetry.tokens > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-zorvyn-bg border border-zorvyn-border-subtle">
                  {message.telemetry.tokens} tokens
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="space-y-3 font-sans">
          {message.content ? (
            renderFormattedContent(message.content)
          ) : (
            <div className="flex items-center gap-2 text-zorvyn-muted text-xs font-mono py-1">
              <span className="w-2 h-2 rounded-full bg-zorvyn-primary animate-ping" />
              <span>Receiving neural stream from Gemini 3.8 Flash...</span>
            </div>
          )}

          {/* Real-time streaming pulse cursor */}
          {message.isStreaming && message.content && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-zorvyn-primary animate-pulse align-middle" />
          )}
        </div>

        {/* Action Dock (Bottom Bar) */}
        {!message.isStreaming && (
          <div className="flex items-center justify-between pt-3 mt-4 border-t border-zorvyn-border-subtle text-xs">
            <div className="text-[11px] font-mono text-zorvyn-muted/70">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Copy Button */}
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-zorvyn-surface text-zorvyn-muted hover:text-white border border-transparent hover:border-zorvyn-border-subtle transition-all cursor-pointer"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>

              {/* Regenerate Action */}
              <button
                onClick={() => regenerateResponse(message.id)}
                disabled={isLoading}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-zorvyn-surface text-zorvyn-muted hover:text-zorvyn-primary border border-transparent hover:border-zorvyn-border-subtle transition-all disabled:opacity-50 cursor-pointer"
                title="Regenerate Gemini response"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="text-[11px]">Regenerate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageItem;
