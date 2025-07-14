import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  age: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  work: {
    type: String,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields
});

// Create and export the model
const User = mongoose.model("User", userSchema);
export default User;