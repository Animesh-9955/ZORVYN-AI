import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Square, 
  Sparkles, 
  Image as ImageIcon 
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

export const MessageComposer = ({ initialValue = '', onClearInitial }) => {
  const { sendMessage, stopGeneration, isLoading } = useChat();
  const [input, setInput] = useState(initialValue);
  const [attachmentNotice, setAttachmentNotice] = useState(false);
  const textareaRef = useRef(null);

  // Sync initialValue if provided externally (e.g. from suggestion card click)
  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      if (onClearInitial) onClearInitial();
    }
  }, [initialValue, onClearInitial]);

  // Auto-resize textarea to support multiline messages
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, 24), 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage(input);
    setInput('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    // Enter sends; Shift+Enter creates a multiline break
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const triggerAttachment = () => {
    setAttachmentNotice(true);
    setTimeout(() => setAttachmentNotice(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-1 z-20">
      {/* Temporary Notice if attachment clicked */}
      {attachmentNotice && (
        <div className="mb-2 text-center text-[11px] font-mono text-zorvyn-primary bg-zorvyn-surface/80 border border-zorvyn-primary/30 py-1 px-3 rounded-lg animate-pulse">
          Attachment pipeline ready for multi-modal Phase 5.
        </div>
      )}

      {/* Floating Glass Composer Nexus */}
      <form
        onSubmit={handleSubmit}
        className="glass-composer rounded-2xl p-2.5 sm:p-3 relative border border-zorvyn-border focus-within:border-zorvyn-primary/60 focus-within:shadow-glow-primary transition-all duration-300"
      >
        <div className="flex flex-col">
          {/* Text input area with multiline support */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isLoading
                ? "Synthesizing response via Gemini 3.8 Flash..."
                : "Command ZORVYN... (Enter to send, Shift+Enter for multiline)"
            }
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zorvyn-muted/50 focus:outline-none resize-none px-2 py-1 max-h-52 leading-relaxed font-sans"
            disabled={isLoading}
          />

          {/* Action Controls Row */}
          <div className="flex items-center justify-between pt-2 px-1 text-xs select-none">
            {/* Left Tools */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={triggerAttachment}
                className="p-1.5 rounded-lg text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface transition-colors"
                title="Attach Document / Schema (Phase 5)"
                aria-label="Attach File"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={triggerAttachment}
                className="p-1.5 rounded-lg text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface transition-colors hidden sm:block"
                title="Add Image Vector (Phase 5)"
                aria-label="Add Image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-zorvyn-muted/60 pl-2">
                <span>Model:</span>
                <span className="text-zorvyn-primary font-semibold">Gemini 3.8 Flash</span>
              </div>
            </div>

            {/* Right Tools: Stop or Send Button */}
            <div className="flex items-center gap-2">
              {isLoading ? (
                /* Stop Generation Button */
                <button
                  type="button"
                  onClick={stopGeneration}
                  className="flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-medium transition-all duration-200 active:scale-95 shadow-lg shadow-red-500/10"
                  title="Stop Generating"
                  aria-label="Stop Generating"
                >
                  <Square className="w-3.5 h-3.5 sm:mr-1.5 fill-red-400 text-red-400" />
                  <span className="text-xs">Stop</span>
                </button>
              ) : (
                /* Execute / Send Button */
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={`flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-xl text-white font-medium transition-all duration-200 ${
                    input.trim()
                      ? 'bg-gradient-to-r from-zorvyn-primary to-zorvyn-secondary shadow-glow-subtle hover:shadow-glow-primary active:scale-95 cursor-pointer'
                      : 'bg-zorvyn-surface text-zorvyn-muted cursor-not-allowed border border-zorvyn-border-subtle'
                  }`}
                  title="Send Command"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4 sm:mr-1.5" />
                  <span className="hidden sm:inline text-xs">Execute</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;
