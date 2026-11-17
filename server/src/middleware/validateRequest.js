import { sendError } from '../utils/apiResponse.js';

export const validateChatMessage = (req, res, next) => {
  const { message, conversationId } = req.body || {};

  if (!req.body || typeof req.body !== 'object') {
    return sendError(res, 'Request body must be a valid JSON object', 400, 'VALIDATION_ERROR');
  }

  if (message === undefined || message === null) {
    return sendError(res, 'Field "message" is required', 400, 'VALIDATION_ERROR');
  }

  if (typeof message !== 'string') {
    return sendError(res, 'Field "message" must be a string', 400, 'VALIDATION_ERROR');
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    return sendError(res, 'Field "message" cannot be empty', 400, 'VALIDATION_ERROR');
  }

  if (trimmedMessage.length > 4000) {
    return sendError(res, 'Field "message" cannot exceed 4000 characters', 400, 'VALIDATION_ERROR');
  }

  if (conversationId !== undefined && conversationId !== null) {
    if (typeof conversationId !== 'string' || conversationId.trim().length === 0) {
      return sendError(res, 'Field "conversationId" must be a non-empty string when provided', 400, 'VALIDATION_ERROR');
    }
    if (conversationId.length > 100) {
      return sendError(res, 'Field "conversationId" cannot exceed 100 characters', 400, 'VALIDATION_ERROR');
    }
  }

  // Attach sanitized fields to req
  req.sanitizedMessage = trimmedMessage;
  req.sanitizedConversationId = conversationId ? conversationId.trim() : null;

  next();
};

