import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postsRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

// express랑 cors use
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//posts(end point) routes 추가
// schema 확인 위해서 POSTMAN으로 확인 (localhost:5000 주소 들어가서 send 해봄)
app.use("/posts", postsRoutes);

// const mongodb =
//   "mongodb+srv://jisuyoo:wltn2753@cluster0.2jjvd.mongodb.net/postit-database?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.send("Welcome to server, here is for a postit app");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.mongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(5000, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err));

// 1. backend 단에서 index.js 생성
// mongoDB(database)와 연결
// nodemon index 해서 port와 정상 연결되었는지 확인 app.get()
