import User from "../model/User.js";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); 
const secret = process.env.SECRET;    
console.log(secret)
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database based on the provided email
    const user = await User.findOne({ email: email });

    if (user) {
      // Compare the provided plain password with the hashed password stored in the database
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) { 
        const token=jwt.sign({_id:user._id},secret,{expiresIn:"7d"});  
        res.status(200).json({ message: "Logged in successfully!",jwt:token}); 
      } else {
        res.status(401).json({ error: "Invalid email or password" });  
      }
    } else {
      res.status(404).json({ error: "User not found" }); z
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to log in user"+error});
  }
};
