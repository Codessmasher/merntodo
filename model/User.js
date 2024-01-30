import mongoose  from "mongoose";
const createuser = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
},{
  timestamps:true
});

const User = mongoose.model('User', createuser);
export default User;