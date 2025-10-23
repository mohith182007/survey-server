# 🗄️ Getting Started - PostgreSQL Setup on Render

**This guide walks you through creating your first PostgreSQL database on Render.**

---

## Step 1: Access Render Dashboard

1. Go to **https://dashboard.render.com**
2. If you don't have a Render account, click **"Sign Up"**
3. You can sign up with:
   - Email
   - GitHub account (recommended - you already have one!)
4. Complete the sign-up process

---

## Step 2: Create a New PostgreSQL Database

### Navigate to Create Database

1. In Render Dashboard, click **"New +"** button (top right)
2. From the dropdown, select **"PostgreSQL"**

```
Dashboard → New + → PostgreSQL
```

### Fill in the Database Details

You'll see a form with these fields:

**Name:** `survey_db`
- This is the display name in Render dashboard
- Can be anything you want

**Database:** `survey_db`
- This is the actual database name
- Leave as default or keep it the same as Name

**User:** (Leave as default)
- Render auto-generates this
- Usually something like `survey_admin`

**Password:** (Leave as default)
- Render auto-generates a secure password
- You'll see it after creation

**Region:** Choose your closest region
- For US: `Ohio` or `Virginia` (fastest)
- For Asia: `Singapore` or `Tokyo`
- For Europe: `Frankfurt`

**Plan:** Select **"Free"** (bottom option)
- Free tier: 90 days validity, then needs refresh
- Perfect for testing and development

### Screenshot Guide

```
┌─────────────────────────────────────────┐
│ Create a New Service                    │
├─────────────────────────────────────────┤
│                                         │
│ Name: [survey_db           ]            │
│ Database: [survey_db       ]            │
│ User: [postgres (auto)     ]            │
│ Password: [auto-generated  ]            │
│ Region: [Ohio ▼           ]            │
│ Plan: [Free ●              ]            │
│                                         │
│ [Create Database] button               │
└─────────────────────────────────────────┘
```

---

## Step 3: Create the Database

1. Click the **"Create Database"** button
2. Render will create the database (takes 30-60 seconds)
3. Status will change from "Provisioning" → "Available"

---

## Step 4: Get Your Connection Details

Once the database shows **"Available"**, you'll see several connection strings:

### Important URLs

**Internal Database URL** ← THIS IS THE ONE YOU NEED!
```
postgresql://survey_admin:PASSWORD@dpg-abc123def456.render.internal:5432/survey_db
```

**External Database URL** (for external connections)
```
postgresql://survey_admin:PASSWORD@dpg-abc123def456.onrender.com:5432/survey_db
```

**Connection String** (for psql command line)
```
PGPASSWORD=PASSWORD psql -h dpg-abc123def456.render.internal -U survey_admin -d survey_db
```

### 📋 Copy the Internal Database URL

This is what you need for your backend!

```
postgresql://survey_admin:PASSWORD@dpg-abc123def456.render.internal:5432/survey_db
```

**Where to find it:**
```
Render Dashboard
└── Databases
    └── survey_db (your database)
        └── Connections
            └── Internal Database URL ← Copy from here
```

---

## Step 5: Verify Your Database

### View in Dashboard

1. Go to Render Dashboard
2. Click on your database name (survey_db)
3. You'll see:
   - Status: Available ✅
   - Region: Your chosen region
   - Creation date
   - Connection details

---

## 🎯 What You Get

After creating the PostgreSQL database, you have:

- ✅ A PostgreSQL database running on Render
- ✅ A unique hostname (dpg-abc123def...)
- ✅ A username (survey_admin)
- ✅ A secure password (auto-generated)
- ✅ Connection strings (Internal & External)
- ✅ Free tier (90 days, renewable)

---

## 📝 Save This Information

**You'll need this for the next step:**

```
Internal Database URL:
postgresql://survey_admin:PASSWORD@dpg-abc123def456.render.internal:5432/survey_db

This becomes your DATABASE_URL environment variable!
```

---

## 🔍 Database Details Page - What You See

When you click on your database, you'll see:

```
┌────────────────────────────────────────────────┐
│ survey_db                                      │
├────────────────────────────────────────────────┤
│                                                │
│ Status: Available                    ✅        │
│ Region: Ohio                                  │
│ Created: Oct 23, 2025                        │
│ Memory: 90 MB (Free tier)                    │
│                                                │
│ ─────── Connections ────────                 │
│                                                │
│ Internal Database URL                        │
│ postgresql://survey_admin:...                │
│ [Copy button]                                │
│                                                │
│ External Database URL                        │
│ postgresql://survey_admin:...                │
│ [Copy button]                                │
│                                                │
│ ─────── Statistics ────────                  │
│ Connections: 0                               │
│ Queries: 0                                   │
│                                                │
└────────────────────────────────────────────────┘
```

---

## ✅ Checklist - PostgreSQL Account Creation

- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "PostgreSQL"
- [ ] Enter Name: `survey_db`
- [ ] Enter Database: `survey_db`
- [ ] Leave User and Password as default (auto-generated)
- [ ] Select your Region
- [ ] Select "Free" plan
- [ ] Click "Create Database"
- [ ] Wait for status to show "Available" ✅
- [ ] Click on database to see connection details
- [ ] Copy "Internal Database URL"
- [ ] Save the URL somewhere safe

---

## 🆘 Troubleshooting

### Q: The database is stuck on "Provisioning"
**A:** Wait 1-2 minutes. Render databases take a bit to provision.

### Q: I don't see the connection details
**A:** Click on the database name (survey_db) in your dashboard. The details page will show all connection strings.

### Q: What's the difference between Internal and External URLs?
**A:** 
- **Internal:** Use this! It's for services within Render (faster, more secure)
- **External:** For connecting from outside Render (slower, for dev only)

