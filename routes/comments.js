const express = require("express");
const router = express.Router();
const comments = require("../data/comments"); // Comments data

// GET /comments
router.get("/", (req, res) => {
  res.json(comments); // Return all comments
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

module.exports = router;
