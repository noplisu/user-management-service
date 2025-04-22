# User Service

A modular Node.js microservice for user management, built with Express and MongoDB. Supports user registration, authentication (JWT), and profile retrieval. Designed for use as part of a microservices-based online learning platform.


## Features
- User registration with hashed passwords
- JWT-based authentication (login)
- User profile endpoint (`/me`)
- Role support: student, instructor, admin
- Input validation and centralized error handling
- Ready for containerization and extension


## Project Structure
```
user-service/
├── src/
│   ├── config/           # Configuration files (env, DB, etc.)
│   ├── controllers/      # Express route handlers
│   ├── models/           # Mongoose schemas/models
│   ├── routes/           # Express route definitions
│   ├── services/         # Business logic
│   ├── middlewares/      # Express middlewares (auth, error handling)
│   ├── utils/            # Utility functions (password hashing, JWT)
│   ├── app.js            # Express app setup
│   └── server.js         # Entry point
├── tests/                # Unit and integration tests
├── .env                  # Environment variables
├── Dockerfile            # (optional) For containerization
├── package.json          # NPM dependencies and scripts
└── README.md             # Project documentation
```


## Getting Started
## Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

## Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd user-service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and set the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/user_service
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   # or for development with auto-reload:
   npx nodemon src/server.js
   ```


## API Endpoints
### Register a User
```http
POST /api/users/register
```
**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "strongpassword123",
  "role": "student"
}
```

### Login
```http
POST /api/auth/login
```
**Body:**
```json
{
  "email": "jane.doe@example.com",
  "password": "strongpassword123"
}
```
**Response:**
```json
{
  "token": "<JWT_TOKEN>",
  "user": { ... }
}
```

### Get Current User Profile
```http
GET /api/users/me
```
**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```


## Example cURL Commands
#### Register
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "strongpassword123",
    "role": "student"
  }'
```
#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "strongpassword123"
  }'
```
#### Get Profile
```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer <JWT_TOKEN>"
```


## NPM Packages Used
- express
- mongoose
- dotenv
- bcrypt
- jsonwebtoken
- express-validator
- (dev) nodemon


## Security Notes
- Passwords are hashed with bcrypt before storage
- JWT tokens are used for stateless authentication
- Sensitive fields (e.g., password) are never returned in API responses
- Always use HTTPS in production


## Extending the Service
- Add endpoints for updating/deleting users
- Integrate with other microservices via events or REST/gRPC
- Add support for user profile images, social login, password reset, etc.
- Add rate limiting, request logging, and monitoring


## License
MIT or your preferred license.