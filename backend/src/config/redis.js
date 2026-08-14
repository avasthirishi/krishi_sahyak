// Redis Configuration for Caching
import { createClient } from 'redis';

// Redis is disabled for local dev, enabled in Docker (set REDIS_ENABLED=true in docker-compose)
const REDIS_ENABLED = process.env.REDIS_ENABLED === 'true' || process.env.REDIS_ENABLED === '1';

const redisClient = REDIS_ENABLED ? createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    reconnectStrategy: false  // Disable auto-reconnect
  },
  password: process.env.REDIS_PASSWORD || undefined,
  database: parseInt(process.env.REDIS_DB || '0', 10)
}) : null;

if (redisClient) {
  redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error:', err);
  });

  redisClient.on('connect', () => {
    console.log('🔌 Redis connecting...');
  });

  redisClient.on('ready', () => {
    console.log('✅ Redis client ready');
  });

  redisClient.on('reconnecting', () => {
    console.log('🔄 Redis reconnecting...');
  });
}

// Connect to Redis
export const connectRedis = async () => {
  if (!REDIS_ENABLED) {
    console.log('ℹ️  Redis disabled (install Redis server to enable caching)');
    return false;
  }
  
  try {
    if (redisClient && !redisClient.isOpen) {
      await redisClient.connect();
      console.log('✅ Redis connected successfully');
    }
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    // Don't throw error - app can work without Redis
  }
};

// Cache helper functions
export const cacheHelper = {
  // Get cached data
  get: async (key) => {
    if (!REDIS_ENABLED || !redisClient) return null;
    try {
      if (!redisClient.isOpen) return null;
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  },

  // Set cached data with expiration (in seconds)
  set: async (key, value, expirationInSeconds = 3600) => {
    if (!REDIS_ENABLED || !redisClient) return false;
    try {
      if (!redisClient.isOpen) return false;
      await redisClient.setEx(key, expirationInSeconds, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Redis SET error:', error);
      return false;
    }
  },

  // Delete cached data
  del: async (key) => {
    if (!REDIS_ENABLED || !redisClient) return false;
    try {
      if (!redisClient.isOpen) return false;
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Redis DEL error:', error);
      return false;
    }
  },

  // Delete multiple keys by pattern
  delPattern: async (pattern) => {
    if (!REDIS_ENABLED || !redisClient) return false;
    try {
      if (!redisClient.isOpen) return false;
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
      return true;
    } catch (error) {
      console.error('Redis DEL PATTERN error:', error);
      return false;
    }
  },

  // Check if key exists
  exists: async (key) => {
    if (!REDIS_ENABLED || !redisClient) return false;
    try {
      if (!redisClient.isOpen) return false;
      return await redisClient.exists(key) === 1;
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      return false;
    }
  }
};

// Graceful shutdown
export const disconnectRedis = async () => {
  if (!REDIS_ENABLED || !redisClient) return;
  try {
    if (redisClient.isOpen) {
      await redisClient.quit();
      console.log('✅ Redis disconnected gracefully');
    }
  } catch (error) {
    console.error('❌ Error disconnecting Redis:', error);
  }
};

export default redisClient;
