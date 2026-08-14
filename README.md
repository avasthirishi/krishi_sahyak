# 🌾 Krishi Sahayak - Agricultural Support Platform

A comprehensive full-stack web application designed to support farmers and agricultural professionals with modern tools, information, and resources.

---

## 📁 Project Structure

```
krishi_sahyak/
│
├── frontend/              # React + Vite frontend application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend documentation
│
├── backend/              # Node.js + Express backend API
│   ├── src/              # Source code
│   ├── prisma/           # Database schema & migrations
│   ├── scripts/          # Utility scripts
│   ├── package.json      # Backend dependencies
│   └── .env              # Backend environment variables
│
├── docker-compose.yml    # Docker orchestration
├── nginx.conf            # Nginx configuration
└── Documentation/        # Various .md guides
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20 LTS
- PostgreSQL 16
- Redis 7 (optional, for caching)
- npm or yarn

### 1. Clone Repository
```powershell
git clone <your-repo-url>
cd krishi_sahyak
```

### 2. Setup Backend
```powershell
cd backend

# Install dependencies
npm install

# Configure environment
# Edit .env with your database credentials

# Run migrations
npx prisma migrate deploy

# Seed database with test data
node scripts/seed-complete.js

# Start backend server
npm run dev
```

Backend will run on http://localhost:5000

### 3. Setup Frontend
```powershell
cd frontend

# Install dependencies
npm install

# Configure environment (if needed)
# Create .env file:
# VITE_API_URL=http://localhost:5000/api

# Start frontend dev server
npm run dev
```

Frontend will run on http://localhost:5173 (or next available port)

---

## 🔐 Test Credentials

### Admin Account
- **Email:** admin@krishisahyak.com
- **Password:** admin123

### Manager Account
- **Email:** manager@krishisahyak.com
- **Password:** manager123

---

## 🎯 Features

### User Features
- ✅ User authentication (JWT-based)
- ✅ User profile management
- ✅ Role-based access control (6 roles)

### Agricultural Features
- ✅ **Crop Database** - 40+ crops with detailed information
- ✅ **Weather Information** - Real-time weather data
- ✅ **News Updates** - Agricultural news and updates
- ✅ **Mandi Prices** - Market price information
- ✅ **Soil Testing** - Soil analysis tools
- ✅ **Research Resources** - Agricultural research papers
- ✅ **Business Ideas** - Farming business opportunities

### Technical Features
- ✅ RESTful API
- ✅ PostgreSQL database
- ✅ Redis caching (optional)
- ✅ Nginx reverse proxy
- ✅ Docker containerization
- ✅ Prisma ORM
- ✅ React 19 with Vite
- ✅ TailwindCSS styling

---

## 🐳 Docker Deployment

### Start All Services
```powershell
# Build and start
docker-compose up -d

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend node scripts/seed-complete.js
```

### Access Points
- **Application:** http://localhost
- **Backend API:** http://localhost/api
- **Frontend:** http://localhost (proxied through Nginx)

### View Logs
```powershell
docker-compose logs -f
```

### Stop Services
```powershell
docker-compose down
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/refresh` - Refresh access token

### Crops
- `GET /api/crops` - Get all crops (with pagination)
- `GET /api/crops/:id` - Get crop by ID
- `POST /api/crops` - Create crop (Admin/Manager)
- `PUT /api/crops/:id` - Update crop (Admin/Manager)
- `DELETE /api/crops/:id` - Delete crop (Admin only)

### Health Check
- `GET /health` - API health status

---

## 🛠️ Development

### Backend Development
```powershell
cd backend

# Development mode (auto-reload)
npm run dev

# Production mode
npm start

# Run migrations
npm run migrate

# Prisma Studio (database GUI)
npm run db:studio
```

### Frontend Development
```powershell
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🗄️ Database

### Technology
- PostgreSQL 16
- Prisma ORM

### Models
- User - User accounts
- Profile - User profiles
- Crop - Crop information
- NewsArticle - News articles

### User Roles
1. `SUPER_ADMIN` - Full system access
2. `FARMER` - Basic user access
3. `MANDI_OWNER` - Market owner access
4. `RESEARCHER` - Research access
5. `LAB_OWNER` - Lab testing access
6. `CONTENT_MANAGER` - Content management

### Manage Database
```powershell
cd backend

# Prisma Studio (GUI)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Deploy migrations
npx prisma migrate deploy
```

---

## 🔧 Troubleshooting

### Login Not Working

**1. Verify Backend is Running**
```powershell
# Check health endpoint
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

**2. Check Database Users**
```powershell
cd backend
npx prisma studio
# Browse to Users table
```

**3. Reseed Database**
```powershell
cd backend
node scripts/seed-complete.js
```

**4. Clear Browser Storage**
```javascript
// In browser console (F12)
localStorage.clear()
sessionStorage.clear()
// Refresh page
```

**5. Check API Connection**
- Verify `frontend/.env` has correct `VITE_API_URL`
- Check browser console (F12) for errors
- Check backend logs for errors

### Port Already in Use
```powershell
# Find process using port
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Kill process
taskkill /PID <PID> /F
```

### Database Connection Failed
- Verify PostgreSQL is running
- Check credentials in `backend/.env`
- Ensure database `krishi_sahyak` exists

---

## 📚 Documentation

Comprehensive guides available:
- `QUICK_START.md` - Quick start guide
- `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- `FULLSTACK_ARCHITECTURE.md` - System architecture
- `DOCKER_SETUP_GUIDE.md` - Docker setup guide
- `frontend/README.md` - Frontend documentation
- `RESTRUCTURE_COMPLETE.md` - Latest changes

---

## 🌟 Tech Stack

### Frontend
- React 19.1.1
- React Router 7.8.0
- Vite 7.1.0
- TailwindCSS 4.1.11
- Axios
- Moment.js

### Backend
- Node.js 20 LTS
- Express 5.2.1
- Prisma 7.9.1
- PostgreSQL 16
- Redis 7
- JWT Authentication
- bcryptjs

### Infrastructure
- Docker & Docker Compose
- Nginx
- Redis (caching)

---

## 📄 License

ISC License

---

## 👥 Support

For issues or questions:
1. Check documentation in project root
2. Review troubleshooting section above
3. Check logs: `docker-compose logs -f`
4. Verify environment variables

---

## 🎉 Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173+
- [ ] Database migrations completed
- [ ] Database seeded with test data
- [ ] Can login with test credentials
- [ ] Can view crops list
- [ ] Can view crop details
- [ ] Can access profile page

---

**Built with ❤️ for farmers and agricultural professionals**
