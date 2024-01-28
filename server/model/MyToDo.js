import mongoose, { Schema }  from "mongoose";
const MyToDo = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  date: {
    type: String,  
  },
  userId: {
    type: Schema.Types.ObjectId,  
    ref: "User"
  } 
},{
  timestamps:true
});

const Mytodo = mongoose.model('Mytodo', MyToDo);
export default Mytodo;