import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';
import SettingsModal from './components/layout/SettingsModal';
import ConversationWorkspace from './components/chat/ConversationWorkspace';

export function AppContent() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zorvyn-bg text-zorvyn-text select-none">
      {/* Collapsible Desktop Sidebar */}
      <Sidebar />

      {/* Slide-out Mobile Navigation */}
      <MobileNav />

      {/* Main Command & Chat Canvas */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <Header />
        <ConversationWorkspace />
      </div>

      {/* Settings Dialog */}
      <SettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </BrowserRouter>
  );
}

