# Krishi Sahayak - Full-Stack Architecture & Implementation Plan

## 📊 Current Project Analysis

### Existing Features
Your project currently has the following pages/features (all with **hardcoded data**):

1. **Home Page** - Hero section, services, news, events, partners
2. **Crop Information** - Detailed crop data (Rice, Wheat, Barley, Sorghum, etc.)
3. **Weather Forecast** - OpenWeather API integration
4. **News Page** - Agricultural news articles
5. **Research Papers** - Agricultural research content
6. **Mandi Prices** - Market prices for agricultural products
7. **Soil Testing Form** - Data collection form (no backend)
8. **Business Ideas** - Expert farmer success stories
9. **Resource Page** - Agricultural training courses
10. **Login/Signup** - UI only (no authentication)
11. **Innovative Ideas** - Modern farming techniques
12. **Contact/About Pages** - Static information

### Current Tech Stack
- **Frontend**: React 19, React Router, TailwindCSS, Vite
- **State**: Local component state (useState)
- **Data**: Hardcoded in JS files
- **API**: Only OpenWeather API for weather

---

## 🏗️ Proposed Full-Stack Architecture

### Technology Stack for Million Users

#### Backend
- **Runtime**: Node.js (v20 LTS)
- **Framework**: Express.js
- **API**: RESTful + GraphQL (optional for complex queries)
- **ORM**: Prisma or TypeORM
- **Authentication**: JWT + Refresh Tokens
- **File Upload**: Multer + AWS S3/Cloudinary
- **Email**: SendGrid/AWS SES
- **Real-time**: Socket.io (for live notifications)
- **Job Queue**: Bull (with Redis)
- **Logging**: Winston + Morgan
- **API Documentation**: Swagger/OpenAPI

#### Database
- **Primary DB**: PostgreSQL 16+ with PostGIS (for location data)
- **Caching**: Redis 7+ (session, query cache, rate limiting)
- **Search**: Elasticsearch (for full-text search)
- **File Storage**: AWS S3 or MinIO (for images, PDFs, reports)

#### DevOps & Infrastructure
- **Web Server**: Nginx (reverse proxy, load balancing, SSL)
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes (for scaling)
- **CI/CD**: GitHub Actions or GitLab CI
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **CDN**: Cloudflare or AWS CloudFront
- **Hosting**: AWS/GCP/Azure or DigitalOcean

#### Frontend Enhancements
- **State Management**: Zustand or Redux Toolkit
- **Data Fetching**: TanStack Query (React Query)
- **Form Management**: React Hook Form + Zod
- **UI Components**: shadcn/ui + TailwindCSS
- **Charts**: Recharts or Chart.js
- **Maps**: Leaflet or Google Maps API
- **Real-time**: Socket.io Client
- **PWA**: Workbox (for offline support)

---

## 👥 User Roles & Permissions

### 1. Super Admin
**Capabilities:**
- Full system access and control
- Manage all users (create, update, delete, suspend)
- Manage all content (crops, news, research, mandis)
- View analytics and reports
- Configure system settings
- Manage subscriptions and payments
- Access audit logs

### 2. Farmer
**Capabilities:**
- View all public content (crops, weather, news, research)
- Submit soil testing requests
- Book consultation with experts
- Enroll in training courses
- Save favorite crops and articles
- Receive personalized recommendations
- Access weather alerts
- View mandi prices
- Track own submissions and requests
- Update profile and preferences

### 3. Mandi Owner
**Capabilities:**
- Update mandi prices for their mandi
- Add/update commodity listings
- View price trends and analytics
- Manage mandi information (location, timing, facilities)
- Receive farmer inquiries
- Post market demand/supply updates
- View reports on their mandi activity

### 4. Researcher
**Capabilities:**
- Submit research papers for approval
- Respond to soil testing queries
- Provide recommendations to farmers
- Access farmer data (with consent)
- Create and manage research projects
- Collaborate with other researchers
- Download aggregated data for research
- View analytics on research impact

### 5. Lab Owner (Soil Testing)
**Capabilities:**
- Receive soil testing requests
- Upload soil test reports (PDF)
- Manage lab information (services, pricing, location)
- Track testing requests (pending, completed)
- Generate and download reports
- Communicate with farmers
- View revenue analytics
- Manage lab staff accounts

