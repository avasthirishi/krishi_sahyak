# Quick Start Implementation Guide

This guide will help you get started immediately with converting your frontend-only project into a full-stack application.

## 🚀 Step 1: Setup Development Environment

### Install Required Software

```bash
# 1. Node.js (v20 LTS)
# Download from: https://nodejs.org/

# 2. PostgreSQL (v16+)
# Download from: https://www.postgresql.org/download/

# 3. Redis (v7+)
# Windows: Download from https://github.com/tporadowski/redis/releases
# Or use Docker:
docker run -d -p 6379:6379 redis:7-alpine

# 4. Git
# Download from: https://git-scm.com/

# 5. Docker Desktop (Optional but recommended)
# Download from: https://www.docker.com/products/docker-desktop/
```

### Verify Installation

```bash
node --version  # Should show v20.x.x
npm --version   # Should show v10.x.x
psql --version  # Should show 16.x
redis-cli --version  # Should show 7.x
```

---

## 📂 Step 2: Restructure Your Project

### Current Structure → New Structure

```bash
# Create new directories in your project root
cd c:\Users\RISHIKESH.ACER\Desktop\krishi_sahyak

# Create backend directory
mkdir backend
cd backend
npm init -y

# Create necessary folders
mkdir src
cd src
mkdir config controllers middlewares models routes services utils validators
cd ../..

# Your project structure should now look like:
# krishi_sahyak/
# ├── backend/          (NEW)
# ├── src/              (Existing frontend)
# ├── public/
# ├── package.json      (Frontend)
# └── vite.config.js
```

---

## 🗄️ Step 3: Setup PostgreSQL Database

### Create Database

```bash
# Open PowerShell as Administrator
# Start PostgreSQL service
Start-Service postgresql-x64-16

# Connect to PostgreSQL
psql -U postgres

# In psql prompt:
CREATE DATABASE krishi_sahyak;
CREATE USER krishi_admin WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE krishi_sahyak TO krishi_admin;
\q
```

---

## 🔧 Step 4: Setup Backend (Express + Prisma)

### Initialize Backend

```bash
cd backend

# Install dependencies
npm install express cors dotenv bcryptjs jsonwebtoken
npm install @prisma/client
npm install -D prisma nodemon

# Initialize Prisma
npx prisma init
```

### Configure Prisma

Edit `backend/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Users Model
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  role          Role      @default(FARMER)
  isVerified    Boolean   @default(false) @map("is_verified")
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  profile       Profile?
  crops         Crop[]
  newsArticles  NewsArticle[]
  
  @@map("users")
}

enum Role {
  SUPER_ADMIN
  FARMER
  MANDI_OWNER
  RESEARCHER
  LAB_OWNER
  CONTENT_MANAGER
}

// Profile Model
model Profile {
  id        String   @id @default(uuid())
  userId    String   @unique @map("user_id")
  fullName  String?  @map("full_name")
  phone     String?
  avatarUrl String?  @map("avatar_url")
  address   String?
  city      String?
  state     String?
  pincode   String?
  bio       String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("profiles")
}

// Crop Model
model Crop {
  id                    String   @id @default(uuid())
  name                  String
  scientificName        String?  @map("scientific_name")
  briefDescription      String?  @map("brief_description") @db.Text
  fullDescription       String?  @map("full_description") @db.Text
  imageUrl              String?  @map("image_url")
  climate               String?
  soil                  String?
  sowingTime            String?  @map("sowing_time")
  harvestingTime        String?  @map("harvesting_time")
  waterRequirements     String?  @map("water_requirements") @db.Text
  commonPests           String[] @map("common_pests")
  commonDiseases        String[] @map("common_diseases")
  yield                 String?
  cultivationPractices  String[] @map("cultivation_practices")
  fertilizerManagement  String?  @map("fertilizer_management") @db.Text
  marketInfo            String?  @map("market_info") @db.Text
  category              String?
  status                String   @default("published")
  views                 Int      @default(0)
  createdById           String?  @map("created_by_id")
  createdAt             DateTime @default(now()) @map("created_at")
  updatedAt             DateTime @updatedAt @map("updated_at")
  
  createdBy             User?    @relation(fields: [createdById], references: [id])
  
  @@map("crops")
}

// News Article Model
model NewsArticle {
  id            String    @id @default(uuid())
  title         String
  slug          String?   @unique
  category      String?
  headline      String?   @db.Text
  snippet       String?   @db.Text
  fullContent   String?   @map("full_content") @db.Text
  imageUrl      String?   @map("image_url")
  source        String?
  author        String?
  publishedDate DateTime? @map("published_date")
  externalUrl   String?   @map("external_url")
  status        String    @default("published")
  views         Int       @default(0)
  likes         Int       @default(0)
  createdById   String?   @map("created_by_id")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  createdBy     User?     @relation(fields: [createdById], references: [id])
  
  @@map("news_articles")
}
```

