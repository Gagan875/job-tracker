# Job Application Tracker

A production-ready full-stack application to track job applications, manage interviews, and organize your job search process efficiently.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## Features

### Core Functionality
- **Application Tracking** - Track applications across multiple stages (Wishlist, Applied, Interview, Offer, etc.)
- **Interview Management** - Schedule and track interviews with detailed information
- **Contact Management** - Store recruiter and hiring manager contacts
- **Analytics Dashboard** - Visual insights into your job search progress
- **Search & Filter** - Quickly find applications by company, title, or status
- **Notes & Activities** - Keep detailed notes and automatic activity timeline
- **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Technical Features
- Real-time updates with React Query
- Modern UI with Tailwind CSS
- Optimistic updates for better UX
- Docker containerization
- Type-safe API with TypeScript
- PostgreSQL with Prisma ORM
- Input validation and error handling

## Quick Start

### Option 1: Docker (Recommended)

1. Run the quick start script:
```bash
quick-start.bat
```

Or manually:
```bash
# Copy environment files
copy server\.env.example server\.env
copy client\.env.example client\.env

# Start all services
docker-compose up
```

2. Access the application:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Database**: localhost:5432

### Option 2: Manual Setup

See [SETUP.md](SETUP.md) for detailed manual installation instructions.

## Documentation

- [Get Started Guide](GET_STARTED.md) - Step-by-step beginner guide
- [Setup Guide](SETUP.md) - Detailed installation and configuration
- [API Documentation](API_DOCUMENTATION.md) - Complete API reference
- [Features List](FEATURES.md) - Comprehensive feature documentation
- [Project Structure](PROJECT_STRUCTURE.md) - Architecture and code organization
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues and solutions
- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Changelog](CHANGELOG.md) - Version history and updates

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator

### DevOps
- **Containerization**: Docker & Docker Compose
- **Development**: Hot reload for both frontend and backend
- **Database**: PostgreSQL in Docker

## Project Structure

```
job-tracker/
├── client/                      # Next.js Frontend
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities
│   │   └── store/              # State management
│   └── package.json
│
├── server/                      # Express Backend
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Express middleware
│   │   └── utils/              # Utilities
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   └── package.json
│
├── docker-compose.yml           # Docker orchestration
├── README.md                    # This file
└── SETUP.md                     # Setup instructions
```

## Key Features Explained

### Application Management
- Create, update, and delete job applications
- Track status changes automatically
- Add job descriptions, URLs, salary info
- Color-code applications for quick identification

### Interview Tracking
- Schedule multiple interviews per application
- Track interview types (Phone, Video, Onsite, Technical)
- Add meeting links and locations
- Mark interviews as completed
- View upcoming and past interviews

### Analytics Dashboard
- Total applications count
- Applications by status breakdown
- Upcoming interviews count
- Recent applications (last 30 days)
- Response rate calculation

### Activity Timeline
- Automatic logging of all changes
- Status change tracking
- Interview scheduling notifications
- Custom activity notes

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- SQL injection prevention (Prisma)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Applications
- `GET /api/applications` - List applications
- `POST /api/applications` - Create application
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Interviews
- `GET /api/interviews` - List interviews
- `POST /api/interviews` - Create interview
- `PUT /api/interviews/:id` - Update interview
- `DELETE /api/interviews/:id` - Delete interview

### Statistics
- `GET /api/stats` - Get dashboard statistics

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

## Future Enhancements

- Email notifications for interviews
- Calendar integration (Google Calendar, Outlook)
- Chrome extension for quick job saving
- Resume parsing and auto-fill
- Export data to CSV/PDF
- Mobile app (React Native)
- AI-powered job matching
- Cover letter generator

See [FEATURES.md](FEATURES.md) for complete roadmap.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with modern web technologies
- Inspired by the need for better job application tracking
- Designed for developers, by developers

## Additional Documentation

- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues and solutions
- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions
- [Changelog](CHANGELOG.md) - Version history and updates

## Support

For questions or issues:
- Check [Troubleshooting Guide](TROUBLESHOOTING.md)
- Review [Documentation](#-documentation)
- Open an issue on GitHub

## Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render)
```bash
cd server
npm run build
# Deploy to Railway or Render
```

### Database
Use managed PostgreSQL services:
- Supabase
- Neon
- AWS RDS
- Railway PostgreSQL

---

**Happy Job Hunting!**

Made with love for job seekers everywhere
