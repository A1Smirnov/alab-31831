const express = require("express");
const router = express.Router();
const posts = require("../data/posts"); // Posts data
const comments = require("../data/comments"); // Comments data

// Existing routes for posts...

// New Route: GET /api/users/:id/posts
router.get("/users/:id/posts", (req, res) => {
  const userPosts = posts.filter(post => post.userId == req.params.id);
  res.json(userPosts);
});

// New Route: GET /api/posts?userId=<VALUE>
router.get("/", (req, res) => {
  if (req.query.userId) {
    const userPosts = posts.filter(post => post.userId == req.query.userId);
    return res.json(userPosts);
  }
  res.json(posts); // Return all posts if no query
});

// New Route: GET /comments
router.get("/comments", (req, res) => {
  res.json(comments); // Return all comments
});

// New Route: POST /comments
router.post("/comments", (req, res) => {
  const { userId, postId, body } = req.body;
  if (userId && postId && body) {
    const comment = {
      id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
      userId,
      postId,
      body,
    };
    comments.push(comment);
    res.json(comment);
  } else {
    res.status(400).json({ error: "Insufficient Data" });
  }
});

// New Route: GET /comments/:id
router.get("/comments/:id", (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment Not Found" });
  }
});

// New Route: PATCH /comments/:id
router.patch("/comments/:id", (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);
  if (comment) {
    comment.body = req.body.body || comment.body; // Update the body
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment Not Found" });
  }
});

// New Route: DELETE /comments/:id
router.delete("/comments/:id", (req, res) => {
  const index = comments.findIndex(c => c.id == req.params.id);
  if (index !== -1) {
    const deletedComment = comments.splice(index, 1);
    res.json(deletedComment);
  } else {
    res.status(404).json({ error: "Comment Not Found" });
  }
});

// New Route: GET /comments?userId=<VALUE>
router.get("/comments", (req, res) => {
  if (req.query.userId) {
    const userComments = comments.filter(c => c.userId == req.query.userId);
    return res.json(userComments);
  }
  res.json(comments); // Return all comments if no query
});

// New Route: GET /comments?postId=<VALUE>
router.get("/comments", (req, res) => {
  if (req.query.postId) {
    const postComments = comments.filter(c => c.postId == req.query.postId);
    return res.json(postComments);
  }
  res.json(comments); // Return all comments if no query
});

// New Route: GET /posts/:id/comments
router.get("/posts/:id/comments", (req, res) => {
  const postComments = comments.filter(c => c.postId == req.params.id);
  res.json(postComments);
});

// New Route: GET /users/:id/comments
router.get("/users/:id/comments", (req, res) => {
  const userComments = comments.filter(c => c.userId == req.params.id);
  res.json(userComments);
});

// New Route: GET /posts/:id/comments?userId=<VALUE>
router.get("/posts/:id/comments", (req, res) => {
  const postComments = comments.filter(c => c.postId == req.params.id);
  if (req.query.userId) {
    const filteredComments = postComments.filter(c => c.userId == req.query.userId);
    return res.json(filteredComments);
  }
  res.json(postComments);
});

// New Route: GET /users/:id/comments?postId=<VALUE>
router.get("/users/:id/comments", (req, res) => {
  const userComments = comments.filter(c => c.userId == req.params.id);
  if (req.query.postId) {
    const filteredComments = userComments.filter(c => c.postId == req.query.postId);
    return res.json(filteredComments);
  }
  res.json(userComments);
});

module.exports = router;
