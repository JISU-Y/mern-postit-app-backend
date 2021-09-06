import express from "express";
import {
  createPost,
  deletePost,
  readPosts,
  updatePost,
} from "../controller/posts.js";

const router = express.Router();
router.get("/", readPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
