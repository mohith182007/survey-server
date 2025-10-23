# 🎯 Quick Visual Guide: Environment Variables & URLs

## The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR SURVEY SYSTEM                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend (React)                                           │
│  ├─ URL: https://github.com/mohith182007/survey-server    │
│  ├─ Deployed at: localhost:3000 (or Vercel/Netlify)       │
│  └─ API calls to: survey-backend-XXXX.onrender.com         │
│                                                              │
│                      ↓ HTTP Requests ↓                      │
│                                                              │
│  Backend (Express + Prisma)  ← THIS NEEDS POSTGRES         │
│  ├─ URL: https://survey-backend-XXXX.onrender.com         │
│  ├─ Port: 10000 (on Render)                               │
│  ├─ Database URL: postgresql://...@dpg-abc.render...      │
│  └─ Env: NODE_ENV=production, PORT=10000, DATABASE_URL=...│
│                                                              │
│                      ↓ SQL Queries ↓                        │
│                                                              │
│  PostgreSQL Database (on Render)                            │
│  ├─ Internal: dpg-abc123def.render.internal:5432           │
│  ├─ External: dpg-abc123def.onrender.com:5432              │
│  └─ Tables: users, SurveyResponse                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step: Getting Each Value

### 1️⃣ Create PostgreSQL Database

**In Render Dashboard:**
```
Click "New +" → Select "PostgreSQL"
```

**You'll get:**
```
Internal Database URL:
postgresql://survey_admin:PASSWORD123@dpg-abc123def456.render.internal:5432/survey_db
                     ↓
                  Copy this entire string!
```

### 2️⃣ Set Environment Variables in Backend Service

**In Render → survey-backend → Settings → Environment:**

```
Key: NODE_ENV
Value: production

Key: PORT  
Value: 10000

Key: DATABASE_URL
Value: postgresql://survey_admin:PASSWORD123@dpg-abc123def456.render.internal:5432/survey_db
       ↑ Paste the Internal Database URL from Step 1

Key: CORS_ORIGIN
Value: *
```

### 3️⃣ Your Backend Service URL

**Render automatically gives you:**
```
https://survey-backend-ktjp.onrender.com
```

**All API endpoints:**
```
GET    https://survey-backend-ktjp.onrender.com/api/health
POST   https://survey-backend-ktjp.onrender.com/api/survey/user
POST   https://survey-backend-ktjp.onrender.com/api/survey/submit
GET    https://survey-backend-ktjp.onrender.com/api/survey/user/:userId
GET    https://survey-backend-ktjp.onrender.com/api/survey/response/:responseId
```

---

## 📊 Complete Environment Table

| Variable | Value | Where It Comes From |
|----------|-------|-------------------|
| `NODE_ENV` | `production` | You type this |
| `PORT` | `10000` | Render requires this |
| `DATABASE_URL` | `postgresql://survey_admin:PASSWORD@dpg-abc.render.internal:5432/survey_db` | PostgreSQL database |
| `CORS_ORIGIN` | `*` | You type this |

---

## 🔍 How to Find Each Value in Render Dashboard

### Finding DATABASE_URL

```
Render Dashboard
└── Databases
    └── survey_db (your database)
        └── Internal Database URL ← Copy from here
            postgresql://...
```

### Finding Backend Service URL

```
Render Dashboard
└── Services
    └── survey-backend
        └── (Top right shows URL)
            https://survey-backend-XXXX.onrender.com
```

### Setting Environment Variables

```
Render Dashboard
└── Services
    └── survey-backend
        └── Settings
            └── Environment
                └── Add variables here
```

---

## ✨ What Happens When You Deploy

```
1. You set DATABASE_URL env variable ✅
                    ↓
2. Render saves it securely ✅
                    ↓
3. Backend starts and reads from process.env.DATABASE_URL ✅
                    ↓
4. Prisma uses it to connect to PostgreSQL ✅
                    ↓
5. Database schema is created (migrations run) ✅
                    ↓
6. API endpoints can now save/read data ✅
```

---

## 🧪 Test Commands After Deployment

### Test 1: Health Check
```bash
curl https://survey-backend-ktjp.onrender.com/api/health
```
Expected: `"database": "connected"` ✅

### Test 2: Create User
```bash
curl -X POST https://survey-backend-ktjp.onrender.com/api/survey/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 25,
    "institution": "university",
    "institutionName": "MIT",
    "gmail": "john@example.com"
  }'
```
Expected: `{"success": true, "userId": "..."}` ✅

### Test 3: Check User Created
```bash
curl https://survey-backend-ktjp.onrender.com/api/survey/user/USER_ID_FROM_TEST_2
```
Expected: User data returned ✅

---

## 📝 Copy-Paste Ready Checklist

**When creating PostgreSQL database, you'll see:**
```
Internal Database URL:
📋 Copy this → postgresql://survey_admin:xyz@dpg-abc.render.internal:5432/survey_db
```

**When setting backend environment variables, add:**
```
✅ NODE_ENV = production
✅ PORT = 10000
✅ DATABASE_URL = [paste the URL from above]
✅ CORS_ORIGIN = *
```

**Your backend URL will be shown as:**
```
📋 Copy this → https://survey-backend-XXXX.onrender.com
```

---

## 🎯 Remember These Points

1. **DATABASE_URL** = Connection string to PostgreSQL (from Render PostgreSQL page)
2. **Backend URL** = Where your API runs (from Render Service page)
3. **Frontend points to** = Backend URL (already configured in frontend code)
4. **PORT must be** = 10000 (Render requirement)
5. **Use Internal URL** = For DATABASE_URL (faster, more secure)

---

## 🚀 You're Ready!

Have these values ready:
- ✅ NODE_ENV
- ✅ PORT
- ✅ DATABASE_URL
- ✅ CORS_ORIGIN

Then set them in Render and you're done! 🎉
