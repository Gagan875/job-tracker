# Deployment Guide

This guide covers deploying the Job Application Tracker to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Railway/Render account (for backend)
- PostgreSQL database (managed service)

## Option 1: Separate Deployments (Recommended)

### Frontend Deployment (Vercel)

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

5. Deploy!

### Backend Deployment (Railway)

1. Go to [Railway](https://railway.app)

2. Create a new project from GitHub repo

3. Add PostgreSQL database:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will provide DATABASE_URL automatically

4. Configure backend service:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npx prisma migrate deploy && npm start`

5. Add environment variables:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-super-secret-key-change-this
   JWT_EXPIRES_IN=7d
   PORT=5000
   NODE_ENV=production
   ```

6. Deploy!

### Backend Deployment (Render)

1. Go to [Render](https://render.com)

2. Create new Web Service from GitHub

3. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npx prisma migrate deploy && npm start`

4. Add PostgreSQL database:
   - Create new PostgreSQL database
   - Copy connection string

5. Add environment variables:
   ```
   DATABASE_URL=your-postgres-connection-string
   JWT_SECRET=your-super-secret-key
   JWT_EXPIRES_IN=7d
   PORT=5000
   NODE_ENV=production
   ```

## Option 2: VPS Deployment

### Prerequisites
- Ubuntu 20.04+ VPS
- Domain name (optional)
- SSH access

### Setup Steps

1. SSH into your VPS:
```bash
ssh user@your-server-ip
```

2. Install dependencies:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y
```

3. Clone repository:
```bash
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
```

4. Configure environment:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit environment files
nano server/.env
nano client/.env
```

5. Start with Docker Compose:
```bash
docker-compose up -d
```

6. Setup Nginx reverse proxy:
```bash
sudo apt install nginx -y

# Create Nginx config
sudo nano /etc/nginx/sites-available/job-tracker
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/job-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. Setup SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## Database Migration

### Production Database Setup

1. Create PostgreSQL database on managed service:
   - [Supabase](https://supabase.com) (Free tier available)
   - [Neon](https://neon.tech) (Free tier available)
   - [Railway](https://railway.app) (PostgreSQL addon)
   - [AWS RDS](https://aws.amazon.com/rds/)

2. Get connection string

3. Update DATABASE_URL in backend environment

4. Run migrations:
```bash
cd server
npx prisma migrate deploy
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production

# Optional: Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@yourdomain.com
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

## Security Checklist

- [ ] Change default JWT_SECRET to strong random string
- [ ] Use HTTPS in production
- [ ] Enable CORS only for your frontend domain
- [ ] Set secure cookie flags
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting
- [ ] Setup database backups
- [ ] Monitor error logs
- [ ] Use strong database passwords
- [ ] Keep dependencies updated

## Monitoring

### Error Tracking
Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay
- [Datadog](https://www.datadoghq.com) for APM

### Uptime Monitoring
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)
- [Better Uptime](https://betteruptime.com)

## Backup Strategy

### Database Backups

1. Automated backups (most managed services provide this)

2. Manual backup:
```bash
pg_dump $DATABASE_URL > backup.sql
```

3. Restore:
```bash
psql $DATABASE_URL < backup.sql
```

### Application Backups
- Use Git for code versioning
- Backup environment variables securely
- Document configuration changes

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          # Add Railway deployment commands

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: |
          # Vercel auto-deploys from GitHub
```

## Performance Optimization

1. Enable caching:
   - Redis for session storage
   - CDN for static assets

2. Database optimization:
   - Add indexes for frequently queried fields
   - Use connection pooling

3. Frontend optimization:
   - Enable Next.js image optimization
   - Use CDN for assets
   - Enable compression

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ALB)
- Multiple backend instances
- Shared database
- Redis for session management

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Add database read replicas

## Troubleshooting

### Common Issues

1. **Database connection fails**
   - Check DATABASE_URL format
   - Verify network access
   - Check firewall rules

2. **CORS errors**
   - Update CORS configuration
   - Check frontend URL in backend

3. **Build fails**
   - Check Node.js version
   - Verify all dependencies installed
   - Check environment variables

4. **Migrations fail**
   - Ensure database is accessible
   - Check migration files
   - Run `prisma generate` first

## Cost Estimation

### Free Tier Options
- **Frontend**: Vercel (Free)
- **Backend**: Railway ($5/month after free tier)
- **Database**: Supabase/Neon (Free tier)
- **Total**: ~$5/month

### Production Setup
- **Frontend**: Vercel Pro ($20/month)
- **Backend**: Railway/Render ($20-50/month)
- **Database**: Managed PostgreSQL ($15-50/month)
- **Monitoring**: Sentry ($26/month)
- **Total**: ~$80-150/month

## Support

For deployment issues:
1. Check logs in your hosting platform
2. Review environment variables
3. Verify database connectivity
4. Check API endpoints
5. Open GitHub issue if needed

---

Good luck with your deployment! 🚀
