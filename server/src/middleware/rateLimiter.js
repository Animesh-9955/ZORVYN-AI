import rateLimit from 'express-rate-limit';
import config from '../config/env.js';
import { sendError } from '../utils/apiResponse.js';

export const globalRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(
      res,
      'Too many requests from this IP address. Please try again later.',
      429,
      'RATE_LIMIT_EXCEEDED'
    );
  },
});

export const chatRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.chatMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(
      res,
      'Too many chat requests submitted. Please slow down.',
      429,
      'CHAT_RATE_LIMIT_EXCEEDED'
    );
  },
});

