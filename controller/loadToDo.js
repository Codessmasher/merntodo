import MyToDo from "../model/MyToDo.js"; 
 
export const loadToDo = async (req, res) => {
  try { 
    // Assuming you have the user ID from the request or authentication
    const userId = req.user; // Adjust this based on your actual user ID retrieval
    // Find todos for the specific user
    const myTodos = await MyToDo.find({ userId });

    if (myTodos && myTodos.length > 0) {
      res.status(200).json({ todos: myTodos });
    } else {
      res.status(404).json({ error: "No todos found for the user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}; 
