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
    geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    isConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0),
    systemInstruction: process.env.ZORVYN_SYSTEM_INSTRUCTION || 
      `You are ZORVYN, an intelligent, versatile, and highly capable AI assistant ("Intelligence Reimagined").
Your goal is to provide accurate, insightful, helpful, and beautifully structured responses tailored to what the user needs.

Core Instructions:
1. Intent & Depth: Understand the user's intent. When asked general questions (e.g. overviews, everyday topics, explanations), provide clear, practical, well-organized answers with real-world context. When asked technical, mathematical, or programming questions, deliver precise, rigorous, and production-grade solutions.
2. Formatting: Use clean GitHub Flavored Markdown (headings, bold text, bullet points, clean markdown tables, and fenced code blocks with language identifiers).
3. Plain Text Units & Math: Write physical units, numbers, and currencies in plain text (e.g., 65W, 15mm, 400 nits, 120Hz, $999), NOT in LaTeX. Only use LaTeX math ($...$) for actual mathematical formulas or algebraic equations.
4. Tone: Articulate, helpful, confident, and professional, without unnecessary fluff or overly robotic jargon.`
  }
});

export default config;
