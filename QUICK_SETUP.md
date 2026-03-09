# Quick Setup Guide - Job Application Tracker

## Prerequisites

You need ONE of these options:

### Option 1: Docker (Recommended - Easiest)
- Install Docker Desktop from https://www.docker.com/products/docker-desktop/
- That's it!

### Option 2: Manual Setup
- Node.js 18+ (https://nodejs.org/)
- PostgreSQL 14+ (https://www.postgresql.org/download/)

## Setup Steps

### Using Docker (Recommended)

1. **Copy environment files:**
```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

2. **Update server\.env** (Important!):
```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/job_tracker"
JWT_SECRET="change-this-to-a-long-random-string-min-32-characters"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
```

3. **Start everything with Docker:**
```bash
docker-compose up
```

This will:
- Start PostgreSQL database
- Start backend server on port 5000
- Start frontend on port 3000
- Run database migrations automatically

4. **Access the app:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432

### Manual Setup (Without Docker)

#### Step 1: Setup Database

1. Install and start PostgreSQL
2. Create database:
```sql
CREATE DATABASE job_tracker;
```

#### Step 2: Setup Backend

1. Navigate to server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Copy and edit environment file:
```bash
copy .env.example .env
```

Edit `server\.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/job_tracker"
JWT_SECRET="your-super-secret-key-change-this-to-something-random"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
```

4. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Build and start server:
```bash
npm run build
npm run dev
```

Server will run on http://localhost:5000

#### Step 3: Setup Frontend

1. Open NEW terminal and navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Copy and edit environment file:
```bash
copy .env.example .env
```

Edit `client\.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start frontend:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## Verify Installation

1. Open http://localhost:3000
2. Click "Sign up"
3. Create an account
4. You should see the dashboard!

## Common Issues

### "Port already in use"
```bash
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in server\.env
PORT=5001
```

### "Cannot connect to database"
- Make sure PostgreSQL is running
- Check DATABASE_URL in server\.env
- For Docker: Wait 10 seconds for database to start

### "Module not found"
```bash
# Delete node_modules and reinstall
cd server
rmdir /s /q node_modules
npm install

cd ..\client
rmdir /s /q node_modules
npm install
```

### Docker not starting
- Make sure Docker Desktop is running
- Restart Docker Desktop
- Run: `docker ps` to check status

## Next Steps

1. **Add your first application:**
   - Click "Add Application"
   - Fill in company and job title
   - Click "Add Application"

2. **Schedule an interview:**
   - Open an application
   - Add interview details
   - Set date and time

3. **Explore the dashboard:**
   - View statistics
   - See upcoming interviews
   - Track your progress

## Stopping the Application

### Docker:
```bash
# Press Ctrl+C in terminal
# Or
docker-compose down
```

### Manual:
- Press Ctrl+C in both terminal windows (backend and frontend)

## Restarting

### Docker:
```bash
docker-compose up
```

### Manual:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## Need More Help?

- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- See [GET_STARTED.md](GET_STARTED.md) for detailed guide
- See [SETUP.md](SETUP.md) for advanced setup

## Quick Commands Reference

```bash
# Docker
docker-compose up              # Start all services
docker-compose down            # Stop all services
docker-compose restart         # Restart services
docker logs job-tracker-server # View backend logs
docker logs job-tracker-client # View frontend logs

# Backend (Manual)
cd server
npm install                    # Install dependencies
npm run dev                    # Start development server
npm run build                  # Build for production
npx prisma studio             # Open database GUI
npx prisma migrate dev        # Run migrations

# Frontend (Manual)
cd client
npm install                    # Install dependencies
npm run dev                    # Start development server
npm run build                  # Build for production
```

---

**Ready to start? Run `docker-compose up` and visit http://localhost:3000!** 🚀
