# 🚀 Quick Start - Getting Your Backend Running

## ✅ What's Already Done:

✓ PostgreSQL database created (**krishi_sahyak**)  
✓ Backend folder structure created  
✓ All dependencies installed  
✓ Complete authentication system built  
✓ Crop management API created  
✓ Database schema designed  
✓ Seed script prepared  

---

## 📋 3 Steps to Start Your Backend

### **Step 1: Update Database Password** (1 minute)

1. Open: `backend\.env`
2. Find line 8:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/krishi_sahyak"
   ```
3. Replace `YOUR_PASSWORD_HERE` with your actual PostgreSQL password
4. Save the file

---

### **Step 2: Create Database Tables** (2 minutes)

Open PowerShell in your project folder and run:

```powershell
cd backend
npx prisma migrate dev --name init
```

**What this does:**
- Creates all tables in your database (users, profiles, crops, news_articles)
- Generates Prisma Client for database queries

**Expected Output:**
```
✔ Your database is now in sync with your schema.
✔ Generated Prisma Client
```

---

### **Step 3: Seed Sample Data** (1 minute)

Still in the `backend` folder, run:

```powershell
npm run db:seed
```

**What this does:**
- Creates admin user: `admin@krishisahyak.com` / `admin123`
- Creates content manager: `manager@krishisahyak.com` / `manager123`
- Adds 3 sample crops (Rice, Wheat, Barley)

---

## 🎉 Start Your Backend Server!

```powershell
npm run dev
```

**You should see:**
```
✅ Database connected successfully
🚀 Server is running on http://localhost:5000
📊 Environment: development
```

---

## 🧪 Test Your API

### **1. Test Health Check**

Open browser and visit: `http://localhost:5000/health`

You should see:
```json
{
  "success": true,
  "message": "Krishi Sahayak API is running!"
}
```

### **2. Test Login** (using PowerShell or Postman)

```powershell
$body = @{
    email = "admin@krishisahyak.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

You should get a response with `accessToken` and user data!

### **3. Test Get All Crops**

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/crops" -Method Get
```

You should see 3 crops (Rice, Wheat, Barley)!

---

## 📡 Available API Endpoints

### **Authentication Endpoints:**
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
POST   /api/auth/refresh     - Refresh access token
GET    /api/auth/me          - Get current user (Protected)
PUT    /api/auth/profile     - Update profile (Protected)
```

### **Crop Endpoints:**
```
GET    /api/crops            - Get all crops (Public)
GET    /api/crops/:id        - Get single crop (Public)
POST   /api/crops            - Create crop (Content Manager/Admin only)
PUT    /api/crops/:id        - Update crop (Content Manager/Admin only)
DELETE /api/crops/:id        - Delete crop (Super Admin only)
```

---

## 🔑 Test Credentials

| Role            | Email                       | Password    |
|-----------------|----------------------------|-------------|
| Super Admin     | admin@krishisahyak.com     | admin123    |
| Content Manager | manager@krishisahyak.com   | manager123  |

---

## 💻 Useful Commands

```powershell
# Start development server (auto-reload on changes)
npm run dev

# Start production server
npm start

# Run database migrations
npm run migrate

# Open Prisma Studio (Database GUI)
npm run db:studio

# Seed database
npm run db:seed

# Test database connection
node test-connection.js
```

---

## 🔄 Connect Frontend to Backend

### Update your frontend API calls:

**Example: Login**
```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Login function
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  
  // Save tokens
  localStorage.setItem('accessToken', response.data.data.accessToken);
  localStorage.setItem('refreshToken', response.data.data.refreshToken);
  
  return response.data;
};

// Get all crops
export const getCrops = async () => {
  const response = await api.get('/crops');
  return response.data.data.crops;
};
```

**Example: Protected Request**
```javascript
// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🗂️ Your Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   └── prisma.js           # Database connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── cropController.js   # Crop management logic
│   ├── middlewares/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js        # Auth routes
│   │   └── cropRoutes.js        # Crop routes
│   ├── utils/
│   │   ├── constants.js         # App constants
│   │   └── generateToken.js     # JWT utilities
│   └── server.js                # Main Express server
├── prisma/
│   └── schema.prisma            # Database schema
├── scripts/
│   └── seed.js                  # Database seeding
├── .env                         # Environment variables
└── package.json                 # Dependencies & scripts
```

---

## 🐛 Common Issues & Solutions

### ❌ "Can't reach database server"

**Solution:** Check if PostgreSQL is running
```powershell
Get-Service postgresql-x64-16
Start-Service postgresql-x64-16
```

### ❌ "Password authentication failed"

**Solution:** Update password in `backend\.env` file

### ❌ "Port 5000 already in use"

**Solution:** Change PORT in `backend\.env`:
```env
PORT=5001
```

### ❌ "Module not found"

**Solution:** Reinstall dependencies
```powershell
cd backend
npm install
```

---

## 📚 Next Steps

After your backend is running:

1. **Add More Features:**
   - News Article API (similar to Crop API)
   - Mandi Price API
   - Soil Testing API
   - Research Papers API

2. **Update Frontend:**
   - Replace hardcoded data with API calls
   - Add authentication pages
   - Create admin dashboard

3. **Deploy to Production:**
   - Follow `DOCKER_SETUP_GUIDE.md` for containerization
   - Set up Nginx for load balancing
   - Configure Redis for caching

4. **Follow Roadmap:**
   - Check `IMPLEMENTATION_ROADMAP.md` for week-by-week plan
   - Reference `FULLSTACK_ARCHITECTURE.md` for complete system design

---

## 🎓 Documentation Reference

- 📖 **QUICK_START_GUIDE.md** - Detailed implementation guide
- 📖 **FULLSTACK_ARCHITECTURE.md** - Complete system architecture
- 📖 **DOCKER_SETUP_GUIDE.md** - Docker & deployment guide
- 📖 **IMPLEMENTATION_ROADMAP.md** - 37-week development plan
- 📖 **backend/DATABASE_SETUP.md** - Database setup details

---

## ✅ Verification Checklist

- [ ] Updated password in .env
- [ ] Ran `npx prisma migrate dev --name init`
- [ ] Ran `npm run db:seed`
- [ ] Started server with `npm run dev`
- [ ] Tested health endpoint
- [ ] Tested login endpoint
- [ ] Tested get crops endpoint
- [ ] Opened Prisma Studio to view data

**Once all checked, you're ready to start building! 🚀**

---

**Questions? Check the documentation or test your setup with:**
```powershell
node backend/test-connection.js
```
