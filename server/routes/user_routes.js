import express from 'express';
const router = express.Router();
import User from '../models/userSchema.js';


//register user
router.post("/register", async (req, res) => {
  const { name, address, email, age, mobile, work, description } = req.body;

  if (!name || !address || !email || !age || !mobile) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const preuser = await User.findOne({ email });

    if (preuser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const adduser = new User({ name, address, email, age, mobile, work, description });
    await adduser.save();

    res.status(201).json({ message: "User registered successfully", user: adduser });

  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message
    });
  }
});


//get user data
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await User.find();
    res.status(200).json(userdata);
    console.log("User data fetched successfully");

  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
});


//get single user data

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const { id } = req.params;


    const userIndividual = await User.findById(id);
    console.log(userIndividual);
    res.status(200).json(userIndividual);


  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    });
    
  }

})
export default router;