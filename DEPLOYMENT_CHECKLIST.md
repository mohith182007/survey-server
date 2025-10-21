# Deployment Checklist ✅

## Before Deployment

### Backend Preparation
- [ ] Test backend locally: `npm start`
- [ ] Test API endpoints with Postman or curl
- [ ] Ensure `.env` is not in git (check `.gitignore`)
- [ ] Update `.env.example` with all required variables
- [ ] All dependencies in `package.json` installed

### Frontend Preparation
- [ ] Update API base URL in `src/utils/api.js` to your backend URL
- [ ] Test frontend locally: `npm start`
- [ ] Build locally: `npm run build` (ensure no errors)
- [ ] Test all pages (Info, Questions, Results)

### Database Preparation
- [ ] Create MongoDB Atlas account
- [ ] Create cluster (Free M0 tier)
- [ ] Create database user with password
- [ ] Get connection string
- [ ] Test connection string in `.env` locally
- [ ] Enable network access (0.0.0.0/0 for development)

---

## Database Deployment (MongoDB Atlas)

### Setup Steps
- [ ] Sign up at https://www.mongodb.com/cloud/atlas
- [ ] Create Free cluster (M0)
- [ ] Create database user:
  - Username: `surveyadmin`
  - Password: Strong password (save it!)
  - Role: `Atlas Admin`
- [ ] Configure network access: Allow 0.0.0.0/0
- [ ] Get connection string
- [ ] Copy your password into connection string

### Test Connection
```bash
cd backend
# Update .env with MongoDB URI
npm install
npm start
# Check console for: ✅ MongoDB connected successfully
```

---

## Backend Deployment (Choose ONE)

### Option 1: Heroku

- [ ] Install Heroku CLI
- [ ] Create Heroku account: https://heroku.com
- [ ] Login: `heroku login`
- [ ] Create app: `heroku create your-app-name`
- [ ] Set environment variables:
  ```bash
  heroku config:set MONGODB_URI="your-connection-string"
  heroku config:set NODE_ENV=production
  ```
- [ ] Deploy: `git push heroku main`
- [ ] Check logs: `heroku logs --tail`
- [ ] **Backend URL**: `https://your-app-name.herokuapp.com`

### Option 2: Railway.app

- [ ] Sign up at https://railway.app (GitHub)
- [ ] Install Railway CLI: `npm install -g @railway/cli`
- [ ] Navigate to backend: `cd backend`
- [ ] Login: `railway login`
- [ ] Initialize: `railway init`
- [ ] Add environment variables in dashboard
- [ ] Deploy: `railway up`
- [ ] **Backend URL**: Check Railway dashboard

### Option 3: Render.com

- [ ] Sign up at https://render.com (GitHub)
- [ ] Create Web Service
- [ ] Connect GitHub repo
- [ ] Configure:
  - Build command: `npm install`
  - Start command: `npm start`
- [ ] Add environment variables
- [ ] Deploy
- [ ] **Backend URL**: Check Render dashboard

### Test Backend Deployment
```bash
# After deployment, test with:
curl https://your-backend-url.herokuapp.com/api/health

# Should return:
# {
#   "status": "Server is running",
#   "environment": "production",
#   "mongodb": "connected",
#   "timestamp": "2025-10-21T..."
# }
```

---

## Frontend Deployment (Choose ONE)

### Option 1: Vercel

- [ ] Sign up at https://vercel.com (GitHub)
- [ ] Click "New Project"
- [ ] Import GitHub repo
- [ ] Configure:
  - Framework: React
  - Build Command: `npm run build`
  - Output: `build`
- [ ] Add environment (optional):
  - `REACT_APP_API_URL=https://your-backend-url`
- [ ] Deploy
- [ ] **Frontend URL**: `https://your-project-name.vercel.app`

### Option 2: Netlify

- [ ] Sign up at https://netlify.com (GitHub)
- [ ] Click "New site from Git"
- [ ] Choose repo
- [ ] Configure:
  - Build command: `npm run build`
  - Publish directory: `build`
- [ ] Add environment (optional)
- [ ] Deploy
- [ ] **Frontend URL**: `https://your-site-name.netlify.app`

