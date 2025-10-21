# Complete Guide: Deploy Database & Backend Globally

## Overview
We'll use:
- **Database**: MongoDB Atlas (Cloud MongoDB - Free Tier)
- **Backend**: Heroku, Railway, or Render (Free/Paid options)
- **Frontend**: Vercel or Netlify (Free)

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" (or Sign In if you have account)
3. Create account with email or Google
4. Verify email

### 1.2 Create a Database Cluster
1. Click **"Create a Deployment"**
2. Select **"MongoDB Atlas"** (default)
3. Choose **"FREE"** tier (M0)
4. Select region closest to you (e.g., India, US-East)
5. Click **"Create Cluster"** (wait 2-3 minutes)

### 1.3 Create Database User
1. In left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Enter:
   - **Username**: `surveyadmin` (or your choice)
   - **Password**: Create strong password (copy it!)
   - **Built-in Role**: `Atlas Admin`
4. Click **"Add User"**

### 1.4 Configure Network Access
1. In left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Select **"Allow access from anywhere"** (0.0.0.0/0)
   - ⚠️ For production, restrict to specific IPs
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go back to **"Clusters"** tab
2. Click **"Connect"** button on your cluster
3. Choose **"Drivers"**
4. Select **"Node.js"** and version **"4.1 or later"**
5. Copy the connection string:
   ```
   mongodb+srv://surveyadmin:<password>@cluster0.xxxxx.mongodb.net/survey_db?retryWrites=true&w=majority
   ```
6. **Replace `<password>` with your actual password**

---

## Step 2: Update Backend Environment Variables

### 2.1 Update .env file
```bash
# In /backend/.env

MONGODB_URI=mongodb+srv://surveyadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/survey_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
CORS_ORIGIN=*
```

### 2.2 Test Connection Locally
```bash
cd backend
npm start
```
Should show: `MongoDB connected` ✅

---

## Step 3: Deploy Backend to Cloud

### Option A: Deploy to Heroku (Recommended for beginners)

#### 3A.1 Install Heroku CLI
```bash
# Windows
choco install heroku-cli

# Mac
brew install heroku

# Linux
curl https://cli.heroku.com/install.sh | sh
```

#### 3A.2 Create Heroku Account
- Go to: https://www.heroku.com
- Sign up (free account)
- Verify email

#### 3A.3 Login & Deploy
```bash
# Navigate to backend folder
cd backend

# Login to Heroku
heroku login
# Opens browser - login there

# Create new Heroku app
heroku create your-app-name
# Note: app name must be unique globally
# Example: heroku create survey-api-2025

# Set environment variables
heroku config:set MONGODB_URI="mongodb+srv://surveyadmin:PASSWORD@cluster0.xxxxx.mongodb.net/survey_db?retryWrites=true&w=majority"
heroku config:set NODE_ENV=production

# Deploy code
git push heroku main
# If on master: git push heroku master

# Check logs
heroku logs --tail
```

#### 3A.4 Your Backend URL
```
https://your-app-name.herokuapp.com
```

---

### Option B: Deploy to Railway.app (Easier, Modern)

#### 3B.1 Create Railway Account
- Go to: https://railway.app
- Sign up with GitHub
- Authorize Railway

#### 3B.2 Deploy
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Choose: Create new project
# Link to GitHub repo if asked

# Set environment variables in Railway dashboard
# Add:
# MONGODB_URI=mongodb+srv://...
# NODE_ENV=production

# Deploy
railway up
```

#### 3B.3 Get URL
- Go to Railway dashboard
- Click your project
- Copy the deployed URL

---

### Option C: Deploy to Render.com (Very Easy)

#### 3C.1 Create Render Account
- Go to: https://render.com
- Sign up with GitHub
- Authorize

#### 3C.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repo
3. Fill details:
   - **Name**: `survey-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://...
   NODE_ENV=production
   PORT=5000
   ```
5. Click **"Create Web Service"**

#### 3C.3 Get URL
```
https://survey-api.onrender.com
```

---

## Step 4: Test Backend Deployment

```bash
# Test with curl
curl https://your-backend-url.herokuapp.com/api/health

# Should return: { "status": "Server is running" }
```

---

## Step 5: Update Frontend to Use Remote Backend

### 5.1 Update API URL
Edit: `/frontend/src/utils/api.js`

```javascript
// Before (local)
const API_BASE_URL = 'http://localhost:5000/api';

