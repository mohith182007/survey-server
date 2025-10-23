# 🚀 QUICK REFERENCE - Deployment Checklist

Copy this into Render. That's literally all you need!

---

## 📋 Deployment Checklist (Copy-Paste Ready!)

### ✅ Step 1: GitHub Connection
- [ ] Go to: https://dashboard.render.com
- [ ] Click: "New +" → "Web Service"
- [ ] Select repository: `survey-server`

### ✅ Step 2: Service Configuration  
- [ ] Root Directory: `backend`
- [ ] Environment: `Node`
- [ ] Build Command:
```
npm install && npx prisma generate && npx prisma migrate deploy
```
- [ ] Start Command:
```
npm start
```

### ✅ Step 3: Environment Variables

Add these exactly (4 total):

```
KEY: NODE_ENV
VALUE: production
[Add]

KEY: PORT
VALUE: 10000
[Add]

KEY: DATABASE_URL
VALUE: postgresql://survey_db_n5gn_user:STOeC7L6ZAVseg9LdDHFsDUgJYa0y5Xk@dpg-d3sqbl7gi27c73drmh20-a/survey_db_n5gn
[Add]

KEY: CORS_ORIGIN
VALUE: *
[Add]
```

### ✅ Step 4: Deploy!
- [ ] Service name: `survey-backend` (optional)
- [ ] Plan: `Free`
- [ ] Click: **"Create Web Service"**
- [ ] Wait: 2-3 minutes
- [ ] Result: Get your backend URL ✨

---

## 🧪 Test Your Deployment

After 2-3 minutes, test:

```
https://survey-backend-XXXXX.onrender.com/api/health
```

**Should return:**
```json
{
  "status": "Server is running",
  "database": "connected",
  "databaseType": "postgresql"
}
```

✅ If you see that = **SUCCESS!** 🎉

---

## 📍 Your Connection String

Use this in Render for `DATABASE_URL`:

```
postgresql://survey_db_n5gn_user:STOeC7L6ZAVseg9LdDHFsDUgJYa0y5Xk@dpg-d3sqbl7gi27c73drmh20-a/survey_db_n5gn
```

**⚠️ Copy exactly. No modifications!**

---

## 🎯 The 5 Environment Variables Explained

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` | Tells Node.js it's production |
| `PORT` | `10000` | Port Render uses |
| `DATABASE_URL` | Connection string | PostgreSQL connection |
| `CORS_ORIGIN` | `*` | Allow all frontend origins |

---

## ✅ Pre-Deployment Checklist

Before clicking "Create Web Service":

- [ ] You have Render account (free tier)
- [ ] GitHub repo is `survey-server`
- [ ] Backend code is in `backend/` folder
- [ ] You have your connection string (copied above)
- [ ] You're ready to copy 4 env vars (listed above)

---

## 🚀 Go Time!

1. Open: https://dashboard.render.com
2. Click: "New +" → "Web Service"
3. Fill in: 3 steps above
4. Copy: 4 environment variables
5. Click: "Create Web Service"
6. Wait: 2-3 minutes
7. Test: `/api/health` endpoint
8. Result: **Survey backend is LIVE!** 🎉

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Build failed" | Check Render logs, look for red errors |
| "Database connection error" | Verify DATABASE_URL is copied exactly |
| "Health endpoint returns 502" | Wait 1-2 more minutes, Render is still deploying |
| "Can't access /api/health" | Check that service is active in Render dashboard |

---

## 📞 Files Reference

- **START_HERE.md** - 5-minute quick start
- **DEPLOY_NOW.md** - Step-by-step deployment
- **READY_TO_DEPLOY.md** - Full status summary
- **ENV_COMPLETE_REFERENCE.md** - Environment variables detailed
- **GLOBAL_DEPLOYMENT.md** - Architecture overview

---

## 🎊 Final Checklist

- ✅ PostgreSQL database created
- ✅ Connection string obtained
- ✅ Backend code with Prisma ready
- ✅ GitHub repository synced
- ✅ Documentation complete
- ⏳ Ready for Render deployment!

---

**You've got this! Let's deploy! 🚀**
