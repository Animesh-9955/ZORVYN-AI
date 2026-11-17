import crypto from 'crypto';
import geminiService from '../services/geminiService.js';
import chatService from '../services/chatService.js';
import config from '../config/env.js';
import logger from '../utils/logger.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/**
 * POST /api/chat/stream
 * Server-Sent Events (SSE) streaming endpoint powered by Google Gemini API
 */
export const streamChatMessage = async (req, res) => {
  const { message, conversationId, history, systemInstruction } = req.body || {};

  // 1. Request Validation
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return sendError(res, 'Field "message" is required and cannot be empty', 400, 'VALIDATION_ERROR');
  }

  const sanitizedMessage = message.trim();
  const activeConversationId = conversationId || `conv_${crypto.randomUUID()}`;

  // 2. Setup Server-Sent Events (SSE) headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  // 3. Client Disconnect Detection
  let isClientConnected = true;
  req.on('close', () => {
    isClientConnected = false;
    logger.info(`SSE client disconnected for conversation ${activeConversationId}`);
  });

  const startTime = Date.now();
  let fullResponseText = '';
  let chunkCount = 0;

  try {
    // 4. Request Gemini stream
    const responseStream = await geminiService.generateStream({
      message: sanitizedMessage,
      history: Array.isArray(history) ? history : [],
      customInstruction: systemInstruction || null,
    });

    // 5. Stream chunks to client
    for await (const chunk of responseStream) {
      if (!isClientConnected) {
        logger.warn(`Aborting stream for conversation ${activeConversationId} due to client disconnect`);
        break;
      }

      const text = chunk.text;
      if (text) {
        fullResponseText += text;
        chunkCount++;
        res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`);
      }
    }

    // 6. Send completion event if client remains connected
    if (isClientConnected) {
      const durationMs = Date.now() - startTime;
      
      // Record conversation turn
      await chatService.recordTurn(activeConversationId, sanitizedMessage, fullResponseText);

      const completionPayload = {
        done: true,
        conversationId: activeConversationId,
        telemetry: {
          model: config.ai.geminiModel,
          latency: `${durationMs}ms`,
          chunks: chunkCount,
          tokens: Math.round(fullResponseText.length / 4),
        },
      };

      res.write(`data: ${JSON.stringify(completionPayload)}\n\n`);
      res.end();
    }
  } catch (error) {
    logger.error(`Stream error for conversation ${activeConversationId}:`, error.message || error);

    const normalized = error.code ? error : geminiService.normalizeError(error);

    if (isClientConnected) {
      res.write(`data: ${JSON.stringify({
        error: normalized.message,
        code: normalized.code,
        status: normalized.status || 500,
      })}\n\n`);
      res.end();
    }
  }
};

/**
 * POST /api/chat
 * Standard non-streaming Gemini chat endpoint
 */
export const postChatMessage = async (req, res, next) => {
  try {
    const { sanitizedMessage, sanitizedConversationId } = req;
    const { history, systemInstruction } = req.body || {};

    const activeConversationId = sanitizedConversationId || `conv_${crypto.randomUUID()}`;
    const startTime = Date.now();

    const result = await geminiService.generateContent({
      message: sanitizedMessage,
      history: Array.isArray(history) ? history : [],
      customInstruction: systemInstruction || null,
    });

    const durationMs = Date.now() - startTime;

    // Record turn in storage
    await chatService.recordTurn(activeConversationId, sanitizedMessage, result.text);

    return sendSuccess(res, {
      conversationId: activeConversationId,
      message: result.text,
      telemetry: {
        model: result.model,
        latency: `${durationMs}ms`,
        tokens: result.usage?.totalTokenCount || Math.round(result.text.length / 4),
      },
    }, 'Gemini content generated successfully', 200);
  } catch (error) {
    const normalized = error.code ? error : geminiService.normalizeError(error);
    return sendError(res, normalized.message, normalized.status || 500, normalized.code);
  }
};

/**
 * GET /api/chat/history
 * Returns session conversations list
 */
export const getChatHistory = async (req, res, next) => {
  try {
    const history = await chatService.getHistory();
    return sendSuccess(res, history, 'Chat history retrieved successfully', 200);
  } catch (error) {
    logger.error('Failed to retrieve chat history:', error);
    next(error);
  }
};
