import React from 'react';
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import ZorvynLogo from '../brand/ZorvynLogo';

export const Sidebar = () => {
  const {
    conversations,
    activeConversationId,
    searchQuery,
    setSearchQuery,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsSettingsOpen,
    startNewChat,
    selectConversation,
    deleteConversation,
  } = useChat();

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-zorvyn-border-subtle bg-zorvyn-surface/60 backdrop-blur-2xl transition-all duration-300 relative z-30 select-none ${
        isSidebarCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-zorvyn-border-subtle shrink-0">
        {!isSidebarCollapsed ? (
          <ZorvynLogo size="default" showTagline={false} />
        ) : (
          <div className="w-full flex justify-center">
            <ZorvynLogo size="small" />
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1.5 rounded-lg text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface-light/60 transition-colors hidden lg:flex"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label="Toggle sidebar collapse"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Action: New Chat */}
      <div className="p-3 shrink-0">
        <button
          onClick={startNewChat}
          className={`w-full group flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-zorvyn-primary to-zorvyn-secondary text-white font-medium text-sm shadow-glow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-[0.98] ${
            isSidebarCollapsed ? 'px-0' : ''
          }`}
          title="New Conversation"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          {!isSidebarCollapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Search Input (visible when not collapsed) */}
      {!isSidebarCollapsed && (
        <div className="px-3 pb-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zorvyn-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-1.5 bg-zorvyn-bg/70 border border-zorvyn-border-subtle rounded-lg text-xs text-white placeholder-zorvyn-muted/60 focus:outline-none focus:border-zorvyn-primary transition-colors"
            />
          </div>
        </div>
      )}

      {/* Recent Conversations List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 py-1">
        {!isSidebarCollapsed && (
          <div className="px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider text-zorvyn-muted/60 flex items-center justify-between">
            <span>Recent Sessions</span>
            <span className="text-[10px] bg-zorvyn-bg px-1.5 py-0.5 rounded border border-zorvyn-border-subtle">
              {conversations.length}
            </span>
          </div>
        )}

        {conversations.length === 0 ? (
          !isSidebarCollapsed && (
            <div className="p-4 text-center text-xs text-zorvyn-muted/50 font-mono">
              {searchQuery ? "No matches found" : "No conversations yet"}
            </div>
          )
        ) : (
          conversations.map((conv) => {
            const isActive = activeConversationId === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`group relative flex items-center justify-between px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-all duration-150 ${
                  isActive
                    ? 'bg-zorvyn-primary/20 text-white font-medium border border-zorvyn-primary/40 shadow-glow-subtle'
                    : 'text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface-light/40 border border-transparent'
                }`}
                title={conv.title}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-zorvyn-primary' : 'text-zorvyn-muted'}`} />
                  {!isSidebarCollapsed && (
                    <span className="truncate">{conv.title}</span>
                  )}
                </div>

                {!isSidebarCollapsed && (
                  <button
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-zorvyn-muted hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0 ml-1"
                    title="Delete Conversation"
                    aria-label="Delete Conversation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer / Settings Section */}
      <div className="p-2 border-t border-zorvyn-border-subtle shrink-0">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface-light/50 transition-colors ${
            isSidebarCollapsed ? 'justify-center px-0' : ''
          }`}
          title="Settings & System Status"
        >
          <Settings className="w-4 h-4 text-zorvyn-primary shrink-0" />
          {!isSidebarCollapsed && (
            <div className="flex items-center justify-between w-full">
              <span>Settings</span>
              <span className="text-[10px] font-mono text-zorvyn-muted/50">v1.0.0</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

