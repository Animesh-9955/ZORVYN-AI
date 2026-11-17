import config from '../config/env.js';
import logger from '../utils/logger.js';
import { sendError } from '../utils/apiResponse.js';

/**
 * 404 Not Found Middleware
 */
export const notFoundHandler = (req, res, next) => {
  return sendError(
    res,
    `Endpoint ${req.method} ${req.originalUrl} not found`,
    404,
    'RESOURCE_NOT_FOUND'
  );
};

/**
 * Centralized Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  logger.error(`Error on ${req.method} ${req.originalUrl}:`, err.message || err);

  // Handle malformed JSON body errors from express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendError(res, 'Malformed JSON in request body', 400, 'INVALID_JSON_BODY');
  }

  // Handle custom status codes
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'An unexpected internal server error occurred';
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  const details = config.isDev
    ? { stack: err.stack, details: err.details || null }
    : undefined;

  return sendError(res, message, statusCode, code, details);
};

