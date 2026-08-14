# Docker Setup Guide for Krishi Sahayak

Complete Docker configuration for development and production deployment with PostgreSQL, Redis, Nginx, and your application.

---

## 📦 Prerequisites

1. Install Docker Desktop for Windows
   - Download from: https://www.docker.com/products/docker-desktop/
   - Make sure Docker is running (check system tray)

2. Verify Installation:
   ```bash
   docker --version
   docker-compose --version
   ```

---

## 🗂️ Docker File Structure

Create these files in your project root:

```
krishi_sahyak/
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── nginx.conf
├── docker-compose.yml
├── docker-compose.prod.yml
└── .dockerignore
```

---

## 📄 1. Create Docker Files

### `docker/Dockerfile.backend`

```dockerfile
# Backend Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY backend/package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY backend/ .

# Generate Prisma Client
RUN npx prisma generate

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express

# Copy necessary files
COPY --from=builder --chown=express:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=express:nodejs /app/src ./src
COPY --from=builder --chown=express:nodejs /app/prisma ./prisma
COPY --from=builder --chown=express:nodejs /app/package*.json ./

USER express

EXPOSE 5000

CMD ["node", "src/server.js"]
```

### `docker/Dockerfile.frontend`

```dockerfile
# Multi-stage build for React frontend
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Production image with Nginx
FROM nginx:alpine AS runner

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### `docker/nginx.conf`

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed for development)
    location /api/ {
        proxy_pass http://backend:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### `.dockerignore`

```
# Node modules
node_modules/
backend/node_modules/
npm-debug.log

# Build outputs
dist/
build/
.next/

# Environment files
.env
.env.local
.env.*.local
backend/.env

# Git
.git/
.gitignore

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Testing
coverage/
.nyc_output/
```

---

## 🐳 2. Docker Compose Configuration

### `docker-compose.yml` (Development)

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: krishi_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: krishi_sahyak
      POSTGRES_USER: krishi_admin
      POSTGRES_PASSWORD: krishi_secure_password_123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - krishi_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U krishi_admin -d krishi_sahyak"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: krishi_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - krishi_network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    command: redis-server --appendonly yes

  # Backend API
  backend:
    build:
      context: .
      dockerfile: docker/Dockerfile.backend
    container_name: krishi_backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: development
      PORT: 5000
      DATABASE_URL: postgresql://krishi_admin:krishi_secure_password_123@postgres:5432/krishi_sahyak
      REDIS_HOST: redis
      REDIS_PORT: 6379
      JWT_SECRET: your_jwt_secret_change_in_production
      JWT_REFRESH_SECRET: your_refresh_secret_change_in_production
      JWT_EXPIRE: 15m
      JWT_REFRESH_EXPIRE: 7d
      FRONTEND_URL: http://localhost:3000
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend/src:/app/src:ro
      - ./backend/prisma:/app/prisma:ro
    networks:
      - krishi_network
    command: sh -c "npx prisma migrate deploy && node src/server.js"

  # Frontend
  frontend:
    build:
      context: .
      dockerfile: docker/Dockerfile.frontend
      args:
        VITE_API_BASE_URL: http://localhost:5000/api
    container_name: krishi_frontend
    restart: unless-stopped
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - krishi_network

  # Nginx (Reverse Proxy & Load Balancer)
  nginx:
    image: nginx:alpine
    container_name: krishi_nginx
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./docker/nginx-proxy.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - frontend
      - backend
    networks:
      - krishi_network

networks:
  krishi_network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

### `docker/nginx-proxy.conf` (Load Balancer Config)

```nginx
upstream backend_servers {
    least_conn;
    server backend:5000;
    # Add more backend instances for load balancing:
    # server backend2:5000;
    # server backend3:5000;
}

upstream frontend_servers {
    server frontend:80;
}

server {
    listen 80;
    server_name localhost;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend
    location / {
        proxy_pass http://frontend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend_servers/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # CORS headers (if needed)
        add_header Access-Control-Allow-Origin * always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;

        # Handle preflight requests
        if ($request_method = OPTIONS) {
            return 204;
        }
    }

    # Health check endpoint
    location /health {
        proxy_pass http://backend_servers/health;
        access_log off;
    }
}
```

---

## 🚀 3. Running with Docker

### Development Mode

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database data)
docker-compose down -v
```

### Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Nginx Proxy**: http://localhost:80
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

---

## 🔧 4. Useful Docker Commands

### Service Management

```bash
# Start services
docker-compose start

# Stop services
docker-compose stop

# Restart services
docker-compose restart

# Restart specific service
docker-compose restart backend

# View running containers
docker-compose ps

# Remove stopped containers
docker-compose rm
```

### Database Management

```bash
# Access PostgreSQL CLI
docker exec -it krishi_postgres psql -U krishi_admin -d krishi_sahyak

# Backup database
docker exec krishi_postgres pg_dump -U krishi_admin krishi_sahyak > backup.sql

# Restore database
docker exec -i krishi_postgres psql -U krishi_admin krishi_sahyak < backup.sql

# Run Prisma migrations
docker exec krishi_backend npx prisma migrate deploy

# Open Prisma Studio
docker exec -it krishi_backend npx prisma studio
```

### Redis Management

```bash
# Access Redis CLI
docker exec -it krishi_redis redis-cli

# Inside Redis CLI:
PING                # Test connection
KEYS *              # List all keys
FLUSHALL            # Clear all cache (be careful!)
INFO                # Redis info
```

### Debugging

