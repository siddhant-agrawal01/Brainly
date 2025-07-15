# Brainly Backend Server

A Node.js/Express server with MongoDB for bookmark management and user authentication.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Environment Configuration

1. **Create a `.env` file in the server root directory:**

   ```bash
   touch .env
   ```

2. **Add the following environment variables to your `.env` file:**

   ```env
   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/brainly
   # For MongoDB Atlas, use: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/brainly

   # Server Configuration
   PORT=4000

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   ```

   **Important:** Replace the values with your actual configuration:

   - For local MongoDB: Use `mongodb://localhost:27017/brainly`
   - For MongoDB Atlas: Use your connection string from the Atlas dashboard
   - Generate a strong JWT secret (you can use `openssl rand -base64 32`)

## Database Setup

### Option 1: Local MongoDB

1. **Install MongoDB Community Edition** following the [official installation guide](https://docs.mongodb.com/manual/administration/install-community/)
2. **Start MongoDB service:**

   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Ubuntu/Debian
   sudo systemctl start mongod

   # On Windows
   net start MongoDB
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create a free account** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a new cluster**
3. **Add your IP address** to the whitelist
4. **Create a database user**
5. **Get your connection string** and update `MONGO_URI` in your `.env` file

## Running the Server

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Bookmark Routes (`/api/bookmarks`)

- `GET /api/bookmarks` - Get user's bookmarks (protected)
- `POST /api/bookmarks` - Create a new bookmark (protected)
- `PUT /api/bookmarks/:id` - Update a bookmark (protected)
- `DELETE /api/bookmarks/:id` - Delete a bookmark (protected)

## API Testing with Postman

### Base URL

```
http://localhost:4000
```

### 1. User Registration

**Endpoint:** `POST /api/auth/register`

**Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response (201):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f7b1a2c8d4e5f6a7b8c9d0",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f7b1a2c8d4e5f6a7b8c9d0",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### 3. Get User Profile

**Endpoint:** `GET /api/auth/profile`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**

```json
{
  "user": {
    "id": "64f7b1a2c8d4e5f6a7b8c9d0",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### 4. Create Bookmark

**Endpoint:** `POST /api/bookmarks`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "url": "https://example.com",
  "title": "Example Website",
  "description": "This is an example website",
  "tags": ["example", "test", "website"]
}
```

**Expected Response (201):**

```json
{
  "message": "Bookmark created successfully",
  "bookmark": {
    "id": "64f7b1a2c8d4e5f6a7b8c9d1",
    "url": "https://example.com",
    "title": "Example Website",
    "description": "This is an example website",
    "tags": ["example", "test", "website"],
    "metadata": {
      "title": "Example Domain",
      "description": "This domain is for use in illustrative examples",
      "favicon": "https://example.com/favicon.ico"
    },
    "userId": "64f7b1a2c8d4e5f6a7b8c9d0",
    "createdAt": "2025-07-16T10:30:00.000Z",
    "updatedAt": "2025-07-16T10:30:00.000Z"
  }
}
```

### 5. Get All Bookmarks

**Endpoint:** `GET /api/bookmarks`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters (Optional):**

```
?tags=example,test&search=website&limit=10&page=1
```

**Expected Response (200):**

```json
{
  "bookmarks": [
    {
      "id": "64f7b1a2c8d4e5f6a7b8c9d1",
      "url": "https://example.com",
      "title": "Example Website",
      "description": "This is an example website",
      "tags": ["example", "test", "website"],
      "metadata": {
        "title": "Example Domain",
        "description": "This domain is for use in illustrative examples",
        "favicon": "https://example.com/favicon.ico"
      },
      "userId": "64f7b1a2c8d4e5f6a7b8c9d0",
      "createdAt": "2025-07-16T10:30:00.000Z",
      "updatedAt": "2025-07-16T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalBookmarks": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

### 6. Update Bookmark

**Endpoint:** `PUT /api/bookmarks/:id`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "title": "Updated Example Website",
  "description": "This is an updated example website",
  "tags": ["example", "updated", "website"]
}
```

**Expected Response (200):**

```json
{
  "message": "Bookmark updated successfully",
  "bookmark": {
    "id": "64f7b1a2c8d4e5f6a7b8c9d1",
    "url": "https://example.com",
    "title": "Updated Example Website",
    "description": "This is an updated example website",
    "tags": ["example", "updated", "website"],
    "metadata": {
      "title": "Example Domain",
      "description": "This domain is for use in illustrative examples",
      "favicon": "https://example.com/favicon.ico"
    },
    "userId": "64f7b1a2c8d4e5f6a7b8c9d0",
    "createdAt": "2025-07-16T10:30:00.000Z",
    "updatedAt": "2025-07-16T10:35:00.000Z"
  }
}
```

### 7. Delete Bookmark

**Endpoint:** `DELETE /api/bookmarks/:id`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**

```json
{
  "message": "Bookmark deleted successfully"
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "error": "Validation error",
  "details": "Email is required"
}
```

#### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Invalid token"
}
```

#### 404 Not Found

```json
{
  "error": "Not found",
  "message": "Bookmark not found"
}
```

#### 409 Conflict

```json
{
  "error": "Conflict",
  "message": "User already exists"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

### Postman Collection Setup

1. **Create a new collection** in Postman called "Brainly API"

2. **Set up environment variables:**

   - `baseUrl`: `http://localhost:4000`
   - `token`: (will be set automatically after login)

3. **Add authentication script** to login request:

   ```javascript
   // In the "Tests" tab of login request
   if (pm.response.code === 200) {
     const response = pm.response.json();
     pm.environment.set("token", response.token);
   }
   ```

4. **Use environment variables** in requests:
   - URL: `{{baseUrl}}/api/auth/login`
   - Authorization: `Bearer {{token}}`

### Testing Workflow

1. **Start the server**: `npm run dev`
2. **Register a new user** using the registration endpoint
3. **Login** to get the authentication token
4. **Test protected routes** using the received token
5. **Create, read, update, and delete bookmarks**

### Useful Postman Tests

Add these to the "Tests" tab of your requests:

**For successful responses:**

```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Response has required fields", function () {
  const jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property("message");
});
```

**For authentication:**

```javascript
pm.test("Response contains token", function () {
  const jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property("token");
  pm.expect(jsonData.token).to.be.a("string");
});
```

## Project Structure

```
server/
├── src/
│   ├── server.js          # Main application entry point
│   ├── config/
│   │   ├── db.js          # Database connection
│   │   └── schema.js      # Database schemas
│   ├── controller/
│   │   └── bookmarkController.js  # Bookmark business logic
│   ├── middleware/
│   │   └── auth.js        # Authentication middleware
│   ├── models/
│   │   ├── Bookmark.js    # Bookmark model
│   │   └── User.js        # User model
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   └── bookmark.js    # Bookmark routes
│   └── utils/
│       ├── metadata.js    # Utility for fetching metadata
│       └── summary.js     # Utility for generating summaries
├── package.json
└── .env                   # Environment variables (create this)
```

## Features

- **User Authentication**: JWT-based authentication system
- **Password Hashing**: Secure password storage using bcryptjs
- **Bookmark Management**: CRUD operations for bookmarks
- **Metadata Extraction**: Automatic extraction of webpage metadata
- **CORS Support**: Cross-origin requests enabled for frontend integration
- **ES6 Modules**: Modern JavaScript module system

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**

   - Ensure MongoDB is running
   - Check your `MONGO_URI` in the `.env` file
   - Verify network connectivity for Atlas connections

2. **Port Already in Use:**

   - Change the `PORT` value in your `.env` file
   - Kill the process using the port: `lsof -ti:4000 | xargs kill -9`

3. **JWT Errors:**

   - Ensure `JWT_SECRET` is set in your `.env` file
   - Make sure the secret is sufficiently complex

4. **Dependency Issues:**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

### Environment Variables Checklist

- [ ] `MONGO_URI` is set correctly
- [ ] `JWT_SECRET` is set with a strong secret
- [ ] `PORT` is set (optional, defaults to 4000)
- [ ] `.env` file is in the server root directory
- [ ] `.env` file is added to `.gitignore`

## Development

### Code Style

- ES6+ JavaScript with modules
- RESTful API design
- Async/await for asynchronous operations

### Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT implementation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **jsdom**: DOM manipulation for metadata extraction
- **node-fetch**: HTTP requests

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- CORS is configured for cross-origin requests
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request
