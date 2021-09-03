import express from "express";
import { createPost, readPosts } from "../controller/posts.js";

const router = express.Router();
router.get("/", readPosts);
router.post("/", createPost);

export default router;
