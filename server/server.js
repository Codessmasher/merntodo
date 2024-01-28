import express from "express";
import cors from 'cors';
import router from "./routes/router.js";
import mongoose from "mongoose"; 
import dotenv from "dotenv"; // Import dotenv

dotenv.config({
    path:'/.env'
}); // Load environment variables from .env file

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/users", router);

// Use the .ENV environment variableS
const PORT = process.env.PORT || 5000; 
const MONGODB_URI = process.env.MONGODB_URI;  
const DB_NAME = process.env.DB_NAME;  

//mongodb+express connection
mongoose.connect(   
    `${MONGODB_URI}/${DB_NAME}`    
)
.then(() => app.listen(PORT, () => {
    console.log(`Server is running on  https://localhost:${PORT}`); 
}))
.catch((err) => console.log(err))

export default app;
