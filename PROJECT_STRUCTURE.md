# Project Structure

```
job-tracker/
│
├── README.md                    # Project overview and quick start
├── SETUP.md                     # Detailed setup instructions
├── FEATURES.md                  # Complete feature list
├── PROJECT_STRUCTURE.md         # This file
├── docker-compose.yml           # Docker orchestration
├── .gitignore                   # Git ignore rules
│
├── server/                      # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── index.ts            # Application entry point
│   │   ├── controllers/        # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── application.controller.ts
│   │   │   ├── interview.controller.ts
│   │   │   ├── document.controller.ts
│   │   │   └── stats.controller.ts
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── application.routes.ts
│   │   │   ├── interview.routes.ts
│   │   │   ├── document.routes.ts
│   │   │   └── stats.routes.ts
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   └── utils/              # Utility functions
│   │       └── prisma.ts       # Prisma client instance
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # Database migrations
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .eslintrc.json
│   └── Dockerfile
│
└── client/                      # Frontend (Next.js 14 + TypeScript)
    ├── src/
    │   ├── app/                # Next.js App Router
    │   │   ├── (auth)/         # Auth routes group
    │   │   │   ├── login/
    │   │   │   │   └── page.tsx
    │   │   │   └── register/
    │   │   │       └── page.tsx
    │   │   ├── dashboard/      # Protected routes
    │   │   │   ├── layout.tsx  # Dashboard layout with nav
    │   │   │   └── page.tsx    # Dashboard home
    │   │   ├── applications/
    │   │   │   ├── page.tsx    # Applications list
    │   │   │   ├── new/
    │   │   │   │   └── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── page.tsx
    │   │   ├── interviews/
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx      # Root layout
    │   │   ├── page.tsx        # Home page (redirects)
    │   │   └── globals.css     # Global styles
    │   ├── components/         # Reusable components
    │   │   └── Providers.tsx   # React Query provider
    │   ├── lib/                # Utilities
    │   │   └── api.ts          # Axios instance with interceptors
    │   ├── store/              # State management
    │   │   └── authStore.ts    # Zustand auth store
    │   └── middleware.ts       # Next.js middleware
    ├── public/                 # Static assets
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── next.config.js
    ├── .env.example
    ├── .eslintrc.json
    └── Dockerfile

```

## Key Directories Explained

### Backend (`server/`)

#### `src/controllers/`
Business logic and request handling. Each controller manages a specific domain:
- `auth.controller.ts` - User registration, login, profile
- `application.controller.ts` - CRUD operations for job applications
- `interview.controller.ts` - Interview scheduling and management
- `document.controller.ts` - Document storage and retrieval
- `stats.controller.ts` - Dashboard analytics

#### `src/routes/`
API endpoint definitions with validation middleware. Maps HTTP methods to controller functions.

#### `src/middleware/`
- `auth.middleware.ts` - JWT token verification
- `error.middleware.ts` - Centralized error handling

#### `prisma/`
- `schema.prisma` - Database models and relationships
- `migrations/` - Version-controlled database changes

### Frontend (`client/`)

#### `src/app/`
Next.js 14 App Router structure:
- `(auth)/` - Route group for authentication pages
- `dashboard/` - Protected dashboard with shared layout
- `applications/` - Application management pages
- `interviews/` - Interview tracking pages

#### `src/components/`
Reusable React components:
- `Providers.tsx` - Wraps app with React Query

#### `src/lib/`
Utility functions and configurations:
- `api.ts` - Configured Axios instance with auth interceptors

#### `src/store/`
Zustand state management:
- `authStore.ts` - User authentication state

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **Icons**: Lucide React

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL (Docker)

## Design Patterns

### Backend
- **MVC Pattern**: Controllers handle business logic, routes define endpoints
- **Middleware Pattern**: Authentication, validation, error handling
- **Repository Pattern**: Prisma as data access layer
- **Dependency Injection**: Prisma client shared across modules

### Frontend
- **Component-Based Architecture**: Reusable React components
- **Server/Client Components**: Next.js App Router pattern
- **Custom Hooks**: React Query for data fetching
- **State Management**: Zustand for global state
- **API Layer**: Centralized Axios instance

## Data Flow

### Authentication Flow
1. User submits credentials → Frontend
2. API call to `/api/auth/login` → Backend
3. Validate credentials → Database
4. Generate JWT token → Backend
5. Store token in Zustand → Frontend
6. Include token in subsequent requests

### Application CRUD Flow
1. User action (create/update/delete) → Frontend
2. API call with JWT token → Backend
3. Verify token → Middleware
4. Process request → Controller
5. Database operation → Prisma
6. Return response → Frontend
7. Update cache → React Query
8. Re-render UI → React

## Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **Protected Routes**: Middleware verification
4. **Input Validation**: express-validator
5. **CORS Configuration**: Controlled cross-origin requests
6. **Environment Variables**: Sensitive data protection
7. **SQL Injection Prevention**: Prisma parameterized queries

## Performance Optimizations

1. **React Query Caching**: Reduces unnecessary API calls
2. **Prisma Connection Pooling**: Efficient database connections
3. **Next.js Code Splitting**: Automatic route-based splitting
4. **Lazy Loading**: Components loaded on demand
5. **Optimistic Updates**: Immediate UI feedback
6. **Database Indexing**: Fast query performance

## Development Workflow

1. Start Docker containers: `docker-compose up`
2. Backend runs on port 5000 with hot reload
3. Frontend runs on port 3000 with hot reload
4. Database runs on port 5432
5. Make changes → Auto-reload → Test
6. Commit changes → Git

## Deployment Recommendations

### Backend
- **Platform**: Railway, Render, Heroku, AWS
- **Database**: Managed PostgreSQL (Supabase, Neon, AWS RDS)
- **Environment**: Production environment variables

### Frontend
- **Platform**: Vercel, Netlify, AWS Amplify
- **Build**: `npm run build`
- **Environment**: Set NEXT_PUBLIC_API_URL

### Full Stack
- **Option 1**: Separate deployments (recommended)
- **Option 2**: Single VPS with Docker Compose
- **Option 3**: Kubernetes cluster for scale