### 6. Content Manager (Optional)
**Capabilities:**
- Manage news articles
- Update crop information
- Moderate user-generated content
- Publish research papers (after review)
- Manage events and announcements

---

## 🗄️ Database Schema Design

### PostgreSQL Tables

```sql
-- Users & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'farmer', 'mandi_owner', 'researcher', 'lab_owner', 'content_manager')),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    avatar_url TEXT,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Farmers
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    land_size DECIMAL(10, 2), -- in acres
    soil_type VARCHAR(100),
    current_crops TEXT[],
    farming_experience INTEGER, -- years
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mandi Owners
CREATE TABLE mandis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    facilities TEXT[],
    contact_phone VARCHAR(20),
    timing VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mandi_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mandi_id UUID REFERENCES mandis(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    min_price DECIMAL(10, 2),
    max_price DECIMAL(10, 2),
    unit VARCHAR(50) DEFAULT 'Quintal',
    price_date DATE NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(mandi_id, product_name, price_date)
);

-- Researchers
CREATE TABLE researchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization VARCHAR(255),
    specialization VARCHAR(255),
    qualification VARCHAR(255),
    experience INTEGER,
    publications INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE research_papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    researcher_id UUID REFERENCES researchers(id) ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255),
    journal VARCHAR(255),
    publication_year INTEGER,
    abstract TEXT,
    full_content TEXT,
    keywords TEXT[],
    pdf_url TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    views INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lab Owners
CREATE TABLE labs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    services TEXT[],
    certifications TEXT[],
    contact_phone VARCHAR(20),
    email VARCHAR(255),
    turnaround_time VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE soil_test_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lab_id UUID REFERENCES labs(id) ON DELETE SET NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    land_size DECIMAL(10, 2),
    soil_type VARCHAR(100),
    current_crops TEXT,
    query_type VARCHAR(100),
    problem_description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
    report_url TEXT,
    lab_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crops
CREATE TABLE crops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    brief_description TEXT,
    full_description TEXT,
    image_url TEXT,
    climate TEXT,
    soil TEXT,
    sowing_time VARCHAR(255),
    harvesting_time VARCHAR(255),
    water_requirements TEXT,
    common_pests TEXT[],
    common_diseases TEXT[],
    yield TEXT,
    cultivation_practices TEXT[],
    fertilizer_management TEXT,
    market_info TEXT,
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'published',
    views INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE,
    category VARCHAR(100),
    headline TEXT,
    snippet TEXT,
    full_content TEXT,
    image_url TEXT,
    source VARCHAR(255),
    author VARCHAR(255),
    published_date TIMESTAMP,
    external_url TEXT,
    status VARCHAR(50) DEFAULT 'published',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    image_url TEXT,
    start_date DATE,
    end_date DATE,
    city VARCHAR(100),
    state VARCHAR(100),
    venue TEXT,
    external_url TEXT,
    organizer VARCHAR(255),
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'upcoming',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(255) NOT NULL,
    description TEXT,
    fees VARCHAR(50),
    duration VARCHAR(100),
    image_url TEXT,
    syllabus TEXT[],
    instructor VARCHAR(255),
    max_students INTEGER,
    enrolled_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    gov_id_no VARCHAR(100),
    gov_id_proof_url TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(course_id, user_id)
);

-- Business Ideas
CREATE TABLE business_ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    farmer_name VARCHAR(255),
    location VARCHAR(255),
    description TEXT,
    image_url TEXT,
    business_type VARCHAR(255),
    profit_potential VARCHAR(100),
    key_lesson TEXT,
    investment_required VARCHAR(100),
    status VARCHAR(50) DEFAULT 'published',
    views INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Queries & Support
CREATE TABLE expert_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    idea_id UUID REFERENCES business_ideas(id) ON DELETE SET NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    query_text TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
    response TEXT,
    responded_by UUID REFERENCES users(id),
    responded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    message TEXT,
    type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs (for audit trail)
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255),
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_mandi_prices_date ON mandi_prices(price_date);
CREATE INDEX idx_mandi_prices_mandi_id ON mandi_prices(mandi_id);
CREATE INDEX idx_news_published_date ON news_articles(published_date);
CREATE INDEX idx_crops_category ON crops(category);
CREATE INDEX idx_soil_test_status ON soil_test_requests(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

---

## 🔌 Backend API Structure

### API Endpoints

#### Authentication & Users
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
GET    /api/auth/me

GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
PATCH  /api/users/:id/status
```