```bash
# Execute bash in container
docker exec -it krishi_backend sh
docker exec -it krishi_frontend sh

# View container logs
docker logs krishi_backend -f

# Inspect container
docker inspect krishi_backend

# View resource usage
docker stats
```

---

## 🌐 5. Production Deployment (docker-compose.prod.yml)

### `docker-compose.prod.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    networks:
      - krishi_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: always
    volumes:
      - redis_data:/data
    networks:
      - krishi_network
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}

  backend:
    build:
      context: .
      dockerfile: docker/Dockerfile.backend
    restart: always
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      AWS_REGION: ${AWS_REGION}
      AWS_S3_BUCKET: ${AWS_S3_BUCKET}
    depends_on:
      - postgres
      - redis
    networks:
      - krishi_network
    deploy:
      replicas: 3  # Scale to 3 instances
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  frontend:
    build:
      context: .
      dockerfile: docker/Dockerfile.frontend
      args:
        VITE_API_BASE_URL: ${API_URL}
    restart: always
    networks:
      - krishi_network

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx-prod.conf:/etc/nginx/conf.d/default.conf:ro
      - ./certs:/etc/nginx/certs:ro
      - ./logs/nginx:/var/log/nginx
    depends_on:
      - frontend
      - backend
    networks:
      - krishi_network

networks:
  krishi_network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

### Production Environment Variables

Create `.env.production`:

```env
# Database
POSTGRES_DB=krishi_sahyak_prod
POSTGRES_USER=krishi_admin
POSTGRES_PASSWORD=CHANGE_THIS_SECURE_PASSWORD

# Redis
REDIS_PASSWORD=CHANGE_THIS_REDIS_PASSWORD

# JWT
JWT_SECRET=CHANGE_THIS_LONG_RANDOM_STRING
JWT_REFRESH_SECRET=CHANGE_THIS_LONG_RANDOM_STRING

# API
API_URL=https://api.yourdomain.com

# AWS (if using)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=krishi-sahyak-uploads
```

### Deploy to Production

```bash
# Load environment variables and start
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d --build

# Scale backend instances
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 🔒 6. SSL/HTTPS Setup with Let's Encrypt

### Install Certbot in Nginx Container

```bash
# Get SSL certificate
docker run -it --rm \
  -v $(pwd)/certs:/etc/letsencrypt \
  certbot/certbot certonly --standalone \
  -d yourdomain.com -d www.yourdomain.com \
  --agree-tos --email your-email@example.com

# Auto-renewal (add to crontab)
0 0 * * * docker run --rm -v $(pwd)/certs:/etc/letsencrypt certbot/certbot renew --quiet
```

### Update Nginx Config for HTTPS

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/nginx/certs/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # ... rest of your configuration
}
```

---

## 📊 7. Monitoring with Docker

### Add Monitoring Stack

```yaml
# Add to docker-compose.yml

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    networks:
      - krishi_network

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus
    networks:
      - krishi_network
```

---

## 🔄 8. Automated Backups

### Create Backup Script

Create `scripts/backup.sh`:

```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
POSTGRES_CONTAINER="krishi_postgres"
DB_NAME="krishi_sahyak"
DB_USER="krishi_admin"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
docker exec $POSTGRES_CONTAINER pg_dump -U $DB_USER $DB_NAME | gzip > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql.gz"

# Backup Redis
docker exec krishi_redis redis-cli --rdb /data/dump.rdb
docker cp krishi_redis:/data/dump.rdb "$BACKUP_DIR/redis_backup_$TIMESTAMP.rdb"

# Delete backups older than 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.rdb" -mtime +7 -delete

echo "Backup completed: $TIMESTAMP"
```

Make it executable and schedule:

```bash
chmod +x scripts/backup.sh

# Add to crontab (daily at 2 AM)
0 2 * * * /path/to/scripts/backup.sh
```

---

## 🧪 9. Testing

```bash
# Run backend tests
docker exec krishi_backend npm test

# Run with coverage
docker exec krishi_backend npm run test:coverage
```

---

## 🛠️ 10. Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs backend

# Check if port is already in use
netstat -ano | findstr :5000

# Remove all containers and start fresh
docker-compose down -v
docker-compose up --build
```

### Database connection issues
```bash
# Check if PostgreSQL is healthy
docker-compose ps

# Test connection
docker exec krishi_backend npx prisma db push
```

### Out of disk space
```bash
# Clean up Docker
docker system prune -a --volumes

# Remove unused images
docker image prune -a
```

---

## 📝 Best Practices

1. **Never commit `.env` files** - Use `.env.example` instead
2. **Use secrets management** - For production, use Docker secrets or AWS Secrets Manager
3. **Regular backups** - Automate database and file backups
4. **Monitor resources** - Use `docker stats` to monitor resource usage
5. **Update regularly** - Keep Docker images and dependencies updated
6. **Security scanning** - Use `docker scan` to check for vulnerabilities
7. **Health checks** - Always define health checks for services
8. **Resource limits** - Set memory and CPU limits in production
9. **Use specific versions** - Don't use `:latest` tag in production
10. **Log management** - Use centralized logging (ELK stack or cloud services)

---

## 🚀 Quick Commands Reference

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f backend

# Restart backend
docker-compose restart backend

# Execute command in container
docker exec -it krishi_backend sh

# Stop everything
docker-compose down

# Update and restart
docker-compose up -d --build

# Scale backend
docker-compose up -d --scale backend=3

# Database backup
docker exec krishi_postgres pg_dump -U krishi_admin krishi_sahyak > backup.sql

# Clean everything
docker-compose down -v && docker system prune -a
```

---

**🎉 Your Dockerized application is now ready for development and production deployment!**
