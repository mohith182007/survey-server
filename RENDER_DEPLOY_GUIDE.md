# 🚀 Deploy Backend to Render - Complete Guide

## Why Render?

✅ **Completely Free** - No payment required, no hidden costs  
✅ **Easy Setup** - Web dashboard, no CLI needed  
✅ **Auto Deploy** - Push to GitHub → Automatic deployment  
✅ **Reliable** - 99.9% uptime guarantee  
✅ **Perfect for Surveys** - Plenty of resources for small projects  

---

## Prerequisites

- ✅ MongoDB connection string ready (you have it!)
- ✅ GitHub repo with your code pushed
- ✅ GitHub account

---

## Step-by-Step Deployment

### Step 1: Go to Render Dashboard

```
1. Open: https://render.com
2. Click "Get Started" or "Sign Up"
3. Sign in with GitHub
4. Authorize Render to access your repositories
```

### Step 2: Create New Web Service

```
1. Dashboard → Click "New +"
2. Select "Web Service"
3. Choose the repository: survery/surveyweb
4. Click "Connect"
```

### Step 3: Configure Your Service

Fill in these details:

```
╔════════════════════════════════════════╗
║  BASIC SETTINGS                        ║
├────────────────────────────────────────┤
║ Name:              survey-api          ║
║ Environment:       Node                ║
║ Build Command:     cd backend && npm   ║
║                    install             ║
║ Start Command:     cd backend && npm   ║
║                    start               ║
║ Instance Type:     Free                ║
║ Root Directory:    (leave blank)       ║
╚════════════════════════════════════════╝
```

### Step 4: Add Environment Variables

**IMPORTANT**: Do this before clicking "Create Web Service"!

```
1. Scroll down to "Environment Variables"
2. Click "Add Environment Variable"
3. Add these three variables:

Name:   MONGODB_URI
Value:  mongodb+srv://surveyadmin:Y2RAL4ZcEgpnGALC@cluster0.fvi0ukr.mongodb.net/survey_db?retryWrites=true&w=majority&appName=Cluster0

Name:   NODE_ENV
Value:  production

Name:   PORT
Value:  5000
```

### Step 5: Deploy!

```
1. Click "Create Web Service"
2. Render starts building your app
3. Watch the logs (should take 2-5 minutes)
4. When done, you'll see a green checkmark ✅
5. Your URL appears at the top
```

### Step 6: Get Your Backend URL

Once deployed, Render gives you a URL like:

```
https://survey-api.onrender.com
```

**Copy this URL - you'll need it for the frontend!**

---

## Verify Deployment

### Test the Backend is Running

```bash
# Test health check
curl https://survey-api.onrender.com/api/health

# Expected response:
# {"status":"Connected","environment":"production",...}
```

### Test Database Connection

```bash
# Create a test user
curl -X POST https://survey-api.onrender.com/api/survey/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "age": 25,
    "institution": "university",
    "institutionName": "Test University",
    "gmail": "test@example.com"
  }'

# Expected response:
# {"_id":"...","name":"Test User",...}
```

---

## View Logs

Render logs are essential for debugging:

```
1. Go to: https://render.com/dashboard
2. Click on your "survey-api" service
3. Go to "Logs" tab
4. Watch real-time logs as people use your survey
```

### Common Log Messages

```
✅ Good:
📍 Server running on port 5000
✅ MongoDB connected successfully

❌ Bad:
MongoNetworkError: getaddrinfo ENOTFOUND...
(MongoDB connection failed)

💡 Solution: Check MONGODB_URI in environment variables
```

---

## Update Frontend with Backend URL

Now that your backend is live:

### Step 1: Update API URL

Edit: `frontend/src/utils/api.js`

```javascript
// Change from:
const API_BASE_URL = 'http://localhost:5000/api';

// To:
const API_BASE_URL = 'https://survey-api.onrender.com/api';
```

### Step 2: Commit and Push

```bash
git add frontend/src/utils/api.js
git commit -m "Update backend URL to production Render"
git push origin main
```

This triggers Vercel to redeploy automatically! ✨

---

## Monitor Your Deployment

### Check Status

```
Dashboard → survey-api service → Status tab
```

Shows:
- ✅ Service is running
- Build history
- Deploy status

### Check Metrics

```
Dashboard → survey-api service → Metrics tab
```

Monitor:
- CPU usage
- Memory usage
- Request count

### View Environment

```
Dashboard → survey-api service → Environment tab
```

