// Cache Middleware for API endpoints
import { cacheHelper } from '../config/redis.js';

/**
 * Cache middleware to cache GET requests
 * @param {number} expirationInSeconds - Cache expiration time in seconds (default: 1 hour)
 */
export const cacheMiddleware = (expirationInSeconds = 3600) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    try {
      // Generate cache key from URL and query params
      const cacheKey = `cache:${req.originalUrl}`;

      // Try to get cached data
      const cachedData = await cacheHelper.get(cacheKey);

      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`);
        return res.status(200).json({
          ...cachedData,
          cached: true,
          cacheKey
        });
      }

      console.log(`❌ Cache MISS: ${cacheKey}`);

      // Store original json function
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response
      res.json = function (data) {
        // Cache the response data
        cacheHelper.set(cacheKey, data, expirationInSeconds);
        
        // Call original json function
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      // Continue without caching on error
      next();
    }
  };
};

/**
 * Clear cache for specific patterns
 */
export const clearCache = async (pattern = '*') => {
  try {
    await cacheHelper.delPattern(`cache:${pattern}`);
    console.log(`✅ Cache cleared for pattern: ${pattern}`);
    return true;
  } catch (error) {
    console.error('Clear cache error:', error);
    return false;
  }
};

/**
 * Clear all cache
 */
export const clearAllCache = async () => {
  return await clearCache('*');
};
