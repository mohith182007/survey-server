# 🔑 Environment Variables & URLs - Complete Reference

## Quick Answer to Your Question

### What Environment Variables Do I Need?

You need to set **4 environment variables** in Render for your backend service:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://survey_admin:PASSWORD@dpg-abc123def.render.internal:5432/survey_db
CORS_ORIGIN=*
```

### What URL Will My Backend Have?

Render will assign your backend a URL like:
```
https://survey-backend-ktjp.onrender.com
```

Or with a different service name:
```
https://survey-backend-XXXX.onrender.com
```

This URL is where your frontend and users will call the API from.

---

## Detailed Breakdown

### 1. NODE_ENV Variable

**What it is:** Tells your app whether it's in development or production mode

```
NODE_ENV=production
```

**Why you need it:**
- In production mode, your app runs optimized and doesn't show debug info
- On Render (cloud), you always use `production`
- Locally you'd use `development`

---

### 2. PORT Variable

**What it is:** The port your Express server listens on

```
PORT=10000
```

**Why it must be 10000:**
- Render requires web services to listen on port 10000
- This is NOT optional - Render will reject other ports
- Your backend code checks `process.env.PORT` to know what port to use

**Code in server.js:**
```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### 3. DATABASE_URL Variable

**What it is:** The complete connection string to your PostgreSQL database

```
postgresql://survey_admin:PASSWORD@dpg-abc123def456.render.internal:5432/survey_db
```

**Breaking it down:**
```
postgresql://              ← Database type (always this)
survey_admin               ← Username (Render auto-generates)
:PASSWORD                  ← Password (Render auto-generates)
@dpg-abc123def456          ← Database host ID (Render generates)
.render.internal           ← Internal domain (stays within Render)
:5432                      ← PostgreSQL port (always 5432)
/survey_db                 ← Database name
```

**Where you get this:**
1. Create PostgreSQL database on Render
2. Look at database details page
3. Find "Internal Database URL" section
4. Copy the entire connection string
5. Paste it as DATABASE_URL

**Why "Internal" not "External":**
- Internal URL = Faster (within Render servers)
- External URL = For outside connections (slower)
- Always use Internal for backend ✅

**Code in routes/survey.js:**
```javascript
const prisma = new PrismaClient();
// Prisma reads DATABASE_URL automatically
// and connects to the database
```

---

### 4. CORS_ORIGIN Variable

**What it is:** Which websites can call your API

```
CORS_ORIGIN=*
```

**What `*` means:**
- Allow requests from ANY website/domain
- Good for public APIs
- Later you could restrict to specific domain like `https://yourdomain.com`

**Code in server.js:**
```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  // ... more CORS settings
};
app.use(cors(corsOptions));
```

---

## Complete URLs You'll Use

### Backend Service URL (assigned by Render)

```
https://survey-backend-ktjp.onrender.com
```

### API Endpoints on Your Backend

```
GET    https://survey-backend-ktjp.onrender.com/api/health
GET    https://survey-backend-ktjp.onrender.com/api/survey/user/:userId
GET    https://survey-backend-ktjp.onrender.com/api/survey/response/:responseId
GET    https://survey-backend-ktjp.onrender.com/api/survey/responses

POST   https://survey-backend-ktjp.onrender.com/api/survey/user
POST   https://survey-backend-ktjp.onrender.com/api/survey/submit
```

### PostgreSQL Internal URL (for DATABASE_URL)

```
postgresql://survey_admin:abc123@dpg-abc123def.render.internal:5432/survey_db
```

### PostgreSQL External URL (if needed)

```
postgresql://survey_admin:abc123@dpg-abc123def.onrender.com:5432/survey_db
```

---

## Setting Variables in Render Dashboard

### Step 1: Go to Backend Service
```
https://dashboard.render.com/services
Click on "survey-backend" service
```

### Step 2: Open Settings
```
Click "Settings" button (left side menu)
```

