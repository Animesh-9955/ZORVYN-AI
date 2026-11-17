import React from 'react';
import { X, Plus, Search, MessageSquare, Trash2, Settings } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import ZorvynLogo from '../brand/ZorvynLogo';

export const MobileNav = () => {
  const {
    conversations,
    activeConversationId,
    searchQuery,
    setSearchQuery,
    isMobileNavOpen,
    setIsMobileNavOpen,
    setIsSettingsOpen,
    startNewChat,
    selectConversation,
    deleteConversation,
  } = useChat();

  if (!isMobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        onClick={() => setIsMobileNavOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-80 max-w-[85%] bg-zorvyn-surface border-r border-zorvyn-border flex flex-col h-full z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zorvyn-border-subtle">
          <ZorvynLogo size="default" showTagline={false} />
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="p-1.5 rounded-lg text-zorvyn-muted hover:text-white bg-zorvyn-bg/50"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action: New Chat */}
        <div className="py-3">
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-zorvyn-primary to-zorvyn-secondary text-white font-medium text-sm shadow-glow-subtle"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zorvyn-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sessions..."
            className="w-full pl-9 pr-3 py-2 bg-zorvyn-bg border border-zorvyn-border-subtle rounded-lg text-sm text-white placeholder-zorvyn-muted/60 focus:outline-none focus:border-zorvyn-primary"
          />
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto space-y-1">
          <div className="px-1 py-1 text-xs font-mono uppercase text-zorvyn-muted/70">
            Recent Sessions
          </div>

          {conversations.length === 0 ? (
            <div className="text-center py-6 text-xs text-zorvyn-muted">
              No conversations
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = activeConversationId === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm ${
                    isActive
                      ? 'bg-zorvyn-primary/20 text-white font-medium border border-zorvyn-primary/40'
                      : 'text-zorvyn-muted active:bg-zorvyn-surface-light'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span className="truncate">{conv.title}</span>
                  </div>
                  <button
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="p-1 text-zorvyn-muted hover:text-red-400"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zorvyn-border-subtle">
          <button
            onClick={() => {
              setIsMobileNavOpen(false);
              setIsSettingsOpen(true);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface-light"
          >
            <Settings className="w-4 h-4 text-zorvyn-primary" />
            <span>Settings & Telemetry</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

