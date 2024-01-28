import express from "express"; 
import MyToDo from "../model/MyToDo.js"; 

const app = express();
app.use(express.json());
 
export const loadToDo = async (req, res) => { 
  try {
    // Find the user in the database based on the provided email
    const mytodo = await MyToDo.find();
    if (mytodo) { 
        res.status(200).json({todos:mytodo}); 
      } else {
        res.status(401).json({ error: "Nothing in the list" });  
      } 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos"+error});
  }
};
