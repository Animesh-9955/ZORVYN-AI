import { Router } from 'express';
import { 
  postChatMessage, 
  streamChatMessage, 
  getChatHistory 
} from '../controllers/chatController.js';
import { validateChatMessage } from '../middleware/validateRequest.js';
import { chatRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/chat/stream - Real-time Server-Sent Events (SSE) streaming with Google Gemini
router.post('/stream', chatRateLimiter, streamChatMessage);

// POST /api/chat - Non-streaming request with validation and rate limiting
router.post('/', chatRateLimiter, validateChatMessage, postChatMessage);

// GET /api/chat/history - Retrieve conversation records
router.get('/history', getChatHistory);

export default router;
