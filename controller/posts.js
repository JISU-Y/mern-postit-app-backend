import mongoose from "mongoose";
import Post from "../models/posts.js";

// reading postits / postit 불러오기
export const readPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// creating postits / postit 생성하기
export const createPost = async (req, res) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// 3. DB에서 가져오거나 주는 담당?
// req, res로 받거나 준다?
