#!/bin/bash

# Pratyaksha News Production Setup Script

echo "==================================="
echo "Pratyaksha News - Production Setup"
echo "==================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 16+${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version: $(node --version)${NC}"

# Backend Setup
echo -e "\n${YELLOW}Setting up Backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example${NC}"
    cp .env.example .env
    echo -e "${RED}⚠ IMPORTANT: Update .env with production values!${NC}"
fi

echo "Installing backend dependencies..."
npm install

if [ ! -d "logs" ]; then
    mkdir logs
fi

if [ ! -d "uploads" ]; then
    mkdir uploads
fi

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Frontend Setup
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd ../frontend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example${NC}"
    cp .env.example .env
    echo -e "${RED}⚠ IMPORTANT: Update .env with production values!${NC}"
fi

echo "Installing frontend dependencies..."
npm install

echo "Building frontend..."
npm run build

echo -e "${GREEN}✓ Frontend setup complete${NC}"

# Summary
echo -e "\n${GREEN}==================================="
echo "Setup Complete!"
echo "===================================${NC}"
echo -e "\nNext steps:"
echo -e "1. Update ${YELLOW}backend/.env${NC} with production database credentials"
echo -e "2. Update ${YELLOW}frontend/.env${NC} with production API URL"
echo -e "3. Install PM2: ${YELLOW}npm install -g pm2${NC}"
echo -e "4. Start backend: ${YELLOW}cd backend && pm2 start server.js --name pratyaksha-api${NC}"
echo -e "5. Start frontend: ${YELLOW}cd frontend && pm2 serve dist 3000 --spa --name pratyaksha-frontend${NC}"
echo -e "6. Configure Nginx with ${YELLOW}nginx.conf.example${NC}"
echo -e "\nFor more details, see ${YELLOW}PRODUCTION_GUIDE.md${NC} and ${YELLOW}PRODUCTION_CHECKLIST.md${NC}"