#### Crops
```
GET    /api/crops
GET    /api/crops/:id
POST   /api/crops (Admin/Content Manager)
PUT    /api/crops/:id (Admin/Content Manager)
DELETE /api/crops/:id (Admin)
GET    /api/crops/search?q=
GET    /api/crops/category/:category
```

#### Mandi Prices
```
GET    /api/mandis
GET    /api/mandis/:id
POST   /api/mandis (Admin/Mandi Owner)
PUT    /api/mandis/:id (Admin/Mandi Owner)
DELETE /api/mandis/:id (Admin)

GET    /api/mandi-prices
GET    /api/mandi-prices/:id
GET    /api/mandi-prices/mandi/:mandiId
POST   /api/mandi-prices (Mandi Owner)
PUT    /api/mandi-prices/:id (Mandi Owner)
DELETE /api/mandi-prices/:id (Admin/Mandi Owner)
GET    /api/mandi-prices/trends?product=&days=
```

#### News
```
GET    /api/news
GET    /api/news/:id
POST   /api/news (Admin/Content Manager)
PUT    /api/news/:id (Admin/Content Manager)
DELETE /api/news/:id (Admin)
GET    /api/news/search?q=
PATCH  /api/news/:id/like
```

#### Research Papers
```
GET    /api/research
GET    /api/research/:id
POST   /api/research (Researcher)
PUT    /api/research/:id (Researcher/Admin)
DELETE /api/research/:id (Admin)
PATCH  /api/research/:id/approve (Admin)
PATCH  /api/research/:id/reject (Admin)
GET    /api/research/:id/download
```

#### Soil Testing
```
GET    /api/labs
GET    /api/labs/:id
POST   /api/labs (Admin/Lab Owner)
PUT    /api/labs/:id (Admin/Lab Owner)
DELETE /api/labs/:id (Admin)

GET    /api/soil-tests
GET    /api/soil-tests/:id
POST   /api/soil-tests (Farmer)
PUT    /api/soil-tests/:id (Lab Owner)
PATCH  /api/soil-tests/:id/assign (Lab Owner)
PATCH  /api/soil-tests/:id/complete (Lab Owner)
POST   /api/soil-tests/:id/upload-report (Lab Owner)
```

#### Courses
```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses (Admin)
PUT    /api/courses/:id (Admin)
DELETE /api/courses/:id (Admin)
POST   /api/courses/:id/enroll (Farmer)
GET    /api/courses/my-enrollments
```

#### Business Ideas
```
GET    /api/business-ideas
GET    /api/business-ideas/:id
POST   /api/business-ideas (Admin/Content Manager)
PUT    /api/business-ideas/:id (Admin/Content Manager)
DELETE /api/business-ideas/:id (Admin)
POST   /api/business-ideas/:id/query (Farmer)
```

#### Analytics & Reports (Admin)
```
GET    /api/analytics/dashboard
GET    /api/analytics/users
GET    /api/analytics/content
GET    /api/analytics/revenue
GET    /api/reports/farmers
GET    /api/reports/mandis
GET    /api/reports/soil-tests
```

#### Weather (Proxy API)
```
GET    /api/weather?location=
GET    /api/weather/forecast?location=&days=
```

#### Notifications
```
GET    /api/notifications
PATCH  /api/notifications/:id/read
PATCH  /api/notifications/mark-all-read
DELETE /api/notifications/:id
```

---

## 🔐 Security Best Practices

### 1. Authentication & Authorization
- **JWT Tokens**: Access token (15min) + Refresh token (7 days)
- **Password**: bcrypt with salt rounds 12
- **2FA**: Optional TOTP for sensitive roles
- **Rate Limiting**: 100 req/15min per IP
- **RBAC**: Role-based access control with middleware

