import express from "express";
import cors from 'cors';
import router from "./routes/router.js";
import mongoose from "mongoose"; 
import dotenv from "dotenv"; // Import dotenv

dotenv.config();  
const app = express();  
// Middlewares
app.use(cors()); 
app.use(express.json());
app.use("/api/users", router); 

// Use the .ENV environment variables
const PORT = process.env.PORT;  
const MONGODB_URI = process.env.MONGODB_URI;   
const DB_NAME = process.env.DB_NAME;  
const API_URL = process.env.API_URL;  

//mongodb+express connection
mongoose.connect(    
    `${MONGODB_URI}/${DB_NAME}`    
)
.then(() => app.listen(PORT, () => {
    console.log(`Server is running on  ${API_URL}`); 
}))
.catch((err) => console.log(err))