### Test Frontend Deployment
- [ ] Open your frontend URL
- [ ] Fill in user information
- [ ] Answer questions
- [ ] Submit survey
- [ ] Check if results display
- [ ] Verify data in MongoDB Atlas

---

## Post-Deployment Testing

### Full End-to-End Flow
1. [ ] Open frontend URL in browser
2. [ ] Enter user information:
   - Name: Test User
   - Age: 25
   - Institution: University
   - Institution Name: Test University
   - Email: test@example.com
3. [ ] Continue to questions
4. [ ] Answer all 15 questions
5. [ ] Submit survey
6. [ ] Verify results page displays correctly
7. [ ] Check MongoDB Atlas:
   - Go to Collections
   - Verify `users` collection has your data
   - Verify `surveyresponses` has your response

### API Testing
```bash
# Test user creation
curl -X POST https://your-backend-url/api/survey/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "age": 25,
    "institution": "university",
    "institutionName": "Test University",
    "gmail": "test@example.com"
  }'

# Expected response: { "success": true, "userId": "..." }
```

---

## Update Frontend After Backend Deployment

### Update API URL
Edit: `/frontend/src/utils/api.js`

```javascript
// Change from:
const API_BASE_URL = 'http://localhost:5000/api';

// To:
const API_BASE_URL = 'https://your-backend-url.herokuapp.com/api';
```

### Redeploy Frontend
```bash
cd frontend
git add .
git commit -m "Update backend URL"
git push origin main
# Vercel/Netlify auto-redeploys
```

---

## Troubleshooting

### Backend Won't Connect to Database
- [ ] Check MongoDB URI is correct in `.env`
- [ ] Verify password doesn't have special characters (or URL-encoded)
- [ ] Check IP allowlist includes 0.0.0.0/0
- [ ] View backend logs for error messages

### Frontend Shows Blank Page
- [ ] Open browser console (F12)
- [ ] Check for error messages
- [ ] Verify backend URL in `api.js`
- [ ] Check backend is running and responds to `/api/health`

### CORS Errors in Console
- [ ] Verify backend has CORS enabled
- [ ] Update `CORS_ORIGIN` in backend `.env`
- [ ] Ensure frontend URL is in CORS allowed origins

### Data Not Saving
- [ ] Check backend logs
- [ ] Verify MongoDB connection
- [ ] Test POST endpoints with curl
- [ ] Check MongoDB Atlas for errors

---

## Final URLs After Deployment

| Component | URL |
|-----------|-----|
| Frontend | `https://your-project-name.vercel.app` |
| Backend | `https://your-app-name.herokuapp.com` |
| API Health | `https://your-app-name.herokuapp.com/api/health` |
| MongoDB | Dashboard at `https://cloud.mongodb.com` |

---

## Share Your Live Site! 🚀

Once deployed, you can share:
- **Frontend URL** with users
- They can access the survey globally
- Data saves to your MongoDB
- No backend server running locally needed

---

## Monitoring & Maintenance

### Check Backend Status
```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# Render
# View in dashboard
```

### Update Code
```bash
# Make changes
git add .
git commit -m "fix: update feature"

# Push to deploy
git push origin main
# (Auto-deploys on most platforms)
```

### Monitor Database
- Go to https://cloud.mongodb.com
- Click on your cluster
- View Collections → View data
- Check storage usage (Free tier: 512MB limit)

---

## Cost Estimate (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| MongoDB Atlas | $0-15 | Free tier: 512MB, 3 nodes |
| Heroku | $7+ | Free tier sleeps; $7 = always-on |
| Railway | $0-20 | $5 free credit, then pay-as-you-go |
| Render | $0-10 | Free tier sleeps; $6 for always-on |
| Vercel | $0 | Free tier unlimited |
| Netlify | $0 | Free tier, 100GB bandwidth |
| **Total** | **$7-50** | Varies based on choices |

---

## Success Checklist ✅

- [ ] ✅ MongoDB Atlas database created and connected
- [ ] ✅ Backend deployed and responding to requests
- [ ] ✅ Frontend deployed and loading
- [ ] ✅ Full survey flow working (Info → Questions → Results)
- [ ] ✅ Data saving to MongoDB Atlas
- [ ] ✅ Accessible globally from any device
- [ ] ✅ Shared URLs with others

**You're done! Your survey platform is live! 🎉**
