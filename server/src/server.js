import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import config from './config/env.js';
import logger from './utils/logger.js';
import apiRouter from './routes/index.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Trust proxy for rate limiting if behind reverse proxy
app.set('trust proxy', 1);

// 1. Security Headers via Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// 2. Strict CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server) in development
    if (!origin && config.isDev) {
      return callback(null, true);
    }
    if (!origin || config.allowedOrigins.includes(origin) || config.allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} is not allowed by ZORVYN CORS security policy`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// 3. Body Parsing Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Global Rate Limiter
app.use('/api', globalRateLimiter);

// 5. Mount API Routes under /api
app.use('/api', apiRouter);

// Root route for service information
app.get('/', (req, res) => {
  res.json({
    brand: 'ZORVYN AI',
    tagline: 'Intelligence Reimagined',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// 6. 404 Catch-all handler
app.use(notFoundHandler);

// 7. Centralized Error Handler
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, '0.0.0.0', () => {
  logger.info(`✨ ZORVYN AI Backend Server initialized`);
  logger.info(`🚀 Listening on port http://localhost:${config.port}`);
  logger.info(`🛡️  Environment: ${config.nodeEnv}`);
  logger.info(`🌐 Allowed Origins: ${config.allowedOrigins.join(', ')}`);
});

// Graceful shutdown
const shutdown = (signal) => {
  logger.warn(`Received ${signal}. Shutting down ZORVYN backend gracefully...`);
  server.close(() => {
    logger.info('Server closed. Process terminated.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;

