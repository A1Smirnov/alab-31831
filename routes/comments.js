const express = require("express");
const router = express.Router();
const comments = require("../data/comments"); // Comments data

// GET /comments
router.get("/", (req, res) => {
  let filteredComments = comments;

  // Filter by userId if provided
  if (req.query.userId) {
    filteredComments = filteredComments.filter(c => c.userId == req.query.userId);
  }

  // Filter by postId if provided
  if (req.query.postId) {
    filteredComments = filteredComments.filter(c => c.postId == req.query.postId);
  }

  res.json(filteredComments); // Return filtered comments
});

// POST /comments
router.post("/", (req, res) => {
  const { userId, postId, body } = req.body;
  if (userId && postId && body) {
    const comment = {
      id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
      userId,
      postId,
      body,
    };
    comments.push(comment);
    res.status(201).json(comment); // Return the created comment
  } else {
    res.status(400).json({ error: "Insufficient Data" });
  }
});

// GET /comments/:id
router.get("/:id", (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment Not Found" });
  }
});

// PATCH /comments/:id
router.patch("/:id", (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);
  if (comment) {
    const { body } = req.body;
    if (body) {
      comment.body = body; // Update the comment body
      res.json(comment);
    } else {
      res.status(400).json({ error: "Body is required" });
    }
  } else {
    res.status(404).json({ error: "Comment Not Found" });
  }
});

// DELETE /comments/:id
router.delete("/:id", (req, res) => {
  const index = comments.findIndex(c => c.id == req.params.id);
  if (index !== -1) {
    const deletedComment = comments.splice(index, 1);
    res.json(deletedComment[0]); // Return the deleted comment
  } else {
    res.status(404).json({ error: "Comment Not Found" });
  }
});

// New Routes
// GET /posts/:id/comments
router.get("/posts/:id/comments", (req, res) => {
  const postComments = comments.filter(c => c.postId == req.params.id);
  res.json(postComments); // Return comments for the specified post
});

// GET /users/:id/comments
router.get("/users/:id/comments", (req, res) => {
  const userComments = comments.filter(c => c.userId == req.params.id);
  res.json(userComments); // Return comments made by the specified user
});

// GET /posts/:id/comments?userId=<VALUE>
router.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const userId = req.query.userId;
  
  const postComments = comments.filter(c => c.postId == postId);
  const filteredComments = userId ? postComments.filter(c => c.userId == userId) : postComments;
  
  res.json(filteredComments); // Return filtered comments for the specified post
});

// GET /users/:id/comments?postId=<VALUE>
router.get("/users/:id/comments", (req, res) => {
  const userId = req.params.id;
  const postId = req.query.postId;

  const userComments = comments.filter(c => c.userId == userId);
  const filteredComments = postId ? userComments.filter(c => c.postId == postId) : userComments;
  
  res.json(filteredComments); // Return filtered comments made by the specified user
});

module.exports = router;
