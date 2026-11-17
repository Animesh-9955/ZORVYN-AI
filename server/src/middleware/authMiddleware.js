import jwt from 'jsonwebtoken';
import { sendError } from '../utils/apiResponse.js';
import { getPrismaClient } from '../config/db.js';

/**
 * Protect route – verifies JWT and attaches user info to request.
 */
export const protect = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authorization header missing or malformed', 401, 'AUTH_ERROR');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Expected payload: { sub: userId, email: userEmail, iat, exp }
    req.user = { id: payload.sub, email: payload.email };
    // Optional: ensure user still exists
    const prisma = getPrismaClient();
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return sendError(res, 'User not found', 401, 'AUTH_ERROR');
    }
    next();
  } catch (err) {
    return sendError(res, 'Invalid or expired token', 401, 'AUTH_ERROR');
  }
};
