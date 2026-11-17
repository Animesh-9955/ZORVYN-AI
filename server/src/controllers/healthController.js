import config from '../config/env.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getHealth = (req, res) => {
  const healthData = {
    service: 'ZORVYN AI Backend Service',
    tagline: 'Intelligence Reimagined',
    status: 'healthy',
    environment: config.nodeEnv,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    ai: {
      provider: 'Google Gemini',
      defaultModel: config.ai.geminiModel,
      isConfigured: config.ai.isConfigured,
      streamingEndpoint: '/api/chat/stream',
    },
    security: {
      helmet: 'active',
      cors: 'active',
      rateLimiting: 'active',
    },
  };

  return sendSuccess(res, healthData, 'ZORVYN AI Service is healthy and operational', 200);
};

export default getHealth;
