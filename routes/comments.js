const express = require("express");
const router = express.Router();
const comments = require("../data/comments"); // Comments data

// New Route: GET /api/comments
router.get("/", (req, res) => {
  res.json(comments); // Return all comments
});

// New Route: POST /api/comments
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

// Additional routes for comments (GET by ID, PATCH, DELETE, etc.) can be added here.

module.exports = router;
