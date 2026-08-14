# 🚀 Complete Deployment Guide - Krishi Sahayak

This guide provides comprehensive instructions for deploying Krishi Sahayak with Docker, Nginx, Redis, and PostgreSQL.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Docker Deployment](#docker-deployment)
4. [Manual Deployment](#manual-deployment)
5. [Nginx Configuration](#nginx-configuration)
6. [Redis Setup](#redis-setup)
7. [Production Checklist](#production-checklist)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## 🔧 Prerequisites

### Required Software:
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose v2.0+
- Node.js 20 LTS (for manual deployment)
- PostgreSQL 16 (for manual deployment)
- Redis 7 (for caching)
- Git

### System Requirements:
- **Minimum:** 2 CPU cores, 4GB RAM, 20GB storage
- **Recommended:** 4 CPU cores, 8GB RAM, 50GB storage

---

## ⚙️ Environment Setup

### 1. Clone Repository
```powershell
git clone <your-repo-url>
cd krishi_sahyak
```

### 2. Create Environment Files

#### Backend Environment (backend/.env)
```env
# Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/krishi_sahyak"

# JWT Secrets (Change these!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-refresh-secret-change-this-in-production"
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_DB=0
```

#### Frontend Environment (.env)
```env
VITE_API_URL=http://localhost/api
```

#### Docker Environment (.env.docker)
```env
# PostgreSQL
POSTGRES_PASSWORD=YOUR_SECURE_PASSWORD

# Redis
REDIS_PASSWORD=YOUR_REDIS_PASSWORD

# JWT (Use strong secrets!)
JWT_SECRET=change-this-to-random-32-character-string
JWT_REFRESH_SECRET=change-this-to-another-random-32-character-string

# Frontend
FRONTEND_URL=http://localhost
VITE_API_URL=http://localhost/api
```

---

## 🐳 Docker Deployment (Recommended)

### Quick Start

#### 1. Install Redis Package
```powershell
cd backend
npm install redis
```

#### 2. Build and Start All Services
```powershell
# Build images
docker-compose build

# Start all services
docker-compose up -d
```

#### 3. Run Database Migrations
```powershell
docker-compose exec backend npx prisma migrate deploy
```

#### 4. Seed Database
```powershell
docker-compose exec backend node scripts/seed-complete.js
```

#### 5. Verify Services
```powershell
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f

# Test health endpoint
curl http://localhost/health
```

### Service URLs:
- **Application:** http://localhost
- **Backend API:** http://localhost/api
- **Postgres:** localhost:5432
- **Redis:** localhost:6379

### Docker Commands Reference

```powershell
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Restart service
docker-compose restart [service-name]

# View running containers
docker-compose ps

# Execute command in container
docker-compose exec [service-name] [command]

# Rebuild specific service
docker-compose up -d --build [service-name]

# Remove all containers and volumes
docker-compose down -v
```

---

## 📦 Manual Deployment (Without Docker)

### 1. Install Dependencies

#### Backend
```powershell
cd backend
npm install redis
npm install
npx prisma generate
```

#### Frontend
```powershell
npm install
```

### 2. Setup PostgreSQL
```powershell
# Create database using pgAdmin or psql
CREATE DATABASE krishi_sahyak;
```

### 3. Install Redis

#### Windows (using WSL or Memurai)
```powershell
# Install Memurai (Redis for Windows)
# Download from: https://www.memurai.com/get-memurai
```

#### Linux
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

### 4. Run Migrations
```powershell
cd backend
npm run migrate:deploy
```

### 5. Seed Database
```powershell
node scripts/seed-complete.js
```

### 6. Start Services

#### Terminal 1 - Redis (if not running as service)
```powershell
redis-server
```

#### Terminal 2 - Backend
```powershell
cd backend
npm start
```

#### Terminal 3 - Frontend
```powershell
npm run dev
```

### 7. Setup Nginx (Optional)

#### Windows
1. Download Nginx: http://nginx.org/en/download.html
2. Extract to `C:\nginx`
3. Copy `nginx.conf` to `C:\nginx\conf\`
4. Start: `cd C:\nginx && start nginx`

#### Linux
```bash
sudo apt install nginx
sudo cp nginx.conf /etc/nginx/sites-available/krishisahyak
sudo ln -s /etc/nginx/sites-available/krishisahyak /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🌐 Nginx Configuration

### Key Features:
- ✅ Reverse proxy for backend and frontend
- ✅ Rate limiting (100 API requests/minute)
- ✅ Gzip compression
- ✅ Static file caching
- ✅ Security headers
- ✅ Load balancing ready

### Test Nginx Config
```powershell
# Docker
docker-compose exec nginx nginx -t

# Manual
nginx -t
```

### Reload Nginx
```powershell
# Docker
docker-compose restart nginx

# Manual
nginx -s reload
```

---

## 🔴 Redis Setup

### Verify Redis Connection

#### Using Docker
```powershell
docker-compose exec redis redis-cli ping
# Should return: PONG
```

#### Manual
```powershell
redis-cli ping
# Should return: PONG
```

### Redis Commands
```powershell
# Connect to Redis
redis-cli

# List all keys
KEYS *

# Get specific key
GET cache:/api/crops

# Delete key
DEL cache:/api/crops

# Clear all cache
FLUSHDB

# Check memory usage
INFO memory
```

### Cache Behavior:
- **Crop List:** Cached for 1 hour
- **Crop Detail:** Cached for 1 hour
- **Cache invalidation:** Automatic on create/update/delete

---

## ✅ Production Checklist

### Security
- [ ] Change all default passwords
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Setup firewall rules
- [ ] Regular security updates

### Performance
- [ ] Enable Redis caching
- [ ] Configure Nginx caching
- [ ] Enable Gzip compression
- [ ] Optimize database queries
- [ ] Setup CDN for static assets
- [ ] Enable database connection pooling

### Monitoring
- [ ] Setup logging system
- [ ] Configure error tracking (Sentry)
- [ ] Database backup automation
- [ ] Health check monitoring
- [ ] Resource usage alerts

### Database
- [ ] Run migrations
- [ ] Seed initial data
- [ ] Setup automated backups
- [ ] Configure connection pooling
- [ ] Enable query logging

---

## 📊 Monitoring & Maintenance

### Health Checks

```powershell
# API Health
curl http://localhost/health

# Database Connection
docker-compose exec backend npx prisma db pull

# Redis Connection
docker-compose exec redis redis-cli ping
```

### View Logs

```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f nginx
docker-compose logs -f postgres
docker-compose logs -f redis

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Database Backup

```powershell
# Backup
docker-compose exec postgres pg_dump -U postgres krishi_sahyak > backup_$(date +%Y%m%d).sql

# Restore
docker-compose exec -T postgres psql -U postgres krishi_sahyak < backup_20260810.sql
```

### Redis Backup

```powershell
# Backup
docker-compose exec redis redis-cli SAVE
docker cp krishi_redis:/data/dump.rdb ./redis_backup_$(date +%Y%m%d).rdb

# Restore
docker cp ./redis_backup.rdb krishi_redis:/data/dump.rdb
docker-compose restart redis
```

### Performance Monitoring

```powershell
# Container stats
docker stats

# Specific container
docker stats krishi_backend

# Postgres connections
docker-compose exec postgres psql -U postgres -c "SELECT count(*) FROM pg_stat_activity;"

# Redis memory
docker-compose exec redis redis-cli INFO memory
```

---

## 🔄 Updates & Maintenance

### Update Application

```powershell
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Run new migrations
docker-compose exec backend npx prisma migrate deploy
```

### Database Migrations

```powershell
# Create new migration
docker-compose exec backend npx prisma migrate dev --name migration_name

# Deploy migrations
docker-compose exec backend npx prisma migrate deploy

# Reset database (DANGER!)
docker-compose exec backend npx prisma migrate reset
```

---

## 🆘 Troubleshooting

### Container won't start
```powershell
# Check logs
docker-compose logs [service-name]

# Restart service
docker-compose restart [service-name]

# Rebuild service
docker-compose up -d --build [service-name]
```

### Database connection issues
```powershell
# Verify PostgreSQL is running
docker-compose ps postgres

# Check connection string
docker-compose exec backend printenv DATABASE_URL

# Test connection
docker-compose exec backend npx prisma db pull
```

### Redis connection issues
```powershell
# Verify Redis is running
docker-compose ps redis

# Test connection
docker-compose exec redis redis-cli ping

# Check logs
docker-compose logs redis
```

### Port conflicts
```powershell
# Check what's using port
netstat -ano | findstr :5000
netstat -ano | findstr :5432
netstat -ano | findstr :6379

# Change ports in docker-compose.yml if needed
```

---

## 📞 Support

For issues or questions:
1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Check service health: `docker-compose ps`
4. Review this guide

---

## 🎉 Success!

Your Krishi Sahayak application is now deployed with:
- ✅ Docker containerization
- ✅ Nginx reverse proxy
- ✅ Redis caching
- ✅ PostgreSQL database
- ✅ Production-ready setup

**Access your application at:** http://localhost

**Test credentials:**
- Email: admin@krishisahyak.com
- Password: admin123
