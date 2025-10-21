# Personality Assessment Survey Platform

A full-stack web application for conducting personality assessments with data collection and storage. The application collects user information, presents personality assessment questions, and displays detailed results with explanations.

## Project Structure

```
surveyweb/
├── backend/               # Node.js/Express API server
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment variables template
├── frontend/             # React frontend application
│   ├── public/           # Static files
│   ├── src/
│   │   ├── pages/        # Page components (Info, Questions, Results)
│   │   ├── utils/        # Utilities (API calls, personality calculator)
│   │   ├── App.js        # Main App component
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
└── README.md             # This file
```

## Features

### User Information Collection
- Name, age, institution type, institution name, and email collection
- Form validation with error handling
- Smooth transition to assessment questions

### Personality Assessment
- 10 comprehensive personality questions
- 5-point Likert scale responses
- Real-time progress tracking
- Previous/Next navigation

### Results & Classification
- Personality type determination (16 MBTI types)
- Detailed personality descriptions
- Key traits, strengths, and areas for development
- Career path suggestions
- Visual score breakdown showing personality dimensions
- Print-friendly results

### Database & Backend
- MongoDB for data persistence
- Express.js RESTful API
- CORS enabled for frontend communication
- Input validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Edit `.env` with your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/survey_db
PORT=5000
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Fill in personal information (name, age, institution, email)
3. Click "Continue to Assessment"
4. Answer the 10 personality questions using the 5-point scale
5. Click "Submit Assessment" to complete
6. View your personality classification and detailed results
7. Print or start a new assessment

## API Endpoints

### User Management
- `POST /api/survey/user` - Create new user with basic info
- `GET /api/survey/user/:userId` - Fetch user information

### Survey Responses
- `POST /api/survey/submit` - Submit survey answers and classification
- `GET /api/survey/response/:responseId` - Fetch specific survey response
- `GET /api/survey/responses` - Fetch all survey responses (for analysis)

### Health Check
- `GET /api/health` - Server status check

## Personality Types

The assessment identifies 16 personality types based on four dimensions:

1. **Introversion (I) vs Extraversion (E)**
2. **Sensing (S) vs Intuition (N)**
3. **Thinking (T) vs Feeling (F)**
4. **Judging (J) vs Perceiving (P)**

Each type includes:
- Type code (e.g., ISTJ, ENFP)
- Name and description
- Key traits
- Strengths
- Areas for development
- Suitable career paths

## Database Schema

### User Collection
```javascript
{
  name: String,
  age: Number,
  institution: String (school/university),
  institutionName: String,
  gmail: String,
  createdAt: Date
}
```

### SurveyResponse Collection
```javascript
{
  userId: ObjectId (ref: User),
  answers: Map<String, String>,
  classification: String (e.g., "ISTJ"),
  score: Object {
    E: Number, I: Number,
    S: Number, N: Number,
    T: Number, F: Number,
    J: Number, P: Number
  },
  completedAt: Date
}
```

## Data Collection

All user responses are securely stored in MongoDB for analysis. The data includes:
- Personal information (name, email, education)
- Assessment responses (answers to each question)
- Personality classification
- Personality dimension scores

## Customization

### Modifying Questions
Edit the `QUESTIONS` array in `frontend/src/pages/QuestionPage.js`

### Adding New Personality Types
Update `PERSONALITY_TYPES` in `frontend/src/utils/personalityCalculator.js`

### Styling
Modify CSS files in:
- `frontend/src/App.css` - Global styles
- `frontend/src/pages/*.css` - Page-specific styles

## Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check that port 5000 is available
- Verify `.env` file has correct MongoDB URI

### Frontend shows connection errors
- Ensure backend is running on port 5000
- Check browser console for specific error messages
- Verify CORS is enabled in backend

### Database connection fails
- Check MongoDB is installed and running locally
- If using MongoDB Atlas, verify connection string in `.env`
- Ensure network access is allowed in MongoDB Atlas settings

## Development

### Run both servers simultaneously
Terminal 1:
```bash
cd backend && npm run dev
```

Terminal 2:
```bash
cd frontend && npm start
```

### Monitor API calls
Open browser DevTools → Network tab to see all API requests

## Future Enhancements

- User authentication and login
- Assessment history tracking
- Export results to PDF
- Comparative analysis dashboard
- Admin panel for data visualization
- Email results to users
- Multiple language support

## License

This project is provided as-is for educational and research purposes.

## Support

For issues or questions, please check:
1. Console errors in browser DevTools
2. Backend server logs
3. MongoDB connection status
