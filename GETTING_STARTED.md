# Getting Started Guide

## Quick Start

### 1. Prerequisites
- **Node.js** v14 or higher
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB connection
# For local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/survey_db
#
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/survey_db

# Install dependencies
npm install

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