### Step 3: Find Environment Section
```
Scroll down to "Environment"
```

### Step 4: Add Each Variable
```
Click "Add Environment Variable"
Enter Key: NODE_ENV
Enter Value: production
Click "Save"

Repeat for:
- PORT = 10000
- DATABASE_URL = [your PostgreSQL connection string]
- CORS_ORIGIN = *
```

### Step 5: Save Changes
```
Click "Save Changes" at bottom
Service will redeploy automatically
```

---

## Example Render Dashboard Screenshot Guide

```
┌─────────────────────────────────────────────────────┐
│ survey-backend                      Settings        │
├─────────────────────────────────────────────────────┤
│ Settings                                            │
│ ├─ Instance Type                                   │
│ ├─ Environment (← You are here)                    │
│ │  ├─ NODE_ENV = production      ✓ Save           │
│ │  ├─ PORT = 10000               ✓ Save           │
│ │  ├─ DATABASE_URL = postgresql://...  ✓ Save     │
│ │  └─ CORS_ORIGIN = *            ✓ Save           │
│ ├─ Build & Deploy                                  │
│ └─ ...                                             │
│                                                    │
│ [Save Changes] button at bottom                    │
└─────────────────────────────────────────────────────┘
```

---

## Testing Your Setup

### Test 1: Is the backend running?
```bash
curl https://survey-backend-ktjp.onrender.com/api/health

# Should return something like:
# {"status":"Server is running","environment":"production",...}
```

### Test 2: Is the database connected?
```bash
curl https://survey-backend-ktjp.onrender.com/api/health | grep database

# Should see: "database":"connected"  ✅
# Or if not connected yet: "database":"disconnected"
```

### Test 3: Can I create a user?
```bash
curl -X POST https://survey-backend-ktjp.onrender.com/api/survey/user \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Doe",
    "age":28,
    "institution":"university",
    "institutionName":"Stanford",
    "gmail":"jane@example.com"
  }'

# Should return: {"success":true,"userId":"clh4x..."}
```

---

## Troubleshooting

### Problem: "PORT variable is not set"
**Solution:** Make sure you set `PORT=10000` in environment variables

### Problem: "Cannot connect to database"
**Solution:** 
1. Check DATABASE_URL is set correctly
2. Make sure PostgreSQL database shows "Available" on Render
3. Wait 30 seconds and try again

### Problem: "Service won't start"
**Solution:**
1. Check Render logs for error messages
2. Verify all 4 environment variables are set
3. Trigger a manual redeploy

### Problem: "Cors error from frontend"
**Solution:** Make sure `CORS_ORIGIN=*` is set

---

## Reference Table

| Variable | Required? | Value | Example |
|----------|-----------|-------|---------|
| NODE_ENV | ✅ Yes | `production` | Always this on Render |
| PORT | ✅ Yes | `10000` | Render requires this |
| DATABASE_URL | ✅ Yes | PostgreSQL URL | `postgresql://user:pass@...` |
| CORS_ORIGIN | ✅ Yes | `*` | Or specific domain |

---

## Quick Copy-Paste

When you create the PostgreSQL database, Render shows you:
```
Internal Database URL: postgresql://survey_admin:aBcDeFgHiJ@dpg-abc123def456.render.internal:5432/survey_db
```

Copy that entire string and use it for DATABASE_URL in environment variables:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://survey_admin:aBcDeFgHiJ@dpg-abc123def456.render.internal:5432/survey_db
CORS_ORIGIN=*
```

---

## You're All Set! 🎉

With these 4 environment variables set:
- ✅ Your backend connects to PostgreSQL
- ✅ Your API starts on the correct port
- ✅ Your frontend can call the API
- ✅ All data is persisted

Questions? See:
- `DEPLOY_NOW.md` for quick deployment
- `QUICK_SETUP_VISUAL.md` for visual guides
- `POSTGRESQL_MIGRATION.md` for technical details
