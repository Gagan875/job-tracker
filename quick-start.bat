@echo off
echo ========================================
echo Job Application Tracker - Quick Start
echo ========================================
echo.

echo Step 1: Copying environment files...
if not exist server\.env (
    copy server\.env.example server\.env
    echo Created server\.env
) else (
    echo server\.env already exists
)

if not exist client\.env (
    copy client\.env.example client\.env
    echo Created client\.env
) else (
    echo client\.env already exists
)

echo.
echo Step 2: Starting Docker containers...
echo This will start PostgreSQL, Backend, and Frontend
echo.
echo Press Ctrl+C to stop the services
echo.

docker-compose up

echo.
echo ========================================
echo Setup complete!
echo ========================================
echo.
echo Access the application:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5000
echo - Database: localhost:5432
echo.
pause
