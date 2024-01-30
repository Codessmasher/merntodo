import jwt from "jsonwebtoken"; // Import jsonwebtoken  

export const verifyAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', ''); 
    try {
      const decoded = jwt.verify(token, 'THISISGOINGTOBEATODOWEBAPP'); // replace with your actual secret key
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  }; 