### Q: How long is the free tier valid?
**A:** 90 days. After that, you can refresh it or upgrade to a paid plan.

---

## 📞 Next Steps

Once you have your PostgreSQL database set up:

1. ✅ PostgreSQL account created
2. ⏳ Save the Internal Database URL
3. ⏳ Set up Backend Service on Render
4. ⏳ Set environment variables
5. ⏳ Deploy backend

**See:** `DEPLOY_NOW.md` for next steps

---

## Quick Start

### 1. Prerequisites (After PostgreSQL is created)
- **Node.js** v14 or higher
- **PostgreSQL** database on Render ✅
- **npm** or **yarn**

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create environment file
cp .env.example .env

# Edit .env with your PostgreSQL connection
# DATABASE_URL=postgresql://survey_admin:PASSWORD@dpg-abc.render.internal:5432/survey_db

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start the backend server
npm start
# Server will run on http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
# Browser will open at http://localhost:3000
```

## What You Get

### Step 1: Information Collection
- Users enter: Name, Age, School/University, Institution Name, Email
- Form validation ensures all fields are correct
- Data is saved to MongoDB

### Step 2: Personality Assessment
- 10 carefully designed questions
- 5-point scale responses (Strongly Disagree to Strongly Agree)
- Progress bar showing completion
- Navigate between questions

### Step 3: Results
- 16 different personality types (MBTI style)
- Each type includes:
  - Name and detailed description
  - Key personality traits
  - Strengths
  - Areas for growth
  - Career recommendations
- Visual score breakdown
- Print-friendly results

## Database Setup

### Using Local MongoDB

```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# Verify connection in backend/.env
MONGODB_URI=mongodb://localhost:27017/survey_db
```

### Using MongoDB Atlas (Cloud)

1. Create account: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update backend/.env:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/survey_db
```

## File Structure Explanation

```
surveyweb/
├── backend/
│   ├── models/
│   │   ├── User.js              # User data schema
│   │   └── SurveyResponse.js     # Survey responses schema
│   ├── routes/
│   │   └── survey.js            # API endpoints
│   ├── server.js                # Express server configuration
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment template
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML entry point
│   ├── src/
│   │   ├── pages/
│   │   │   ├── InfoPage.js      # Step 1: User info form
│   │   │   ├── QuestionPage.js  # Step 2: Assessment questions
│   │   │   └── ResultsPage.js   # Step 3: Results display
│   │   ├── utils/
│   │   │   ├── api.js           # API communication
│   │   │   └── personalityCalculator.js  # Type classification
│   │   ├── App.js               # Main app routing
│   │   └── index.js             # React entry point
│   └── package.json             # Frontend dependencies
│
└── README.md                    # Full documentation
```

## API Endpoints

### User Creation
```
POST /api/survey/user
Body: {
  name: "John Doe",
  age: 25,
  institution: "university",
  institutionName: "ABC University",
  gmail: "john@example.com"
}
Response: { success: true, userId: "..." }
```

### Survey Submission
```
POST /api/survey/submit
Body: {
  userId: "...",
  answers: { 0: "agree", 1: "strongly-agree", ... },
  classification: "INTJ",
  score: { E: 5, I: -3, ... }
}
Response: { success: true, responseId: "..." }
```

## Troubleshooting

### "Cannot connect to MongoDB"
- **Solution**: Ensure MongoDB is running
- Check connection string in `.env`
- Verify credentials if using MongoDB Atlas

### "Backend server won't start"
- **Check**: Port 5000 is available
- **Try**: Change PORT in `.env`
- **Verify**: Node.js is installed: `node --version`

### "Frontend shows blank page"
- **Check**: Backend is running on port 5000
- **Open**: Browser DevTools (F12) → Console for errors
- **Try**: Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### "CORS errors in console"
- **Cause**: Backend API communication issue
- **Check**: Backend is running
- **Verify**: API URL in `frontend/src/utils/api.js`

## Customization

### Change Assessment Questions
Edit `frontend/src/pages/QuestionPage.js`:
```javascript
const QUESTIONS = [
  { id: 1, text: "Your question here", category: "E" },
  // E, I, S, N, T, F, J, P are the personality categories
];
```

### Modify Personality Types
Edit `frontend/src/utils/personalityCalculator.js`:
```javascript
export const PERSONALITY_TYPES = {
  ISTJ: {
    name: "...",
    description: "...",
    // etc
  }
};
```

### Change Styling
- Global: `frontend/src/App.css`
- Pages: `frontend/src/pages/*.css`

## Running in Production

### Build Frontend
```bash
cd frontend
npm run build
# Creates optimized build in build/
```

### Deploy Backend
- Use services like Heroku, AWS, DigitalOcean
- Ensure MongoDB is accessible
- Set environment variables

## Viewing Collected Data

### MongoDB Query
```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/survey_db

# View all users
db.users.find()

# View all responses
db.surveyresponses.find()

# Find specific user's response
db.surveyresponses.findOne({ userId: ObjectId("...") })
```

## Next Steps

1. **Test the application**: Go through the complete flow
2. **Customize questions**: Modify the 10 assessment questions
3. **Adjust personality types**: Update descriptions and career paths
4. **Style it**: Update CSS to match your branding
5. **Deploy**: Host on production servers

## Support & Documentation

- Full README: See `README.md`
- Project instructions: See `.github/copilot-instructions.md`
- API documentation: See backend `routes/survey.js`

## Key Features Summary

✅ Multi-page form flow  
✅ Data validation  
✅ MongoDB persistence  
✅ RESTful API backend  
✅ Responsive design  
✅ 16 personality types  
✅ Detailed results  
✅ Print functionality  
✅ Progress tracking  
✅ Error handling
