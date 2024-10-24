# Comments API

## Description
This is a RESTful API for managing comments, users, and posts. The API allows for creating, updating, deleting, and retrieving comments, as well as filtering them by user and post.

## Technologies
- Node.js
- Express.js
- JavaScript

## Installation

### Requirements
- Ensure you have Node.js and npm installed.

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/your_repository.git
   cd your_repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will be running at `http://localhost:3000`.

## Endpoints

### Users
- **GET /api/users**: Retrieve all users.
- **POST /api/users**: Create a new user.
- **GET /api/users/:id**: Retrieve a user by ID.
- **PATCH /api/users/:id**: Update a user by ID.
- **DELETE /api/users/:id**: Delete a user by ID.

### Posts
- **GET /api/posts**: Retrieve all posts or posts by a specific user (using `userId` query parameter).
- **POST /api/posts**: Create a new post.
- **GET /api/posts/:id**: Retrieve a post by ID.
- **PATCH /api/posts/:id**: Update a post by ID.
- **DELETE /api/posts/:id**: Delete a post by ID.

### Comments
- **GET /comments**: Retrieve all comments or filter by `userId` and `postId`.
- **POST /comments**: Create a new comment.
- **GET /comments/:id**: Retrieve a comment by ID.
- **PATCH /comments/:id**: Update a comment by ID.
- **DELETE /comments/:id**: Delete a comment by ID.
- **GET /posts/:id/comments**: Retrieve all comments for a post by ID.
- **GET /users/:id/comments**: Retrieve all comments made by a user by ID.
- **GET /posts/:id/comments?userId=<VALUE>**: Retrieve comments for a post by ID made by a specific user.
- **GET /users/:id/comments?postId=<VALUE>**: Retrieve comments made by a user by ID for a specific post.

## Request Examples
You can test the API using Postman or cURL.

### Example POST request to create a comment
```bash
curl -X POST http://localhost:3000/comments \
-H "Content-Type: application/json" \
-d '{
  "userId": 1,
  "postId": 2,
  "body": "This is a new comment!"
}'
```

## License
This project is licensed under the License.