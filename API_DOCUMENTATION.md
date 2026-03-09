# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt-token"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt-token"
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

Response:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Applications

### List Applications
```http
GET /applications
Authorization: Bearer <token>

Query Parameters:
- status: Filter by status (WISHLIST, APPLIED, INTERVIEW, OFFER, REJECTED, ACCEPTED, WITHDRAWN)
- search: Search by company name or job title
- sortBy: Sort field (appliedDate, companyName, jobTitle)
- order: Sort order (asc, desc)
```

Response:
```json
[
  {
    "id": "uuid",
    "companyName": "Tech Corp",
    "jobTitle": "Software Engineer",
    "jobDescription": "...",
    "jobUrl": "https://...",
    "location": "San Francisco, CA",
    "salary": "$100k - $150k",
    "status": "APPLIED",
    "appliedDate": "2024-01-01T00:00:00.000Z",
    "notes": "...",
    "color": "#3b82f6",
    "interviews": [],
    "contacts": [],
    "_count": {
      "activities": 5
    }
  }
]
```

### Get Application by ID
```http
GET /applications/:id
Authorization: Bearer <token>
```

Response:
```json
{
  "id": "uuid",
  "companyName": "Tech Corp",
  "jobTitle": "Software Engineer",
  "status": "APPLIED",
  "interviews": [
    {
      "id": "uuid",
      "title": "Technical Interview",
      "type": "Video",
      "scheduledAt": "2024-01-15T10:00:00.000Z",
      "completed": false
    }
  ],
  "contacts": [
    {
      "id": "uuid",
      "name": "Jane Smith",
      "role": "Hiring Manager",
      "email": "jane@techcorp.com"
    }
  ],
  "activities": [
    {
      "id": "uuid",
      "type": "application_created",
      "description": "Application created",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Create Application
```http
POST /applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "jobTitle": "Software Engineer",
  "jobDescription": "Full job description...",
  "jobUrl": "https://techcorp.com/jobs/123",
  "location": "San Francisco, CA",
  "salary": "$100k - $150k",
  "status": "APPLIED",
  "notes": "Applied through LinkedIn"
}
```

### Update Application
```http
PUT /applications/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "INTERVIEW",
  "notes": "Updated notes"
}
```

### Delete Application
```http
DELETE /applications/:id
Authorization: Bearer <token>
```

Response:
```json
{
  "message": "Application deleted successfully"
}
```

### Add Activity
```http
POST /applications/:id/activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "note_added",
  "description": "Called recruiter for follow-up",
  "metadata": {}
}
```

### Add Contact
```http
POST /applications/:id/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "role": "Hiring Manager",
  "email": "jane@techcorp.com",
  "phone": "+1234567890",
  "linkedin": "https://linkedin.com/in/janesmith",
  "notes": "Very friendly"
}
```

## Interviews

### List Interviews
```http
GET /interviews
Authorization: Bearer <token>

Query Parameters:
- upcoming: Filter upcoming interviews (true/false)
- applicationId: Filter by application ID
```

Response:
```json
[
  {
    "id": "uuid",
    "title": "Technical Interview",
    "type": "Video",
    "scheduledAt": "2024-01-15T10:00:00.000Z",
    "duration": 60,
    "location": null,
    "meetingLink": "https://zoom.us/j/123",
    "notes": "Prepare coding questions",
    "completed": false,
    "application": {
      "id": "uuid",
      "companyName": "Tech Corp",
      "jobTitle": "Software Engineer",
      "status": "INTERVIEW"
    }
  }
]
```

### Create Interview
```http
POST /interviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "applicationId": "uuid",
  "title": "Technical Interview",
  "type": "Video",
  "scheduledAt": "2024-01-15T10:00:00.000Z",
  "duration": 60,
  "meetingLink": "https://zoom.us/j/123",
  "notes": "Prepare coding questions"
}
```

### Update Interview
```http
PUT /interviews/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "completed": true,
  "notes": "Interview went well"
}
```

### Delete Interview
```http
DELETE /interviews/:id
Authorization: Bearer <token>
```

## Documents

### List Documents
```http
GET /documents
Authorization: Bearer <token>
```

Response:
```json
[
  {
    "id": "uuid",
    "name": "Resume_2024.pdf",
    "type": "resume",
    "fileUrl": "https://...",
    "fileSize": 102400,
    "mimeType": "application/pdf",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Delete Document
```http
DELETE /documents/:id
Authorization: Bearer <token>
```

## Statistics

### Get Dashboard Stats
```http
GET /stats
Authorization: Bearer <token>
```

Response:
```json
{
  "total": 25,
  "statusCounts": {
    "APPLIED": 10,
    "INTERVIEW": 5,
    "OFFER": 2,
    "REJECTED": 8
  },
  "upcomingInterviews": 3,
  "recentApplications": 7,
  "responseRate": 28.0
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production.

## Pagination

Currently not implemented. All list endpoints return all results. Consider adding pagination for production use.

## Filtering & Sorting

Applications endpoint supports:
- Filtering by status
- Search by company name or job title
- Sorting by multiple fields
- Ascending/descending order

## Best Practices

1. Always include Authorization header for protected endpoints
2. Validate input data on client side before sending
3. Handle errors gracefully
4. Store JWT token securely (httpOnly cookies recommended for production)
5. Refresh tokens before expiration
6. Use HTTPS in production
7. Implement request retry logic for failed requests
8. Add request timeouts
9. Log API errors for debugging

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Create Application
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"companyName":"Tech Corp","jobTitle":"Software Engineer","status":"APPLIED"}'
```

### Get Applications
```bash
curl -X GET http://localhost:5000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN"
```
