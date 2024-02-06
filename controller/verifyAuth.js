import jwt from "jsonwebtoken"; // Import jsonwebtoken  
import dotenv from "dotenv"; // Import dotenv
dotenv.config();
const secret = process.env.SECRET; 

export const verifyAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', ''); 
    try {
      const decoded = jwt.verify(token, secret);  
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  }; 
