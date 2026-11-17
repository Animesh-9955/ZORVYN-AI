import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from server directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const parseOrigins = (rawOrigins) => {
  if (!rawOrigins) return ['http://localhost:5173', 'http://127.0.0.1:5173'];
  return rawOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);
};

export const config = Object.freeze({
  port: parseInt(process.env.PORT || '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  isProd: process.env.NODE_ENV === 'production',
  allowedOrigins: parseOrigins(process.env.ALLOWED_ORIGINS),
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins default
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    chatMaxRequests: parseInt(process.env.CHAT_RATE_LIMIT_MAX || '60', 10),
  },
  ai: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    isConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0),
    systemInstruction: process.env.ZORVYN_SYSTEM_INSTRUCTION || 
      `You are ZORVYN, an advanced cognitive AI assistant. Your tagline is "Intelligence Reimagined".
You are precise, mathematically rigorous, intellectually sharp, and architecturally sophisticated.
When answering technical, engineering, or scientific questions:
- Provide clear, direct, and well-structured answers.
- Use GitHub Flavored Markdown for formatting.
- Format code cleanly inside fenced code blocks with the appropriate language identifier.
- Maintain a futuristic, professional, and confident persona without fluff or generic filler.`
  }
});

export default config;
