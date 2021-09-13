import express from "express";
import {
  createPost,
  deletePost,
  readPosts,
  updatePost,
} from "../controller/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", readPosts); // readPosts는 굳이 로그인 안해도 할 수 있는 동작이므로 auth permission이 필요 없음
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
