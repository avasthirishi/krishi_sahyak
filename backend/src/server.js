// Main Express Server
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from './config/prisma.js';
import { connectRedis, disconnectRedis } from './config/redis.js';
import { isEmailServiceConfigured } from './utils/emailService.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// ============================================
// MIDDLEWARE
// ============================================

// CORS Configuration
const allowedOrigins = new Set([
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175'
]);

const isAllowedLanOrigin = (origin) => {
  return /^https?:\/\/(192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/i.test(origin);
};

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin) || isAllowedLanOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ============================================
// ROUTES
// ============================================

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Krishi Sahayak API is running!',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/resources', resourceRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// START SERVER
// ============================================

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Connect to Redis (optional - app works without it)
    await connectRedis();

    if (!isEmailServiceConfigured()) {
      console.warn('⚠️ SMTP is not configured. OTP emails will not be delivered; development OTP fallback will be used.');
    }

    // Start Express server
    app.listen(PORT, HOST, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log('='.repeat(50));
      console.log('\n📡 Available endpoints:');
      console.log(`   GET  http://localhost:${PORT}/health`);
      console.log(`   POST http://localhost:${PORT}/api/auth/register`);
      console.log(`   POST http://localhost:${PORT}/api/auth/login`);
      console.log(`   GET  http://localhost:${PORT}/api/auth/me`);
      console.log(`   GET  http://localhost:${PORT}/api/crops`);
      console.log(`   GET  http://localhost:${PORT}/api/crops/:id`);
      console.log(`   POST http://localhost:${PORT}/api/crops`);
      console.log(`   GET  http://localhost:${PORT}/api/resources`);
      console.log(`   POST http://localhost:${PORT}/api/resources`);
      console.log('\n💡 Use Postman or curl to test the API\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  await disconnectRedis();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  await disconnectRedis();
  process.exit(0);
});

// Start the server
startServer();