### 2. Data Security
- **Encryption**: Sensitive data encrypted at rest
- **HTTPS**: SSL/TLS certificates (Let's Encrypt)
- **Input Validation**: Joi or Zod schemas
- **SQL Injection**: Use parameterized queries (ORM)
- **XSS Protection**: Sanitize HTML inputs
- **CSRF Protection**: CSRF tokens for state-changing operations

### 3. API Security
- **CORS**: Whitelist specific origins
- **Helmet.js**: Set security headers
- **API Keys**: For third-party integrations
- **Request Signing**: For critical operations
- **Audit Logging**: Log all sensitive operations

---

## 📈 Scalability Strategy

### Horizontal Scaling
1. **Load Balancer**: Nginx distributes traffic across multiple backend instances
2. **Stateless Backend**: Store sessions in Redis (not in-memory)
3. **Database Replication**: Master-slave for read-heavy operations
4. **Microservices**: Split into services (Auth, Content, Analytics, etc.)

### Caching Strategy
1. **Redis Cache**:
   - User sessions (TTL: 7 days)
   - API responses (TTL: 5-60 minutes based on endpoint)
   - Frequently accessed crops/news (TTL: 1 hour)
   - Mandi prices (TTL: 30 minutes)
   
2. **CDN**: Static assets (images, CSS, JS) served via CDN

3. **Database Query Cache**: Cache expensive queries

### Performance Optimization
1. **Database Indexing**: All foreign keys and frequently queried columns
2. **Pagination**: Limit 20-50 items per page
3. **Lazy Loading**: Load images/data on scroll
4. **Compression**: Gzip/Brotli for API responses
5. **Image Optimization**: WebP format, multiple sizes
6. **Connection Pooling**: PostgreSQL connection pool (max 20)

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (4-6 weeks)
- [ ] Setup PostgreSQL database with schema
- [ ] Setup Redis for caching
- [ ] Create Express.js backend with folder structure
- [ ] Implement JWT authentication
- [ ] Create user registration/login APIs
- [ ] Setup role-based access control
- [ ] Create profile management APIs
- [ ] Setup file upload (S3/Cloudinary)

### Phase 2: Core Features (6-8 weeks)
- [ ] Migrate crop data to database
- [ ] Create crop CRUD APIs
- [ ] Migrate mandi data to database
- [ ] Create mandi & mandi prices APIs
- [ ] Migrate news data to database
- [ ] Create news CRUD APIs
- [ ] Migrate research papers to database
- [ ] Create research paper APIs
- [ ] Implement soil testing workflow
- [ ] Create lab management APIs

### Phase 3: Admin Dashboard (4-5 weeks)
- [ ] Create Super Admin dashboard UI
- [ ] User management interface
- [ ] Content management interface (crops, news, research)
- [ ] Mandi prices management
- [ ] Analytics & reports
- [ ] Activity logs viewer

### Phase 4: Role-Specific Dashboards (5-6 weeks)
- [ ] Farmer dashboard
- [ ] Mandi Owner dashboard
- [ ] Researcher dashboard
- [ ] Lab Owner dashboard
- [ ] Content Manager dashboard

### Phase 5: Advanced Features (4-5 weeks)
- [ ] Notifications system (in-app + email)
- [ ] Course enrollment workflow
- [ ] Search functionality (Elasticsearch)
- [ ] Real-time updates (Socket.io)
- [ ] Export/download reports
- [ ] Advanced analytics

### Phase 6: DevOps & Deployment (3-4 weeks)
- [ ] Setup Docker containers
- [ ] Configure Nginx reverse proxy
- [ ] Setup CI/CD pipeline
- [ ] Configure monitoring (Prometheus + Grafana)
- [ ] Setup error tracking (Sentry)
- [ ] Performance testing & optimization
- [ ] Security audit
- [ ] Deploy to production

### Phase 7: Testing & Launch (2-3 weeks)
- [ ] Unit testing (Jest)
- [ ] Integration testing
- [ ] E2E testing (Playwright)
- [ ] Load testing (k6 or Apache JMeter)
- [ ] Security testing
- [ ] Beta testing with real users
- [ ] Bug fixes & optimization
- [ ] Production launch

**Total Estimated Time**: 28-37 weeks (~7-9 months)

---

## 🎨 Modern Features to Add

### 1. Real-Time Features
- Live mandi price updates
- Weather alerts push notifications
- Chat with experts/support
- Real-time dashboard metrics

### 2. AI/ML Features
- Crop recommendation based on soil & location
- Disease detection from crop images
- Price prediction for commodities
- Personalized news/research recommendations

### 3. Mobile App
- React Native or Flutter mobile app
- Push notifications
- Offline mode with sync
- Camera integration for disease detection

### 4. Social Features
- Farmer community forum
- Success story sharing
- Q&A platform
- Expert consultations

### 5. E-Commerce Integration
- Buy/sell crops directly
- Equipment marketplace
- Fertilizer/seed store
- Payment gateway integration

### 6. Advanced Analytics
- Yield prediction
- Profit/loss calculator
- Weather impact analysis
- Market trend analysis
- Personalized insights

### 7. IoT Integration
- Soil sensor data integration
- Weather station data
- Automated irrigation systems
- Drone data integration

### 8. Multilingual Support
- Hindi, regional languages
- Voice input/output
- Translation for research papers

### 9. Government Integration
- PM-KISAN scheme integration
- Subsidy calculator
- Government schemes notifications
- Direct benefit transfer

### 10. Gamification
- Achievement badges
- Leaderboards
- Rewards for contributions
- Learning streaks

---

## 📁 Recommended Folder Structure

```
krishi_sahyak/
├── frontend/                 # React App
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── farmer/
│   │   │   ├── admin/
│   │   │   ├── mandi/
│   │   │   └── researcher/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/        # API calls
│   │   ├── store/           # Zustand/Redux
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── config/          # DB, Redis, AWS config
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Auth, validation, error
│   │   ├── models/          # Prisma models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   ├── validators/      # Input validation
│   │   └── server.js        # Entry point
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   ├── package.json
│   └── .env.example
│
├── nginx/                    # Nginx config
│   └── nginx.conf
│
├── docker/                   # Docker files
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
├── scripts/                  # Utility scripts
│   ├── seed-database.js
│   └── migrate-data.js
│
├── docs/                     # Documentation
│   ├── API.md
│   └── DEPLOYMENT.md
│
└── README.md
```

---

## 💾 Redis Caching Strategy

```javascript
// Example Redis cache keys structure
const CACHE_KEYS = {
  user: (id) => `user:${id}`,
  crops: 'crops:all',
  crop: (id) => `crop:${id}`,
  mandiPrices: (mandiId, date) => `mandi_prices:${mandiId}:${date}`,
  news: (page) => `news:page:${page}`,
  research: (page) => `research:page:${page}`,
  weather: (location) => `weather:${location}`,
};

// TTL (Time to Live) in seconds
const CACHE_TTL = {
  user: 3600,           // 1 hour
  crops: 1800,          // 30 minutes
  mandiPrices: 900,     // 15 minutes
  news: 600,            // 10 minutes
  research: 3600,       // 1 hour
  weather: 1800,        // 30 minutes
};
```

---

## 🔧 Nginx Configuration

```nginx
# /etc/nginx/nginx.conf

upstream backend {
    least_conn;
    server backend1:3000 weight=1;
    server backend2:3000 weight=1;
    server backend3:3000 weight=1;
}

server {
    listen 80;
    server_name krishisahayak.com www.krishisahayak.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name krishisahayak.com www.krishisahayak.com;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/krishisahayak.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/krishisahayak.com/privkey.pem;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Frontend (React App)
    location / {
        root /var/www/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # File Uploads
    client_max_body_size 50M;

    # Static Assets Cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔍 Additional Suggestions

### 1. Use TypeScript
Convert both frontend and backend to TypeScript for better type safety and developer experience.

### 2. Implement GraphQL (Optional)
For complex nested queries (e.g., farmer with crops, soil tests, enrollments), GraphQL can reduce over-fetching.

### 3. Add Elasticsearch
For advanced search across crops, news, research papers with filters and full-text search.

### 4. Progressive Web App (PWA)
Make the frontend a PWA for offline access and mobile-like experience.

### 5. Data Backup
- Automated daily PostgreSQL backups to S3
- Point-in-time recovery enabled
- Regular restore testing

### 6. Monitoring & Alerts
- Setup Prometheus for metrics
- Grafana dashboards for visualization
- Alert on high error rates, latency, or downtime
- Sentry for error tracking

### 7. API Rate Limiting
```javascript
// Example with express-rate-limit
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: 'Too many requests, please try again later.',
});

