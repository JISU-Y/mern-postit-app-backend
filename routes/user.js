import express from "express";
import { signin, signup } from "../controller/user.js";

const router = express.Router();

// user 정보를 backend에 전달하는 것이니까
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
