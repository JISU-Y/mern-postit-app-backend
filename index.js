import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();

// express랑 cors use
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongodb =
  "mongodb+srv://jisuyoo:wltn2753@cluster0.2jjvd.mongodb.net/postit-database?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.send("Welcome to server, here is for a postit app");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(mongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(5000, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