app.use('/api/', apiLimiter);
```

### 8. Cost Optimization
- Use CDN for static assets (Cloudflare Free)
- Database connection pooling
- Optimize images (WebP, compression)
- Use serverless for infrequent tasks (AWS Lambda)
- Monitor and optimize database queries

---

## 📊 Estimated Infrastructure Costs (Monthly)

### For 1 Million Users (Assuming 100k DAU)

| Service | Provider | Cost |
|---------|----------|------|
| Backend Servers (3x) | DigitalOcean/AWS | $120-$300 |
| PostgreSQL Database | AWS RDS/DigitalOcean | $60-$150 |
| Redis Cache | AWS ElastiCache | $20-$60 |
| Object Storage (S3) | AWS/DigitalOcean | $20-$50 |
| CDN | Cloudflare | $0-$50 |
| Email Service | SendGrid | $15-$80 |
| Monitoring | Grafana Cloud | $0-$50 |
| Domain & SSL | Namecheap + Let's Encrypt | $10 |
| **Total** | | **$245-$750/month** |

*Costs can be reduced significantly in the initial phase by using smaller instances.*

---

## 🎯 Key Success Metrics

### User Metrics
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- User Retention Rate (7-day, 30-day)
- User Growth Rate

### Engagement Metrics
- Average Session Duration
- Pages per Session
- Bounce Rate
- Feature Adoption Rate

### Content Metrics
- Crop views
- News article reads
- Research paper downloads
- Mandi price checks

### Business Metrics
- Course Enrollments
- Soil Test Requests
- Expert Consultations
- Revenue (if applicable)

### Technical Metrics
- API Response Time (P50, P95, P99)
- Error Rate
- Uptime (99.9% target)
- Database Query Performance

---

## 📝 Next Steps

1. **Review & Approve Architecture**: Discuss this plan with your team
2. **Setup Development Environment**: Install PostgreSQL, Redis, Docker
3. **Create GitHub Repository**: Setup version control and branching strategy
4. **Backend Foundation**: Start with Phase 1 implementation
5. **Database Migration**: Write scripts to migrate existing hardcoded data
6. **API Development**: Build REST APIs following the structure
7. **Frontend Integration**: Connect React app to APIs
8. **Testing**: Write tests as you build features
9. **Deployment**: Setup staging environment first
10. **Launch**: Beta test → Production launch

---

## 🤝 Team Recommendation

### Ideal Team Structure
- **1 Full-Stack Developer** (You) - Overall architecture & implementation
- **1 Backend Developer** - API development
- **1 Frontend Developer** - UI/UX implementation
- **1 DevOps Engineer** (Part-time) - Infrastructure setup
- **1 QA Engineer** (Part-time) - Testing
- **1 Product Manager** (Optional) - Feature planning
- **1 Designer** (Part-time) - UI/UX design

For solo development, focus on MVP first, then gradually add features.

---

## 📚 Learning Resources

### Backend
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices
- Prisma Docs: https://www.prisma.io/docs
- PostgreSQL Performance: https://wiki.postgresql.org/wiki/Performance_Optimization

### DevOps
- Docker Docs: https://docs.docker.com
- Nginx Documentation: https://nginx.org/en/docs
- Kubernetes Basics: https://kubernetes.io/docs/tutorials

### Scalability
- System Design Primer: https://github.com/donnemartin/system-design-primer
- Web Scalability for Startup Engineers

---

**This architecture is designed to handle millions of users with high availability, security, and performance. Start with Phase 1 and gradually build up!**
