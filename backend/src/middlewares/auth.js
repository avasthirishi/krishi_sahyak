// Authentication Middleware
import { verifyAccessToken } from '../utils/generateToken.js';
import prisma from '../config/prisma.js';
import { HTTP_STATUS, ROLES } from '../utils/constants.js';

/**
 * Verify JWT Token and Authenticate User
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'No token provided. Please login first.'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyAccessToken(token);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { profile: true }
    });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'User not found. Token is invalid.'
      });
    }

    if (!user.isActive) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: 'Your account has been deactivated.'
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or expired token. Please login again.',
      error: error.message
    });
  }
};

/**
 * Check if user has required role(s)
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
};

/**
 * Check if user is Super Admin
 */
export const isSuperAdmin = authorize(ROLES.SUPER_ADMIN);

/**
 * Check if user is Content Manager or Super Admin
 */
export const canManageContent = authorize(ROLES.SUPER_ADMIN, ROLES.CONTENT_MANAGER);

/**
 * Check if user is Researcher or Super Admin
 */
export const isResearcher = authorize(ROLES.SUPER_ADMIN, ROLES.RESEARCHER);

/**
 * Check if user is Lab Owner or Super Admin
 */
export const isLabOwner = authorize(ROLES.SUPER_ADMIN, ROLES.LAB_OWNER);

/**
 * Check if user is Mandi Owner or Super Admin
 */
export const isMandiOwner = authorize(ROLES.SUPER_ADMIN, ROLES.MANDI_OWNER);
