# Backend Dockerfile

# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL deps (prisma CLI needed for generate)
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Prune dev dependencies
RUN npm prune --production

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Copy and set up entrypoint
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run migrations then start server
CMD ["sh", "entrypoint.sh"]
