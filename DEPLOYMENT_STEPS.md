# Deployment Steps - Option 1 (Vercel + Railway)

## Prerequisites
- GitHub account
- Code pushed to GitHub repository
- Vercel account (sign up at vercel.com)
- Railway account (sign up at railway.app)

---

## PART 1: Deploy Backend + Database on Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Login" and sign in with GitHub
3. Authorize Railway to access your GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `job-tracker` repository
4. Railway will detect your project

### Step 3: Add PostgreSQL Database
1. In your project dashboard, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will create a PostgreSQL database
4. Database URL will be automatically available as `${{Postgres.DATABASE_URL}}`

### Step 4: Configure Backend Service
1. Click on your backend service (should auto-detect from `server/` folder)
2. Go to "Settings" tab
3. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npx prisma migrate deploy && npm start`

### Step 5: Add Environment Variables
1. Go to "Variables" tab
2. Add these variables:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
```

**Important**: Change `JWT_SECRET` to a random string (at least 32 characters)

### Step 6: Deploy Backend
1. Click "Deploy" or it will auto-deploy
2. Wait for deployment to complete (2-3 minutes)
3. Once deployed, you'll see a URL like: `https://your-app.up.railway.app`
4. **Copy this URL** - you'll need it for frontend

### Step 7: Test Backend
Open your backend URL in browser:
- `https://your-app.up.railway.app/api/health` (should return OK)

---

## PART 2: Deploy Frontend on Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up" and sign in with GitHub
3. Authorize Vercel to access your GitHub

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Import your `job-tracker` repository
3. Click "Import"

### Step 3: Configure Project
1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: Click "Edit" and select `client`
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)
5. **Install Command**: `npm install` (default)

### Step 4: Add Environment Variable
1. Expand "Environment Variables" section
2. Add this variable:

```
Name: NEXT_PUBLIC_API_URL
Value: https://your-backend-url.up.railway.app/api
```

**Replace** `your-backend-url.up.railway.app` with your actual Railway backend URL from Part 1, Step 6

### Step 5: Deploy Frontend
1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Once deployed, you'll get a URL like: `https://your-app.vercel.app`

### Step 6: Update Backend CORS
1. Go back to Railway dashboard
2. Click on your backend service
3. Go to "Variables" tab
4. Add new variable:

```
FRONTEND_URL=https://your-app.vercel.app
```

**Replace** with your actual Vercel URL

5. Redeploy backend (it will auto-redeploy after variable change)

---

## PART 3: Test Your Deployment

### Test Checklist
1. Open your Vercel URL: `https://your-app.vercel.app`
2. You should see the login page
3. Click "Register" and create an account
4. Login with your credentials
5. Try creating a job application
6. Try scheduling an interview
7. Check if all pages work

### If Something Doesn't Work

#### Frontend Issues
1. Check Vercel deployment logs
2. Verify `NEXT_PUBLIC_API_URL` is correct
3. Make sure it ends with `/api` (no trailing slash)

#### Backend Issues
1. Check Railway deployment logs
2. Verify database is connected
3. Check environment variables are set correctly
4. Verify migrations ran successfully

#### CORS Issues
1. Make sure `FRONTEND_URL` is set in Railway
2. Backend should allow requests from your Vercel domain

---

## PART 4: Custom Domain (Optional)

### Add Custom Domain to Vercel
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Add Custom Domain to Railway
1. Go to your backend service settings
2. Click "Settings" → "Domains"
3. Add custom domain
4. Update DNS records

---

## Environment Variables Summary

### Railway (Backend)
```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel (Frontend)
```env
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
```

---

## Costs

### Free Tier Limits
- **Vercel**: Unlimited deployments, 100GB bandwidth/month
- **Railway**: $5 free credit/month (usually enough for small projects)

### When You Exceed Free Tier
- **Vercel**: Still free for personal projects
- **Railway**: ~$5-10/month for backend + database

---

## Troubleshooting

### "Cannot connect to backend"
- Check `NEXT_PUBLIC_API_URL` in Vercel
- Verify backend is running on Railway
- Check Railway logs for errors

### "Database connection failed"
- Verify `DATABASE_URL` is set in Railway
- Check if PostgreSQL database is running
- Look at Railway logs

### "CORS error"
- Add `FRONTEND_URL` to Railway environment variables
- Make sure it matches your Vercel URL exactly

### "Prisma migration failed"
- Check Railway logs
- Verify database is accessible
- Try redeploying backend

---

## Monitoring

### Check Logs
- **Vercel**: Project → Deployments → Click deployment → View logs
- **Railway**: Project → Service → Deployments → View logs

### Monitor Usage
- **Vercel**: Dashboard → Usage
- **Railway**: Dashboard → Usage

---

## Next Steps After Deployment

1. Test all features thoroughly
2. Add your deployment URL to README.md
3. Share with recruiters/portfolio
4. Monitor for errors
5. Set up error tracking (optional: Sentry)

---

## Quick Reference URLs

- **Railway Dashboard**: https://railway.app/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Frontend**: https://your-app.vercel.app
- **Your Backend**: https://your-backend.up.railway.app

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Review this guide
4. Check Railway/Vercel documentation
5. Open GitHub issue

---

**Congratulations! Your app is now live!** 🚀

Share your deployed app:
- Add to your resume
- Share on LinkedIn
- Add to your portfolio
- Show to recruiters

