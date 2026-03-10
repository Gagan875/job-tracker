# Deploy Full Project on Render

Complete guide to deploy frontend, backend, and database on Render.

---

## Prerequisites
- GitHub account with code pushed
- Render account (sign up at render.com)

---

## PART 1: Create PostgreSQL Database

### Step 1: Sign Up / Login
1. Go to https://render.com
2. Click "Get Started" or "Sign In"
3. Sign in with GitHub
4. Authorize Render

### Step 2: Create Database
1. Click "New +" button (top right)
2. Select "PostgreSQL"
3. Configure:
   - **Name**: `job-tracker-db`
   - **Database**: `job_tracker`
   - **User**: `job_tracker_user` (or leave default)
   - **Region**: Choose closest to you
   - **Instance Type**: **Free** (select free tier)
4. Click "Create Database"
5. Wait 2-3 minutes for database to be ready

### Step 3: Get Database URL
1. Once created, click on your database
2. Scroll down to "Connections"
3. Copy the **Internal Database URL** (starts with `postgresql://`)
4. **Save this URL** - you'll need it for backend

---

## PART 2: Deploy Backend (Web Service)

### Step 1: Create Web Service
1. Click "New +" → "Web Service"
2. Click "Connect a repository"
3. If not connected, authorize GitHub access
4. Find and select your `job-tracker` repository
5. Click "Connect"

### Step 2: Configure Backend Service
Fill in these settings:

- **Name**: `job-tracker-backend`
- **Region**: Same as database
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: 
  ```
  npm install && npx prisma generate && npm run build
  ```
- **Start Command**: 
  ```
  npx prisma migrate deploy && npm start
  ```
- **Instance Type**: **Free**

### Step 3: Add Environment Variables
Scroll down to "Environment Variables" and add:

```
DATABASE_URL=<paste-your-internal-database-url-from-step-3>
JWT_SECRET=change-this-to-random-string-min-32-characters
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
```

**Important**: 
- Replace `DATABASE_URL` with the URL you copied in Part 1, Step 3
- Change `JWT_SECRET` to a random string (at least 32 characters)

### Step 4: Deploy Backend
1. Click "Create Web Service"
2. Render will start building and deploying (5-10 minutes)
3. Wait for "Live" status
4. Once live, you'll see a URL like: `https://job-tracker-backend.onrender.com`
5. **Copy this URL** - you'll need it for frontend

### Step 5: Test Backend
Open in browser:
```
https://job-tracker-backend.onrender.com/health
```
Should return: `{"status":"ok","timestamp":"..."}`

---

## PART 3: Deploy Frontend (Static Site)

### Step 1: Create Static Site
1. Click "New +" → "Static Site"
2. Select your `job-tracker` repository
3. Click "Connect"

### Step 2: Configure Frontend
Fill in these settings:

- **Name**: `job-tracker-frontend`
- **Region**: Same as backend
- **Branch**: `main`
- **Root Directory**: `client`
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Publish Directory**: 
  ```
  .next
  ```

### Step 3: Add Environment Variable
Scroll down to "Environment Variables" and add:

```
NEXT_PUBLIC_API_URL=https://job-tracker-backend.onrender.com/api
```

**Replace** `job-tracker-backend.onrender.com` with your actual backend URL from Part 2, Step 4

### Step 4: Deploy Frontend
1. Click "Create Static Site"
2. Render will build and deploy (3-5 minutes)
3. Wait for "Live" status
4. You'll get a URL like: `https://job-tracker-frontend.onrender.com`

---

## PART 4: Connect Frontend and Backend (CORS)

### Step 1: Update Backend Environment
1. Go to your backend service dashboard
2. Click "Environment" in left sidebar
3. Add new environment variable:

```
FRONTEND_URL=https://job-tracker-frontend.onrender.com
```

**Replace** with your actual frontend URL from Part 3, Step 4

### Step 2: Redeploy Backend
1. After adding the variable, Render will auto-redeploy
2. Wait for deployment to complete
3. Backend will now accept requests from your frontend

---

## PART 5: Test Your Application

### Test Checklist
1. Open your frontend URL: `https://job-tracker-frontend.onrender.com`
2. You should see the login page
3. Click "Register" and create an account
4. Login with your credentials
5. Try creating a job application
6. Try scheduling an interview
7. Navigate through all pages

### If Something Doesn't Work

#### Check Logs
- **Backend**: Dashboard → Your service → Logs tab
- **Frontend**: Dashboard → Your site → Logs tab
- **Database**: Dashboard → Your database → Logs tab

#### Common Issues

**"Cannot connect to backend"**
- Verify `NEXT_PUBLIC_API_URL` in frontend environment
- Check backend is "Live" status
- Test backend health endpoint

