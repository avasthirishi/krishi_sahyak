# 🔐 Login Issue - Troubleshooting Guide

## ❌ Problem: Unable to Login

This guide helps you fix login issues with the Krishi Sahayak application.

---

## ✅ Quick Fix Steps

### Step 1: Start Backend Server

```powershell
# Navigate to backend folder
cd backend

# Start the server
npm run dev
```

**Expected Output:**
```
✅ Database connected successfully
✅ Redis connected successfully (or skipped if not available)
🚀 Server is running on http://localhost:5000
```

If you see errors, jump to [Backend Issues](#backend-issues) section.

---

### Step 2: Verify Backend is Working

Open PowerShell and run:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Krishi Sahayak API is running!",
  "timestamp": "2026-08-10T..."
}
```

If this fails, see [Backend Issues](#backend-issues).

---

### Step 3: Test Login API Directly

```powershell
$body = @{
    email = "admin@krishisahyak.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

If you get an error, see solutions below.

---

## 🔍 Common Issues & Solutions

### Issue 1: "User not found" or "Invalid credentials"

**Cause:** Users don't exist in database

**Solution: Reseed Database**
```powershell
cd backend
node scripts/seed-complete.js
```

This creates:
- Admin: admin@krishisahyak.com / admin123
- Manager: manager@krishisahyak.com / manager123
- 40 crops

---

### Issue 2: Backend Not Running

**Symptoms:**
- Can't access http://localhost:5000/health
- Browser shows "ERR_CONNECTION_REFUSED"
- API calls fail

**Solution:**
```powershell
cd backend
npm run dev
```

Keep this terminal open!

---

### Issue 3: Database Connection Failed

**Symptoms:**
- Backend shows: "❌ Failed to connect to database"
- Prisma errors

**Solution:**

1. **Verify PostgreSQL is running:**
   - Open pgAdmin 4
   - Check if server is running

2. **Check database exists:**
   ```powershell
   cd backend
   npx prisma studio
   ```
   If it opens, database is fine. If not, create database:
   - Open pgAdmin
   - Create database named `krishi_sahyak`

3. **Check credentials in backend/.env:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/krishi_sahyak"
   ```
   Make sure password is correct and URL-encoded (@ = %40)

4. **Run migrations:**
   ```powershell
   cd backend
   npx prisma migrate deploy
   ```

---

### Issue 4: CORS Error in Browser

**Symptoms:**
- Browser console shows: "CORS policy blocked"
- Network tab shows failed requests

**Solution:**

1. **Check backend/.env:**
   ```env
   FRONTEND_URL=http://localhost:5173
   ```

2. **Check frontend/.env:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Restart both servers**

---

### Issue 5: Wrong Password or Email

**Valid Test Credentials:**

✅ **Admin Account:**
- Email: `admin@krishisahyak.com`
- Password: `admin123`

✅ **Manager Account:**
- Email: `manager@krishisahyak.com`
- Password: `manager123`

**Note:** 
- Email must be exact (including @krishisahyak.com)
- Password is case-sensitive
- No spaces before/after

---

### Issue 6: Browser Cache Issues

**Solution:**

1. **Clear localStorage:**
   - Open DevTools (F12)
   - Go to Console tab
   - Run:
     ```javascript
     localStorage.clear()
     sessionStorage.clear()
     location.reload()
     ```

2. **Or use Incognito/Private mode**

---

### Issue 7: Frontend API URL Wrong

**Check frontend/.env:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** No trailing slash!

After changing .env:
```powershell
cd frontend
# Stop server (Ctrl+C)
npm run dev
```

---

## 🧪 Detailed Testing

### Test 1: Check Users in Database

```powershell
cd backend
npx prisma studio
```

Opens at http://localhost:5555

1. Click on "User" table
2. Check if admin@krishisahyak.com exists
3. Verify `passwordHash` field is not empty
4. Check `isActive` is true

---

### Test 2: Test Password Hash

```powershell
cd backend
node
```

In Node REPL:
```javascript
const bcrypt = require('bcryptjs');

// Test if password matches hash
const testPassword = 'admin123';
const hash = '$2a$12$...'; // Copy from database

bcrypt.compare(testPassword, hash).then(result => {
  console.log('Password matches:', result);
  process.exit();
});
```

Should print: `Password matches: true`

---

### Test 3: Check JWT Secrets

Backend needs JWT secrets in `.env`:
```env
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
```

If missing, add them and restart backend.

---

## 📋 Complete Troubleshooting Checklist

Run through this checklist:

- [ ] PostgreSQL running (check pgAdmin)
- [ ] Database `krishi_sahyak` exists
- [ ] Backend server running on port 5000
- [ ] Backend health check works: http://localhost:5000/health
- [ ] Frontend server running (any port)
- [ ] `.env` files configured correctly
- [ ] Database seeded with users
- [ ] Users exist in database (check Prisma Studio)
- [ ] Browser localStorage cleared
- [ ] Using correct credentials (admin@krishisahyak.com / admin123)
- [ ] No CORS errors in browser console
- [ ] Network requests going to correct URL

---

## 🆘 Still Not Working?

### Debug Login Request

1. **Open Browser DevTools (F12)**
2. **Go to Network tab**
3. **Try to login**
4. **Click on the login request**
5. **Check:**
   - Request URL (should be http://localhost:5000/api/auth/login)
   - Request payload (should have email and password)
   - Response status (200 = success, 401 = wrong credentials, 500 = server error)
   - Response body (shows error message)

---

### Enable Debug Logging

**Backend:** Already logs requests in development mode

**Frontend:** Add console logs in `src/services/api.js`:
```javascript
export const authAPI = {
  login: async (email, password) => {
    console.log('Attempting login:', email);
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response);
    // ... rest of code
  }
}
```

---

## 🎯 Quick Recovery Script

If all else fails, run this complete reset:

```powershell
# Navigate to backend
cd backend

# Drop and recreate database
npx prisma migrate reset --force

# Seed database
node scripts/seed-complete.js

# Start backend
npm run dev
```

Then in another terminal:
```powershell
# Navigate to frontend
cd frontend

# Clear cache
Remove-Item -Recurse -Force node_modules\.vite

# Start frontend
npm run dev
```

Then in browser:
1. Go to DevTools (F12) → Application → Clear storage → Clear all
2. Refresh page
3. Try login

---

## ✅ Success Indicators

You know login works when:
- ✅ No errors in browser console
- ✅ Network request shows 200 status
- ✅ localStorage has `accessToken` after login
- ✅ Redirected to home page
- ✅ Can access /profile page
- ✅ Backend logs show: `POST /api/auth/login`

---

## 📞 Need More Help?

1. Check backend terminal for error messages
2. Check browser console for errors
3. Run: `cd backend && npx prisma studio` to verify data
4. Verify .env files are correct
5. Try the Quick Recovery Script above

---

**Remember:** Backend must be running for login to work!

```powershell
cd backend
npm run dev
```

Keep this terminal open while using the app!
