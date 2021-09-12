// bcrypt => hash the password for the security
import bcrypt from "bcryptjs";
// jwt => safe way to store the users in a some period of time (2hours ~ 1week) / even though he left the site
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // sign in (log in)하는 거니까 db에 해당 email이 있는지 확인
    // existingUser 없으면 없다고 표시
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    // 비밀번호 맞는지 안맞는지 확인
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    // 모두 맞으면
    // "test" 는 secret => 나중에 env 파일로 따로 빼야함
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    // 만들려고 하는데 이미 있는 애면 안되니까
    const existingUser = await User.findOne({ email });

    // 원래 user가 존재한다면, return
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    // 기존 user가 아닐 시 이제 sign up 시작
    // 비밀번호 컨펌
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // 다 됐으면
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });

    console.log(error);
  }
};
