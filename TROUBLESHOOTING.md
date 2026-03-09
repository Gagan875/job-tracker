# Troubleshooting Guide

Common issues and their solutions for Job Application Tracker.

## Installation Issues

### Docker Issues

#### Docker not starting
```
Error: Cannot connect to Docker daemon
```

**Solution:**
- Ensure Docker Desktop is running
- On Windows: Check if Docker service is started
- Restart Docker Desktop
- Check Docker version: `docker --version`

#### Port already in use
```
Error: Port 3000/5000/5432 is already allocated
```

**Solution:**
1. Find process using the port:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
```

2. Update ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change 3000 to 3001
```

#### Docker build fails
```
Error: failed to solve with frontend dockerfile.v0
```

**Solution:**
- Clear Docker cache: `docker system prune -a`
- Rebuild: `docker-compose up --build`
- Check Dockerfile syntax
- Ensure all files exist

### Database Issues

#### Cannot connect to database
```
Error: Can't reach database server
```

**Solution:**
1. Check if PostgreSQL is running:
```bash
docker ps
```

2. Verify DATABASE_URL in `server/.env`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/job_tracker"
```

3. Wait for database to be ready (health check)

4. Check database logs:
```bash
docker logs job-tracker-db
```

#### Prisma migration fails
```
Error: Migration failed to apply
```

**Solution:**
1. Reset database (development only):
```bash
cd server
npx prisma migrate reset
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Run migrations:
```bash
npx prisma migrate dev
```

#### Database connection timeout
```
Error: Connection timeout
```

**Solution:**
- Increase timeout in Prisma schema
- Check network connectivity
- Verify database credentials
- Check firewall settings

### Node.js Issues

#### Module not found
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and reinstall
cd server  # or client
rmdir /s /q node_modules
del package-lock.json
npm install
```

#### TypeScript errors
```
Error: Cannot find name 'Request'
```

**Solution:**
```bash
# Install type definitions
npm install --save-dev @types/node @types/express
```

#### Port permission denied
```
Error: EACCES: permission denied
```

**Solution:**
- Use port > 1024
- Run with administrator privileges (not recommended)
- Change PORT in `.env`

## Runtime Issues

### Frontend Issues

#### Page not loading
**Symptoms:** Blank page or loading spinner

**Solution:**
1. Check browser console for errors
2. Verify API_URL in `client/.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Check if backend is running:
```bash
curl http://localhost:5000/health
```

4. Clear browser cache and cookies

#### Authentication not working
**Symptoms:** Login fails or redirects to login

**Solution:**
1. Check JWT_SECRET in `server/.env`
2. Clear localStorage:
```javascript
// In browser console
localStorage.clear()
```

3. Check token expiration
4. Verify API endpoint is correct

#### API calls failing
```
Error: Network Error
```

**Solution:**
1. Check CORS configuration in backend
2. Verify API URL is correct
3. Check if backend is running
4. Look at browser network tab
5. Check backend logs

### Backend Issues

#### Server won't start
```
Error: Address already in use
```

**Solution:**
1. Kill process on port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

2. Change PORT in `server/.env`

#### JWT errors
```
Error: Invalid token
```

**Solution:**
1. Ensure JWT_SECRET is set in `.env`
2. Check token format in Authorization header
3. Verify token hasn't expired
4. Clear old tokens from client

#### Prisma errors
```
Error: PrismaClient is unable to run in the browser
```

**Solution:**
- Prisma should only run on server
- Check import statements
- Ensure not importing Prisma in client code

#### Database query fails
```
Error: Invalid prisma.model.findMany() invocation
```

**Solution:**
1. Check Prisma schema syntax
2. Regenerate Prisma client:
```bash
npx prisma generate
```

3. Verify database connection
4. Check query syntax

## Development Issues

### Hot Reload Not Working

**Frontend:**
```bash
# Restart Next.js dev server
cd client
npm run dev
```

**Backend:**
```bash
# Restart with tsx watch
cd server
npm run dev
```

### Environment Variables Not Loading

**Solution:**
1. Restart development server
2. Check `.env` file location
3. Verify variable names (NEXT_PUBLIC_ prefix for client)
4. Don't commit `.env` files

### TypeScript Compilation Errors

**Solution:**
```bash
# Clean and rebuild
npm run build

# Check TypeScript config
cat tsconfig.json
```

## Production Issues

### Deployment Fails

**Vercel:**
- Check build logs
- Verify environment variables
- Check Next.js version compatibility

**Railway/Render:**
- Check build command
- Verify start command
- Check environment variables
- Review deployment logs

### Database Migration in Production

**Solution:**
```bash
# Run migrations
npx prisma migrate deploy

# Don't use migrate dev in production
```

### Performance Issues

**Symptoms:** Slow page loads, API timeouts

**Solution:**
1. Check database indexes
2. Optimize queries
3. Enable caching
4. Use CDN for static assets
5. Monitor server resources

## Common Error Messages

### "CORS Error"
**Cause:** Frontend and backend on different origins

**Solution:**
Update CORS in `server/src/index.ts`:
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}))
```

### "Unauthorized"
**Cause:** Missing or invalid JWT token

**Solution:**
1. Login again
2. Check token in localStorage
3. Verify Authorization header format

### "Validation Error"
**Cause:** Invalid input data

**Solution:**
- Check required fields
- Verify data types
- Review API documentation

### "Internal Server Error"
**Cause:** Server-side error

**Solution:**
1. Check server logs
2. Review error stack trace
3. Verify database connection
4. Check environment variables

## Debugging Tips

### Enable Debug Logging

**Backend:**
```typescript
// Add to server/src/index.ts
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})
```

**Frontend:**
```typescript
// Add to client/src/lib/api.ts
api.interceptors.request.use(config => {
  console.log('Request:', config)
  return config
})
```

### Check Logs

**Docker:**
```bash
docker logs job-tracker-server
docker logs job-tracker-client
docker logs job-tracker-db
```

**Manual:**
- Backend: Check terminal output
- Frontend: Check browser console
- Database: Check PostgreSQL logs

### Database Inspection

```bash
# Open Prisma Studio
cd server
npx prisma studio

# Or use psql
psql $DATABASE_URL
```

## Getting Help

If you're still stuck:

1. Check existing GitHub issues
2. Review documentation:
   - [README.md](README.md)
   - [SETUP.md](SETUP.md)
   - [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. Open a new GitHub issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Logs/screenshots

## Useful Commands

```bash
# Check versions
node --version
npm --version
docker --version

# Clean install
rm -rf node_modules package-lock.json
npm install

# Reset database (dev only)
cd server
npx prisma migrate reset

# View database
npx prisma studio

# Check Docker status
docker ps
docker logs <container-name>

# Rebuild Docker
docker-compose down
docker-compose up --build

# Clear Docker cache
docker system prune -a
```

---

**Still having issues?** Open a GitHub issue with detailed information!
