import express from "express";
import { createPost, readPosts, updatePost } from "../controller/posts.js";

const router = express.Router();
router.get("/", readPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);

export default router;
