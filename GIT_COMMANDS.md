# Git Commands for GitHub Upload

## Step-by-Step Guide

### 1. Initialize Git Repository

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Check What Will Be Committed

```bash
git status
```

**Verify:**
- ✅ `.env` files are NOT listed
- ✅ `node_modules/` is NOT listed
- ✅ `.next/` is NOT listed
- ✅ All source files ARE listed

### 4. Make First Commit

```bash
git commit -m "Initial commit: Job Application Tracker - Full Stack Application"
```

### 5. Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `job-application-tracker`
3. Description: "A modern full-stack web application to track job applications, manage interviews, and organize your job search process. Built with Next.js, TypeScript, PostgreSQL, and Docker."
4. Choose: Public (recommended for portfolio)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 6. Add Remote Origin

```bash
git remote add origin https://github.com/YOUR_USERNAME/job-application-tracker.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### 7. Rename Branch to Main (if needed)

```bash
git branch -M main
```

### 8. Push to GitHub

```bash
git push -u origin main
```

## After Upload

### Add Topics on GitHub

Go to your repository page and add these topics:
- `job-tracker`
- `nextjs`
- `typescript`
- `postgresql`
- `docker`
- `full-stack`
- `react`
- `nodejs`
- `express`
- `prisma`
- `tailwindcss`
- `jwt-authentication`

### Update Repository Settings

1. **About Section**:
   - Add description
   - Add website (if deployed)
   - Add topics

2. **Enable Issues**:
   - Settings → Features → Issues ✓

3. **Add License**:
   - Add file → Create new file
   - Name: `LICENSE`
   - Choose template: MIT License

## Useful Git Commands

### Check Repository Status
```bash
git status
```

### View Commit History
```bash
git log --oneline
```

### Check Remote URL
```bash
git remote -v
```

### Update README
```bash
git add README.md
git commit -m "Update README with personal information"
git push
```

### Create New Branch
```bash
git checkout -b feature/new-feature
```

### Switch Back to Main
```bash
git checkout main
```

## Common Issues

### Issue: "fatal: not a git repository"
**Solution:** Run `git init` first

### Issue: "remote origin already exists"
**Solution:** 
```bash
git remote remove origin
git remote add origin YOUR_NEW_URL
```

### Issue: "failed to push some refs"
**Solution:**
```bash
git pull origin main --rebase
git push origin main
```

### Issue: ".env file is being tracked"
**Solution:**
```bash
git rm --cached server/.env
git rm --cached client/.env
git commit -m "Remove .env files from tracking"
git push
```

## Best Practices

### Commit Message Format

```bash
# Feature
git commit -m "Add: User authentication system"

# Bug fix
git commit -m "Fix: Login redirect issue"

# Update
git commit -m "Update: Dashboard UI improvements"

# Documentation
git commit -m "Docs: Add API documentation"
```

### Before Each Commit

1. Test the application
2. Check for console errors
3. Review changed files
4. Write clear commit message

### Regular Updates

```bash
# After making changes
git add .
git commit -m "Update: Description of changes"
git push
```

## Repository URL

After upload, your repository will be at:
```
https://github.com/YOUR_USERNAME/job-application-tracker
```

## Clone Command (for others)

Others can clone your project with:
```bash
git clone https://github.com/YOUR_USERNAME/job-application-tracker.git
```

## Quick Reference

```bash
# Initialize
git init

# Add files
git add .

# Commit
git commit -m "message"

# Add remote
git remote add origin URL

# Push
git push -u origin main

# Pull
git pull origin main

# Status
git status

# Log
git log
```

---

**Ready to upload? Run these commands in order!** 🚀

1. `git init`
2. `git add .`
3. `git commit -m "Initial commit: Job Application Tracker"`
4. Create GitHub repo
5. `git remote add origin YOUR_URL`
6. `git push -u origin main`

**Done!** ✅
