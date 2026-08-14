// JWT Token Generation Utilities
import jwt from 'jsonwebtoken';

/**
 * Generate Access Token (15 minutes expiry)
 * Uses HS256 (HMAC-SHA256) algorithm by default
 */
export const generateAccessToken = (userId, email, role) => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRE || '15m',
      algorithm: 'HS256' // Explicitly using HMAC-SHA256
    }
  );
};

/**
 * Generate Refresh Token (7 days expiry)
 * Uses HS256 (HMAC-SHA256) algorithm by default
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { 
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
      algorithm: 'HS256' // Explicitly using HMAC-SHA256
    }
  );
};

/**
 * Generate Both Tokens
 */
export const generateTokens = (userId, email, role) => {
  const accessToken = generateAccessToken(userId, email, role);
  const refreshToken = generateRefreshToken(userId);
  
  return { accessToken, refreshToken };
};

/**
 * Verify Access Token
 * Verifies HS256 (HMAC-SHA256) signature
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'] // Only accept HS256 tokens
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Verify Refresh Token
 * Verifies HS256 (HMAC-SHA256) signature
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
      algorithms: ['HS256'] // Only accept HS256 tokens
    });
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
