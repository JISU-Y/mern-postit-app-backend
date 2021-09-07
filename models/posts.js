import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    tag: { type: String, required: true },
    todos: [
      {
        todoText: String,
        todoDone: Boolean,
      },
    ],
    position: {
      x: String,
      y: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

// post
// id
// position {left:'',top:''} ====> 추가 필요
// tag - 중요 / 오늘 할 일 / 살 것 / 등등
// todos - todo 배열 (할일들)
// timeStamp

// todos
// 배열이어야 함
// todoText - 할 일 내용(text)
// todoDone - 할 일 완료 여부(true / false)

// 2. schema 생성
// models 폴더 생성하여 안에 db에 저장할 폼 대로 schema 생성
