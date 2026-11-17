import React from 'react';
import { Menu, Settings, Sparkles, Activity } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import ZorvynLogo from '../brand/ZorvynLogo';

export const Header = () => {
  const {
    activeConversation,
    setIsMobileNavOpen,
    setIsSettingsOpen,
    startNewChat,
  } = useChat();

  return (
    <header className="h-16 px-4 md:px-6 border-b border-zorvyn-border-subtle bg-zorvyn-bg/70 backdrop-blur-xl flex items-center justify-between shrink-0 z-20">
      {/* Left: Mobile Menu & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="md:hidden p-2 rounded-lg text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center">
          {activeConversation ? (
            <div className="flex items-center gap-2">
              <span
                onClick={startNewChat}
                className="text-xs text-zorvyn-muted hover:text-white cursor-pointer transition-colors"
              >
                Console
              </span>
              <span className="text-zorvyn-muted/40 text-xs">/</span>
              <span className="text-sm font-medium text-white max-w-[280px] truncate">
                {activeConversation.title}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-zorvyn-muted">
                Neural Matrix Active
              </span>
            </div>
          )}
        </div>

        {/* Mobile brand display */}
        <div className="md:hidden">
          <ZorvynLogo size="small" />
        </div>
      </div>

      {/* Right: Telemetry & Actions */}
      <div className="flex items-center gap-2.5">
        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zorvyn-surface border border-zorvyn-border text-xs text-zorvyn-muted font-mono">
          <Sparkles className="w-3.5 h-3.5 text-zorvyn-primary" />
          <span>Gemini 2.5 Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zorvyn-cyan" />
        </div>

        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-xl text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface border border-transparent hover:border-zorvyn-border transition-all"
          title="Console Settings"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;

