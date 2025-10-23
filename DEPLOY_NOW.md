# 🚀 Deploy PostgreSQL Backend to Render (Quick Start)

## What You Need to Do (3 Steps)

### ✅ DONE - Backend Code Updated
- Migrated from MongoDB to PostgreSQL
- All code pushed to GitHub
- Render will auto-redeploy

### ⏳ NEXT: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in:
   - Name: `survey_db`
   - Database: `survey_db`
   - Region: Your closest region
   - Plan: **Free** ✅
4. Click **"Create Database"**
5. Wait ~30 seconds for "Available" status
6. **Copy the "Internal Database URL"** (you'll paste this next)

### ⏳ NEXT: Update Backend Environment Variables

1. Go to https://dashboard.render.com/services
2. Click your `survey-backend` service
3. Click **"Settings"**
4. Scroll to **"Environment"**
5. Add/Update these variables:
   - **NODE_ENV** = `production`
   - **PORT** = `10000`
   - **DATABASE_URL** = *Paste the PostgreSQL URL from Step 1*
6. Delete old MongoDB variables if any exist
7. Click **"Save"**

### ⏳ NEXT: Trigger Deployment

The service will auto-redeploy when you save. Wait 2-3 minutes.

### ✅ VERIFY IT WORKS

Test the health endpoint:
```bash
curl https://survey-backend-XXXX.onrender.com/api/health
```

You should see:
```json
{
  "status": "Server is running",
  "database": "connected",
  "databaseType": "postgresql"
}
```

That's it! 🎉

---

## If You Run Into Issues

**Q: I see "database": "disconnected"**  
A: Check that DATABASE_URL environment variable is set correctly in Render

**Q: Still having issues?**  
A: Check Service Logs in Render dashboard for error messages

**Q: Want to test locally first?**  
A: See `backend/POSTGRESQL_SETUP.md` for local development setup

---

## What Happens After Deployment

✅ Users can create profiles  
✅ Survey responses saved to PostgreSQL  
✅ Results displayed correctly  
✅ All endpoints working  

Your app is production-ready! 🚀
