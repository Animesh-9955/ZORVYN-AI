import { GoogleGenAI } from '@google/genai';
import config from '../config/env.js';
import logger from '../utils/logger.js';

class GeminiService {
  constructor() {
    this.client = null;
    this.currentKey = null;
  }

  /**
   * Lazily get or create GoogleGenAI client instance
   * Reloads client if GEMINI_API_KEY changes
   */
  getClient() {
    const apiKey = config.ai.geminiApiKey;

    if (!apiKey || apiKey.trim().length === 0) {
      const err = new Error('Google Gemini API key is missing. Please configure GEMINI_API_KEY in server/.env');
      err.code = 'MISSING_API_KEY';
      err.status = 401;
      throw err;
    }

    if (!this.client || this.currentKey !== apiKey) {
      this.currentKey = apiKey;
      this.client = new GoogleGenAI({ apiKey });
      logger.info(`GoogleGenAI client initialized with model: ${config.ai.geminiModel}`);
    }

    return this.client;
  }

  /**
   * Formats chat history into the structure expected by @google/genai
   * Role mapping: 'user' -> 'user', 'assistant'/'model' -> 'model'
   */
  formatContents(history = [], currentMessage) {
    const contents = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (!item || !item.content || typeof item.content !== 'string') continue;
        const text = item.content.trim();
        if (!text) continue;

        // Skip internal system notices / demo tags if any
        if (item.role === 'system' || item.isDemoNotice) continue;

        const role = item.role === 'user' ? 'user' : 'model';
        contents.push({
          role,
          parts: [{ text }],
        });
      }
    }

    // Append current user message
    if (currentMessage && typeof currentMessage === 'string' && currentMessage.trim().length > 0) {
      contents.push({
        role: 'user',
        parts: [{ text: currentMessage.trim() }],
      });
    }

    // Ensure conversation does not start with model
    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    if (contents.length === 0 && currentMessage) {
      contents.push({
        role: 'user',
        parts: [{ text: currentMessage.trim() }],
      });
    }

    return contents;
  }

  /**
   * Normalize errors into structured readable objects
   */
  normalizeError(error) {
    const errObj = {
      code: error.code || 'GEMINI_API_ERROR',
      status: error.status || 500,
      message: error.message || 'An error occurred during Gemini AI synthesis',
    };

    if (error.code === 'MISSING_API_KEY') {
      errObj.code = 'MISSING_API_KEY';
      errObj.status = 401;
      errObj.message = 'Google Gemini API key is not configured. Please add GEMINI_API_KEY to server/.env';
      return errObj;
    }

    // Check for ApiError details
    const msg = error.message || '';
    if (msg.includes('API_KEY_INVALID') || msg.includes('API key not valid') || error.status === 400 && msg.includes('API key')) {
      errObj.code = 'INVALID_API_KEY';
      errObj.status = 401;
      errObj.message = 'Provided Gemini API key is invalid. Please verify your GEMINI_API_KEY in server/.env';
    } else if (error.status === 429 || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('Quota exceeded')) {
      errObj.code = 'RATE_LIMIT_EXCEEDED';
      errObj.status = 429;
      errObj.message = 'Gemini API rate limit or quota exceeded. Please try again in a few moments.';
    } else if (msg.includes('models/') && msg.includes('not found')) {
      errObj.code = 'MODEL_NOT_FOUND';
      errObj.status = 404;
      errObj.message = `Requested model ${config.ai.geminiModel} was not found or is unavailable.`;
    }

    return errObj;
  }

  /**
   * Stream response from Google Gemini API using Server-Sent Events
   */
  async generateStream({ message, history = [], customInstruction = null }) {
    const ai = this.getClient();
    const contents = this.formatContents(history, message);
    const model = config.ai.geminiModel;
    const systemInstruction = customInstruction || config.ai.systemInstruction;

    logger.info(`Initiating Gemini content stream using model [${model}] with ${contents.length} messages`);

    try {
      const responseStream = await ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return responseStream;
    } catch (error) {
      if (model !== 'gemini-2.5-flash') {
        logger.warn(`Primary model ${model} failed (${error.message}), falling back to gemini-2.5-flash`);
        try {
          return await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });
        } catch (fallbackError) {
          logger.error('Fallback model failed as well:', fallbackError.message || fallbackError);
        }
      }
      logger.error('Gemini generateContentStream error:', error.message || error);
      throw this.normalizeError(error);
    }
  }

  /**
   * Non-streaming content generation
   */
  async generateContent({ message, history = [], customInstruction = null }) {
    const ai = this.getClient();
    const contents = this.formatContents(history, message);
    const model = config.ai.geminiModel;
    const systemInstruction = customInstruction || config.ai.systemInstruction;

    logger.info(`Generating Gemini content using model [${model}]`);

    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return {
        text: response.text || '',
        model,
        usage: response.usageMetadata || null,
      };
    } catch (error) {
      logger.error('Gemini generateContent error:', error.message || error);
      throw this.normalizeError(error);
    }
  }
}

export const geminiService = new GeminiService();
export default geminiService;

