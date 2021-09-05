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

// updating Postit
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { tag, todos } = req.body;

  // id 유효성 확인
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`The id ${id} is not valid`);
  }
  const post = { tag, todos, _idL: id };
  await Post.findByIdAndUpdate(id, post, { new: true });
  res.json(post);
};

// 3. DB에서 가져오거나 주는 담당?
// req, res로 받거나 준다?