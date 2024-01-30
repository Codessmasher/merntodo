import express from "express";
import jwt from "jsonwebtoken"; // Import jsonwebtoken
import MyToDo from "../model/MyToDo.js";  
import dotenv from "dotenv"; // Import dotenv

dotenv.config();
const app = express();
app.use(express.json());
const secret= process.env.SECRET;
export const addToDo = async (req, res) => {
  const { todo, date } = req.body;

  const token = req.header("Authorization").replace("Bearer ", ""); // Extract the token from the Authorization header
 
  try {
    const decodedToken = jwt.verify(token,secret); // Verify the token using your secret key
    
    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    } 
    const userId=decodedToken; 
    const newToDo = new MyToDo({
      todo, date, userId 
    });

    await newToDo.save();
    res.status(201).json({
      message: "Added Successfully", 
    });
  } catch (error) {
    res.status(500).json({ error: "You have to login first", details: error.message }); 
  }
}
