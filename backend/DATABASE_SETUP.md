# 🗄️ PostgreSQL Database Setup for Krishi Sahayak

## Step-by-Step Guide

### ✅ Step 1: Create Database (Already Done!)

You should have created the database using one of these methods:

**Method A: Using pgAdmin 4**
- Right-click on Databases → Create → Database
- Name: `krishi_sahyak`

**Method B: Using psql Command Line**
```powershell
psql -U postgres
CREATE DATABASE krishi_sahyak;
\q
```

---

### ✅ Step 2: Configure Environment Variables (Already Done!)

Your `backend/.env` file is already created. **YOU MUST UPDATE THE PASSWORD!**

Open `backend/.env` and update this line:
```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/krishi_sahyak"
```

Replace `YOUR_ACTUAL_PASSWORD` with the password you set for PostgreSQL during installation.

**Example:**
```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/krishi_sahyak"
```

---

### ✅ Step 3: Run Database Migration

Once you've updated the password, run:

```powershell
cd backend
npx prisma migrate dev --name init
```

This will:
- Create all tables (users, profiles, crops, news_articles)
- Generate Prisma Client
- Apply the schema to your database

**Expected Output:**
```
✔ Your database is now in sync with your schema.
✔ Generated Prisma Client
```

---

### ✅ Step 4: Verify Database Setup

**Option A: Using pgAdmin 4**
1. In pgAdmin 4, expand: Servers → PostgreSQL 16 → Databases → krishi_sahyak
2. Click on **Schemas** → **public** → **Tables**
3. You should see: `users`, `profiles`, `crops`, `news_articles`, `_prisma_migrations`

**Option B: Using PowerShell**
```powershell
# Connect to your database
psql -U postgres -d krishi_sahyak

# List all tables
\dt

# View users table structure
\d users

# Exit
\q
```

---

### ✅ Step 5: Generate Prisma Client

After migration, generate the Prisma Client:

```powershell
cd backend
npx prisma generate
```

---

### ✅ Step 6: Test Connection

Let's create a simple test script to verify the connection works.

Create `backend/test-connection.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database connected successfully!');
    console.log('PostgreSQL Version:', result);
    
    // Count tables
    const userCount = await prisma.user.count();
    console.log(`✅ Users table exists. Current count: ${userCount}`);
    
    console.log('\n🎉 Database setup is complete!');
  } catch (error) {
    console.error('❌ Error connecting to database:');
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
```

Run the test:
```powershell
node backend/test-connection.js
```

---

## 🔧 Troubleshooting

### Issue: "Can't reach database server"

**Solution 1: Check if PostgreSQL is running**
```powershell
Get-Service postgresql-x64-16
# If stopped, start it:
Start-Service postgresql-x64-16
```

**Solution 2: Check connection string**
- Verify username (usually `postgres`)
- Verify password (the one you set during installation)
- Verify database name (`krishi_sahyak`)
- Verify port (default is `5432`)

**Solution 3: Test raw connection**
```powershell
psql -U postgres -d krishi_sahyak
# If this works, your connection string might be wrong
```

---

### Issue: "Database does not exist"

**Solution:**
```powershell
psql -U postgres
CREATE DATABASE krishi_sahyak;
\q
```

---

### Issue: "Password authentication failed"

**Solution:**
1. Open pgAdmin 4
2. Right-click PostgreSQL server → Properties
3. Connection tab → View password or reset it
4. Update the password in `backend/.env`

---

### Issue: "relation does not exist"

**Solution:** Tables haven't been created yet. Run:
```powershell
cd backend
npx prisma migrate dev --name init
```

---

## 📊 Useful PostgreSQL Commands

### Connect to Database
```powershell
psql -U postgres -d krishi_sahyak
```

### Inside psql:
```sql
-- List all databases
\l

-- Connect to specific database
\c krishi_sahyak

-- List all tables
\dt

-- Describe a table
\d users
\d crops

-- View all users
SELECT * FROM users;

-- Count records
SELECT COUNT(*) FROM users;

-- Drop all tables (CAREFUL!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Exit
\q
```

### Backup Database
```powershell
# Export database
pg_dump -U postgres krishi_sahyak > backup.sql

# Import database
psql -U postgres krishi_sahyak < backup.sql
```

---

## 🎯 Next Steps After Setup

1. ✅ Database is created and connected
2. ✅ Tables are created via Prisma migration
3. ✅ Prisma Client is generated
4. ⏭️ **Next:** Start building your APIs!
   - Create `backend/src/server.js`
   - Create authentication endpoints
   - Create crop management APIs
   - Refer to `QUICK_START_GUIDE.md` for API implementation

---

## 🔗 Quick Reference

**Your Database Details:**
- **Host:** localhost
- **Port:** 5432
- **Database:** krishi_sahyak
- **User:** postgres (or krishi_admin)
- **Schema:** public

**Connection String Format:**
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

**Your Connection String:**
```
postgresql://postgres:your_password@localhost:5432/krishi_sahyak
```

---

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [pgAdmin 4 Documentation](https://www.pgadmin.org/docs/)

---

**Need help?** Check the main guides:
- `QUICK_START_GUIDE.md` - For API implementation
- `FULLSTACK_ARCHITECTURE.md` - For complete system design
- `IMPLEMENTATION_ROADMAP.md` - For step-by-step development plan