**"Database connection failed"**
- Check `DATABASE_URL` in backend environment
- Verify database is "Available" status
- Check database logs

**"CORS error"**
- Add `FRONTEND_URL` to backend environment
- Make sure it matches your frontend URL exactly
- Redeploy backend after adding variable

**"Prisma migration failed"**
- Check backend logs
- Verify database is accessible
- Try manual redeploy

---

## Summary of Your URLs

After deployment, you'll have:

- **Frontend**: `https://job-tracker-frontend.onrender.com`
- **Backend**: `https://job-tracker-backend.onrender.com`
- **Database**: Internal URL (not publicly accessible)

---

## Environment Variables Summary

### Backend Environment Variables
```env
DATABASE_URL=<internal-database-url>
JWT_SECRET=<your-random-secret-32-chars>
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://job-tracker-frontend.onrender.com
```

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=https://job-tracker-backend.onrender.com/api
```

---

## Important Notes

### Free Tier Limitations
- **Backend**: Spins down after 15 minutes of inactivity
- **First request**: May take 30-60 seconds to wake up
- **Database**: 90 days expiry on free tier (can extend)
- **Build minutes**: 500 minutes/month

### Keep Services Active
To prevent spin-down:
- Use a service like UptimeRobot to ping your backend every 10 minutes
- Or upgrade to paid plan ($7/month per service)

### Database Backup
Free tier databases expire after 90 days:
- Export data regularly
- Consider upgrading for production use

---

## Custom Domain (Optional)

### Add Custom Domain to Frontend
1. Go to frontend service settings
2. Click "Custom Domains"
3. Add your domain (e.g., `jobtracker.com`)
4. Follow DNS configuration instructions
5. Render provides free SSL

### Add Custom Domain to Backend
1. Go to backend service settings
2. Click "Custom Domains"
3. Add subdomain (e.g., `api.jobtracker.com`)
4. Update DNS records
5. Update `NEXT_PUBLIC_API_URL` in frontend

---

## Costs

### Free Tier (What You Get)
- ✅ PostgreSQL database (90 days)
- ✅ Backend web service (with spin-down)
- ✅ Frontend static site
- ✅ Free SSL certificates
- ✅ 500 build minutes/month
- **Total Cost**: $0/month

### Paid Tier (No Spin-Down)
- Backend: $7/month
- Database: $7/month (persistent)
- Frontend: Free
- **Total Cost**: ~$14/month

---

## Monitoring

### Check Service Status
- Dashboard shows "Live" or "Failed"
- View logs in real-time
- Set up email alerts for failures

### Monitor Usage
- Dashboard → Account → Usage
- Track build minutes
- Monitor bandwidth

---

## Troubleshooting Commands

### View Logs
```bash
# In Render dashboard
Services → Your Service → Logs
```

### Manual Redeploy
```bash
# In Render dashboard
Services → Your Service → Manual Deploy → Deploy latest commit
```

### Database Connection Test
```bash
# In backend logs, look for:
"Server running on port 5000"
"CORS enabled for: https://..."
```

---

## Next Steps After Deployment

1. ✅ Test all features thoroughly
2. ✅ Add deployment URL to README.md
3. ✅ Share with recruiters
4. ✅ Add to your portfolio
5. ✅ Monitor for errors
6. ✅ Set up UptimeRobot (optional)
7. ✅ Consider upgrading for production

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **Community**: https://community.render.com
- **Support**: support@render.com

---

## Quick Reference

| Service | URL | Status |
|---------|-----|--------|
| Frontend | https://job-tracker-frontend.onrender.com | Check dashboard |
| Backend | https://job-tracker-backend.onrender.com | Check dashboard |
| Database | Internal only | Check dashboard |

---

**Congratulations! Your full-stack app is now live on Render!** 🚀

Share your deployed app:
- ✅ Add to resume
- ✅ Share on LinkedIn
- ✅ Add to portfolio website
- ✅ Show to recruiters
- ✅ Add to GitHub README

---

## Comparison: Render vs Railway vs Vercel

| Feature | Render | Railway | Vercel + Railway |
|---------|--------|---------|------------------|
| Frontend | ✅ Static Site | ✅ Web Service | ✅ Best for Next.js |
| Backend | ✅ Web Service | ✅ Web Service | ❌ Not ideal |
| Database | ✅ PostgreSQL | ✅ PostgreSQL | ❌ Need separate |
| Free Tier | ✅ With limits | ✅ $5 credit | ✅ Generous |
| Spin-down | ⚠️ Yes (free) | ⚠️ Yes (free) | ⚠️ Backend only |
| Setup | Easy | Easiest | Medium |
| **Best For** | All-in-one | All-in-one | Frontend only |

**Recommendation**: Use Render for all-in-one deployment when Railway is down.

