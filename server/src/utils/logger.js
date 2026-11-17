const getTimestamp = () => new Date().toISOString();

export const logger = {
  info: (message, meta = '') => {
    console.log(`[${getTimestamp()}] \x1b[36m[INFO]\x1b[0m ${message}`, meta ? meta : '');
  },
  warn: (message, meta = '') => {
    console.warn(`[${getTimestamp()}] \x1b[33m[WARN]\x1b[0m ${message}`, meta ? meta : '');
  },
  error: (message, error = '') => {
    console.error(`[${getTimestamp()}] \x1b[31m[ERROR]\x1b[0m ${message}`, error ? error : '');
  },
  debug: (message, meta = '') => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${getTimestamp()}] \x1b[35m[DEBUG]\x1b[0m ${message}`, meta ? meta : '');
    }
  }
};

export default logger;

