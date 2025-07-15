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
   ```

   **Important:** Replace the values with your actual configuration:

   - For local MongoDB: Use `mongodb://localhost:27017/brainly`
   - For MongoDB Atlas: Use your connection string from the Atlas dashboard
   - Generate a strong JWT secret (you can use `openssl rand -base64 32`)

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

### Bookmark Routes (`/api/bookmarks`)

- `GET /api/bookmarks` - Get user's bookmarks (protected)
- `POST /api/bookmarks` - Create a new bookmark (protected)
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

### 3. Create Bookmark

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

### 4. Get All Bookmarks

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


### 5. Delete Bookmark

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
