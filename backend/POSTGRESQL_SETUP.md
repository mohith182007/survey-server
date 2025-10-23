# Survey Backend - PostgreSQL Setup Guide

## Local Development Setup

### Prerequisites
- Node.js v14+
- npm
- PostgreSQL (local installation or Docker)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup PostgreSQL Locally

#### Option A: Using Docker (Recommended)
```bash
docker run --name survey-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=survey_db \
  -p 5432:5432 \
  -d postgres:15
```

#### Option B: Local PostgreSQL Installation
```bash
# Create database
createdb survey_db

# Verify connection
psql survey_db
```

### Step 3: Configure Environment
Update `.env` with your PostgreSQL connection:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/survey_db"
NODE_ENV=development
PORT=5000
```

### Step 4: Run Prisma Migrations
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### Step 5: Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Production Deployment on Render

### Step 1: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click "New +"
3. Select "PostgreSQL"
4. Fill in details:
   - **Name**: `survey_db`
   - **Database**: `survey_db`
   - **User**: `postgres`
   - **Region**: Choose closest to you
   - **Plan**: Free tier
5. Click "Create Database"
6. Copy the **Internal Database URL**

### Step 2: Deploy Backend Service

1. Connect your GitHub repository to Render
2. Create new Web Service from your backend repository
3. Configure:
   - **Name**: `survey-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - **NODE_ENV**: `production`
   - **PORT**: `10000`
   - **DATABASE_URL**: Paste the Internal Database URL from Step 1
5. Click "Create Web Service"

The backend will automatically:
- Install dependencies
- Generate Prisma Client
- Run database migrations
- Start the server

### Step 3: Verify Deployment

Check health endpoint:
```bash
curl https://your-service-name.onrender.com/api/health
```

Should return:
```json
{
  "status": "Server is running",
  "database": "connected",
  "databaseType": "postgresql"
}
```

## API Endpoints

- `POST /api/survey/user` - Create new user
- `POST /api/survey/submit` - Submit survey response
- `GET /api/survey/user/:userId` - Get user data
- `GET /api/survey/response/:responseId` - Get survey response
- `GET /api/survey/responses` - Get all responses

## Troubleshooting

### PostgreSQL Connection Error
- Verify `DATABASE_URL` format is correct
- Check PostgreSQL is running
- Ensure database exists
- Test locally before deploying

### Prisma Migration Error
- Run `npx prisma migrate resolve` if migration is stuck
- Check `prisma/migrations` folder
- Ensure database user has proper permissions

### Render Deployment Issues
- Check Render logs: Dashboard → Service → Logs
- Verify DATABASE_URL env variable is set
- Ensure build command completes successfully

## Testing

### Create a User
```bash
curl -X POST http://localhost:5000/api/survey/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 25,
    "institution": "university",
    "institutionName": "MIT",
    "gmail": "john@example.com"
  }'
```

### Submit Survey Response
```bash
curl -X POST http://localhost:5000/api/survey/submit \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id-here",
    "answers": {"q1": "A", "q2": "B"},
    "classification": "Type A",
    "score": 45
  }'
```

## Database Schema

### User Table
- `id` - UUID primary key
- `name` - User's name
- `age` - User's age
- `institution` - "school" or "university"
- `institutionName` - Name of institution
- `gmail` - Email address (unique)
- `createdAt`, `updatedAt` - Timestamps

### SurveyResponse Table
- `id` - UUID primary key
- `userId` - Foreign key to User
- `answers` - JSON object with all question answers
- `classification` - Personality classification
- `score` - Total score
- `answerCounts`, `answerBreakdown` - Analysis data
- `createdAt`, `updatedAt` - Timestamps