See all your variables (passwords hidden):
- MONGODB_URI ●●●●●●●●
- NODE_ENV: production
- PORT: 5000

---

## Troubleshooting

### Issue: "Service Crashed" or "Failed"

**Check logs first:**
```
1. Dashboard → survey-api
2. Click "Logs"
3. Scroll to find error message
```

**Common causes:**
- ❌ Wrong MONGODB_URI
- ❌ Missing environment variables
- ❌ Port number conflict
- ❌ Node.js version mismatch

**Solution:**
1. Fix the issue
2. Push to GitHub
3. Render auto-redeploys

---

### Issue: "Cannot connect to MongoDB"

**Check in logs:**
```
MongoNetworkError or MongoAuthenticationError
```

**Fix:**
1. Verify MongoDB URI is correct
2. Copy again from: https://cloud.mongodb.com/v2/...
3. Check password doesn't have special characters that need escaping
4. Update environment variable in Render dashboard
5. Redeploy: Click "Manual Deploy" button

---

### Issue: Frontend shows blank page / errors

**In browser console (F12):**

```javascript
// Check what API URL is being used
console.log(API_BASE_URL)  // Should be https://survey-api.onrender.com/api

// Test API call
fetch('https://survey-api.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
```

**Fix:**
1. Verify API URL in `frontend/src/utils/api.js`
2. Commit and push
3. Wait for Vercel to redeploy (2-3 minutes)

---

## Redeploy Your Backend

### Manual Redeploy

```
1. Dashboard → survey-api service
2. Click "Manual Deploy"
3. Select latest commit
4. Click "Deploy"
5. Wait for build & deployment
```

### Auto Redeploy on Push

```
When you push to GitHub main branch:
git push origin main

→ GitHub notifies Render
→ Render automatically redeploys
→ Takes 2-5 minutes
→ You'll see status update in dashboard
```

---

## Update Backend Code

When you make changes to the backend:

```bash
# 1. Make changes
# 2. Test locally:
npm start  # in backend folder

# 3. Commit and push
git add .
git commit -m "Your changes description"
git push origin main

# 4. Render auto-deploys!
# 5. Watch dashboard → Logs for deployment status
```

---

## Cost Breakdown

| Item | Cost |
|------|------|
| Backend hosting | $0 (free tier) |
| MongoDB database | $0 (512 MB free) |
| Frontend hosting | $0 (Vercel free) |
| **Total Monthly** | **$0** |

Render free tier includes:
- ✅ Unlimited deployments
- ✅ Shared CPU
- ✅ 512 MB RAM
- ✅ Up to 100GB bandwidth/month
- ✅ Perfect for surveys

---

## Scale Up Later (Optional)

When you have thousands of users:

```
1. Render Dashboard → survey-api → Settings
2. Change "Instance Type" from "Free" → "Starter" ($12/month)
3. Get dedicated resources
4. Better performance
5. No downtime during upgrade
```

---

## Security Notes

✅ Your MongoDB password is safe:
- Stored in Render environment variables (encrypted)
- Not in your code
- Not visible in GitHub
- Only visible to you in Render dashboard

✅ HTTPS encryption:
- All traffic encrypted
- Render provides free SSL/TLS

✅ IP allowlist:
- MongoDB allows access from anywhere (0.0.0.0/0)
- Fine for surveys, OK for free tier
- Upgrade to specific IPs for production

---

## What's Next?

1. ✅ Backend deployed to Render
2. ✅ Updated frontend with backend URL
3. ✅ Frontend deploying to Vercel
4. ⏭️ **Step 5**: Test everything works!

### Test Flow

```
1. Open: https://surveyweb-xxxxx.vercel.app
2. Fill out info form
3. Answer all 15 questions
4. Submit
5. See results
6. Check MongoDB for saved data:
   https://cloud.mongodb.com/v2/...
```

---

## Helpful URLs

```
Render Dashboard:  https://render.com/dashboard
MongoDB Data:      https://cloud.mongodb.com
Render Logs:       https://render.com/dashboard → survey-api → Logs
Render Settings:   https://render.com/dashboard → survey-api → Settings
Render Status:     https://status.render.com
```

---

## Support

If something breaks:

1. **Check Render logs** first
2. **Google the error message**
3. **Check MongoDB connection**
4. **Try manual redeploy**
5. **Check Stack Overflow**

---

**🎉 Your backend is now live on the internet!**

Next: Deploy frontend to Vercel and test the complete flow!
