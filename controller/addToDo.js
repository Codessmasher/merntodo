import express from "express";
import jwt from "jsonwebtoken";
import MyToDo from "../model/MyToDo.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
const secret = process.env.SECRET;

export const addToDo = async (req, res) => {
  const { todo, date } = req.body;

  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    // Verify the token using your secret key
    const decodedToken = jwt.verify(token, secret);

    // Check if the decoded token contains the necessary information
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ error: "Invalid token: Missing userId" });
    }

    const userId = decodedToken.userId;

    const newToDo = new MyToDo({
      todo,
      date,
      userId,
    });

    await newToDo.save();
    res.status(201).json({
      message: "Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
