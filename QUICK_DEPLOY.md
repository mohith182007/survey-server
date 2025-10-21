# Quick Deployment Commands

## 🚀 Fastest Way to Deploy (5 minutes)

### Prerequisites
- GitHub account
- MongoDB Atlas account (free)
- Heroku account (free)
- Vercel account (free)

---

## Step 1: Set Up MongoDB (✅ DONE!)

```bash
# Your MongoDB connection string:
MONGO_URI="mongodb+srv://surveyadmin:Y2RAL4ZcEgpnGALC@cluster0.fvi0ukr.mongodb.net/survey_db?retryWrites=true&w=majority&appName=Cluster0"
```

---

## Step 2: Deploy Backend to Render (3 minutes - No CLI needed!)

### Easiest Way - Use Render Web Dashboard

1. **Go to**: https://render.com
2. **Sign up** with GitHub account
3. **Click**: "New +" → "Web Service"
4. **Connect GitHub** repo (survery/surveyweb)
5. **Fill in details**:
   - **Name**: `survey-api`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Instance Type**: Free
   
6. **Add Environment Variables** (scroll down):
   - Click "Advanced" → "Add Environment Variable"
   - Add:
     ```
     MONGODB_URI = mongodb+srv://surveyadmin:Y2RAL4ZcEgpnGALC@cluster0.fvi0ukr.mongodb.net/survey_db?retryWrites=true&w=majority&appName=Cluster0
     NODE_ENV = production
     PORT = 5000
     ```

7. **Click**: "Create Web Service"
8. **Wait**: 2-3 minutes for deployment
9. **Get URL**: Your backend is at `https://survey-api.onrender.com`

### OR Use CLI (Alternative)

```bash
# Initialize Render project
render init

# Login to Render
render login

# Deploy
render deploy --service=backend
```

**That's it! Your backend is live!** 🚀

---

## Step 3: Update Frontend (1 minute)

```bash
# In frontend/src/utils/api.js
# Change:
const API_BASE_URL = 'http://localhost:5000/api';
# To:
const API_BASE_URL = 'https://survey-api.onrender.com/api';

# Commit changes
git add frontend/src/utils/api.js
git commit -m "Update API URL for production"
git push origin main
```

---

## Step 4: Deploy Frontend to Vercel (Less than 1 minute)

```bash
# 1. Go to https://vercel.com
# 2. Sign in with GitHub
# 3. Click "New Project"
# 4. Import your repository
# 5. Click "Deploy"
# 6. Done!

# Your frontend URL will be:
# https://surveyweb-[random].vercel.app
# OR check Vercel dashboard for exact URL
```

---

## Step 5: Test Everything

```bash
# Test backend health
curl https://survey-api.onrender.com/api/health

# Open frontend in browser
# https://surveyweb-[random].vercel.app

# Fill form → Answer questions → Submit → Check MongoDB
# Go to https://cloud.mongodb.com to verify data saved
```

---

## 📋 URLs After Deployment

```
Frontend: https://surveyweb-xxxxx.vercel.app
Backend:  https://survey-api.onrender.com
API:      https://survey-api.onrender.com/api/health
Database: https://cloud.mongodb.com (login to view)
```

---

## 🔧 Useful Commands

### Backend (Render)

```bash
# View logs
# Go to: https://dashboard.render.com → Your Service → Logs

# View environment variables
# Go to: https://dashboard.render.com → Your Service → Environment

# Update variable
# Edit in dashboard → Save & redeploy

# View deploy status
# https://dashboard.render.com → Deployments tab

# Open app
# Click URL in dashboard
```

### Frontend (Vercel)

```bash
# Redeploy (after code changes)
git push origin main
# Auto-redeploys on Vercel

# View deployments
# Go to: https://vercel.com → Project → Deployments
```

### Database (MongoDB Atlas)

```bash
# View data
# https://cloud.mongodb.com
# → Clusters → Browse Collections
# → survey_db → users or surveyresponses

# Check backup
# → Backup → Restore (if needed)
```

---

## 🆘 Troubleshooting

### Backend shows "Cannot connect to MongoDB"

```bash
# Check MongoDB URI format
# Should be: mongodb+srv://USER:PASSWORD@cluster.mongodb.net/dbname

# Check special characters in password are escaped
# Example: if password is "my@pass", use "my%40pass"

# Check IP allowlist includes 0.0.0.0/0
# MongoDB Atlas → Network Access

# View backend logs
# Go to: https://dashboard.render.com → Your Service → Logs
```

### Frontend shows blank page

```bash
# Check browser console (F12)
# Look for error messages

# Verify API URL in frontend/src/utils/api.js

# Check backend is running
curl https://your-survey-api.herokuapp.com/api/health

# Redeploy frontend
git push origin main
```

### CORS Error

```bash
# Update backend/.env
CORS_ORIGIN=https://surveyweb-xxxxx.vercel.app

# Redeploy backend
git push heroku main
```

### Data not saving

```bash
# Check MongoDB connection
# View Render logs: https://dashboard.render.com

# Test API with curl
curl -X POST https://survey-api.onrender.com/api/survey/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "age": 25,
    "institution": "university",
    "institutionName": "Test Uni",
    "gmail": "test@example.com"
  }'

# Check MongoDB for data
# https://cloud.mongodb.com
```

---

## 📊 Monitoring

```bash
# Check backend uptime
curl -I https://survey-api.onrender.com

# Check frontend loading time
# Open in browser, check Network tab (F12)

# Monitor MongoDB usage
# https://cloud.mongodb.com → Metrics → Storage
# Free tier limit: 512 MB

# Check error rate
# Render dashboard → Logs tab
```

---

## 💰 Costs

| Service | Cost |
|---------|------|
| MongoDB | $0 (512 MB free) |
| Render | $0 (free tier) |
| Vercel | $0 (free) |
| **Total** | **$0 - Completely Free!** |

---

## 🎯 Complete Timeline

| Step | Time | What to Do |
|------|------|-----------|
| 1 | 0:00 | Create MongoDB Atlas account |
| 2 | 1:00 | Create cluster & get connection string |
| 3 | 2:00 | Create Heroku account |
| 4 | 2:30 | Deploy backend with Heroku CLI |
| 5 | 3:30 | Update frontend API URL |
| 6 | 4:00 | Create Vercel account & deploy frontend |
| 7 | 5:00 | Test everything! ✅ |

---

## 📱 Share Your Survey!

Once deployed, you can:

```
Share this URL:
https://surveyweb-xxxxx.vercel.app

Anyone can:
- Fill out the form
- Take the survey
- See results
- Data goes to your MongoDB Atlas
```

---

## 🚨 Before Sharing Publicly

- [ ] Test full flow yourself
- [ ] Verify all data saves to MongoDB
- [ ] Check results page displays correctly
- [ ] Test on mobile phone
- [ ] Share Frontend URL only (not backend)

---

## Need Help?

| Issue | Where to Check |
|-------|----------------|
| Backend logs | Render Dashboard → Logs |
| Frontend logs | Browser F12 → Console |
| Database status | https://cloud.mongodb.com |
| API test | `curl https://survey-api.onrender.com/api/health` |

---

## 🎉 Success!

Your survey platform is now:
- ✅ Running on the cloud
- ✅ Accessible globally
- ✅ Saving data to MongoDB
- ✅ Ready to share!

**Congratulations! 🚀**
