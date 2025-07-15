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
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


//edit user data /updateuser/:id

router.patch("/updateuser/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
});

//delete user data


router.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteuser = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
})

export default router;