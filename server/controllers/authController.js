import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkEmail, createUser } from "../models/authModel.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const emailExist = await checkEmail(email);
    if (emailExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    createUser(username, email, hashPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Database connection error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await checkEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2hr" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
