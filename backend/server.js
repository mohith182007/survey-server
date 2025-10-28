const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

// CORS Configuration for production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Debug: Log environment variables
console.log('📝 NODE_ENV:', process.env.NODE_ENV);
console.log('📝 PORT:', process.env.PORT);
console.log('📝 DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
if (process.env.DATABASE_URL) {
  const dbStart = process.env.DATABASE_URL.substring(0, 30);
  console.log('📝 DATABASE_URL starts with:', dbStart + '...');
}
const isPostgres = process.env.DATABASE_URL?.includes('postgresql');
const dbType = isPostgres ? 'PostgreSQL' : 'SQLite';
console.log(`📝 Connecting to ${dbType} via Prisma...`);

// Prisma connection test
async function testPrismaConnection() {
  try {
    // Use a query that works with both SQLite and PostgreSQL
    await prisma.user.count();
    console.log(`✅ ${dbType} connected successfully via Prisma`);
  } catch (err) {
    console.error(`❌ ${dbType} connection error:`, err.message);
    console.error('⚠️  Database connection failed. Make sure DATABASE_URL is set correctly.');
  }
}

// Test connection on startup
testPrismaConnection();

// Make Prisma available globally in the app
app.locals.prisma = prisma;

// Routes
const surveyRoutes = require('./routes/survey');
app.use('/api/survey', surveyRoutes);

// Health check endpoint
let dbStatus = 'connecting';
app.get('/api/health', async (req, res) => {
  try {
    await prisma.user.count();
    dbStatus = 'connected';
  } catch (err) {
    dbStatus = 'disconnected';
  }
  
  res.json({ 
    status: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus,
    databaseType: dbType,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Survey Platform API',
    version: '1.0.0',
    database: 'PostgreSQL',
    endpoints: {
      health: '/api/health',
      user: '/api/survey/user',
      submit: '/api/survey/submit',
      response: '/api/survey/response/:id'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Database: ${isPostgres ? 'PostgreSQL' : 'SQLite'} via Prisma`);
});
