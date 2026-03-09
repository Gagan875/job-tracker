# Getting Started with Job Application Tracker 🚀

Welcome! This guide will help you get up and running quickly.

## What You'll Build

A complete job application tracking system with:
- User authentication
- Application management
- Interview scheduling
- Analytics dashboard
- Contact management

## Prerequisites

Choose one option:

### Option A: Docker (Easiest)
- Docker Desktop installed
- That's it!

### Option B: Manual Setup
- Node.js 18 or higher
- PostgreSQL 14 or higher
- Git

## Quick Start (5 minutes)

### Step 1: Get the Code

```bash
# Clone or download the project
cd job-tracker
```

### Step 2: Run Quick Start Script

**Windows:**
```bash
quick-start.bat
```

This will:
1. Copy environment files
2. Start all services with Docker
3. Set up the database
4. Launch the application

### Step 3: Access the Application

Open your browser:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Step 4: Create Your Account

1. Click "Sign up"
2. Enter your details
3. Start tracking applications!

## What's Next?

### Add Your First Application

1. Click "Add Application"
2. Fill in:
   - Company name (required)
   - Job title (required)
   - Location, salary, job URL (optional)
   - Notes (optional)
3. Click "Add Application"

### Schedule an Interview

1. Open an application
2. Click "Add Interview"
3. Set date, time, and type
4. Add meeting link or location

### Explore the Dashboard

- View application statistics
- See upcoming interviews
- Track your progress

## Common Tasks

### Stop the Application

```bash
# Press Ctrl+C in the terminal
# Or
docker-compose down
```

### Start Again

```bash
docker-compose up
```

### View Database

```bash
cd server
npx prisma studio
```

Opens at http://localhost:5555

### Check Logs

```bash
# Backend logs
docker logs job-tracker-server

# Frontend logs
docker logs job-tracker-client

# Database logs
docker logs job-tracker-db
```

## Project Structure Overview

```
job-tracker/
├── client/          # Frontend (Next.js)
│   ├── src/app/    # Pages
│   └── src/components/  # UI components
│
├── server/          # Backend (Express)
│   ├── src/controllers/  # Business logic
│   ├── src/routes/       # API endpoints
│   └── prisma/           # Database
│
└── docker-compose.yml    # Docker setup
```

## Key Features to Try

1. **Application Tracking**
   - Add applications
   - Update status
   - Add notes
   - Track timeline

2. **Interview Management**
   - Schedule interviews
   - Add meeting links
   - Mark as completed
   - View calendar

3. **Analytics**
   - View statistics
   - Track response rate
   - Monitor progress

4. **Search & Filter**
   - Search by company/title
   - Filter by status
   - Sort applications

## Customization

### Change Ports

Edit `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Frontend
  - "5001:5000"  # Backend
```

### Update Database

Edit `server/.env`:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
```

### Configure Email (Optional)

Edit `server/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Troubleshooting

### Port Already in Use

**Error:** "Port 3000 is already allocated"

**Solution:**
```bash
# Windows - Kill process on port
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
```

### Docker Not Starting

**Solution:**
1. Ensure Docker Desktop is running
2. Restart Docker Desktop
3. Run `docker ps` to check

### Database Connection Error

**Solution:**
1. Wait 10 seconds for database to start
2. Check `server/.env` for correct DATABASE_URL
3. Restart: `docker-compose restart`

### Page Not Loading

**Solution:**
1. Check if services are running: `docker ps`
2. Check logs: `docker logs job-tracker-client`
3. Clear browser cache
4. Try incognito mode

For more issues, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## Learning Resources

### Understanding the Code

1. **Frontend (client/)**
   - Next.js 14 with App Router
   - React components in `src/app/`
   - API calls in `src/lib/api.ts`
   - State management in `src/store/`

2. **Backend (server/)**
   - Express.js API
   - Controllers in `src/controllers/`
   - Routes in `src/routes/`
   - Database in `prisma/schema.prisma`

### API Endpoints

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete reference.

Key endpoints:
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Sign in
- `GET /api/applications` - List applications
- `POST /api/applications` - Create application
- `GET /api/stats` - Dashboard stats

## Development Tips

### Making Changes

1. **Frontend changes:**
   - Edit files in `client/src/`
   - Changes auto-reload

2. **Backend changes:**
   - Edit files in `server/src/`
   - Changes auto-reload

3. **Database changes:**
   - Edit `server/prisma/schema.prisma`
   - Run: `npx prisma migrate dev`

### Adding Features

1. Plan your feature
2. Update database schema if needed
3. Create API endpoint in backend
4. Create UI in frontend
5. Test thoroughly

### Best Practices

- Keep components small
- Use TypeScript types
- Add error handling
- Write clear commit messages
- Test before committing

## Next Steps

### Beginner
1. Add more applications
2. Schedule interviews
3. Explore all features
4. Customize for your needs

### Intermediate
1. Modify the UI
2. Add new fields
3. Create custom reports
4. Integrate with other tools

### Advanced
1. Add new features
2. Deploy to production
3. Set up CI/CD
4. Contribute back

## Getting Help

1. **Documentation**
   - [README.md](README.md) - Overview
   - [SETUP.md](SETUP.md) - Detailed setup
   - [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
   - [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

2. **Community**
   - Open GitHub issue
   - Check existing issues
   - Read discussions

3. **Contributing**
   - See [CONTRIBUTING.md](CONTRIBUTING.md)
   - Fork and submit PR
   - Report bugs

## Useful Commands

```bash
# Start application
docker-compose up

# Stop application
docker-compose down

# View logs
docker logs job-tracker-server
docker logs job-tracker-client

# Restart services
docker-compose restart

# Rebuild after changes
docker-compose up --build

# View database
cd server && npx prisma studio

# Run migrations
cd server && npx prisma migrate dev

# Install dependencies
cd client && npm install
cd server && npm install
```

## Success Checklist

- [ ] Application running on http://localhost:3000
- [ ] Can create an account
- [ ] Can add an application
- [ ] Can schedule an interview
- [ ] Dashboard shows statistics
- [ ] Search and filter work

## What's Included

✅ User authentication
✅ Application CRUD
✅ Interview scheduling
✅ Contact management
✅ Activity timeline
✅ Analytics dashboard
✅ Search & filter
✅ Responsive design
✅ Docker setup
✅ Complete documentation

## Production Deployment

Ready to deploy? See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Vercel deployment (frontend)
- Railway/Render deployment (backend)
- Database setup
- Environment configuration
- SSL setup
- Monitoring

## Support This Project

- ⭐ Star on GitHub
- 🐛 Report bugs
- 💡 Suggest features
- 🤝 Contribute code
- 📖 Improve docs

---

**Happy job hunting! 🎉**

Need help? Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or open an issue!