### Create .env file

Create `backend/.env`:

```env
# Database
DATABASE_URL="postgresql://krishi_admin:your_secure_password@localhost:5432/krishi_sahyak"

# JWT
JWT_SECRET="your_super_secret_jwt_key_change_this_in_production"
JWT_REFRESH_SECRET="your_super_secret_refresh_key_change_this_in_production"
JWT_EXPIRE="15m"
JWT_REFRESH_EXPIRE="7d"

# Server
PORT=5000
NODE_ENV=development

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# File Upload (Optional - for later)
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_REGION=
# AWS_S3_BUCKET=
```

### Run Prisma Migration

```bash
# Generate Prisma Client
npx prisma generate

# Create and run migration
npx prisma migrate dev --name init
```

---

## 🛠️ Step 5: Create Backend Server

### Create `backend/src/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/crops', require('./routes/crop.routes'));
app.use('/api/news', require('./routes/news.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
```

### Create `backend/src/config/prisma.js`:

```javascript
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

module.exports = prisma;
```

---

## 🔐 Step 6: Create Authentication System

### Create `backend/src/controllers/auth.controller.js`:

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, fullName, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: role || 'FARMER',
        profile: {
          create: {
            fullName
          }
        }
      },
      include: {
        profile: true
      }
    });

    // Generate tokens
    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.profile?.fullName
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    // Generate tokens
    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.profile?.fullName,
          avatarUrl: user.profile?.avatarUrl
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { profile: true },
      select: {
        id: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        profile: true
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
```

### Create `backend/src/middlewares/auth.middleware.js`:

```javascript
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }

    next();
  };
};
```

### Create `backend/src/routes/auth.routes.js`:

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
```

---

## 🌾 Step 7: Create Crop API

### Create `backend/src/controllers/crop.controller.js`:

```javascript
const prisma = require('../config/prisma');

exports.getAllCrops = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { briefDescription: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [crops, total] = await Promise.all([
      prisma.crop.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.crop.count({ where })
    ]);

    res.json({
      success: true,
      data: crops,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getCropById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const crop = await prisma.crop.findUnique({
      where: { id }
    });

    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found' });
    }

    // Increment views
    await prisma.crop.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

    res.json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
};

exports.createCrop = async (req, res, next) => {
  try {
    const crop = await prisma.crop.create({
      data: {
        ...req.body,
        createdById: req.user.userId
      }
    });

    res.status(201).json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
};

exports.updateCrop = async (req, res, next) => {
  try {
    const { id } = req.params;

    const crop = await prisma.crop.update({
      where: { id },
      data: req.body
    });

    res.json({ success: true, data: crop });
  } catch (error) {
    next(error);
  }
};

exports.deleteCrop = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.crop.delete({ where: { id } });

    res.json({ success: true, message: 'Crop deleted successfully' });
  } catch (error) {
    next(error);
  }
};
```

### Create `backend/src/routes/crop.routes.js`:

```javascript
const express = require('express');
const router = express.Router();
const cropController = require('../controllers/crop.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', cropController.getAllCrops);
router.get('/:id', cropController.getCropById);

// Protected routes
router.post('/', authenticate, authorize('SUPER_ADMIN', 'CONTENT_MANAGER'), cropController.createCrop);
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'CONTENT_MANAGER'), cropController.updateCrop);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), cropController.deleteCrop);

module.exports = router;
```

---

## 📰 Step 8: Create News API (Similar to Crops)

### Create `backend/src/controllers/news.controller.js`:

```javascript
const prisma = require('../config/prisma');

exports.getAllNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category } = req.query;
    const skip = (page - 1) * limit;

    const where = { status: 'published' };
    if (category) where.category = category;

    const [news, total] = await Promise.all([
      prisma.newsArticle.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { publishedDate: 'desc' }
      }),
      prisma.newsArticle.count({ where })
    ]);

    res.json({
      success: true,
      data: news,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await prisma.newsArticle.findUnique({
      where: { id }
    });

    if (!news) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }

    // Increment views
    await prisma.newsArticle.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

    res.json({ success: true, data: news });
  } catch (error) {
    next(error);
  }
};

// Add createNews, updateNews, deleteNews similar to crops
```

### Create `backend/src/routes/news.routes.js`:

```javascript
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

// Protected routes - Add these later
// router.post('/', authenticate, authorize('SUPER_ADMIN', 'CONTENT_MANAGER'), newsController.createNews);

module.exports = router;
```

---

## 📦 Step 9: Update package.json Scripts

Edit `backend/package.json`:

```json
{
  "name": "krishi-sahyak-backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.10.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0",
    "prisma": "^5.10.0"
  }
}
```

---

## 🚀 Step 10: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Server running on http://localhost:5000
```

Test it:
```bash
# In a new terminal
curl http://localhost:5000/health
```