// After (production)
const API_BASE_URL = 'https://your-backend-url.herokuapp.com/api';
```

### 5.2 Deploy Frontend to Vercel

#### 5.2.1 Create Vercel Account
- Go to: https://vercel.com
- Sign up with GitHub
- Authorize

#### 5.2.2 Deploy
1. Click **"New Project"**
2. Import your GitHub repo
3. Configure:
   - **Framework**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add Environment (if needed):
   - `REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api`
5. Click **"Deploy"**

#### 5.2.3 Get Frontend URL
```
https://your-project-name.vercel.app
```

---

### Alternative: Deploy Frontend to Netlify

#### 5.2B.1 Create Netlify Account
- Go to: https://netlify.com
- Sign up with GitHub

#### 5.2B.2 Deploy
1. Click **"New site from Git"**
2. Choose GitHub repo
3. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
4. Add Environment:
   - `REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api`
5. Click **"Deploy site"**

---

## Step 6: Global Access URLs

After deployment:

| Service | URL |
|---------|-----|
| **Frontend** | `https://your-project-name.vercel.app` |
| **Backend** | `https://your-app-name.herokuapp.com` |
| **Database** | `mongodb+srv://surveyadmin@cluster0.xxxxx...` |
| **Health Check** | `https://your-app-name.herokuapp.com/api/health` |

---

## Step 7: Test Full Flow

1. Go to: `https://your-project-name.vercel.app`
2. Fill user info
3. Answer questions
4. Submit
5. Check MongoDB Atlas Dashboard:
   - Collections → `users` (should have your data)
   - Collections → `surveyresponses` (should have response)

---

## Troubleshooting

### Backend Won't Deploy (Heroku/Railway/Render)

**Error: Cannot find module**
```bash
# In backend folder
npm install
git add package-lock.json
git commit -m "update deps"
git push heroku main
```

**Error: MongoDB Connection Failed**
- Check MongoDB URI in environment variables
- Verify password is correct
- Check IP allowlist (should be 0.0.0.0/0)

### Frontend Shows Blank Page
- Open browser DevTools (F12)
- Check Console for errors
- Verify backend URL in `api.js`
- Check CORS is enabled in backend

### CORS Errors
Update backend `server.js`:
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

---

## Free Tier Limits

| Service | Free Limit |
|---------|-----------|
| **MongoDB Atlas** | 512 MB storage |
| **Heroku** | Sleeping after 30 min inactivity |
| **Railway** | $5/month free tier |
| **Render** | Sleeping after 15 min inactivity |
| **Vercel** | Unlimited builds |
| **Netlify** | 100 GB bandwidth/month |

---

## Cost Summary

**Free Option**: $0
- MongoDB Atlas (Free Tier)
- Heroku (free + Heroku Eco = $5/month or $7/month for always-on)
- Vercel (Free)

**Recommended**: $5-20/month
- MongoDB Atlas (Free or $15/month for better performance)
- Railway ($5-20/month)
- Vercel (Free)

---

## Step 8: Monitor & Maintain

### View Backend Logs
```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# Render
# View in dashboard
```

### Update Backend Code
```bash
# Make changes locally
git add .
git commit -m "your message"

# Deploy
git push heroku main  # For Heroku
# or
railway up  # For Railway
# or
git push origin main  # For Render (auto-deploys)
```

### Database Backups
1. Go to MongoDB Atlas
2. Click "Backup" in left sidebar
3. Enable automatic backups

---

## Quick Reference Commands

```bash
# Check backend status
curl https://your-backend-url/api/health

# View MongoDB data
# Go to: https://cloud.mongodb.com → Atlas → Clusters → Browse Collections

# View frontend logs (Vercel)
# Go to: vercel.com → Project → Deployments → Logs

# Restart backend (Heroku)
heroku restart

# View environment variables (Railway)
# Go to: railway.app → Project → Variables
```

---

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use strong passwords for MongoDB
3. ✅ Restrict MongoDB IP access (production)
4. ✅ Use HTTPS for all URLs
5. ✅ Set NODE_ENV=production
6. ✅ Add rate limiting to API
7. ✅ Validate all user inputs
8. ✅ Use environment variables for secrets

---

## Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Get MongoDB connection string
3. ✅ Deploy backend to Heroku/Railway/Render
4. ✅ Test backend endpoint
5. ✅ Update frontend API URL
6. ✅ Deploy frontend to Vercel/Netlify
7. ✅ Test full flow globally
8. ✅ Share your URLs!

Need help with any step? Let me know! 🚀
