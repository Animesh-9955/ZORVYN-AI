import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '../../context/ChatContext';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import WelcomeHero from '../home/WelcomeHero';
import SuggestionCards from '../home/SuggestionCards';
import MessageComposer from '../composer/MessageComposer';

export const ConversationWorkspace = () => {
  const { activeConversation, isLoading } = useChat();
  const messagesEndRef = useRef(null);
  const [selectedPrompt, setSelectedPrompt] = useState('');

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages, isLoading]);

  const hasMessages = activeConversation && activeConversation.messages.length > 0;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-radial-mesh">
      {/* Scrollable Conversation or Welcome View */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 space-y-2">
        {!hasMessages ? (
          <div className="h-full flex flex-col justify-center items-center py-6">
            <WelcomeHero />
            <SuggestionCards onSelectPrompt={(prompt) => setSelectedPrompt(prompt)} />
          </div>
        ) : (
          <div className="pt-2 pb-6 space-y-4">
            {activeConversation.messages.map((msg, index) => (
              <MessageItem
                key={msg.id || index}
                message={msg}
                isLastMessage={index === activeConversation.messages.length - 1}
              />
            ))}

            {/* Loading Indicator if waiting for initial chunk */}
            {isLoading && activeConversation?.messages[activeConversation.messages.length - 1]?.role === 'user' && (
              <TypingIndicator />
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Floating Glass Message Composer */}
      <MessageComposer
        initialValue={selectedPrompt}
        onClearInitial={() => setSelectedPrompt('')}
      />
    </div>
  );
};

export default ConversationWorkspace;

