import jwt from "jsonwebtoken"; // Import jsonwebtoken 
import dotenv from "dotenv"; // Import dotenv
dotenv.config();
const secret=process.env.SECRET;

export default verifyAuth = async (req, res,next) => {
    const token = localStorage.getItem("jwttoken");

    if (!token) {
        res.status(404).json({message:"Login First"});  
        next();
    }else {
        const decodedToken = jwt.verify(token,secret); // Verify the token using your secret key
        res.status(200).json({message:"Verified",userId:decodedToken._id});  
    }
}