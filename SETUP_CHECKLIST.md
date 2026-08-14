# ✅ PostgreSQL Setup Checklist for Krishi Sahayak

## What We've Done So Far:

✅ Installed PostgreSQL  
✅ Opened pgAdmin 4  
✅ Ran `npx prisma init` in backend folder  
✅ Created `.env` configuration file  
✅ Created `prisma.config.ts` configuration  
✅ Created Prisma schema with initial models (User, Profile, Crop, NewsArticle)  
✅ Created test connection script  
✅ Created setup documentation  

---

## ⚡ What You Need to Do Now:

### 1️⃣ Create Database in pgAdmin (5 minutes)

Open **pgAdmin 4** (you already have it open) and:

1. Expand **Servers (1)** in left panel
2. Right-click on **PostgreSQL 16**
3. Enter your password if prompted
4. Right-click on **Databases**
5. Select **Create** → **Database**
6. Enter name: `krishi_sahyak`
7. Click **Save**

✅ **Done? Check this box when complete**

---

### 2️⃣ Update Password in .env File (2 minutes)

**CRITICAL STEP - Don't skip this!**

1. Open: `backend\.env`
2. Find this line:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/krishi_sahyak"
   ```
3. Replace `YOUR_PASSWORD_HERE` with your PostgreSQL password
   - This is the password you set when installing PostgreSQL
   - If you don't remember, reset it in pgAdmin:
     - Right-click PostgreSQL 16 → Properties → Connection tab

**Example after update:**
```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/krishi_sahyak"
```

✅ **Done? Password updated?**

---

### 3️⃣ Run Database Migration (3 minutes)

Open **PowerShell** in your project folder and run:

```powershell
cd backend
npx prisma migrate dev --name init
```

**This will:**
- Create all tables in your database
- Generate Prisma Client
- Set up the database schema

**Expected Output:**
```
✔ Your database is now in sync with your schema.
✔ Generated Prisma Client
```

✅ **Done? Migration successful?**

---

### 4️⃣ Test the Connection (2 minutes)

Run the test script to verify everything works:

```powershell
cd backend
node test-connection.js
```

**Expected Output:**
```
✅ Step 1: Database connection successful!
✅ Step 2: "users" table exists (Count: 0)
✅ Step 3: "crops" table exists (Count: 0)
✅ Step 4: "news_articles" table exists (Count: 0)
✅ Step 5: Successfully created test user
✅ Step 6: Successfully deleted test user (cleanup)

🎉 DATABASE SETUP IS COMPLETE!
```

✅ **Done? All tests passed?**

---

## 🎉 What's Next After Database Setup?

Once all 4 steps above are complete, you're ready to start building!

### Option A: Follow Quick Start Guide
📄 Open: `QUICK_START_GUIDE.md`
- Build your first API endpoints
- Create authentication system
- Connect frontend to backend

### Option B: Check Database in pgAdmin
Open pgAdmin 4 and verify:
1. Expand: Servers → PostgreSQL 16 → Databases → krishi_sahyak
2. Expand: Schemas → public → Tables
3. You should see:
   - ✅ users
   - ✅ profiles  
   - ✅ crops
   - ✅ news_articles
   - ✅ _prisma_migrations

---

## 🐛 Troubleshooting

### Problem: "Can't reach database server"

**Check if PostgreSQL is running:**
```powershell
Get-Service postgresql-x64-16
```

**If stopped, start it:**
```powershell
Start-Service postgresql-x64-16
```

---

### Problem: "Password authentication failed"

**Solution:**
1. Your password in `.env` is wrong
2. Open pgAdmin → Right-click PostgreSQL 16 → Properties
3. View or reset password
4. Update `backend\.env` with correct password

---

### Problem: "Database does not exist"

**Solution:**
You skipped Step 1️⃣! Go back and create the database in pgAdmin.

---

### Problem: "relation does not exist"

**Solution:**
You skipped Step 3️⃣! Run the migration:
```powershell
cd backend
npx prisma migrate dev --name init
```

---

## 📚 Quick Reference

### Your Database Info:
- **Name:** krishi_sahyak
- **Host:** localhost
- **Port:** 5432
- **User:** postgres
- **Password:** [the one you set]

### Important Files:
- `backend\.env` - Database connection string
- `backend\prisma\schema.prisma` - Database models
- `backend\prisma.config.ts` - Prisma configuration
- `backend\test-connection.js` - Connection test script

### Useful Commands:
```powershell
# Check PostgreSQL service
Get-Service postgresql-x64-16

# Start PostgreSQL service
Start-Service postgresql-x64-16

# Run migrations
cd backend; npx prisma migrate dev

# Generate Prisma Client
cd backend; npx prisma generate

# Open Prisma Studio (Database GUI)
cd backend; npx prisma studio

# Test connection
cd backend; node test-connection.js

# Connect via psql
psql -U postgres -d krishi_sahyak
```

---

## ✉️ Need More Help?

Check these detailed guides:
- 📖 `backend/DATABASE_SETUP.md` - Detailed database setup guide
- 📖 `QUICK_START_GUIDE.md` - API implementation guide
- 📖 `FULLSTACK_ARCHITECTURE.md` - Complete system design
- 📖 `DOCKER_SETUP_GUIDE.md` - Docker deployment

---

## 🎯 Current Status

Mark where you are:

- [ ] Step 1: Database created in pgAdmin
- [ ] Step 2: Password updated in .env
- [ ] Step 3: Migration completed
- [ ] Step 4: Connection test passed

**Once all 4 are checked ✅, you're ready to build your backend API!**

---

**Last Updated:** 2026-08-10  
**Project:** Krishi Sahayak  
**Database:** PostgreSQL 16
