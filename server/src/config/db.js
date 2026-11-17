import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger.js';

let prismaInstance = null;

export const getPrismaClient = () => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
      errorFormat: 'pretty',
    });
  }
  return prismaInstance;
};

export const prisma = getPrismaClient();

/**
 * Test and verify PostgreSQL database connection
 */
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    logger.info('🐘 PostgreSQL Database connection established successfully via Prisma');
    return { connected: true };
  } catch (error) {
    logger.error('Failed to connect to PostgreSQL database:', error.message || error);
    return { 
      connected: false, 
      error: error.message || 'Unable to establish database connection' 
    };
  }
};

/**
 * Graceful database disconnect
 */
export const disconnectDatabase = async () => {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
    logger.info('PostgreSQL connection closed.');
  }
};

export default prisma;

