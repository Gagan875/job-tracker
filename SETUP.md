# Setup Instructions

## Quick Start with Docker (Recommended)

1. Copy environment files:
```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

2. Update `server\.env` with your settings (JWT_SECRET is important!)

3. Start all services:
```bash
docker-compose up
```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - Database: localhost:5432

## Manual Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Copy and configure environment:
```bash
copy .env.example .env
```

4. Update `.env` with your database credentials and JWT secret

5. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev
```

6. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:5000

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Copy and configure environment:
```bash
copy .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## Database Management

View database with Prisma Studio:
```bash
cd server
npx prisma studio
```

Reset database:
```bash
cd server
npx prisma migrate reset
```

## Production Build

### Backend
```bash
cd server
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
npm start
```

## Troubleshooting

### Port already in use
- Change PORT in server/.env
- Change port in client/.env.example (NEXT_PUBLIC_API_URL)

### Database connection issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in server/.env
- Verify database credentials

### Prisma issues
```bash
cd server
npx prisma generate
npx prisma migrate dev
```

## Features to Explore

1. Register a new account
2. Add job applications
3. Track application status
4. Schedule interviews
5. Add contacts and notes
6. View analytics dashboard

## Next Steps

- Configure email notifications (update SMTP settings in server/.env)
- Customize the UI theme
- Add more features as needed
- Deploy to production (Vercel for frontend, Railway/Render for backend)
