# Personality Assessment Survey Platform - Project Instructions

## Project Overview
Full-stack web application for personality assessment surveys with data collection and MongoDB storage.

## Technology Stack
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Frontend**: React, React Router, Axios
- **Database**: MongoDB (local or Atlas)

## Project Structure
- `/backend` - Express API server with MongoDB models and routes
- `/frontend` - React application with multi-page survey flow
- Both are independent and communicate via REST API

## Key Features
1. User information collection form (Name, Age, Institution, Email)
2. 10-question personality assessment with 5-point Likert scale
3. MBTI-style personality classification (16 types)
4. Detailed results page with traits, strengths, career paths
5. MongoDB data persistence for analytics

## Setup Instructions

### Prerequisites
- Node.js v14+
- npm
- MongoDB

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with MongoDB URI
npm start  # runs on port 5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start  # runs on port 3000
```

## Key Files
- **Backend**:
  - `server.js` - Express app setup
  - `models/User.js` - User schema
  - `models/SurveyResponse.js` - Survey response schema
  - `routes/survey.js` - API endpoints

- **Frontend**:
  - `App.js` - Main router and state management
  - `pages/InfoPage.js` - User information collection
  - `pages/QuestionPage.js` - Assessment questions
  - `pages/ResultsPage.js` - Results display
  - `utils/personalityCalculator.js` - Type classification logic
  - `utils/api.js` - API calls

## API Endpoints
- `POST /api/survey/user` - Create user
- `GET /api/survey/user/:userId` - Get user data
- `POST /api/survey/submit` - Submit survey response
- `GET /api/survey/response/:responseId` - Get specific response
- `GET /api/survey/responses` - Get all responses

## Database Collections
- **users** - Stores user information
- **surveyresponses** - Stores assessment responses and classifications

## Customization Points
- Questions: Edit `frontend/src/pages/QuestionPage.js` - QUESTIONS array
- Personality types: Edit `frontend/src/utils/personalityCalculator.js` - PERSONALITY_TYPES
- Styling: Modify `.css` files in respective directories

## Data Flow
1. User fills info form → API creates User document
2. User answers questions → Responses collected
3. Results calculated using personality algorithm
4. Survey response saved with classification
5. Results displayed with detailed information

## Troubleshooting
- **MongoDB errors**: Ensure MongoDB running and URI correct in `.env`
- **API connection errors**: Check backend running on port 5000 and CORS enabled
- **Frontend won't start**: Clear `node_modules` and `npm install` again
- **Port conflicts**: Change PORT in `.env` or update frontend proxy settings

## Environment Variables (backend/.env)
```
MONGODB_URI=mongodb://localhost:27017/survey_db
PORT=5000
NODE_ENV=development
```

## Future Enhancements
- User authentication
- Assessment history
- PDF export
- Admin dashboard
- Email notifications
- Multi-language support