---

## 🎨 Step 11: Update Frontend to Use API

### Install Axios in Frontend

```bash
cd c:\Users\RISHIKESH.ACER\Desktop\krishi_sahyak
npm install axios
```

### Create API Service

Create `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Crop APIs
export const cropAPI = {
  getAll: (params) => api.get('/crops', { params }),
  getById: (id) => api.get(`/crops/${id}`),
  create: (data) => api.post('/crops', data),
  update: (id, data) => api.put(`/crops/${id}`, data),
  delete: (id) => api.delete(`/crops/${id}`)
};

// News APIs
export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
  getById: (id) => api.get(`/news/${id}`)
};

export default api;
```

### Create `.env` in Frontend Root

Create `.env` in `krishi_sahyak/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔄 Step 12: Update CropListPage to Use API

Replace hardcoded data in `src/pages/CropListPage.jsx`:

```javascript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cropAPI } from '../services/api';

export default function CropListPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCrops();
  }, [page]);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const response = await cropAPI.getAll({ page, limit: 20 });
      setCrops(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch crops');
      console.error('Error fetching crops:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto p-4">Loading crops...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Indian Crops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <Link
            key={crop.id}
            to={`/crops/${crop.id}`}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={crop.imageUrl || 'https://via.placeholder.com/400x300'}
              alt={crop.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{crop.name}</h2>
              <p className="text-sm text-gray-600 italic">{crop.scientificName}</p>
              <p className="mt-2 text-gray-700 line-clamp-3">{crop.briefDescription}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">{page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## 📊 Step 13: Migrate Existing Data to Database

Create `backend/scripts/seed-crops.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Copy your cropData from frontend
const cropData = [
  {
    name: 'Rice',
    scientificName: 'Oryza sativa',
    briefDescription: 'A staple food crop cultivated widely in India...',
    // ... rest of the data
  },
  // ... other crops
];

async function seedCrops() {
  console.log('🌾 Starting crop data migration...');

  for (const crop of cropData) {
    await prisma.crop.create({
      data: {
        name: crop.name,
        scientificName: crop.scientificName,
        briefDescription: crop.briefDescription,
        fullDescription: crop.fullDescription,
        imageUrl: crop.image,
        climate: crop.climate,
        soil: crop.soil,
        sowingTime: crop.sowingTime,
        harvestingTime: crop.harvestingTime,
        waterRequirements: crop.waterRequirements,
        commonPests: crop.commonPests || [],
        commonDiseases: crop.commonDiseases || [],
        yield: crop.yield,
        cultivationPractices: crop.cultivationPractices || [],
        fertilizerManagement: crop.fertilizerManagement,
        marketInfo: crop.marketInfo,
        category: 'cereals', // You can categorize
        status: 'published'
      }
    });
    console.log(`✅ Migrated: ${crop.name}`);
  }

  console.log('🎉 Crop migration completed!');
}

seedCrops()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run the seed script:

```bash
cd backend
node scripts/seed-crops.js
```

---

## ✅ Testing Your Setup

### 1. Test Backend API

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123","fullName":"Test User","role":"FARMER"}'

# Login
curl -X POST http://localhost:5000:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'

# Get crops
curl http://localhost:5000/api/crops
```

### 2. Test Frontend Integration

```bash
cd c:\Users\RISHIKESH.ACER\Desktop\krishi_sahyak
npm run dev
```

Visit: http://localhost:5173/crops

---

## 📝 Next Steps

1. ✅ **You've completed**: Basic backend setup with auth and crops API
2. 🔄 **Next implement**:
   - News API integration
   - Mandi prices API
   - Soil testing API
   - User dashboards
   - Admin panel

3. 🚀 **Then add**:
   - Redis caching
   - File uploads
   - Email service
   - Notifications

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to PostgreSQL"
**Solution**: 
```bash
# Start PostgreSQL service
Start-Service postgresql-x64-16
```

### Issue: "Port 5000 already in use"
**Solution**: Change PORT in `backend/.env` to 5001 or kill the process using port 5000.

### Issue: "CORS error"
**Solution**: Ensure FRONTEND_URL in backend `.env` matches your Vite dev server URL (default: http://localhost:5173)

### Issue: "Prisma Client error"
**Solution**: Run `npx prisma generate` after any schema changes.

---

## 📚 Helpful Commands

```bash
# Backend
cd backend
npm run dev                    # Start dev server
npx prisma studio             # Open Prisma Studio (DB GUI)
npx prisma migrate reset      # Reset database (DANGER!)
npx prisma db push            # Push schema without migration

# Frontend
npm run dev                    # Start Vite dev server
npm run build                  # Build for production
npm run preview                # Preview production build
```

---

**🎉 Congratulations! You now have a working full-stack foundation. Follow the FULLSTACK_ARCHITECTURE.md for complete implementation details.**
