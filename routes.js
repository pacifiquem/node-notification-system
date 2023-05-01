const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  createPost,
  addLike,
  addComment,
} = require("./controller");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.post("/posts", createPost);
router.post("/posts/:postId/likes/:userId", addLike);
router.post("/posts/:postId/comments", addComment);

module.exports = router;
