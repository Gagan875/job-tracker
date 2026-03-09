@echo off
echo ========================================
echo Preparing Project for GitHub Upload
echo ========================================
echo.

echo Step 1: Checking .gitignore...
if exist .gitignore (
    echo ✓ .gitignore found
) else (
    echo ✗ .gitignore missing!
    pause
    exit /b 1
)

echo.
echo Step 2: Verifying .env files are NOT in git...
git check-ignore server/.env >nul 2>&1
if %errorlevel%==0 (
    echo ✓ server/.env is ignored
) else (
    echo ✗ server/.env might be tracked!
)

git check-ignore client/.env >nul 2>&1
if %errorlevel%==0 (
    echo ✓ client/.env is ignored
) else (
    echo ✗ client/.env might be tracked!
)

echo.
echo Step 3: Checking for node_modules...
if exist client\node_modules (
    echo ✓ client/node_modules exists (will be ignored)
)
if exist server\node_modules (
    echo ✓ server/node_modules exists (will be ignored)
)

echo.
echo Step 4: Initializing Git repository...
if not exist .git (
    git init
    echo ✓ Git initialized
) else (
    echo ✓ Git already initialized
)

echo.
echo Step 5: Adding all files...
git add .

echo.
echo Step 6: Checking what will be committed...
git status

echo.
echo ========================================
echo Ready for GitHub!
echo ========================================
echo.
echo Next steps:
echo 1. Review the files above
echo 2. Make sure no .env files are listed
echo 3. Run: git commit -m "Initial commit: Job Application Tracker"
echo 4. Create GitHub repository
echo 5. Run: git remote add origin YOUR_REPO_URL
echo 6. Run: git push -u origin main
echo.
echo See GITHUB_UPLOAD_CHECKLIST.md for details
echo.
pause
