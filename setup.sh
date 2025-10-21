#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Personality Assessment Survey Platform${NC}"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! command -v mongosh &> /dev/null; then
    echo "MongoDB client not found. Ensure MongoDB is installed and running."
    echo "For local MongoDB: mongod"
    echo "For MongoDB Atlas: update MONGODB_URI in backend/.env"
fi

# Setup backend
echo -e "${BLUE}Setting up backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env created. Please update with your MongoDB URI.${NC}"
fi

# Setup frontend
echo -e "${BLUE}Setting up frontend...${NC}"
cd ../frontend

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI"
echo "2. Run: cd backend && npm start"
echo "3. In another terminal, run: cd frontend && npm start"
echo ""
echo "Frontend will open at: http://localhost:3000"
echo "Backend runs at: http://localhost:5000"
