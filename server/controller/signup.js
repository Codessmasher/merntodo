import User from "../model/User.js";
import bcrypt from 'bcrypt'
// validator
import validator from 'validator';
 
export const signup = async (req, res) => {  
  const { name, email, password } = req.body;
  const encpassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name, 
    email, 
    password: encpassword
  });

  try {
    const user = await User.findOne({ email: email });
      
    if(user)res.status(500).json({ error: "Email already exist ! Please login" });
    else if (!validator.isEmail(email)) {
      res.status(500).json({ error: "Email is invalid" });
    }else if(req.body.password.length<6){
      res.status(500).json({ error: "Password must be of 6 characters" });
    } else {
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" }); 
  }
}
