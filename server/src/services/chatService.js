import crypto from 'crypto';

// In-memory conversation repository (Phase 4 session store -> Postgres in future phase)
const conversationStore = new Map();

export const chatService = {
  /**
   * Record a completed user <-> assistant conversational turn
   */
  recordTurn: async (conversationId, userMessage, assistantMessage) => {
    const activeConversationId = conversationId || `conv_${crypto.randomUUID()}`;
    const timestamp = new Date().toISOString();

    if (!conversationStore.has(activeConversationId)) {
      conversationStore.set(activeConversationId, {
        id: activeConversationId,
        createdAt: timestamp,
        updatedAt: timestamp,
        messages: [],
      });
    }

    const conversation = conversationStore.get(activeConversationId);

    // Add user message if provided
    if (userMessage) {
      conversation.messages.push({
        id: `msg_u_${crypto.randomUUID()}`,
        role: 'user',
        content: userMessage,
        timestamp,
      });
    }

    // Add assistant response if provided
    if (assistantMessage) {
      conversation.messages.push({
        id: `msg_a_${crypto.randomUUID()}`,
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date().toISOString(),
      });
    }

    conversation.updatedAt = new Date().toISOString();
    return conversation;
  },

  /**
   * Retrieve active conversations history
   */
  getHistory: async () => {
    const conversations = Array.from(conversationStore.values()).map((conv) => ({
      id: conv.id,
      createdAt: conv.createdAt,
      updatedAt: conv.updatedAt,
      messageCount: conv.messages.length,
      lastMessage: conv.messages[conv.messages.length - 1] || null,
    }));

    return {
      conversations,
      count: conversations.length,
    };
  },

  /**
   * Retrieve specific conversation by ID
   */
  getConversationById: async (conversationId) => {
    return conversationStore.get(conversationId) || null;
  }
};

export default chatService;
